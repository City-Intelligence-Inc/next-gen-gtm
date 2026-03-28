---
tags: [architecture, core, system-design]
aliases: [Architecture - Core Layers, Core Architecture]
---

# Architecture: Core Layers

The proposed architecture for a next-gen GTM platform. Six layers, each serving a distinct function.

## The Stack

```
┌────────────────────────────────────────────────────────┐
│                    AI Agent Layer                        │
│  Autonomous SDR, Research, Scoring, Deal Intel, CS      │
│  Tools: Custom agents, 11x, Artisan, Apollo Vibe GTM   │
├────────────────────────────────────────────────────────┤
│                  Orchestration Layer                     │
│  Workflow engine, play builder, signal→action routing,  │
│  cross-functional coordination                          │
│  Tools: n8n, Zapier, Cargo, custom engine              │
├────────────────────────────────────────────────────────┤
│                  Intelligence Layer                      │
│  Lead scoring, PQL models, health scores, intent,       │
│  ICP matching, propensity models                        │
│  Tools: Pocus, MadKudu, custom dbt models              │
├────────────────────────────────────────────────────────┤
│              Identity & Unification Layer                │
│  Contact/account graph, identity resolution,            │
│  data dedup, 360° customer view                         │
│  Tools: Hightouch, Segment, custom graph               │
├────────────────────────────────────────────────────────┤
│                Data Integration Layer                    │
│  Event ingestion, reverse ETL, API connectors,          │
│  webhooks, CDC, real-time streaming                     │
│  Tools: Segment, Hightouch, Census, Fivetran           │
├────────────────────────────────────────────────────────┤
│                  Data Foundation                         │
│  Data warehouse, event store, CRM sync,                 │
│  enrichment cache                                       │
│  Tools: Snowflake, BigQuery, Postgres, dbt             │
└────────────────────────────────────────────────────────┘
```

## Layer Details

### Layer 1: Data Foundation
The **source of truth** for all GTM data.

- **Warehouse:** Snowflake, BigQuery, or Postgres
- **Modeling:** dbt for transformations, versioned in Git, tested with CI
- **What lives here:** All raw and modeled GTM data — product events, CRM records, marketing touches, support interactions, billing, enrichment
- See: [[Warehouse-Native GTM]], [[Modern Data Stack for GTM]]

### Layer 2: Data Integration
The **plumbing** that moves data in and out.

- **Inbound:** Segment/RudderStack (events), Fivetran (database sync), webhooks (real-time)
- **Outbound:** [[Hightouch]]/Census (reverse ETL to operational tools)
- **Pattern:** All data flows through the warehouse — no point-to-point integrations
- See: [[Reverse ETL]], [[Event-Driven GTM Architecture]]

### Layer 3: Identity & Unification
The **customer graph** that connects all touchpoints to a single entity.

- Resolves: email + LinkedIn + GitHub + Slack + product user → one person
- Resolves: multiple contacts → one account
- Deduplication, merge rules, golden record logic
- See: [[Identity Resolution]]

### Layer 4: Intelligence
The **brain** that scores, predicts, and classifies.

- **Lead scoring:** ICP fit × intent × engagement = priority score
- **PQL models:** Product usage signals → qualified leads (see [[Product-Led Sales]])
- **Health scores:** Usage trends + support tickets + billing → churn risk
- **Intent models:** Third-party signals + behavioral data → buying propensity
- All models are **transparent and configurable** — not black boxes
- See: [[Signal-Based Selling]], [[Pocus]]

### Layer 5: Orchestration
The **workflow engine** that turns intelligence into action.

- **Plays:** When [signal] + [ICP match] → do [action] in [system]
- **Cross-functional:** One play can trigger marketing email + Slack alert to AE + CRM update
- **Branching logic:** Route based on segment, score, account tier
- See: [[Unify]], [[JTBD for GTM]]

### Layer 6: AI Agents
The **autonomous workers** that execute GTM tasks.

- Research agents, outbound agents, scoring agents, CS agents
- Agents consume intelligence layer data and execute through orchestration layer
- Human-in-the-loop for high-stakes actions; autonomous for routine tasks
- See: [[AI Agents in GTM]], [[AI SDR Agents]], [[Agent-Led Growth]]

## Design Principles

1. **Warehouse-native** — Warehouse is source of truth, not CRM
2. **Composable** — API-first, swap any component
3. **Signal-driven** — Actions triggered by evidence, not static lists
4. **AI-native** — Agents are first-class citizens
5. **Cross-functional** — Unified data model across marketing, sales, CS, product
6. **Jobs-based** — Organized around [[JTBD for GTM|GTM jobs]], not tool categories
7. **Transparent** — Scoring models are explainable and configurable
8. **Measurable** — Every action traceable to pipeline and revenue

## Build vs. Integrate

### Build (Core Differentiation)
- Unified data model + identity resolution
- Signal detection + routing engine
- Workflow/play orchestration engine
- AI agent framework
- Cross-functional dashboard + metrics

### Integrate (Best-of-Breed)
- CRM: [[Attio]], Salesforce, HubSpot
- Warehouse: Snowflake, BigQuery
- Email: [[Instantly]], Resend
- Enrichment: [[Clay]], Clearbit, [[Apollo]]
- Communication: Slack, LinkedIn
- Product analytics: Segment, Amplitude, PostHog
- Billing: Stripe, Chargebee

## Related

- [[Next-Gen GTM Thesis]] — Strategic context
- [[GTM Operating System]] — Organizational framework
- [[JTBD for GTM]] — Jobs the architecture serves
- [[Composable GTM Stack]] — Composability principle
- [[Warehouse-Native GTM]] — Data foundation
