---
tags: [framework, JTBD, jobs-to-be-done, architecture]
aliases: [JTBD for GTM, Jobs-to-be-Done for GTM]
---

# Jobs-to-be-Done (JTBD) for GTM Tooling

JTBD shifts GTM from "what features do we build" to **"what job is the team trying to accomplish."** A next-gen GTM platform should be organized around these jobs, not around traditional tool categories.

## The 8 Core GTM Jobs

### 1. Find the Right Accounts to Target
- ICP definition and scoring
- List building and segmentation
- Signal detection for timing
- **Tools today:** [[Clay]], [[Apollo]], ZoomInfo, [[Unify]], [[Common Room]]

### 2. Understand What They Care About
- Account research and enrichment
- Intent data and pain identification
- Competitive positioning per account
- **Tools today:** [[Clay]] AI, Gong, Bombora, 6sense

### 3. Reach Them at the Right Time with the Right Message
- Outbound sequences (email, LinkedIn, phone)
- Inbound content and SEO
- Personalization at scale
- **Tools today:** [[Instantly]], [[Apollo]], Outreach, Salesloft, [[AI SDR Agents]]

### 4. Convert Interest into Pipeline
- Lead qualification and routing
- Demo scheduling
- Inbound lead management
- **Tools today:** Default, Qualified, Chilipiper, [[Pocus]]

### 5. Win the Deal
- Discovery, demo, POC management
- Proposal, negotiation, procurement
- Deal intelligence and coaching
- **Tools today:** Gong, Clari, PandaDoc, DealHub

### 6. Activate and Retain
- Customer onboarding
- Adoption tracking
- Health scoring and early warning
- **Tools today:** Gainsight, Totango, ChurnZero

### 7. Expand and Renew
- Upsell and cross-sell identification
- Renewal management
- Account planning
- **Tools today:** Gainsight, [[Pocus]], CRM

### 8. Learn and Improve
- Attribution modeling
- Funnel analytics
- Feedback loops from outcome to strategy
- **Tools today:** HockeyStack, Bizible, warehouse + BI

## The Architectural Insight

Each "job" maps to a **functional layer** in the GTM stack. The problem with today's tools is they're organized by **vendor category** (CRM, marketing automation, sales engagement), not by job.

A next-gen platform organized around JTBD would look like:

```
┌──────────────────────────────────────┐
│        Job: Learn & Improve          │  ← Feedback layer
├──────────────────────────────────────┤
│     Job: Expand & Renew              │  ← Post-sale growth
├──────────────────────────────────────┤
│     Job: Activate & Retain           │  ← Customer success
├──────────────────────────────────────┤
│     Job: Win the Deal                │  ← Sales execution
├──────────────────────────────────────┤
│     Job: Convert to Pipeline         │  ← Qualification + routing
├──────────────────────────────────────┤
│     Job: Reach at Right Time         │  ← Multi-channel activation
├──────────────────────────────────────┤
│     Job: Understand Them             │  ← Research + enrichment
├──────────────────────────────────────┤
│     Job: Find Right Accounts         │  ← Signal detection + ICP
├──────────────────────────────────────┤
│          Data Foundation             │  ← Warehouse + identity
└──────────────────────────────────────┘
```

## Related

- [[GTM Operating System]] — Built around these jobs
- [[Architecture - Core Layers]] — Maps JTBD to architecture
- [[Next-Gen GTM Thesis]] — Organizing principle
- [[Bow-Tie Funnel]] — Jobs map to funnel stages
