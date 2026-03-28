# Stardrop — Next-Gen GTM Intelligence Agent

> **[@stardroplin](https://x.com/stardroplin)** — Tag on X with any GTM question. Get actionable intelligence in 60 seconds.

**Live:** [next-gen-gtm.vercel.app](https://next-gen-gtm.vercel.app) · **API:** [xitwxb23yn.us-east-1.awsapprunner.com](https://xitwxb23yn.us-east-1.awsapprunner.com) · **Issues:** [30 open](https://github.com/City-Intelligence-Inc/next-gen-gtm/issues)

---

## What This Is

An AI-powered GTM (Go-To-Market) agent that lives on X/Twitter. Tag **@stardroplin** with any GTM question — competitive intel, ICP analysis, signal detection, stack recommendations, outbound copy — and it replies with specific, actionable intelligence backed by 60+ pages of curated research.

**Example:**

```
You: @stardroplin who should I sell to? we built an AI code review tool

Stardrop: 🎯 Target: Engineering Managers at B2B SaaS (50-500 employees).
They run 15+ PRs/day and struggle with review bottlenecks.

📡 Signal: Companies posting "hiring senior engineers" = growing team,
more PRs, more review pain.

✉️ Outreach: Email VP Eng with subject: "Your PR review time is 3x
what it should be"

🚀 This week: Use Apollo to find 50 Engineering Managers at Series A-B
SaaS. Send 10 personalized emails via Instantly referencing their
GitHub activity.
```

---

## Architecture

```
Twitter/X ──poll──→ FastAPI Worker (App Runner)
                         │
                    Intent Detection (regex + LLM)
                         │
                    RAG Retrieval (ChromaDB, 441 chunks from 60+ notes)
                         │
                    GPT-4o (with domain knowledge + learnings)
                         │
                    Post Reply Thread (OAuth 1.0a)
                         │
                    Log Response → Collect Engagement → Extract Learnings
                         │
                    Feed Learnings Back Into Prompt (self-improving loop)
```

### How It Self-Improves

1. **Logs** every response with intent, tweets, and reply IDs
2. **Collects** engagement metrics (likes, replies, retweets) after 1 hour
3. **Scores** each response: `likes×3 + replies×5 + retweets×2`
4. **Extracts** top-performing patterns and worst-performing anti-patterns
5. **Feeds** learnings back into the system prompt for future responses
6. **Repeats** — the system gets better every cycle

---

## What's Live

| Component | URL / Location | Status |
|-----------|---------------|--------|
| **GTM Bot** | [@stardroplin on X](https://x.com/stardroplin) | ✅ Polling every 60s, replying |
| **Landing Page** | [next-gen-gtm.vercel.app](https://next-gen-gtm.vercel.app) | ✅ Deployed on Vercel |
| **API** | [xitwxb23yn.us-east-1.awsapprunner.com](https://xitwxb23yn.us-east-1.awsapprunner.com) | ✅ AWS App Runner |
| **RAG Knowledge Base** | 60+ Obsidian notes, 441 indexed chunks | ✅ ChromaDB |
| **Feedback Loop** | Engagement tracking + learnings extraction | ✅ Running |
| **Research Vault** | `next-gen-gtm-vault/` | ✅ 60+ interconnected notes |

### Connected Environments

| Environment | What It Does | Auth |
|-------------|-------------|------|
| X / Twitter | Mention polling + auto-reply | OAuth 1.0a |
| OpenAI (GPT-4o) | GTM analysis + intelligence generation | API key |
| ChromaDB | RAG over 60+ vault notes (441 chunks) | Local |
| AWS App Runner | Backend compute + worker | IAM |
| GitHub | Repo, issues, CI/CD | GitHub App |
| Luma | Event management | API key |

---

## Six GTM Automations

| You tweet | Stardrop does |
|-----------|--------------|
| `@stardroplin analyze competitor @acmecorp` | Full competitive teardown — positioning, signals, weaknesses, recommended move |
| `@stardroplin who should I sell to?` | ICP generation — firmographics, pain points, channels, example accounts |
| `@stardroplin find signals for AI startups` | Buying signal detection — hiring, funding, complaints, tech changes |
| `@stardroplin roast my GTM` | Honest GTM assessment with specific fixes |
| `@stardroplin what GTM stack should I use?` | Personalized tool recs — Clay, Apollo, Instantly, Attio, etc. |
| `@stardroplin turn this into outbound` | Cold email copy + LinkedIn messages from any tweet/thread |

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| **Backend** | Python 3.12 + FastAPI + Celery-style worker |
| **AI** | OpenAI GPT-4o with RAG (ChromaDB + all-MiniLM-L6-v2) |
| **Twitter** | Tweepy (OAuth 1.0a for read + write) |
| **Frontend** | Next.js 15 + Tailwind CSS 4 + Inter/Newsreader fonts |
| **Infra** | AWS App Runner (backend) + Vercel (frontend) + ECR (Docker) |
| **Knowledge** | 60+ Obsidian markdown notes, chunked and embedded |

---

## Project Structure

```
next-gen-gtm/
├── backend/
│   ├── app/
│   │   ├── main.py                  # FastAPI app + worker thread
│   │   ├── config.py                # Environment config (pydantic-settings)
│   │   ├── models.py                # Pydantic models
│   │   ├── worker.py                # Twitter poll loop (60s interval)
│   │   └── services/
│   │       ├── twitter_service.py   # Mention polling + reply posting
│   │       ├── openai_service.py    # GPT-4o with RAG + learnings
│   │       ├── rag_service.py       # ChromaDB vector store over vault
│   │       ├── gtm_engine.py        # Intent detection + routing
│   │       └── feedback_service.py  # Self-improving feedback loop
│   ├── Dockerfile
│   ├── apprunner.yaml
│   └── requirements.txt
│
├── frontend/
│   └── src/app/
│       ├── layout.tsx               # Inter + Newsreader fonts, metadata
│       ├── page.tsx                 # Landing page with all sections
│       └── globals.css              # Animations, scroll effects
│
├── next-gen-gtm-vault/              # Obsidian knowledge vault
│   ├── Home.md                      # Master index (Map of Content)
│   ├── concepts/                    # GTM Overview, Thesis, Pain Points, etc.
│   ├── motions/                     # SLG, PLG, CLG, PLS, ALG
│   ├── frameworks/                  # MEDDIC, Bow-Tie, JTBD, GTM Fit, Metrics
│   ├── tools/                       # Clay, Apollo, Attio, Instantly, etc.
│   ├── case-studies/                # Ramp, Figma, Datadog, Notion, Clay
│   ├── architecture/                # Core Layers, GTM OS, Composable Stack
│   ├── data-infrastructure/         # Warehouse-Native, Reverse ETL, Identity
│   ├── signals/                     # Signal-Based Selling, AI Agents
│   ├── roles/                       # GTM Engineer
│   ├── resources/                   # Sources and reading list
│   └── paper/                       # arXiv paper outline
│
├── RESEARCH.md                      # Comprehensive GTM research (~700 lines)
├── GTM-DEEP-RESEARCH.md             # Deep frameworks + case studies (~1,200 lines)
├── DATA_INFRASTRUCTURE_RESEARCH.md  # Technical data stack research (~1,800 lines)
└── DESIGN.md                        # Technical design document
```

---

## Getting Started

### Prerequisites

- Python 3.12+
- Node.js 18+
- Docker (for App Runner deployment)
- AWS CLI configured
- Twitter Developer Account (API keys)
- OpenAI API key

### Local Development

```bash
# Backend
cd backend
cp .env.example .env
# Fill in your API keys in .env
pip install -r requirements.txt

# Start the API server
uvicorn app.main:app --port 8000 --reload

# Or run the worker directly
python -m app.worker
```

```bash
# Frontend
cd frontend
npm install
npm run dev
# Open http://localhost:3000
```

### Test the API

```bash
# Health check
curl https://xitwxb23yn.us-east-1.awsapprunner.com/health

# Analyze a GTM question
curl -X POST "https://xitwxb23yn.us-east-1.awsapprunner.com/api/gtm/analyze?text=who+should+I+sell+to%3F+we+built+an+AI+writing+tool&author=test"

# List all automations
curl https://xitwxb23yn.us-east-1.awsapprunner.com/api/gtm/intents
```

### Deploy

```bash
# Backend → AWS App Runner
cd backend
docker build --platform linux/amd64 -t next-gen-gtm .
docker tag next-gen-gtm:latest 050451400186.dkr.ecr.us-east-1.amazonaws.com/next-gen-gtm:latest
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin 050451400186.dkr.ecr.us-east-1.amazonaws.com
docker push 050451400186.dkr.ecr.us-east-1.amazonaws.com/next-gen-gtm:latest
aws apprunner start-deployment --service-arn <SERVICE_ARN> --region us-east-1

# Frontend → Vercel
cd frontend
npx vercel --prod --yes --scope city-intelligence-inc
npx vercel alias set <DEPLOY_URL> next-gen-gtm.vercel.app --scope city-intelligence-inc
```

---

## Environment Variables

```
OPENAI_API_KEY=sk-...              # GPT-4o for analysis
TWITTER_CONSUMER_KEY=...           # Twitter API key
TWITTER_CONSUMER_SECRET=...        # Twitter API secret
TWITTER_BEARER_TOKEN=...           # Twitter bearer (read)
TWITTER_ACCESS_TOKEN=...           # Twitter access (read+write)
TWITTER_ACCESS_SECRET=...          # Twitter access secret
STARDROP_USERNAME=stardroplin      # Bot username
POLL_INTERVAL_SECONDS=60           # How often to check mentions
```

---

## The Research Behind It

The bot's knowledge comes from 60+ curated research notes covering:

- **5 GTM Motions:** Sales-Led, Product-Led, Community-Led, Product-Led Sales, Agent-Led Growth
- **Signal Taxonomy:** Fit signals, intent signals, engagement signals
- **Composable GTM Stack:** Clay, Apollo, Instantly, Attio, Common Room, Unify, Pocus, Hightouch
- **Frameworks:** MEDDIC/MEDDPICC, Bow-Tie Funnel, JTBD, GTM Fit
- **Case Studies:** Ramp ($32B), Figma ($10B), Datadog (120% NRR), Notion ($10B), Clay ($5B)
- **Self-Improving Systems:** OODA loops, flywheel effects, antifragile systems, double-loop learning

All indexed via ChromaDB for retrieval-augmented generation (RAG).

---

## Roadmap

See [all 30 issues](https://github.com/City-Intelligence-Inc/next-gen-gtm/issues) for the full roadmap.

### Near-term
- [ ] **Protected dashboard** — Townhall-style UI for users to customize their Stardrop (#19)
- [ ] **Goodfire-style interpretability** — Visualize how the bot improves over time (#17)
- [ ] **Slack integration** — Signal alerts to sales channels (#2)
- [ ] **Scoring engine** — Transparent lead/account scoring (#22)

### Environment Integrations (17 planned)
- [ ] HubSpot (#4), Salesforce (#1), Attio (#7) — CRM sync
- [ ] Clay (#3), Apollo (#8) — Enrichment
- [ ] Instantly (#6), LinkedIn (#13) — Outbound
- [ ] Common Room (#5), Unify (#10), Pocus (#12) — Signals
- [ ] Hightouch (#9), Snowflake (#11), Segment (#15) — Data infrastructure
- [ ] Stripe (#16), Gong (#14), Google/Meta Ads (#18), Rilo (#20)

### Research
- [ ] **arXiv paper** — "Environmental Engineering for Go-To-Market Systems" (#24)
- [ ] **Technical design doc** (#21)

---

## The Paper

We're writing an arXiv paper (cs.AI) formalizing the concept of **Environmental Engineering for GTM Systems** — treating each SaaS tool as an environment to be configured, orchestrated, and self-improved by AI agents.

Outline: `next-gen-gtm-vault/paper/PAPER-OUTLINE.md`

---

## Contributing

1. Check [open issues](https://github.com/City-Intelligence-Inc/next-gen-gtm/issues)
2. Fork the repo
3. Create a branch: `git checkout -b feature/your-feature`
4. Make your changes
5. Push and create a PR

### Adding a New Environment Integration

Each integration follows the same pattern:

```python
# backend/app/integrations/your_tool.py

class YourToolIntegration:
    def validate(self, credentials: dict) -> bool: ...
    def pull(self, entity_type: str, since=None) -> list[dict]: ...
    def push(self, entity_type: str, data: dict) -> dict: ...
    def handle_webhook(self, payload: dict) -> list[dict]: ...
    def health_check(self) -> dict: ...
```

See the [environment issues](https://github.com/City-Intelligence-Inc/next-gen-gtm/issues) for specs on each integration.

### Adding a New GTM Automation

1. Add intent patterns to `backend/app/services/gtm_engine.py`
2. Add domain knowledge to `next-gen-gtm-vault/` (Obsidian notes)
3. Re-index the vault: the RAG service auto-indexes on startup
4. The system prompt in `openai_service.py` picks up new knowledge via retrieval

---

## Team

Built by [@arichoudhary](https://x.com/arichoudhary) at [City Intelligence](https://github.com/City-Intelligence-Inc).

---

## License

MIT
