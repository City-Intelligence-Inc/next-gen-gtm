export default function ResearchPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Nav */}
      <nav className="sticky top-0 z-40 border-b border-neutral-200 bg-white/95 backdrop-blur-sm">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <a href="/" className="font-serif text-xl italic text-neutral-900">Stardrop</a>
            <span className="rounded-md bg-neutral-100 px-2 py-0.5 text-xs font-medium text-neutral-500">Research</span>
          </div>
          <div className="flex items-center gap-4">
            <a href="/" className="text-sm text-neutral-500 transition hover:text-neutral-900">Home</a>
            <a href="/dashboard" className="text-sm text-neutral-500 transition hover:text-neutral-900">Dashboard</a>
            <a href="https://github.com/City-Intelligence-Inc/next-gen-gtm" target="_blank" className="rounded-lg bg-neutral-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-neutral-800">GitHub</a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="mx-auto max-w-3xl px-6 pt-20 pb-16">
        <p className="animate-fade-in text-xs font-medium uppercase tracking-[0.2em] text-neutral-400">2026-03-27</p>
        <h1 className="animate-fade-in-delay-1 mt-4 font-serif text-4xl italic leading-tight tracking-tight sm:text-5xl">
          Stardrop: Early Echoes of<br />Self-Evolving GTM
        </h1>
        <p className="animate-fade-in-delay-2 mt-6 text-lg leading-relaxed text-neutral-500">
          We built an AI agent that replies to GTM questions on X/Twitter. Then we made it improve itself —
          learning from every interaction, compounding 1% daily. This is the first system to apply self-evolving
          agent architecture to Go-To-Market.
        </p>
      </section>

      {/* Key visual — architecture diagram */}
      <section className="mx-auto max-w-3xl px-6 pb-16">
        <div className="animate-fade-in-scale overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-950 p-8 sm:p-12">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-neutral-500">Self-Improvement Loop</p>
          <div className="mt-6 font-mono text-sm leading-relaxed text-neutral-300">
            <div className="flex items-center gap-3">
              <span className="inline-block h-2 w-2 rounded-full bg-green-500" />
              <span className="text-white font-semibold">Observe</span>
              <span className="text-neutral-500">—</span>
              <span>Poll X/Twitter mentions every 60s</span>
            </div>
            <div className="ml-5 border-l border-neutral-700 pl-5 mt-3 pb-3">
              <div className="flex items-center gap-3">
                <span className="inline-block h-2 w-2 rounded-full bg-blue-500" />
                <span className="text-white font-semibold">Orient</span>
                <span className="text-neutral-500">—</span>
                <span>Detect intent (6 categories) + RAG retrieval (441 chunks)</span>
              </div>
            </div>
            <div className="ml-10 border-l border-neutral-700 pl-5 pb-3">
              <div className="flex items-center gap-3">
                <span className="inline-block h-2 w-2 rounded-full bg-purple-500" />
                <span className="text-white font-semibold">Decide</span>
                <span className="text-neutral-500">—</span>
                <span>GPT-4o generates response with learnings injected</span>
              </div>
            </div>
            <div className="ml-10 border-l border-neutral-700 pl-5 pb-3">
              <div className="flex items-center gap-3">
                <span className="inline-block h-2 w-2 rounded-full bg-amber-500" />
                <span className="text-white font-semibold">Act</span>
                <span className="text-neutral-500">—</span>
                <span>Post reply thread on X (OAuth 1.0a)</span>
              </div>
            </div>
            <div className="ml-5 border-l border-neutral-700 pl-5 pb-3">
              <div className="flex items-center gap-3">
                <span className="inline-block h-2 w-2 rounded-full bg-red-500" />
                <span className="text-white font-semibold">Learn</span>
                <span className="text-neutral-500">—</span>
                <span>Collect engagement after 1hr, extract patterns, feed back</span>
              </div>
            </div>
            <div className="mt-3 flex items-center gap-3">
              <span className="inline-block h-2 w-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-green-400 font-semibold">Repeat</span>
              <span className="text-neutral-500">—</span>
              <span className="text-neutral-400">System compounds. 1.01^365 = 37.78x</span>
            </div>
          </div>
        </div>
      </section>

      {/* Section 1: The Self-Improving Loop */}
      <section className="mx-auto max-w-3xl px-6 pb-20">
        <h2 className="font-serif text-3xl italic tracking-tight">1. Building an agent that improves itself</h2>
        <div className="mt-8 space-y-6 text-[16px] leading-[1.8] text-neutral-600">
          <p>
            Most AI agents are static. You deploy them, they perform at a fixed level, and the only way to improve
            is to manually retrain or rewrite prompts. Stardrop takes a different approach: every response becomes
            training data for the next one.
          </p>
          <p>
            The core loop is simple. When someone tags <span className="font-semibold text-neutral-900">@stardroplin</span> on
            X with a GTM question, the system detects intent (competitor intel, ICP analysis, signal detection, GTM
            roast, stack advice, or outbound generation), retrieves relevant knowledge from a 60-note research vault
            via RAG, and generates a response with GPT-4o. That response is posted as a reply thread.
          </p>
          <p>
            Then the interesting part: one hour later, the system checks back. How many likes? Replies? Retweets?
            Each response gets scored:
          </p>
          <div className="my-6 rounded-xl bg-neutral-50 border border-neutral-200 p-6 font-mono text-center text-lg">
            Score = Likes <span className="text-neutral-400">&times;</span> 3 + Replies <span className="text-neutral-400">&times;</span> 5 + Retweets <span className="text-neutral-400">&times;</span> 2
          </div>
          <p>
            Replies are weighted highest because they indicate genuine conversation — someone engaged enough to type
            a response. The top-performing patterns are extracted and injected back into the system prompt. The next
            response already knows what worked.
          </p>
          <p>
            This creates a closed loop: <span className="font-semibold text-neutral-900">respond → measure → learn → respond better</span>.
            No manual retraining. No prompt engineering sessions. The system evolves from its own interactions.
          </p>
        </div>
      </section>

      {/* Compound curve visual */}
      <section className="mx-auto max-w-3xl px-6 pb-20">
        <div className="overflow-hidden rounded-2xl border border-neutral-200">
          <div className="border-b border-neutral-200 bg-neutral-50 px-6 py-4">
            <p className="text-xs font-medium uppercase tracking-[0.15em] text-neutral-400">Compound Improvement Target</p>
            <p className="mt-1 text-sm text-neutral-500">1% better every day = 37.78x in one year</p>
          </div>
          <div className="bg-white p-6 sm:p-8">
            <div className="grid grid-cols-4 gap-4 text-center">
              {[
                { days: "Day 1", mult: "1.00x", bar: "2.5%" },
                { days: "Day 30", mult: "1.35x", bar: "10%" },
                { days: "Day 90", mult: "2.45x", bar: "25%" },
                { days: "Day 365", mult: "37.78x", bar: "100%" },
              ].map((item) => (
                <div key={item.days}>
                  <div className="mx-auto h-32 w-3 rounded-full bg-neutral-100 relative overflow-hidden">
                    <div
                      className="absolute bottom-0 w-full rounded-full bg-neutral-900 transition-all duration-1000"
                      style={{ height: item.bar }}
                    />
                  </div>
                  <p className="mt-3 font-mono text-lg font-semibold text-neutral-900">{item.mult}</p>
                  <p className="text-xs text-neutral-400">{item.days}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: HyDE */}
      <section className="mx-auto max-w-3xl px-6 pb-20">
        <h2 className="font-serif text-3xl italic tracking-tight">2. HyDE: Learning what &ldquo;good&rdquo; looks like</h2>
        <div className="mt-8 space-y-6 text-[16px] leading-[1.8] text-neutral-600">
          <p>
            The engagement feedback loop optimizes for what gets attention. But attention and quality aren&apos;t the
            same thing. A practitioner — someone who&apos;s done $36K to $2.4M ARR — knows the difference between
            a tweet that gets likes and advice that actually works.
          </p>
          <p>
            So we added a second mechanism: <span className="font-semibold text-neutral-900">Hypothetical Document Embedding</span> (Gao
            et al., 2022). When a practitioner marks a response as &ldquo;this is what good looks like,&rdquo; we embed
            it as a gold-standard document. For new queries, the system generates a hypothetical ideal response first,
            embeds it, and retrieves similar gold-standard docs to guide the actual output.
          </p>
          <p>
            The result: the system converges toward practitioner-quality responses without model retraining. The
            knowledge base itself evolves — accumulating exemplars of what excellence looks like in each intent category.
          </p>
        </div>

        {/* HyDE flow diagram */}
        <div className="mt-8 rounded-xl border border-neutral-200 bg-neutral-50 p-6 sm:p-8">
          <div className="space-y-4 font-mono text-sm">
            <div className="flex items-start gap-4">
              <span className="shrink-0 rounded bg-neutral-200 px-2 py-1 text-xs font-semibold">1</span>
              <div>
                <p className="font-semibold text-neutral-900">New query arrives</p>
                <p className="text-neutral-500">&ldquo;who should I sell to? we built a data pipeline tool&rdquo;</p>
              </div>
            </div>
            <div className="ml-5 border-l-2 border-neutral-300 pl-5 py-2">
              <div className="flex items-start gap-4">
                <span className="shrink-0 rounded bg-neutral-200 px-2 py-1 text-xs font-semibold">2</span>
                <div>
                  <p className="font-semibold text-neutral-900">Generate hypothetical ideal response</p>
                  <p className="text-neutral-500">GPT-4o drafts what the perfect answer would look like</p>
                </div>
              </div>
            </div>
            <div className="ml-5 border-l-2 border-neutral-300 pl-5 py-2">
              <div className="flex items-start gap-4">
                <span className="shrink-0 rounded bg-neutral-200 px-2 py-1 text-xs font-semibold">3</span>
                <div>
                  <p className="font-semibold text-neutral-900">Embed + retrieve gold-standard matches</p>
                  <p className="text-neutral-500">Find practitioner-approved responses similar to the hypothesis</p>
                </div>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <span className="shrink-0 rounded bg-neutral-900 text-white px-2 py-1 text-xs font-semibold">4</span>
              <div>
                <p className="font-semibold text-neutral-900">Generate final response guided by gold standards</p>
                <p className="text-neutral-500">Output shaped by what practitioners validated, not just what gets likes</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Six environments */}
      <section className="mx-auto max-w-3xl px-6 pb-20">
        <h2 className="font-serif text-3xl italic tracking-tight">3. Six environments, one agent</h2>
        <div className="mt-8 space-y-6 text-[16px] leading-[1.8] text-neutral-600">
          <p>
            Unlike academic benchmarks where agents operate in a single environment (a game, a code editor, a web browser),
            enterprise agents must orchestrate across many environments simultaneously. Each with its own API, authentication,
            data model, rate limits, and failure modes.
          </p>
          <p>
            We formalize this as <span className="font-semibold text-neutral-900">Environmental Engineering</span> — treating
            each SaaS tool as an environment with a defined interface. Stardrop currently connects to six live environments:
          </p>
        </div>

        <div className="mt-8 grid gap-3 sm:grid-cols-2">
          {[
            { name: "X / Twitter", level: "Level 3", desc: "Event-driven polling + engagement feedback", auth: "OAuth 1.0a" },
            { name: "OpenAI GPT-4o", level: "Level 2", desc: "Bi-directional with learnings injection", auth: "API Key" },
            { name: "ChromaDB", level: "Level 4", desc: "Self-improving via HyDE gold-standard accumulation", auth: "Local" },
            { name: "AWS App Runner", level: "Level 2", desc: "Compute + health monitoring", auth: "IAM" },
            { name: "GitHub", level: "Level 2", desc: "Repo creation from tweets, CI/CD", auth: "GitHub App" },
            { name: "Luma", level: "Level 1", desc: "Event creation, hackathon management", auth: "API Key" },
          ].map((env) => (
            <div key={env.name} className="rounded-xl border border-neutral-200 bg-white p-5">
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-neutral-900">{env.name}</p>
                <span className="rounded-full bg-neutral-100 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-neutral-500">
                  {env.level}
                </span>
              </div>
              <p className="mt-2 text-sm text-neutral-500">{env.desc}</p>
              <p className="mt-1 font-mono text-[11px] text-neutral-400">{env.auth}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 space-y-6 text-[16px] leading-[1.8] text-neutral-600">
          <p>
            Our maturity model defines five levels: Level 0 (disconnected) through Level 4 (self-improving). Twitter
            operates at Level 3 — event-driven with engagement feedback. ChromaDB has reached Level 4 — the RAG
            knowledge base self-improves through HyDE. Eighteen more environments are planned, from Salesforce and
            HubSpot to Clay, Apollo, and Instantly.
          </p>
          <p>
            In building this, we found that <span className="font-semibold text-neutral-900">70%+ of development time</span> was
            spent on environment configuration — Twitter OAuth alone took more hours than the entire RAG pipeline,
            intent detection, and response generation combined. This is why formalizing the configuration problem matters.
          </p>
        </div>
      </section>

      {/* Section 4: Knowledge architecture */}
      <section className="mx-auto max-w-3xl px-6 pb-20">
        <h2 className="font-serif text-3xl italic tracking-tight">4. 60 notes, 441 chunks, one practitioner voice</h2>
        <div className="mt-8 space-y-6 text-[16px] leading-[1.8] text-neutral-600">
          <p>
            The knowledge base is an Obsidian vault of 60+ curated markdown notes organized into 10 categories:
            concepts, motions, frameworks, tools, case studies, architecture, data infrastructure, signals, roles,
            and resources. Notes are interconnected via 116 wikilinks, forming a knowledge graph.
          </p>
          <p>
            Each note is chunked into segments of 800 characters with 100-character overlap, yielding 441 indexed
            chunks embedded with all-MiniLM-L6-v2 in ChromaDB. At query time, we retrieve top-8 by cosine similarity,
            deduplicated by source title.
          </p>
          <p>
            The vault includes practitioner profiles that calibrate voice. Bo Mohazzabi&apos;s profile — VP GTM at
            Coframe, $36K to $2.4M ARR (67x growth), 264% of quota at Amplitude, built HaystacksAI (460% better
            intent detection) — is retrievable as RAG context. When this context is injected, the model shifts from
            generic advice to practitioner-credible specificity: naming specific tools with pricing, citing case study
            numbers, providing concrete this-week actions.
          </p>
        </div>

        {/* Stats grid */}
        <div className="mt-8 grid grid-cols-3 gap-px overflow-hidden rounded-xl border border-neutral-200 bg-neutral-200">
          {[
            { num: "60+", label: "Research notes", sub: "Obsidian vault" },
            { num: "441", label: "Indexed chunks", sub: "ChromaDB" },
            { num: "116", label: "Wikilinks", sub: "Knowledge graph" },
            { num: "6", label: "Case studies", sub: "Ramp, Figma, Datadog..." },
            { num: "10", label: "Categories", sub: "Concepts to signals" },
            { num: "8", label: "Chunks retrieved", sub: "Per query, deduplicated" },
          ].map((item) => (
            <div key={item.label} className="bg-white p-5 text-center">
              <p className="font-serif text-2xl italic text-neutral-900">{item.num}</p>
              <p className="mt-1 text-xs font-semibold text-neutral-700">{item.label}</p>
              <p className="text-[10px] text-neutral-400">{item.sub}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Section 5: Results */}
      <section className="mx-auto max-w-3xl px-6 pb-20">
        <h2 className="font-serif text-3xl italic tracking-tight">5. Baseline vs. Stardrop</h2>
        <div className="mt-8 space-y-6 text-[16px] leading-[1.8] text-neutral-600">
          <p>
            We compare Stardrop (GPT-4o + RAG + vault + learnings) against baseline GPT-4o with a generic system prompt.
            The difference is structural, not cosmetic.
          </p>
        </div>

        {/* Comparison card */}
        <div className="mt-8 space-y-4">
          <div className="rounded-xl border border-neutral-200 overflow-hidden">
            <div className="bg-neutral-50 px-6 py-3 border-b border-neutral-200">
              <p className="text-xs font-semibold uppercase tracking-[0.15em] text-neutral-400">Query: &ldquo;who should I sell to? we built an AI code review tool&rdquo;</p>
            </div>
            <div className="grid sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-neutral-200">
              <div className="p-6">
                <p className="text-[10px] font-semibold uppercase tracking-widest text-red-400 mb-3">Baseline GPT-4o</p>
                <p className="text-sm leading-relaxed text-neutral-500 italic">
                  &ldquo;You should target software development teams at mid-size companies. Focus on companies that
                  do a lot of code reviews and could benefit from automation. Try reaching out to engineering leaders.&rdquo;
                </p>
                <p className="mt-3 text-[10px] text-neutral-300">No tools named. No numbers. No action plan.</p>
              </div>
              <div className="p-6 bg-neutral-50/30">
                <p className="text-[10px] font-semibold uppercase tracking-widest text-green-600 mb-3">Stardrop</p>
                <div className="text-sm leading-relaxed text-neutral-700 space-y-2">
                  <p><span className="font-semibold">Target:</span> Engineering Managers at B2B SaaS (50-500 employees). 15+ PRs/day, review bottlenecks.</p>
                  <p><span className="font-semibold">Signal:</span> Companies posting &ldquo;hiring senior engineers&rdquo; = growing team, more review pain.</p>
                  <p><span className="font-semibold">Outreach:</span> Email VP Eng: &ldquo;Your PR review time is 3x what it should be&rdquo;</p>
                  <p><span className="font-semibold">This week:</span> Apollo → 50 Engineering Managers at Series A-B. Instantly → 10 emails referencing GitHub activity.</p>
                </div>
                <p className="mt-3 text-[10px] text-neutral-400">Specific tools, specific numbers, specific action this week.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 space-y-6 text-[16px] leading-[1.8] text-neutral-600">
          <p>
            Preliminary analysis shows &gt;80% of Stardrop responses reference at least one vault fact (tool with
            pricing, case study number, framework name), compared to &lt;10% for baseline. Intent detection via regex
            achieves &gt;90% accuracy on clear queries.
          </p>
        </div>
      </section>

      {/* Section 6: Coframe pipeline */}
      <section className="mx-auto max-w-3xl px-6 pb-20">
        <h2 className="font-serif text-3xl italic tracking-tight">6. The Coframe + HaystacksAI pipeline</h2>
        <div className="mt-8 space-y-6 text-[16px] leading-[1.8] text-neutral-600">
          <p>
            In early 2026, Coframe acquired HaystacksAI, creating a three-stage pipeline that independently validated
            the environmental engineering pattern. Three systems, three teams, one architecture:
          </p>
        </div>

        <div className="mt-8 rounded-xl border border-neutral-200 bg-neutral-950 p-8">
          <div className="grid gap-6 sm:grid-cols-3 text-center">
            {[
              { name: "HaystacksAI", role: "Signal", desc: "LLM behavioral analysis on GitHub/LinkedIn", stat: "460% better intent detection" },
              { name: "Stardrop", role: "Intelligence", desc: "RAG + GPT-4o GTM advice from 60-note vault", stat: "6 live environments" },
              { name: "Coframe", role: "Conversion", desc: "Multi-agent autonomous A/B testing", stat: "10x experiment volume" },
            ].map((item, i) => (
              <div key={item.name}>
                <p className="text-[10px] font-semibold uppercase tracking-widest text-neutral-500">{item.role}</p>
                <p className="mt-2 text-lg font-semibold text-white">{item.name}</p>
                <p className="mt-2 text-sm text-neutral-400">{item.desc}</p>
                <p className="mt-3 font-mono text-xs text-green-400">{item.stat}</p>
                {i < 2 && (
                  <p className="mt-4 text-2xl text-neutral-600 hidden sm:block">&#8594;</p>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 space-y-6 text-[16px] leading-[1.8] text-neutral-600">
          <p>
            None of the builders had read a framework for environmental engineering. They arrived at the pattern through
            practitioner intuition — suggesting the framework we formalize captures a genuine structural property of how
            enterprise AI agents get deployed.
          </p>
          <p>
            The cross-system flywheel: better signal detection (HaystacksAI) feeds better intelligence (Stardrop), which
            feeds better conversion (Coframe), which generates more data — which feeds better signals. Compound improvement
            across systems may exceed what any single feedback loop can achieve.
          </p>
        </div>
      </section>

      {/* Section 7: The paper */}
      <section className="mx-auto max-w-3xl px-6 pb-20">
        <h2 className="font-serif text-3xl italic tracking-tight">7. The paper</h2>
        <div className="mt-8 space-y-6 text-[16px] leading-[1.8] text-neutral-600">
          <p>
            We&apos;re formalizing this as an academic paper: <em>&ldquo;Environmental Engineering for Go-To-Market Systems:
            A Framework for Configuring, Orchestrating, and Self-Improving Multi-Environment AI Agents.&rdquo;</em>
          </p>
          <p>
            Target: NeurIPS 2026 / arXiv cs.AI. Authors: Arihant Choudhary (Stanford, City Intelligence), Bo Mohazzabi
            (VP GTM, Coframe), Josh Payne (CEO, Coframe).
          </p>
          <p>Contributions:</p>
          <ol className="list-decimal pl-6 space-y-2">
            <li>Formal definitions — Environment, Configuration, and GTM System tuples</li>
            <li>Environment taxonomy — seven classes that predict interface patterns</li>
            <li>Progressive maturity model — Level 0 to Level 4</li>
            <li>Implemented self-improvement — three mechanisms running in production</li>
            <li>Independent validation — the Coframe pipeline proves practitioners converge on this pattern</li>
          </ol>
        </div>

        <div className="mt-8 flex gap-4">
          <a
            href="https://github.com/City-Intelligence-Inc/next-gen-gtm/blob/main/next-gen-gtm-vault/paper/paper.md"
            target="_blank"
            className="rounded-lg bg-neutral-900 px-6 py-3 text-sm font-medium text-white transition hover:bg-neutral-800"
          >
            Read the full paper
          </a>
          <a
            href="https://github.com/City-Intelligence-Inc/next-gen-gtm"
            target="_blank"
            className="rounded-lg border border-neutral-200 px-6 py-3 text-sm font-medium text-neutral-600 transition hover:border-neutral-300 hover:text-neutral-900"
          >
            View source code
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-neutral-200 bg-neutral-50">
        <div className="mx-auto flex max-w-3xl flex-col items-center justify-between gap-4 px-6 py-8 sm:flex-row">
          <span className="font-serif text-sm italic text-neutral-400">Stardrop Research</span>
          <div className="flex items-center gap-4 text-xs text-neutral-400">
            <a href="https://x.com/arichoudhary" target="_blank" className="transition hover:text-neutral-900">@arichoudhary</a>
            <span className="text-neutral-200">&bull;</span>
            <span>City Intelligence + Coframe</span>
            <span className="text-neutral-200">&bull;</span>
            <a href="https://github.com/City-Intelligence-Inc/next-gen-gtm" target="_blank" className="transition hover:text-neutral-900">GitHub</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
