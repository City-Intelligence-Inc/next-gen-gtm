import re
import logging
from app.models import Mention, GTMResult
from app.services.openai_service import analyze_tweet

logger = logging.getLogger(__name__)

# Keywords that map to specific GTM intents
INTENT_PATTERNS = {
    "competitor_intel": [
        r"analyz[es]?\s+(competitor|@\w+)",
        r"competitor\s+(analysis|intel|breakdown)",
        r"tell me about\s+@\w+",
        r"what.*(know|think)\s+about\s+@\w+",
    ],
    "icp_analyzer": [
        r"who should I sell to",
        r"(icp|ideal customer|target market)",
        r"who.*(buy|customer|audience)",
    ],
    "signal_scanner": [
        r"find\s+signals",
        r"buying\s+signals",
        r"(detect|spot|find)\s+(intent|interest)",
        r"who.*(looking|searching|evaluating)",
    ],
    "gtm_roast": [
        r"roast\s+(my|our)\s+gtm",
        r"review\s+(my|our)\s+(gtm|strategy|approach)",
        r"what.*(wrong|fix)\s+(with|about)\s+(my|our)",
    ],
    "stack_advisor": [
        r"(gtm|tech|tool)\s+stack",
        r"what\s+tools\s+should",
        r"(recommend|suggest)\s+(tools|stack|software)",
    ],
    "outbound_generator": [
        r"turn\s+this\s+into\s+(outbound|email|cold)",
        r"write\s+(me|an?)\s+(email|outbound|cold)",
        r"(draft|generate)\s+(outbound|email|message)",
    ],
}


def detect_intent(text: str) -> str:
    text_lower = text.lower()
    for intent, patterns in INTENT_PATTERNS.items():
        for pattern in patterns:
            if re.search(pattern, text_lower):
                return intent
    return "general_gtm"


def process_mention(mention_data: dict) -> GTMResult:
    mention = Mention(**mention_data)

    # Strip the @stardroplin tag from the text for analysis
    clean_text = re.sub(r"@stardroplin\s*", "", mention.text, flags=re.IGNORECASE).strip()

    intent = detect_intent(clean_text)
    logger.info(f"Detected intent: {intent} for tweet: {clean_text[:60]}...")

    result = analyze_tweet(clean_text, mention.author_username)
    response_tweets = result["tweets"]
    rag_sources = result.get("rag_sources", [])

    return GTMResult(
        mention=mention,
        intent=intent,
        response_tweets=response_tweets,
        rag_sources=rag_sources,
    )
