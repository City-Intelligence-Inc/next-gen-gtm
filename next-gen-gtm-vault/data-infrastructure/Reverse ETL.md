---
tags: [data-infrastructure, reverse-etl, pattern]
aliases: [Reverse ETL]
---

# Reverse ETL

**Reverse ETL** syncs modeled data from the data warehouse back into operational tools (CRM, marketing automation, ad platforms, support). It turns the warehouse into a **composable CDP**.

## The Pattern

Traditional ETL: Operational Tools → Warehouse (for analytics)
**Reverse ETL:** Warehouse → Operational Tools (for activation)

```
Warehouse (modeled data)
    ↓ Reverse ETL
    ├→ Salesforce (update lead scores, health scores)
    ├→ HubSpot (sync segments, lifecycle stages)
    ├→ Outreach (push prioritized prospect lists)
    ├→ Slack (alert reps when signals fire)
    ├→ Google/Meta Ads (sync audiences)
    └→ Intercom (push user properties)
```

## Why It Matters

### Without Reverse ETL
- Data teams build models in the warehouse
- Nobody can use them (models are stuck in analytics)
- Sales still relies on stale CRM data
- Marketing can't activate warehouse segments

### With Reverse ETL
- Data teams model PQLs, health scores, ICP fit in dbt/SQL
- [[Hightouch]]/Census pushes those models into every operational tool
- Sales sees fresh, modeled data in Salesforce
- Marketing activates warehouse-defined audiences in ad platforms

## Key Players

| Tool | Status | Notes |
|------|--------|-------|
| **[[Hightouch]]** | Independent | "Composable CDP" — most complete feature set |
| **Census** | Acquired by Fivetran (May 2025) | Part of Fivetran ecosystem |
| **Segment** | Twilio-owned | Added Reverse ETL to event collection |
| **RudderStack** | Open-source | Self-hosted Reverse ETL option |

## Technical Details

### How It Works
1. **Define a model** — SQL query or dbt model in the warehouse
2. **Map fields** — Connect warehouse columns to destination fields
3. **Set schedule** — Real-time, hourly, daily, or event-triggered
4. **Sync** — Hightouch/Census executes the sync
5. **Monitor** — Track sync health, errors, row counts

### Sync Modes
- **Full sync** — Resync everything (slow, for initial loads)
- **Incremental** — Only sync changes (fast, for ongoing)
- **CDC (Change Data Capture)** — Real-time change detection

## Related

- [[Hightouch]] — Primary Reverse ETL tool
- [[Warehouse-Native GTM]] — Architecture that Reverse ETL enables
- [[Modern Data Stack for GTM]] — Full stack context
- [[Identity Resolution]] — Often combined with Reverse ETL
- [[Case Study - Ramp]] — Hightouch Reverse ETL in production
