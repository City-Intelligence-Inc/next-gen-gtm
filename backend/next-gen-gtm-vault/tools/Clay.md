---
tags: [tool, enrichment, middleware, data-orchestration]
aliases: [Clay, Clay.com]
---

# Clay

**Category:** Data orchestration / GTM middleware
**Position:** The "middleware of modern GTM" — sits between data sources and activation tools
**Website:** clay.com

## What It Does

Clay is a **waterfall enrichment and workflow automation platform** that chains together 50+ data providers to build rich prospect profiles, then routes that data into outbound and CRM tools.

Think of it as a **spreadsheet that can call APIs** — each row is a prospect, each column is an enrichment step, and the whole thing executes automatically.

## Core Capabilities

### Waterfall Enrichment
- Chains multiple data providers (ZoomInfo, Clearbit, Apollo, LinkedIn, BuiltWith, etc.)
- If Provider A doesn't have the email, try Provider B, then C — maximizing coverage
- ~95% email coverage vs. ~60-70% from any single provider
- Deduplication and validation built in

### AI Research Agent
- Uses AI to research prospects from their website, LinkedIn, news articles
- Generates personalized icebreakers, pain point hypotheses, custom messaging
- Can answer custom research questions per prospect ("What CRM do they use?")

### Workflow Builder
- Visual workflow for data transformation and routing
- Conditional logic (if/then), filtering, formatting
- Triggers: webhook, scheduled, manual, CRM event
- Outputs to: CRM, [[Instantly]], [[Apollo]], Slack, Google Sheets, any API

## Why Clay Matters

Clay is the **connective tissue** of the [[Composable GTM Stack]]:

```
Signal Source → Clay (enrich + research + score) → Activation Tool
     ↑                                                    ↓
  Common Room                                     Instantly / Apollo
  LinkedIn                                        Salesforce / HubSpot
  G2 / Bombora                                    Slack alerts
```

Without Clay, [[GTM Engineer]]s would need to build custom integrations between every data source and every activation tool. Clay is the middleware that makes composability practical.

## Who Uses It

- **GTM Engineers** — Primary power users. Build and maintain Clay workflows.
- **RevOps** — Use Clay for data hygiene, enrichment, CRM updates
- **SDR teams** — Consume Clay's enriched data and personalized messaging
- **Growth teams** — Use Clay for lead scoring, ICP matching, segmentation

## Clay in the Stack

| Layer | Clay's Role |
|-------|------------|
| Data enrichment | Waterfall across 50+ providers |
| Research | AI-powered prospect research |
| Scoring | ICP matching, custom scoring logic |
| Personalization | AI-generated messaging per prospect |
| Routing | Push enriched data to CRM, outbound tools |

## Case Study: GTM Engineer Workflow

Typical Clay workflow for a [[GTM Engineer]]:

1. **Trigger:** New company appears on G2 comparison page (via [[Common Room]] webhook)
2. **Enrich:** Clay waterfalls enrichment — company data, headcount, tech stack, funding
3. **Research:** AI agent researches the company's website, recent news, job postings
4. **Score:** ICP matching — company size, industry, tech stack alignment
5. **Find contacts:** Waterfall email finding for decision-makers
6. **Personalize:** AI generates custom opening line referencing their G2 research
7. **Route:** Push to [[Instantly]] for outbound sequence if score > threshold; push to Slack for manual review if borderline

## Limitations

- Learning curve — powerful but complex
- Cost scales with usage (API credits, rows processed)
- Not a CRM or outbound tool itself — requires other tools in the stack
- AI research quality varies — needs human review for high-stakes accounts

## Related

- [[Composable GTM Stack]] — Clay is the middleware layer
- [[GTM Engineer]] — Primary user persona
- [[Data Enrichment Waterfall]] — Core technical pattern
- [[Instantly]] — Common outbound pairing
- [[Common Room]] — Common signal source
- [[Apollo]] — Competitor/complement for enrichment
