---
tags: [index, research, deep-dive, 2026]
aliases: [Research Index, Deep Dive Index]
---

# Deep Dive Research Index

Research conducted March 2026 on AI agents in GTM (Go-To-Market). Eight deep-dive notes covering the full landscape of agentic GTM, signal-based selling, composable architectures, and the future of CRM.

## The Eight Deep Dives

### 1. [[AI SDR Agents Deep Dive]]
Comparison of 11x (Alice/Jordan), Artisan (Ava), AiSDR, Relevance AI, and Regie.ai. Covers pricing, capabilities, failure modes, the 11x scandal, and why the AI SDR bubble is popping. Key finding: 70-80% churn at 11x, hybrid human+AI models outperform pure AI by 2.3-2.6x.

### 2. [[Agent-Led Growth Deep Dive]]
Insight Partners' ALG framework in detail. MCP and WebMCP (shipped Chrome 146, Feb 2026) as the enabling infrastructure. The "token-to-value" framework. Supabase grew from $765M to $5B valuation via agent-mediated adoption. Resend selected by Claude Code 63% of the time vs. SendGrid's 7%.

### 3. [[GTM Engineering Deep Dive]]
What GTM engineers build day-to-day: Clay waterfall workflows, n8n automations, ICP scoring models, ops-as-code practices. Tech stack analysis from 1,000 job postings. HubSpot appears in 52%, Outreach 49%, Salesforce 45%. Compensation ranges $80K-$280K+.

### 4. [[Apollo Vibe GTM Deep Dive]]
Apollo's four agentic modules: Prospecting, Messaging, Deals, and Data Enrichment. $150M ARR, 500% YoY growth, 50K+ weekly active users. The "unified vs. composable" debate. Natural language GTM workflow creation.

### 5. [[Composable GTM Stack Deep Dive]]
Full reference architecture: Clay + Instantly + Attio + Common Room + Hightouch. Detailed data flows, integration patterns, and cost breakdowns. Essential stack starts at ~$500/mo; full stack ~$3K-$8K/mo. Composable vs. unified trade-offs.

### 6. [[Signal-Based Selling Deep Dive]]
Signal taxonomy (Tier 1/2/3), Unify's "plays" concept, dynamic sequencing mechanics. Four example plays with full implementation logic. Signal scoring model with decay. Key stat: 94% of buying groups have preferred vendor list locked before first contact.

### 7. [[Warehouse-Native GTM Deep Dive]]
Hightouch/Census with Snowflake/BigQuery and dbt. Full SQL examples for staging, intermediate scoring, and mart models. Ramp's case study: 25% of pipeline from warehouse-native outbound, 33% faster transformations, 20% cost reduction. When to go warehouse-native.

### 8. [[Death of Traditional CRM Deep Dive]]
Salesforce stock -31% (Dec 2025 to Mar 2026), growing 0.72x the CRM market rate. Attio ($52M Series B, 5K+ companies, 4x ARR growth), Folk (relationship-first), Twenty (open-source, self-hosted). The "CRM as view layer" thesis and unbundling of Salesforce.

## Key Themes Across All Research

1. **Hybrid beats autonomous** — Pure AI SDR replacement has failed. AI augmenting humans wins.
2. **Signals beat volume** — Signal-based selling outperforms spray-and-pray by 2-3x.
3. **Composable beats monolithic** — Best-of-breed tools connected via middleware (Clay) and warehouse.
4. **Agent-readiness is the new moat** — Products win by being findable, evaluable, and purchasable by AI agents.
5. **The warehouse is the new system of record** — CRM becomes a view layer, not the source of truth.
6. **GTM engineering is a real discipline** — Not just RevOps with tools; requires SQL, Python, API literacy.
7. **Documentation is marketing** — In the ALG era, docs are the primary sales asset for AI-mediated buying.
8. **The metric shift** — From "meetings booked" to "revenue generated per outbound dollar."

## Cross-References

```
Agent-Led Growth ←→ AI SDR Agents (supply-side ALG)
Agent-Led Growth ←→ Composable Stack (agent-friendly architecture)
Signal-Based Selling ←→ Composable Stack (signal layer integration)
GTM Engineering ←→ Composable Stack (who builds it)
GTM Engineering ←→ Warehouse-Native (data engineering skills)
Warehouse-Native ←→ Death of CRM (CRM as view layer)
Apollo Vibe GTM ←→ Composable Stack (unified vs. composable debate)
Death of CRM ←→ Composable Stack (unbundling thesis)
```
