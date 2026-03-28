export default function DashboardOverview() {
  return (
    <div className="px-6 py-8 md:px-10 md:py-10 max-w-6xl">
      {/* Header */}
      <div className="mb-8">
        <p className="text-xs font-medium uppercase tracking-[0.15em] text-neutral-400">
          Dashboard
        </p>
        <h1 className="mt-1 font-serif text-3xl italic tracking-tight text-neutral-900">
          Overview
        </h1>
        <p className="mt-2 text-sm text-neutral-500">
          Real-time view of Stardrop&apos;s GTM agent activity across all environments.
        </p>
      </div>

      {/* Stats cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: "Mentions today", value: "24", change: "+12%", up: true },
          { label: "Replies sent", value: "18", change: "+8%", up: true },
          { label: "Avg. engagement", value: "4.2x", change: "+0.3x", up: true },
          { label: "Learnings", value: "147", change: "+6 this week", up: true },
        ].map((stat) => (
          <div
            key={stat.label}
            className="rounded-xl border border-neutral-200 bg-white p-5"
          >
            <p className="text-xs font-medium text-neutral-400">{stat.label}</p>
            <p className="mt-2 font-serif text-3xl italic text-neutral-900">
              {stat.value}
            </p>
            <p
              className={`mt-1 text-xs ${
                stat.up ? "text-green-600" : "text-red-500"
              }`}
            >
              {stat.change}
            </p>
          </div>
        ))}
      </div>

      {/* Two-column layout */}
      <div className="mt-8 grid gap-8 lg:grid-cols-[2fr_1fr]">
        {/* Recent mentions feed */}
        <div>
          <h2 className="mb-4 text-sm font-semibold text-neutral-900">
            Recent mentions
          </h2>
          <div className="space-y-3">
            {[
              {
                user: "@founderAI",
                text: "@stardroplin who should I sell to? We built a DevOps observability tool for mid-market.",
                time: "3m ago",
                intent: "ICP Analysis",
                status: "replied",
                engagement: "12 likes, 3 replies",
              },
              {
                user: "@saas_growth",
                text: "@stardroplin roast my GTM strategy. We're doing PLG but conversion is 0.5%.",
                time: "18m ago",
                intent: "GTM Roast",
                status: "replied",
                engagement: "28 likes, 7 replies",
              },
              {
                user: "@series_a_ceo",
                text: "@stardroplin analyze competitor @lattice — we're building performance management for remote teams",
                time: "42m ago",
                intent: "Competitor Intel",
                status: "replied",
                engagement: "8 likes, 2 replies",
              },
              {
                user: "@devtool_builder",
                text: "@stardroplin what GTM stack should I use? Early stage, 3 person team, $0 budget.",
                time: "1h ago",
                intent: "Stack Advisor",
                status: "replied",
                engagement: "15 likes, 4 replies",
              },
              {
                user: "@enterprise_rep",
                text: "@stardroplin find buying signals for companies adopting AI code review tools",
                time: "2h ago",
                intent: "Signal Detection",
                status: "replied",
                engagement: "6 likes, 1 reply",
              },
            ].map((mention, i) => (
              <div
                key={i}
                className="rounded-xl border border-neutral-200 bg-white p-4 transition hover:border-neutral-300"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3 min-w-0">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-neutral-100 text-xs font-semibold text-neutral-500">
                      {mention.user[1].toUpperCase()}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-neutral-900">
                          {mention.user}
                        </span>
                        <span className="text-xs text-neutral-400">
                          {mention.time}
                        </span>
                      </div>
                      <p className="mt-0.5 text-sm text-neutral-600 leading-relaxed">
                        {mention.text}
                      </p>
                      <div className="mt-2 flex items-center gap-2">
                        <span className="rounded-md bg-neutral-100 px-2 py-0.5 text-[10px] font-medium text-neutral-500 uppercase">
                          {mention.intent}
                        </span>
                        <span className="text-[10px] text-neutral-400">
                          {mention.engagement}
                        </span>
                      </div>
                    </div>
                  </div>
                  <span
                    className={`shrink-0 rounded-full px-2.5 py-0.5 text-[10px] font-medium ${
                      mention.status === "replied"
                        ? "bg-green-50 text-green-700"
                        : "bg-yellow-50 text-yellow-700"
                    }`}
                  >
                    {mention.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right column */}
        <div className="space-y-6">
          {/* Agent status */}
          <div className="rounded-xl border border-neutral-200 bg-white p-5">
            <h3 className="text-sm font-semibold text-neutral-900 mb-4">
              Agent status
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-neutral-500">X / Twitter</span>
                <span className="flex items-center gap-1.5 text-xs text-green-600">
                  <span className="inline-block h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
                  Live
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-neutral-500">OpenAI</span>
                <span className="flex items-center gap-1.5 text-xs text-green-600">
                  <span className="inline-block h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
                  Connected
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-neutral-500">ChromaDB</span>
                <span className="flex items-center gap-1.5 text-xs text-green-600">
                  <span className="inline-block h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
                  441 chunks
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-neutral-500">Poll interval</span>
                <span className="text-xs text-neutral-500 font-mono">60s</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-neutral-500">Last poll</span>
                <span className="text-xs text-neutral-500">12s ago</span>
              </div>
            </div>
          </div>

          {/* Recent learnings */}
          <div className="rounded-xl border border-neutral-200 bg-white p-5">
            <h3 className="text-sm font-semibold text-neutral-900 mb-4">
              Recent learnings
            </h3>
            <div className="space-y-3">
              {[
                {
                  learning: "DevOps ICP responds best to quantified pain points (e.g., MTTR, deployment frequency)",
                  source: "3 mentions",
                  time: "2h ago",
                },
                {
                  learning: "Series A founders prefer Clay + Instantly stack over Apollo all-in-one",
                  source: "5 mentions",
                  time: "6h ago",
                },
                {
                  learning: "PLG roast responses with conversion benchmarks get 3x more engagement",
                  source: "8 mentions",
                  time: "1d ago",
                },
                {
                  learning: "Hiring signals (VP Sales postings) correlate with 2x higher reply rates",
                  source: "12 mentions",
                  time: "2d ago",
                },
              ].map((item, i) => (
                <div key={i} className="border-l-2 border-neutral-200 pl-3">
                  <p className="text-sm text-neutral-700 leading-relaxed">
                    {item.learning}
                  </p>
                  <p className="mt-1 text-[10px] text-neutral-400">
                    {item.source} &middot; {item.time}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Intent distribution */}
          <div className="rounded-xl border border-neutral-200 bg-white p-5">
            <h3 className="text-sm font-semibold text-neutral-900 mb-4">
              Intent distribution
            </h3>
            <div className="space-y-2.5">
              {[
                { label: "ICP Analysis", pct: 32 },
                { label: "Competitor Intel", pct: 24 },
                { label: "GTM Roast", pct: 18 },
                { label: "Signal Detection", pct: 14 },
                { label: "Stack Advisor", pct: 8 },
                { label: "Outbound Gen", pct: 4 },
              ].map((item) => (
                <div key={item.label}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-neutral-600">{item.label}</span>
                    <span className="text-xs font-mono text-neutral-400">
                      {item.pct}%
                    </span>
                  </div>
                  <div className="h-1.5 w-full rounded-full bg-neutral-100">
                    <div
                      className="h-1.5 rounded-full bg-neutral-900 transition-all duration-500"
                      style={{ width: `${item.pct}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
