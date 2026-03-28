# Changelog — Next-Gen GTM

## March 27, 2026

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
- Research agents completed — added 9 deep dive notes:
  - AI SDR Agents (11x 70-80% churn, hybrid outperforms pure AI 2.3x)
  - Agent-Led Growth (Supabase $765M→$5B via agent adoption)
  - GTM Engineering (1,000 job postings analyzed, $80K-$280K comp)
  - Apollo Vibe GTM ($150M ARR, 500% YoY)
  - Composable GTM Stack (full reference architecture, ~$500/mo)
  - Signal-Based Selling (94% lock vendor list before first contact)
  - Warehouse-Native GTM (Ramp predicts 75% of SQLs)
  - Death of Traditional CRM (Salesforce -37%)
- Total vault: 55 notes, 3 raw research files (~3,800 lines)

### 5:00 PM — Rilo Research
- Deep research on getrilo.ai (Rilo)
- Full profile: natural language GTM workflow builder, $49-99/mo
- Founder: Ninad Deshpande, SF + Bangalore, 1-10 people
- Added to vault as tool profile

### 5:15 PM — Self-Improving GTM Engine Vision
- Created "The Self-Improving GTM Engine" — deepest note in vault (8 parts)
- Mapped each pain point to a self-improvement mechanism
- Frameworks: OODA loops, flywheel effect, antifragile systems, double-loop learning
- Supporting notes: OODA Loop for GTM, Double-Loop Learning, Antifragile GTM, Flywheel Effect
- Vault grew to 60 notes, 116 wikilinks

### 5:30 PM — Additional Research Completed
- Self-improving systems research agent finished (RL for GTM, Kaizen, multi-armed bandits, Bayesian optimization, feedback loops)
- Next-gen GTM architecture research agent finished (GTM Brain, multi-agent systems, revenue graph, predictive/prescriptive GTM, autonomous GTM)
- Saved to GTM-DEEP-RESEARCH.md and DATA_INFRASTRUCTURE_RESEARCH.md

### 6:00 PM — Backend Built
- Created FastAPI backend with:
  - Twitter mention polling (OAuth 1.0a)
  - GPT-4o GTM analysis with intent detection (6 automations)
  - GTM system prompt with all vault knowledge
  - Worker loop polling every 60 seconds
  - Dockerfile + apprunner.yaml
- Tested locally — API works, generates actionable GTM responses

### 6:15 PM — Twitter Auth Wired Up
- Received Twitter Consumer Key, Consumer Secret, Bearer Token
- Received Access Token and Secret
- Tested mention fetching — successfully pulled 10 @stardroplin mentions
- Bearer token had URL encoding issue — fixed

### 6:30 PM — First Deploy to AWS App Runner
- Created ECR repository `next-gen-gtm`
- Built Docker image (linux/amd64)
- Pushed to ECR
- Created App Runner service
- **Live at:** https://xitwxb23yn.us-east-1.awsapprunner.com

### 6:45 PM — Twitter Write Auth Fixed
- Consumer keys needed regenerating after permission change
- Twitter dev portal was 500-ing (their issue, not ours)
- Used OAuth PIN flow to get Read+Write tokens
- **Successfully posted first tweet as @stardroplin** 🎉
- Tweet: "Stardrop GTM Agent is live 🚀"

### 7:00 PM — Full Pipeline Working
- Worker processed ALL 10 pending mentions
- Posted 4-tweet reply threads to each mention
- Competitive intel, GTM strategy, ICP analysis — all working
- Added dedup check (don't reply if already replied to conversation)
- Redeployed to App Runner with worker running as background thread

### 7:15 PM — RAG Added
- Installed ChromaDB
- Created rag_service.py — indexes all 60+ vault notes (441 chunks)
- all-MiniLM-L6-v2 embeddings, cosine similarity, top-8 retrieval
- Updated openai_service.py to inject RAG context per query
- Tested: responses now reference specific tools (Clay, Apollo, Instantly) and frameworks
- Rebuilt and deployed to App Runner

### 7:30 PM — Landing Page Built
- Created Next.js 15 frontend with Inter + Newsreader fonts
- Matching talent-matcher design: monochrome, serif headings, clean
- Sections: Hero, Demo, How it Works, Capabilities, Environments, Stats, Research, CTA
- Environments section: 6 live (green) + 17 coming soon (gray)
- Deployed to Vercel
- **Stable URL set:** https://next-gen-gtm.vercel.app

### 7:45 PM — Self-Improving Feedback Loop
- Created feedback_service.py:
  - Logs every response (mention, intent, tweets, reply IDs)
  - Collects engagement metrics after 1 hour (likes, replies, retweets)
  - Scores responses: likes×3 + replies×5 + retweets×2
  - Extracts top-performing patterns
  - Feeds learnings back into system prompt
- Wired into worker (collects feedback every 10 poll cycles)
- Wired into openai_service (injects learnings context)
- Deployed to App Runner

### 8:00 PM — Scroll Animations + Design Polish
- Added CSS scroll animations (scroll-reveal, scroll-scale, stagger-children)
- Fixed progressive enhancement (content visible by default, animations enhance)
- Added Twitter embed of real tweet thread
- Added hover-lift transitions on cards
- Redeployed to Vercel

### 8:15 PM — arXiv Paper Outline
- Wrote full paper outline: "Environmental Engineering for Go-To-Market Systems"
- Target: cs.AI + cs.MA + cs.SE
- 7 sections: Intro, Related Work, Framework, System Architecture, Evaluation, Discussion, Conclusion
- Formal definitions: Environment tuple, GTM System, Integration Interface
- Key references: WebArena, AgentBench, AutoGen, ToolLLM, RestGPT
- Added to vault at paper/PAPER-OUTLINE.md

### 8:30 PM — 30 GitHub Issues Created
- Environment integrations (#1-18): Salesforce, HubSpot, Slack, Clay, Apollo, Instantly, Attio, Common Room, Unify, Pocus, Hightouch, Snowflake, Segment, Stripe, LinkedIn, Gong, Google/Meta Ads, Rilo
- Product features (#19-30): Dashboard, Goodfire interpretability, Tech design doc, Scoring engine, Slack channels, arXiv paper, Play engine, Identity resolution, Webhook UI, Outcome tracking, Experiment engine, Multi-channel

### 8:45 PM — Professional README
- Full collaborator-ready README with architecture, tech stack, getting started, deploy instructions, contributing guide
- Set repo description and homepage on GitHub
- Pushed to GitHub

### 9:00 PM — Agents Running
- Technical design doc agent writing DESIGN.md
- Dashboard agent building Townhall-style UI pages
- Both running in parallel

---

## Summary

**In ~5.5 hours:**

| What | Count |
|------|-------|
| Research notes | 60+ |
| Vault wikilinks | 116 |
| Raw research lines | ~3,800 |
| Backend services | 6 (twitter, openai, rag, gtm_engine, feedback, worker) |
| GTM automations | 6 (competitor, ICP, signals, roast, stack, outbound) |
| RAG chunks indexed | 441 |
| Tweets posted by bot | 40+ reply tweets |
| GitHub issues | 30 |
| Deployments | App Runner (backend) + Vercel (frontend) |
| Live environments | 6 (Twitter, OpenAI, ChromaDB, App Runner, GitHub, Luma) |
| Planned environments | 17 |
| arXiv paper sections | 7 |
| Lines of code written | ~2,500+ |

**Live URLs:**
- Landing page: https://next-gen-gtm.vercel.app
- API: https://xitwxb23yn.us-east-1.awsapprunner.com
- Bot: https://x.com/stardroplin
- Repo: https://github.com/City-Intelligence-Inc/next-gen-gtm
