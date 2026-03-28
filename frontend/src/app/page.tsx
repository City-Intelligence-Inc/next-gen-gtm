export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Nav */}
      <nav className="sticky top-0 z-40 border-b border-neutral-200 bg-white/95 backdrop-blur-sm">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <span className="font-serif text-xl italic text-neutral-900">
              Stardrop
            </span>
            <span className="rounded-md bg-neutral-100 px-2 py-0.5 text-xs font-medium text-neutral-500">
              GTM Agent
            </span>
          </div>
          <div className="flex items-center gap-4">
            <a
              href="#environments"
              className="hidden text-sm text-neutral-500 transition hover:text-neutral-900 sm:block"
            >
              Environments
            </a>
            <a
              href="https://xitwxb23yn.us-east-1.awsapprunner.com/api/gtm/intents"
              target="_blank"
              className="hidden text-sm text-neutral-500 transition hover:text-neutral-900 sm:block"
            >
              API
            </a>
            <a
              href="https://x.com/intent/tweet?text=@stardroplin%20"
              target="_blank"
              className="rounded-lg bg-neutral-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-neutral-800 active:bg-black"
            >
              Try on X
            </a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="mx-auto max-w-4xl px-6 pt-28 pb-20 text-center">
        <div className="animate-fade-in mb-6 inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-neutral-50 px-4 py-1.5 text-sm text-neutral-500">
          <span className="animate-pulse-dot inline-block h-2 w-2 rounded-full bg-green-500" />
          Agent is live — responding on X
        </div>
        <h1 className="animate-fade-in-delay-1 font-serif text-5xl italic leading-[1.1] tracking-tight text-neutral-900 sm:text-7xl">
          Your GTM team
          <br />
          just got smarter
        </h1>
        <p className="animate-fade-in-delay-2 mx-auto mt-8 max-w-xl text-lg leading-relaxed text-neutral-500" style={{ letterSpacing: "-0.005em" }}>
          Tag{" "}
          <a
            href="https://x.com/stardroplin"
            target="_blank"
            className="font-semibold text-neutral-900 underline underline-offset-4 decoration-neutral-300 hover:decoration-neutral-900 transition"
          >
            @stardroplin
          </a>{" "}
          on X with any GTM question. Get competitive intel, ICP analysis,
          signal detection, and outbound copy — powered by AI and 60+ pages of
          deep GTM research.
        </p>
        <div className="animate-fade-in-delay-3 mt-10 flex items-center justify-center gap-4">
          <a
            href="https://x.com/intent/tweet?text=@stardroplin%20who%20should%20I%20sell%20to%3F%20we%20built%20"
            target="_blank"
            className="rounded-lg bg-neutral-900 px-6 py-3 text-sm font-medium text-white transition hover:bg-neutral-800 active:bg-black hover:shadow-lg"
          >
            Tag @stardroplin on X
          </a>
          <a
            href="#how-it-works"
            className="rounded-lg border border-neutral-200 px-6 py-3 text-sm font-medium text-neutral-600 transition hover:border-neutral-300 hover:text-neutral-900"
          >
            How it works
          </a>
        </div>
      </section>

      {/* Live Demo — Real Tweet Embed */}
      <section className="mx-auto max-w-3xl px-6 pb-24">
        <div className="animate-fade-in-scale flex justify-center">
          <div className="w-full max-w-xl">
            <blockquote className="twitter-tweet" data-theme="light" data-conversation="none">
              <p lang="en" dir="ltr">
                <a href="https://x.com/stardroplin">@stardroplin</a> build the next generation of how we do go to market and tie all of our systems together internally.
              </p>
              &mdash; Arihant Choudhary (@arichoudhary){" "}
              <a href="https://x.com/arichoudhary/status/2037666630218739720">March 27, 2026</a>
            </blockquote>
          </div>
        </div>

        {/* Static fallback + example response */}
        <div className="mt-10 overflow-hidden rounded-2xl border border-neutral-200 shadow-lg shadow-neutral-100">
          <div className="flex items-center gap-2 border-b border-neutral-200 bg-neutral-50 px-4 py-3">
            <div className="flex gap-1.5">
              <div className="h-3 w-3 rounded-full bg-red-300" />
              <div className="h-3 w-3 rounded-full bg-yellow-300" />
              <div className="h-3 w-3 rounded-full bg-green-300" />
            </div>
            <div className="ml-3 flex-1 rounded-md bg-white px-3 py-1 text-xs text-neutral-400 border border-neutral-200">
              Example: @stardroplin reply
            </div>
          </div>
          <div className="bg-white p-6 sm:p-8 space-y-6">
            <div className="flex gap-3">
              <div className="h-10 w-10 shrink-0 rounded-full bg-gradient-to-br from-neutral-200 to-neutral-300" />
              <div>
                <p className="text-sm">
                  <span className="font-semibold">@founder</span>
                  <span className="ml-2 text-neutral-400">· tweet</span>
                </p>
                <p className="mt-1 text-[15px] text-neutral-700 leading-relaxed">
                  @stardroplin who should I sell to? we built an AI code review tool
                </p>
              </div>
            </div>
            <div className="ml-5 border-l-2 border-neutral-900 pl-5">
              <div className="flex gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-neutral-900 text-sm font-bold text-white">
                  S
                </div>
                <div className="space-y-3">
                  <p className="text-sm">
                    <span className="font-semibold">@stardroplin</span>
                    <span className="ml-2 text-neutral-400">· 45s</span>
                  </p>
                  <div className="space-y-3 text-[15px] text-neutral-700 leading-relaxed">
                    <p>
                      <span className="font-semibold text-neutral-900">Target:</span>{" "}
                      Engineering Managers at B2B SaaS (50-500 employees). They run 15+ PRs/day and struggle with review bottlenecks.
                    </p>
                    <p>
                      <span className="font-semibold text-neutral-900">Signal:</span>{" "}
                      Companies posting &quot;hiring senior engineers&quot; = growing team, more PRs, more review pain.
                    </p>
                    <p>
                      <span className="font-semibold text-neutral-900">Outreach:</span>{" "}
                      Email VP Eng with subject: &quot;Your PR review time is 3x what it should be&quot;
                    </p>
                    <p>
                      <span className="font-semibold text-neutral-900">This week:</span>{" "}
                      Use Apollo to find 50 Engineering Managers at Series A-B SaaS. Send 10 personalized emails via Instantly referencing their GitHub activity.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="border-t border-neutral-200 bg-neutral-50">
        <div className="mx-auto max-w-6xl px-6 py-24 md:py-32">
          <p className="scroll-reveal text-xs font-medium uppercase tracking-[0.2em] text-neutral-400">
            Three steps
          </p>
          <h2 className="scroll-reveal mt-2 font-serif text-3xl italic tracking-tight sm:text-4xl">
            How it works
          </h2>
          <div className="mt-14 grid gap-12 md:grid-cols-3 stagger-children">
            {[
              {
                num: "01",
                title: "Tag on X",
                desc: "Tweet your GTM question and tag @stardroplin. Ask about competitors, your ICP, buying signals, GTM stack, outbound copy, or get your strategy roasted.",
                detail: "Works with any tweet format — mention @stardroplin anywhere in the text.",
              },
              {
                num: "02",
                title: "AI analyzes with deep context",
                desc: "Stardrop retrieves relevant knowledge from 60+ curated research notes via RAG (Retrieval-Augmented Generation), then GPT-4o generates specific, actionable intelligence.",
                detail: "Knowledge covers: 5 GTM motions, signal taxonomy, composable stacks, MEDDIC, Bow-Tie Funnel, case studies (Ramp, Figma, Datadog, Notion).",
              },
              {
                num: "03",
                title: "Get actionable reply",
                desc: "Within 60 seconds, Stardrop replies with a thread — real tools, real numbers, real frameworks, and a concrete this-week action you can execute immediately.",
                detail: "Every response names specific tools (Clay, Apollo, Instantly) and includes quantified recommendations.",
              },
            ].map((item) => (
              <div key={item.num} className="group">
                <span className="font-mono text-xs font-semibold text-neutral-300 group-hover:text-neutral-900 transition">
                  {item.num}
                </span>
                <h3 className="mt-3 text-lg font-semibold tracking-tight" style={{ letterSpacing: "-0.01em" }}>
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-neutral-500">
                  {item.desc}
                </p>
                <p className="mt-3 text-xs leading-relaxed text-neutral-400 border-t border-neutral-200 pt-3">
                  {item.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="border-t border-neutral-200">
        <div className="mx-auto max-w-6xl px-6 py-24 md:py-32">
          <div className="grid gap-16 lg:grid-cols-[1fr_2fr]">
            <div className="scroll-reveal-left lg:sticky lg:top-28 lg:self-start">
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-neutral-400">
                Capabilities
              </p>
              <h2 className="mt-2 font-serif text-3xl italic tracking-tight sm:text-4xl">
                What you
                <br />
                can ask
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-neutral-500">
                Six GTM automations, all triggered by a tweet. Each response
                is specific, actionable, and backed by real research from our
                60-note knowledge vault.
              </p>
              <p className="mt-4 text-xs text-neutral-400">
                Powered by GPT-4o + RAG over curated GTM intelligence.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 stagger-children">
              {[
                {
                  title: "Competitor Intel",
                  trigger: "analyze competitor @acmecorp",
                  desc: "Full competitive teardown — positioning, recent signals (hiring, funding, product launches), weaknesses, and your recommended counter-move.",
                  sources: "Signal-Based Selling, Case Study - Clay",
                },
                {
                  title: "ICP Analysis",
                  trigger: "who should I sell to?",
                  desc: "Ideal customer profile with firmographics (company size, industry, funding stage), pain points, outbound channels, and 3 example accounts to target this week.",
                  sources: "GTM Fit, JTBD for GTM, MEDDIC",
                },
                {
                  title: "Signal Detection",
                  trigger: "find signals for AI startups",
                  desc: "Scan for buying signals — hiring posts indicating need, funding rounds, complaints about competitors, tech stack changes, G2 research activity.",
                  sources: "Signal-Based Selling Deep Dive, Signal Taxonomy",
                },
                {
                  title: "GTM Roast",
                  trigger: "roast my GTM strategy",
                  desc: "Honest, specific assessment of your go-to-market motion. Identifies whether you should be PLG, SLG, or PLS — with concrete fixes for each gap.",
                  sources: "GTM Pain Points, Current GTM Landscape",
                },
                {
                  title: "Stack Advisor",
                  trigger: "what GTM stack should I use?",
                  desc: "Personalized tool recommendations based on your stage, team size, and budget. Composable stack (Clay + Instantly + Attio) vs. all-in-one (Apollo).",
                  sources: "Composable GTM Stack, Tool profiles",
                },
                {
                  title: "Outbound Generator",
                  trigger: "turn this into outbound",
                  desc: "Transform any tweet, thread, or product description into cold email copy with subject lines, LinkedIn connection messages, and follow-up sequences.",
                  sources: "AI SDR Agents, Data Enrichment Waterfall",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="hover-lift rounded-xl border border-neutral-200 bg-white p-5"
                >
                  <h3 className="text-sm font-semibold">{item.title}</h3>
                  <p className="mt-1.5 font-mono text-xs text-neutral-400">
                    &quot;{item.trigger}&quot;
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-neutral-500">
                    {item.desc}
                  </p>
                  <p className="mt-3 border-t border-neutral-100 pt-2 text-[10px] uppercase tracking-widest text-neutral-300">
                    Sources: {item.sources}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Environments */}
      <section id="environments" className="border-t border-neutral-200 bg-neutral-50">
        <div className="mx-auto max-w-6xl px-6 py-24 md:py-32">
          <p className="scroll-reveal text-xs font-medium uppercase tracking-[0.2em] text-neutral-400">
            Environments
          </p>
          <h2 className="scroll-reveal mt-2 font-serif text-3xl italic tracking-tight sm:text-4xl">
            Systems configured
          </h2>
          <p className="scroll-reveal mt-4 max-w-xl text-sm leading-relaxed text-neutral-500">
            Every GTM system is an environment to connect. Each one gets its own authentication, data model, and integration interface. Here&apos;s what&apos;s live and what&apos;s coming.
          </p>

          {/* Live */}
          <div className="mt-14">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.15em] text-green-600">
              Live
            </p>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 stagger-children">
              {[
                { name: "X / Twitter", desc: "Mention detection + auto-reply via OAuth 1.0a", detail: "Polls every 60s, dedupes, checks for existing replies" },
                { name: "OpenAI (GPT-4o)", desc: "GTM analysis + intelligence generation", detail: "RAG-augmented prompts with domain knowledge" },
                { name: "ChromaDB (RAG)", desc: "60+ vault notes indexed (441 chunks)", detail: "all-MiniLM-L6-v2 embeddings, cosine similarity, top-8 retrieval" },
                { name: "AWS App Runner", desc: "Backend compute + worker polling", detail: "0.25 vCPU, auto-scales, health-checked" },
                { name: "GitHub", desc: "Repo creation from tweets, CI/CD via Actions", detail: "GitHub App integration with private key auth" },
                { name: "Luma", desc: "Event creation, hackathon management", detail: "Attendee tracking, event scheduling" },
              ].map((item) => (
                <div key={item.name} className="hover-lift flex items-start gap-3 rounded-xl border border-neutral-200 bg-white p-4">
                  <div className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-green-500 shadow-sm shadow-green-500/50" />
                  <div>
                    <p className="text-sm font-semibold">{item.name}</p>
                    <p className="mt-0.5 text-xs text-neutral-500">{item.desc}</p>
                    <p className="mt-1 text-[10px] text-neutral-400">{item.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Coming Soon */}
          <div className="mt-12">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.15em] text-neutral-400">
              Coming soon — 17 environments
            </p>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 stagger-children">
              {[
                { name: "HubSpot", cat: "CRM", desc: "Bi-directional contact/deal sync, push lead scores" },
                { name: "Salesforce", cat: "CRM", desc: "Enterprise CRM sync, opportunity tracking" },
                { name: "Slack", cat: "Notifications", desc: "Signal alerts to sales channels, deal room updates" },
                { name: "Clay", cat: "Enrichment", desc: "Waterfall enrichment across 50+ data providers" },
                { name: "Apollo", cat: "Data + Outbound", desc: "275M+ contacts, email sequences, Vibe GTM agents" },
                { name: "Instantly", cat: "Cold Email", desc: "Multi-mailbox outbound, deliverability optimization" },
                { name: "Attio", cat: "Modern CRM", desc: "Relational CRM for composable GTM stacks" },
                { name: "Common Room", cat: "Signals", desc: "50+ signal sources, Person360 identity resolution" },
                { name: "Unify", cat: "Signal Outbound", desc: "25+ signal types, automated plays" },
                { name: "Pocus", cat: "PLS", desc: "Product-qualified lead scoring from usage data" },
                { name: "Hightouch", cat: "Reverse ETL", desc: "Warehouse-to-CRM sync, composable CDP" },
                { name: "Snowflake", cat: "Data Warehouse", desc: "Source of truth for all GTM data" },
                { name: "Segment", cat: "Events", desc: "Product event collection and routing" },
                { name: "Stripe", cat: "Billing", desc: "Revenue events, expansion/churn signals" },
                { name: "LinkedIn", cat: "Outbound", desc: "Connection requests, InMail, engagement tracking" },
                { name: "Gong", cat: "Conversation Intel", desc: "Call analysis, MEDDIC scoring, deal risk" },
                { name: "Google Ads + Meta", cat: "Paid", desc: "Audience sync from warehouse segments" },
              ].map((item) => (
                <div key={item.name} className="flex items-start gap-3 rounded-xl border border-dashed border-neutral-200 bg-white/50 p-4 opacity-75">
                  <div className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-neutral-300" />
                  <div>
                    <p className="text-sm font-semibold">
                      {item.name}
                      <span className="ml-2 rounded bg-neutral-100 px-1.5 py-0.5 text-[10px] font-medium text-neutral-400 uppercase">
                        {item.cat}
                      </span>
                    </p>
                    <p className="mt-0.5 text-xs text-neutral-400">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-t border-neutral-200">
        <div className="mx-auto max-w-6xl px-6 py-24 md:py-32">
          <p className="scroll-reveal text-xs font-medium uppercase tracking-[0.2em] text-neutral-400">
            The problem
          </p>
          <h2 className="scroll-reveal mt-2 font-serif text-3xl italic tracking-tight sm:text-4xl">
            GTM is broken
          </h2>
          <p className="scroll-reveal mt-4 max-w-xl text-sm leading-relaxed text-neutral-500">
            The average B2B company uses 12-20 GTM tools, spends $1,800 per employee per year on SaaS, and watches CRM data rot at 30% annually. Stardrop gives you the intelligence layer that ties it all together.
          </p>
          <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-200 sm:grid-cols-3 scroll-scale">
            {[
              { stat: "12–20", label: "GTM tools per company", sub: "Each with its own data model and API" },
              { stat: "30%", label: "CRM data decays yearly", sub: "Job changes, bounces, stale records" },
              { stat: "$85K+", label: "Fully loaded SDR cost", sub: "vs $8-24K for an AI agent system" },
              { stat: "42hrs", label: "Median lead response time", sub: "Top quartile responds in under 5 min" },
              { stat: "77%", label: "Buy from AI-recommended", sub: "Agents choosing vendors for buyers" },
              { stat: "120%+", label: "NRR at top companies", sub: "Datadog, Snowflake, best-in-class SaaS" },
            ].map((item) => (
              <div
                key={item.label}
                className="bg-white p-8 text-center"
              >
                <p className="font-serif text-4xl italic text-neutral-900">
                  {item.stat}
                </p>
                <p className="mt-2 text-sm font-medium text-neutral-700">{item.label}</p>
                <p className="mt-1 text-xs text-neutral-400">{item.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Paper / Research */}
      <section className="border-t border-neutral-200 bg-neutral-50">
        <div className="mx-auto max-w-4xl px-6 py-24 md:py-32 text-center">
          <p className="scroll-reveal text-xs font-medium uppercase tracking-[0.2em] text-neutral-400">
            Research
          </p>
          <h2 className="scroll-reveal mt-2 font-serif text-3xl italic tracking-tight sm:text-4xl">
            Built on deep research
          </h2>
          <p className="scroll-reveal mx-auto mt-4 max-w-lg text-sm leading-relaxed text-neutral-500">
            Stardrop&apos;s knowledge base draws from 60+ curated research notes covering GTM motions, frameworks, tool landscapes, case studies, and data infrastructure — all indexed for retrieval-augmented generation.
          </p>
          <div className="scroll-scale mt-10 grid gap-4 sm:grid-cols-3 text-left">
            {[
              { num: "60+", label: "Research notes", desc: "Interconnected Obsidian vault with wikilinks" },
              { num: "441", label: "Indexed chunks", desc: "Embedded with all-MiniLM-L6-v2 in ChromaDB" },
              { num: "5", label: "Case studies", desc: "Ramp, Figma, Datadog, Notion, Clay" },
            ].map((item) => (
              <div key={item.label} className="rounded-xl border border-neutral-200 bg-white p-5">
                <p className="font-serif text-2xl italic text-neutral-900">{item.num}</p>
                <p className="mt-1 text-sm font-semibold">{item.label}</p>
                <p className="mt-1 text-xs text-neutral-400">{item.desc}</p>
              </div>
            ))}
          </div>
          <p className="scroll-reveal mt-8 text-xs text-neutral-400">
            Paper: <em>&quot;Environmental Engineering for Go-To-Market Systems&quot;</em> — in preparation for arXiv cs.AI
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-neutral-200">
        <div className="mx-auto max-w-4xl px-6 py-28 md:py-36 text-center">
          <h2 className="scroll-reveal font-serif text-4xl italic tracking-tight sm:text-6xl">
            Try it now
          </h2>
          <p className="scroll-reveal mx-auto mt-6 max-w-md text-base leading-relaxed text-neutral-500">
            Tag @stardroplin on X with any GTM question. Free. No signup. Just
            actionable intelligence backed by deep research.
          </p>
          <a
            href="https://x.com/intent/tweet?text=@stardroplin%20"
            target="_blank"
            className="scroll-scale mt-10 inline-block rounded-lg bg-neutral-900 px-10 py-4 text-base font-medium text-white transition hover:bg-neutral-800 active:bg-black hover:shadow-xl"
          >
            Tag @stardroplin on X
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-neutral-200 bg-neutral-50">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-8 sm:flex-row">
          <div className="flex items-center gap-3">
            <span className="font-serif text-sm italic text-neutral-400">
              Stardrop
            </span>
            <span className="text-xs text-neutral-300">
              Next-gen GTM intelligence
            </span>
          </div>
          <div className="flex items-center gap-4 text-xs text-neutral-400">
            <a
              href="https://x.com/arichoudhary"
              target="_blank"
              className="transition hover:text-neutral-900"
            >
              @arichoudhary
            </a>
            <span className="text-neutral-200">&bull;</span>
            <span>City Intelligence</span>
            <span className="text-neutral-200">&bull;</span>
            <a
              href="https://github.com/City-Intelligence-Inc/next-gen-gtm"
              target="_blank"
              className="transition hover:text-neutral-900"
            >
              GitHub
            </a>
            <span className="text-neutral-200">&bull;</span>
            <a
              href="https://xitwxb23yn.us-east-1.awsapprunner.com/api/gtm/intents"
              target="_blank"
              className="transition hover:text-neutral-900"
            >
              API
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
