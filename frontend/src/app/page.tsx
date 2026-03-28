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
              href="https://xitwxb23yn.us-east-1.awsapprunner.com/api/gtm/intents"
              target="_blank"
              className="text-sm text-neutral-500 transition hover:text-neutral-900"
            >
              API
            </a>
            <a
              href="https://x.com/intent/tweet?text=@stardroplin%20"
              target="_blank"
              className="rounded-lg bg-neutral-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-neutral-800"
            >
              Try on X
            </a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="mx-auto max-w-4xl px-6 pt-24 pb-20 text-center">
        <p className="animate-fade-in mb-6 text-xs font-medium uppercase tracking-[0.2em] text-neutral-400">
          Go-To-Market Intelligence
        </p>
        <h1 className="animate-fade-in-delay-1 font-serif text-5xl italic leading-tight tracking-tight text-neutral-900 sm:text-7xl">
          Your GTM team
          <br />
          just got smarter
        </h1>
        <p className="animate-fade-in-delay-2 mx-auto mt-8 max-w-xl text-lg leading-relaxed text-neutral-500" style={{ letterSpacing: "-0.005em" }}>
          Tag{" "}
          <a
            href="https://x.com/stardroplin"
            target="_blank"
            className="font-medium text-neutral-900 underline underline-offset-4 decoration-neutral-300 hover:decoration-neutral-900 transition"
          >
            @stardroplin
          </a>{" "}
          on X with any GTM question. Get competitive intel, ICP analysis,
          signal detection, and outbound copy — powered by AI and 60+ pages of
          research.
        </p>
        <div className="animate-fade-in-delay-3 mt-10 flex items-center justify-center gap-4">
          <a
            href="https://x.com/intent/tweet?text=@stardroplin%20who%20should%20I%20sell%20to%3F%20we%20built%20"
            target="_blank"
            className="rounded-lg bg-neutral-900 px-6 py-3 text-sm font-medium text-white transition hover:bg-neutral-800 active:bg-black"
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

      {/* Demo card */}
      <section className="mx-auto max-w-3xl px-6 pb-24">
        <div className="overflow-hidden rounded-xl border border-neutral-200 bg-neutral-50">
          {/* Browser bar */}
          <div className="flex items-center gap-2 border-b border-neutral-200 px-4 py-3">
            <div className="flex gap-1.5">
              <div className="h-3 w-3 rounded-full bg-neutral-200" />
              <div className="h-3 w-3 rounded-full bg-neutral-200" />
              <div className="h-3 w-3 rounded-full bg-neutral-200" />
            </div>
            <div className="ml-3 rounded-md bg-white px-3 py-1 text-xs text-neutral-400 border border-neutral-200">
              x.com
            </div>
          </div>
          <div className="p-6 space-y-6">
            {/* Tweet */}
            <div className="flex gap-3">
              <div className="h-10 w-10 shrink-0 rounded-full bg-neutral-200" />
              <div>
                <p className="text-sm">
                  <span className="font-semibold">@founder</span>
                  <span className="ml-2 text-neutral-400">· just now</span>
                </p>
                <p className="mt-1 text-sm text-neutral-700">
                  @stardroplin who should I sell to? we built an AI code review
                  tool
                </p>
              </div>
            </div>
            {/* Reply */}
            <div className="ml-5 border-l-2 border-neutral-200 pl-5">
              <div className="flex gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-neutral-900 text-sm font-bold text-white">
                  S
                </div>
                <div className="space-y-2">
                  <p className="text-sm">
                    <span className="font-semibold">@stardroplin</span>
                    <span className="ml-2 text-neutral-400">· 45s</span>
                  </p>
                  <div className="space-y-2.5 text-sm text-neutral-700 leading-relaxed">
                    <p>
                      <span className="font-semibold">Target:</span> Engineering
                      Managers at B2B SaaS (50-500 employees). They run 15+
                      PRs/day and struggle with review bottlenecks.
                    </p>
                    <p>
                      <span className="font-semibold">Signal:</span> Companies
                      posting &quot;hiring senior engineers&quot; = growing
                      team, more PRs, more review pain.
                    </p>
                    <p>
                      <span className="font-semibold">Outreach:</span> Email VP
                      Eng with subject: &quot;Your PR review time is 3x what it
                      should be&quot;
                    </p>
                    <p>
                      <span className="font-semibold">This week:</span> Use
                      Apollo to find 50 Engineering Managers at Series A-B SaaS.
                      Send 10 personalized emails referencing their GitHub
                      activity.
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
        <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-neutral-400">
            Three steps
          </p>
          <h2 className="mt-2 font-serif text-3xl italic tracking-tight sm:text-4xl">
            How it works
          </h2>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {[
              {
                num: "01",
                title: "Tag on X",
                desc: "Tweet your GTM question and tag @stardroplin. Competitive intel, ICP analysis, signal detection, stack advice, or outbound copy.",
              },
              {
                num: "02",
                title: "AI analyzes",
                desc: "Stardrop retrieves relevant knowledge from 60+ research notes via RAG, then GPT-4o generates specific, actionable intelligence.",
              },
              {
                num: "03",
                title: "Get a reply",
                desc: "Within 60 seconds, Stardrop replies with a thread of actionable insights — real tools, real numbers, a this-week move.",
              },
            ].map((item) => (
              <div key={item.num}>
                <span className="text-xs font-semibold text-neutral-300">
                  {item.num}
                </span>
                <h3 className="mt-2 text-lg font-semibold tracking-tight" style={{ letterSpacing: "-0.01em" }}>
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-neutral-500" style={{ letterSpacing: "-0.005em" }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="border-t border-neutral-200">
        <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
          <div className="grid gap-16 lg:grid-cols-[1fr_2fr]">
            <div className="lg:sticky lg:top-24 lg:self-start">
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
                is specific, actionable, and backed by real research.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                {
                  title: "Competitor Intel",
                  trigger: "analyze competitor @acmecorp",
                  desc: "Full competitive teardown — positioning, recent signals, weaknesses, and your recommended move.",
                },
                {
                  title: "ICP Analysis",
                  trigger: "who should I sell to?",
                  desc: "Ideal customer profile with firmographics, pain points, channels, and example accounts to target.",
                },
                {
                  title: "Signal Detection",
                  trigger: "find signals for AI startups",
                  desc: "Scan for buying signals — hiring posts, funding announcements, complaints, tech stack changes.",
                },
                {
                  title: "GTM Roast",
                  trigger: "roast my GTM strategy",
                  desc: "Honest assessment of your go-to-market motion with specific, actionable fixes.",
                },
                {
                  title: "Stack Advisor",
                  trigger: "what GTM stack should I use?",
                  desc: "Personalized tool recommendations — Clay, Apollo, Instantly, Attio, and more — based on your stage.",
                },
                {
                  title: "Outbound Generator",
                  trigger: "turn this into outbound",
                  desc: "Transform any tweet or thread into cold email copy and LinkedIn outreach messages.",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="rounded-xl border border-neutral-200 bg-white p-5 transition hover:border-neutral-300 hover:shadow-sm"
                >
                  <h3 className="text-sm font-semibold">{item.title}</h3>
                  <p className="mt-1 font-mono text-xs text-neutral-400">
                    &quot;{item.trigger}&quot;
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-neutral-500">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Environments / Integrations */}
      <section className="border-t border-neutral-200 bg-white">
        <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-neutral-400">
            Environments
          </p>
          <h2 className="mt-2 font-serif text-3xl italic tracking-tight sm:text-4xl">
            Systems configured
          </h2>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-neutral-500">
            Every GTM system is an environment to connect. Here&apos;s what&apos;s live and what&apos;s coming.
          </p>

          {/* Live */}
          <div className="mt-12">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.15em] text-neutral-400">
              Live
            </p>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {[
                { name: "X / Twitter", desc: "Mention detection + auto-reply", status: "live" },
                { name: "OpenAI (GPT-4o)", desc: "GTM analysis + intelligence generation", status: "live" },
                { name: "ChromaDB (RAG)", desc: "60+ vault notes indexed for retrieval", status: "live" },
                { name: "AWS App Runner", desc: "Backend compute + worker polling", status: "live" },
                { name: "GitHub", desc: "Repo creation from tweets, code deployment via Actions", status: "live" },
                { name: "Luma", desc: "Event creation, hackathon management, attendee tracking", status: "live" },
              ].map((item) => (
                <div key={item.name} className="flex items-start gap-3 rounded-lg border border-neutral-200 p-4">
                  <div className="mt-0.5 h-2 w-2 shrink-0 rounded-full bg-green-500" />
                  <div>
                    <p className="text-sm font-semibold">{item.name}</p>
                    <p className="mt-0.5 text-xs text-neutral-500">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Coming Soon */}
          <div className="mt-10">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.15em] text-neutral-400">
              Coming soon
            </p>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {[
                { name: "HubSpot", cat: "CRM", desc: "Bi-directional contact/deal sync, push lead scores" },
                { name: "Salesforce", cat: "CRM", desc: "Enterprise CRM sync, opportunity tracking" },
                { name: "Slack", cat: "Notifications", desc: "Signal alerts to sales channels, deal room updates" },
                { name: "Clay", cat: "Enrichment", desc: "Waterfall enrichment, AI research per account" },
                { name: "Apollo", cat: "Data + Outbound", desc: "275M+ contacts, email sequences, enrichment" },
                { name: "Instantly", cat: "Cold Email", desc: "Multi-mailbox outbound, deliverability optimization" },
                { name: "Attio", cat: "Modern CRM", desc: "Relational CRM for composable GTM stacks" },
                { name: "Common Room", cat: "Signals", desc: "50+ signal sources, Person360 identity resolution" },
                { name: "Unify", cat: "Signal Outbound", desc: "25+ signal types, automated plays" },
                { name: "Pocus", cat: "PLS", desc: "Product-qualified lead scoring from usage data" },
                { name: "Hightouch", cat: "Reverse ETL", desc: "Warehouse → CRM sync, composable CDP" },
                { name: "Snowflake / BigQuery", cat: "Data Warehouse", desc: "Source of truth for all GTM data" },
                { name: "Segment", cat: "Events", desc: "Product event collection and routing" },
                { name: "Stripe", cat: "Billing", desc: "Revenue events, expansion signals, churn detection" },
                { name: "LinkedIn", cat: "Outbound", desc: "Connection requests, InMail, engagement tracking" },
                { name: "Gong", cat: "Conversation Intel", desc: "Call analysis, MEDDIC scoring, deal risk" },
                { name: "Google Ads / Meta", cat: "Paid", desc: "Audience sync from warehouse segments" },
              ].map((item) => (
                <div key={item.name} className="flex items-start gap-3 rounded-lg border border-dashed border-neutral-200 p-4">
                  <div className="mt-0.5 h-2 w-2 shrink-0 rounded-full bg-neutral-300" />
                  <div>
                    <p className="text-sm font-semibold">
                      {item.name}
                      <span className="ml-2 rounded bg-neutral-100 px-1.5 py-0.5 text-[10px] font-medium text-neutral-400">
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
      <section className="border-t border-neutral-200 bg-neutral-50">
        <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-neutral-400">
            The problem
          </p>
          <h2 className="mt-2 font-serif text-3xl italic tracking-tight sm:text-4xl">
            GTM is broken
          </h2>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-neutral-500">
            The average B2B company uses 12-20 GTM tools. None of them talk to
            each other. Stardrop gives you the intelligence layer.
          </p>
          <div className="mt-12 grid gap-px overflow-hidden rounded-xl border border-neutral-200 bg-neutral-200 sm:grid-cols-3">
            {[
              { stat: "12–20", label: "GTM tools per company" },
              { stat: "30%", label: "CRM data decays per year" },
              { stat: "$85K+", label: "Fully loaded SDR cost" },
              { stat: "42hrs", label: "Median lead response time" },
              { stat: "77%", label: "Buy from AI-recommended vendor" },
              { stat: "120%+", label: "NRR at top companies" },
            ].map((item) => (
              <div
                key={item.label}
                className="bg-white p-6 text-center"
              >
                <p className="font-serif text-3xl italic text-neutral-900">
                  {item.stat}
                </p>
                <p className="mt-1 text-xs text-neutral-500">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-neutral-200">
        <div className="mx-auto max-w-4xl px-6 py-24 md:py-32 text-center">
          <h2 className="font-serif text-4xl italic tracking-tight sm:text-5xl">
            Try it now
          </h2>
          <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-neutral-500">
            Tag @stardroplin on X with any GTM question. Free. No signup. Just
            actionable intelligence backed by deep research.
          </p>
          <a
            href="https://x.com/intent/tweet?text=@stardroplin%20"
            target="_blank"
            className="mt-8 inline-block rounded-lg bg-neutral-900 px-8 py-3.5 text-sm font-medium text-white transition hover:bg-neutral-800 active:bg-black"
          >
            Tag @stardroplin on X
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-neutral-200 bg-neutral-50">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
          <span className="font-serif text-sm italic text-neutral-400">
            Stardrop
          </span>
          <div className="flex items-center gap-4 text-xs text-neutral-400">
            <a
              href="https://x.com/arichoudhary"
              target="_blank"
              className="transition hover:text-neutral-900"
            >
              @arichoudhary
            </a>
            <span>&bull;</span>
            <span>City Intelligence</span>
            <span>&bull;</span>
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
