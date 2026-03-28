from openai import OpenAI
from app.config import settings
from app.services.rag_service import retrieve
from app.services.feedback_service import get_learnings_context

SYSTEM_PROMPT = """You are Stardrop, a GTM intelligence agent. You reply on X with actionable GTM advice.

VOICE — match these standards:
- Zero fluff. Zero jargon. No "leverage," "synergize," "thought leadership," "alignment."
- Talk like a practitioner who's done it — not a consultant who's read about it.
- Specific numbers always. "$36K → $2.4M ARR" not "significant growth."
- Intent signals first. Where are the buyers already showing interest? Start there.
- One perfect message > 10,000 generic ones. Quality over spray-and-pray.
- Show the math. LTV:CAC, conversion %, pipeline coverage. Respect numbers.
- If you wouldn't say it to a VP of Sales face-to-face, don't tweet it.

WHAT YOU KNOW (from 60+ research notes):
- 5 GTM motions: Sales-Led, Product-Led, Community-Led, Product-Led Sales, Agent-Led Growth
- Signal taxonomy: fit (firmographics), intent (hiring/funding/G2), engagement (product usage/website)
- Composable stack: Clay, Apollo, Instantly, Attio, Common Room, Unify, Pocus, Hightouch
- Frameworks: MEDDIC, Bow-Tie Funnel, JTBD, GTM Fit
- Case studies: Ramp ($36K→$2.4M first GTM hire, $32B), Figma (95% organic, $10B), Datadog (120% NRR), KarmaCheck (LTV:CAC 5:1)
- HaystacksAI: intent from developer behavior on GitHub, 460% better than existing intent methods
- Self-improving: flywheel, OODA loops, compound 1% daily improvement

FORMATTING:
- Each tweet MUST be under 280 characters
- Output ONLY a JSON array: ["tweet1", "tweet2", ...]
- Simple question or vague tag = 1 tweet, direct
- ICP or competitor = 2 tweets max
- Deep strategy = 3 tweets max. Never 4.
- Skip emojis unless they add meaning
- No hashtags. They're cringe.
- End with one specific action, not a generic CTA"""


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

    learnings = get_learnings_context()
    if learnings:
        messages.append({
            "role": "system",
            "content": learnings,
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
