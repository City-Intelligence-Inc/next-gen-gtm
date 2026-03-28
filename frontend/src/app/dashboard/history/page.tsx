export default function HistoryPage() {
  const mentions = [
    {
      id: "m-001",
      user: "@founderAI",
      avatar: "F",
      text: "@stardroplin who should I sell to? We built a DevOps observability tool for mid-market.",
      time: "Mar 27, 2026 · 2:14 PM",
      intent: "ICP Analysis",
      response:
        "Target: VP Engineering at B2B SaaS (200-1000 employees). They're drowning in alert noise — 500+ alerts/day, 45min MTTR. Signal: Companies posting 'hiring SRE' = scaling infra, more observability pain. Outreach: Email VP Eng with subject 'Your MTTR is 3x industry average.' This week: Use Clay to find 50 VP Engs at Series B+ SaaS. Enrich with Apollo, send via Instantly.",
      engagement: { likes: 12, replies: 3, retweets: 2, impressions: 1840 },
      score: 8.4,
      sources: ["Signal-Based Selling", "ICP Framework", "Case Study - Datadog"],
    },
    {
      id: "m-002",
      user: "@saas_growth",
      avatar: "S",
      text: "@stardroplin roast my GTM strategy. We're doing PLG but conversion is 0.5%.",
      time: "Mar 27, 2026 · 1:56 PM",
      intent: "GTM Roast",
      response:
        "0.5% conversion means you have a monetization problem, not a growth problem. Benchmark: PLG leaders see 2-5% free-to-paid. Three issues: (1) Your activation metric is probably wrong — track 'aha moment' not signups. (2) No PQL scoring — you're treating all free users the same. (3) No sales-assist layer. Fix: Add Pocus for PQL scoring, trigger Slack alerts when usage spikes, have AE reach out within 5 min. Companies like Notion went from 0.3% to 4.2% with this motion.",
      engagement: { likes: 28, replies: 7, retweets: 5, impressions: 3420 },
      score: 9.1,
      sources: ["PLG Deep Dive", "GTM Pain Points", "Case Study - Notion"],
    },
    {
      id: "m-003",
      user: "@series_a_ceo",
      avatar: "S",
      text: "@stardroplin analyze competitor @lattice — we're building performance management for remote teams",
      time: "Mar 27, 2026 · 1:32 PM",
      intent: "Competitor Intel",
      response:
        "Lattice: $150M+ ARR, 5000+ customers, recently launched AI performance reviews. Strengths: brand recognition, integrations (Slack, HRIS). Weakness: enterprise-focused pricing ($11/seat/mo), slow to adapt to async/remote workflows. Your wedge: Remote-first performance management is underserved. Target companies with >50% remote workforce. Counter-move: Offer async 360 reviews with timezone-aware nudges. Differentiate on price ($5/seat) and remote-native features.",
      engagement: { likes: 8, replies: 2, retweets: 1, impressions: 920 },
      score: 7.8,
      sources: ["Competitive Analysis Framework", "Case Study - Lattice", "Remote Work GTM"],
    },
    {
      id: "m-004",
      user: "@devtool_builder",
      avatar: "D",
      text: "@stardroplin what GTM stack should I use? Early stage, 3 person team, $0 budget.",
      time: "Mar 27, 2026 · 12:48 PM",
      intent: "Stack Advisor",
      response:
        "At $0 budget with 3 people, go composable and free-tier: (1) CRM: Attio free tier (modern, relational, 3 seats free). (2) Enrichment: Clay free tier (100 credits/mo — enough for 50 enriched leads). (3) Outbound: Instantly trial + personal Gmail for warm outreach. (4) Signals: Set up Google Alerts + Twitter Lists for buying signals manually. (5) Analytics: PostHog free tier for product analytics. Skip Apollo until you hit $5K MRR. This stack costs $0 and handles your first 100 customers.",
      engagement: { likes: 15, replies: 4, retweets: 3, impressions: 2100 },
      score: 8.7,
      sources: ["Composable GTM Stack", "Tool Profiles", "Early Stage GTM"],
    },
    {
      id: "m-005",
      user: "@enterprise_rep",
      avatar: "E",
      text: "@stardroplin find buying signals for companies adopting AI code review tools",
      time: "Mar 27, 2026 · 11:20 AM",
      intent: "Signal Detection",
      response:
        "Top buying signals for AI code review adoption: (1) Hiring: 'Senior Engineer' or 'Engineering Manager' postings = growing team, more PR volume. (2) Tech: GitHub Copilot mentions in job descriptions = AI-forward engineering culture. (3) Pain: Tweets/LinkedIn posts complaining about PR review bottlenecks. (4) Funding: Series A-B in last 6 months = scaling engineering. (5) Stack: Companies using GitHub Enterprise + CI/CD tools. Set up Clay table with these 5 signals, enrich with Apollo, score leads 1-5 based on signal overlap.",
      engagement: { likes: 6, replies: 1, retweets: 0, impressions: 680 },
      score: 7.2,
      sources: ["Signal-Based Selling Deep Dive", "Signal Taxonomy", "Data Enrichment Waterfall"],
    },
    {
      id: "m-006",
      user: "@growth_hacker",
      avatar: "G",
      text: "@stardroplin turn this into outbound: We help e-commerce brands reduce return rates by 40% using AI-powered size recommendations",
      time: "Mar 27, 2026 · 10:05 AM",
      intent: "Outbound Generator",
      response:
        "Cold email: Subject: 'Your return rate is costing you $2M/year' — Body: 'Hi [Name], [Company] processed ~$X in returns last quarter. Our AI sizing tool cut return rates 40% for [similar brand]. Worth 15 min?' LinkedIn: 'Saw [Company] launched new sizing — curious if you're seeing the industry avg 30% return rate? We helped [brand] cut that to 18%.' Follow-up (Day 3): Share a case study link. Follow-up (Day 7): 'No pressure — just figured the $2M/year in returns number would get your attention.'",
      engagement: { likes: 19, replies: 5, retweets: 4, impressions: 2780 },
      score: 8.9,
      sources: ["AI SDR Agents", "Cold Email Frameworks", "Data Enrichment Waterfall"],
    },
  ];

  return (
    <div className="px-6 py-8 md:px-10 md:py-10 max-w-6xl">
      {/* Header */}
      <div className="mb-8">
        <p className="text-xs font-medium uppercase tracking-[0.15em] text-neutral-400">
          Dashboard
        </p>
        <h1 className="mt-1 font-serif text-3xl italic tracking-tight text-neutral-900">
          History
        </h1>
        <p className="mt-2 text-sm text-neutral-500">
          All mentions and Stardrop&apos;s responses with engagement metrics.
        </p>
      </div>

      {/* Summary bar */}
      <div className="mb-6 flex flex-wrap items-center gap-4 rounded-xl border border-neutral-200 bg-neutral-50 px-5 py-3">
        <div>
          <span className="text-xs text-neutral-400">Total mentions</span>
          <p className="text-lg font-semibold text-neutral-900">142</p>
        </div>
        <div className="h-8 w-px bg-neutral-200" />
        <div>
          <span className="text-xs text-neutral-400">Avg. score</span>
          <p className="text-lg font-semibold text-neutral-900">8.2</p>
        </div>
        <div className="h-8 w-px bg-neutral-200" />
        <div>
          <span className="text-xs text-neutral-400">Avg. engagement</span>
          <p className="text-lg font-semibold text-neutral-900">4.2x</p>
        </div>
        <div className="h-8 w-px bg-neutral-200" />
        <div>
          <span className="text-xs text-neutral-400">Response rate</span>
          <p className="text-lg font-semibold text-neutral-900">100%</p>
        </div>
      </div>

      {/* Filters */}
      <div className="mb-6 flex flex-wrap items-center gap-2">
        {["All", "ICP Analysis", "Competitor Intel", "GTM Roast", "Signal Detection", "Stack Advisor", "Outbound Gen"].map(
          (filter, i) => (
            <button
              key={filter}
              className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
                i === 0
                  ? "bg-neutral-900 text-white"
                  : "bg-neutral-100 text-neutral-500 hover:bg-neutral-200 hover:text-neutral-700"
              }`}
            >
              {filter}
            </button>
          )
        )}
      </div>

      {/* Mention list */}
      <div className="space-y-4">
        {mentions.map((mention) => (
          <div
            key={mention.id}
            className="rounded-xl border border-neutral-200 bg-white transition hover:border-neutral-300"
          >
            {/* Original mention */}
            <div className="p-5">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-neutral-100 text-sm font-semibold text-neutral-500">
                  {mention.avatar}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-neutral-900">
                      {mention.user}
                    </span>
                    <span className="text-xs text-neutral-400">{mention.time}</span>
                  </div>
                  <p className="mt-1 text-sm text-neutral-600 leading-relaxed">
                    {mention.text}
                  </p>
                </div>
                <span className="shrink-0 rounded-md bg-neutral-100 px-2 py-0.5 text-[10px] font-medium text-neutral-500 uppercase">
                  {mention.intent}
                </span>
              </div>
            </div>

            {/* Response */}
            <div className="border-t border-neutral-100 bg-neutral-50/50 p-5">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-neutral-900 text-sm font-bold text-white">
                  S
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-neutral-900">
                      @stardroplin
                    </span>
                    <span className="text-xs text-neutral-400">reply</span>
                  </div>
                  <p className="mt-1 text-sm text-neutral-600 leading-relaxed">
                    {mention.response}
                  </p>

                  {/* Sources */}
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {mention.sources.map((source) => (
                      <span
                        key={source}
                        className="rounded bg-neutral-100 px-2 py-0.5 text-[10px] text-neutral-400"
                      >
                        {source}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Metrics footer */}
            <div className="flex flex-wrap items-center gap-4 border-t border-neutral-100 px-5 py-3">
              <div className="flex items-center gap-1.5">
                <span className="text-xs text-neutral-400">Score</span>
                <span
                  className={`text-xs font-semibold ${
                    mention.score >= 8.5
                      ? "text-green-600"
                      : mention.score >= 7
                        ? "text-neutral-700"
                        : "text-yellow-600"
                  }`}
                >
                  {mention.score}
                </span>
              </div>
              <div className="h-3 w-px bg-neutral-200" />
              <span className="text-xs text-neutral-400">
                {mention.engagement.likes} likes
              </span>
              <span className="text-xs text-neutral-400">
                {mention.engagement.replies} replies
              </span>
              <span className="text-xs text-neutral-400">
                {mention.engagement.retweets} retweets
              </span>
              <span className="text-xs text-neutral-400">
                {mention.engagement.impressions.toLocaleString()} impressions
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
