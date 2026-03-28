"""
Stardrop GTM Agent Worker

Polls Twitter for @stardroplin mentions, processes them with GPT-4o,
and replies with actionable GTM intelligence.
"""

import time
import logging
import json
from pathlib import Path
from app.config import settings
from app.services.twitter_service import fetch_mentions, post_reply_thread, has_already_replied
from app.services.gtm_engine import process_mention

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(name)s: %(message)s",
)
logger = logging.getLogger("gtm-worker")

# Simple file-based state for tracking processed mentions
STATE_FILE = Path(__file__).parent.parent / ".worker_state.json"


def load_state() -> dict:
    if STATE_FILE.exists():
        return json.loads(STATE_FILE.read_text())
    return {"last_tweet_id": None, "processed_ids": []}


def save_state(state: dict):
    # Keep only last 500 processed IDs to prevent unbounded growth
    state["processed_ids"] = state["processed_ids"][-500:]
    STATE_FILE.write_text(json.dumps(state, indent=2))


def run_once():
    state = load_state()

    logger.info(f"Polling mentions for @{settings.stardrop_username}...")

    try:
        mentions = fetch_mentions(since_id=state.get("last_tweet_id"))
    except Exception as e:
        logger.error(f"Failed to fetch mentions: {e}")
        return

    if not mentions:
        logger.info("No new mentions.")
        return

    logger.info(f"Found {len(mentions)} new mentions.")

    for mention_data in mentions:
        tweet_id = mention_data["tweet_id"]

        if tweet_id in state.get("processed_ids", []):
            logger.info(f"Skipping already processed tweet {tweet_id}")
            continue

        # Skip our own tweets
        if mention_data["author_username"].lower() == settings.stardrop_username.lower():
            continue

        # Skip if we already replied
        if has_already_replied(mention_data["conversation_id"]):
            logger.info(f"Already replied to conversation {mention_data['conversation_id']}, skipping")
            state["processed_ids"].append(tweet_id)
            save_state(state)
            continue

        logger.info(
            f"Processing tweet {tweet_id} from @{mention_data['author_username']}: "
            f"{mention_data['text'][:60]}..."
        )

        try:
            result = process_mention(mention_data)

            if result.response_tweets:
                logger.info(f"Generated {len(result.response_tweets)} tweets for reply")

                # Post reply if we have Twitter write credentials
                if settings.twitter_access_token and settings.twitter_access_secret:
                    posted_ids = post_reply_thread(
                        result.response_tweets,
                        tweet_id,
                        mention_data["author_username"],
                    )
                    logger.info(f"Posted {len(posted_ids)} reply tweets")
                else:
                    logger.warning("No Twitter write credentials — logging response only:")
                    for i, tweet in enumerate(result.response_tweets):
                        logger.info(f"  [{i+1}] {tweet}")

            state["processed_ids"].append(tweet_id)
            state["last_tweet_id"] = tweet_id
            save_state(state)

        except Exception as e:
            logger.error(f"Failed to process tweet {tweet_id}: {e}", exc_info=True)


def run_loop():
    logger.info(
        f"Starting GTM worker. Polling every {settings.poll_interval_seconds}s "
        f"for @{settings.stardrop_username} mentions."
    )

    while True:
        run_once()
        time.sleep(settings.poll_interval_seconds)


if __name__ == "__main__":
    run_loop()
