---
tags: [concept, architecture, composable, stack]
aliases: [Composable GTM Stack, Composable Stack, Composable GTM]
---

# Composable GTM Stack

An architecture built from **best-of-breed components interoperating via APIs**, replacing monolithic CRM-centric platforms.

## The Unbundling Thesis

The B2B GTM landscape is shifting from CRM-centric monoliths to composable architectures — mirroring the shift in e-commerce (Shopify → headless) and content (WordPress → headless CMS).

### Why Monoliths Are Weakening

- Salesforce stock down **37%**, HubSpot down **60%** (vs. S&P 500 up 15%) — early 2025
- Data management tools became commoditized
- System integration is now cheap and widely accessible
- AI removes the need for constant human-in-the-loop — the last linchpin holding CRM platforms together

### The CRM's Historical Three Dimensions

1. **Data** — System of record for customer information
2. **Workflows** — System of action for business processes
3. **UI** — Single "pane of glass" for human users

The bundling made sense when these capabilities were expensive. That justification is eroding.

## What a Composable Stack Looks Like

### The Reference Architecture

```
┌─────────────────────────────────────────────┐
│              Signal Sources                  │
│  Common Room · G2 · Website · Product       │
└──────────────────┬──────────────────────────┘
                   ↓
┌─────────────────────────────────────────────┐
│          Enrichment + Research               │
│              Clay                            │
└──────────────────┬──────────────────────────┘
                   ↓
┌──────────┬───────────────┬──────────────────┐
│   CRM    │   Outbound    │   Data Layer     │
│  Attio   │  Instantly    │  Snowflake+dbt   │
│          │  Apollo       │  +Hightouch      │
└──────────┴───────────────┴──────────────────┘
                   ↓
┌─────────────────────────────────────────────┐
│          Orchestration                       │
│    n8n · Zapier · Make · Custom Code        │
└─────────────────────────────────────────────┘
```

### Example: Modern Startup Stack

| Function | Tool | Cost/Month |
|----------|------|-----------|
| Signals | [[Common Room]] | $300-500 |
| Enrichment | [[Clay]] | $150-500 |
| CRM | [[Attio]] | $100-300 |
| Outbound email | [[Instantly]] | $30-100 |
| Sequences + DB | [[Apollo]] | $50-200 |
| Warehouse sync | [[Hightouch]] | $0-500 |
| Automation | n8n (self-hosted) | $0-50 |
| **Total** | | **$630-2,150** |

Compare: Salesforce + ZoomInfo + Outreach + Marketo = **$5,000-$20,000+/month**

## MACH Principles

The composable stack follows:
- **M**icroservices — Each tool does one thing well
- **A**PI-first — Everything connects via APIs
- **C**loud-native — SaaS, no on-prem
- **H**eadless — Data layer separated from UI

## The Middleware Layer

The biggest shift in 2025: **middleware tools** that sit between signal sources and activation endpoints.

[[Clay]] is the primary middleware — connecting enrichment providers, signal sources, and outbound tools through a single orchestration layer. This is where the composable stack is actually assembled.

## Composable vs. Monolithic: Trade-offs

| Dimension | Composable | Monolithic |
|-----------|-----------|-----------|
| Flexibility | High — swap any component | Low — locked into ecosystem |
| Setup complexity | Higher — must integrate pieces | Lower — one platform |
| Cost | Lower at small scale | Lower at enterprise scale (volume discounts) |
| Data model | Custom, warehouse-native | Vendor-defined, CRM-centric |
| Who operates | [[GTM Engineer]] | RevOps admin |
| Best for | <50 people, technical teams | Enterprise, non-technical teams |

## Reality Check

Despite the unbundling trend, slightly more respondents said the CRM was at the center of their stack in 2025 than in 2024. The transition is happening, but **CRM remains the gravitational center — for now.**

The "Other" category of stack centers grew **5x** in recent surveys — suggesting emerging architectural alternatives.

## Related

- [[Traditional GTM Tech Stack]] — What composable replaces
- [[Clay]] — The middleware layer
- [[Attio]] — The modern CRM component
- [[Instantly]] — The outbound component
- [[Hightouch]] — The data activation component
- [[Warehouse-Native GTM]] — The data foundation
- [[GTM Engineer]] — Who builds and maintains the composable stack
- [[Next-Gen GTM Thesis]]
