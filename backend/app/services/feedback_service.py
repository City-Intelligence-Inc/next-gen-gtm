"""
Self-improving feedback loop for Stardrop GTM Agent.

Tracks: mention → response → engagement (likes, replies, retweets)
Learns: which response patterns get the most engagement
Feeds back: top-performing patterns into the system prompt
"""

import json
import logging
import time
from pathlib import Path
from datetime import datetime, timedelta
from app.config import settings
from app.services.twitter_service import _get_client

logger = logging.getLogger(__name__)

FEEDBACK_FILE = Path(__file__).parent.parent.parent / ".feedback_log.jsonl"
LEARNINGS_FILE = Path(__file__).parent.parent.parent / ".learnings.json"


def log_response(mention_id: str, mention_text: str, intent: str,
                 response_tweets: list[str], reply_ids: list[str]):
    """Log a response for later feedback collection."""
    entry = {
        "ts": datetime.utcnow().isoformat(),
        "mention_id": mention_id,
        "mention_text": mention_text[:200],
        "intent": intent,
        "response_tweets": response_tweets,
        "reply_ids": reply_ids,
        "engagement": None,  # filled later by collect_feedback
    }
    with open(FEEDBACK_FILE, "a") as f:
        f.write(json.dumps(entry) + "\n")


def collect_feedback():
    """Check engagement on past replies and update the log."""
    if not FEEDBACK_FILE.exists():
        return

    client = _get_client()
    lines = FEEDBACK_FILE.read_text().strip().split("\n")
    updated_lines = []
    learnings_updated = False

    for line in lines:
        try:
            entry = json.loads(line)
        except json.JSONDecodeError:
            continue

        # Skip if already has engagement data
        if entry.get("engagement") is not None:
            updated_lines.append(json.dumps(entry))
            continue

        # Skip if too recent (wait 1 hour for engagement to accumulate)
        ts = datetime.fromisoformat(entry["ts"])
        if datetime.utcnow() - ts < timedelta(hours=1):
            updated_lines.append(json.dumps(entry))
            continue

        # Fetch engagement across ALL reply tweets in the thread
        reply_ids = entry.get("reply_ids", [])
        if not reply_ids:
            entry["engagement"] = {"likes": 0, "retweets": 0, "replies": 0, "unique_accounts": 0}
            updated_lines.append(json.dumps(entry))
            continue

        try:
            total_likes = 0
            total_retweets = 0
            total_replies = 0
            unique_accounts = set()

            # Get metrics for each tweet in our reply thread
            for rid in reply_ids:
                try:
                    tweet = client.get_tweet(
                        rid,
                        tweet_fields=["public_metrics"],
                        user_auth=True,
                    )
                    if tweet and tweet.data:
                        metrics = tweet.data.public_metrics if hasattr(tweet.data, "public_metrics") else {}
                        if not metrics:
                            metrics = tweet.data.get("public_metrics", {}) if hasattr(tweet.data, "get") else {}
                        total_likes += metrics.get("like_count", 0)
                        total_retweets += metrics.get("retweet_count", 0)
                        total_replies += metrics.get("reply_count", 0)
                except Exception:
                    pass

            # Count unique accounts that replied to our thread
            conversation_id = entry.get("mention_id", reply_ids[0])
            try:
                replies_response = client.search_recent_tweets(
                    query=f"conversation_id:{conversation_id} -from:stardroplin",
                    max_results=50,
                    tweet_fields=["author_id"],
                    user_auth=True,
                )
                if replies_response and replies_response.data:
                    for r in replies_response.data:
                        if hasattr(r, "author_id"):
                            unique_accounts.add(str(r.author_id))
            except Exception:
                pass

            entry["engagement"] = {
                "likes": total_likes,
                "retweets": total_retweets,
                "replies": total_replies,
                "unique_accounts": len(unique_accounts),
            }
            learnings_updated = True
            logger.info(
                f"Feedback for {entry['mention_id']}: "
                f"{total_likes} likes, {total_replies} replies, "
                f"{len(unique_accounts)} unique accounts"
            )
        except Exception as e:
            logger.warning(f"Could not fetch engagement for {reply_ids[0]}: {e}")
            entry["engagement"] = {"likes": 0, "retweets": 0, "replies": 0, "unique_accounts": 0}

        updated_lines.append(json.dumps(entry))

    FEEDBACK_FILE.write_text("\n".join(updated_lines) + "\n")

    if learnings_updated:
        _update_learnings()


def _update_learnings():
    """Analyze feedback log and extract patterns from top-performing responses."""
    if not FEEDBACK_FILE.exists():
        return

    entries = []
    for line in FEEDBACK_FILE.read_text().strip().split("\n"):
        try:
            entry = json.loads(line)
            if entry.get("engagement"):
                entries.append(entry)
        except json.JSONDecodeError:
            continue

    if len(entries) < 3:
        return  # Need enough data

    # Score each response: likes*3 + replies*5 + retweets*2 + unique_accounts*10
    # Unique accounts is the strongest signal — multiple people engaging means real impact
    for e in entries:
        eng = e["engagement"]
        e["score"] = (eng.get("likes", 0) * 3
                      + eng.get("replies", 0) * 5
                      + eng.get("retweets", 0) * 2
                      + eng.get("unique_accounts", 0) * 10)

    # Sort by score, take top performers
    entries.sort(key=lambda x: x["score"], reverse=True)
    top = entries[:5]
    bottom = entries[-3:] if len(entries) > 5 else []

    learnings = {
        "updated_at": datetime.utcnow().isoformat(),
        "total_responses": len(entries),
        "avg_score": sum(e["score"] for e in entries) / len(entries),
        "top_patterns": [],
        "avoid_patterns": [],
        "best_intents": {},
    }

    # Extract patterns from top performers
    for e in top:
        learnings["top_patterns"].append({
            "intent": e["intent"],
            "score": e["score"],
            "example_tweet": e["response_tweets"][0] if e["response_tweets"] else "",
            "engagement": e["engagement"],
        })

    # Track which intents perform best
    intent_scores = {}
    for e in entries:
        intent = e["intent"]
        if intent not in intent_scores:
            intent_scores[intent] = []
        intent_scores[intent].append(e["score"])

    for intent, scores in intent_scores.items():
        learnings["best_intents"][intent] = {
            "avg_score": sum(scores) / len(scores),
            "count": len(scores),
        }

    LEARNINGS_FILE.write_text(json.dumps(learnings, indent=2))
    logger.info(f"Updated learnings: {len(entries)} responses, avg score {learnings['avg_score']:.1f}")


def get_learnings_context() -> str:
    """Get learnings as context for the system prompt."""
    if not LEARNINGS_FILE.exists():
        return ""

    try:
        learnings = json.loads(LEARNINGS_FILE.read_text())
    except (json.JSONDecodeError, FileNotFoundError):
        return ""

    if not learnings.get("top_patterns"):
        return ""

    lines = ["LEARNINGS FROM PAST RESPONSES (use these to improve):"]

    for p in learnings["top_patterns"][:3]:
        eng = p["engagement"]
        accts = eng.get("unique_accounts", 0)
        acct_str = f", {accts} accounts" if accts else ""
        lines.append(
            f"- High-engagement ({eng.get('likes',0)}L/{eng.get('replies',0)}R{acct_str}) "
            f"intent={p['intent']}: \"{p['example_tweet'][:100]}...\""
        )

    best_intent = max(
        learnings.get("best_intents", {}).items(),
        key=lambda x: x[1]["avg_score"],
        default=None,
    )
    if best_intent:
        lines.append(f"- Best performing intent: {best_intent[0]} (avg score {best_intent[1]['avg_score']:.1f})")

    return "\n".join(lines)
