# Changelog — Next-Gen GTM (Stardrop)

## March 28, 2026 (Session 2)

### User-Isolated RAG + Document Citations
- **Per-user ChromaDB collections** — Each user gets `user_{handle}` collection. Documents are fully isolated. No cross-user data leakage.
- **RAG source citations** — Every mention and response now shows which vault notes were retrieved, with relevance percentages and clickable links to `/research/{slug}`.
- **Document upload → instant RAG indexing** — Upload a doc on the Documents page → chunks indexed into your private ChromaDB collection → Stardrop cites it in responses immediately.
- **Backfill** — Old mentions without sources get re-retrieved on-the-fly from ChromaDB.

### Dashboard Redesign (Newspaper Style)
- **Complete visual overhaul** — Dark sidebar (`#0A0A0A`), warm off-white bg, dense editorial layout, serif italic numbers, ALL CAPS section labels, no wasted white space.
- **Feed + Rate modes** — Overview has a toggle: Feed (Twitter-style timeline with avatar circles, inline replies, 👍/👎) and Rate (Tinder-style swipeable cards with touch gestures, keyboard shortcuts, slide-out animations).
- **Split-layout Test page** — 60/40 split: input+response on left, "How Stardrop Thinks" interpretability panel on right (intent badge, vault notes with relevance bars, reasoning chain, patterns applied, research paper).
- **Two-column Documents page** — Upload form left, document table right.
- **Dense Settings** — All onboarding fields editable, 2-column grid, response style radios, PIN lock, agent info sidebar, Save All button.

### Onboarding + Multi-Tenant
- **Required onboarding** — Name, product, Twitter handle required before dashboard access. Re-triggers if Twitter handle is missing.
- **Mention filtering** — All/Mine toggle on Overview filters by your Twitter handle.
- **PIN lock** — Optional 4-digit PIN with shake animation on wrong entry.

### Interpretability (#17 → 95%)
- **"How Stardrop thinks"** section on Test page: intent detection badge with confidence bar, 5 vault notes with relevance bars, visual reasoning chain (question → intent → retrieval → GPT-4o → response), patterns applied.
- **Vault notes are clickable** links to `/research/{slug}`.
- **Research paper** section in Lab panel (title, authors, NeurIPS target, abstract preview).

### Backend Improvements
- **`retrieve_with_sources()`** — Returns both context string and source metadata (title, folder, file, relevance).
- **`analyze_tweet()` returns dict** — `{tweets, rag_sources}` instead of plain list.
- **DynamoDB persistence** for rag_sources per mention.
- **Engagement scoring** — `likes×3 + replies×5 + retweets×2 + unique_accounts×10`.
- **X-Ray insights** — Real engagement data visualization.

### Icons + Logos
- **13 real SVG logos** from svgl.app/Wikipedia (X, OpenAI, GitHub, AWS, HubSpot, Salesforce, Slack, Stripe, LinkedIn, Snowflake, Meta, Google, Notion).
- **5 improved generated icons** (Luma gradient, Apollo blue, Common Room speech bubble, Segment S-path, Gong G-shape).

### Paper + Coframe
- **NeurIPS 2026 action plan** — 5 phases (April-September), specific asks for Bo and Josh.
- **Coframe integration thesis** — HaystacksAI (signals) → Stardrop (intelligence) → Coframe (conversion) pipeline.
- **Josh Payne + Bo Mohazzabi** added as co-authors.
- **Coframe case study** + tool profile in Obsidian vault.
- **Bo Mohazzabi profile** updated with full career arc.

---

## March 27, 2026 (Session 1)

### 3:30 PM — Kickoff
- Josh introduces Ari to Bo (Claude Code)
- Ari tweets: "@stardroplin build the next generation of how we do go to market and tie all of our systems together internally"

### 3:45 PM — Deep GTM Research Begins
- Launched 3 research agents in parallel:
  1. AI agents & tools (AI SDRs, Agent-Led Growth, GTM Engineering, composable stacks)
  2. Frameworks & case studies (MEDDIC, Bow-Tie, PLS, Ramp/Figma/Datadog/Clay deep dives)
  3. Data infrastructure (CDPs, reverse ETL, identity resolution, event-driven architecture)
- Created initial RESEARCH.md (~700 lines, 70+ sources)

### 4:15 PM — Obsidian Vault Created
- Built `next-gen-gtm-vault/` with 60+ interconnected notes across 10 folders
- Topics: concepts, motions, frameworks, tools, case-studies, architecture, data-infrastructure, roles, signals, resources
- 102 unique wikilinks connecting all notes
- Home.md as master Map of Content

### 4:45 PM — Deep Dive Notes Added
- 9 deep dive notes added (AI SDR Agents, Agent-Led Growth, GTM Engineering, Apollo Vibe GTM, Composable GTM Stack, Signal-Based Selling, Warehouse-Native GTM, Death of Traditional CRM)
- Total vault: 55 notes, 3 raw research files (~3,800 lines)

### 5:15 PM — Self-Improving GTM Engine Vision
- Created "The Self-Improving GTM Engine" — deepest note in vault (8 parts)
- Frameworks: OODA loops, flywheel effect, antifragile systems, double-loop learning
- Vault grew to 60 notes, 116 wikilinks

### 6:00 PM — Backend Built
- FastAPI backend: Twitter polling, GPT-4o analysis, intent detection (6 automations), worker loop
- Dockerfile + apprunner.yaml

### 6:30 PM — First Deploy to AWS App Runner
- **Live at:** https://xitwxb23yn.us-east-1.awsapprunner.com

### 6:45 PM — Twitter Write Auth Fixed
- **Successfully posted first tweet as @stardroplin**

### 7:00 PM — Full Pipeline Working
- Worker processed ALL 10 pending mentions
- Posted 4-tweet reply threads to each mention
- Added dedup check

### 7:15 PM — RAG Added
- ChromaDB: 60+ vault notes, 441 chunks, all-MiniLM-L6-v2 embeddings
- Responses now reference specific tools and frameworks

### 7:30 PM — Landing Page Built
- Next.js 16 frontend, Inter + Newsreader fonts
- **Stable URL:** https://next-gen-gtm.vercel.app

### 7:45 PM — Self-Improving Feedback Loop
- Logs every response, collects engagement after 1 hour
- Scores: likes×3 + replies×5 + retweets×2
- Top-performing patterns feed back into system prompt

### 8:00 PM — Design Polish
- Scroll animations, Twitter embed, hover transitions
- Custom favicon (italic S), OG image (1200×630), social preview metadata

### 8:15 PM — arXiv Paper Outline
- "Environmental Engineering for Go-To-Market Systems"
- 7 sections, formal definitions, key references

### 8:30 PM — 30 GitHub Issues Created
- Environment integrations (#1-18), product features (#19-33)

---

## Cumulative Stats (as of March 28)

| Metric | Value |
|--------|-------|
| Total commits | 80 |
| Lines of code | ~10,000+ (Python + TypeScript) |
| Research notes | 65 (interconnected Obsidian vault) |
| RAG chunks indexed | 441+ (shared) + user docs |
| Backend services | 8 |
| Frontend pages | 14 |
| GTM automations | 6 |
| Live environments | 6 |
| Planned environments | 18 |
| Open issues | 33 |
| Real SVG logos | 13 |
| arXiv paper | Full draft with 22 citations |
| DynamoDB tables | Mentions, users, documents |

**Live URLs:**
- Landing: https://next-gen-gtm.vercel.app
- Dashboard: https://next-gen-gtm.vercel.app/dashboard
- API: https://xitwxb23yn.us-east-1.awsapprunner.com
- Bot: https://x.com/stardroplin
- Repo: https://github.com/City-Intelligence-Inc/next-gen-gtm
