---
tags: [framework, sales, MEDDIC, deal, coframe, active]
aliases: [Coframe Deal, Stardrop Coframe MEDDIC]
---

# MEDDIC Deal: Stardrop Intelligence → Coframe

Active deal applying [[MEDDIC-MEDDPICC]] to selling the Stardrop GTM intelligence layer into [[Coframe]]'s GTM stack, sitting between [[Bo Mohazzabi|HaystacksAI]] signal detection and Coframe's conversion optimization.

## M — Metrics

| Metric | Current (Manual) | With Stardrop | Delta |
|--------|-----------------|--------------|-------|
| Signals activated/week | 5-10 (manual research) | 50-100 (automated) | **10x** |
| Cost per activated signal | $207-$415 (SDR time) | $1.35-$3.35 (API) | **80-185x cheaper** |
| Time to first outreach | 24-48 hours | < 60 seconds | **1,440x faster** |
| Signal-to-meeting rate | 3-5% | 8-15% (knowledge-grounded) | **2-3x** |
| Monthly system cost | $8,300 (1 SDR fully loaded) | $670 (infra) | **12x cheaper** |
| LTV:CAC target | — | 5:1 (Bo's KarmaCheck benchmark) | — |

**Signal decay math:** Trial signup signals lose 50% value in 1.4 weeks. Pricing page visit signals lose 50% in 2.8 weeks. At 48-hour activation delay, 7-13% of high-intent signal value is forfeited. Sub-60-second activation eliminates this loss entirely.

**Revenue projection (moderate):** 200 signals/month × 10% meeting rate × 40% opp rate × 25% close rate × $12K ACV = **$288K annual pipeline** from $8K system cost = **36x ROI**.

## E — Economic Buyer

**Josh Payne** — CEO, Coframe
- Co-founded Autograph with Tom Brady ($2B+ valuation)
- Final budget authority for all GTM spend
- Cares about: product velocity, sustaining 190% QoQ growth, building competitive moat
- Access: through Bo after Phase 1 proves pipeline impact
- Decision style: data-driven, wants to see pipeline numbers not pitch decks

**Risk:** Josh hasn't seen the system yet. Mitigation: Bo runs Phase 1 pilot, brings pipeline data. Josh decides on Phase 2 expansion based on numbers.

## D — Decision Criteria

How Coframe evaluates this:

1. **HaystacksAI integration** — Does it accept structured signal output via webhook? ✅ Yes, FastAPI endpoint accepts JSON with account, signal type, weight, decay rate, context.

2. **Quality bar** — Does output match Bo's standard? ✅ System prompt encodes Bo's voice: zero fluff, practitioner voice, specific numbers, named tools with pricing, no hashtags.

3. **Experiment feedback loop** — Can Coframe A/B test winners train outreach? ✅ HyDE mechanism embeds winning variants as gold-standard documents; future outreach retrieves them.

4. **Cost model** — Cheaper than alternatives? ✅ $670/mo vs. $8.3K/mo (SDR) or $5-10K/mo (AI SDR platform). 80-185x cheaper per activated signal.

5. **Compound advantage** — Does it get better over time? ✅ 1% daily improvement target. Engagement feedback + HyDE + compound tracker. 37.78x at 1 year.

6. **Technical simplicity** — How hard to integrate? ✅ Phase 1 is a webhook (2 engineering-days). Phase 2 adds experiment feedback (3 days). Phase 3 adds CRM loop (1-2 weeks).

## D — Decision Process

| Step | Timeline | Owner | Gate |
|------|----------|-------|------|
| Bo reviews technical business case | Done | Ari → Bo | Bo confirms thesis alignment |
| Phase 1 pilot: HaystacksAI → Stardrop → outreach drafts | Weeks 1-2 | Ari + Bo's team | 10+ signals activated, drafts reviewed |
| Bo's team uses output for 30 days | Weeks 3-6 | Bo's team | Signal-to-meeting rate measured |
| Josh reviews pipeline impact + cost model | Week 7 | Bo → Josh | Pipeline ≥ $20K/month from Stardrop signals |
| Phase 2: experiment-to-outreach loop | Weeks 7-8 | Ari + Coframe eng | Coframe experiment data flowing into HyDE |
| Phase 3: CRM closed-loop measurement | Weeks 9-12 | Ari + Bo | Revenue attribution, not just engagement |

**Timeline to decision:** 6-8 weeks. Phase 1 is the prove-it gate. If 30-day pilot shows signal-to-meeting rate ≥ 8%, Josh approves expansion.

**Paper process:** Lightweight — Coframe is a startup (190% QoQ growth, ~50 people). No formal procurement. Bo can approve Phase 1 spend ($670/mo) directly. Josh approves Phase 2+ if pipeline data justifies.

## I — Identify Pain

### Primary Pain: Signal Activation Gap
HaystacksAI detects intent 460% better than traditional methods. But detection without activation is a dashboard, not a pipeline. Signals decay:
- Trial signup: 50% value lost in 1.4 weeks
- Pricing page visit: 50% value lost in 2.8 weeks
- Every day without activation = money left on the table

Bo's team physically cannot research and draft personalized outreach for every signal HaystacksAI surfaces. At 190% QoQ growth, this bottleneck gets worse every quarter.

### Secondary Pain: Experiment-Outreach Silo
Coframe runs 10x more A/B experiments than competitors. Discovers "Free 14-day trial" converts 23% better than "Book a demo." But this insight never reaches outbound email CTAs. Outreach and experiments are two separate systems that don't talk to each other.

### Tertiary Pain: AI SDR Graveyard
Bo has seen the AI SDR market fail — 11x.ai with 70-80% churn, Artisan at 3.8/5 on G2. He knows spray-and-pray doesn't work. He needs intelligence augmentation, not human replacement. Stardrop is explicitly the intelligence layer, not an autonomous sender.

## C — Champion

**[[Bo Mohazzabi]]** — VP GTM, Coframe

### Why He's the Champion
- **Built HaystacksAI on this exact thesis** — find intent signals, craft one perfect message. Stardrop is the activation layer for his own invention.
- **Practitioner credibility** — 264% quota at Amplitude, $36K→$2.4M at KarmaCheck (67x growth), 5:1 LTV:CAC. He's done this before.
- **Internal authority** — VP GTM reports to Josh. Owns the GTM budget and strategy. Can approve Phase 1 directly.
- **Personal stake** — Stardrop validates the HaystacksAI acquisition. If signals get activated and produce pipeline, it proves Bo's thesis was right.

### Champion Strength: HIGH
Bo doesn't need convincing on the thesis — he invented it. His pain is operational: he can't activate signals fast enough. Stardrop solves his bottleneck directly.

### How to Coach the Champion
- Give Bo the BUSINESS-CASE.md with the signal decay math and cost model
- Let Bo's team use Stardrop output for 30 days — let the numbers speak
- Bo presents pipeline data to Josh: "$X pipeline from Stardrop-activated signals at $670/mo cost"
- Bo frames it as "completing the HaystacksAI vision" — signal detection was step 1, signal activation is step 2

## P — Paper Process (MEDDPICC)

Lightweight. Startup, no formal procurement.
- Phase 1: Bo approves $670/mo from GTM budget
- Phase 2+: Josh approves if pipeline data justifies
- No legal review needed for API integration
- No security review — Stardrop runs on Ari's AWS, Coframe sends signals via webhook
- Timeline: same-day approval for Phase 1

## C — Competition (MEDDPICC)

| Competitor | Why They Lose |
|-----------|--------------|
| Manual SDR research | 24-48 hour latency, $207-$415/signal, doesn't scale at 190% QoQ growth |
| 11x.ai / Artisan | 70-80% churn, generic output, no signal intelligence, no knowledge grounding |
| Apollo Vibe GTM | Unified platform (not composable), doesn't integrate with HaystacksAI signals |
| Unify | Signal platform but no intelligence generation — detects but doesn't activate |
| Internal build | 2-3 months to build, no existing 60-note vault, no self-improvement loop |

**Stardrop's moat:** The combination of (1) curated 60-note vault with practitioner voice, (2) HyDE self-improvement from Coframe experiment data, and (3) compound improvement tracker means the system gets better every day. After 6 months, accumulated learnings can't be replicated by starting from scratch.

## Deal Score

| Element | Status | Confidence |
|---------|--------|-----------|
| **M** Metrics | Defined: 10x activation, 80-185x cheaper, 36x ROI | HIGH |
| **E** Economic Buyer | Identified (Josh), access via Bo after Phase 1 | MEDIUM |
| **D** Decision Criteria | Mapped, all 6 criteria met | HIGH |
| **D** Decision Process | Defined, 6-8 week timeline | HIGH |
| **I** Pain | Three-level pain stack identified | HIGH |
| **C** Champion | Bo — built on this thesis, has authority, personal stake | HIGH |
| **P** Paper Process | Lightweight, same-day for Phase 1 | HIGH |
| **C** Competition | 5 alternatives mapped, all weaker on signal activation | HIGH |

**Overall: 7/8 strong. Gap: Economic Buyer access (Josh).** Closes after Phase 1 data.

## Next Steps (This Week)

1. Send Bo `BUSINESS-CASE.md` with signal decay math
2. Set up webhook endpoint for HaystacksAI signals
3. Run 10 signals through Stardrop, put drafts in front of Bo's team
4. Bo reviews quality — does it match his practitioner standard?
5. If yes → 30-day pilot starts. If no → iterate on voice calibration.

## Related

- [[MEDDIC-MEDDPICC]] — Framework definition
- [[Bo Mohazzabi]] — Champion profile
- [[Case Study - Coframe]] — Coframe's product and metrics
- [[Signal-Based Selling Deep Dive]] — Signal decay model and scoring
- [[AI SDR Agents Deep Dive]] — Competitive landscape (why AI SDRs fail)
- [[The Self-Improving GTM Engine]] — Compound improvement framework
- [[Coframe]] — Tool profile
