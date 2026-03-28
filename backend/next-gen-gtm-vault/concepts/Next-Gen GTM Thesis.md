---
tags: [concept, core, thesis, strategy]
---

# Next-Gen GTM Thesis

> "Build the next generation of how we do go to market and tie all of our systems together internally." — @arichoudhary

## The Core Insight

The current GTM stack is **fragmented, manual, and CRM-centric**. The next generation is **unified, autonomous, and data-warehouse-native**.

## What's Changing (and Why Now)

### 1. AI Makes Humans Optional for Repetitive GTM Work
- [[AI Agents in GTM]] can handle research, outbound, scoring, and personalization autonomously
- A fully loaded SDR costs $85-100K/year; an AI agent system costs $8-24K/year
- AI users report saving **12 hours/week** on average

### 2. The Data Warehouse Won the "Source of Truth" War
- [[Warehouse-Native GTM]] means Snowflake/BigQuery/Postgres is the center, not Salesforce
- [[Reverse ETL]] (Hightouch, Census) pushes modeled data back into operational tools
- Data teams control GTM data through SQL + dbt + Git

### 3. Signals Replace Spray-and-Pray
- [[Signal-Based Selling]] uses fit + intent + engagement data to time outreach perfectly
- 77% of buyers purchase from their AI-informed preliminary favorite
- The "warm outbound" motion replaces cold outbound

### 4. Composability Beats Monoliths
- [[Composable GTM Stack]] — best-of-breed components via APIs
- Salesforce stock down 37%, HubSpot down 60% vs. S&P 500 up 15%
- GTM Engineers assemble custom stacks with [[Clay]] + [[Instantly]] + [[Attio]] + [[Common Room]]

### 5. Agents Become Buyers
- [[Agent-Led Growth]] — AI agents research, evaluate, and select products on behalf of humans
- Products must be **Findable, Evaluable, Completeable** for agents
- Early winners: Supabase (1M → 4.5M devs in 12 months), Resend (0 → 400K users)

## The Opportunity: A GTM Operating System

The market needs a **unified orchestration layer** that:

1. **Ingests** all GTM data — product events, CRM, marketing, support, community, billing, intent
2. **Resolves identity** — single account/contact graph across all touchpoints
3. **Models signals** — lead scores, PQLs, health scores, intent in a transparent, configurable way
4. **Orchestrates actions** — when signal X fires, trigger action Y in system Z
5. **Activates everywhere** — email, LinkedIn, Slack, in-app, phone, chat
6. **Learns from outcomes** — feedback loops improve scoring and routing over time

See: [[GTM Operating System]], [[Architecture - Core Layers]]

## Competitive Positioning

```
                    BROAD PLATFORM
                         |
         Salesforce/     |      Apollo
         HubSpot         |      (all-in-one)
                         |
    MONOLITHIC --------- + --------- COMPOSABLE
                         |
         6sense/         |      Clay + Unify +
         Demandbase      |      Instantly + Attio
                         |
                    POINT SOLUTION
```

**The gap:** Composable + Broad Platform — an orchestration layer across the composable stack with the unification of a platform but without monolith rigidity.

## What to Build vs. Integrate

### Build (Core Differentiation)
- Unified data model + [[Identity Resolution]]
- Signal detection + routing engine
- Workflow/play orchestration engine
- AI agent framework (scoring, research, personalization, execution)
- Cross-functional dashboard + metrics layer

### Integrate (Best-of-Breed)
- CRM — [[Attio]], Salesforce, HubSpot
- Warehouse — Snowflake, BigQuery
- Email — [[Instantly]], Resend, SendGrid
- Enrichment — [[Clay]], Clearbit, [[Apollo]]
- Communication — Slack, LinkedIn
- Product analytics — Segment, Amplitude, PostHog
- Billing — Stripe, Chargebee

## Key Case Studies to Learn From

- [[Case Study - Ramp]] — Engineering-driven GTM, data stack as competitive advantage
- [[Case Study - Figma]] — Community-led → PLG → Enterprise PLS
- [[Case Study - Datadog]] — Multi-product land-and-expand
- [[Case Study - Notion]] — Template-driven viral PLG

## The Deeper Vision: Self-Improvement

This thesis describes *what's changing*. For the deeper vision of *what to build* — a self-improving system that compounds over time — see:

- [[The Self-Improving GTM Engine]] — The 8-part framework for a system that learns
- [[Flywheel Effect]] — Data network effects as competitive moat
- [[Antifragile GTM]] — Getting stronger from failure
- [[OODA Loop for GTM]] — Speed of learning as the competitive advantage
- [[Double-Loop Learning]] — Questioning strategy, not just tactics

## Related

- [[GTM Overview]]
- [[Current GTM Landscape]]
- [[GTM Pain Points]]
- [[Architecture - Core Layers]]
- [[GTM Operating System]]
- [[The Self-Improving GTM Engine]]
