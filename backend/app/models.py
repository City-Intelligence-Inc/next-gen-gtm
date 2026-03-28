from pydantic import BaseModel
from datetime import datetime


class Mention(BaseModel):
    tweet_id: str
    author_id: str
    author_username: str
    text: str
    conversation_id: str
    created_at: str


class GTMResult(BaseModel):
    mention: Mention
    intent: str
    response_tweets: list[str]
    replied: bool = False
    created_at: str = ""

    def model_post_init(self, __context):
        if not self.created_at:
            self.created_at = datetime.utcnow().isoformat()
