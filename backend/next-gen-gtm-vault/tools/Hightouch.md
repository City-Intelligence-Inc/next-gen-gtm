---
tags: [tool, reverse-etl, CDP, data-infrastructure, warehouse-native]
aliases: [Hightouch, Composable CDP]
---

# Hightouch

**Category:** Composable CDP / Reverse ETL
**Position:** Turns the data warehouse into a Customer Data Platform — the "activation layer" of warehouse-native GTM
**Website:** hightouch.com

## What It Does

Hightouch syncs **modeled data from the data warehouse back into operational tools** — CRM, marketing automation, ad platforms, sales engagement. It turns Snowflake/BigQuery/Postgres into a composable CDP.

## Core Concept: Reverse ETL

Traditional ETL: `Operational Tools → Warehouse` (for analytics)
**Reverse ETL:** `Warehouse → Operational Tools` (for activation)

```
Product Events → Segment → Snowflake → dbt (modeling) → Hightouch → Salesforce
Website Visits →                                                  → HubSpot
Billing Data →                                                    → Outreach
Support Data →                                                    → Slack
```

## Core Capabilities

### Reverse ETL
- Sync any SQL query or dbt model to 200+ destinations
- Real-time or scheduled sync
- Incremental updates (only sync changes)
- Field mapping with transformations

### Composable CDP Features
- **Identity Resolution** — Stitch user profiles across systems
- **Segmentation** — Build audiences using SQL or visual builder
- **Activation** — Push segments to any destination
- **Consent management** — Privacy-compliant data routing

### Audiences
- Visual audience builder on top of warehouse data
- Share audiences across marketing, sales, and product
- Real-time audience membership updates

## Why This Matters for GTM

### The Warehouse as Source of Truth
Instead of CRM being the source of truth (with stale, manually-entered data), the **data warehouse** becomes the center:

- Data teams model **PQL scores**, **health scores**, **ICP fit**, and **intent signals** in dbt/SQL
- Hightouch pushes those models into Salesforce, HubSpot, Outreach in real time
- No more stale CRM data — warehouse is continuously updated from all sources
- Data governance, version control (Git), and testing (CI/CD) for GTM data

### Eliminates Point-to-Point Integrations
Without Hightouch: N sources × M destinations = N×M integrations
With Hightouch: N sources → warehouse → Hightouch → M destinations

## Case Study: Ramp

See [[Case Study - Ramp]] for the full story.

- Stack: **Snowflake + dbt + Hightouch**
- Hightouch-powered Outbound Automation Team (OATs) drives **25% of all sales pipeline**
- Predictive model identifies **75% of future SQLs** before a rep clicks send
- Tiered outbound: Tier 1 manual, Tier 2 AI-written from Gmail (44% lift vs. sequencers), Tier 3 automated

## Competitor Landscape

| Tool | Status | Differentiator |
|------|--------|---------------|
| **Hightouch** | Independent, "Composable CDP" | Most complete CDP features on warehouse |
| **Census** | Acquired by Fivetran (May 2025) | Part of Fivetran ecosystem now |
| **Segment** | Twilio-owned | Event collection + Reverse ETL, blurring lines |
| **RudderStack** | Open-source alternative | Self-hosted, developer-friendly |

## Related

- [[Warehouse-Native GTM]] — The architecture Hightouch enables
- [[Reverse ETL]] — Core technical pattern
- [[Composable CDP]] — Hightouch's product category
- [[Identity Resolution]] — Key capability
- [[Case Study - Ramp]] — Flagship implementation
- [[Modern Data Stack for GTM]] — Where Hightouch fits
