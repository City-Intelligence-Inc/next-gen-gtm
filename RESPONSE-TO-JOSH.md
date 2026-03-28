# What Josh Asked For → What Got Built

**Context:** On March 27, 2026 at 3:30 PM, Josh Payne (CEO, Coframe) said:

> "Build the next generation of how we do go to market and tie all of our systems together internally."

He also described two opportunity areas:
1. **GTM systems integration** — tie Coframe's internal GTM systems together, feeding into upcoming products
2. **Experimental labs** — build across the stack for channels not yet explored

**What happened next:** Ari tweeted `@stardroplin build the next generation of how we do go to market and tie all of our systems together internally` — and Stardrop built it.

---

## The Numbers

| Metric | Value |
|--------|-------|
| Time from call to production | ~5.5 hours |
| Total commits | 44 |
| Lines of code | 6,671 (Python + TypeScript) |
| Research notes | 65 (interconnected Obsidian vault) |
| RAG chunks indexed | 441 |
| Backend services | 7 (Twitter, OpenAI, RAG, GTM Engine, Feedback, Worker, Improvement Tracker) |
| Frontend pages | 12 (landing + dashboard + improve + rate + research) |
| GTM automations | 6 (ICP, Competitor Intel, Signals, Roast, Stack, Outbound) |
| Live environments | 6 (Twitter, OpenAI, ChromaDB, AWS, GitHub, Luma) |
| Planned environments | 18 (with GitHub issues for each) |
| Open issues | 32 |
| Real SVG logos | 13 |
| Executable playbooks | 6 |
| arXiv paper | Full draft with 22 citations |
| DynamoDB persistence | Live (mentions never lost on deploy) |

**Live URLs:**
- Landing: https://next-gen-gtm.vercel.app
- Dashboard: https://next-gen-gtm.vercel.app/dashboard
- Improve: https://next-gen-gtm.vercel.app/dashboard/improve
- API: https://xitwxb23yn.us-east-1.awsapprunner.com
- Bot: https://x.com/stardroplin
- Repo: https://github.com/City-Intelligence-Inc/next-gen-gtm

---

## What Josh Asked For → What Was Built

### 1. "Tie all of our systems together"

**Built:** The Environmental Engineering Framework — every GTM tool is a formal "environment" with defined interfaces. 6 are live, 18 are planned with GitHub issues.

```
Twitter (Signal)  →  Stardrop (Intelligence)  →  Coframe (Conversion)
     ↓                      ↓                         ↓
  Mentions              RAG + GPT-4o             A/B Testing
  Polling               Intent Detection         Personalization
  OAuth 1.0a            Knowledge Vault          Vision Fine-Tuning
```

The architecture treats each SaaS tool (HubSpot, Salesforce, Clay, Apollo, Slack, etc.) as an environment to connect. Each gets:
- Authentication (OAuth, API key, webhook)
- Data model mapping
- Health monitoring
- Progressive integration levels (read-only → bi-directional → event-driven → self-improving)

### 2. "Next generation of how we do go to market"

**Built:** A self-improving GTM intelligence agent that compounds in capability over time.

**The self-improving loop:**
```
User tags @stardroplin → Intent detection → RAG retrieval (441 chunks) → GPT-4o → Reply thread
                                                                                      ↓
                                                        Log → Collect engagement (1hr) → Score
                                                                                      ↓
                                                        Extract top patterns → Feed back into prompt
```

Scoring: `likes×3 + replies×5 + retweets×2`. Top 5 performers feed into the next response cycle. The agent literally gets better with every interaction.

**Grounded in theory:**
- OODA Loop (Boyd) — Observe signals, Orient with context, Decide response, Act, Learn
- Double-Loop Learning (Argyris) — Optimize tactics AND question strategy
- Flywheel Effect (Collins) — More data → better models → better targeting → more data
- Antifragility (Taleb) — Failed responses train the system to avoid those patterns

### 3. "And that would then lead into products on the pipeline"

**Built:** The Coframe + HaystacksAI integration thesis.

| Product | Role in Pipeline | Status |
|---------|-----------------|--------|
| HaystacksAI | Find people showing buying intent (GitHub/LinkedIn behavioral analysis) | Bo's team |
| Stardrop | Generate GTM intelligence (ICP, outbound, competitive intel) | Live, deployed |
| Coframe | Optimize conversion (autonomous A/B testing, personalization) | Josh's team |

**The compound effect:** Coframe experiment winners feed back into Stardrop's learnings → better targeting → better Coframe personalization → more conversion data → loop compounds.

### 4. "Experimental labs — build across the stack for different channels"

**Built:** 6 executable GTM playbooks + self-improvement system.

The Improve page (`/dashboard/improve`) has 6 tabs:
1. **Automate** — 6 step-by-step playbooks users can execute THIS WEEK (cold outbound, signal detection, ICP creation, competitive intel, PLS, GTM strategy)
2. **GTM Score** — Circular progress ring with 6 skill dimensions
3. **Knowledge Map** — Which vault topics you've explored vs gaps
4. **Learn** — 5-level structured curriculum with tweet challenges
5. **Why This Answer** — Goodfire-style interpretability (traces real API calls, shows intent + RAG sources)
6. **Compound Curve** — Personal 1% daily improvement tracking

---

## Architecture

```
┌──────────────────────────────────────────────────────────────────┐
│                    Frontend (Next.js 16)                         │
│                 Vercel · next-gen-gtm.vercel.app                │
│                                                                  │
│  Landing · Dashboard · Improve · Knowledge Graph · Rate · Research │
└──────────────────────┬───────────────────────────────────────────┘
                       │ Next.js API proxy (CORS-free)
                       ▼
┌──────────────────────────────────────────────────────────────────┐
│                  Backend (FastAPI + Python 3.12)                  │
│              AWS App Runner · 0.25 vCPU · Auto-scaling           │
│                                                                  │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────────────────┐│
│  │  Worker   │ │  Intent  │ │   RAG    │ │  Self-Improving Loop ││
│  │ 60s poll  │ │ Detection│ │ ChromaDB │ │  Feedback + Learnings││
│  └──────────┘ └──────────┘ └──────────┘ └──────────────────────┘│
│       │             │            │              │                │
│       ▼             ▼            ▼              ▼                │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐           │
│  │ Twitter  │ │  GPT-4o  │ │  Vault   │ │ DynamoDB │           │
│  │OAuth 1.0a│ │ Analysis │ │ 65 notes │ │Persistence│           │
│  └──────────┘ └──────────┘ │ 441 chnks│ └──────────┘           │
│                            └──────────┘                         │
└──────────────────────────────────────────────────────────────────┘
```

## Knowledge Base

65 interconnected Obsidian notes across 10 categories:

| Category | Notes | Key Topics |
|----------|-------|-----------|
| concepts | 10 | GTM thesis, pain points, self-improving engine, composable stacks |
| motions | 6 | SLG, PLG, ALG, CLG, PLS |
| frameworks | 7 | MEDDIC, Bow-Tie, GTM Fit, JTBD, OODA |
| tools | 14 | Clay, Apollo, Instantly, Attio, Coframe + 9 more |
| case-studies | 6 | Ramp ($32B), Figma ($10B), Datadog (120% NRR), Notion, Clay, **Coframe** |
| architecture | 3 | 6-layer stack, GTM OS, composable deep dive |
| data-infrastructure | 8 | CDP, reverse ETL, warehouse-native, identity resolution |
| signals | 3 | Signal taxonomy, AI agents in GTM |
| roles | 3 | GTM Engineer, **Bo Mohazzabi** profile |
| resources | 1 | Sources and reading list |

All indexed into ChromaDB (all-MiniLM-L6-v2, cosine similarity) and retrieved in real-time per query.

---

## How This Maps to Coframe

### For Bo (VP GTM)

1. **Stardrop IS the GTM intelligence layer Bo needs.** It does what HaystacksAI did (intent signals) plus what a GTM engineer does (ICP analysis, outbound copy, competitive intel, signal detection) — automated, self-improving, and grounded in 65 pages of research.

2. **The playbooks are Coframe's customer onboarding.** "Set Up Cold Outbound in 45 Minutes" using Clay + Apollo + Instantly — this is exactly the workflow Coframe's customers need before they can benefit from conversion optimization.

3. **The self-improving loop validates Bo's thesis.** At Optimizely, Bo saw companies plateau because they ran out of good hypotheses. Stardrop generates hypotheses. Coframe tests them. HaystacksAI finds the audience. Three products, one flywheel.

### For Josh (CEO)

1. **The "experimental labs" effort is live.** 12 frontend pages, 7 backend services, 6 GTM automations, 6 executable playbooks — all deployed and running.

2. **The paper legitimizes the approach.** "Environmental Engineering for Go-To-Market Systems" — full draft with 22 citations, targeting NeurIPS 2026. Josh + Bo + Ari as co-authors. This isn't a hack project — it's a framework.

3. **The environment architecture scales.** 6 live, 18 planned, each with a GitHub issue. Adding a new environment means: create connector, add env vars, update dashboard. The framework handles the rest.

---

## Timeline

```
3:30 PM   Josh calls Ari, describes the opportunity
3:45 PM   Research begins (3 parallel agents)
4:15 PM   60-note Obsidian vault created
5:00 PM   Self-improving engine vision documented
6:00 PM   FastAPI backend built (6 services)
6:30 PM   Deployed to AWS App Runner
6:45 PM   First tweet posted as @stardroplin
7:00 PM   Full pipeline working (10 mentions processed)
7:15 PM   RAG added (441 chunks indexed)
7:30 PM   Landing page deployed to Vercel
7:45 PM   Self-improving feedback loop wired
8:15 PM   arXiv paper outline written
8:30 PM   30 GitHub issues created
9:00 PM   Dashboard + design doc started
9:30 PM   OG images, favicon, social previews
10:00 PM  Scroll animations, company icons, Coframe case study
10:30 PM  Knowledge graph visualization
11:00 PM  Self-improvement page (6 tabs)
11:30 PM  Automate tab with 6 executable playbooks
12:00 AM  Real SVG logos, API wiring, DynamoDB persistence
12:30 AM  Full academic paper draft
```

**Everything from "Josh says build it" to "production system with 44 commits" happened in one session.**

---

## What's Next

1. **Connect with Bo** — 3-way chat to scope integration. Stardrop's API is ready for HaystacksAI signal data.
2. **Evaluation data** — 30 days of live deployment metrics for the paper.
3. **HaystacksAI integration** — Pipe intent signals into Stardrop's signal scanner.
4. **Coframe conversion data** — Close the feedback loop with experiment results.
5. **NeurIPS 2026** — Paper submission (May deadline).

---

*Built by Ari Choudhary. Powered by Claude Code.*
*Repo: https://github.com/City-Intelligence-Inc/next-gen-gtm*
