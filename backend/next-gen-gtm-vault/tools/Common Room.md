---
tags: [tool, signals, community, intelligence]
aliases: [Common Room]
---

# Common Room

**Category:** Signal intelligence / community intelligence
**Position:** Unifies buyer signals across 50+ digital touchpoints — the "signal layer" of GTM
**Website:** commonroom.io

## What It Does

Common Room aggregates and unifies **buyer signals from across the internet** — community channels, social media, product usage, website visits, and third-party intent data — into a single intelligence layer.

## Core Capabilities

### Signal Aggregation (50+ Sources)
- **Community:** Slack, Discord, forums, Stack Overflow
- **Social:** Twitter/X, LinkedIn, Reddit
- **Code:** GitHub (stars, issues, PRs, discussions)
- **Content:** Blog comments, YouTube, Dev.to
- **Product:** In-app events, feature usage
- **Intent:** G2, Bombora, website visitor de-anonymization
- **CRM:** Salesforce, HubSpot sync

### Person360 Identity Resolution
- Resolves the same person across multiple channels
- "GitHub user @johndoe = Slack member John D. = LinkedIn John Doe at Acme Corp"
- Builds a unified contact graph

### Signal Scoring & Routing
- Surfaces high-intent accounts and contacts
- Custom scoring models based on signal combinations
- Alerts when target accounts show buying signals
- Routes to reps or sequences based on score

### Community Analytics
- Measures community health, engagement, and growth
- Identifies champions and power users
- Tracks community → pipeline influence

## Why Common Room Matters

Common Room sits at the intersection of three major trends:

1. **[[Community-Led Growth]]** — Operationalizes community signals for revenue
2. **[[Signal-Based Selling]]** — Provides the signal layer for warm outbound
3. **[[Agent-Led Growth]]** — Tracks how AI agents and developers discover/adopt products

## In the Stack

```
Community / Social / Product Signals
            ↓
       Common Room (aggregate, resolve, score)
            ↓
    ┌───────┼───────┐
    ↓       ↓       ↓
  Clay    CRM     Slack
(enrich) (sync)  (alerts)
    ↓
 Outbound
```

## Who Uses It

- **DevRel/Community teams** — Primary users. Measure community health and identify champions.
- **GTM Engineers** — Use Common Room signals as triggers for [[Clay]] workflows
- **Sales teams** — Receive alerts when target accounts show community/social signals
- **Marketing** — Content attribution, influencer identification

## The "Democratizing GTM Engineering" Thesis

Common Room's product vision is to make the power of a [[GTM Engineer]] accessible to every team through:
- No-code signal configuration
- Pre-built playbooks (e.g., "when a target account stars our repo + visits pricing page → alert AE")
- Built-in enrichment and outbound

## Related

- [[Signal-Based Selling]] — Common Room provides the signals
- [[Community-Led Growth]] — Common Room operationalizes CLG
- [[Clay]] — Common pairing for enrichment after signal detection
- [[Unify]] — Competitor/complement for signal-based outbound
- [[Identity Resolution]] — Core technical capability
