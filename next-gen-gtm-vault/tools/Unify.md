---
tags: [tool, signals, outbound, warm-outbound]
aliases: [Unify, UnifyGTM]
---

# Unify

**Category:** Signal-based outbound
**Position:** Surfaces real-time buying signals and automates outbound "plays" in response
**Website:** unifygtm.com

## What It Does

Unify detects **25+ types of real-time buying signals** and lets teams build automated "plays" — signal → action sequences that trigger personalized outbound at the exact right moment.

## Core Concept: "Plays"

A Play is: **When [signal] happens for [ICP match], do [action].**

Examples:
- When a target account visits our pricing page 3+ times → enrich contacts → send personalized email
- When a VP of Engineering at an ICP company changes jobs → congratulate + pitch
- When a competitor's customer posts frustration on Twitter → trigger outbound sequence

## Signal Types (25+)

### Fit Signals
- Company size, industry, tech stack, funding stage
- ICP matching criteria

### Intent Signals
- Website visits (de-anonymized)
- G2 category research
- Job postings indicating need (e.g., "hiring data engineer" = need for data tools)
- Technology adoption/changes
- Competitor evaluation

### Engagement Signals
- Email opens/clicks
- Content downloads
- Webinar attendance
- Demo requests
- Product usage (via integration)

## The "Warm Outbound" Motion

Unify is built for **warm outbound** — the modern approach where every touchpoint is backed by evidence of intent:

```
Traditional Outbound:  Spray 1000 emails → hope for 1% response
Warm Outbound:         Detect 50 high-intent signals → send 50 relevant emails → 15-25% response
```

See: [[Signal-Based Selling]]

## In the Stack

Unify typically works alongside:

```
Signal Detection (Unify) → Enrichment (Clay) → Outbound (Instantly / Apollo)
                                ↓
                        CRM Update (Salesforce / Attio)
```

## Competitor Landscape

| Tool | Focus | Difference |
|------|-------|-----------|
| **Unify** | Signal → play automation | Broadest signal detection |
| **[[Common Room]]** | Community + social signals | Deeper community analytics |
| **Warmly** | Website visitor → outreach | Narrower (website only) but deeper |
| **6sense/Demandbase** | Enterprise ABM + intent | Heavier, more expensive, enterprise |

## Related

- [[Signal-Based Selling]] — The motion Unify enables
- [[Common Room]] — Complementary signal source
- [[Clay]] — Common enrichment pairing
- [[Instantly]] — Common outbound pairing
- [[GTM Engineer]] — Primary builder of Unify plays
