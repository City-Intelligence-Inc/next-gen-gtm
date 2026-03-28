---
tags: [tool, CRM, modern-crm]
aliases: [Attio]
---

# Attio

**Category:** Modern CRM
**Position:** The "anti-Salesforce" — relational, flexible, startup-friendly CRM
**Website:** attio.com

## What It Does

Attio is a **modern CRM built on a relational/object-based data model** instead of Salesforce's rigid record types. It's designed for teams under 50 who need flexibility without complexity.

## Core Differentiators

### Relational Data Model
- Everything is an object with relationships (not flat records)
- Custom objects, attributes, and relationships without admin overhead
- Closer to a database than a traditional CRM
- No-code customization that doesn't break

### Automatic Data Enrichment
- Syncs with email, calendar, LinkedIn
- Automatically captures interactions and enriches records
- Less manual data entry → better CRM adoption

### Modern UX
- Fast, keyboard-driven interface (feels like Notion/Linear, not Salesforce)
- Real-time collaboration
- Mobile-first design

## Why Attio Is Gaining

The CRM market is ripe for disruption:
- Salesforce stock down 37% (early 2025)
- HubSpot stock down 60%
- Teams frustrated with Salesforce complexity and cost
- [[Composable GTM Stack]] means the CRM doesn't need to do everything

Attio's bet: the CRM should be a **flexible data layer**, not a monolithic platform. Other tools handle outbound ([[Instantly]]), enrichment ([[Clay]]), analytics (warehouse), etc.

## Who Uses It

- Startups and early-stage companies (primary)
- Teams <50 people
- Companies adopting a [[Composable GTM Stack]]
- Not yet strong for enterprise (no equivalent to Salesforce's AppExchange ecosystem)

## In the Composable Stack

```
Clay (enrichment) → Attio (CRM/system of record) → Instantly (outbound)
                         ↕
                    Hightouch (warehouse sync)
```

## Competitors

| CRM | Target | Key Differentiator |
|-----|--------|-------------------|
| **Attio** | Startups, composable stacks | Relational model, modern UX |
| **Folk** | Small teams, relationship-focused | Personal CRM feel |
| **Twenty** | Open-source teams | Self-hosted, code-extensible |
| **HubSpot** | SMB-mid market | All-in-one marketing + sales |
| **Salesforce** | Enterprise | Ecosystem, AppExchange, scale |

## Related

- [[Composable GTM Stack]] — Attio is the CRM component
- [[Clay]] — Common enrichment pairing
- [[Traditional GTM Tech Stack]] — What Attio replaces
- [[GTM Pain Points]] — Addresses tool sprawl and CRM complexity
