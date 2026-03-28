import threading
import logging
from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.responses import HTMLResponse
from fastapi.middleware.cors import CORSMiddleware
from app.config import settings
from app.services.gtm_engine import process_mention, detect_intent
from app.services.improvement_tracker import get_improvement_data, compute_daily_snapshot
from app.services.openai_service import analyze_tweet
from app.worker import run_loop
from app.services.rag_service import init_vector_store

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(name)s: %(message)s",
)
logger = logging.getLogger("gtm-api")


def _background_init():
    """Run slow init tasks in a background thread so the server starts fast."""
    import time
    time.sleep(2)  # let uvicorn bind first
    try:
        count = init_vector_store()
        logger.info(f"RAG vector store ready: {count} chunks indexed")
    except Exception as e:
        logger.error(f"RAG init failed: {e}")

    try:
        if settings.twitter_access_token and settings.twitter_access_secret:
            run_loop()
    except Exception as e:
        logger.error(f"Worker failed: {e}")


@asynccontextmanager
async def lifespan(app: FastAPI):
    bg = threading.Thread(target=_background_init, daemon=True)
    bg.start()
    logger.info("Background init started (RAG + worker)")
    yield


app = FastAPI(title="Next-Gen GTM Agent", version="1.0.0", lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allow_headers=["*"],
    expose_headers=["*"],
    allow_credentials=False,
    max_age=3600,
)


@app.get("/", response_class=HTMLResponse)
async def root():
    return """<!DOCTYPE html>
<html><head><meta charset="utf-8"><title>Stardrop — GTM Intelligence Agent</title>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Newsreader:ital,wght@1,400&display=swap" rel="stylesheet">
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{font-family:Inter,-apple-system,sans-serif;background:#fff;color:#171717;min-height:100vh;display:flex;align-items:center;justify-content:center}
.c{max-width:580px;padding:48px 24px;text-align:center}
h1{font-family:Newsreader,Georgia,serif;font-style:italic;font-size:2.8rem;margin-bottom:12px;letter-spacing:-0.03em;font-weight:400}
.sub{color:#737373;font-size:1rem;margin-bottom:36px;line-height:1.7;letter-spacing:-0.005em}
.sub a{color:#171717;font-weight:500;text-decoration:underline;text-underline-offset:4px;text-decoration-color:#d4d4d4}
.sub a:hover{text-decoration-color:#171717}
.cards{display:flex;flex-direction:column;gap:12px;text-align:left;margin-bottom:32px}
.card{border:1px solid #e5e5e5;border-radius:12px;padding:20px}
.card h3{font-size:0.8rem;font-weight:600;text-transform:uppercase;letter-spacing:0.15em;color:#a3a3a3;margin-bottom:10px}
.card p{color:#525252;font-size:0.9rem;line-height:1.7}
code{background:#f5f5f5;padding:2px 6px;border-radius:4px;font-size:0.8rem;color:#171717}
.btn{display:inline-block;background:#171717;color:#fff;padding:10px 24px;border-radius:8px;font-size:0.875rem;font-weight:500;text-decoration:none;transition:background 0.15s}
.btn:hover{background:#404040}
.footer{margin-top:36px;color:#a3a3a3;font-size:0.8rem}
.footer a{color:#737373;text-decoration:none}
.footer a:hover{color:#171717}
</style></head><body><div class="c">
<h1>Stardrop</h1>
<p class="sub">Tag <a href="https://x.com/stardroplin">@stardroplin</a> on X with any GTM question. Competitive intel, ICP analysis, signal detection, stack recommendations, outbound copy.</p>

<div class="cards">
<div class="card"><h3>Capabilities</h3>
<p>
<code>analyze competitor @company</code><br>
<code>who should I sell to?</code><br>
<code>find signals for [market]</code><br>
<code>roast my GTM</code><br>
<code>what GTM stack should I use?</code><br>
<code>turn this into outbound</code>
</p></div>

<div class="card"><h3>API</h3>
<p>
<code>POST /api/gtm/analyze?text=...&amp;author=...</code><br>
<code>GET /api/gtm/intents</code><br>
<code>GET /health</code>
</p></div>
</div>

<a href="https://x.com/intent/tweet?text=@stardroplin%20" class="btn">Tag @stardroplin on X</a>

<p class="footer"><a href="https://x.com/arichoudhary">@arichoudhary</a> &bull; City Intelligence</p>
</div></body></html>"""


@app.get("/health")
async def health():
    return {"status": "ok", "agent": "@stardroplin", "worker": "running" if settings.twitter_bearer_token else "disabled"}


@app.post("/api/gtm/analyze")
async def analyze(text: str, author: str = "test_user"):
    """Manually trigger GTM analysis (for testing without Twitter)."""
    tweets = analyze_tweet(text, author)
    intent = detect_intent(text)
    return {"intent": intent, "response_tweets": tweets}


@app.get("/api/gtm/intents")
async def list_intents():
    """List all supported GTM intents."""
    return {
        "intents": [
            {"id": "competitor_intel", "example": "analyze competitor @acmecorp"},
            {"id": "icp_analyzer", "example": "who should I sell to? we built an AI writing tool"},
            {"id": "signal_scanner", "example": "find signals for AI startups in SF"},
            {"id": "gtm_roast", "example": "roast my GTM strategy"},
            {"id": "stack_advisor", "example": "what GTM stack should I use?"},
            {"id": "outbound_generator", "example": "turn this into outbound: [thread]"},
            {"id": "general_gtm", "example": "any other GTM question"},
        ]
    }


@app.get("/api/dashboard/insights")
async def dashboard_insights():
    """Goodfire-style interpretability data."""
    from app.services import db_service
    from collections import Counter, defaultdict

    mentions = db_service.get_all_mentions(limit=200)
    entries = [m for m in mentions if m.get("type") != "improvement"]

    daily_scores = defaultdict(list)
    for m in entries:
        ts = m.get("ts", "")[:10]
        eng = m.get("engagement")
        if eng and isinstance(eng, dict):
            score = int(eng.get("likes", 0) or 0) * 3 + int(eng.get("replies", 0) or 0) * 5 + int(eng.get("retweets", 0) or 0) * 2
            daily_scores[ts].append(score)

    timeline = [{"date": d, "avg_score": round(sum(s) / len(s), 1), "max_score": max(s), "count": len(s)} for d, s in sorted(daily_scores.items())]

    intent_engagement = defaultdict(list)
    for m in entries:
        eng = m.get("engagement")
        if eng and isinstance(eng, dict):
            score = int(eng.get("likes", 0) or 0) * 3 + int(eng.get("replies", 0) or 0) * 5 + int(eng.get("retweets", 0) or 0) * 2
            intent_engagement[m.get("intent", "general_gtm")].append(score)

    intent_perf = {k: {"avg_score": round(sum(v) / len(v), 1), "count": len(v), "best": max(v)} for k, v in intent_engagement.items()}

    scored = []
    for m in entries:
        eng = m.get("engagement") or {}
        score = int(eng.get("likes", 0) or 0) * 3 + int(eng.get("replies", 0) or 0) * 5 + int(eng.get("retweets", 0) or 0) * 2
        tweets = m.get("response_tweets", [])
        scored.append({"score": score, "intent": m.get("intent"), "question": (m.get("text", "") or "")[:100], "response": tweets[0][:150] if tweets else "", "author": m.get("author_username", ""), "likes": int(eng.get("likes", 0) or 0), "replies": int(eng.get("replies", 0) or 0), "retweets": int(eng.get("retweets", 0) or 0)})
    scored.sort(key=lambda x: x["score"], reverse=True)

    total_score = sum(s["score"] for s in scored)
    return {
        "timeline": timeline,
        "intent_performance": intent_perf,
        "top_responses": scored[:10],
        "worst_responses": scored[-5:] if len(scored) > 5 else [],
        "prompt_versions": [
            {"version": "v1", "date": "2026-03-27", "change": "Initial system prompt"},
            {"version": "v2", "date": "2026-03-27", "change": "RAG over 60+ vault notes"},
            {"version": "v3", "date": "2026-03-27", "change": "Bo voice — zero fluff, no hashtags"},
            {"version": "v4", "date": "2026-03-28", "change": "Per-user agents + document upload"},
        ],
        "summary": {"total_mentions": len(entries), "total_with_engagement": sum(1 for s in scored if s["score"] > 0), "total_score": total_score, "avg_score": round(total_score / max(len(entries), 1), 1)},
    }


@app.get("/api/dashboard/overview")
async def dashboard_overview():
    """Dashboard data from DynamoDB."""
    from datetime import datetime
    from collections import Counter
    from app.services import db_service

    mentions = db_service.get_all_mentions(limit=100)
    # Filter out improvements
    entries = [m for m in mentions if m.get("type") != "improvement"]

    now = datetime.utcnow()
    today = now.date().isoformat()
    today_entries = [e for e in entries if e.get("ts", "").startswith(today)]
    week_entries = []
    for e in entries:
        try:
            ts = datetime.fromisoformat(e.get("ts", ""))
            if (now - ts).days < 7:
                week_entries.append(e)
        except (ValueError, TypeError):
            pass

    intent_counts = Counter(e.get("intent", "general_gtm") for e in entries)
    total_intents = max(sum(intent_counts.values()), 1)
    intent_dist = {k: round(v / total_intents * 100) for k, v in intent_counts.most_common()}

    engagement_scores = []
    for e in entries:
        eng = e.get("engagement")
        if eng and isinstance(eng, dict):
            score = int(eng.get("likes", 0) or 0) * 3 + int(eng.get("replies", 0) or 0) * 5 + int(eng.get("retweets", 0) or 0) * 2
            engagement_scores.append(score)
    avg_engagement = round(sum(engagement_scores) / max(len(engagement_scores), 1), 1)

    recent = []
    for e in entries[:20]:
        eng = e.get("engagement") or {}
        response_tweets = e.get("response_tweets", [])
        recent.append({
            "ts": e.get("ts"),
            "author": f"@{e.get('author_username', 'unknown')}: {(e.get('text', '') or '')[:80]}",
            "mention_id": e.get("mention_id"),
            "intent": e.get("intent"),
            "response_preview": response_tweets[0][:120] if response_tweets else "",
            "likes": int(eng.get("likes", 0) or 0),
            "replies": int(eng.get("replies", 0) or 0),
            "retweets": int(eng.get("retweets", 0) or 0),
            "replied": e.get("replied", False),
        })

    worker_state = db_service.get_state("worker") or {}

    return {
        "stats": {
            "total_mentions": len(entries),
            "mentions_today": len(today_entries),
            "mentions_this_week": len(week_entries),
            "replies_sent": sum(1 for e in entries if e.get("replied")),
            "avg_engagement_score": avg_engagement,
            "total_learnings": 0,
            "note": None,
        },
        "intent_distribution": intent_dist,
        "recent_mentions": recent,
        "learnings": [],
        "worker": {
            "last_tweet_id": worker_state.get("last_tweet_id"),
            "processed_count": len(worker_state.get("processed_ids", [])),
        },
        "environments": {
            "twitter": "live",
            "openai": "live",
            "chromadb": "live",
            "app_runner": "live",
            "github": "live",
            "luma": "live",
        },
    }


@app.get("/api/dashboard/improvement")
async def dashboard_improvement():
    """1% better every day — compound improvement tracker."""
    compute_daily_snapshot()
    return get_improvement_data()


@app.post("/api/improve")
async def save_improvement(request: dict = None):
    """Save a user-provided improvement to DynamoDB."""
    from app.services import db_service

    if not request:
        return {"error": "No data"}

    username = request.get("username", "")
    db_service.save_improvement({
        "question": request.get("question", ""),
        "original_response": request.get("original_response", []),
        "improved_response": request.get("improved_response", ""),
        "rating": request.get("rating", ""),
        "username": username,
    })

    return {"status": "saved", "username": username or "global"}


@app.get("/api/improvements")
async def list_improvements():
    """List all saved improvements from DynamoDB."""
    from app.services import db_service
    items = db_service.get_improvements()
    return {"improvements": items, "total": len(items)}


@app.post("/api/user/onboard")
async def onboard_user(request: dict = None):
    """Create or get a user by Twitter username."""
    from app.services import db_service
    if not request or not request.get("username"):
        return {"error": "username required"}
    username = request["username"].lower().strip().lstrip("@")
    existing = db_service.get_user(username)
    if existing:
        return {"user": existing, "new": False}
    user = db_service.save_user(username)
    return {"user": user, "new": True}


@app.get("/api/user/{username}")
async def get_user(username: str):
    """Get user profile + their mentions."""
    from app.services import db_service
    user = db_service.get_user(username)
    if not user:
        return {"error": "User not found. Onboard first via POST /api/user/onboard"}
    mentions = db_service.get_mentions_for_user(username)
    return {"user": user, "mentions": mentions, "total_mentions": len(mentions)}


@app.get("/api/dashboard/{username}")
async def user_dashboard(username: str):
    """Per-user dashboard data — only their mentions."""
    from app.services import db_service
    from collections import Counter

    user = db_service.get_user(username)
    mentions = db_service.get_mentions_for_user(username)

    intent_counts = Counter(m.get("intent", "general_gtm") for m in mentions)
    total_intents = max(sum(intent_counts.values()), 1)

    engagement_scores = []
    for m in mentions:
        eng = m.get("engagement")
        if eng and isinstance(eng, dict):
            s = int(eng.get("likes", 0) or 0) * 3 + int(eng.get("replies", 0) or 0) * 5 + int(eng.get("retweets", 0) or 0) * 2
            engagement_scores.append(s)

    recent = []
    for m in mentions[:20]:
        eng = m.get("engagement") or {}
        response_tweets = m.get("response_tweets", [])
        recent.append({
            "ts": m.get("ts"),
            "author": f"@{m.get('author_username', 'unknown')}: {(m.get('text', '') or '')[:80]}",
            "mention_id": m.get("mention_id"),
            "intent": m.get("intent"),
            "response_preview": response_tweets[0][:120] if response_tweets else "",
            "likes": int(eng.get("likes", 0) or 0),
            "replies": int(eng.get("replies", 0) or 0),
            "retweets": int(eng.get("retweets", 0) or 0),
            "replied": m.get("replied", False),
        })

    return {
        "user": user,
        "stats": {
            "total_mentions": len(mentions),
            "replies_sent": sum(1 for m in mentions if m.get("replied")),
            "avg_engagement": round(sum(engagement_scores) / max(len(engagement_scores), 1), 1),
        },
        "intent_distribution": {k: round(v / total_intents * 100) for k, v in intent_counts.most_common()},
        "recent_mentions": recent,
    }


@app.get("/api/dashboard/insights")
async def dashboard_insights():
    """Goodfire-style interpretability data."""
    from app.services import db_service
    from collections import Counter, defaultdict
    from datetime import datetime

    mentions = db_service.get_all_mentions(limit=200)
    entries = [m for m in mentions if m.get("type") != "improvement"]

    # 1. Engagement timeline — score per day
    daily_scores = defaultdict(list)
    for m in entries:
        ts = m.get("ts", "")[:10]
        eng = m.get("engagement")
        if eng and isinstance(eng, dict):
            score = int(eng.get("likes", 0) or 0) * 3 + int(eng.get("replies", 0) or 0) * 5 + int(eng.get("retweets", 0) or 0) * 2
            daily_scores[ts].append(score)

    timeline = []
    for date in sorted(daily_scores.keys()):
        scores = daily_scores[date]
        timeline.append({
            "date": date,
            "avg_score": round(sum(scores) / len(scores), 1),
            "max_score": max(scores),
            "count": len(scores),
        })

    # 2. Intent performance — which intents get best engagement
    intent_engagement = defaultdict(list)
    for m in entries:
        intent = m.get("intent", "general_gtm")
        eng = m.get("engagement")
        if eng and isinstance(eng, dict):
            score = int(eng.get("likes", 0) or 0) * 3 + int(eng.get("replies", 0) or 0) * 5 + int(eng.get("retweets", 0) or 0) * 2
            intent_engagement[intent].append(score)

    intent_perf = {}
    for intent, scores in intent_engagement.items():
        intent_perf[intent] = {
            "avg_score": round(sum(scores) / len(scores), 1),
            "count": len(scores),
            "best": max(scores),
        }

    # 3. Top responses — highest engagement
    scored = []
    for m in entries:
        eng = m.get("engagement") or {}
        score = int(eng.get("likes", 0) or 0) * 3 + int(eng.get("replies", 0) or 0) * 5 + int(eng.get("retweets", 0) or 0) * 2
        tweets = m.get("response_tweets", [])
        scored.append({
            "score": score,
            "intent": m.get("intent"),
            "question": (m.get("text", "") or "")[:100],
            "response": tweets[0][:150] if tweets else "",
            "author": m.get("author_username", ""),
            "likes": int(eng.get("likes", 0) or 0),
            "replies": int(eng.get("replies", 0) or 0),
            "retweets": int(eng.get("retweets", 0) or 0),
        })
    scored.sort(key=lambda x: x["score"], reverse=True)

    # 4. Prompt version log
    prompt_versions = [
        {"version": "v1", "date": "2026-03-27", "change": "Initial system prompt — generic GTM advice"},
        {"version": "v2", "date": "2026-03-27", "change": "Added RAG over 60+ vault notes (441 chunks)"},
        {"version": "v3", "date": "2026-03-27", "change": "Bo Mohazzabi voice — zero fluff, no hashtags, practitioner tone"},
        {"version": "v4", "date": "2026-03-28", "change": "Per-user agent routing — custom prompts + document upload"},
    ]

    # 5. System stats
    total_score = sum(s["score"] for s in scored)
    total_with_engagement = sum(1 for s in scored if s["score"] > 0)

    return {
        "timeline": timeline,
        "intent_performance": intent_perf,
        "top_responses": scored[:10],
        "worst_responses": scored[-5:] if len(scored) > 5 else [],
        "prompt_versions": prompt_versions,
        "summary": {
            "total_mentions": len(entries),
            "total_with_engagement": total_with_engagement,
            "total_score": total_score,
            "avg_score": round(total_score / max(len(entries), 1), 1),
        },
    }


@app.post("/api/user/{username}/documents")
async def upload_document(username: str, request: dict = None):
    """Upload a document to a user's personal knowledge base."""
    from app.services import db_service
    import hashlib

    if not request or not request.get("content"):
        return {"error": "content required"}

    title = request.get("title", "Untitled")
    content = request["content"]
    doc_id = hashlib.md5(content.encode()).hexdigest()[:8]

    db_service.save_user_document(username, doc_id, title, content)
    return {"status": "saved", "doc_id": doc_id, "title": title, "chars": len(content)}


@app.get("/api/user/{username}/documents")
async def list_documents(username: str):
    """List a user's uploaded documents."""
    from app.services import db_service
    docs = db_service.get_user_documents(username)
    return {"documents": [{"doc_id": d["mention_id"], "title": d.get("title", ""), "chars": len(d.get("content", "")), "ts": d.get("ts")} for d in docs], "total": len(docs)}
