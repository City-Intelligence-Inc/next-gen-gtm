"""
RAG service for Stardrop GTM Agent.
Indexes all Obsidian vault notes into ChromaDB and retrieves relevant context per query.
User documents are stored in isolated per-user collections.
"""

import os
import re
import logging
from pathlib import Path
import chromadb

logger = logging.getLogger(__name__)

# Check multiple possible vault locations
_possible_vaults = [
    Path(__file__).parent.parent.parent.parent / "next-gen-gtm-vault",  # local dev
    Path(__file__).parent.parent.parent / "next-gen-gtm-vault",  # copied into backend for Docker
    Path("/app/next-gen-gtm-vault"),  # Docker absolute
]
VAULT_PATH = next((p for p in _possible_vaults if p.exists()), _possible_vaults[0])
CHROMA_PATH = Path(__file__).parent.parent.parent / ".chroma_db"

_client = None
_collection = None


def _get_client():
    """Get or create persistent ChromaDB client."""
    global _client
    if _client is None:
        _client = chromadb.PersistentClient(path=str(CHROMA_PATH))
    return _client


def _strip_frontmatter(text: str) -> str:
    """Remove YAML frontmatter from markdown."""
    if text.startswith("---"):
        parts = text.split("---", 2)
        if len(parts) >= 3:
            return parts[2].strip()
    return text


def _chunk_text(text: str, chunk_size: int = 800, overlap: int = 100) -> list[str]:
    """Split text into overlapping chunks."""
    chunks = []
    start = 0
    while start < len(text):
        end = start + chunk_size
        chunk = text[start:end]
        if chunk.strip():
            chunks.append(chunk.strip())
        start = end - overlap
    return chunks


def init_vector_store():
    """Load all vault notes into the shared ChromaDB collection."""
    global _collection

    client = _get_client()

    # Delete and recreate to ensure fresh data
    try:
        client.delete_collection("gtm_vault")
    except Exception:
        pass

    _collection = client.create_collection(
        name="gtm_vault",
        metadata={"hnsw:space": "cosine"},
    )

    if not VAULT_PATH.exists():
        logger.warning(f"Vault path not found: {VAULT_PATH}")
        return 0

    documents = []
    metadatas = []
    ids = []

    for md_file in VAULT_PATH.rglob("*.md"):
        rel_path = md_file.relative_to(VAULT_PATH)
        folder = str(rel_path.parent)
        title = md_file.stem

        content = md_file.read_text(encoding="utf-8")
        content = _strip_frontmatter(content)

        if not content.strip():
            continue

        # Chunk the content
        chunks = _chunk_text(content)

        for i, chunk in enumerate(chunks):
            doc_id = f"{rel_path}::{i}"
            documents.append(chunk)
            metadatas.append({
                "title": title,
                "folder": folder,
                "file": str(rel_path),
                "chunk": i,
                "owner": "shared",  # shared vault docs
            })
            ids.append(doc_id)

    if documents:
        batch_size = 5000
        for i in range(0, len(documents), batch_size):
            _collection.add(
                documents=documents[i:i + batch_size],
                metadatas=metadatas[i:i + batch_size],
                ids=ids[i:i + batch_size],
            )

    logger.info(f"Indexed {len(documents)} chunks from {len(list(VAULT_PATH.rglob('*.md')))} vault notes")
    return len(documents)


def get_collection():
    """Get or initialize the shared collection."""
    global _collection
    if _collection is None:
        init_vector_store()
    return _collection


# ---------------------------------------------------------------------------
# User-scoped document collections (isolated per user)
# ---------------------------------------------------------------------------

def _user_collection_name(username: str) -> str:
    """Sanitized collection name for a user."""
    safe = re.sub(r"[^a-zA-Z0-9_]", "_", username.lower())
    return f"user_{safe}"


def get_user_collection(username: str):
    """Get or create a user's private ChromaDB collection."""
    client = _get_client()
    name = _user_collection_name(username)
    return client.get_or_create_collection(
        name=name,
        metadata={"hnsw:space": "cosine"},
    )


def index_user_document(username: str, doc_id: str, title: str, content: str) -> int:
    """Index a document into a user's PRIVATE collection. Returns chunk count."""
    collection = get_user_collection(username)
    chunks = _chunk_text(content)

    documents = []
    metadatas = []
    ids = []

    for i, chunk in enumerate(chunks):
        chunk_id = f"{doc_id}::{i}"
        documents.append(chunk)
        metadatas.append({
            "title": title,
            "folder": f"uploads/{username}",
            "file": f"uploads/{username}/{doc_id}.md",
            "chunk": i,
            "owner": username,
        })
        ids.append(chunk_id)

    if documents:
        # Upsert so re-uploading same doc replaces it
        collection.upsert(documents=documents, metadatas=metadatas, ids=ids)

    logger.info(f"Indexed {len(documents)} chunks into user collection '{username}' for doc '{title}'")
    return len(documents)


def delete_user_document(username: str, doc_id: str):
    """Remove a document from a user's collection."""
    try:
        collection = get_user_collection(username)
        # Get all IDs matching this doc_id prefix
        all_ids = collection.get(where={"file": f"uploads/{username}/{doc_id}.md"})
        if all_ids and all_ids["ids"]:
            collection.delete(ids=all_ids["ids"])
            logger.info(f"Deleted {len(all_ids['ids'])} chunks for doc '{doc_id}' from user '{username}'")
    except Exception as e:
        logger.error(f"Failed to delete user doc: {e}")


# ---------------------------------------------------------------------------
# Retrieval (shared vault + user-scoped)
# ---------------------------------------------------------------------------

def retrieve(query: str, n_results: int = 8) -> str:
    """Retrieve relevant vault context for a query (shared only)."""
    collection = get_collection()
    if collection is None or collection.count() == 0:
        return ""

    results = collection.query(query_texts=[query], n_results=n_results)

    if not results or not results["documents"] or not results["documents"][0]:
        return ""

    context_parts = []
    seen_titles = set()

    for doc, meta in zip(results["documents"][0], results["metadatas"][0]):
        title = meta["title"]
        if title not in seen_titles:
            context_parts.append(f"## {title} ({meta['folder']})\n{doc}")
            seen_titles.add(title)
        else:
            context_parts.append(doc)

    return "\n\n---\n\n".join(context_parts)


def retrieve_with_sources(query: str, n_results: int = 8, username: str = None) -> tuple[str, list[dict]]:
    """
    Retrieve relevant context from shared vault AND user's private docs.
    Returns (context_string, sources_list).
    User docs are searched separately and merged — no cross-user leakage.
    """
    all_docs = []
    all_metas = []
    all_distances = []

    # 1. Search shared vault
    collection = get_collection()
    if collection and collection.count() > 0:
        results = collection.query(query_texts=[query], n_results=n_results)
        if results and results["documents"] and results["documents"][0]:
            all_docs.extend(results["documents"][0])
            all_metas.extend(results["metadatas"][0])
            dists = results.get("distances", [[]])[0] if results.get("distances") else [0.5] * len(results["documents"][0])
            all_distances.extend(dists)

    # 2. Search user's private collection (if username provided)
    if username:
        try:
            user_col = get_user_collection(username)
            if user_col.count() > 0:
                user_results = user_col.query(query_texts=[query], n_results=min(n_results, 5))
                if user_results and user_results["documents"] and user_results["documents"][0]:
                    all_docs.extend(user_results["documents"][0])
                    all_metas.extend(user_results["metadatas"][0])
                    u_dists = user_results.get("distances", [[]])[0] if user_results.get("distances") else [0.3] * len(user_results["documents"][0])
                    all_distances.extend(u_dists)
                    logger.info(f"Retrieved {len(user_results['documents'][0])} chunks from user '{username}' collection")
        except Exception as e:
            logger.warning(f"Failed to query user collection for '{username}': {e}")

    if not all_docs:
        return "", []

    # 3. Sort by distance (lower = more relevant) and take top n_results
    combined = sorted(zip(all_docs, all_metas, all_distances), key=lambda x: x[2])
    combined = combined[:n_results]

    context_parts = []
    sources = []
    seen_titles = set()

    for doc, meta, distance in combined:
        title = meta["title"]
        folder = meta["folder"]
        relevance = round(max(0, 1 - distance) * 100)

        if title not in seen_titles:
            context_parts.append(f"## {title} ({folder})\n{doc}")
            sources.append({
                "title": title,
                "folder": folder,
                "file": meta.get("file", ""),
                "relevance": relevance,
            })
            seen_titles.add(title)
        else:
            context_parts.append(doc)

    return "\n\n---\n\n".join(context_parts), sources
