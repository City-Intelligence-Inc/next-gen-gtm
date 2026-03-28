---
tags: [case-study, engineering-driven, outbound, data-stack]
aliases: [Case Study - Ramp, Ramp GTM]
---

# Case Study: Ramp — Engineering-Driven GTM Machine

**Revenue:** Grew 100x during early tenure
**Valuation:** $32B by November 2025
**GTM Motion:** Engineering-powered outbound + [[Product-Led Sales]]

## The Playbook

### Phase 1: Founder-Led Sales (Early Stage)
- 5 salespeople, 1 partnerships manager, **no marketing**
- Founder-led sales + network operationalization
- Mapped LinkedIn contacts across entire team and investor network
- Pure hustle and relationship-driven

### Phase 2: Cold Email as Core Channel
- Chose cold email for **fastest feedback loops** with large addressable market
- SDR team iterated on copywriting until patterns emerged
- Key insight: once a pattern works, **engineering should automate it**

### Phase 3: The "Iron Man Suit"
- Engineers **sat with the sales team** and watched them work
- Identified repetitive tasks and built tools to automate them
- Transformed from manual grind to engineering-powered GTM
- Philosophy: sales reps are the human judgment layer; engineering handles everything else

### Phase 4: The Modern Data Stack
**Stack: Snowflake + dbt + [[Hightouch]]**

```
Data Sources → Snowflake (warehouse) → dbt (modeling) → Hightouch (activation)
                                          ↓
                                    PQL scoring model
                                    ICP matching
                                    Intent signals
                                          ↓
                                    Salesforce / HubSpot
                                    Email sequences
                                    Slack alerts
```

- Predictive model identifies **75% of future SQLs** before a rep clicks send
- Data team builds models in SQL, versions in Git, tests with CI/CD
- Eliminates CRM as source of truth — warehouse is the center

### Phase 5: Outbound Automation Teams (OATs)
- New team created after adopting [[Hightouch]]
- **Drives 25% of all sales pipeline**
- Combines data science (who to contact) with automated execution (how to contact)

### Phase 6: Tiered Outbound
| Tier | Method | Volume | Quality |
|------|--------|--------|---------|
| **Tier 1** | Manual emails from Gmail | Low | Highest (hand-crafted) |
| **Tier 2** | AI-written, human-edited from Gmail | Medium | High (**44% lift** vs. sequencers) |
| **Tier 3** | Automated sequences | High | Moderate (long tail) |

Key insight: **Gmail sends outperform sequencer sends by 44%** for Tier 2. Why? Better deliverability, more personal feel.

### Phase 7: Growth Organization
- 5-7 engineers, a product lead, and data scientists
- All measured on **SQL pipeline and payback** — never vanity MQLs
- Growth team operates as a product team building internal GTM tools

### Organizational Design: Generalist → Specialist
- First hires were **generalist BizOps** operators who rotated across projects
- Once a project became repeatable, hired specialists
- This let them find what works before investing in dedicated teams

## Key Lessons

1. **Engineering is a GTM advantage** — Build tools for your sales team, not just your customers
2. **The data stack IS the GTM stack** — Snowflake + dbt + Hightouch > Salesforce + manual updates
3. **Tiered outbound > uniform outbound** — Different touches for different account values
4. **Measure pipeline, not MQLs** — Vanity metrics drive vanity behavior
5. **Generalists first, specialists later** — Find what works before scaling it
6. **Cold email works** — With good data, good copy, and engineering behind it

## Related

- [[Hightouch]] — Core data activation tool
- [[Warehouse-Native GTM]] — The architecture Ramp pioneered
- [[GTM Engineer]] — Ramp's growth engineers are the template for this role
- [[Composable GTM Stack]] — Ramp's stack is composable
- [[Signal-Based Selling]] — Predictive models as signals
- [[GTM Metrics That Matter]] — SQL pipeline as the north star
