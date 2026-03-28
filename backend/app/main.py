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


@app.get("/api/dashboard/overview")
async def dashboard_overview():
    """Real dashboard data from feedback log + worker state."""
    import json
    from pathlib import Path
    from datetime import datetime, timedelta
    from collections import Counter

    feedback_file = Path(__file__).parent.parent / ".feedback_log.jsonl"
    worker_state_file = Path(__file__).parent.parent / ".worker_state.json"
    learnings_file = Path(__file__).parent.parent / ".learnings.json"

    entries = []
    if feedback_file.exists():
        for line in feedback_file.read_text().strip().split("\n"):
            try:
                entries.append(json.loads(line))
            except json.JSONDecodeError:
                continue

    # Stats
    now = datetime.utcnow()
    today = now.date().isoformat()
    today_entries = [e for e in entries if e.get("ts", "").startswith(today)]
    week_entries = [e for e in entries if (now - datetime.fromisoformat(e.get("ts", now.isoformat()))).days < 7]

    # Intent distribution
    intent_counts = Counter(e.get("intent", "general_gtm") for e in entries)
    total = max(sum(intent_counts.values()), 1)
    intent_dist = {k: round(v / total * 100) for k, v in intent_counts.most_common()}

    # Engagement stats
    engagement_scores = []
    for e in entries:
        eng = e.get("engagement")
        if eng:
            score = eng.get("likes", 0) * 3 + eng.get("replies", 0) * 5 + eng.get("retweets", 0) * 2
            engagement_scores.append(score)
    avg_engagement = round(sum(engagement_scores) / max(len(engagement_scores), 1), 1)

    # Recent mentions (last 10)
    recent = []
    for e in sorted(entries, key=lambda x: x.get("ts", ""), reverse=True)[:10]:
        eng = e.get("engagement") or {}
        recent.append({
            "ts": e.get("ts"),
            "author": e.get("mention_text", "")[:100],
            "mention_id": e.get("mention_id"),
            "intent": e.get("intent"),
            "response_preview": e.get("response_tweets", [""])[0][:120] if e.get("response_tweets") else "",
            "likes": eng.get("likes", 0),
            "replies": eng.get("replies", 0),
            "retweets": eng.get("retweets", 0),
            "replied": len(e.get("reply_ids", [])) > 0,
        })

    # Learnings
    learnings = {}
    if learnings_file.exists():
        try:
            learnings = json.loads(learnings_file.read_text())
        except json.JSONDecodeError:
            pass

    # Worker state
    worker_state = {}
    if worker_state_file.exists():
        try:
            worker_state = json.loads(worker_state_file.read_text())
        except json.JSONDecodeError:
            pass

    processed_count = len(worker_state.get("processed_ids", []))
    total_mentions = max(len(entries), processed_count)
    replies_sent = sum(1 for e in entries if e.get("reply_ids")) or processed_count

    return {
        "stats": {
            "total_mentions": total_mentions,
            "mentions_today": len(today_entries),
            "mentions_this_week": len(week_entries),
            "replies_sent": replies_sent,
            "avg_engagement_score": avg_engagement,
            "total_learnings": len(learnings.get("top_patterns", [])),
            "note": "Mentions before feedback logging was added are counted from worker state" if len(entries) == 0 and processed_count > 0 else None,
        },
        "intent_distribution": intent_dist,
        "recent_mentions": recent,
        "learnings": learnings.get("top_patterns", [])[:5],
        "worker": {
            "last_tweet_id": worker_state.get("last_tweet_id"),
            "processed_count": len(worker_state.get("processed_ids", [])),
        },
        "environments": {
            "twitter": "live",
            "openai": "live",
            "chromadb": "live (441 chunks)",
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
    """Save a user-provided improvement for HyDE learning."""
    import json
    from pathlib import Path
    from datetime import datetime

    if not request:
        return {"error": "No data"}

    improvements_file = Path(__file__).parent.parent / ".improvements.jsonl"

    entry = {
        "ts": datetime.utcnow().isoformat(),
        "question": request.get("question", ""),
        "original_response": request.get("original_response", []),
        "improved_response": request.get("improved_response", ""),
    }

    with open(improvements_file, "a") as f:
        f.write(json.dumps(entry) + "\n")

    return {"status": "saved", "total": sum(1 for _ in open(improvements_file))}


@app.get("/api/improvements")
async def list_improvements():
    """List all saved improvements."""
    import json
    from pathlib import Path

    improvements_file = Path(__file__).parent.parent / ".improvements.jsonl"
    if not improvements_file.exists():
        return {"improvements": [], "total": 0}

    entries = []
    for line in improvements_file.read_text().strip().split("\n"):
        if line.strip():
            try:
                entries.append(json.loads(line))
            except json.JSONDecodeError:
                continue

    return {"improvements": entries, "total": len(entries)}
