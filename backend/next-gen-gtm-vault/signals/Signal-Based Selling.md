---
tags: [signals, selling, intent, strategy]
aliases: [Signal-Based Selling, Signal-Based, Warm Outbound]
---

# Signal-Based Selling

A fundamental shift from "spray and pray" outbound to **evidence-backed, timing-aware engagement**. Every email, call, or LinkedIn message is backed by evidence of active intent.

## The Core Idea

Instead of emailing 1,000 strangers, you:
1. **Detect** buying signals across multiple sources
2. **Score** accounts based on signal strength + ICP fit
3. **Engage** only when the timing is right, with context-aware messaging

## Three Core Signal Categories

### 1. Fit Signals
Firmographic and demographic data indicating **ICP match**:
- Company size, industry, tech stack
- Funding stage, headcount growth
- Technology adoption patterns
- Job titles and org structure

### 2. Intent Signals
Behavioral data indicating **active buying interest**:
- Content consumption on third-party sites (Bombora)
- G2 category/competitor research
- Job postings indicating need
- Keyword research on business topics
- Technology adoption/change signals

### 3. Engagement Signals
Direct interaction data:
- Website visits (de-anonymized)
- Email opens/clicks
- Webinar/event attendance
- Demo requests
- Product usage (for [[Product-Led Sales]])
- Community participation

## What the Data Shows

- Analysis of **1M software purchases**: companies adopting enterprise AI tools, making tech stack changes, and rapidly growing headcount are the **highest-intent prospects**
- **77% of buyers** purchase from their AI-informed preliminary favorite (Insight Partners)
- Market moved beyond account-level signals to **person-level** and **buying-group** insights by 2025

## The "Warm Outbound" Motion

```
Traditional Cold Outbound          Warm Outbound (Signal-Based)
─────────────────────────          ─────────────────────────────
1000 emails sent                   50 signals detected
  → 10 replies (1%)                50 researched + personalized emails
  → 3 meetings (0.3%)               → 12 replies (24%)
  → 1 deal                          → 6 meetings (12%)
                                     → 3 deals
```

Higher conversion, better unit economics, better buyer experience.

## Signal Infrastructure

| Tool | Signal Type | How |
|------|------------|-----|
| [[Common Room]] | Community + social | Aggregates 50+ digital touchpoints |
| [[Unify]] | Multi-signal | 25+ real-time signal types → automated "plays" |
| Bombora | Third-party intent | Co-op of B2B content publishers |
| 6sense / Demandbase | ABM + intent | AI-powered intent + fit scoring |
| G2 | Buyer intent | Category research, competitor comparison |
| [[Pocus]] | Product usage | PQLs from product signals |
| SalesIntel Signal360 | Multi-category | 30+ signal categories |

## Signal → Action: The "Play" Pattern

A **play** (term from [[Unify]]) connects signals to actions:

```
WHEN: [Target account visits pricing page 3+ times this week]
AND:  [Company matches ICP (>100 employees, B2B SaaS)]
AND:  [Contact is VP+ in Engineering or Product]
THEN:
  1. Enrich contact via Clay waterfall
  2. Research company via Clay AI
  3. Generate personalized email
  4. Add to Instantly sequence (Tier 2)
  5. Alert AE in Slack
  6. Update CRM with signal data
```

## Building Signal Infrastructure

1. **Identify your top signals** — Which signals correlate with closed deals? (Look at historical data)
2. **Set up detection** — [[Common Room]] for community/social, [[Unify]] for multi-signal, G2 for category intent
3. **Connect to enrichment** — [[Clay]] waterfall to flesh out the account/contact
4. **Build plays** — Signal + ICP match → action sequence
5. **Measure** — Track signal → pipeline → revenue to validate signal quality
6. **Iterate** — Tune signal weights based on conversion data

## Related

- [[Unify]] — Signal detection + play automation
- [[Common Room]] — Signal aggregation across 50+ sources
- [[Clay]] — Enrichment after signal detection
- [[Product-Led Sales]] — Product usage as signal
- [[GTM Engineer]] — Builds signal infrastructure
- [[Warm Outbound]] — The selling motion
- [[AI Agents in GTM]] — Agents that act on signals
