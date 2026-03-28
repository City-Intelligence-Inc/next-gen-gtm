from openai import OpenAI
from app.config import settings
from app.services.rag_service import retrieve, retrieve_with_sources
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


def analyze_tweet(tweet_text: str, author_username: str) -> dict:
    """Analyze a tweet and return response tweets + RAG sources.

    Returns:
        dict with keys "tweets" (list[str]) and "rag_sources" (list[dict])
    """
    # RAG: retrieve relevant vault context with source metadata
    context, rag_sources = retrieve_with_sources(tweet_text)

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

    # Per-user customization: docs, improvements, custom prompt
    try:
        from app.services import db_service
        user = db_service.get_user(author_username)
        if user:
            # 1. User's custom prompt
            custom = user.get("custom_prompt", "")
            if custom:
                messages.append({
                    "role": "system",
                    "content": f"USER-SPECIFIC INSTRUCTIONS for @{author_username}:\n{custom}",
                })

            # 2. User's uploaded documents — search for relevant chunks
            user_docs = db_service.get_user_documents(author_username)
            if user_docs:
                # Simple keyword match against user docs
                query_lower = tweet_text.lower()
                relevant_docs = []
                for doc in user_docs:
                    doc_content = doc.get("content", "")
                    # Score by keyword overlap
                    words = set(query_lower.split())
                    doc_words = set(doc_content.lower().split())
                    overlap = len(words & doc_words)
                    if overlap > 1 or len(user_docs) <= 3:  # always include if few docs
                        relevant_docs.append(doc)
                if relevant_docs:
                    doc_context = f"USER'S PRIVATE DOCUMENTS (prioritize these over general knowledge):\n\n"
                    for doc in relevant_docs[:3]:
                        doc_context += f"### {doc.get('title', 'Document')}\n{doc.get('content', '')[:1500]}\n\n"
                    messages.append({"role": "system", "content": doc_context})

            # 3. User's past improvements as few-shot examples
            user_improvements = db_service.get_improvements()
            user_improvements = [m for m in user_improvements if m.get("username", "").lower() == author_username.lower() and m.get("improved_response")]
            if user_improvements:
                examples = user_improvements[:3]
                example_text = "EXAMPLES OF RESPONSES THIS USER PREFERS:\n"
                for ex in examples:
                    example_text += f"Q: {ex.get('question','')[:100]}\nIdeal: {ex.get('improved_response','')[:200]}\n\n"
                messages.append({"role": "system", "content": example_text})
    except Exception:
        pass

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
            tweet_list = [t for t in tweets if isinstance(t, str) and len(t) <= 280][:4]
            return {"tweets": tweet_list, "rag_sources": rag_sources}
    except json.JSONDecodeError:
        pass

    if len(raw) <= 280:
        return {"tweets": [raw], "rag_sources": rag_sources}

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
    return {"tweets": chunks[:4], "rag_sources": rag_sources}
