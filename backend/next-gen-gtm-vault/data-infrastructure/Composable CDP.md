---
tags: [data-infrastructure, CDP, composable]
aliases: [Composable CDP]
---

# Composable CDP

A Customer Data Platform built **on top of the existing data warehouse** rather than creating a separate data store. The evolution of the CDP category.

## Traditional CDP vs. Composable CDP

| Dimension | Traditional CDP | Composable CDP |
|-----------|----------------|---------------|
| **Data store** | Separate (vendor-managed) | Your warehouse (Snowflake/BQ) |
| **Identity resolution** | Built-in (proprietary) | Built-in (warehouse-native) |
| **Segmentation** | Visual builder | SQL + visual builder |
| **Activation** | Push to destinations | [[Reverse ETL]] to destinations |
| **Data control** | Vendor holds data | You own your data |
| **Governance** | Vendor-defined | Your governance (dbt tests, Git) |
| **Cost** | $100K+/year (Segment) | Warehouse cost + Hightouch ($) |
| **Examples** | Segment, mParticle | [[Hightouch]], Census/Fivetran |

## Why Composable Is Winning

1. **No data duplication** — Data stays in the warehouse, no copying to a CDP
2. **Data team control** — Models in dbt/SQL, not vendor-defined schemas
3. **Lower cost** — No separate CDP license; just Reverse ETL tool
4. **Better governance** — Git-versioned, tested, auditable
5. **Flexibility** — Any SQL query = any audience/model

## The Convergence

Lines are blurring:
- Traditional CDPs (Segment) are adding Reverse ETL
- Composable CDPs ([[Hightouch]]) are adding real-time event streaming
- By 2026, experts say CDPs will evolve into "agentic, generative systems powered by governed, high-context data"

## Related

- [[Hightouch]] — Primary composable CDP
- [[Reverse ETL]] — Core mechanism
- [[Warehouse-Native GTM]] — Architecture philosophy
- [[Identity Resolution]] — Key capability
- [[Modern Data Stack for GTM]] — Where CDPs fit
