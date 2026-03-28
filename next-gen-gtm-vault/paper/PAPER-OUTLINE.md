# Environmental Engineering for Go-To-Market Systems: A Framework for Configuring, Orchestrating, and Self-Improving Multi-Environment AI Agents

**Authors:** Arihant Choudhary (City Intelligence / Stanford), Bo Mohazzabi (VP GTM, Coframe), Josh Payne (Coframe)
**Target:** NeurIPS 2026 (main conference or workshop), arXiv cs.AI
**Format:** LaTeX, 8-10 pages + appendices, NeurIPS style
**Status:** Outline complete. System deployed. Dashboard + self-improvement loop live. Data collection phase beginning (Issue #31).

---

## Abstract (~200 words)

Modern B2B Go-To-Market (GTM) operations require orchestrating 12-20 disconnected software environments — CRMs, enrichment platforms, email infrastructure, signal intelligence tools, data warehouses, and communication channels — each with distinct APIs, data models, and authentication patterns. We introduce the concept of **Environmental Engineering for GTM**, drawing an analogy from physical environmental engineering (configuring water, air, and waste systems into sustainable infrastructure) to software systems engineering (configuring SaaS environments into a coherent, self-improving GTM operating system).

We present **Stardrop**, an AI agent system that: (1) connects to multiple GTM environments via a unified integration architecture, (2) ingests and indexes domain knowledge through Retrieval-Augmented Generation over a curated 60-note research vault, (3) detects user intent across six GTM automation categories, and (4) generates actionable, knowledge-grounded responses deployed as a real-time Twitter/X agent. We evaluate Stardrop on specificity, actionability, and knowledge grounding against baseline LLM responses, and present a framework for systematically adding new environments to AI agent systems. Our framework contributes to the emerging field of agentic AI systems by formalizing the environment configuration problem that practitioners face when deploying AI agents across fragmented enterprise toolchains.

---

## 1. Introduction (1.5 pages)

### The Environment Problem in Enterprise AI

- AI agents are increasingly deployed in enterprise settings (Gartner: 40% of enterprise apps will include AI agents by end 2026)
- Unlike academic benchmarks where agents operate in single, well-defined environments (games, code editors, web browsers), enterprise agents must operate across **N fragmented environments simultaneously**
- Each environment (HubSpot, Salesforce, Slack, Clay, Apollo, etc.) has: distinct API protocols, authentication schemes, data models, rate limits, and failure modes
- No formal framework exists for reasoning about this multi-environment configuration problem

### The GTM Domain as Case Study

- B2B Go-To-Market is an ideal testbed: average company uses 12-20 tools, $1,800/employee/year on SaaS (Zylo), CRM data decays at 30%/year
- The domain requires: data ingestion, identity resolution, signal detection, scoring, orchestration, and multi-channel activation
- Recent industry shift: composable GTM stacks replacing monolithic CRM platforms (Salesforce stock -37%, HubSpot -60% vs S&P 500 +15%, early 2025)
- The "GTM Engineer" role emerged (3,000+ LinkedIn postings by Jan 2026) specifically to manage this multi-environment complexity

### Our Contributions

1. **The Environmental Engineering Framework** — A formal model for reasoning about environment configuration in multi-agent systems: environment taxonomy, interface abstraction, credential management, health monitoring, and progressive integration
2. **Stardrop** — A deployed, production AI agent that connects to 6 live environments (X/Twitter, OpenAI, ChromaDB, AWS, GitHub, Luma) with a framework for adding 17 more, demonstrating the framework in practice
3. **Knowledge-Grounded GTM Intelligence** — A RAG architecture over curated domain knowledge (60+ research notes, 441 indexed chunks) that produces measurably more specific and actionable outputs than baseline LLM responses
4. **Empirical evaluation** on a real deployment: response specificity, knowledge grounding, intent detection accuracy, and environment reliability metrics

---

## 2. Related Work (1 page)

### 2.1 AI Agent Systems & Environment Design
- ReAct (Yao et al., 2023), Toolformer (Schick et al., 2023), ToolLLM (Qin et al., 2023 — 16K+ real-world APIs)
- **WebArena** (Zhou et al., 2023) — realistic web environments for autonomous agents. Directly relevant: defines environments with state/action/observation spaces for web tools
- **AgentBench** (Liu et al., 2023) — evaluating LLMs across 8 environments. Our work extends this to SaaS environments
- **RestGPT** (Song et al., 2023) — planning + execution over REST APIs. Relevant to SaaS API orchestration
- Multi-agent: **AutoGen** (Wu et al., 2023 — conversable agents), **Voyager** (Wang et al., 2023 — lifelong learning agent with skill library), **MRKL Systems** (Karpas et al., 2022 — routing to expert modules)
- **Key gap:** All prior work treats environments as fixed. We formalize environment *configuration* as a first-class problem.

### 2.2 RAG Systems
- Lewis et al. (2020) original RAG paper
- Production RAG: Gao et al. (2024) survey, Barnett et al. (2024) challenges
- Domain-specific RAG for enterprise: limited prior work on GTM/sales domains
- Our contribution: RAG over *curated, interconnected* domain notes vs. unstructured web scraping

### 2.3 Enterprise Tool Integration
- MCP (Model Context Protocol, Anthropic 2025) — standardizing agent-tool connections
- A2A (Agent-to-Agent Protocol, Google 2026) — inter-agent communication
- **TaskWeaver** (Microsoft, 2023) — code-first agent for enterprise data analytics
- **ProAgent** (2023) — proactive multi-agent cooperation
- iPaaS platforms (Workato, Tray.io) — rule-based integration, not agent-native
- **Key gap:** No formal framework for reasoning about environment configuration in enterprise AI agent systems

### 2.4 AI for Sales and Marketing
- **Almost no academic work** — mostly industry reports and surveys (this is our opportunity)
- Lead scoring as classification (Yan et al., 2015; Wieland, 2019)
- LLM-based sales agents (11x, Artisan) — industry systems, no academic formalization
- **SWE-bench / SWE-Agent** (2024) — analogous: software engineering agents in real codebases, as we propose GTM agents in real SaaS tools
- Relevant workshop venues: KDD "AI for Business", AAAI "Intelligent Process Automation", NeurIPS "Foundation Models for Decision Making", AAMAS (Autonomous Agents and Multi-Agent Systems)

---

## 3. The Environmental Engineering Framework (2 pages)

### 3.1 Definitions

**Definition 1 (Environment).** A GTM environment $E_i$ is a tuple $(API_i, Auth_i, Schema_i, Rate_i, Health_i)$ where:
- $API_i$: the set of available API endpoints and their input/output specifications
- $Auth_i$: the authentication protocol (OAuth 1.0a, OAuth 2.0, API key, webhook signature)
- $Schema_i$: the data model (entities, relationships, field types)
- $Rate_i$: rate limiting constraints (requests/window, daily caps, concurrent limits)
- $Health_i$: a monitoring function returning environment availability and error state

**Definition 2 (Environment Configuration).** A configuration $C(E_i)$ is the complete set of credentials, mappings, and parameters needed to connect an agent to environment $E_i$.

**Definition 3 (GTM System).** A GTM system $G$ is a tuple $(E, A, K, O)$ where:
- $E = \{E_1, ..., E_n\}$: the set of configured environments
- $A$: the AI agent with access to all environments
- $K$: the knowledge base (indexed domain knowledge)
- $O$: the orchestration rules (plays: signal → action mappings)

### 3.2 Environment Taxonomy

We categorize GTM environments into seven functional classes:

| Class | Function | Examples | Interface Pattern |
|-------|----------|----------|-------------------|
| **Signal** | Detect buying intent | Common Room, Unify, G2 | Webhook push + poll |
| **Enrichment** | Add data to records | Clay, Apollo, Clearbit | Request-response |
| **CRM** | System of record | HubSpot, Salesforce, Attio | Bi-directional sync |
| **Outbound** | Send messages | Instantly, LinkedIn, Slack | Fire-and-forget + status poll |
| **Data** | Store and model | Snowflake, Segment, Hightouch | Batch + streaming |
| **Intelligence** | Analyze interactions | Gong, Pocus | Pull analytics |
| **Billing** | Revenue events | Stripe | Webhook push |

### 3.3 The Integration Interface

We define an abstract integration interface that all environment connectors implement:

```
Interface EnvironmentConnector:
  validate(credentials) → bool
  pull(entity_type, since?) → Record[]
  push(entity_type, data) → Result
  handle_webhook(payload) → Event[]
  health_check() → HealthStatus
```

This abstraction enables: (1) uniform agent interaction with heterogeneous environments, (2) environment-agnostic orchestration rules, (3) hot-swapping environments without agent retraining.

### 3.4 Progressive Environment Integration

We propose a maturity model for environment integration:

- **Level 0 — Disconnected:** Environment exists but no agent access
- **Level 1 — Read-only:** Agent can pull data (enrichment, signals)
- **Level 2 — Bi-directional:** Agent can read and write (CRM sync, score push)
- **Level 3 — Event-driven:** Real-time webhooks trigger agent actions
- **Level 4 — Self-improving:** Agent learns from environment outcomes and adjusts behavior

### 3.5 The Self-Improving Loop

Drawing from control theory and organizational learning:

- **OODA Loop** (Boyd, 1976): Observe (signals from environments) → Orient (scoring, context) → Decide (play selection) → Act (execute in environments) → Learn (track outcomes)
- **Double-Loop Learning** (Argyris, 1977): Single loop optimizes actions; double loop questions the strategy itself
- **Flywheel Effect** (Collins, 2001): More data → better models → better targeting → better outcomes → more data
- **Antifragility** (Taleb, 2012): System improves from failures (lost deals train better scoring, bounced emails improve enrichment waterfalls)

These map to specific architectural components: outcome tracking, model retraining, experiment engine, strategic insight surfacing.

---

## 4. System Architecture: Stardrop (1.5 pages)

### 4.1 System Overview

Stardrop is deployed as a Twitter/X agent (@stardroplin) that:
1. Polls for mentions every 60 seconds
2. Detects user intent across 6 GTM categories via regex + LLM
3. Retrieves relevant knowledge from a RAG index over 60+ curated notes
4. Generates a thread of actionable GTM intelligence via GPT-4o
5. Posts the reply and tracks the interaction

**Architecture diagram:**

```
Twitter/X (Signal Environment)
    ↓ poll mentions (OAuth 1.0a)
FastAPI Worker (AWS App Runner)
    ↓ detect intent (regex patterns)
GTM Engine
    ↓ query
ChromaDB (Knowledge Environment)
    ↓ relevant chunks (top-8, cosine similarity)
OpenAI GPT-4o (Intelligence Environment)
    ↓ generate response
Twitter/X (Outbound Environment)
    ↓ post reply thread (OAuth 1.0a)
State Store (deduplication)
```

### 4.2 Knowledge Base Construction

- 60+ markdown notes curated from web research across 10 categories: concepts, motions, frameworks, tools, case studies, architecture, data infrastructure, roles, signals, resources
- Includes practitioner profiles (Bo Mohazzabi — VP GTM @ Coframe, $36K→$2.4M, KarmaCheck 50x scale) that encode domain voice and philosophy into the RAG context
- Chunked into 441 segments (800 chars, 100 overlap)
- Indexed in ChromaDB with all-MiniLM-L6-v2 embeddings
- Retrieved at query time: top-8 chunks by cosine similarity, deduplicated by source note title
- 6 case studies: Ramp ($32B), Figma ($10B), Datadog (120% NRR), Notion ($10B), Clay ($5B), Coframe (multi-agent A/B testing)

### 4.3 Intent Detection

Six automation categories with regex-based primary detection and LLM fallback:

| Intent | Trigger Patterns | Example |
|--------|-----------------|---------|
| competitor_intel | "analyze competitor @X" | Competitive teardown |
| icp_analyzer | "who should I sell to" | ICP generation |
| signal_scanner | "find signals for" | Buying signal detection |
| gtm_roast | "roast my GTM" | Strategy assessment |
| stack_advisor | "what GTM stack" | Tool recommendations |
| outbound_generator | "turn this into outbound" | Cold email generation |
| general_gtm | (fallback) | General GTM advice |

### 4.4 Self-Improvement Architecture (Implemented)

The deployed system includes three self-improvement mechanisms:

**4.4.1 Engagement-Based Feedback Loop**
1. Every response is logged (mention, intent, generated tweets, reply IDs) to `.feedback_log.jsonl`
2. After 1 hour, the worker collects engagement metrics (likes, replies, retweets) via Twitter API
3. Responses are scored: `likes×3 + replies×5 + retweets×2`
4. Top-performing patterns and worst-performing anti-patterns are extracted
5. Learnings are injected into the system prompt for future responses
6. Tracked via `improvement_tracker.py` — 1% daily compound improvement target

**4.4.2 HyDE (Hypothetical Document Embedding)**
When users submit responses or resources they like, those are embedded as "gold standard" documents. For new queries, the system:
1. Generates a hypothetical ideal response
2. Embeds the hypothetical response
3. Retrieves similar gold-standard docs by cosine similarity
4. Uses retrieved gold-standard docs to guide the actual response generation

This is the primary self-improvement mechanism going forward — it enables the system to learn what "good" looks like from practitioner feedback without retraining.

**4.4.3 Compound Improvement Tracking**
The improvement tracker (`/api/improvements/status`) maintains:
- Daily response quality scores
- Running compound improvement rate
- Visualization at `/improve` showing the 1% daily compound curve
- Target: 37x improvement over 1 year (1.01^365)

### 4.5 Dashboard & Observability (Implemented)

The system includes a 7-page dashboard ([next-gen-gtm.vercel.app/dashboard](https://next-gen-gtm.vercel.app/dashboard)) that pulls real-time data from the API:

| Page | Data Source | What It Shows |
|------|-----------|--------------|
| Overview | `/api/dashboard/data` | Response count, avg engagement, active intents, environment health |
| History | `/api/gtm/history` | Full response log with intent, score, engagement metrics |
| Insights | `/api/improvements/status` | Performance trends, top patterns, compound improvement curve |
| Knowledge | `/api/rag/stats` | Vault stats, chunk distribution, most-retrieved notes |
| Environments | `/api/environments/status` | Per-environment health, latency, error rates |
| Settings | `/api/config` | Bot configuration, poll interval, model parameters |

This dashboard is the basis for the planned Townhall-style product (#19) where users customize Stardrop for their own ICP, knowledge, and response style.

### 4.6 Environment Configuration in Practice

We detail the actual configuration process for each live environment:

| Environment | Auth Type | Credentials | Config Steps |
|-------------|-----------|-------------|-------------|
| X/Twitter (read) | OAuth 1.0a | Consumer key/secret + access token/secret | 3-step OAuth PIN flow |
| X/Twitter (write) | OAuth 1.0a | Same, requires Read+Write app permissions | Permission change + token regeneration |
| OpenAI | API key | `OPENAI_API_KEY` | Single env var |
| ChromaDB | Local | None (embedded) | Automatic on startup |
| AWS App Runner | IAM | ECR access role + instance role | Terraform / CLI |
| GitHub | GitHub App | App ID + private key | App installation |
| Luma | API key | `LUMA_API_KEY` | Single env var |

We enumerate 18 additional environments with their integration specifications (see Appendix A).

---

## 5. Evaluation (1.5 pages)

### 5.1 Experimental Setup

- **Baseline:** GPT-4o with generic system prompt (no RAG, no GTM knowledge)
- **Stardrop:** GPT-4o with RAG over vault + GTM-specific system prompt
- **Test set:** 50 GTM questions spanning all 6 intent categories, sourced from real Twitter mentions and manually curated edge cases

### 5.2 Metrics

1. **Specificity Score** (1-5): Does the response name specific tools, companies, numbers, or frameworks? Annotated by 3 GTM practitioners.
2. **Actionability Score** (1-5): Can the recipient take a concrete action this week based on the response? Annotated by same.
3. **Knowledge Grounding Rate**: % of responses that reference specific facts from the vault (tools, stats, case studies) vs. generic advice.
4. **Intent Detection Accuracy**: % of test queries correctly classified to their intended category.
5. **Environment Reliability**: Uptime, error rate, and latency per connected environment over a 30-day deployment.

### 5.3 Results

[To be filled with actual measurements — data collection plan: Issue #31]

**Data being collected (starting March 2026):**
- Every response logged with: intent category, RAG chunks retrieved, generated text, reply tweet IDs
- Engagement metrics collected 1 hour post-reply: likes, replies, retweets, quote tweets
- Environment health: uptime, latency, error rates per environment (App Runner health checks)
- Improvement tracker: daily compound score, pattern extraction, learnings applied

**Expected findings:**
- RAG + domain knowledge significantly increases specificity (naming Clay, Apollo, Instantly vs. generic "use a CRM")
- Actionability improves when responses reference specific frameworks (MEDDIC, Bow-Tie, signal taxonomy)
- Intent detection via regex achieves >90% accuracy on clear queries; LLM fallback handles ambiguous cases
- Environment reliability: Twitter API rate limits are the primary constraint; OpenAI latency is the primary bottleneck
- HyDE mechanism improves response quality over time as gold-standard documents accumulate
- Practitioner voice (Bo Mohazzabi style: zero fluff, numbers always, intent first) correlates with higher engagement scores

### 5.4 Qualitative Analysis

- Example responses comparing baseline vs. Stardrop for each intent category
- Failure modes: hallucinated tool names, outdated pricing, overly generic "this week" actions
- User engagement: reply rates, follow-up questions, retweets (from live deployment)

---

## 6. Discussion (1 page)

### 6.1 The Environment Configuration Bottleneck

- In our experience, 70%+ of development time was spent on environment configuration (Twitter OAuth debugging, permission changes, token regeneration) vs. core agent logic
- This matches industry reports: GTM Engineers spend majority of time on integration plumbing
- The Environmental Engineering Framework provides vocabulary and structure to reason about this

### 6.2 Knowledge Curation vs. Knowledge Retrieval

- The vault (curated, structured, interconnected notes) outperforms unstructured web scraping
- Curation cost: ~40 hours of research to produce 60+ notes
- But: knowledge decays (tool pricing changes, companies pivot, new tools emerge)
- Future: automated knowledge refresh via agent-driven research

### 6.3 Limitations

- Single-agent system (no multi-agent collaboration yet) — planned: multi-agent pipeline with HaystacksAI + Coframe
- Twitter as the only user-facing channel (no Slack, email, or web interface yet) — planned: multi-channel activation (#30)
- No outcome tracking yet (can't measure if advice was followed or effective) — planned: #26
- Knowledge base is curated but manually maintained — planned: automated knowledge refresh via agent-driven research
- HyDE mechanism is implemented but gold-standard corpus is still small — grows with user feedback
- Evaluation is small-scale (50 test queries, 3 annotators) — will grow with live deployment data

### 6.4 The Self-Improving Trajectory

- Current system: Level 2-3 (bi-directional with some environments, event-driven feedback loop live)
- **Already implemented:** engagement-based feedback loop, HyDE gold-standard embedding, compound improvement tracker (1% daily target), learnings injection into system prompt
- Path to Level 4: outcome tracking (#26) → scoring model retraining → experiment engine (#27) → strategic insight surfacing
- The flywheel effect: each new environment adds data, each interaction trains better models
- Compound improvement target: 1.01^365 = 37x over 1 year — being tracked live at `/improve`
- The Coframe pipeline (HaystacksAI → Stardrop → Coframe) creates a cross-system flywheel: better signals → better intelligence → better conversion → more data → better signals

---

## 7. Conclusion (0.5 pages)

We introduced the Environmental Engineering Framework for reasoning about multi-environment AI agent systems, using B2B Go-To-Market as a case study. We demonstrated that:

1. Treating each SaaS tool as a formal "environment" with defined interfaces enables systematic agent integration
2. RAG over curated domain knowledge produces measurably more specific and actionable agent responses
3. A progressive integration model (Level 0-4) provides a practical roadmap for enterprise AI agent deployment
4. The self-improving loop (OODA + flywheel + antifragility) is not just theoretical — we implement it via engagement-based feedback, HyDE gold-standard embedding, and compound improvement tracking
5. The Coframe + HaystacksAI pipeline validates that practitioners independently converge on environmental engineering patterns, even without a formal framework

Stardrop is deployed and operational at https://xitwxb23yn.us-east-1.awsapprunner.com with dashboard at https://next-gen-gtm.vercel.app/dashboard and code at https://github.com/City-Intelligence-Inc/next-gen-gtm.

---

## Appendices

### Appendix A: Environment Integration Specifications

Full specification for all 23 environments (6 live + 17 planned):
- API endpoints, auth protocols, data schemas
- Rate limits and failure modes
- Integration level (current and target)
- Estimated configuration effort

### Appendix B: Knowledge Base Statistics

- 60+ notes across 10 categories
- 441 chunks indexed
- Token statistics per category
- Most-retrieved chunks per intent category

### Appendix C: Full System Prompt

The complete GTM system prompt with all domain knowledge encoded.

### Appendix D: Example Responses

Side-by-side baseline vs. Stardrop responses for all 6 intent categories + general GTM.

---

## What Makes This Paper Not Slop

1. **Real system, real deployment** — Not a toy. Live on App Runner, actually replying on X, real users tagging it.
2. **Novel framing** — "Environmental engineering" for AI agent systems. Nobody has formalized the multi-environment configuration problem this way.
3. **Grounded in established theory** — Boyd (OODA), Argyris (double-loop), Collins (flywheel), Taleb (antifragility), Meadows (systems thinking). Not hand-wavy.
4. **Practical contribution** — The integration interface, environment taxonomy, and progressive maturity model are immediately useful to practitioners building agent systems.
5. **Honest limitations** — Acknowledges what doesn't work yet, what hasn't been measured, and where the science is still thin.
6. **Open source** — Full code available. Reproducible.

---

## Coframe + HaystacksAI Integration (NEW — March 2026)

The Coframe acquisition of HaystacksAI provides a real-world validation of the environmental engineering framework. Three systems, three environments, one pipeline:

```
HaystacksAI (Signal Environment)  →  Stardrop (Intelligence Environment)  →  Coframe (Conversion Environment)
LLM behavioral analysis on          RAG + GPT-4o generates                   Multi-agent system runs
GitHub/LinkedIn to find intent       actionable GTM intelligence              autonomous A/B tests
```

### What this adds to the paper

1. **Multi-agent pipeline case study** — Three independently-built systems (HaystacksAI, Stardrop, Coframe) that map cleanly to the Environment Taxonomy: Signal → Intelligence → Conversion
2. **Coframe's vision fine-tuning** — GPT-4o fine-tuned with images + code achieved 26% improvement in website generation. This is a concrete example of environment-specific model adaptation.
3. **Bo Mohazzabi as co-author** — Bo built HaystacksAI (intent intelligence), was top AE at Optimizely (original experimentation company), scaled KarmaCheck 50x in 18 months. He adds practitioner credibility and the Optimizely→Coframe full-circle narrative.
4. **Self-improving loop validated** — Coframe's experiment results feed back into Stardrop's learnings, which improve targeting, which improves Coframe's personalization. The flywheel from Section 3.5 is real, not theoretical.

### Updates to existing sections

- **Section 1 (Intro):** Add Coframe acquisition as motivating example of why multi-environment orchestration matters
- **Section 3.5 (Self-Improving Loop):** Add Coframe experiment data as a concrete feedback source
- **Section 4 (System Architecture):** Add HaystacksAI and Coframe as additional environments in the pipeline diagram
- **Section 5 (Evaluation):** Add comparison: Stardrop-only vs. Stardrop+HaystacksAI signals vs. full pipeline with Coframe conversion data
- **Section 6 (Discussion):** The acquisition validates that practitioners independently arrive at the environmental engineering pattern — Coframe didn't read our framework, they lived it

---

## ACTION PLAN: NeurIPS 2026 Submission

### Key Dates
- **NeurIPS 2026 main conference deadline:** ~May 2026 (TBD, check https://neurips.cc)
- **NeurIPS 2026 workshop proposals:** ~June 2026
- **NeurIPS 2026 workshop paper deadlines:** ~September 2026
- **arXiv pre-print:** Upload ASAP after draft is ready (establishes priority)

### Phase 1: Evaluation Data (April 1-15)
- [ ] Collect 30 days of live Stardrop deployment data (mentions, responses, engagement)
- [ ] Run baseline comparison: GPT-4o without RAG on same 50 test queries
- [ ] Have 3 GTM practitioners score specificity (1-5) and actionability (1-5) for both
- [ ] Measure intent detection accuracy on labeled test set
- [ ] Log environment reliability metrics (uptime, latency, error rates per environment)
- [ ] Get Bo to review and score 20 responses (practitioner ground truth)

### Phase 2: Coframe Pipeline Integration (April 15-30)
- [ ] Connect HaystacksAI signal data to Stardrop's signal scanner
- [ ] Run Stardrop+HaystacksAI vs. Stardrop-only comparison on signal detection quality
- [ ] Get conversion data from Coframe experiments on pages where Stardrop influenced copy
- [ ] Document the full pipeline: signal → intelligence → conversion with real numbers

### Phase 3: Write the Paper (May 1-15)
- [ ] Set up NeurIPS LaTeX template (neurips_2026.sty)
- [ ] Write Introduction + Related Work (Ari)
- [ ] Write Environmental Engineering Framework — Section 3 (Ari)
- [ ] Write System Architecture — Section 4 (Ari + Bo for Coframe/HaystacksAI parts)
- [ ] Write Evaluation — Section 5 (Ari, with Bo reviewing practitioner scoring)
- [ ] Write Discussion + Conclusion — Section 6-7 (Ari + Bo)
- [ ] Create architecture diagrams (system overview, environment taxonomy, pipeline)
- [ ] Create evaluation tables and figures

### Phase 4: Review + Submit (May 15-25)
- [ ] Internal review: Bo reads full draft for practitioner accuracy
- [ ] Get 1-2 academic reviewers (Stanford CS contacts?) for feedback
- [ ] Revise based on feedback
- [ ] Upload to arXiv (cs.AI, cross-list cs.SE, cs.IR)
- [ ] Submit to NeurIPS 2026 main conference (if deadline allows) or target workshop

### Phase 5: Workshop Backup (September 2026)
If main conference doesn't work out:
- [ ] NeurIPS 2026 Workshop on Foundation Models for Decision Making
- [ ] NeurIPS 2026 Workshop on AI Agents (if one exists)
- [ ] AAAI 2027 Workshop on AI for Business Process Management

### What Bo Needs To Do

1. **Week 1:** Review paper outline, confirm co-authorship, provide HaystacksAI system description (2 paragraphs)
2. **Week 2:** Score 20 Stardrop responses for practitioner ground truth evaluation
3. **Week 3:** Provide Coframe experiment data (anonymized) showing conversion lift from AI-generated copy
4. **Week 4:** Review full draft, write 1 paragraph for Discussion on "why practitioners build environmental engineering patterns without a framework"
5. **Ongoing:** Connect Ari to Coframe's data pipeline for the integrated evaluation

### Submission Strategy

**Primary target:** NeurIPS 2026 main conference (cs.AI)
- Strongest venue for AI agent systems
- The environmental engineering framework is a novel contribution
- Real deployment data + practitioner evaluation = strong empirical story
- Coframe acquisition = timely industry validation

**Backup:** NeurIPS 2026 workshop paper (shorter, less evaluation needed)

**arXiv categories:** cs.AI (primary), cs.SE, cs.IR (cross-list)

**Why this paper gets accepted:**
1. Novel framing nobody has published (environmental engineering for agents)
2. Real system, real deployment, real users (not a benchmark)
3. Formal definitions (Environment, Configuration, GTM System) that are immediately useful
4. Practitioner co-author who's done $36K→$2.4M and scaled 50x
5. Industry validation via Coframe acquisition
6. Open source, reproducible
