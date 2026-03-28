# Stardrop: The Agent That Ties All Systems Together

**For:** Josh Payne (CEO, Coframe) & Bo Mohazzabi (VP GTM, Coframe)
**From:** Ari Choudhary
**Date:** March 28, 2026

---

## Josh, here's what you asked for

> "Build the next generation of how we do go to market and tie all of our systems together internally."

I built it. It's called Stardrop. It's live. Here's the pitch.

---

## What Stardrop Is

Stardrop is an AI GTM agent that connects to your tools, learns from your data, and gets better every day. Tag @stardroplin on X, and in 60 seconds you get specific, actionable GTM advice grounded in 65 pages of curated research — ICP analysis, competitive intel, signal detection, outbound copy, stack recommendations, strategy roasts.

But that's just the demo. The real product is the architecture underneath.

## Why This Matters for Coframe

Coframe optimizes what happens AFTER someone lands on your site. But you need to know:
- **Who to send there** (ICP + signal detection)
- **What to say to them** (messaging + positioning)
- **How to find more like them** (enrichment + outbound)

That's the gap between HaystacksAI's intent signals and Coframe's conversion engine. Stardrop fills it.

```
HaystacksAI          Stardrop              Coframe
──────────          ─────────              ───────
Find people    →    Generate the     →    Optimize the
showing intent      GTM intelligence      conversion
(GitHub, LinkedIn)  (ICP, copy, signals)  (A/B tests, personalization)
```

Three products. One pipeline. Compounding returns.

## What's Built (80 commits, 2 sessions)

### The Intelligence Layer
- **65-note research vault** indexed into ChromaDB (441+ chunks)
- **RAG retrieval** with real-time citation — every response names its sources
- **6 GTM automations**: ICP analysis, competitor intel, signal detection, strategy roast, stack advisor, outbound generator
- **Self-improving feedback loop**: engagement scores → extract top patterns → inject into next prompt → compound daily

### The Product
- **Dashboard** with newspaper-style dense UI: mention feed, swipeable rating cards, document upload, settings
- **User-isolated RAG**: each user gets their own ChromaDB collection. Your docs are private. No cross-user leakage.
- **Document upload → instant citation**: upload a battle card, case study, or ICP doc → Stardrop cites it in the next response
- **Onboarding gate**: collects product info before access, personalizes every response
- **Interpretability panel**: "How Stardrop thinks" — shows intent detection, vault notes retrieved, reasoning chain

### The Infrastructure
- **Backend**: FastAPI on AWS App Runner, DynamoDB for persistence, ChromaDB for vectors
- **Frontend**: Next.js 16 on Vercel, responsive, OG images, social previews
- **Twitter integration**: OAuth 1.0a polling every 60s, reply threads, engagement tracking
- **33 GitHub issues** with progress tracking on each

### The Paper
- **"Environmental Engineering for Go-To-Market Systems"**
- Authors: Ari Choudhary, Bo Mohazzabi, Josh Payne
- Target: NeurIPS 2026
- Full draft with 22 citations, formal definitions, evaluation plan

## How This Becomes Coframe's GTM OS

### Phase 1: Internal Tool (Now)
Coframe's GTM team uses Stardrop to:
- Generate ICP analysis for target accounts
- Create outbound copy grounded in competitive research
- Detect buying signals for the AI growth agent market
- Upload internal docs (battle cards, pricing, case studies) and get personalized advice

### Phase 2: Customer-Facing Feature (Q2 2026)
Ship Stardrop as a feature inside Coframe:
- "GTM Intelligence" tab in the Coframe dashboard
- Customers upload their product info → get personalized GTM advice alongside conversion optimization
- Stardrop suggests what to A/B test: "Engineering managers respond to MTTR pain points. Test hero copy: 'Your PR review time is 3x what it should be.'"
- Coframe runs the experiment. Results feed back into Stardrop. Loop compounds.

### Phase 3: The GTM OS (Q3-Q4 2026)
Connect the 18 planned environments:
- **CRM** (HubSpot, Salesforce) — push ICP scores and lead intelligence
- **Enrichment** (Clay) — enrich leads with Stardrop's signal taxonomy
- **Outbound** (Apollo, Instantly, LinkedIn) — generate and send personalized sequences
- **Signals** (Common Room, Unify) — detect buying intent across channels
- **Data** (Snowflake, Segment) — warehouse all GTM data for the self-improving loop

Each environment has a GitHub issue. Each issue has progress tracking. The architecture is designed for this.

## Why This Is Different

| Traditional GTM | Stardrop |
|----------------|----------|
| 12-20 disconnected tools | One agent that ties them together |
| $85K/year per SDR | $8-24K/year for an AI agent system |
| CRM data decays 30%/year | Self-improving loop refreshes daily |
| Generic advice from consultants | Specific advice grounded in YOUR docs + 65 research notes |
| Takes months to iterate | Compounds 1% daily = 37.78x in a year |

## What Bo Gets

Bo built HaystacksAI to find intent signals. Stardrop is the next step — turn those signals into intelligence. Specifically:

1. **Stardrop's signal scanner** already maps to HaystacksAI's behavioral analysis. Plug in Bo's data and the signal detection gets 10x better.
2. **The playbooks** (6 executable GTM automations) are exactly what Bo would build for Coframe's customers. They're already built.
3. **The vault** has Bo's philosophy baked in: zero fluff, practitioner voice, numbers always. His profile is literally in the research notes.
4. **The paper** gives Bo academic cred alongside his practitioner cred. NeurIPS 2026 with Optimizely → Amplitude → KarmaCheck → HaystacksAI → Coframe as the narrative.

## What Josh Gets

1. **The "experimental labs" effort is live.** 14 frontend pages, 8 backend services, 6 GTM automations, 65 research notes — deployed and running.
2. **The framework scales.** Every new environment (Slack, HubSpot, Clay) is a GitHub issue with a defined interface. Adding one takes days, not months.
3. **The paper legitimizes the approach.** "Environmental Engineering for GTM Systems" at NeurIPS 2026 = Coframe isn't just an A/B testing tool, it's pioneering the GTM OS.
4. **I built this in two sessions.** Imagine what happens with full-time focus.

## Next Steps

1. **This week**: Bo and Ari have a working session. Bo reviews Stardrop's responses, uploads Coframe's internal docs, rates accuracy.
2. **Next week**: Connect HaystacksAI signal data to Stardrop's signal scanner. Run comparison: Stardrop-only vs. Stardrop+HaystacksAI.
3. **April**: Start evaluation data collection for the paper. 30 days of deployment metrics.
4. **May**: Submit to NeurIPS 2026. Ship Stardrop as a Coframe internal tool.

---

**Live now:**
- https://next-gen-gtm.vercel.app
- https://next-gen-gtm.vercel.app/dashboard
- https://x.com/stardroplin
- https://github.com/City-Intelligence-Inc/next-gen-gtm
