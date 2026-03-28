# Project: next-gen-gtm

## What This Is
Stardrop GTM Agent — an AI-powered GTM intelligence bot on X/Twitter that replies with actionable advice. Self-improving via feedback loops and RAG over 60+ research notes.

**Live URLs:**
- Landing: https://next-gen-gtm.vercel.app
- API: https://xitwxb23yn.us-east-1.awsapprunner.com
- Bot: https://x.com/stardroplin
- Improvement: https://next-gen-gtm.vercel.app/improve
- Dashboard: https://next-gen-gtm.vercel.app/dashboard

## Voice / Philosophy
Bo Mohazzabi (VP GTM @ Coframe, direct rapport) sets the standard:
- **Zero fluff.** No "leverage," "synergize," "thought leadership."
- **Practitioner voice.** Talk like someone who's done $36K→$2.4M, not read a blog.
- **Numbers always.** LTV:CAC, conversion %, specific dollar amounts.
- **Intent first.** Find people already showing buying signals, then craft one perfect message.
- **No hashtags.** They're cringe.

## Architecture
```
X/Twitter → FastAPI Worker (App Runner) → Intent Detection → RAG (ChromaDB) → GPT-4o → Reply
                                                                                    ↓
                                                            Log → Collect Engagement → Extract Learnings → Feed Back
```

## When Making Changes — Update Checklist

### If you change the system prompt or bot behavior:
- [ ] `backend/app/services/openai_service.py` — the system prompt
- [ ] `next-gen-gtm-vault/` — add/update relevant Obsidian notes
- [ ] Rebuild + push Docker image to ECR
- [ ] Trigger App Runner redeployment
- [ ] Test: `curl -X POST "API_URL/api/gtm/analyze?text=...&author=test"`

### If you change the frontend:
- [ ] `frontend/src/app/` — the page files
- [ ] `npx next build` — verify it builds
- [ ] `npx vercel --prod --yes --scope city-intelligence-inc`
- [ ] `npx vercel alias set <DEPLOY_URL> next-gen-gtm.vercel.app --scope city-intelligence-inc`

### If you add a new environment/integration:
- [ ] Create `backend/app/integrations/<tool>.py`
- [ ] Add env var to `backend/.env.example`
- [ ] Add to `backend/app/config.py`
- [ ] Update environment list in `frontend/src/app/dashboard/environments/page.tsx`
- [ ] Update environment list in landing page `frontend/src/app/page.tsx`
- [ ] Update `DESIGN.md` environment table
- [ ] Close the corresponding GitHub issue

### If you add new knowledge:
- [ ] Add/update note in `next-gen-gtm-vault/`
- [ ] Update `next-gen-gtm-vault/Home.md` (Map of Content)
- [ ] RAG re-indexes automatically on App Runner restart
- [ ] Copy vault into `backend/next-gen-gtm-vault/` for Docker builds

### If you change the self-improving loop:
- [ ] `backend/app/services/feedback_service.py` — feedback collection + learnings
- [ ] `backend/app/services/improvement_tracker.py` — daily metrics + compound curve
- [ ] `backend/app/services/openai_service.py` — where learnings are injected
- [ ] Update `DESIGN.md` self-improving architecture section

### If you deploy:
```bash
# Backend
cd backend
docker build --no-cache --platform linux/amd64 -t next-gen-gtm:latest .
docker tag next-gen-gtm:latest 050451400186.dkr.ecr.us-east-1.amazonaws.com/next-gen-gtm:latest
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin 050451400186.dkr.ecr.us-east-1.amazonaws.com
docker push 050451400186.dkr.ecr.us-east-1.amazonaws.com/next-gen-gtm:latest
aws apprunner start-deployment --service-arn "arn:aws:apprunner:us-east-1:050451400186:service/next-gen-gtm/c8067924d0594a3a8b3e84b0eee75e9e" --region us-east-1

# Frontend
cd frontend
npx next build
npx vercel --prod --yes --scope city-intelligence-inc
npx vercel alias set <DEPLOY_URL> next-gen-gtm.vercel.app --scope city-intelligence-inc
```

## Key Files
| File | What It Does |
|------|-------------|
| `backend/app/main.py` | FastAPI app + worker thread + all API endpoints |
| `backend/app/services/openai_service.py` | System prompt + RAG + learnings injection |
| `backend/app/services/twitter_service.py` | OAuth 1.0a mention polling + reply posting |
| `backend/app/services/rag_service.py` | ChromaDB vector store over vault notes |
| `backend/app/services/gtm_engine.py` | Intent detection (regex patterns) |
| `backend/app/services/feedback_service.py` | Self-improving feedback loop |
| `backend/app/services/improvement_tracker.py` | 1% daily compound improvement tracking |
| `backend/app/worker.py` | Poll loop (60s) + feedback collection |
| `frontend/src/app/page.tsx` | Landing page |
| `frontend/src/app/improve/page.tsx` | Compound improvement page |
| `frontend/src/app/dashboard/page.tsx` | Dashboard (real data from API) |
| `next-gen-gtm-vault/Home.md` | Obsidian vault index |
| `next-gen-gtm-vault/roles/Bo Mohazzabi.md` | Bo's profile + philosophy |
| `DESIGN.md` | Technical design document (1,655 lines) |
| `CHANGELOG.md` | Full build timeline |

## HyDE (Hypothetical Document Embedding)
When users submit responses or resources they like, embed those as "gold standard" documents. Then for new queries, generate a hypothetical ideal response first, embed it, and retrieve similar gold-standard docs to guide the actual response. This is the primary self-improvement mechanism going forward.

## Env Vars
```
OPENAI_API_KEY, TWITTER_CONSUMER_KEY, TWITTER_CONSUMER_SECRET,
TWITTER_BEARER_TOKEN, TWITTER_ACCESS_TOKEN, TWITTER_ACCESS_SECRET,
STARDROP_USERNAME=stardroplin, POLL_INTERVAL_SECONDS=60
```

## Issues
30 open at https://github.com/City-Intelligence-Inc/next-gen-gtm/issues
