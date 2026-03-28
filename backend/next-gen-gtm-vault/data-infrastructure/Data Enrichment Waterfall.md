---
tags: [data-infrastructure, enrichment, pattern]
aliases: [Data Enrichment Waterfall, Waterfall Enrichment]
---

# Data Enrichment Waterfall

A pattern where you **chain multiple data providers sequentially** to maximize coverage and data quality. If Provider A doesn't have the data, try Provider B, then C.

## Why Waterfall?

No single data provider has complete coverage:

| Provider | Email Coverage | Company Data |
|----------|---------------|-------------|
| ZoomInfo | ~65-70% | Strong enterprise |
| Clearbit | ~55-60% | Strong tech/startup |
| Apollo | ~60-65% | Broad, good SMB |
| Hunter.io | ~50-55% | Email-focused |
| Lusha | ~55-60% | Strong EU |

By chaining providers, you achieve **~90-95% coverage**.

## How It Works (in [[Clay]])

```
Input: Company name + person name + title

Step 1: Try ZoomInfo
  → Found email? ✅ Use it. Stop.
  → Not found? ❌ Continue.

Step 2: Try Clearbit
  → Found email? ✅ Use it. Stop.
  → Not found? ❌ Continue.

Step 3: Try Apollo
  → Found email? ✅ Use it. Stop.
  → Not found? ❌ Continue.

Step 4: Try Hunter.io (pattern-based)
  → Found email? ✅ Use it (lower confidence). Stop.
  → Not found? ❌ Mark as unenrichable.

Step 5: Verify email (NeverBounce, ZeroBounce)
  → Valid? ✅ Proceed.
  → Invalid? ❌ Remove.
```

## Beyond Email: Multi-Attribute Waterfall

The same pattern applies to any data attribute:

### Company Data Waterfall
1. Clearbit → company size, industry, tech stack
2. BuiltWith → technology stack details
3. Crunchbase → funding, investors, news
4. LinkedIn → headcount, growth rate

### Contact Data Waterfall
1. ZoomInfo → title, phone, email
2. Apollo → title, email
3. LinkedIn (scraped) → current role, posts
4. Hunter.io → email pattern guess

## Cost Optimization

Waterfall order matters — cheaper providers first:
1. **Free/cheap tier** (Apollo free, Hunter.io free tier)
2. **Mid-tier** (Clearbit, Lusha)
3. **Premium** (ZoomInfo — most expensive, use as fallback)

This minimizes API credit usage while maximizing coverage.

## [[Clay]]'s Role

[[Clay]] is purpose-built for waterfall enrichment:
- 50+ data providers integrated
- Visual waterfall configuration
- Conditional logic (if/then/else)
- Built-in email verification
- AI research as a "final fallback" (scrape website, infer)

## Related

- [[Clay]] — Primary tool for waterfall enrichment
- [[GTM Engineer]] — Who builds and maintains waterfalls
- [[Composable GTM Stack]] — Waterfall is a composable pattern
- [[Signal-Based Selling]] — Enrichment enhances signal data
