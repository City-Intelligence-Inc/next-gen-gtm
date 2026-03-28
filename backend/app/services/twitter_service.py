import tweepy
import logging
from app.config import settings

logger = logging.getLogger(__name__)

STARDROP_USER_ID = "1963782341442330624"


def _get_client() -> tweepy.Client:
    """OAuth 1.0a client for both reading and writing."""
    return tweepy.Client(
        consumer_key=settings.twitter_consumer_key,
        consumer_secret=settings.twitter_consumer_secret,
        access_token=settings.twitter_access_token,
        access_token_secret=settings.twitter_access_secret,
        wait_on_rate_limit=True,
    )


def fetch_mentions(since_id: str | None = None) -> list[dict]:
    """Fetch recent mentions using OAuth 1.0a user auth."""
    client = _get_client()

    kwargs = {
        "id": STARDROP_USER_ID,
        "tweet_fields": ["created_at", "conversation_id", "author_id", "text"],
        "expansions": ["author_id"],
        "user_fields": ["username"],
        "max_results": 10,
        "user_auth": True,
    }
    if since_id:
        kwargs["since_id"] = since_id

    try:
        response = client.get_users_mentions(**kwargs)
    except Exception as e:
        logger.error(f"Twitter API error: {e}")
        return []

    if not response or not response.data:
        return []

    # Build author username lookup
    users = {}
    if response.includes and "users" in response.includes:
        for user in response.includes["users"]:
            users[user.id] = user.username

    mentions = []
    for tweet in response.data:
        mentions.append(
            {
                "tweet_id": str(tweet.id),
                "author_id": str(tweet.author_id),
                "author_username": users.get(tweet.author_id, "unknown"),
                "text": tweet.text,
                "conversation_id": str(tweet.conversation_id) if tweet.conversation_id else str(tweet.id),
                "created_at": tweet.created_at.isoformat() if tweet.created_at else "",
            }
        )

    return mentions


def has_already_replied(conversation_id: str, tweet_id: str) -> bool:
    """Check if @stardroplin already replied to this specific tweet.

    Uses conversation_id for the search query (Twitter API requires it),
    then filters results to check if any reply is specifically to tweet_id.
    This handles threaded replies correctly — a reply to tweet A in a thread
    won't block replying to tweet C in the same thread.
    """
    client = _get_client()
    try:
        response = client.search_recent_tweets(
            query=f"from:stardroplin conversation_id:{conversation_id}",
            max_results=20,
            tweet_fields=["in_reply_to_user_id", "referenced_tweets"],
            user_auth=True,
        )
        if not response.data:
            return False
        # Check if any of our replies are specifically to this tweet
        for reply in response.data:
            refs = reply.referenced_tweets or []
            for ref in refs:
                if ref.type == "replied_to" and str(ref.id) == tweet_id:
                    return True
        return False
    except Exception as e:
        logger.warning(f"Could not check existing replies: {e}")
        return False


def post_reply_thread(
    tweets: list[str], reply_to_tweet_id: str, author_username: str
) -> list[str]:
    """Post a reply thread using OAuth 1.0a."""
    client = _get_client()
    posted_ids = []
    current_reply_to = reply_to_tweet_id

    for i, tweet_text in enumerate(tweets):
        if i == 0:
            text = f"@{author_username} {tweet_text}"
        else:
            text = tweet_text

        if len(text) > 280:
            text = text[:277] + "..."

        try:
            response = client.create_tweet(
                text=text, in_reply_to_tweet_id=current_reply_to
            )
            if response and response.data:
                tweet_id = str(response.data["id"])
                posted_ids.append(tweet_id)
                current_reply_to = tweet_id
                logger.info(f"Posted tweet {tweet_id}: {text[:50]}...")
        except Exception as e:
            logger.error(f"Failed to post tweet: {e}")
            break

    return posted_ids
