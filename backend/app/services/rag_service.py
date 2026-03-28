"""
RAG service for Stardrop GTM Agent.
Indexes all Obsidian vault notes into ChromaDB and retrieves relevant context per query.
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

_collection = None


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
    """Load all vault notes into ChromaDB."""
    global _collection

    client = chromadb.PersistentClient(path=str(CHROMA_PATH))

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
            })
            ids.append(doc_id)

    if documents:
        # ChromaDB has a batch limit of 5461
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
    """Get or initialize the collection."""
    global _collection
    if _collection is None:
        init_vector_store()
    return _collection


def retrieve(query: str, n_results: int = 8) -> str:
    """Retrieve relevant vault context for a query."""
    collection = get_collection()
    if collection is None or collection.count() == 0:
        return ""

    results = collection.query(
        query_texts=[query],
        n_results=n_results,
    )

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
