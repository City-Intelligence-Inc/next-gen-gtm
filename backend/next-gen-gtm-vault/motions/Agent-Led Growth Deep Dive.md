---
tags: [motion, agents, ALG, MCP, WebMCP, deep-dive]
aliases: [ALG Deep Dive, Agent-Led Growth Deep Dive, MCP GTM]
---

# Agent-Led Growth Deep Dive: MCP, WebMCP, and the Agent-Ready Product

Detailed analysis of Insight Partners' ALG framework, the technical infrastructure enabling it (MCP/WebMCP), and what it means for products to be "agent-ready." This note extends [[Agent-Led Growth]] with implementation specifics.

## Insight Partners' ALG Framework — The Full Picture

### Supply-Side vs. Demand-Side ALG

**Supply-side ALG** = deploying AI agents to improve your outbound funnel (AI SDRs, AI content, AI qualification). This improves the economics of your current funnel.

**Demand-side ALG** = AI agents working for the buyer, autonomously researching, evaluating, and purchasing. This changes *whose funnel it is*.

> "Supply-side ALG improves the economics of your current funnel. Demand-side ALG changes whose funnel it is." — Insight Partners

The strategic opportunity is demand-side. Companies that win agent-mediated purchases gain compounding advantages — a "machine trust moat" that parallels traditional brand loyalty.

### The Funnel Compression Effect

ALG doesn't eliminate the buyer journey — it compresses every stage:

| Stage | Traditional | Agent-Led |
|-------|-------------|-----------|
| **Discovery** | Content marketing, SEO, events | Agents surface solutions before human awareness |
| **Evaluation** | Demo requests, sales calls, POCs | Agents read docs, test APIs, compare features autonomously |
| **Decision** | Negotiation, legal review, committee vote | Sellers confirm or remediate agent-formed opinions |
| **Purchase** | Contract, procurement, implementation | Agent-initiated transactions with user confirmation |

**Critical stat: 77% of buyers purchase from their AI-informed preliminary favorite.** The battle is won or lost at evaluation. If an agent doesn't recommend you, you likely never get considered.

**Additional stat: 94% of B2B buyers are already using LLMs in their research process.**

One developer completed **discovery-through-production integration in under four minutes** using agent-mediated tools. This is the compression in action.

### The Three Pillars — Detailed Requirements

#### 1. Findable
Products must be visible when agents research on behalf of buyers.

**GEO (Generative Engine Optimization):**
- Optimize for AI model responses, not just Google rankings
- Be present in LLM training data through open-source contributions, technical blog posts, community discussions
- Ensure your product appears in AI-generated recommendations

**AEO (Answer Engine Optimization):**
- Optimize for AI search engines (Perplexity, ChatGPT Search, Google AI Overviews)
- Structured data, FAQ pages, clear feature descriptions
- Be the definitive answer to "What's the best X for Y?"

**MCP Registry Presence:**
- List your product in MCP tool registries
- Provide well-documented MCP server implementations
- Make it trivial for agents to discover and connect to your service

#### 2. Evaluable
Documentation functions as a GTM asset, not a support material afterthought.

**What agents actually read:**
- API reference documentation (not marketing pages)
- Quickstart guides and code examples
- Pricing pages with machine-readable pricing structures
- Comparison pages (your product vs. alternatives)
- Error documentation and troubleshooting guides

**What agents ignore:**
- Flashy marketing copy
- Video demos
- Case study PDFs
- Gated content behind forms

**Key insight:** Agents reward consistency — between what your marketing writes, what your docs show, and what your sellers say. Inconsistency between channels is a red flag for agents.

#### 3. Purchasable (Completeable)
Agents can complete transactions directly through structured, machine-readable interactions.

**Requirements:**
- Self-serve signup (no "contact sales" walls)
- Free tiers that remove budget-approval friction
- Usage-based pricing that agents can reason about
- Clean API key provisioning
- Programmatic account creation

---

## Model Context Protocol (MCP) — Technical Details

### What MCP Is

Released by Anthropic as open-source in November 2024, MCP is a standardized protocol for AI models to connect to external tools and data sources.

**The USB-C analogy:** Just like USB-C makes it easy to connect any device to any peripheral, MCP makes it easy to connect any AI model to any data source or tool — regardless of where they're hosted.

### MCP Architecture

```
AI Agent (Claude, GPT, etc.)
    ↓ MCP Protocol
MCP Client (in the agent's runtime)
    ↓ JSON-RPC over stdio/HTTP
MCP Server (your product's interface)
    ↓ API calls
Your Product Backend
```

**MCP Servers expose:**
- **Tools** — Functions the agent can call (e.g., "create_database", "send_email")
- **Resources** — Data the agent can read (e.g., documentation, schemas)
- **Prompts** — Pre-built interaction templates

### MCP's GTM Impact

For product companies, MCP is the enabling infrastructure for demand-side ALG:

1. **Discovery:** Agents find your MCP server in registries
2. **Evaluation:** Agents call your tools to test capabilities
3. **Integration:** Agents implement your product into their user's codebase
4. **Purchase:** Agents provision accounts and manage billing

**Companies with MCP servers:**
- Supabase, Stripe, Resend, Vercel, GitHub, Notion, Slack, Linear
- The list grows daily — not having an MCP server is increasingly a competitive disadvantage

---

## WebMCP — The Web Goes Agent-Ready

### What WebMCP Is

Shipped in **Chrome 146** (February 12, 2026), WebMCP is a proposed web standard that lets any website expose structured, callable tools directly to AI agents through a new browser API: `navigator.modelContext`.

Developed jointly by engineers at **Google and Microsoft**, incubated through the **W3C**.

### Two APIs

#### Declarative API (HTML Forms)
Add attributes to existing HTML forms to make them agent-readable:

```html
<form toolname="search_products"
      tooldescription="Search the product catalog by keyword and category">
  <input name="query"
         toolparamdescription="Search keywords" />
  <select name="category"
          toolparamdescription="Product category filter">
    <option value="electronics">Electronics</option>
    <option value="clothing">Clothing</option>
  </select>
  <button type="submit">Search</button>
</form>
```

The browser automatically translates form fields into a structured schema that agents can interpret and invoke.

#### Imperative API (JavaScript)
For complex, dynamic interactions:

```javascript
navigator.modelContext.addTool({
  name: "checkout",
  description: "Complete a purchase",
  parameters: { /* JSON Schema */ },
  handler: async (params) => { /* ... */ }
});
```

### WebMCP's GTM Implications

**Before WebMCP:** Agents interact with websites by taking screenshots, parsing DOM, clicking buttons — expensive, brittle, unreliable.

**After WebMCP:** Agents make structured API calls to website tools — cheap, reliable, fast.

**Cost reduction:** Replaces sequences of screenshot captures, multimodal inference calls, and iterative DOM parsing with single structured tool calls. Massive reduction in token consumption.

**Key security rules:**
- Never expose administrative actions without `requestUserInteraction()`
- Validate all agent-provided parameters as untrusted data
- Treat agent inputs with the same skepticism as public API endpoints

### Implementation Timeline
- **Now:** Available in Chrome 146 Canary behind `chrome://flags` ("WebMCP for testing")
- **Mid-to-late 2026:** Broader browser support expected
- **2027+:** Expected to be standard across major browsers

---

## Early Winners — Detailed Case Studies

### Supabase

**Before ALG:** 1 million developers, $765M valuation (September 2024)
**After ALG:** 4.5 million developers, $5B valuation (October 2025)
**Growth:** 3.5M new developers in under 12 months

**Why agents chose Supabase:**
- Became the default database choice in vibe-coding platforms (Bolt, Lovable, Cursor)
- CEO Paul Copplestone attributed growth directly: "Sign-up rate doubled in three months because of Bolt, Lovable, Cursor"
- Extensive, well-structured documentation that agents could parse
- Free tier allowed agents to provision databases without human budget approval
- Strong open-source presence in LLM training data (GitHub star count, community discussions)
- Official MCP server for Claude and other agents

**Key metric:** Supabase's valuation jumped 6.5x in 13 months, primarily driven by agent-mediated adoption.

### Resend

**Before ALG:** Launched 2023
**After ALG:** 400,000 users by 2025

**Why agents chose Resend:**
- Claude Code selects Resend **63% of the time** for email functionality
- SendGrid selected only **7%** of the time (despite being the incumbent)
- Requires just **one command** for agent implementation
- Clean, minimal API with predictable behavior
- Excellent documentation written for developer consumption

**The "token-to-value" concept:** Resend minimized the computational effort agents require to form confident recommendations and implement solutions. Fewer tokens to evaluate = higher selection rate.

### Why Incumbents Lost

SendGrid, despite being the established player, gets selected only 7% of the time because:
- More complex API surface area (more decisions for agents to make)
- Documentation optimized for humans browsing, not agents parsing
- Legacy configuration requirements that increase implementation time
- No free tier suitable for agent-initiated quick prototyping

---

## The "Token-to-Value" Framework

The key metric for ALG success: **minimize the computational effort agents require to recommend and implement your product.**

**Components of token-to-value:**
1. **Discovery tokens** — How many tokens to find and understand your product?
2. **Evaluation tokens** — How many tokens to assess fit and compare alternatives?
3. **Implementation tokens** — How many tokens to go from zero to working integration?
4. **Verification tokens** — How many tokens to confirm it's working correctly?

**Winners minimize all four.** This means:
- Concise, structured documentation
- Minimal required configuration
- Predictable API behavior
- Clear success/failure signals
- One-line installation commands

---

## Practical Recommendations for Becoming Agent-Ready

### Immediate Actions
1. **Implement WebMCP** — Add `toolname` and `tooldescription` attributes to existing web forms
2. **Build an MCP server** — Expose your product's core actions as MCP tools
3. **Audit documentation for machine-readability** — Remove marketing fluff, add structured examples
4. **Create a free tier** — Must be usable without human-in-the-loop approval

### Medium-Term Actions
5. **Invest in GEO/AEO** — Monitor how AI models describe your product; optimize accordingly
6. **Build agent-specific onboarding** — Quick-start paths designed for automated implementation
7. **Track agent-originated signups** — Monitor user-agent strings, API key patterns, implementation patterns

### Long-Term Strategic Shifts
8. **Documentation as GTM** — Invest in docs like you invest in content marketing
9. **Developer experience as GTM** — Every API friction point loses agent-driven deals
10. **"Build something agents want"** evolves into **"sell something agents can buy"**

---

## How to Measure ALG Success

| Metric | How to Track |
|--------|-------------|
| Agent-originated signups | User-agent string analysis, API key creation patterns |
| AI model recommendation rate | Test with Claude, GPT, Perplexity regularly |
| Agent implementation success rate | Monitor automated setup completion rates |
| Documentation completeness score | Coverage of API endpoints, error codes, examples |
| Time-to-first-API-call (automated) | Track latency from signup to first successful call |
| Token-to-value ratio | Benchmark implementation token cost vs. competitors |

## Sources

- [Insight Partners: Agent-Led Growth](https://www.insightpartners.com/ideas/agent-led-growth/)
- [Chrome for Developers: WebMCP Early Preview](https://developer.chrome.com/blog/webmcp-epp)
- [Search Engine Land: WebMCP Explained](https://searchengineland.com/webmcp-explained-inside-chrome-146s-agent-ready-web-preview-470630)
- [VentureBeat: Chrome Ships WebMCP](https://venturebeat.com/infrastructure/google-chrome-ships-webmcp-in-early-preview-turning-every-website-into-a)
- [Semrush: WebMCP What It Is](https://www.semrush.com/blog/webmcp/)
- [CMSWire: Next Marketing Stack AI Agents + MCP](https://www.cmswire.com/digital-marketing/the-next-marketing-stack-ai-agents-model-context-protocol/)
- [DataCamp: WebMCP Tutorial](https://www.datacamp.com/tutorial/webmcp-tutorial)

## Related

- [[Agent-Led Growth]] — The overview note
- [[AI SDR Agents Deep Dive]] — Supply-side ALG in practice
- [[Composable GTM Stack Deep Dive]] — Agent-friendly architecture
- [[Signal-Based Selling Deep Dive]] — How signals feed agent actions
