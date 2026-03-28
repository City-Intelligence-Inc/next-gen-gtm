---
tags: [MOC, index, home]
aliases: [Home, Index, Map of Content]
---

# Next-Gen GTM Research Vault

> "Build the next generation of how we do go to market and tie all of our systems together internally." — @arichoudhary

This vault is a comprehensive knowledge base on modern Go-To-Market strategy, tooling, and architecture. Research conducted March 2026.

---

## Start Here

- [[GTM Overview]] — What is GTM, the four fits, and why it matters
- [[Next-Gen GTM Thesis]] — The core thesis: what's changing and why
- [[Current GTM Landscape]] — State of the art (and what's broken)
- [[GTM Pain Points]] — The 6 core problems with current GTM

---

## The Vision: Self-Improving GTM

The core idea — a GTM engine that **learns, compounds, and gets stronger from failure**:

| Note | Concept |
|------|---------|
| [[The Self-Improving GTM Engine]] | **The master vision** — 8-part framework for a self-improving GTM system |
| [[Flywheel Effect]] | Compounding advantage through data network effects |
| [[Antifragile GTM]] | Systems that get stronger from stress and failure |
| [[OODA Loop for GTM]] | Observe → Orient → Decide → Act → Learn (at 3 speeds) |
| [[Double-Loop Learning]] | Questioning strategy, not just optimizing tactics |

---

## GTM Motions

How companies bring products to market:

| Motion | Core Mechanic | Key Stat |
|--------|-------------|----------|
| [[Sales-Led Growth]] | Dedicated sales team | ACV >$25K |
| [[Product-Led Growth]] | Product drives adoption | 2-5% free→paid conversion |
| [[Community-Led Growth]] | Users drive awareness | 95% organic traffic (Figma) |
| [[Product-Led Sales]] | PLG + sales for expansion | 76% of Asana pipeline from PQLs |
| [[Agent-Led Growth]] | AI agents as buyers + sellers | 77% buy from AI-recommended favorite |

---

## Frameworks & Mental Models

| Framework | What It Does |
|-----------|-------------|
| [[MEDDIC-MEDDPICC]] | Enterprise deal qualification |
| [[Bow-Tie Funnel]] | Full lifecycle: pre-sale + post-sale |
| [[GTM Fit]] | Can you sell repeatably? (PMF's cousin) |
| [[GTM Metrics That Matter]] | What to measure (and what NOT to) |
| [[JTBD for GTM]] | Organize GTM around jobs, not tool categories |
| [[Product-Market Fit]] | The prerequisite for GTM Fit |

---

## Tools & Platforms

### The Composable Stack
| Tool | Category | Role |
|------|----------|------|
| [[Clay]] | Data orchestration | Middleware — enrichment, research, workflows |
| [[Instantly]] | Cold email | Outbound execution layer |
| [[Attio]] | Modern CRM | Flexible system of record |
| [[Common Room]] | Signal intelligence | 50+ signal sources unified |
| [[Unify]] | Signal-based outbound | Signal → play automation |
| [[Pocus]] | Product-led sales | PQL scoring and routing |
| [[Hightouch]] | Composable CDP | Reverse ETL / data activation |
| [[Apollo]] | All-in-one GTM | Database + outbound + CRM + AI agents |
| [[Rilo]] | AI workflow automation | Natural language → GTM workflows |

### AI Agents
| Tool | What It Does |
|------|-------------|
| [[AI SDR Agents]] | Autonomous outbound (11x, Artisan, Apollo Vibe GTM) |
| [[AI Agents in GTM]] | Full landscape: SDR, inbound, research, scoring, deal intelligence |

### Reference
| Note | What It Covers |
|------|---------------|
| [[Traditional GTM Tech Stack]] | The 10-layer stack being replaced |
| [[Composable GTM Stack]] | Best-of-breed via APIs |

---

## Case Studies

| Company | Motion | Key Lesson |
|---------|--------|-----------|
| [[Case Study - Ramp]] | Engineering-driven outbound | Data stack IS the GTM stack ($32B) |
| [[Case Study - Figma]] | Community → PLG → PLS | Community first, sales later ($10B) |
| [[Case Study - Datadog]] | Multi-product land-expand | 75% growth from expansion (120% NRR) |
| [[Case Study - Notion]] | Template-driven viral PLG | $10B without advertising |
| [[Case Study - Clay]] | Category creation | Built the middleware, defined the role |

---

## Architecture & Data Infrastructure

### System Design
| Note | What It Covers |
|------|---------------|
| [[Architecture - Core Layers]] | 6-layer architecture for next-gen GTM platform |
| [[GTM Operating System]] | 8-pillar operational framework |

### Data Stack
| Note | What It Covers |
|------|---------------|
| [[Warehouse-Native GTM]] | Warehouse as source of truth (not CRM) |
| [[Reverse ETL]] | Warehouse → operational tools |
| [[Identity Resolution]] | Unified customer graph |
| [[Modern Data Stack for GTM]] | Full stack: collection → warehouse → activation |
| [[Composable CDP]] | CDP built on your warehouse |
| [[Event-Driven GTM Architecture]] | Real-time signal detection |
| [[Data Enrichment Waterfall]] | Multi-provider enrichment pattern |

---

## Roles

| Role | What They Do |
|------|-------------|
| [[GTM Engineer]] | Revenue systems architect — builds the composable GTM stack |

---

## Signals & Intelligence

| Note                     | What It Covers                            |
| ------------------------ | ----------------------------------------- |
| [[Signal-Based Selling]] | Evidence-backed, timing-aware engagement  |
| [[AI Agents in GTM]]     | Autonomous workers across the GTM process |
|                          |                                           |

---

## Deep Dives (Extended Research)

Detailed research notes with specific data, comparisons, and implementation details:

| Deep Dive                              | Key Finding                                                            |
| -------------------------------------- | ---------------------------------------------------------------------- |
| [[AI SDR Agents Deep Dive]]            | 11x: 70-80% churn; hybrid human+AI outperforms pure AI 2.3-2.6x        |
| [[Agent-Led Growth Deep Dive]]         | MCP + WebMCP enable agents as buyers; Supabase grew $765M→$5B          |
| [[GTM Engineering Deep Dive]]          | 1,000 job posting analysis; HubSpot 52%, Outreach 49%; $80K-$280K comp |
| [[Apollo Vibe GTM Deep Dive]]          | $150M ARR, 500% YoY; 4 agentic modules; natural language GTM           |
| [[Composable GTM Stack Deep Dive]]     | Full reference architecture; essential stack ~$500/mo                  |
| [[Signal-Based Selling Deep Dive]]     | Signal taxonomy; 94% have vendor list locked before first contact      |
| [[Warehouse-Native GTM Deep Dive]]     | dbt modeling patterns; Ramp predicts 75% of SQLs                       |
| [[Death of Traditional CRM Deep Dive]] | Salesforce down 37%; what's replacing it                               |
| [[Deep Dive Research Index]]           | Master index of all deep dive research                                 |

---

## Resources

- [[Sources and Reading List]] — All sources, organized by topic

### Raw Research Files (in project root)
- `RESEARCH.md` — Original comprehensive research report (~700 lines)
- `GTM-DEEP-RESEARCH.md` — Frameworks & case studies deep research (~1,244 lines)
- `DATA_INFRASTRUCTURE_RESEARCH.md` — Technical data infrastructure research (~1,858 lines)

---

## Vault Structure

```
vault/
├── Home.md                          ← You are here
├── concepts/                        ← Core ideas and thesis
├── motions/                         ← GTM motions (SLG, PLG, CLG, PLS, ALG)
├── frameworks/                      ← Mental models and measurement
├── tools/                           ← Tool and platform profiles
├── case-studies/                    ← Company deep dives
├── architecture/                    ← System design and GTM OS
├── data-infrastructure/             ← Data stack, CDP, ETL
├── roles/                           ← GTM roles
├── signals/                         ← Signals and AI agents
└── resources/                       ← Sources and reading lists
```

---

*Research as of March 2026. 55+ interconnected notes, 100+ wikilinks, 3 raw research documents (~3,800 lines total). Open in Obsidian for full graph view.*
