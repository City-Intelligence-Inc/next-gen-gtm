---
tags: [signals, selling, intent, plays, deep-dive]
aliases: [Signal-Based Selling Deep Dive, Intent Signals, Buying Signals]
---

# Signal-Based Selling Mechanics — Deep Dive

Signal-based selling replaces the "spray and pray" outbound model with a responsive system that detects buyer intent and triggers contextual actions. The core principle: reach the right person at the right time with the right message, based on what they're actually doing.

## Why Signals Matter Now

**The B2B buying reality (2025-2026):**
- Buyers are **70-80% through their decision process** before contacting a vendor
- Buying committees now average **10.1 people**
- **94% of buying groups** have their preferred vendor list locked in before first vendor contact
- If you're waiting for inbound leads or trade show badge scans, you're already behind
- Intent signals let you engage accounts while they're **still forming opinions**

## The Signal Taxonomy

### Tier 1: Highest-Intent Signals (Act Immediately)

| Signal | Why It Matters | Example |
|--------|---------------|---------|
| **Pricing page visits (3+)** | Active evaluation, comparing options | VP Engineering visited pricing page 4 times this week |
| **Competitor comparison research** | In active buying cycle | Searched "[your product] vs [competitor]" on G2 |
| **Demo/trial signup** | Self-identified interest | Started a free trial but didn't complete onboarding |
| **Review site activity** | Late-stage evaluation | Read 5 reviews on G2 in past 48 hours |
| **RFP/RFI activity** | Formal procurement process | Posted RFP matching your solution category |

### Tier 2: Strong Buying Signals (Act Within 24-48 Hours)

| Signal | Why It Matters | Example |
|--------|---------------|---------|
| **Leadership changes** | New executives bring new priorities and budgets | New CRO hired 6 weeks ago (first 90 days = strongest buying window) |
| **Funding events** | Capital to spend, infrastructure to build | Series B closed ($50M) — building out sales team |
| **Job postings in target function** | Strategic investment underway | Hiring "Data Infrastructure Lead" = building data stack |
| **Technology adoption/removal** | Change readiness, pain points | Removed competitor tool from tech stack (BuiltWith signal) |
| **Product usage spikes** | Power user emerging, expansion potential | Team went from 3 → 12 active users in 2 weeks |

### Tier 3: Awareness Signals (Monitor & Nurture)

| Signal | Why It Matters | Example |
|--------|---------------|---------|
| **Content engagement** | Interest forming | Downloaded whitepaper on "modern data stack" |
| **Community activity** | Exploring problem space | Asked question in dbt Slack about data activation |
| **Social engagement** | Brand awareness | Liked 3 LinkedIn posts about your product category |
| **Industry event attendance** | Category interest | Registered for SaaStr Annual, attending GTM track |
| **Technographic fit** | Right profile, no timing signal yet | Uses Snowflake + dbt but no reverse ETL tool |

## Signal-to-Action: The Mechanics

### Unify's "Plays" Concept

Unify GTM pioneered the concept of "plays" — pre-configured workflows that trigger automatically when specific signal combinations are detected.

**How plays work:**
1. **Define the signal** (or combination of signals)
2. **Define the action** (emails, calls, AI research tasks, etc.)
3. **Let it run** — the system monitors, detects, and executes

**A play is not a sequence.** A sequence is a static series of touches. A play is a **dynamic, signal-responsive workflow** that adapts based on prospect behavior.

### Example Plays

**Play 1: The Champion Tracker**
```
SIGNAL: Former customer changes jobs to new company
        (detected via LinkedIn data + CRM match)

ACTION:
1. Enrich new company (Clay)
2. Score against ICP
3. If ICP fit > 70:
   a. Research new company context (Claygent)
   b. Generate personalized email referencing shared history
   c. Enqueue in Instantly with priority sending
   d. Add to "champion track" in CRM
   e. Notify AE in Slack
```

**Play 2: The Intent Surge**
```
SIGNAL: Account shows 3+ intent signals in 7 days
        (pricing page visits + G2 comparison + job posting)

ACTION:
1. Waterfall enrich all decision-makers at account
2. Score and prioritize contacts (VPs > Directors > Managers)
3. Multi-thread: email top 3 contacts simultaneously
4. Each email personalized to their role + the specific intent signals
5. AE briefed with full account intelligence
6. If no response in 5 days: LinkedIn connection request
7. If accepted: personalized LinkedIn message
```

**Play 3: The Product-Led Expansion**
```
SIGNAL: Free tier user hits usage threshold
        (via product analytics → Common Room → webhook)

ACTION:
1. Identify the person behind the usage (Common Room de-anonymization)
2. Enrich their account (Clay)
3. If enterprise company (500+ employees):
   a. Research their team structure
   b. Find the budget holder
   c. Create expansion opportunity in CRM
   d. Trigger sales-assist email from CSM
4. If SMB:
   a. Trigger in-app upgrade prompt
   b. Send upgrade email with usage stats
```

**Play 4: The Competitive Displacement**
```
SIGNAL: Competitor customer removes competitor tech
        (BuiltWith / technographic monitoring)

ACTION:
1. Research why they might be leaving (news, reviews, layoffs)
2. Enrich decision-makers
3. Custom messaging: "Noticed you're evaluating alternatives to [competitor]..."
4. Include migration guide / comparison content
5. Fast-track to demo if they engage
```

### Dynamic Sequencing (Unify's Innovation)

Unify's platform goes beyond standard sequences with **dynamic sequencing** — the path changes based on prospect behavior:

```
Email 1 sent
  ├── Opened but no reply → Email 2 (different angle)
  ├── No open → Email 2 (new subject line test)
  └── Replied → Route to AE

LinkedIn connection request sent
  ├── Accepted → LinkedIn message (personalized)
  ├── Not accepted → Continue email-only path
  └── Accepted + viewed profile → Priority escalation

Website visit detected during sequence
  ├── Pricing page → Accelerate sequence, add phone call
  ├── Blog/docs → Continue nurture
  └── Competitor comparison → Trigger competitive play
```

## Implementing Signal Detection — The Technical Stack

### Signal Sources & Integration

```
FIRST-PARTY SIGNALS
├── Website: Google Analytics / Segment → identify + track
├── Product: Amplitude / Mixpanel → usage events
├── Email: Outreach / Instantly → engagement metrics
├── CRM: Attio / HubSpot → pipeline changes
└── Support: Intercom / Zendesk → ticket patterns

THIRD-PARTY SIGNALS
├── Intent: Bombora / G2 → topic-level intent
├── Technographic: BuiltWith / Wappalyzer → tech stack changes
├── Firmographic: Crunchbase / PitchBook → funding, headcount
├── Social: LinkedIn Sales Nav → job changes, engagement
└── Review: G2 / Capterra → comparison activity

SIGNAL AGGREGATION
├── Common Room → 50+ native integrations, RoomieAI
├── Unify → intent signals + plays orchestration
└── Custom → n8n/Make webhooks + warehouse queries
```

### Signal Scoring Model

Not all signals are equal. A practical scoring model:

| Signal Category | Weight | Decay |
|----------------|--------|-------|
| Pricing page visit (3+) | 40 points | -10/week |
| G2 comparison activity | 35 points | -8/week |
| Leadership change | 30 points | -5/month |
| Funding event | 25 points | -3/month |
| Job posting (target function) | 25 points | -5/month |
| Product trial started | 30 points | -15/week |
| Content download | 10 points | -5/week |
| Social engagement | 5 points | -3/week |
| Community question | 15 points | -5/week |
| Tech stack change | 20 points | -3/month |

**Thresholds:**
- **Score > 70:** Hot — immediate outbound play triggered
- **Score 40-70:** Warm — add to active nurture + monitoring
- **Score < 40:** Cool — passive monitoring, awareness campaigns

**Decay matters:** A pricing page visit from 3 weeks ago is stale. Signals should decay over time to reflect recency.

## Unify GTM — Platform Deep Dive

**What Unify is:** A comprehensive GTM platform integrating intent data, AI-driven prospecting, and automated engagement workflows.

**Funding:** $40M Series B (July 2025) to transform GTM with AI.

**Core capabilities:**
- Person and company-level signal capture
- Website intent, champion tracking, new hires, product usage in one view
- AI Agents that monitor your TAM for custom signals
- Automatic account qualification
- Personalized outreach at scale
- Dynamic sequencing based on prospect responses

**Unify for Sales Reps:**
- Agents surface high-intent leads
- Deep research teed up automatically
- Every action logged in background
- All tasks for turning prospects into pipeline live in one place
- Reps focus on the 20-40% that requires human judgment

**Pricing:** Usage-based, estimated $1,000-$3,000/mo for mid-market teams.

## The Signal → Revenue Measurement Framework

### Key Metrics

| Metric | What It Measures | Target |
|--------|-----------------|--------|
| Signal-to-meeting rate | % of detected signals that convert to meetings | 5-15% |
| Signal-to-opportunity rate | % that become pipeline | 2-8% |
| Signal response time | Time from signal detection to first outreach | < 4 hours |
| Signal accuracy | % of signals that represent real buying intent | > 60% |
| Revenue per signal | Average revenue generated per high-intent signal | Track trending up |
| Cost per signal-generated meeting | Fully loaded cost per meeting from signal plays | 40-60% less than cold outbound |

### The Metric Shift

> The shift from "meetings booked" to "revenue generated per outbound dollar" will kill most current AI SDR vendors' value propositions.

Signal-based selling is measured by revenue efficiency, not volume. A team sending 100 signal-triggered emails that close 5 deals beats a team sending 10,000 cold emails that close 3.

## Sources

- [Unify: Building a Signal-Driven Sales Playbook for 2025](https://www.unifygtm.com/explore/building-a-signal-driven-sales-playbook-for-2025)
- [Cognism: Signal-Based Selling 2026](https://www.cognism.com/blog/signal-based-selling)
- [Unify: Signals & Data Platform](https://www.unifygtm.com/signals)
- [Unify: Introducing Unify for Sales Reps](https://www.unifygtm.com/blog/introducing-unify-for-sales-reps)
- [Factors.ai: GTM Engineering Trends 2026](https://www.factors.ai/blog/gtm-engineering-trends)
- [BusinessWire: Unify Raises $40M Series B](https://www.businesswire.com/news/home/20250714813159/en/Unify-Raises-$40-Million-Series-B-to-Transform-Go-To-Market-with-AI)
- [Common Room: Signals Product Page](https://www.commonroom.io/product/signals/)
- [Common Room: Product-Led Sales](https://www.commonroom.io/product/product-led-sales/)
- [Octave HQ: Signal to Sale Framework](https://www.octavehq.com/post/from-signal-to-sale-a-framework-for-an-intent-driven-gtm-strategy)
- [SignalFire: AI Reshaping B2B GTM](https://www.signalfire.com/blog/ai-reshaping-b2b-gtm)
- [UserGems: Intent Signals for B2B Sales](https://www.usergems.com/blog/intent-signals)
- [Demandbase: Types of Intent Signals](https://www.demandbase.com/faq/intent-signals/)
- [Storylane: 8 B2B Intent Signals](https://www.storylane.io/blog/b2b-intent-signals)

## Related

- [[Composable GTM Stack Deep Dive]] — Where signals fit in the architecture
- [[GTM Engineering Deep Dive]] — Who implements signal-based systems
- [[Agent-Led Growth Deep Dive]] — How agents use signals for autonomous buying
- [[Warehouse-Native GTM Deep Dive]] — Where signal data is stored and modeled
