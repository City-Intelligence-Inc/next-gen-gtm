from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    openai_api_key: str = ""
    twitter_consumer_key: str = ""
    twitter_consumer_secret: str = ""
    twitter_bearer_token: str = ""
    twitter_access_token: str = ""
    twitter_access_secret: str = ""
    aws_region: str = "us-east-1"
    dynamodb_table_name: str = "next-gen-gtm-mentions"
    stardrop_username: str = "stardroplin"
    poll_interval_seconds: int = 60

    class Config:
        env_file = ".env"


settings = Settings()
