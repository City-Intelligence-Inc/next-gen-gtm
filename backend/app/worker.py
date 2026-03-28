"""
Stardrop GTM Agent Worker — DynamoDB-backed.
"""

import time
import logging
from app.config import settings
from app.services.twitter_service import fetch_mentions, post_reply_thread, has_already_replied
from app.services.gtm_engine import process_mention
from app.services.feedback_service import log_response, collect_feedback
from app.services import db_service

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(name)s: %(message)s",
)
logger = logging.getLogger("gtm-worker")


def run_once():
    logger.info(f"Polling mentions for @{settings.stardrop_username}...")

    # Get state from DynamoDB
    processed_ids = db_service.get_processed_ids()
    state = db_service.get_state("worker") or {}
    since_id = state.get("last_tweet_id")

    try:
        mentions = fetch_mentions(since_id=since_id)
    except Exception as e:
        logger.error(f"Failed to fetch mentions: {e}")
        return

    if not mentions:
        logger.info("No new mentions.")
        return

    logger.info(f"Found {len(mentions)} new mentions.")
    new_last_id = since_id

    for mention_data in mentions:
        tweet_id = mention_data["tweet_id"]

        if tweet_id in processed_ids:
            continue

        # Skip our own tweets
        if mention_data["author_username"].lower() == settings.stardrop_username.lower():
            processed_ids.add(tweet_id)
            continue

        # Skip if already in DynamoDB (prevents double-reply across restarts)
        existing = db_service.get_mention(tweet_id)
        if existing and existing.get("replied"):
            logger.info(f"Already in DynamoDB as replied, skipping {tweet_id}")
            processed_ids.add(tweet_id)
            continue

        # Skip if already replied on Twitter
        try:
            if has_already_replied(mention_data["conversation_id"], tweet_id):
                logger.info(f"Already replied to tweet {tweet_id}, skipping")
                processed_ids.add(tweet_id)
                continue
        except Exception:
            pass

        author = mention_data["author_username"]
        logger.info(f"Processing tweet {tweet_id} from @{author}: {mention_data['text'][:60]}...")

        # Check if user exists, auto-create if not
        try:
            user = db_service.get_user(author)
            if user:
                logger.info(f"  User @{author} found — applying personal agent config")
            else:
                db_service.save_user(author)
                logger.info(f"  New user @{author} — created profile")
        except Exception:
            pass

        try:
            result = process_mention(mention_data)
            reply_ids = []

            if result.response_tweets:
                logger.info(f"Generated {len(result.response_tweets)} tweets for reply")

                if settings.twitter_access_token and settings.twitter_access_secret:
                    reply_ids = post_reply_thread(
                        result.response_tweets,
                        tweet_id,
                        mention_data["author_username"],
                    )
                    logger.info(f"Posted {len(reply_ids)} reply tweets")
                else:
                    logger.warning("No Twitter write credentials — logging only")
                    for i, tweet in enumerate(result.response_tweets):
                        logger.info(f"  [{i+1}] {tweet}")

            # Save to DynamoDB
            db_service.save_mention(tweet_id, {
                "author_username": mention_data["author_username"],
                "author_id": mention_data["author_id"],
                "text": mention_data["text"],
                "conversation_id": mention_data["conversation_id"],
                "mention_created_at": mention_data["created_at"],
                "intent": result.intent,
                "response_tweets": result.response_tweets,
                "rag_sources": result.rag_sources,
                "reply_ids": reply_ids,
                "replied": len(reply_ids) > 0,
                "engagement": None,
            })

            # Also log for feedback service
            if reply_ids:
                log_response(tweet_id, mention_data["text"], result.intent, result.response_tweets, reply_ids)

            processed_ids.add(tweet_id)
            new_last_id = tweet_id

        except Exception as e:
            logger.error(f"Failed to process tweet {tweet_id}: {e}", exc_info=True)

    # Save state to DynamoDB
    db_service.save_worker_state(new_last_id or since_id or "", list(processed_ids))


def run_loop():
    logger.info(
        f"Starting GTM worker. Polling every {settings.poll_interval_seconds}s "
        f"for @{settings.stardrop_username} mentions."
    )

    feedback_counter = 0
    while True:
        try:
            run_once()
        except Exception as e:
            logger.error(f"Worker cycle failed: {e}", exc_info=True)

        feedback_counter += 1
        if feedback_counter >= 10:
            try:
                collect_feedback()
            except Exception as e:
                logger.warning(f"Feedback collection failed: {e}")
            feedback_counter = 0

        time.sleep(settings.poll_interval_seconds)


if __name__ == "__main__":
    run_loop()
