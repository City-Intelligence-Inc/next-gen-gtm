---
tags: [architecture, composable, stack, deep-dive]
aliases: [Composable GTM Stack Deep Dive, Modern GTM Stack]
---

# The Composable GTM Stack in Practice

A composable GTM stack is like building with LEGOs — you choose the best tool for each specific function and connect them together. This is the opposite of the "all-in-one" approach (Salesforce, HubSpot, Apollo) and represents the dominant architecture for high-performing GTM teams in 2025-2026.

## The Reference Architecture

```
                    ┌─────────────────────────┐
                    │   DATA WAREHOUSE         │
                    │  (Snowflake / BigQuery)   │
                    │   Single source of truth  │
                    └─────────┬───────────────┘
                              │
                    ┌─────────┴───────────────┐
                    │   TRANSFORMATION          │
                    │  (dbt)                    │
                    │   Lead scoring, segments  │
                    └─────────┬───────────────┘
                              │
               ┌──────────────┼──────────────────┐
               │              │                   │
     ┌─────────▼──────┐ ┌────▼─────────┐ ┌──────▼──────────┐
     │ REVERSE ETL     │ │ ENRICHMENT   │ │ SIGNAL LAYER    │
     │ (Hightouch/     │ │ (Clay)       │ │ (Common Room /  │
     │  Census)        │ │              │ │  Unify)         │
     └────────┬────────┘ └──────┬───────┘ └────────┬────────┘
              │                 │                    │
              │    ┌────────────┼────────────────────┘
              │    │            │
     ┌────────▼────▼──┐ ┌──────▼──────────┐
     │ CRM             │ │ OUTBOUND         │
     │ (Attio /        │ │ (Instantly /     │
     │  HubSpot)       │ │  Smartlead)      │
     └────────┬────────┘ └──────┬──────────┘
              │                 │
              └────────┬────────┘
                       │
              ┌────────▼────────┐
              │ ANALYTICS        │
              │ (Warehouse BI /  │
              │  Metabase)       │
              └─────────────────┘
```

## The Core Tools — Detailed Breakdown

### 1. Clay (Enrichment + Orchestration Layer)

**Role:** The middleware that connects signal sources to activation tools.

**What it replaces:** 4+ separate tools (data enrichment, research, personalization, routing)

**Key capabilities:**
- Waterfall enrichment across 150+ data providers
- AI research agent (Claygent) for custom prospect research
- ICP scoring with formula columns
- Conditional routing based on scores and signals
- Native integrations with every tool in the stack

**Data flow:**
```
Signal (Common Room) → Clay webhook trigger →
  Enrich (company data, contacts, tech stack) →
  Score (ICP fit, intent signals) →
  Personalize (AI-generated messaging) →
  Route (to Instantly if score > 80, to nurture if 50-80)
```

**Pricing (2026):**
- Free: 100 monthly search credits
- Launch: $185/mo
- Growth: $495/mo
- Note: Clay doesn't send emails — you need Instantly/Smartlead ($80-$150/mo additional)

### 2. Instantly (Cold Email Infrastructure)

**Role:** High-volume cold email sending with deliverability optimization.

**Why Instantly (not Apollo/Outreach for cold email):**
- Built specifically for cold email at scale
- Domain rotation and warmup automation
- Deliverability monitoring and optimization
- Inbox rotation across multiple sending accounts
- Much cheaper than Outreach/Salesloft for pure cold outbound

**Data flow:**
```
Clay (enriched + scored leads) → Instantly API →
  Email sequence execution →
  Reply detection →
  Webhook back to Clay/CRM
```

**Pairing with Clay:**
Clay handles all the intelligence (who to email, what to say), Instantly handles the infrastructure (actually sending at scale with high deliverability).

### 3. Attio (Modern CRM)

**Role:** System of record for customer relationships. The "new wave" CRM replacing Salesforce for startups and growth-stage companies.

**Why Attio:**
- AI-native architecture (not AI bolted onto legacy software)
- Flexible data model — custom objects, fields, relationships
- Native Hightouch integration for warehouse-synced data
- API-first design for integration with composable stack
- Usage by AI-native companies (Lovable, Granola, Modal, Replicate)

**Funding:** $52M Series B (August 2025), led by GV (Google Ventures). $116M total raised. On track to 4x ARR in 2025. 5,000+ companies using it.

**Data flow:**
```
Hightouch (warehouse data) → Attio (enriched records) →
  Pipeline management →
  Activity tracking →
  Deal stages →
  Win/loss analysis
```

**Pricing:**
- Free tier available
- Plus: $29/user/mo
- Pro: $59/user/mo
- Enterprise: Custom

### 4. Common Room (Signal Layer)

**Role:** Aggregate buying signals from 50+ sources into a unified view for targeting and prioritization.

**Signal sources:**
- **Product signals:** Usage data, feature adoption, activation milestones
- **Community signals:** Discord, Slack, GitHub, Stack Overflow activity
- **Social signals:** LinkedIn engagement, Twitter mentions
- **Web signals:** Website visits, pricing page views, documentation reads
- **Third-party signals:** G2 reviews, job postings, funding events
- **Content signals:** Blog reads, webinar attendance, whitepaper downloads

**Key feature — RoomieAI:**
An agent that autonomously finds relevant information about accounts and turns them into customized signals unique to every company.

**Signal trend tracking:**
Track how buyer signals change over time — detect surges, prioritize prospects, take action at the right moment.

**Data flow:**
```
50+ signal sources → Common Room aggregation →
  Person + account identification →
  Signal scoring + trend detection →
  Webhook to Clay (enrichment) →
  Route to outbound or CRM
```

### 5. Hightouch (Reverse ETL / Data Activation)

**Role:** Push modeled data from your warehouse back into operational tools. The bridge between your data infrastructure and your GTM tools.

**What it does:**
- Connects to 25+ data sources (Snowflake, BigQuery, Redshift)
- Pushes data to 60+ destinations (CRM, email, ads, product)
- Native dbt integration — use existing dbt models as sync sources
- SQL or visual audience builder for segmentation
- Automatic syncing on schedules or triggers

**Data flow:**
```
Snowflake (warehouse) → dbt (transform) →
  Hightouch (activate) →
    → Attio (CRM records)
    → Instantly (outbound lists)
    → Facebook/Google Ads (audiences)
    → Intercom (product messaging)
    → Slack (team alerts)
```

## How They Connect — The Full Data Flow

### Signal → Enrichment → Action Pipeline

```
1. SIGNAL DETECTION
   Common Room detects: "VP of Engineering at Acme Corp
   visited our pricing page 3 times this week and their
   company just posted a job for 'Data Infrastructure Lead'"

2. WEBHOOK TO CLAY
   Common Room sends webhook with account + contact data

3. ENRICHMENT IN CLAY
   Clay waterfall enrichment:
   ├── ZoomInfo: company size (250 employees), revenue ($40M)
   ├── Clearbit: tech stack (uses Postgres, AWS, Datadog)
   ├── LinkedIn: VP has been in role 4 months (new hire signal)
   └── BuiltWith: recently added Snowflake to their stack

4. SCORING IN CLAY
   ICP Score: 87/100
   ├── Company size: +20 (sweet spot)
   ├── Funding stage: +15 (Series B)
   ├── Tech stack overlap: +25 (uses our integrations)
   ├── Job title: +20 (decision maker)
   └── New hire signal: +7 (open to change)

5. AI RESEARCH IN CLAY
   Claygent researches Acme Corp:
   "Acme recently migrated from RDS to Snowflake (LinkedIn post
   from their CTO). They're scaling their data team (3 open
   data eng roles). CTO spoke at DataDay about 'building a
   modern data stack'."

6. PERSONALIZATION IN CLAY
   AI generates opening: "Saw your team's migration to Snowflake —
   congrats. We help companies like [similar customer] get
   their warehouse data into the tools their GTM team uses daily..."

7. ROUTING
   Score > 80 → Push to Instantly for outbound sequence
   Also → Update Attio CRM with enriched record
   Also → Notify SDR in Slack with full context

8. EXECUTION IN INSTANTLY
   5-step email sequence with personalized first touch
   Reply detection → webhook back to Attio
   Meeting booked → create opportunity in Attio

9. WAREHOUSE SYNC
   All activity data flows back to Snowflake via Fivetran
   dbt models update lead scores, attribution, funnel metrics
   Hightouch syncs updated scores back to Attio and Common Room
```

### Warehouse-Backed Scoring Pipeline

```
INGEST (Fivetran)           TRANSFORM (dbt)           ACTIVATE (Hightouch)
┌──────────────┐           ┌──────────────┐           ┌──────────────┐
│ Attio CRM    │──────────▶│ stg_contacts │──────────▶│ → Attio      │
│ Instantly     │           │ stg_deals    │           │ → Clay       │
│ Common Room  │           │ stg_signals  │           │ → Instantly  │
│ Product DB   │           │              │           │ → Slack      │
│ Stripe       │           │ int_lead_    │           │ → Google Ads │
│ Website      │           │   scoring    │           └──────────────┘
└──────────────┘           │              │
                           │ mart_        │
                           │   qualified_ │
                           │   accounts   │
                           └──────────────┘
```

## Composable vs. Unified: The Honest Trade-offs

| Dimension | Composable Stack | Unified (Apollo/HubSpot) |
|-----------|-----------------|--------------------------|
| **Setup time** | Weeks to months | Days |
| **Maintenance** | Ongoing (integration health, version updates) | Minimal |
| **Performance** | Best-of-breed at each layer | Good enough at everything |
| **Cost** | $1,500-$5,000+/mo total | $500-$2,000/mo |
| **Flexibility** | Swap any component | Locked to vendor |
| **Data quality** | You control the pipeline | Vendor controls the data |
| **Technical requirement** | Need a GTM engineer | Sales reps can self-serve |
| **Scaling** | Scales with engineering investment | Scales with seat count |
| **Best for** | Teams with GTM engineering talent | Teams without technical ops |

## The 2026 GTM Stack Playbook (Recommended)

For a startup/growth-stage company with 10-50 employees:

**Essential (start here):**
1. **Attio** — CRM ($29-$59/user/mo)
2. **Clay** — Enrichment + orchestration ($185-$495/mo)
3. **Instantly** — Cold email ($80-$150/mo)

**Add when you have signal volume:**
4. **Common Room** — Signal aggregation (usage-based)
5. **Unify** — Signal-based plays (usage-based)

**Add when you have data infrastructure:**
6. **Snowflake/BigQuery** — Warehouse
7. **dbt** — Transformation
8. **Hightouch** — Reverse ETL ($350-$800/mo)

**Total cost (essential):** ~$500-$1,000/mo
**Total cost (full stack):** ~$3,000-$8,000/mo

## Sources

- [Heyreach: Best GTM Tools in 2026](https://www.heyreach.io/blog/best-gtm-tools)
- [Attio + Hightouch Integration](https://attio.com/blog/attio-hightouch-all-your-user-and-product-data-inside-your-crm)
- [Hightouch: Sync Data to Attio](https://hightouch.com/integrations/destinations/attio)
- [Common Room: Hightouch Integration Guide](https://www.commonroom.io/docs/signals/product-usage-integrations/hightouch/)
- [Full Funnel: Modern GTM Stack Beyond All-in-One](https://www.fullfunnel.co/blog/modern-gtm-stack-beyond-all-in-one-myth)
- [GTM Engineer Club: Best 7 GTM Tools 2026](https://www.gtmengineerclub.com/tools/best-gtm-tools/)
- [Tweener Times: 2026 GTM Tech Stack Playbook](https://www.tweenertimes.com/p/the-2026-gtm-tech-stack-playbook)
- [Clay Integrations](https://www.clay.com/integrations)

## Related

- [[Clay]] — Detailed Clay tool note
- [[GTM Engineering Deep Dive]] — The role that builds and maintains this stack
- [[Signal-Based Selling Deep Dive]] — The signal layer in detail
- [[Warehouse-Native GTM Deep Dive]] — The data infrastructure layer
- [[Apollo Vibe GTM Deep Dive]] — The unified alternative
- [[Death of Traditional CRM Deep Dive]] — Why Attio over Salesforce
