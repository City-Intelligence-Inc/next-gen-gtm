---
tags: [framework, metrics, analytics, measurement]
aliases: [GTM Metrics That Matter, GTM Metrics, Key Metrics]
---

# GTM Metrics That Matter

Based on a16z's "11 Key GTM Metrics for B2B Startups" and modern revenue architecture frameworks.

## The Core Metrics

### Acquisition & Pipeline

| Metric | Formula | Benchmark | Why It Matters |
|--------|---------|-----------|---------------|
| **CAC** | Total S&M spend ÷ new customers | Varies by ACV | Cost to acquire a customer |
| **CAC Payback** | CAC ÷ (monthly revenue × gross margin) | <18 months | How fast you recoup acquisition cost |
| **LTV:CAC** | Lifetime value ÷ CAC | >3x | Unit economics viability |
| **Magic Number** | Net new ARR ÷ prior quarter S&M spend | >0.75 | GTM efficiency |
| **Pipeline Coverage** | Pipeline value ÷ quota | 3-4x | Do you have enough pipeline? |
| **Pipeline Velocity** | (Opps × Win Rate × ACV) ÷ Cycle Length | Increasing | Speed of revenue generation |

### Conversion & Sales

| Metric | Formula | Benchmark | Why It Matters |
|--------|---------|-----------|---------------|
| **Win Rate** | Closed/Won ÷ Total Opps | 15-30% (enterprise) | Sales effectiveness |
| **Sales Cycle** | Avg days from opp creation to close | Decreasing | Efficiency |
| **ACV** | Annual contract value | Growing | Revenue per deal |
| **Quota Attainment** | % of reps hitting quota | >60% | Is the model working? |

### Retention & Expansion

| Metric | Formula | Benchmark | Why It Matters |
|--------|---------|-----------|---------------|
| **Gross Revenue Retention** | Revenue retained excluding expansion | >85% | Churn |
| **Net Revenue Retention (NRR)** | Revenue retained including expansion | >120% | The #1 SaaS metric |
| **Logo Retention** | % of customers retained | >90% | Customer satisfaction |
| **Expansion Revenue %** | Revenue from upsell/cross-sell | Growing | Right side of [[Bow-Tie Funnel]] |

## Why NRR Is King

**Net Revenue Retention** is arguably the single most important GTM metric:

- NRR > 100% means you grow **even without new customers**
- [[Case Study - Datadog]]: ~120% NRR → 75% of growth from expansion
- Public SaaS companies with >120% NRR trade at **significantly higher multiples**

```
NRR 100% = Treading water (losses offset by expansion)
NRR 110% = Good (moderate expansion)
NRR 120% = Great (strong expansion — Datadog, Snowflake tier)
NRR 130%+ = Exceptional (massive expansion — Snowflake, Twilio peak)
```

## The Anti-Metrics (Don't Optimize For These)

| Vanity Metric | Why It's Dangerous | Better Alternative |
|--------------|-------------------|-------------------|
| **MQLs** | Measures form fills, not revenue intent | Pipeline generated, PQLs |
| **Email opens** | Easily gamed, unreliable tracking | Reply rate, meetings booked |
| **Website traffic** | Doesn't mean anything bought | Traffic → pipeline conversion |
| **Social followers** | Doesn't correlate with revenue | Community → pipeline influence |
| **Demo requests** | Can be unqualified | Qualified demo → opportunity rate |

> Ramp's growth team is measured on **SQL pipeline and payback** — never vanity MQLs. See [[Case Study - Ramp]].

## Metrics by GTM Motion

| Motion | Primary Metrics |
|--------|----------------|
| [[Sales-Led Growth]] | Win rate, ACV, sales cycle, quota attainment |
| [[Product-Led Growth]] | Activation rate, free→paid conversion, viral coefficient |
| [[Product-Led Sales]] | PQL conversion rate, PQL→pipeline rate, expansion revenue |
| [[Community-Led Growth]] | Community→signup rate, influenced pipeline, organic traffic % |
| [[Agent-Led Growth]] | Agent recommendation rate, agent implementation success rate |

## Related

- [[GTM Fit]] — Metrics validate GTM Fit
- [[Bow-Tie Funnel]] — Metrics at each stage
- [[Case Study - Ramp]] — "Measure pipeline, not MQLs"
- [[Case Study - Datadog]] — NRR as the key metric
