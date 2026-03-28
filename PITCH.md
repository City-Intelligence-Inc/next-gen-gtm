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

## Engineering Roadmap: 33 Issues, 12 Weeks

I've already scoped every piece of work as a GitHub issue with progress tracking. Here's my plan to ship all of it.

### Week 1-2: Core Pipeline (Issues #3, #8, #6)
**Clay + Apollo + Instantly** — the composable outbound stack.

| Day | Deliverable |
|-----|------------|
| Mon-Tue | Clay integration (#3): API connector, waterfall enrichment, enrich leads from any mention |
| Wed-Thu | Apollo integration (#8): 275M contact database, pull leads matching ICP, email sequences |
| Fri | Instantly integration (#6): multi-mailbox cold email, connect Clay-enriched leads to sequences |
| Week 2 | End-to-end test: mention @stardroplin → ICP analysis → Clay enrichment → Apollo leads → Instantly sequence. **One tweet triggers a full outbound pipeline.** |

### Week 3-4: CRM + Notifications (Issues #1, #4, #2, #7)
**Salesforce + HubSpot + Attio + Slack** — where deals live.

| Day | Deliverable |
|-----|------------|
| Mon-Tue | HubSpot integration (#4): bi-directional contact/deal sync, push Stardrop's ICP scores |
| Wed-Thu | Salesforce integration (#1): enterprise CRM sync, opportunity tracking |
| Fri | Attio integration (#7): modern CRM for composable stacks |
| Week 4 | Slack integration (#2): real-time alerts to #gtm channel when high-intent signals detected, deal room updates, "@stardroplin" in Slack threads |

### Week 5-6: Signal Intelligence (Issues #5, #10, #22, #29)
**Common Room + Unify + Scoring + Plays** — find buyers before they find you.

| Day | Deliverable |
|-----|------------|
| Mon-Tue | Common Room integration (#5): 50+ signal sources, Person360 identity resolution |
| Wed-Thu | Unify integration (#10): 25+ signal types, automated plays |
| Fri | Scoring engine (#22): transparent lead/account scoring, combine signals from all sources |
| Week 6 | Play orchestration engine (#29): signal → action rules. "When a target account posts 'hiring SRE' AND visited pricing page → trigger outbound sequence." |

### Week 7-8: Data Infrastructure (Issues #11, #15, #9, #28)
**Snowflake + Segment + Hightouch + Identity** — the data foundation.

| Day | Deliverable |
|-----|------------|
| Mon-Tue | Snowflake/BigQuery integration (#11): warehouse as source of truth for all GTM data |
| Wed | Segment integration (#15): product event collection and routing |
| Thu-Fri | Hightouch integration (#9): reverse ETL, push warehouse segments to every tool |
| Week 8 | Identity resolution service (#28): merge records across tools, Person360 view, dedup |

### Week 9-10: Revenue + Intelligence (Issues #16, #14, #12, #26, #27)
**Stripe + Gong + Pocus + Outcomes + Experiments** — close the loop.

| Day | Deliverable |
|-----|------------|
| Mon | Stripe integration (#16): revenue events, expansion/churn signals |
| Tue-Wed | Gong integration (#14): call analysis, MEDDIC scoring from conversation data |
| Thu | Pocus integration (#12): product-qualified lead scoring from usage data |
| Fri | Outcome tracking (#26): connect engagement → deal → revenue. Know which responses actually closed deals. |
| Week 10 | Experiment engine (#27): A/B test different prompts, measure which GTM advice drives more revenue. The self-improving loop goes from "what gets likes" to "what makes money." |

### Week 11-12: Scale + Ship (Issues #13, #18, #30, #17, #31)
**LinkedIn + Ads + Multi-channel + Paper** — go wide.

| Day | Deliverable |
|-----|------------|
| Mon-Tue | LinkedIn integration (#13): connection requests, InMail, engagement tracking |
| Wed | Google Ads + Meta integration (#18): audience sync from warehouse segments |
| Thu | Multi-channel activation (#30): Stardrop responds on Slack, email, LinkedIn — not just Twitter |
| Fri | Finish interpretability dashboard (#17): full Goodfire-style X-ray on every response |
| Week 12 | Data collection complete (#31). Submit NeurIPS paper. Ship Stardrop as Coframe product feature. |

### Remaining Issues (Parallel / Ongoing)
| Issue | When | Notes |
|-------|------|-------|
| #20 Rilo | Week 6 | Low priority, nice-to-have workflow builder |
| #23 Slack channels for improvement | Week 4 | Ships with Slack integration |
| #25 Webhook management UI | Week 8 | Ships with data infrastructure |
| #32 Real logos | Ongoing | As companies provide brand assets |
| #33 Multi-tenant | Already 25% done | Grows with each environment added |

## The Scorecard After 12 Weeks

| Metric | Today | Week 12 |
|--------|-------|---------|
| Live environments | 6 | 24 |
| Open issues | 33 | 0 |
| Channels | Twitter only | Twitter, Slack, LinkedIn, Email, Web |
| Data sources | ChromaDB + DynamoDB | + Snowflake, Segment, Stripe, Gong |
| Enrichment | None | Clay waterfall + Apollo 275M contacts |
| Outbound | Manual | Automated: signal → enrich → sequence → send |
| CRM sync | None | HubSpot + Salesforce + Attio, bi-directional |
| Scoring | Engagement only | Multi-signal lead scoring + PQL |
| Self-improving | Tweet engagement | Revenue outcomes → model retraining |
| Paper | Draft | Submitted to NeurIPS 2026 |

## Why Hire Me For This

**I built the foundation in two sessions.** 80 commits, 10K+ lines of code, 65 research notes, 14 frontend pages, 8 backend services, deployed to production on AWS and Vercel, a self-improving feedback loop, user-isolated RAG, and a NeurIPS paper draft. While you were in meetings.

**I think in systems, not features.** Every environment connects through the same interface pattern. The architecture I built handles 6 environments today and 24 in 12 weeks because the abstractions are right. I read the 3,800 lines of GTM research before I wrote a single line of code.

**I ship fast and I ship complete.** Not prototypes — production systems with DynamoDB persistence, user isolation, engagement tracking, error handling, and deploy pipelines. The dashboard isn't a mockup. The bot isn't a demo. Real users are tagging @stardroplin right now and getting real responses.

**I understand the Coframe thesis.** Stardrop isn't a side project — it's the intelligence layer that makes Coframe's conversion optimization 10x more valuable. When Coframe knows WHO to target (Stardrop ICP), WHAT to say (Stardrop copy), and WHERE to find them (Stardrop signals), the A/B tests write themselves.

**I'm ready to start today.**

---

**Live now:**
- https://next-gen-gtm.vercel.app
- https://next-gen-gtm.vercel.app/dashboard
- https://x.com/stardroplin
- https://github.com/City-Intelligence-Inc/next-gen-gtm
