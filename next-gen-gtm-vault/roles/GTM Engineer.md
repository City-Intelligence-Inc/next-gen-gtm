---
tags: [role, GTM-engineering, ops-as-code]
aliases: [GTM Engineer, GTM Engineering]
---

# GTM Engineer

The most significant new role in modern GTM. A **revenue systems architect** who designs, builds, and maintains the technical infrastructure that powers go-to-market at scale.

## Definition

Unlike RevOps (CRM administration and reporting), GTM Engineers **write code, build API integrations, configure workflow automation, and implement AI-powered systems.**

## How GTM Engineers Differ

| Role | Focus | GTM Engineer Distinction |
|------|-------|------------------------|
| **Growth Marketer** | Customer acquisition (SEO, paid, content) | GTM Engineers encompass entire journey with RevOps fluency |
| **Growth Engineer** | Product features for engagement/retention | GTM Engineers extend beyond product into sales/marketing systems |
| **Growth PM** | Product experiment pipelines | GTM Engineers integrate product, marketing, and sales as one system |
| **RevOps** | Managing existing tools, reporting | GTM Engineers architect new systems, write code, build integrations |

## The GTM Engineer Tech Stack

### Data & Enrichment
- [[Clay]] (primary workflow tool)
- RB2B, [[Common Room]], Clearbit, BuiltWith

### Outbound
- [[Instantly]], Smartlead, Lemlist, [[Apollo]], Salesloft

### Signal Detection
- [[Common Room]], [[Unify]], MadKudu, [[Pocus]]

### Revenue Orchestration
- Cargo, Warmly

### Workflow Automation
- n8n (open-source, most popular), Zapier, Make

### Content & Personalization
- Byword.ai, AirOps, Writesonic, GPT/Claude APIs

### Sales Intelligence
- Gong, Orum, Attention

## What They Build Day-to-Day

### Typical Projects
1. **Outbound play automation** — Signal triggers → enrichment → personalization → outbound sequence
2. **PQL scoring models** — Product usage + ICP fit + intent → prioritized lead list
3. **CRM data pipelines** — Warehouse → dbt → Hightouch → Salesforce (keep CRM fresh)
4. **Account research automation** — [[Clay]] workflows that auto-research target accounts
5. **Lead routing logic** — Score-based routing to the right rep/sequence
6. **Reporting dashboards** — Pipeline, conversion, attribution metrics

### The Ops-as-Code Philosophy
- GTM workflows defined in code/config (not CRM admin panels)
- Version controlled (Git)
- Testable and reproducible
- Can be iterated rapidly

## Market Growth

- LinkedIn: **1,400+ GTM engineering postings** in mid-2025, growing to **3,000+ by January 2026**
- Hiring doubled year-over-year for two consecutive years
- Salary range: low to high six figures

## Case Studies

### Gorgias
- GTM engineers developed NLP scripts to analyze sales calls
- Auto-extracted insights on why Zendesk users migrated
- Fed insights into GTM systems, used Cargo for dynamic email personalization
- Result: **70% increase in conversion rates**

### Datadome
- For each closed deal: automatically generated lookalike accounts
- Enriched stakeholder data, pushed into sequences
- AI-drafted opening emails referenced original deal context
- Result: End-to-end pipeline automation

## The GTM Engineer at a Startup

A typical GTM Engineer at an early-stage startup might be:
- 1 person responsible for the entire GTM technical stack
- Builds and maintains 5-15 [[Clay]] tables for different plays
- Manages [[Instantly]] deliverability and warmup
- Configures [[Common Room]] signal alerts
- Maintains CRM data quality through automated pipelines
- Reports on pipeline metrics using warehouse + BI tools

## Related

- [[Clay]] — Primary tool
- [[Composable GTM Stack]] — What GTM Engineers build
- [[Case Study - Ramp]] — Ramp's growth engineers are the template
- [[Case Study - Clay]] — Clay helped define this role
- [[GTM Operating System]] — What GTM Engineers maintain
- [[Signal-Based Selling]] — GTM Engineers build signal infrastructure
