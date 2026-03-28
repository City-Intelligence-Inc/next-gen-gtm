"""
1% Better Every Day tracker.

Tracks daily performance metrics and computes compound improvement over time.
James Clear / Dave Brailsford: 1% better daily = 37.78x improvement in a year.
"""

import json
import logging
from pathlib import Path
from datetime import datetime, timedelta
from collections import defaultdict

logger = logging.getLogger(__name__)

METRICS_FILE = Path(__file__).parent.parent.parent / ".daily_metrics.jsonl"
FEEDBACK_FILE = Path(__file__).parent.parent.parent / ".feedback_log.jsonl"


def _load_feedback_entries() -> list[dict]:
    if not FEEDBACK_FILE.exists():
        return []
    entries = []
    for line in FEEDBACK_FILE.read_text().strip().split("\n"):
        if not line.strip():
            continue
        try:
            entries.append(json.loads(line))
        except json.JSONDecodeError:
            continue
    return entries


def compute_daily_snapshot():
    """Compute today's metrics and append to daily log."""
    entries = _load_feedback_entries()
    if not entries:
        return None

    today = datetime.utcnow().date().isoformat()

    # Group by date
    by_date = defaultdict(list)
    for e in entries:
        ts = e.get("ts", "")
        if ts:
            date = ts[:10]
            by_date[date].append(e)

    today_entries = by_date.get(today, [])

    # Compute metrics for today
    engagement_scores = []
    for e in today_entries:
        eng = e.get("engagement")
        if eng:
            score = eng.get("likes", 0) * 3 + eng.get("replies", 0) * 5 + eng.get("retweets", 0) * 2
            engagement_scores.append(score)

    snapshot = {
        "date": today,
        "mentions": len(today_entries),
        "replies": sum(1 for e in today_entries if e.get("reply_ids")),
        "avg_engagement": round(sum(engagement_scores) / max(len(engagement_scores), 1), 1),
        "total_engagement": sum(engagement_scores),
        "intents_used": len(set(e.get("intent", "") for e in today_entries)),
    }

    # Append if not already logged for today
    existing = _load_daily_metrics()
    if not any(m["date"] == today for m in existing):
        with open(METRICS_FILE, "a") as f:
            f.write(json.dumps(snapshot) + "\n")

    return snapshot


def _load_daily_metrics() -> list[dict]:
    if not METRICS_FILE.exists():
        return []
    metrics = []
    for line in METRICS_FILE.read_text().strip().split("\n"):
        if not line.strip():
            continue
        try:
            metrics.append(json.loads(line))
        except json.JSONDecodeError:
            continue
    return sorted(metrics, key=lambda x: x["date"])


def get_improvement_data() -> dict:
    """Return the full improvement timeline + compound curve."""
    entries = _load_feedback_entries()
    daily = _load_daily_metrics()

    # Also compute from feedback log directly if daily metrics are sparse
    by_date = defaultdict(list)
    for e in entries:
        ts = e.get("ts", "")
        if ts:
            by_date[ts[:10]].append(e)

    # Build timeline from all available dates
    all_dates = sorted(set(list(by_date.keys()) + [m["date"] for m in daily]))

    timeline = []
    for date in all_dates:
        day_entries = by_date.get(date, [])
        day_metric = next((m for m in daily if m["date"] == date), None)

        scores = []
        for e in day_entries:
            eng = e.get("engagement")
            if eng:
                scores.append(eng.get("likes", 0) * 3 + eng.get("replies", 0) * 5 + eng.get("retweets", 0) * 2)

        timeline.append({
            "date": date,
            "mentions": day_metric["mentions"] if day_metric else len(day_entries),
            "replies": day_metric["replies"] if day_metric else sum(1 for e in day_entries if e.get("reply_ids")),
            "avg_engagement": round(sum(scores) / max(len(scores), 1), 1) if scores else 0,
        })

    # Compute compound improvement curve
    # baseline = first day's avg engagement (or 1 if no data)
    baseline = timeline[0]["avg_engagement"] if timeline and timeline[0]["avg_engagement"] > 0 else 1
    compound_curve = []
    for i, day in enumerate(timeline):
        actual = day["avg_engagement"]
        # Theoretical 1% daily compound: baseline * 1.01^days
        theoretical = round(baseline * (1.01 ** i), 1)
        compound_curve.append({
            "date": day["date"],
            "day": i + 1,
            "actual": actual,
            "theoretical_1pct": theoretical,
            "improvement_pct": round((actual / baseline - 1) * 100, 1) if baseline > 0 and actual > 0 else 0,
        })

    # Summary
    total_days = len(timeline)
    first_score = baseline
    latest_score = timeline[-1]["avg_engagement"] if timeline else 0
    total_improvement = round((latest_score / first_score - 1) * 100, 1) if first_score > 0 and latest_score > 0 else 0

    return {
        "summary": {
            "total_days": total_days,
            "total_mentions": sum(d["mentions"] for d in timeline),
            "total_replies": sum(d["replies"] for d in timeline),
            "first_day_score": first_score,
            "latest_score": latest_score,
            "total_improvement_pct": total_improvement,
            "theoretical_1pct_after_30_days": round(baseline * (1.01 ** 30), 1),
            "theoretical_1pct_after_90_days": round(baseline * (1.01 ** 90), 1),
            "theoretical_1pct_after_365_days": round(baseline * (1.01 ** 365), 1),
        },
        "timeline": timeline,
        "compound_curve": compound_curve,
    }
