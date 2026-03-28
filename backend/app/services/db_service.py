"""
DynamoDB persistence for Stardrop.
Replaces all file-based storage (.worker_state.json, .feedback_log.jsonl, .improvements.jsonl).
"""

import boto3
import logging
from datetime import datetime
from app.config import settings

logger = logging.getLogger(__name__)

_dynamodb = None


def _get_table(name: str):
    global _dynamodb
    if _dynamodb is None:
        _dynamodb = boto3.resource("dynamodb", region_name=settings.aws_region)
    return _dynamodb.Table(name)


# ─── MENTIONS TABLE ───

def save_mention(mention_id: str, data: dict):
    """Save a processed mention with response + metadata."""
    table = _get_table("stardrop-mentions")
    item = {
        "mention_id": mention_id,
        "ts": datetime.utcnow().isoformat(),
        **data,
    }
    table.put_item(Item=item)
    logger.info(f"Saved mention {mention_id} to DynamoDB")


def get_mention(mention_id: str) -> dict | None:
    table = _get_table("stardrop-mentions")
    r = table.get_item(Key={"mention_id": mention_id})
    return r.get("Item")


def get_all_mentions(limit: int = 50) -> list[dict]:
    table = _get_table("stardrop-mentions")
    r = table.scan(Limit=limit)
    items = r.get("Items", [])
    return sorted(items, key=lambda x: x.get("ts", ""), reverse=True)


def update_mention_engagement(mention_id: str, engagement: dict):
    table = _get_table("stardrop-mentions")
    table.update_item(
        Key={"mention_id": mention_id},
        UpdateExpression="SET engagement = :e",
        ExpressionAttributeValues={":e": engagement},
    )


# ─── STATE TABLE ───

def get_state(key: str) -> dict | None:
    table = _get_table("stardrop-state")
    r = table.get_item(Key={"key": key})
    return r.get("Item")


def set_state(key: str, value: dict):
    table = _get_table("stardrop-state")
    table.put_item(Item={"key": key, **value})


def get_processed_ids() -> set:
    state = get_state("worker")
    if not state:
        return set()
    return set(state.get("processed_ids", []))


def save_worker_state(last_tweet_id: str, processed_ids: list):
    """Keep only last 200 IDs to stay under DynamoDB item size limit."""
    set_state("worker", {
        "last_tweet_id": last_tweet_id,
        "processed_ids": processed_ids[-200:],
        "updated_at": datetime.utcnow().isoformat(),
    })


def save_improvement(data: dict):
    """Save a user-submitted improvement."""
    table = _get_table("stardrop-mentions")
    item = {
        "mention_id": f"improve_{datetime.utcnow().isoformat()}",
        "type": "improvement",
        "ts": datetime.utcnow().isoformat(),
        **data,
    }
    table.put_item(Item=item)


def get_improvements() -> list[dict]:
    table = _get_table("stardrop-mentions")
    r = table.scan(
        FilterExpression="attribute_exists(#t) AND #t = :v",
        ExpressionAttributeNames={"#t": "type"},
        ExpressionAttributeValues={":v": "improvement"},
    )
    return sorted(r.get("Items", []), key=lambda x: x.get("ts", ""), reverse=True)


# ─── USERS TABLE ───

def save_user(username: str, data: dict = None):
    table = _get_table("stardrop-users")
    from datetime import datetime
    item = {
        "username": username.lower().strip().lstrip("@"),
        "created_at": datetime.utcnow().isoformat(),
        "custom_prompt": "",
        "improvements": [],
        "settings": {},
        **(data or {}),
    }
    table.put_item(Item=item)
    return item


def get_user(username: str) -> dict | None:
    table = _get_table("stardrop-users")
    r = table.get_item(Key={"username": username.lower().strip().lstrip("@")})
    return r.get("Item")


def get_mentions_for_user(username: str) -> list[dict]:
    clean = username.lower().strip().lstrip("@")
    all_mentions = get_all_mentions(limit=200)
    return [m for m in all_mentions
            if m.get("type") != "improvement"
            and (m.get("author_username", "").lower() == clean)]


def save_user_document(username: str, doc_id: str, title: str, content: str):
    """Save a user-uploaded document."""
    table = _get_table("stardrop-mentions")
    from datetime import datetime
    table.put_item(Item={
        "mention_id": f"doc_{username}_{doc_id}",
        "type": "document",
        "username": username.lower().strip().lstrip("@"),
        "title": title,
        "content": content,
        "ts": datetime.utcnow().isoformat(),
    })


def get_user_documents(username: str) -> list[dict]:
    clean = username.lower().strip().lstrip("@")
    table = _get_table("stardrop-mentions")
    r = table.scan(
        FilterExpression="#t = :t AND #u = :u",
        ExpressionAttributeNames={"#t": "type", "#u": "username"},
        ExpressionAttributeValues={":t": "document", ":u": clean},
    )
    return sorted(r.get("Items", []), key=lambda x: x.get("ts", ""), reverse=True)


def update_user(username: str, updates: dict):
    table = _get_table("stardrop-users")
    expressions = []
    values = {}
    for k, v in updates.items():
        expressions.append(f"#{k} = :{k}")
        values[f":{k}"] = v
    if not expressions:
        return
    table.update_item(
        Key={"username": username.lower().strip().lstrip("@")},
        UpdateExpression="SET " + ", ".join(expressions),
        ExpressionAttributeNames={f"#{k}": k for k in updates},
        ExpressionAttributeValues=values,
    )
