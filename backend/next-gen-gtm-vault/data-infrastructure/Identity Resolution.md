---
tags: [data-infrastructure, identity, unification]
aliases: [Identity Resolution]
---

# Identity Resolution

The process of **connecting all touchpoints for a single person or account** into a unified profile — across CRM, product, community, social, support, and billing systems.

## The Problem

The same person exists as different records across systems:
- **CRM:** "John Smith" at john@acme.com
- **Product:** User ID 12345
- **GitHub:** @jsmith
- **Slack Community:** John S.
- **LinkedIn:** John Smith, VP Engineering at Acme
- **Support:** Ticket submitter john@acme.com

Without identity resolution, each system sees a fragment. No one has the full picture.

## How It Works

### Deterministic Matching
- Match on **exact identifiers**: email address, phone number, user ID
- Highest confidence, but limited coverage
- Example: CRM email = product signup email → same person

### Probabilistic Matching
- Match on **fuzzy signals**: name similarity, company domain, IP address, device fingerprint
- Lower confidence, broader coverage
- Example: "J. Smith" at Acme IP + "John Smith" at acme.com → likely same person

### Graph-Based Resolution
- Build a **relationship graph** of identifiers
- If email A → device B → email C, then A and C are the same person
- Most sophisticated, handles complex cases

## Identity Resolution at Account Level

Beyond person resolution, you need **account resolution**:
- Multiple domains (acme.com, acme.co.uk, acme-inc.com)
- Subsidiaries and parent companies
- Merged/acquired companies
- Free email domains (gmail, yahoo) → company attribution

## Key Players

| Tool | Approach | Notes |
|------|----------|-------|
| **[[Hightouch]]** | Warehouse-native resolution | Built into Composable CDP |
| **Segment** | Event-based resolution | Profiles from event streams |
| **[[Common Room]]** | Cross-platform social resolution | Person360 across 50+ sources |
| **Clearbit** | Company-level resolution | Reveal (IP → company) |
| **RB2B** | Website visitor → person | De-anonymization |

## Why It Matters for GTM

Without identity resolution:
- Sales doesn't know a prospect is already a product user
- Marketing sends conflicting messages to the same person
- CS doesn't know the account is evaluating competitors
- Attribution is impossible (can't connect touchpoints)

With identity resolution:
- Unified customer view across all systems
- [[Signal-Based Selling]] works (signals connect to the right account)
- [[Product-Led Sales]] works (product usage connects to CRM contact)
- Attribution is possible (full journey visibility)

## Related

- [[Architecture - Core Layers]] — Identity & Unification Layer
- [[Warehouse-Native GTM]] — Where identity resolution lives
- [[Hightouch]] — Primary tool for warehouse-native resolution
- [[Common Room]] — Cross-platform identity resolution
- [[Signal-Based Selling]] — Requires identity resolution to work
