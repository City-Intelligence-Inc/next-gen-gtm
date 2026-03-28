---
tags: [data-infrastructure, stack, architecture]
aliases: [Modern Data Stack for GTM, GTM Data Stack]
---

# Modern Data Stack for GTM

The full data infrastructure that powers modern GTM — from event collection to warehouse to activation.

## The Full Stack

```
┌───────────────────────────────────────────────────────────────┐
│                      EVENT SOURCES                             │
│  Product Events · Website · CRM · Support · Billing ·         │
│  Community · Third-Party Intent                                │
└───────────────────────┬───────────────────────────────────────┘
                        ↓
┌───────────────────────────────────────────────────────────────┐
│                   EVENT COLLECTION                             │
│  Segment · RudderStack · Snowplow                             │
│  (Client-side + server-side tracking)                         │
└───────────────────────┬───────────────────────────────────────┘
                        ↓
┌───────────────────────────────────────────────────────────────┐
│                   DATA INGESTION                               │
│  Fivetran · Airbyte · Stitch                                  │
│  (Database replication, API connectors, CDC)                  │
└───────────────────────┬───────────────────────────────────────┘
                        ↓
┌───────────────────────────────────────────────────────────────┐
│                   DATA WAREHOUSE                               │
│  Snowflake · BigQuery · Databricks · Postgres                 │
│  (Single source of truth for all GTM data)                    │
└───────────────────────┬───────────────────────────────────────┘
                        ↓
┌───────────────────────────────────────────────────────────────┐
│                   DATA MODELING                                │
│  dbt (transform, test, document, version control)             │
│  Models: PQL scores, health scores, ICP fit,                  │
│          intent signals, segments, attribution                 │
└───────────────────────┬───────────────────────────────────────┘
                        ↓
┌───────────────────────────────────────────────────────────────┐
│                   ACTIVATION                                   │
│  Hightouch · Census (Reverse ETL)                             │
│  Push modeled data to operational tools                        │
└───────────────────────┬───────────────────────────────────────┘
                        ↓
┌───────────────────────────────────────────────────────────────┐
│                   OPERATIONAL TOOLS                            │
│  CRM (Salesforce/Attio) · Marketing (HubSpot)                │
│  Sales (Instantly/Apollo) · CS (Gainsight)                    │
│  Ads (Google/Meta) · Chat (Slack/Intercom)                    │
└───────────────────────────────────────────────────────────────┘
```

## Component Choices

### Event Collection
| Tool | Type | Best For |
|------|------|----------|
| **Segment** | Hosted | Easy setup, large ecosystem |
| **RudderStack** | Open-source | Self-hosted, privacy-first |
| **Snowplow** | Open-source | Maximum flexibility, server-side |

### Data Ingestion
| Tool | Type | Best For |
|------|------|----------|
| **Fivetran** | Hosted | Widest connector library |
| **Airbyte** | Open-source | Cost-effective, self-hosted |
| **Stitch** | Hosted | Simple, Talend ecosystem |

### Data Warehouse
| Tool | Best For | Pricing |
|------|----------|---------|
| **Snowflake** | Enterprise, multi-cloud | Usage-based |
| **BigQuery** | Google ecosystem, serverless | Usage-based |
| **Databricks** | ML workloads | Usage-based |
| **Postgres** | Startups, cost-conscious | Self-hosted or ~$50/mo |

### Product Analytics (Complement)
| Tool | Type | Best For |
|------|------|----------|
| **PostHog** | Open-source | Self-hosted, full-featured |
| **Amplitude** | Hosted | Product analytics + experimentation |
| **Mixpanel** | Hosted | Event analytics |
| **Heap** | Hosted | Auto-capture, retroactive analytics |

## The Open-Source Alternative

For cost-conscious startups, the fully open-source stack:
- **Snowplow** or **RudderStack** (event collection)
- **Airbyte** (data ingestion)
- **Postgres** (warehouse)
- **dbt** (modeling)
- **RudderStack** (reverse ETL)
- **PostHog** (product analytics)
- **n8n** (workflow automation)
- **Twenty** (CRM — open-source)

Total cost: **hosting only** (~$100-500/month for a startup)

## Related

- [[Warehouse-Native GTM]] — The philosophy
- [[Reverse ETL]] — The activation pattern
- [[Hightouch]] — Primary activation tool
- [[Architecture - Core Layers]] — Full architecture
- [[Identity Resolution]] — Connecting the data
