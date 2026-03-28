# Technical Design Document: Next-Gen GTM

**Project:** Stardrop -- Next-Generation Go-To-Market Intelligence Agent
**Authors:** Arihant Choudhary (City Intelligence)
**Version:** 2.0
**Date:** 2026-03-27
**Status:** Production (v1), Active Development
**Repository:** [City-Intelligence-Inc/next-gen-gtm](https://github.com/City-Intelligence-Inc/next-gen-gtm)

---

## Table of Contents

1. [System Overview](#1-system-overview)
2. [Data Flow Diagrams](#2-data-flow-diagrams)
3. [Component Descriptions](#3-component-descriptions)
4. [Data Models](#4-data-models)
5. [API Specification](#5-api-specification)
6. [Environment Integration Architecture](#6-environment-integration-architecture)
7. [Self-Improving Architecture](#7-self-improving-architecture)
8. [Infrastructure](#8-infrastructure)
9. [Security](#9-security)
10. [Deployment](#10-deployment)
11. [Future Architecture](#11-future-architecture)

---

## 1. System Overview

Stardrop is an AI-powered Go-To-Market intelligence agent deployed as a real-time Twitter/X bot (`@stardroplin`). It ingests GTM questions via social mentions, retrieves relevant domain knowledge from a curated 60+ note Obsidian research vault through Retrieval-Augmented Generation (RAG), classifies user intent across six GTM automation categories, and generates specific, actionable intelligence using GPT-4o.

The system is designed around the concept of **Environmental Engineering** -- treating each connected SaaS tool as a formal environment with defined interfaces, authentication schemes, data models, and health monitoring. This abstraction enables systematic, progressive integration of heterogeneous GTM toolchains into a coherent, self-improving operating system.

### 1.1 Live Endpoints

| Endpoint | URL |
|----------|-----|
| Frontend | https://next-gen-gtm.vercel.app |
| Backend API | https://xitwxb23yn.us-east-1.awsapprunner.com |
| Health Check | https://xitwxb23yn.us-east-1.awsapprunner.com/health |
| Intent Listing | https://xitwxb23yn.us-east-1.awsapprunner.com/api/gtm/intents |
| Paper Outline | [`next-gen-gtm-vault/paper/PAPER-OUTLINE.md`](next-gen-gtm-vault/paper/PAPER-OUTLINE.md) |

### 1.2 Architecture Diagram

```
                            EXTERNAL ENVIRONMENTS
  ┌──────────────────────────────────────────────────────────────────────┐
  │                                                                      │
  │  ┌──────────┐   ┌──────────┐   ┌──────────┐   ┌──────────────────┐ │
  │  │ Twitter/X │   │  OpenAI  │   │  GitHub  │   │      Luma        │ │
  │  │  (OAuth   │   │ (GPT-4o) │   │  (App)   │   │    (Events)      │ │
  │  │  1.0a)    │   │          │   │          │   │                  │ │
  │  └─────┬─────┘   └────┬─────┘   └────┬─────┘   └────────┬─────────┘ │
  └────────┼──────────────┼──────────────┼───────────────────┼───────────┘
           │              │              │                   │
           │ poll/post    │ chat         │ repo ops          │ event ops
           │              │ completions  │                   │
  ┌────────┼──────────────┼──────────────┼───────────────────┼───────────┐
  │        ▼              ▼              ▼                   ▼           │
  │  ┌──────────────────────────────────────────────────────────────┐   │
  │  │                     FastAPI Application                      │   │
  │  │                     (AWS App Runner)                         │   │
  │  │                                                              │   │
  │  │  ┌────────────┐  ┌────────────┐  ┌────────────────────────┐ │   │
  │  │  │  REST API   │  │   Worker   │  │    Lifespan Manager    │ │   │
  │  │  │  Endpoints  │  │ Poll Loop  │  │  (init RAG, start      │ │   │
  │  │  │             │  │ (daemon    │  │   worker thread)       │ │   │
  │  │  │ /health     │  │  thread)   │  │                        │ │   │
  │  │  │ /api/gtm/*  │  │            │  │                        │ │   │
  │  │  └──────┬──────┘  └─────┬──────┘  └────────────────────────┘ │   │
  │  │         │               │                                     │   │
  │  │         ▼               ▼                                     │   │
  │  │  ┌──────────────────────────────────────────────────────┐    │   │
  │  │  │                    GTM Engine                         │    │   │
  │  │  │                                                      │    │   │
  │  │  │   ┌────────────┐  ┌─────────────┐  ┌─────────────┐  │    │   │
  │  │  │   │  Intent    │  │   OpenAI    │  │   RAG       │  │    │   │
  │  │  │   │  Detector  │  │   Service   │  │   Service   │  │    │   │
  │  │  │   │  (regex)   │  │  (GPT-4o)  │  │  (ChromaDB) │  │    │   │
  │  │  │   └────────────┘  └─────────────┘  └──────┬──────┘  │    │   │
  │  │  │                                           │          │    │   │
  │  │  └───────────────────────────────────────────┼──────────┘    │   │
  │  │                                              │               │   │
  │  │  ┌────────────────┐  ┌───────────────────────▼──────────┐   │   │
  │  │  │   Feedback     │  │     ChromaDB Vector Store        │   │   │
  │  │  │   Service      │  │     (Persistent, Embedded)       │   │   │
  │  │  │   (JSONL log,  │  │                                  │   │   │
  │  │  │    learnings)  │  │  ┌─────────────────────────────┐ │   │   │
  │  │  └────────────────┘  │  │  next-gen-gtm-vault/        │ │   │   │
  │  │                      │  │  60+ Obsidian notes          │ │   │   │
  │  │                      │  │  441 chunks indexed          │ │   │   │
  │  │                      │  │  10 categories               │ │   │   │
  │  │                      │  └─────────────────────────────┘ │   │   │
  │  │                      └──────────────────────────────────┘   │   │
  │  └──────────────────────────────────────────────────────────────┘   │
  │                                                                     │
  │  ┌──────────────────────────────────────────────────────────────┐   │
  │  │                   State Persistence                          │   │
  │  │   .worker_state.json   .feedback_log.jsonl   .learnings.json │   │
  │  └──────────────────────────────────────────────────────────────┘   │
  │                         BACKEND (Python 3.12)                       │
  └─────────────────────────────────────────────────────────────────────┘

  ┌─────────────────────────────────────────────────────────────────────┐
  │                    FRONTEND (Next.js 15 / Vercel)                   │
  │                                                                     │
  │  Landing page: hero, live demo embed, how-it-works, capabilities,  │
  │  environments (6 live + 17 planned), stats, research section, CTA  │
  └─────────────────────────────────────────────────────────────────────┘
```

### 1.3 Technology Summary

| Layer | Technology | Version |
|-------|-----------|---------|
| Backend Framework | FastAPI | 0.115.6 |
| Runtime | Python | 3.12 |
| ASGI Server | Uvicorn | 0.34.0 |
| LLM Provider | OpenAI GPT-4o | via openai 1.82.0 |
| Vector Store | ChromaDB | 1.5.5 (embedded, persistent) |
| Embeddings | all-MiniLM-L6-v2 | ChromaDB default (384-dim) |
| Twitter Client | Tweepy | 4.14.0 |
| Data Validation | Pydantic | 2.11+ |
| HTTP Client | httpx | 0.28.1 |
| AWS SDK | boto3 | 1.34.144 |
| Frontend | Next.js + React 19 | 15.3.3 |
| Styling | Tailwind CSS | 4.x |
| Compute | AWS App Runner | Python 3.12 runtime |
| Frontend Hosting | Vercel | -- |
| Container | Docker | Python 3.12-slim base |

### 1.4 Directory Structure

```
next-gen-gtm/
├── backend/
│   ├── app/
│   │   ├── main.py                 # FastAPI app, lifespan events
│   │   ├── config.py               # Pydantic Settings from .env
│   │   ├── models.py               # Mention, GTMResult schemas
│   │   ├── worker.py               # Background polling loop
│   │   └── services/
│   │       ├── gtm_engine.py       # Intent detection + orchestration
│   │       ├── openai_service.py   # GPT-4o with RAG + learnings
│   │       ├── twitter_service.py  # Tweepy wrapper (read + write)
│   │       ├── rag_service.py      # ChromaDB indexing + retrieval
│   │       └── feedback_service.py # Engagement tracking + learning
│   ├── Dockerfile
│   ├── apprunner.yaml
│   └── requirements.txt
├── frontend/
│   ├── src/app/page.tsx            # Landing page
│   ├── package.json
│   └── next.config.ts
├── next-gen-gtm-vault/             # 60+ Obsidian research notes
│   ├── concepts/
│   ├── motions/
│   ├── frameworks/
│   ├── tools/
│   ├── case-studies/
│   ├── architecture/
│   ├── data-infrastructure/
│   ├── roles/
│   ├── signals/
│   ├── paper/
│   └── resources/
├── infra/                          # Infrastructure (planned)
├── DESIGN.md                       # This document
├── CLAUDE.md                       # Agent instructions
└── README.md
```

---

## 2. Data Flow Diagrams

### 2.1 Mention-to-Response Pipeline

This is the core processing pipeline, triggered every 60 seconds by the worker poll loop.

```
 ┌──────────────────────────────────────────────────────────────────────┐
 │                     MENTION-TO-RESPONSE PIPELINE                     │
 └──────────────────────────────────────────────────────────────────────┘

 Twitter/X API
      │
      │  GET /2/users/:id/mentions
      │  (OAuth 1.0a, max_results=10, since_id=last_tweet_id)
      │
      ▼
 ┌──────────────┐     ┌───────────────────────────────────────────────┐
 │ fetch_mentions│────▶│  For each mention:                            │
 │  (tweepy)    │     │                                               │
 └──────────────┘     │  1. Deduplicate (check processed_ids)         │
                      │  2. Skip self-mentions (@stardroplin)         │
                      │  3. Check has_already_replied (search API)     │
                      │                                               │
                      │  If new + not self + not replied:              │
                      └──────────────────────┬────────────────────────┘
                                             │
                                             ▼
                      ┌──────────────────────────────────────────────┐
                      │              process_mention()                │
                      │                                              │
                      │  1. Parse into Mention model                 │
                      │  2. Strip @stardroplin tag from text         │
                      │  3. detect_intent(clean_text)                │
                      │     - Regex match against 6 intent patterns  │
                      │     - Fallback: "general_gtm"                │
                      │  4. analyze_tweet(clean_text, author)        │
                      │     a. retrieve(query) -- RAG lookup          │
                      │        - ChromaDB cosine similarity, top-8   │
                      │        - Deduplicated by source note title   │
                      │     b. get_learnings_context()               │
                      │        - Load .learnings.json                │
                      │        - Format top patterns + best intent   │
                      │     c. Compose messages:                     │
                      │        [system_prompt, rag_context,          │
                      │         learnings, user_query]               │
                      │     d. OpenAI chat.completions.create()      │
                      │        - model: gpt-4o                       │
                      │        - temperature: 0.8                    │
                      │        - max_tokens: 1200                    │
                      │     e. Parse JSON array from response        │
                      │     f. Enforce: <=280 chars, max 4 tweets    │
                      │  5. Return GTMResult                         │
                      └──────────────────────┬───────────────────────┘
                                             │
                                             ▼
                      ┌──────────────────────────────────────────────┐
                      │           post_reply_thread()                 │
                      │                                              │
                      │  For each tweet in response_tweets:          │
                      │    1. Prepend @author_username to first      │
                      │    2. Truncate to 280 chars if needed        │
                      │    3. POST create_tweet (in_reply_to chain)  │
                      │    4. Collect posted tweet IDs               │
                      └──────────────────────┬───────────────────────┘
                                             │
                                             ▼
                      ┌──────────────────────────────────────────────┐
                      │         log_response() + save_state()        │
                      │                                              │
                      │  - Append to .feedback_log.jsonl             │
                      │  - Update .worker_state.json                 │
                      │    (last_tweet_id, processed_ids[-500:])     │
                      └──────────────────────────────────────────────┘
```

### 2.2 RAG Retrieval Flow

```
 ┌──────────────────────────────────────────────────────────────────────┐
 │                        RAG RETRIEVAL FLOW                            │
 └──────────────────────────────────────────────────────────────────────┘

 INDEXING (on application startup via lifespan):

 next-gen-gtm-vault/
 ├── concepts/          (7 notes)
 ├── motions/           (6 notes)
 ├── frameworks/        (6 notes)
 ├── tools/             (11 notes)
 ├── case-studies/      (5 notes)
 ├── architecture/      (3 notes)
 ├── data-infrastructure/ (7 notes)
 ├── roles/             (2 notes)
 ├── signals/           (3 notes)
 ├── resources/         (1 note)
 └── paper/             (1 note)
      │
      │  For each .md file:
      │    1. Read content (UTF-8)
      │    2. Strip YAML frontmatter (--- delimited)
      │    3. Chunk: 800 chars, 100 char overlap
      │    4. Generate doc_id: "{relative_path}::{chunk_index}"
      │    5. Attach metadata: {title, folder, file, chunk}
      │
      ▼
 ┌──────────────────────────────────────────────────────────────────┐
 │  ChromaDB PersistentClient                                       │
 │  Collection: "gtm_vault"                                         │
 │  Similarity: cosine (HNSW index)                                 │
 │  Embeddings: all-MiniLM-L6-v2 (ChromaDB default, 384-dim)       │
 │  Total chunks: ~441                                              │
 │  Batch size: 5000 (ChromaDB limit: 5461)                         │
 └──────────────────────────────────────────────────────────────────┘


 RETRIEVAL (per query, at inference time):

 User Query
      │
      │  collection.query(query_texts=[query], n_results=8)
      │
      ▼
 ┌──────────────────────────────────────────────────────────────────┐
 │  ChromaDB returns top-8 chunks ranked by cosine similarity       │
 │                                                                  │
 │  Post-processing:                                                │
 │    1. Iterate (document, metadata) pairs                         │
 │    2. Deduplicate by note title (first chunk per title gets      │
 │       header "## Title (folder)")                                │
 │    3. Join with "---" separator                                  │
 │    4. Return as single context string                            │
 └──────────────────────────────────────────────────────────────────┘
      │
      ▼
 Injected into OpenAI messages as:
 {"role": "system", "content": "RELEVANT GTM KNOWLEDGE (from research vault):\n\n{context}"}
```

### 2.3 Feedback Loop

```
 ┌──────────────────────────────────────────────────────────────────────┐
 │                         FEEDBACK LOOP                                │
 └──────────────────────────────────────────────────────────────────────┘

 PHASE 1: LOGGING (immediate, after every reply)

 post_reply_thread() returns posted_ids
      │
      ▼
 log_response(mention_id, text, intent, response_tweets, reply_ids)
      │
      │  Append to .feedback_log.jsonl:
      │  {
      │    "ts": "2026-03-27T...",
      │    "mention_id": "...",
      │    "mention_text": "..." (truncated 200 chars),
      │    "intent": "icp_analyzer",
      │    "response_tweets": ["...", "..."],
      │    "reply_ids": ["...", "..."],
      │    "engagement": null          <-- filled in Phase 2
      │  }
      │
      ▼

 PHASE 2: COLLECTION (every 10 poll cycles, ~10 minutes)

 collect_feedback()
      │
      │  For each entry in .feedback_log.jsonl where engagement=null:
      │
      │    Skip if ts < 1 hour ago (wait for engagement to accumulate)
      │
      │    GET /2/tweets/:id?tweet_fields=public_metrics
      │    (first reply_id, via OAuth 1.0a)
      │
      │    Update entry with:
      │    "engagement": {
      │      "likes": N,
      │      "retweets": N,
      │      "replies": N
      │    }
      │
      ▼

 PHASE 3: LEARNING EXTRACTION (_update_learnings)

 Triggered when new engagement data is collected.
 Requires >= 3 entries with engagement data.

      │  1. Score each response:
      │     score = likes * 3 + replies * 5 + retweets * 2
      │
      │  2. Sort by score descending
      │
      │  3. Extract top 5 patterns:
      │     {intent, score, example_tweet, engagement}
      │
      │  4. Compute per-intent average scores:
      │     {intent: {avg_score, count}}
      │
      │  5. Write .learnings.json:
      │     {updated_at, total_responses, avg_score,
      │      top_patterns[], avoid_patterns[], best_intents{}}
      │
      ▼

 PHASE 4: PROMPT AUGMENTATION (at inference time)

 get_learnings_context()
      │
      │  Read .learnings.json
      │  Format top 3 patterns as:
      │
      │  "LEARNINGS FROM PAST RESPONSES (use these to improve):
      │   - High-engagement (5L/2R) intent=icp_analyzer: "Target..."
      │   - High-engagement (3L/1R) intent=signal_scanner: "Look..."
      │   - Best performing intent: competitor_intel (avg score 18.5)"
      │
      ▼
 Injected into OpenAI messages as additional system context,
 closing the loop: Act -> Observe -> Learn -> Improve
```

---

## 3. Component Descriptions

### 3.1 FastAPI Application (`backend/app/main.py`)

The central application server with three responsibilities:

1. **Lifespan management**: On startup, initializes the ChromaDB vector store by indexing all vault notes (`init_vector_store()`), then spawns the worker thread as a daemon if `TWITTER_BEARER_TOKEN` is present.
2. **REST API**: Exposes health check, manual analysis, and intent listing endpoints.
3. **CORS middleware**: Configured with permissive `allow_origins=["*"]` for cross-origin frontend access.

The lifespan context manager ensures that RAG indexing completes before the worker begins polling, preventing queries against an empty vector store.

### 3.2 Worker (`backend/app/worker.py`)

A synchronous poll loop running in a background daemon thread, spawned during application lifespan. Core responsibilities:

- **Poll cycle**: Calls `fetch_mentions()` every `POLL_INTERVAL_SECONDS` (default: 60s) with `since_id` tracking for incremental fetching.
- **Deduplication**: Maintains file-based state (`.worker_state.json`) with the last processed tweet ID and a rolling buffer of the 500 most recent processed IDs.
- **Self-mention filtering**: Skips tweets authored by `@stardroplin` to prevent response loops.
- **Reply deduplication**: Calls `has_already_replied()` to search for existing replies in the conversation before processing.
- **Feedback collection**: Every 10 poll cycles (~10 minutes), triggers `collect_feedback()` to check engagement metrics on past replies.
- **Graceful degradation**: If Twitter write credentials (`TWITTER_ACCESS_TOKEN`, `TWITTER_ACCESS_SECRET`) are missing, logs the generated response to stdout instead of posting.
- **Error isolation**: Each mention is processed in its own try/except block. A failure on one mention does not prevent processing of subsequent mentions.

### 3.3 Twitter Service (`backend/app/services/twitter_service.py`)

Manages all Twitter/X API v2 interactions via Tweepy with OAuth 1.0a user authentication.

| Function | Purpose | Twitter API Endpoint |
|----------|---------|---------------------|
| `fetch_mentions(since_id)` | Retrieve recent @stardroplin mentions | `GET /2/users/:id/mentions` |
| `has_already_replied(tweet_id)` | Check for existing replies in a conversation | `GET /2/tweets/search/recent` |
| `post_reply_thread(tweets, reply_to, author)` | Post a multi-tweet reply thread | `POST /2/tweets` (chained) |

Key implementation details:
- Hardcoded `STARDROP_USER_ID = "1963782341442330624"` for the mentions endpoint.
- `wait_on_rate_limit=True` on the Tweepy client for automatic rate limit handling (blocks thread on 429).
- Reply threads are chained by setting `in_reply_to_tweet_id` to the previous tweet's ID.
- First tweet in a thread is prefixed with `@{author_username}` for proper mention threading.
- All tweets are truncated to 280 characters (277 + "..." if over limit).
- Username lookup uses the `expansions=["author_id"]` parameter to resolve author IDs to usernames.

### 3.4 OpenAI Service (`backend/app/services/openai_service.py`)

Orchestrates LLM inference with RAG context injection and feedback-driven prompt augmentation.

**System prompt design**: The prompt encodes six behavioral rules:
1. **SPECIFIC** -- Name real tools, real numbers, real frameworks.
2. **ACTIONABLE** -- Not "improve outreach" but "email the VP Marketing with subject: X."
3. **SIGNAL-AWARE** -- Reference fit signals, intent signals, engagement signals.
4. **THIS-WEEK MOVE** -- Every response ends with one concrete action for this week.
5. **CASE-STUDY GROUNDED** -- Reference Ramp ($32B), Figma ($10B), Datadog (120% NRR), Notion ($10B), Clay ($5B) when relevant.
6. **DECISIVE** -- Never say "it depends." Commit to a recommendation.

**Message composition** (ordered):
1. System prompt (fixed GTM agent persona + rules)
2. RAG context system message (retrieved vault chunks, conditional)
3. Learnings context system message (from feedback loop, conditional)
4. User message (the cleaned tweet text with attribution)

**Model configuration**: `gpt-4o`, temperature 0.8, max_tokens 1200.

**Response parsing pipeline**:
1. Strip markdown code fences if present (` ```json ... ``` `).
2. Attempt `json.loads()` to extract a JSON array of strings.
3. Filter: keep only strings <= 280 chars, take first 4.
4. Fallback (if JSON parsing fails): If raw text <= 280 chars, return as single tweet. Otherwise, split at word boundaries into 275-char chunks, take first 4.

### 3.5 RAG Service (`backend/app/services/rag_service.py`)

Manages the ChromaDB vector store lifecycle over the Obsidian research vault.

**Vault path discovery** (checked in order):
1. `{project_root}/next-gen-gtm-vault/` -- local development
2. `{backend_root}/next-gen-gtm-vault/` -- Docker build with copied vault
3. `/app/next-gen-gtm-vault/` -- Docker absolute path

**Indexing pipeline** (`init_vector_store()`):
1. Delete and recreate the `gtm_vault` collection (fresh index on every startup).
2. Recursively glob all `.md` files from the vault directory.
3. For each file: read UTF-8 content, strip YAML frontmatter (delimited by `---`), skip empty files.
4. Chunk into 800-character segments with 100-character overlap.
5. Generate document IDs as `{relative_path}::{chunk_index}`.
6. Attach metadata: `{title, folder, file, chunk}`.
7. Batch insert into ChromaDB in groups of 5000 (below the 5461 per-batch limit).
8. Collection configured with cosine similarity and HNSW indexing.

**Retrieval** (`retrieve(query, n_results=8)`):
1. Query ChromaDB with the raw text query (ChromaDB handles embedding internally).
2. Receive top-8 chunks ranked by cosine similarity.
3. Deduplicate by source note title: the first chunk from each unique title gets a `## Title (folder)` header; subsequent chunks from the same title appear without headers.
4. Join all chunks with `---` separators.
5. Return as a single context string for injection into the system prompt.

### 3.6 GTM Engine (`backend/app/services/gtm_engine.py`)

The intent detection and mention processing orchestration layer.

**Intent taxonomy** (7 categories, regex-based detection):

| Intent | Pattern Examples | Fallback |
|--------|-----------------|----------|
| `competitor_intel` | `analyz[es]? (competitor\|@\w+)`, `tell me about @\w+` | No |
| `icp_analyzer` | `who should I sell to`, `(icp\|ideal customer\|target market)` | No |
| `signal_scanner` | `find signals`, `buying signals`, `detect intent` | No |
| `gtm_roast` | `roast (my\|our) gtm`, `review (my\|our) (gtm\|strategy)` | No |
| `stack_advisor` | `(gtm\|tech\|tool) stack`, `recommend (tools\|stack)` | No |
| `outbound_generator` | `turn this into (outbound\|email)`, `write (me\|an?) email` | No |
| `general_gtm` | *(no pattern match)* | Yes |

**Processing flow** (`process_mention(mention_data)`):
1. Parse raw dict into `Mention` model via Pydantic validation.
2. Strip `@stardroplin` tag from the text (case-insensitive regex).
3. Detect intent via `detect_intent(clean_text)` -- iterates patterns in priority order, returns first match or `general_gtm`.
4. Call `analyze_tweet(clean_text, author_username)` which triggers RAG retrieval, learnings injection, and GPT-4o inference.
5. Return `GTMResult` with the mention, detected intent, and response tweets.

### 3.7 Feedback Service (`backend/app/services/feedback_service.py`)

Implements the self-improving feedback loop through four phases (see Section 2.3 for the full data flow diagram).

**Phase 1 -- Logging** (`log_response`): Appends each response to `.feedback_log.jsonl` with mention metadata, detected intent, generated tweets, posted tweet IDs, and null engagement (to be filled later).

**Phase 2 -- Collection** (`collect_feedback`): Reads the JSONL log, identifies entries older than 1 hour with null engagement, fetches `public_metrics` (likes, retweets, replies) from the Twitter API for the first reply tweet ID. Writes updated entries back to the log file. Triggers learning extraction when new data is collected.

**Phase 3 -- Learning extraction** (`_update_learnings`): Requires at least 3 scored entries. Scores responses using the formula `likes * 3 + replies * 5 + retweets * 2`. Extracts top-5 performing patterns and computes per-intent average scores. Writes structured learnings to `.learnings.json`.

**Phase 4 -- Prompt augmentation** (`get_learnings_context`): Reads `.learnings.json` at inference time, formats the top-3 patterns and best-performing intent into a human-readable system message, injected into the GPT-4o prompt to guide future response generation.

**Scoring rationale**: Replies are weighted 5x (strongest engagement -- someone took the time to respond), likes 3x (approval signal), retweets 2x (shareability/reach signal).

### 3.8 Configuration (`backend/app/config.py`)

Pydantic Settings class loading from environment variables with `.env` file fallback.

| Setting | Type | Default | Purpose |
|---------|------|---------|---------|
| `openai_api_key` | str | "" | GPT-4o API access |
| `twitter_consumer_key` | str | "" | OAuth 1.0a app identity |
| `twitter_consumer_secret` | str | "" | OAuth 1.0a app secret |
| `twitter_bearer_token` | str | "" | App-only read access (also used as worker enable flag) |
| `twitter_access_token` | str | "" | User-level read+write |
| `twitter_access_secret` | str | "" | User-level secret |
| `aws_region` | str | "us-east-1" | AWS region for DynamoDB (planned) |
| `dynamodb_table_name` | str | "next-gen-gtm-mentions" | DynamoDB table (planned) |
| `stardrop_username` | str | "stardroplin" | Bot username for self-mention filtering |
| `poll_interval_seconds` | int | 60 | Worker poll interval in seconds |

---

## 4. Data Models

### 4.1 Current Models (`backend/app/models.py`)

```python
class Mention(BaseModel):
    tweet_id: str
    author_id: str
    author_username: str
    text: str
    conversation_id: str
    created_at: str

class GTMResult(BaseModel):
    mention: Mention
    intent: str                    # one of 7 intent categories
    response_tweets: list[str]     # 1-4 tweets, each <= 280 chars
    replied: bool = False
    created_at: str = ""           # auto-set to UTC ISO timestamp via model_post_init
```

### 4.2 Internal State Models (file-based)

**Worker State** (`.worker_state.json`):
```json
{
  "last_tweet_id": "1234567890",
  "processed_ids": ["1234567890", "1234567891"]
}
```
Rolling buffer of last 500 processed IDs prevents unbounded growth.

**Feedback Log** (`.feedback_log.jsonl`, one JSON object per line):
```json
{
  "ts": "2026-03-27T12:00:00",
  "mention_id": "1234567890",
  "mention_text": "who should I sell to? we built an AI code review tool (truncated at 200 chars)",
  "intent": "icp_analyzer",
  "response_tweets": ["Target: Engineering Managers at B2B SaaS..."],
  "reply_ids": ["1234567900"],
  "engagement": { "likes": 5, "retweets": 1, "replies": 2 }
}
```

**Learnings** (`.learnings.json`):
```json
{
  "updated_at": "2026-03-27T13:00:00",
  "total_responses": 42,
  "avg_score": 12.5,
  "top_patterns": [
    {
      "intent": "icp_analyzer",
      "score": 35,
      "example_tweet": "Target: Engineering Managers at B2B SaaS...",
      "engagement": { "likes": 5, "retweets": 2, "replies": 3 }
    }
  ],
  "avoid_patterns": [],
  "best_intents": {
    "icp_analyzer": { "avg_score": 18.5, "count": 12 },
    "competitor_intel": { "avg_score": 15.2, "count": 8 }
  }
}
```

### 4.3 Planned Data Models (v2)

The following models formalize the entities required for multi-environment GTM orchestration, extending the system from a single-channel Twitter agent to a full GTM operating system.

#### Entity Relationship Diagram

```
 ┌─────────────────────────────────────────────────────────────────────┐
 │                                                                     │
 │   Account 1───────* Contact                                         │
 │      │                  │                                           │
 │      │ 1                │ 1                                         │
 │      │  *               │  *                                        │
 │   Signal             Signal                                         │
 │      │                  │                                           │
 │      ▼                  ▼                                           │
 │   Score (Account)    Score (Contact)                                │
 │      │                  │                                           │
 │      ▼                  ▼                                           │
 │   Play ──────────▶ Event ──────────▶ Outcome                       │
 │                                                                     │
 └─────────────────────────────────────────────────────────────────────┘
```

#### Account

A company or organization in the target market.

```python
class Account(BaseModel):
    id: str                           # UUID
    name: str                         # Company name
    domain: str                       # Primary web domain
    industry: str | None              # Industry vertical
    employee_count: int | None        # Headcount
    funding_stage: str | None         # Seed, Series A, B, C, D, etc.
    funding_total: float | None       # Total funding in USD
    tech_stack: list[str]             # Detected technologies
    icp_fit_score: float | None       # 0-100, ICP match score
    source_environment: str           # Environment that created this record
    external_ids: dict[str, str]      # {hubspot: "123", salesforce: "456", ...}
    created_at: datetime
    updated_at: datetime
    enrichment_freshness: datetime    # Last enrichment timestamp
```

#### Contact

An individual person associated with an Account.

```python
class Contact(BaseModel):
    id: str                           # UUID
    account_id: str                   # FK -> Account
    first_name: str
    last_name: str
    email: str | None
    linkedin_url: str | None
    title: str | None                 # Job title
    seniority: str | None             # C-level, VP, Director, Manager, IC
    department: str | None            # Engineering, Sales, Marketing, etc.
    twitter_handle: str | None
    persona: str | None               # Mapped buyer persona
    external_ids: dict[str, str]      # Cross-environment ID mapping
    created_at: datetime
    updated_at: datetime
```

#### Signal

An observed event indicating intent, fit change, or engagement.

```python
class Signal(BaseModel):
    id: str                           # UUID
    signal_type: str                  # "fit" | "intent" | "engagement"
    signal_category: str              # e.g., "job_posting", "funding_round",
                                      #   "pricing_page_visit", "g2_research",
                                      #   "hiring_surge", "tech_stack_change"
    source_environment: str           # e.g., "common_room", "unify", "segment"
    account_id: str | None            # FK -> Account
    contact_id: str | None            # FK -> Contact
    strength: float                   # 0.0-1.0 normalized signal strength
    raw_data: dict                    # Original payload from source environment
    detected_at: datetime
    expires_at: datetime | None       # Signal decay timestamp
```

#### Score

A computed score for an Account or Contact, derived from accumulated Signals.

```python
class Score(BaseModel):
    id: str                           # UUID
    entity_type: str                  # "account" | "contact"
    entity_id: str                    # FK -> Account or Contact
    score_type: str                   # "lead_score", "pql_score",
                                      #   "health_score", "icp_fit"
    value: float                      # 0-100
    components: dict[str, float]      # Breakdown: {fit: 40, intent: 35, engagement: 25}
    model_version: str                # Scoring model version identifier
    computed_at: datetime
    confidence: float                 # 0.0-1.0 model confidence
```

#### Play

An automated action sequence triggered by Signal + Score conditions.

```python
class Play(BaseModel):
    id: str                           # UUID
    name: str                         # Human-readable name
    trigger_conditions: dict          # {signal_type: "intent",
                                      #  min_score: 60, icp_tier: ["A", "B"]}
    actions: list[dict]               # Ordered action sequence:
                                      #  [{type: "enrich", env: "clay"},
                                      #   {type: "email", env: "instantly",
                                      #    template: "cold_outbound_v2"},
                                      #   {type: "alert", env: "slack",
                                      #    channel: "#sales-signals"}]
    is_active: bool
    created_by: str
    created_at: datetime
    execution_count: int
    avg_outcome_score: float | None   # Rolling average of outcome quality
```

#### Event

A logged execution of an action from a Play.

```python
class Event(BaseModel):
    id: str                           # UUID
    play_id: str                      # FK -> Play
    action_type: str                  # "enrich", "email", "alert", "crm_update"
    target_environment: str           # Environment where action executed
    account_id: str | None            # FK -> Account
    contact_id: str | None            # FK -> Contact
    payload: dict                     # What was sent/executed
    status: str                       # "pending", "executed", "failed", "skipped"
    error_message: str | None
    executed_at: datetime
    latency_ms: int | None            # Execution latency
```

#### Outcome

A tracked result of a Play execution, closing the feedback loop for model improvement.

```python
class Outcome(BaseModel):
    id: str                           # UUID
    event_id: str                     # FK -> Event
    play_id: str                      # FK -> Play
    outcome_type: str                 # "reply", "meeting_booked",
                                      #   "opportunity_created", "deal_closed",
                                      #   "churned", "expanded"
    outcome_value: float | None       # Revenue amount if applicable (USD)
    attribution_weight: float         # 0.0-1.0 for multi-touch attribution
    observed_at: datetime
    feedback_signal: dict             # Derived signal for model retraining
```

---

## 5. API Specification

### 5.1 Current Endpoints

#### `GET /`
Landing page (HTML response). Returns a styled HTML page with capabilities listing, API documentation links, and a CTA to tag @stardroplin on X.

**Response**: `text/html`, status 200

---

#### `GET /health`
Health check endpoint for AWS App Runner and monitoring.

**Response** (status 200):
```json
{
  "status": "ok",
  "agent": "@stardroplin",
  "worker": "running" | "disabled"
}
```
`worker` is `"running"` if `TWITTER_BEARER_TOKEN` is set, `"disabled"` otherwise.

---

#### `POST /api/gtm/analyze`
Manual GTM analysis trigger for testing without Twitter integration.

**Query Parameters:**

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `text` | string | yes | -- | The GTM question to analyze |
| `author` | string | no | `"test_user"` | Author username for context |

**Response** (status 200):
```json
{
  "intent": "icp_analyzer",
  "response_tweets": [
    "Target: Engineering Managers at B2B SaaS (50-500 employees)...",
    "Signal: Companies posting 'hiring senior engineers'...",
    "This week: Use Apollo to find 50 Engineering Managers..."
  ]
}
```

---

#### `GET /api/gtm/intents`
Lists all supported GTM intent categories with example triggers.

**Response** (status 200):
```json
{
  "intents": [
    {"id": "competitor_intel", "example": "analyze competitor @acmecorp"},
    {"id": "icp_analyzer", "example": "who should I sell to? we built an AI writing tool"},
    {"id": "signal_scanner", "example": "find signals for AI startups in SF"},
    {"id": "gtm_roast", "example": "roast my GTM strategy"},
    {"id": "stack_advisor", "example": "what GTM stack should I use?"},
    {"id": "outbound_generator", "example": "turn this into outbound: [thread]"},
    {"id": "general_gtm", "example": "any other GTM question"}
  ]
}
```

### 5.2 Planned Endpoints (v2)

#### Accounts

| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/api/accounts` | List accounts with filtering (ICP score, industry, funding stage, employee count) |
| `GET` | `/api/accounts/:id` | Get account detail with contacts, signals, scores, events |
| `POST` | `/api/accounts` | Create account (manual or from environment sync) |
| `PUT` | `/api/accounts/:id` | Update account fields |
| `POST` | `/api/accounts/:id/enrich` | Trigger enrichment waterfall for account |

#### Contacts

| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/api/contacts` | List contacts with filtering (seniority, department, persona) |
| `GET` | `/api/contacts/:id` | Get contact detail with signals, scores, account context |
| `POST` | `/api/contacts` | Create contact |
| `PUT` | `/api/contacts/:id` | Update contact fields |

#### Signals

| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/api/signals` | List recent signals with filtering by type, source, account |
| `POST` | `/api/signals` | Ingest signal (from webhook or manual creation) |
| `GET` | `/api/signals/stream` | SSE (Server-Sent Events) stream of real-time signals |

#### Scores

| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/api/scores/:entity_type/:entity_id` | Get current scores for an account or contact |
| `POST` | `/api/scores/recompute` | Trigger score recomputation for a segment |
| `GET` | `/api/scores/distribution` | Score distribution analytics across the database |

#### Plays

| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/api/plays` | List configured plays with execution stats |
| `POST` | `/api/plays` | Create a new play (trigger conditions + action sequence) |
| `PUT` | `/api/plays/:id` | Update play configuration |
| `POST` | `/api/plays/:id/execute` | Manually trigger a play for a specific account/contact |
| `GET` | `/api/plays/:id/metrics` | Play performance metrics (conversion rate, avg outcome, ROI) |

#### Events and Outcomes

| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/api/events` | List events with filtering by play, status, environment |
| `GET` | `/api/outcomes` | List outcomes with attribution data |
| `POST` | `/api/outcomes` | Record an outcome (closing the feedback loop for model training) |

#### Environments

| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/api/environments` | List all configured environments with health status |
| `POST` | `/api/environments/:id/validate` | Validate environment credentials and permissions |
| `GET` | `/api/environments/:id/health` | Get environment health metrics (uptime, latency, error rate) |
| `POST` | `/api/environments/:id/sync` | Trigger a manual data sync from/to the environment |

#### Analytics and Webhooks

| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/api/analytics/flywheel` | Flywheel metrics (data volume, model accuracy, conversion trends) |
| `GET` | `/api/analytics/feedback` | Feedback loop performance (collection rate, learning quality) |
| `GET` | `/api/analytics/learnings` | Current learnings from the feedback system |
| `POST` | `/api/webhooks/:environment` | Generic webhook receiver for environment events |

---

## 6. Environment Integration Architecture

### 6.1 Formal Environment Model

Drawing from the Environmental Engineering framework described in the [paper outline](next-gen-gtm-vault/paper/PAPER-OUTLINE.md), each GTM environment is modeled as a formal 5-tuple:

```
Environment E_i = (API_i, Auth_i, Schema_i, Rate_i, Health_i)

Where:
  API_i    : Set of available API endpoints with input/output specifications
  Auth_i   : Authentication protocol (OAuth 1.0a, OAuth 2.0, API key, webhook signature)
  Schema_i : Data model -- entities, relationships, field types, and constraints
  Rate_i   : Rate limiting constraints -- requests per window, daily caps, concurrency limits
  Health_i : Monitoring function returning environment availability and error state
```

A complete GTM system is then defined as:

```
GTM System G = (E, A, K, O)

Where:
  E = {E_1, ..., E_n}  : The set of configured environments
  A                     : The AI agent with access to all environments
  K                     : The knowledge base (indexed domain knowledge)
  O                     : The orchestration rules (plays: signal -> action mappings)
```

### 6.2 Abstract Connector Interface

All environment connectors implement a unified interface enabling environment-agnostic orchestration:

```python
from abc import ABC, abstractmethod
from datetime import datetime

class EnvironmentConnector(ABC):
    """Abstract interface for GTM environment integration.

    All environment connectors implement this interface, enabling:
    1. Uniform agent interaction with heterogeneous environments
    2. Environment-agnostic play orchestration
    3. Hot-swapping environments without agent retraining
    """

    @abstractmethod
    async def validate(self, credentials: dict) -> bool:
        """Validate that credentials are correct and have required permissions."""

    @abstractmethod
    async def pull(
        self,
        entity_type: str,
        since: datetime | None = None,
        filters: dict | None = None,
    ) -> list[Record]:
        """Pull records from the environment.
        Used for: enrichment lookups, signal fetching, contact sync.
        """

    @abstractmethod
    async def push(
        self,
        entity_type: str,
        data: list[Record],
    ) -> PushResult:
        """Push records to the environment.
        Used for: CRM updates, score writes, outbound sends.
        """

    @abstractmethod
    async def handle_webhook(
        self,
        payload: dict,
        headers: dict,
    ) -> list[Event]:
        """Process an incoming webhook and extract events/signals."""

    @abstractmethod
    async def health_check(self) -> HealthStatus:
        """Return current environment availability, latency, and error state."""
```

### 6.3 Environment Taxonomy

Seven functional classes, each with a characteristic integration pattern:

```
┌─────────────────────────────────────────────────────────────────────────┐
│                       ENVIRONMENT TAXONOMY                              │
├──────────────┬───────────────────────┬──────────────┬───────────────────┤
│ Class        │ Function              │ Interface    │ Examples          │
│              │                       │ Pattern      │                   │
├──────────────┼───────────────────────┼──────────────┼───────────────────┤
│ Signal       │ Detect buying intent  │ Webhook push │ Common Room,      │
│              │                       │ + poll       │ Unify, G2         │
├──────────────┼───────────────────────┼──────────────┼───────────────────┤
│ Enrichment   │ Add data to records   │ Request-     │ Clay, Apollo,     │
│              │                       │ response     │ Clearbit          │
├──────────────┼───────────────────────┼──────────────┼───────────────────┤
│ CRM          │ System of record      │ Bi-          │ HubSpot,          │
│              │                       │ directional  │ Salesforce, Attio │
├──────────────┼───────────────────────┼──────────────┼───────────────────┤
│ Outbound     │ Send messages         │ Fire-and-    │ Instantly,        │
│              │                       │ forget +     │ LinkedIn, Slack   │
│              │                       │ status poll  │                   │
├──────────────┼───────────────────────┼──────────────┼───────────────────┤
│ Data         │ Store and model       │ Batch +      │ Snowflake,        │
│              │                       │ streaming    │ Segment, Hightouch│
├──────────────┼───────────────────────┼──────────────┼───────────────────┤
│ Intelligence │ Analyze interactions  │ Pull         │ Gong, Pocus       │
│              │                       │ analytics    │                   │
├──────────────┼───────────────────────┼──────────────┼───────────────────┤
│ Billing      │ Revenue events        │ Webhook push │ Stripe            │
└──────────────┴───────────────────────┴──────────────┴───────────────────┘
```

### 6.4 Progressive Integration Maturity Model

Each environment progresses through five integration levels:

```
Level 0 ──▶ Level 1 ──▶ Level 2 ──▶ Level 3 ──▶ Level 4

  Disconnected   Read-only    Bi-directional  Event-driven  Self-improving
  (no access)    (pull data)  (read + write)  (real-time    (agent learns
                                               webhooks)     from outcomes)
```

| Level | Name | Description | Agent Capability |
|-------|------|-------------|-----------------|
| **0** | Disconnected | Environment exists but no agent access | None |
| **1** | Read-only | Agent can pull data from the environment | Enrichment, signal reading |
| **2** | Bi-directional | Agent can read and write records | CRM sync, score pushing |
| **3** | Event-driven | Real-time webhooks trigger agent actions | Instant signal response |
| **4** | Self-improving | Agent learns from environment outcomes | Model retraining from results |

### 6.5 Current Environment Status

| Environment | Class | Auth Type | Integration Level | Status |
|-------------|-------|-----------|-------------------|--------|
| **X / Twitter** | Signal + Outbound | OAuth 1.0a (4 credentials) | Level 2 (read mentions + write replies) | **Live** |
| **OpenAI (GPT-4o)** | Intelligence | API key | Level 1 (inference only) | **Live** |
| **ChromaDB** | Data (Knowledge) | Local (embedded) | Level 2 (index + query) | **Live** |
| **AWS App Runner** | Compute | IAM (ECR + instance role) | Level 2 (deploy + serve) | **Live** |
| **GitHub** | Data (Code) | GitHub App (private key) | Level 2 (repo operations) | **Live** |
| **Luma** | Signal (Events) | API key | Level 1 (event read) | **Live** |
| HubSpot | CRM | OAuth 2.0 | Level 0 | Planned |
| Salesforce | CRM | OAuth 2.0 | Level 0 | Planned |
| Slack | Outbound | OAuth 2.0 + webhooks | Level 0 | Planned |
| Clay | Enrichment | API key | Level 0 | Planned |
| Apollo | Enrichment + Outbound | API key | Level 0 | Planned |
| Instantly | Outbound | API key | Level 0 | Planned |
| Attio | CRM | API key | Level 0 | Planned |
| Common Room | Signal | API key + webhooks | Level 0 | Planned |
| Unify | Signal | API key + webhooks | Level 0 | Planned |
| Pocus | Intelligence | API key | Level 0 | Planned |
| Hightouch | Data | API key | Level 0 | Planned |
| Snowflake | Data | OAuth 2.0 + key pair | Level 0 | Planned |
| Segment | Data | API key + webhooks | Level 0 | Planned |
| Stripe | Billing | API key + webhook secret | Level 0 | Planned |
| LinkedIn | Outbound | OAuth 2.0 | Level 0 | Planned |
| Gong | Intelligence | API key | Level 0 | Planned |
| Google Ads + Meta | Outbound (Paid) | OAuth 2.0 | Level 0 | Planned |

---

## 7. Self-Improving Architecture

### 7.1 Theoretical Foundation

The self-improving architecture draws from four established frameworks, mapping organizational learning theory to concrete software architecture:

| Framework | Source | Application in Stardrop |
|-----------|--------|------------------------|
| **OODA Loop** | Boyd (1976) | Observe signals -> Orient with RAG -> Decide response strategy -> Act via environments -> **Learn** from engagement |
| **Double-Loop Learning** | Argyris (1977) | Single loop: optimize tweet phrasing. Double loop: question which intents to prioritize, whether Twitter is the right channel |
| **Flywheel Effect** | Collins (2001) | More responses -> more engagement data -> better learnings -> better responses -> more followers -> more mentions |
| **Antifragility** | Taleb (2012) | Low-engagement responses train the system to avoid those patterns; API failures trigger fallback paths that improve resilience |

### 7.2 Current Implementation (v1)

The v1 feedback loop implements single-loop learning on Twitter engagement metrics:

```
                    ┌──────────────────────────┐
                    │     POST REPLY THREAD     │
                    └─────────────┬────────────┘
                                  │
                                  ▼
                    ┌──────────────────────────┐
                    │  LOG: .feedback_log.jsonl │
                    │  (mention, intent,        │
                    │   response, reply_ids)    │
                    └─────────────┬────────────┘
                                  │
                         wait >= 1 hour
                                  │
                                  ▼
                    ┌──────────────────────────┐
                    │  COLLECT: Twitter API     │
                    │  GET public_metrics       │
                    │  (likes, retweets,        │
                    │   replies)                │
                    └─────────────┬────────────┘
                                  │
                                  ▼
                    ┌──────────────────────────┐
                    │  SCORE: L*3 + R*5 + RT*2 │
                    │  (requires >= 3 entries)  │
                    └─────────────┬────────────┘
                                  │
                                  ▼
                    ┌──────────────────────────┐
                    │  EXTRACT: .learnings.json│
                    │  - Top 5 patterns         │
                    │  - Per-intent avg scores  │
                    │  - Best performing intent │
                    └─────────────┬────────────┘
                                  │
                                  ▼
                    ┌──────────────────────────┐
                    │  AUGMENT: system prompt   │
                    │  Inject learnings into    │
                    │  next GPT-4o call         │
                    └──────────────────────────┘
                                  │
                                  │ (closes the loop)
                                  ▼
                    ┌──────────────────────────┐
                    │  NEXT RESPONSE IS BETTER │
                    └──────────────────────────┘
```

**Scoring formula**: `score = (likes * 3) + (replies * 5) + (retweets * 2)`

**Rationale**: Replies indicate deep engagement (5x) -- someone took the time to respond. Likes indicate approval (3x). Retweets indicate shareability (2x).

**Collection cadence**: Every 10 poll cycles (~10 minutes), with a 1-hour minimum delay after posting to allow engagement to accumulate.

**Minimum data threshold**: 3 scored entries required before learnings extraction activates.

### 7.3 Planned Self-Improving Components (v2)

#### Outcome Store
Every action (email, call, meeting, demo) linked to every outcome (reply, meeting booked, opportunity created, deal closed, churned, expanded). Full attribution chain: `Signal -> Play -> Event -> Outcome -> Revenue`. This closes the loop from "we sent an email" to "it generated $X in pipeline."

#### Experiment Engine
Multi-armed bandit system for automated A/B testing:
- **Variants**: Message content, send timing, channel selection, scoring weights, ICP definitions.
- **Algorithm**: Thompson Sampling or UCB1 for variant selection.
- **Explore/exploit ratio**: 20% exploration (try new variants), 80% exploitation (use best-known variant).
- **Auto-graduation**: When a variant achieves statistical significance (p < 0.05, minimum 100 observations), automatically promote the winner and retire the loser.
- **Double-loop trigger**: When an entire approach underperforms (not just a variant), surface the insight for strategic review.

#### Model Registry
Version-controlled scoring models, analogous to code version control:
- **Versioning**: Every scoring model gets a semver identifier and is stored with its training data and evaluation metrics.
- **Auto-retraining**: When prediction accuracy drops below a configured threshold, trigger retraining on new outcome data.
- **A/B deployment**: New models are deployed alongside current models; traffic is split until the new model proves superior.
- **Rollback**: Automatic rollback if a new model performs worse than baseline.

#### Insight Surfacer (Double-Loop Learning)
Periodic analysis of outcomes against assumptions:
- "Deals from community signals close 3x faster than cold outbound -- consider shifting budget."
- "ICP definition may be too broad: MQLs from the 500+ employee segment convert at 2% vs. 12% for 50-200."
- "Engineering Managers respond to technical case studies 4x more than ROI messaging."

This component challenges the underlying strategy, not just the tactical execution.

#### Flywheel Dashboard
Time-series tracking of system improvement:
- Data volume (signals ingested, records enriched, interactions logged)
- Model accuracy (scoring prediction vs. actual outcomes)
- Conversion rates (signal-to-meeting, meeting-to-pipeline, pipeline-to-revenue)
- Feedback loop latency (time from action to outcome observation)
- Compounding rate (week-over-week improvement percentage)

Answers the single most important question: **"Is our GTM engine getting better every month?"**

### 7.4 Compounding Math

Assuming a 1% weekly improvement through automated optimization:

| Metric | Month 0 | Month 6 | Month 12 | Month 24 |
|--------|---------|---------|----------|----------|
| Email reply rate | 2.0% | 3.3% | 5.5% | 15.0% |
| Signal-to-meeting | 5.0% | 8.2% | 13.6% | 37.0% |
| Meeting-to-pipeline | 30.0% | 40.0% | 53.0% | 94.0% |
| Overall conversion | 0.03% | 0.11% | 0.40% | 5.2% |

The compounding creates an unreplicable competitive moat: you can copy a tech stack (tools are public), you can copy a playbook (tactics are shared), but you cannot copy 24 months of accumulated learning (data + models + optimizations).

---

## 8. Infrastructure

### 8.1 Architecture Overview

```
┌──────────────────────────────────────────────────────────────────────┐
│                          AWS (us-east-1)                              │
│                                                                      │
│  ┌────────────────────┐       ┌───────────────────────────────────┐  │
│  │       Amazon       │       │         AWS App Runner            │  │
│  │        ECR         │──────▶│                                   │  │
│  │                    │ pull  │  ┌─────────────────────────────┐  │  │
│  │  next-gen-gtm-     │       │  │   Docker Container          │  │  │
│  │  backend:latest    │       │  │   Python 3.12-slim          │  │  │
│  │                    │       │  │                             │  │  │
│  └────────────────────┘       │  │   uvicorn app.main:app     │  │  │
│                               │  │   :8000                    │  │  │
│  ┌────────────────────┐       │  │                             │  │  │
│  │     DynamoDB       │       │  │   ┌─────────┐ ┌─────────┐  │  │  │
│  │  (planned)         │       │  │   │ FastAPI │ │ Worker  │  │  │  │
│  │                    │       │  │   │ Server  │ │ Thread  │  │  │  │
│  │  Table:            │       │  │   └─────────┘ └─────────┘  │  │  │
│  │  next-gen-gtm-     │       │  │                             │  │  │
│  │  mentions          │       │  │   ┌─────────────────────┐  │  │  │
│  └────────────────────┘       │  │   │ ChromaDB (embedded) │  │  │  │
│                               │  │   │ .chroma_db/         │  │  │  │
│                               │  │   └─────────────────────┘  │  │  │
│                               │  └─────────────────────────────┘  │  │
│                               │                                   │  │
│                               │  URL: xitwxb23yn.us-east-1.      │  │
│                               │       awsapprunner.com            │  │
│                               │  Port: 8000                      │  │
│                               │  Health: GET /health             │  │
│                               │  vCPU: 0.25 (auto-scale)        │  │
│                               └───────────────────────────────────┘  │
└──────────────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────────────┐
│                              Vercel                                   │
│                                                                      │
│  ┌────────────────────────────────────────────────────────────────┐  │
│  │  Next.js 15 Frontend (Static)                                  │  │
│  │  React 19 + Tailwind CSS 4                                     │  │
│  │  Team: city-intelligence-inc                                   │  │
│  └────────────────────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────────────┐
│                        External APIs                                  │
│                                                                      │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────────────────┐ │
│  │ Twitter  │  │  OpenAI  │  │  GitHub  │  │        Luma          │ │
│  │ API v2   │  │  API     │  │  API     │  │        API           │ │
│  └──────────┘  └──────────┘  └──────────┘  └──────────────────────┘ │
└──────────────────────────────────────────────────────────────────────┘
```

### 8.2 AWS App Runner Configuration

From `backend/apprunner.yaml`:

| Setting | Value |
|---------|-------|
| Runtime | Python 3.12 |
| Build command | `pip install -r requirements.txt` |
| Start command | `uvicorn app.main:app --host 0.0.0.0 --port 8000` |
| Port | 8000 |
| Health check path | `/health` |
| Auto-scaling | Default App Runner (0.25 vCPU minimum, scales to demand) |
| Region | us-east-1 |

Environment variables are configured through App Runner service settings (see Section 9 for credential management).

### 8.3 DynamoDB (Planned)

Table `next-gen-gtm-mentions` is configured in settings but not yet implemented. Current state persistence uses local JSON files. Migration plan:

| Current (v1) | Planned (v2) | Rationale |
|--------------|-------------|-----------|
| `.worker_state.json` | DynamoDB `worker-state` table | Multi-instance safe |
| `.feedback_log.jsonl` | DynamoDB `feedback-log` table | Persistent across deploys |
| `.learnings.json` | DynamoDB `learnings` table | Shared across instances |
| ChromaDB (embedded, ephemeral) | Managed vector store (Pinecone or pgvector on RDS) | Persistent across deploys, horizontal scaling |

### 8.4 Frontend Hosting (Vercel)

The Next.js 15 frontend is a static marketing/landing page deployed on Vercel under the `city-intelligence-inc` team. It contains no dynamic server-side data fetching -- all content is statically rendered at build time and served from Vercel's edge network.

### 8.5 Performance Characteristics

| Metric | Value |
|--------|-------|
| Poll interval | 60 seconds |
| Mentions per poll | max 10 |
| End-to-end response latency | ~10-15s (intent detection + RAG retrieval + GPT-4o inference + tweet posting) |
| Tweets per response | 1-4 (each max 280 chars) |
| Vault size | 61 files, ~441 chunks |
| Embedding dimensionality | 384 (all-MiniLM-L6-v2) |
| RAG retrieval | top 8 chunks, cosine similarity |
| GPT-4o temperature | 0.8 |
| GPT-4o max tokens | 1200 |
| Deduplication buffer | last 500 tweet IDs |
| Feedback collection interval | every ~10 minutes |
| Engagement wait period | 1 hour minimum before collection |

---

## 9. Security

### 9.1 Credential Management

All secrets are managed through environment variables, never committed to source control.

| Credential | Type | Scope | Storage |
|-----------|------|-------|---------|
| `OPENAI_API_KEY` | API key | OpenAI chat completions | Env var |
| `TWITTER_CONSUMER_KEY` | OAuth 1.0a | Twitter App identity | Env var |
| `TWITTER_CONSUMER_SECRET` | OAuth 1.0a | Twitter App secret | Env var |
| `TWITTER_BEARER_TOKEN` | OAuth 2.0 bearer | App-only read access | Env var |
| `TWITTER_ACCESS_TOKEN` | OAuth 1.0a | User-level read+write | Env var |
| `TWITTER_ACCESS_SECRET` | OAuth 1.0a | User-level secret | Env var |

**Local development**: Loaded from `.env` file via `pydantic-settings` (`.env` is gitignored).

**Production (App Runner)**: Configured as environment variables in the App Runner service definition via the `apprunner.yaml` or AWS Console. Values are stored encrypted at rest by AWS.

**Planned (v2)**: Migration to AWS Secrets Manager with automatic rotation for API keys. Environment connectors will retrieve credentials at runtime via the Secrets Manager SDK, eliminating static environment variable configuration.

### 9.2 API Authentication

**Current state (v1)**: The REST API has no authentication. The `/api/gtm/analyze` endpoint is publicly accessible. This is acceptable for the current scope since the endpoint triggers read-only analysis with no persistent side effects beyond OpenAI token consumption.

**Planned (v2)**:
- **API key authentication** for all `/api/*` endpoints via `X-API-Key` header.
- **Rate limiting** per API key using a token bucket algorithm (100 requests/minute default, configurable per key).
- **Webhook signature verification** for incoming environment webhooks (HMAC-SHA256, see Section 9.3).
- **OAuth 2.0** for dashboard authentication (frontend-to-backend).
- **RBAC** (Role-Based Access Control) for multi-tenant environments.

### 9.3 Webhook Verification (Planned)

Each environment connector will verify incoming webhooks according to the environment's signing scheme:

| Environment | Verification Method |
|-------------|-------------------|
| Stripe | `Stripe-Signature` header, HMAC-SHA256 with webhook signing secret |
| GitHub | `X-Hub-Signature-256` header, HMAC-SHA256 with webhook secret |
| Slack | `X-Slack-Signature` header, HMAC-SHA256 with signing secret, timestamp validation |
| Segment | Shared secret in header |
| HubSpot | `X-HubSpot-Signature` header, SHA-256 hash |

### 9.4 Data Security Considerations

- **PII handling**: Contact data (emails, names, LinkedIn URLs) will be encrypted at rest when DynamoDB is introduced (DynamoDB encryption at rest is enabled by default).
- **Twitter data retention**: The feedback log stores truncated mention text (200 chars maximum) to minimize PII storage footprint.
- **CORS policy**: Currently permissive (`allow_origins=["*"]`). Production hardening should restrict to the Vercel frontend domain and the App Runner domain.
- **Rate limit protection**: Tweepy's `wait_on_rate_limit=True` prevents 429 errors but can block the worker thread for extended periods. Planned: async client with non-blocking rate limit handling.
- **LLM data**: Tweets and responses are sent to OpenAI's API. No fine-tuning data sharing is enabled. Production deployments should evaluate OpenAI's data retention policies and consider Azure OpenAI for enterprise data residency requirements.

---

## 10. Deployment

### 10.1 Backend Deployment (Docker + ECR + App Runner)

**Docker Build:**
```bash
cd backend/
docker build -t next-gen-gtm-backend .
```

The Dockerfile (`backend/Dockerfile`) uses `python:3.12-slim`:
1. Set working directory to `/app`.
2. Copy and install `requirements.txt` first (enables Docker layer caching for dependencies).
3. Copy application code.
4. Expose port 8000.
5. Start with `uvicorn app.main:app --host 0.0.0.0 --port 8000`.

**Vault inclusion**: The Obsidian vault must be accessible inside the container. Current strategy: copy `next-gen-gtm-vault/` into `backend/` before Docker build. The RAG service checks three paths in priority order (see Section 3.5). Planned: download vault from S3 at startup for decoupled updates.

**ECR Push:**
```bash
# Authenticate Docker to ECR
aws ecr get-login-password --region us-east-1 | \
  docker login --username AWS --password-stdin \
  <account-id>.dkr.ecr.us-east-1.amazonaws.com

# Tag and push
docker tag next-gen-gtm-backend:latest \
  <account-id>.dkr.ecr.us-east-1.amazonaws.com/next-gen-gtm-backend:latest

docker push \
  <account-id>.dkr.ecr.us-east-1.amazonaws.com/next-gen-gtm-backend:latest
```

**App Runner Deploy:**

App Runner supports two deployment triggers:
1. **Automatic**: Detects new ECR image pushes and auto-deploys (if configured).
2. **Manual**: Via CLI:
```bash
aws apprunner start-deployment \
  --service-arn <service-arn> \
  --region us-east-1
```
3. **Source-based**: Connect GitHub repository directly; App Runner builds using `apprunner.yaml` on push.

### 10.2 Frontend Deployment (Vercel)

```bash
cd frontend/

# Ensure correct Vercel team
npx vercel teams switch city-intelligence-inc

# Deploy to production
npx vercel --prod --yes
```

The frontend is a static Next.js site with no server-side data dependencies. Build output is static HTML + JS bundles served from Vercel's global edge network.

### 10.3 CI/CD Pipeline (Planned)

```
┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│  Push to     │────▶│  GitHub      │────▶│  Run tests   │
│  main        │     │  Actions     │     │  (pytest)    │
└──────────────┘     └──────────────┘     └──────┬───────┘
                                                  │
                                           pass   │   fail
                                          ┌───────┴────────┐
                                          ▼                ▼
                                   ┌─────────────┐  ┌───────────┐
                                   │ Docker build │  │ Notify    │
                                   │ + ECR push   │  │ (Slack)   │
                                   └──────┬──────┘  └───────────┘
                                          │
                                          ▼
                                   ┌─────────────┐
                                   │ App Runner   │
                                   │ auto-deploy  │
                                   └──────┬──────┘
                                          │
                                          ▼
                                   ┌─────────────┐
                                   │ Health check │
                                   │ GET /health  │
                                   └──────┬──────┘
                                          │
                                          ▼
                                   ┌─────────────┐
                                   │ Vercel       │
                                   │ frontend     │
                                   │ auto-deploy  │
                                   └─────────────┘
```

**Planned CI steps:**
1. `pytest` for backend unit tests (service mocking, intent detection, response parsing).
2. `mypy` for type checking.
3. Docker build + push to ECR.
4. App Runner auto-deploy on new image.
5. Post-deploy health check (`GET /health`).
6. Slack notification on success/failure.

---

## 11. Future Architecture

### 11.1 GTM Dashboard

A full-stack dashboard replacing the current static landing page:

- **Signal feed**: Real-time stream of detected signals across all connected environments, filterable by type, source, account, and score threshold.
- **Account/contact 360-degree view**: Unified view of any account or contact with all signals, scores, events, outcomes, and cross-environment activity timeline.
- **Play builder**: Visual drag-and-drop interface for constructing signal-to-action plays with branching logic and environment targeting.
- **Flywheel metrics**: Time-series charts showing data volume, model accuracy, conversion rates, and feedback loop latency over time.
- **Environment health**: Status dashboard for all connected environments with uptime, error rate, latency percentiles, and integration level indicators.
- **Learnings explorer**: Browse extracted learnings, top-performing patterns, and strategic insights surfaced by the double-loop learning system.

### 11.2 Goodfire Interpretability Integration

Integration with [Goodfire](https://goodfire.ai) for neural network interpretability applied to GTM intelligence:

- **Response attribution**: Trace which vault notes, which learnings, and which parts of the system prompt contributed most to a specific response. Move beyond token-level attention to concept-level attribution.
- **Intent classifier transparency**: Understand why the LLM classifies ambiguous queries to specific intents, especially for `general_gtm` fallback cases where regex patterns did not match.
- **Scoring model explainability**: When v2 scoring models are deployed, use interpretability tools to explain why an account received a particular score. Critical for sales team trust and adoption.
- **Bias detection**: Identify systematic biases in GTM recommendations (e.g., consistently over-recommending certain tools, over-indexing on specific case studies from the vault).
- **Steerable generation**: Use Goodfire's feature steering to dynamically adjust response style (more aggressive vs. conservative recommendations, technical vs. business language) based on the user's detected persona without prompt engineering.

### 11.3 Multi-Channel Architecture

Extending beyond Twitter/X to support multiple user-facing input and output channels:

```
                     ┌─────────────────┐
                     │   Unified        │
                     │   Message        │
                     │   Router         │
                     └────────┬────────┘
                              │
           ┌──────────┬───────┼────────┬──────────┐
           │          │       │        │          │
      ┌────▼────┐ ┌───▼───┐ ┌▼─────┐ ┌▼───────┐ ┌▼─────┐
      │ Twitter │ │ Slack │ │Email │ │LinkedIn│ │ Web  │
      │ Channel │ │Channel│ │Chan. │ │Channel │ │ Chat │
      └─────────┘ └───────┘ └──────┘ └────────┘ └──────┘
```

Each channel implements a `ChannelAdapter` interface:
- `receive(raw_message) -> NormalizedQuery`: Parse incoming messages from any format into a standard internal query.
- `format(response, channel_constraints) -> ChannelMessage`: Adapt response format to channel constraints (280 chars for Twitter, rich Blocks for Slack, HTML for email, Markdown for web chat).
- `send(channel_message) -> DeliveryResult`: Deliver through the channel's native API and return delivery status.

### 11.4 Experiment Engine

A multi-armed bandit system for automated A/B testing across all GTM actions:

```
                    ┌──────────────────────────────┐
                    │       Experiment Engine        │
                    │                                │
                    │  ┌──────────────────────────┐  │
                    │  │    Variant Selector       │  │
                    │  │    (Thompson Sampling     │  │
                    │  │     / UCB1)               │  │
                    │  └───────────┬──────────────┘  │
                    │              │                  │
                    │  ┌───────────▼──────────────┐  │
                    │  │   Active Experiments      │  │
                    │  │                           │  │
                    │  │  - Message variants       │  │
                    │  │  - Send time variants     │  │
                    │  │  - Channel variants       │  │
                    │  │  - Scoring weight variants │  │
                    │  │  - ICP definition variants │  │
                    │  └───────────┬──────────────┘  │
                    │              │                  │
                    │  ┌───────────▼──────────────┐  │
                    │  │   Statistical Engine      │  │
                    │  │   (significance tests,    │  │
                    │  │    confidence intervals,  │  │
                    │  │    sample size calc)      │  │
                    │  └──────────────────────────┘  │
                    └──────────────────────────────────┘
```

### 11.5 Learning Layer Architecture

The complete v2 architecture adds a Learning Layer atop the six-layer core architecture from the research vault:

```
┌────────────────────────────────────────────────────────────────────┐
│                      LEARNING LAYER (v2)                           │
│  Outcome store, model registry, experiment engine,                │
│  double-loop insight surfacing, flywheel dashboard                │
├────────────────────────────────────────────────────────────────────┤
│                       AI AGENT LAYER                               │
│  Feedback-driven improvement per agent. Agents consume            │
│  intelligence layer data and execute through orchestration.       │
│  Human-in-the-loop for high-stakes; autonomous for routine.       │
├────────────────────────────────────────────────────────────────────┤
│                     ORCHESTRATION LAYER                            │
│  Workflow engine with experiment framework (A/B plays).           │
│  Signal + ICP match -> action sequence across environments.       │
├────────────────────────────────────────────────────────────────────┤
│                     INTELLIGENCE LAYER                             │
│  Lead scoring (ICP fit x intent x engagement), PQL models,       │
│  health scores, intent models. Auto-retraining, adaptive.        │
│  All models transparent and configurable -- not black boxes.      │
├────────────────────────────────────────────────────────────────────┤
│                  IDENTITY & UNIFICATION LAYER                      │
│  Contact/account graph. Identity resolution that learns.          │
│  Self-healing: improves matching accuracy over time.              │
├────────────────────────────────────────────────────────────────────┤
│                    DATA INTEGRATION LAYER                          │
│  Self-healing pipelines. Decay detection. Reverse ETL.            │
│  Enrichment waterfall optimization across providers.              │
├────────────────────────────────────────────────────────────────────┤
│                      DATA FOUNDATION                               │
│  Warehouse (Snowflake/BigQuery/Postgres), outcome store,          │
│  experiment log, model registry. dbt for transformations.         │
└────────────────────────────────────────────────────────────────────┘
```

### 11.6 Roadmap

| Phase | Target | Scope |
|-------|--------|-------|
| **v1 (shipped)** | -- | Twitter agent, RAG over 60+ vault notes, 7-intent detection, engagement feedback loop, App Runner deployment, Vercel landing page |
| **v2: Multi-Environment** | Q2 2026 | Abstract connector interface, 3-5 new environments (HubSpot, Slack, Clay), DynamoDB persistence, API authentication, webhook ingestion |
| **v3: Intelligence** | Q3 2026 | Account/Contact/Signal/Score data models, lead scoring engine, multi-source signal ingestion, scoring dashboard |
| **v4: Orchestration** | Q4 2026 | Play builder, experiment engine, multi-channel activation (Slack, email, LinkedIn), Goodfire interpretability |
| **v5: Self-Improving** | Q1 2027 | Full learning layer, model registry with auto-retraining, double-loop insight surfacing, flywheel dashboard, outcome-to-revenue attribution |

### 11.7 Known Limitations

| Limitation | Impact | Planned Resolution |
|-----------|--------|-------------------|
| File-based state persistence | Not safe for multi-instance; state lost on redeploy | DynamoDB migration (v2) |
| Single worker thread | No horizontal scaling of poll loop | Celery + Redis or AWS SQS (v2) |
| Regex-only intent detection | ~85% accuracy on clear queries, poor on ambiguous | GPT-4 classification fallback or fine-tuned model (v2) |
| Static knowledge base | Vault rebuilt on every startup, no incremental updates; knowledge decays as tools change | Incremental indexing + automated vault refresh (v3) |
| No API authentication | `/api/gtm/analyze` is publicly accessible | API key auth + rate limiting (v2) |
| Permissive CORS | `allow_origins=["*"]` allows any origin | Restrict to frontend domain (v2) |
| Synchronous Twitter client | `wait_on_rate_limit=True` blocks worker thread | Async Tweepy client or custom async wrapper (v2) |
| Embedded ChromaDB | Vector store ephemeral across App Runner deploys | Managed vector store (Pinecone / pgvector) (v2) |

---

## References

1. Boyd, J. R. (1976). *Destruction and Creation*. Unpublished manuscript.
2. Argyris, C. (1977). Double loop learning in organizations. *Harvard Business Review*, 55(5), 115-125.
3. Collins, J. (2001). *Good to Great: Why Some Companies Make the Leap and Others Don't*. Harper Business.
4. Taleb, N. N. (2012). *Antifragile: Things That Gain from Disorder*. Random House.
5. Meadows, D. H. (2008). *Thinking in Systems: A Primer*. Chelsea Green Publishing.
6. Senge, P. M. (1990). *The Fifth Discipline: The Art & Practice of the Learning Organization*. Doubleday.
7. Lewis, P. et al. (2020). Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks. *NeurIPS 2020*.
8. Yao, S. et al. (2023). ReAct: Synergizing Reasoning and Acting in Language Models. *ICLR 2023*.
9. Zhou, S. et al. (2023). WebArena: A Realistic Web Environment for Building Autonomous Agents. *ICLR 2024*.
10. Qin, Y. et al. (2023). ToolLLM: Facilitating Large Language Models to Master 16000+ Real-world APIs. *NeurIPS 2023*.
11. Wu, Q. et al. (2023). AutoGen: Enabling Next-Gen LLM Applications via Multi-Agent Conversation. *arXiv preprint*.
12. Schick, T. et al. (2023). Toolformer: Language Models Can Teach Themselves to Use Tools. *NeurIPS 2023*.
13. Gao, Y. et al. (2024). Retrieval-Augmented Generation for Large Language Models: A Survey. *arXiv preprint*.

---

*This document supports the paper: "Environmental Engineering for Go-To-Market Systems: A Framework for Configuring, Orchestrating, and Self-Improving Multi-Environment AI Agents" -- in preparation for arXiv cs.AI. Full paper outline at [`next-gen-gtm-vault/paper/PAPER-OUTLINE.md`](next-gen-gtm-vault/paper/PAPER-OUTLINE.md).*
