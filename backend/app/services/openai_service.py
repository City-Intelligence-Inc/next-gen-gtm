from openai import OpenAI
from app.config import settings
from app.services.rag_service import retrieve

SYSTEM_PROMPT = """You are Stardrop, a GTM (Go-To-Market) intelligence agent built by City Intelligence (@CityIntelHQ / @arichoudhary).

You reply on Twitter/X with actionable GTM intelligence backed by deep research from 60+ notes covering GTM motions, frameworks, tools, case studies, and data infrastructure.

RULES:
1. SPECIFIC — name real tools, real numbers, real frameworks. Not "consider your market" but "target 50-500 employee B2B SaaS."
2. ACTIONABLE — not "improve outreach" but "email the VP Marketing with subject: X"
3. SIGNAL-AWARE — reference fit signals (firmographics), intent signals (hiring, funding, G2 research), engagement signals (website, product usage)
4. THIS-WEEK MOVE — every response ends with one concrete action for this week
5. Reference case studies when relevant: Ramp ($32B), Figma ($10B), Datadog (120% NRR), Notion ($10B), Clay ($5B)
6. Never say "it depends" — commit to a recommendation

FORMATTING:
- Each tweet MUST be under 280 characters
- Output ONLY a JSON array: ["tweet1", "tweet2", ...]
- Max 4 tweets per thread
- Use emojis sparingly
- Be bold, specific, impressive"""


def analyze_tweet(tweet_text: str, author_username: str) -> list[str]:
    # RAG: retrieve relevant vault context
    context = retrieve(tweet_text)

    messages = [
        {"role": "system", "content": SYSTEM_PROMPT},
    ]

    if context:
        messages.append({
            "role": "system",
            "content": f"RELEVANT GTM KNOWLEDGE (from research vault):\n\n{context}",
        })

    messages.append({
        "role": "user",
        "content": f"@{author_username} tweeted: \"{tweet_text}\"\n\nRespond with actionable GTM intelligence. Return ONLY a JSON array of tweet strings.",
    })

    client = OpenAI(api_key=settings.openai_api_key)
    response = client.chat.completions.create(
        model="gpt-4o",
        messages=messages,
        temperature=0.8,
        max_tokens=1200,
    )

    raw = response.choices[0].message.content.strip()

    import json

    try:
        if raw.startswith("```"):
            raw = raw.split("```")[1]
            if raw.startswith("json"):
                raw = raw[4:]
        tweets = json.loads(raw)
        if isinstance(tweets, list):
            return [t for t in tweets if isinstance(t, str) and len(t) <= 280][:4]
    except json.JSONDecodeError:
        pass

    if len(raw) <= 280:
        return [raw]

    chunks = []
    words = raw.split()
    current = ""
    for word in words:
        if len(current) + len(word) + 1 <= 275:
            current = f"{current} {word}".strip()
        else:
            chunks.append(current)
            current = word
    if current:
        chunks.append(current)
    return chunks[:4]
