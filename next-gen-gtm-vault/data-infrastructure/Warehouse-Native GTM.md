---
tags: [data-infrastructure, warehouse, architecture, source-of-truth]
aliases: [Warehouse-Native GTM, Warehouse-Native]
---

# Warehouse-Native GTM

An architecture where the **data warehouse** (Snowflake, BigQuery, Databricks, Postgres) is the source of truth for all GTM data — not the CRM.

## The Core Idea

Instead of:
```
CRM (source of truth) ← manual updates by reps
                       ← point-to-point integrations from 15 tools
                       → stale, incomplete, untrusted data
```

Warehouse-native:
```
All Sources → Warehouse (source of truth) → dbt (modeling) → Reverse ETL → CRM + all tools
                                                                              ↓
                                                                    Fresh, modeled, trusted data
```

## Why This Wins

### 1. Single Source of Truth
- All data in one place: product events, CRM records, marketing, support, billing, enrichment
- No more conflicting data between systems
- Data teams control the models

### 2. SQL-Based Modeling
- PQL scores, health scores, ICP fit, intent — all defined in SQL/dbt
- **Version controlled** in Git
- **Tested** with CI/CD
- **Transparent** — anyone can read the query to understand the logic

### 3. Governance & Quality
- Data lineage, freshness monitoring, schema tests
- Audit trail for every change
- GDPR/CCPA compliance built into the data layer

### 4. Eliminates Point-to-Point Integrations
- Without warehouse: N sources × M destinations = N×M integrations to maintain
- With warehouse: N sources → warehouse → [[Hightouch]] → M destinations

## The Stack

```
┌──────────────────────────────┐
│     Event Collection          │
│  Segment · RudderStack       │
└──────────┬───────────────────┘
           ↓
┌──────────────────────────────┐
│     Data Warehouse            │
│  Snowflake · BigQuery         │
│  Postgres · Databricks        │
└──────────┬───────────────────┘
           ↓
┌──────────────────────────────┐
│     Data Modeling             │
│  dbt                          │
│  (PQL scores, health scores,  │
│   ICP models, segments)       │
└──────────┬───────────────────┘
           ↓
┌──────────────────────────────┐
│     Reverse ETL               │
│  Hightouch · Census           │
└──────────┬───────────────────┘
           ↓
┌──────────────────────────────┐
│     Operational Tools         │
│  Salesforce · HubSpot         │
│  Outreach · Slack · Ads       │
└──────────────────────────────┘
```

## Key Components

### Data Warehouse
- **Snowflake** — Most popular for enterprise; scalable, separate compute/storage
- **BigQuery** — Google ecosystem, serverless, good for analytics-heavy
- **Databricks** — Best for ML workloads on GTM data
- **Postgres** — Self-hosted, great for startups, cost-effective

### dbt (Data Build Tool)
- SQL-based transformation framework
- Models define how raw data becomes GTM-ready
- Tests validate data quality
- Documentation auto-generated
- Git-versioned, PR-reviewed like code

### Reverse ETL
- [[Hightouch]] — Composable CDP, most features
- Census (now Fivetran) — Part of the Fivetran ingestion ecosystem
- See: [[Reverse ETL]]

## Case Study: Ramp's Stack

See [[Case Study - Ramp]] for full details.

- **Snowflake** + **dbt** + **[[Hightouch]]**
- Predictive model identifies **75% of future SQLs** before a rep acts
- Outbound Automation Teams (OATs) drive **25% of all pipeline**
- Gmail sends outperform sequencers by **44%** for Tier 2

## Related

- [[Hightouch]] — Primary reverse ETL tool
- [[Reverse ETL]] — Core pattern
- [[Modern Data Stack for GTM]] — Full stack overview
- [[Architecture - Core Layers]] — Data Foundation layer
- [[Case Study - Ramp]] — Reference implementation
- [[Composable GTM Stack]] — Warehouse-native is the data philosophy of composable
