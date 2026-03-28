---
tags: [motion, agents, ALG, emerging]
aliases: [ALG, Agent-Led Growth, Agent-Led]
---

# Agent-Led Growth (ALG)

The emerging fourth GTM motion where **AI agents become the primary actors** in the buying and selling process. Identified by Insight Partners as a structural shift distinct from PLG and SLG.

## Two Forms of ALG

### 1. Demand-Side ALG (The Bigger Shift)

AI agents work **on behalf of buyers** — researching vendors, evaluating features, testing capabilities, initiating purchases.

This shifts authority from sellers to buyer agents. The product must sell itself to *machines*, not just humans.

**What this looks like:**
- Developer asks Claude Code to "set up email sending" → agent evaluates Resend vs SendGrid vs SES → picks Resend → implements it
- Team asks AI to "find a database for our new project" → agent evaluates Supabase vs PlanetScale vs Neon → selects based on docs, API quality, pricing
- Procurement agent scans vendor options, runs evals, presents shortlist to human

### 2. Supply-Side ALG (Incremental Improvement)

Companies deploy agents **to reach buyers** more efficiently:
- [[AI SDR Agents]] (11x, Artisan) handle outbound
- AI research agents personalize at scale
- AI scoring agents qualify leads automatically

This is important but incremental — it's "doing SLG with AI," not a new motion.

## Why ALG is Happening Now

| Era | Motion | Enabled By |
|-----|--------|-----------|
| 2000s | [[Sales-Led Growth]] | CRM platforms (Salesforce) |
| 2010s | [[Product-Led Growth]] | Product analytics (Amplitude, Mixpanel) |
| 2020s | [[Community-Led Growth]] | Community platforms (Discord, Slack) |
| 2025+ | **Agent-Led Growth** | MCP, WebMCP, AI coding agents |

**Key enablers:**
- **Model Context Protocol (MCP)** — Standardized way for AI agents to interact with tools and services
- **WebMCP** — Shipped in Chrome 146 (Feb 2026) — agents can browse and interact with web apps
- **AI coding agents** — Claude Code, Cursor, Bolt, Lovable selecting tools for developers

## Early Winners

| Company | ALG Signal | Result |
|---------|-----------|--------|
| **Supabase** | Selected by Bolt, Lovable, Cursor agents | 1M → 4.5M devs in 12 months; $765M → $5B valuation |
| **Resend** | Claude Code selects in 63% of email implementations (vs SendGrid 7%) | 0 → 400K users since 2023 |
| **Vercel** | Default deployment target for AI coding agents | Dominant Next.js hosting |
| **Stripe** | Best-documented payments API, first choice for agents | Maintained dominance despite competitors |

## Why They Won — The ALG Playbook

These companies share common traits that make them **agent-friendly**:

1. **Extensive, machine-readable documentation** — Agents consume docs to make decisions
2. **Free tiers** — Removes budget approval barrier (agent can just start using it)
3. **Clean, predictable APIs** — Minimal decision-making required; agents can implement without ambiguity
4. **Strong open-source presence in LLM training data** — Agents "know about" these tools from training
5. **Fast time-to-value** — Agent can set up and verify in one session

## The Three Pillars for Winning in ALG

### 1. Findable
- Invest in **GEO** (Generative Engine Optimization) — optimize for AI model responses
- Invest in **AEO** (Answer Engine Optimization) — optimize for AI search engines
- Be present in training data, documentation indices, and MCP registries
- Your product needs to be what agents *recommend*

### 2. Evaluable
- Treat documentation as a **core GTM asset** (not an afterthought)
- Agents consume docs extensively; gaps become competitive vulnerabilities
- Clear comparison pages, quickstart guides, API references
- Structured data (OpenAPI specs, JSON schemas) that agents can parse

### 3. Completeable
- Design products for **agent implementation**
- Clean APIs with minimal required decisions
- Straightforward integration paths
- Good error messages (agents debug based on error output)
- SDKs in all major languages

## The Key Stat

> **77% of buyers purchase from their AI-informed preliminary favorite.** — Insight Partners

This means the battle is won or lost at the *evaluation* stage. If an agent doesn't recommend you, you likely never get considered.

## Implications for GTM Strategy

1. **Documentation is marketing** — Invest in docs like you invest in content marketing
2. **Developer experience is GTM** — Every API friction point loses agent-driven deals
3. **Free tiers are mandatory** — Agents can't negotiate enterprise contracts
4. **SEO → GEO** — Optimize for AI responses, not just Google rankings
5. **Community presence matters** — Agents learn from training data including community discussions

## How to Measure ALG

- % of signups from AI agent implementations (track user-agent strings, API keys)
- Mentions in AI model responses (test with Claude, GPT, etc.)
- Agent implementation success rate (can an agent successfully set up your product?)
- Documentation completeness score
- Time-to-first-API-call for automated implementations

## Related

- [[AI Agents in GTM]] — Supply-side ALG tooling
- [[Product-Led Growth]] — The motion ALG is most similar to
- [[Composable GTM Stack]] — Agent-friendly architecture
- [[GTM Overview]]
