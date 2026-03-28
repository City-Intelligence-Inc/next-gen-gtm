export default function EnvironmentsPage() {
  const liveEnvironments = [
    {
      name: "X / Twitter",
      category: "Social",
      desc: "Mention detection + auto-reply via OAuth 1.0a",
      detail: "Polls every 60s, dedupes, checks for existing replies",
      status: "live" as const,
      metrics: { requests: "2.4K/day", uptime: "99.9%", latency: "1.2s" },
    },
    {
      name: "OpenAI (GPT-4o)",
      category: "AI",
      desc: "GTM analysis + intelligence generation",
      detail: "RAG-augmented prompts with domain knowledge",
      status: "live" as const,
      metrics: { requests: "180/day", uptime: "99.8%", latency: "3.4s" },
    },
    {
      name: "ChromaDB (RAG)",
      category: "Knowledge",
      desc: "60+ vault notes indexed (441 chunks)",
      detail: "all-MiniLM-L6-v2 embeddings, cosine similarity, top-8 retrieval",
      status: "live" as const,
      metrics: { requests: "180/day", uptime: "100%", latency: "45ms" },
    },
    {
      name: "AWS App Runner",
      category: "Compute",
      desc: "Backend compute + worker polling",
      detail: "0.25 vCPU, auto-scales, health-checked",
      status: "live" as const,
      metrics: { requests: "8.6K/day", uptime: "99.9%", latency: "120ms" },
    },
    {
      name: "GitHub",
      category: "Code",
      desc: "Repo creation from tweets, CI/CD via Actions",
      detail: "GitHub App integration with private key auth",
      status: "live" as const,
      metrics: { requests: "24/day", uptime: "99.9%", latency: "2.1s" },
    },
    {
      name: "Luma",
      category: "Events",
      desc: "Event creation, hackathon management",
      detail: "Attendee tracking, event scheduling",
      status: "live" as const,
      metrics: { requests: "12/day", uptime: "99.5%", latency: "1.8s" },
    },
  ];

  const comingSoonEnvironments = [
    { name: "HubSpot", category: "CRM", desc: "Bi-directional contact/deal sync, push lead scores", priority: "high" },
    { name: "Salesforce", category: "CRM", desc: "Enterprise CRM sync, opportunity tracking", priority: "high" },
    { name: "Slack", category: "Notifications", desc: "Signal alerts to sales channels, deal room updates", priority: "high" },
    { name: "Clay", category: "Enrichment", desc: "Waterfall enrichment across 50+ data providers", priority: "high" },
    { name: "Apollo", category: "Data + Outbound", desc: "275M+ contacts, email sequences, Vibe GTM agents", priority: "high" },
    { name: "Instantly", category: "Cold Email", desc: "Multi-mailbox outbound, deliverability optimization", priority: "medium" },
    { name: "Attio", category: "Modern CRM", desc: "Relational CRM for composable GTM stacks", priority: "medium" },
    { name: "Common Room", category: "Signals", desc: "50+ signal sources, Person360 identity resolution", priority: "medium" },
    { name: "Unify", category: "Signal Outbound", desc: "25+ signal types, automated plays", priority: "medium" },
    { name: "Pocus", category: "PLS", desc: "Product-qualified lead scoring from usage data", priority: "medium" },
    { name: "Hightouch", category: "Reverse ETL", desc: "Warehouse-to-CRM sync, composable CDP", priority: "low" },
    { name: "Snowflake", category: "Data Warehouse", desc: "Source of truth for all GTM data", priority: "low" },
    { name: "Segment", category: "Events", desc: "Product event collection and routing", priority: "low" },
    { name: "Stripe", category: "Billing", desc: "Revenue events, expansion/churn signals", priority: "medium" },
    { name: "LinkedIn", category: "Outbound", desc: "Connection requests, InMail, engagement tracking", priority: "high" },
    { name: "Gong", category: "Conversation Intel", desc: "Call analysis, MEDDIC scoring, deal risk", priority: "medium" },
    { name: "Google Ads + Meta", category: "Paid", desc: "Audience sync from warehouse segments", priority: "low" },
    { name: "Intercom", category: "Support", desc: "Live chat, support ticket signal detection", priority: "low" },
    { name: "Clearbit", category: "Enrichment", desc: "Company and person data enrichment, reveal", priority: "medium" },
    { name: "ZoomInfo", category: "Data", desc: "B2B contact database, intent data signals", priority: "medium" },
    { name: "Outreach", category: "Sales Engagement", desc: "Multi-channel sequences, A/B testing, analytics", priority: "medium" },
    { name: "Drift", category: "Conversational", desc: "Chat bots, meeting scheduling, pipeline acceleration", priority: "low" },
    { name: "G2", category: "Review Signals", desc: "Buyer intent signals from review site activity", priority: "medium" },
    { name: "Notion", category: "Docs", desc: "Sync GTM playbooks and competitive battle cards", priority: "low" },
  ];

  return (
    <div className="px-6 py-8 md:px-10 md:py-10 max-w-6xl">
      {/* Header */}
      <div className="mb-8">
        <p className="text-xs font-medium uppercase tracking-[0.15em] text-neutral-400">
          Dashboard
        </p>
        <h1 className="mt-1 font-serif text-3xl italic tracking-tight text-neutral-900">
          Environments
        </h1>
        <p className="mt-2 text-sm text-neutral-500">
          Every GTM system is an environment. Connect, authenticate, and monitor each integration.
        </p>
      </div>

      {/* Summary */}
      <div className="mb-8 flex flex-wrap items-center gap-4 rounded-xl border border-neutral-200 bg-neutral-50 px-5 py-3">
        <div>
          <span className="text-xs text-neutral-400">Total</span>
          <p className="text-lg font-semibold text-neutral-900">
            {liveEnvironments.length + comingSoonEnvironments.length}
          </p>
        </div>
        <div className="h-8 w-px bg-neutral-200" />
        <div>
          <span className="text-xs text-neutral-400">Live</span>
          <p className="text-lg font-semibold text-green-600">{liveEnvironments.length}</p>
        </div>
        <div className="h-8 w-px bg-neutral-200" />
        <div>
          <span className="text-xs text-neutral-400">Coming soon</span>
          <p className="text-lg font-semibold text-neutral-500">
            {comingSoonEnvironments.length}
          </p>
        </div>
      </div>

      {/* Live environments */}
      <div className="mb-10">
        <div className="mb-4 flex items-center gap-2">
          <span className="inline-block h-2 w-2 rounded-full bg-green-500" />
          <h2 className="text-sm font-semibold text-neutral-900">
            Live environments
          </h2>
          <span className="text-xs text-neutral-400">
            {liveEnvironments.length} connected
          </span>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {liveEnvironments.map((env) => (
            <div
              key={env.name}
              className="rounded-xl border border-neutral-200 bg-white p-5 transition hover:border-neutral-300 hover:shadow-sm"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-sm font-semibold text-neutral-900">
                    {env.name}
                  </h3>
                  <span className="mt-0.5 inline-block rounded bg-neutral-100 px-1.5 py-0.5 text-[10px] font-medium text-neutral-400 uppercase">
                    {env.category}
                  </span>
                </div>
                <span className="flex items-center gap-1.5 rounded-full bg-green-50 px-2 py-0.5 text-[10px] font-medium text-green-700">
                  <span className="inline-block h-1.5 w-1.5 rounded-full bg-green-500" />
                  Live
                </span>
              </div>
              <p className="mt-3 text-xs text-neutral-500 leading-relaxed">
                {env.desc}
              </p>
              <p className="mt-1 text-[10px] text-neutral-400">{env.detail}</p>

              {/* Metrics */}
              <div className="mt-4 grid grid-cols-3 gap-2 border-t border-neutral-100 pt-3">
                <div>
                  <p className="text-[10px] text-neutral-400">Requests</p>
                  <p className="text-xs font-medium text-neutral-700">
                    {env.metrics.requests}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] text-neutral-400">Uptime</p>
                  <p className="text-xs font-medium text-neutral-700">
                    {env.metrics.uptime}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] text-neutral-400">Latency</p>
                  <p className="text-xs font-medium text-neutral-700">
                    {env.metrics.latency}
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="mt-4 flex gap-2">
                <button className="flex-1 rounded-md bg-neutral-900 px-3 py-1.5 text-xs font-medium text-white transition hover:bg-neutral-800">
                  Configure
                </button>
                <button className="rounded-md border border-neutral-200 px-3 py-1.5 text-xs text-neutral-500 transition hover:border-neutral-300 hover:text-neutral-700">
                  Logs
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Coming soon environments */}
      <div>
        <div className="mb-4 flex items-center gap-2">
          <span className="inline-block h-2 w-2 rounded-full bg-neutral-300" />
          <h2 className="text-sm font-semibold text-neutral-900">
            Coming soon
          </h2>
          <span className="text-xs text-neutral-400">
            {comingSoonEnvironments.length} planned
          </span>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {comingSoonEnvironments.map((env) => (
            <div
              key={env.name}
              className="flex items-start gap-3 rounded-xl border border-dashed border-neutral-200 bg-white/50 p-4 transition hover:border-neutral-300"
            >
              <div className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-neutral-300" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-semibold text-neutral-700">
                    {env.name}
                  </h3>
                  <span className="rounded bg-neutral-100 px-1.5 py-0.5 text-[10px] font-medium text-neutral-400 uppercase">
                    {env.category}
                  </span>
                </div>
                <p className="mt-0.5 text-xs text-neutral-400">{env.desc}</p>
                <div className="mt-2 flex items-center gap-2">
                  <span
                    className={`rounded px-1.5 py-0.5 text-[10px] font-medium uppercase ${
                      env.priority === "high"
                        ? "bg-neutral-900 text-white"
                        : env.priority === "medium"
                          ? "bg-neutral-200 text-neutral-600"
                          : "bg-neutral-100 text-neutral-400"
                    }`}
                  >
                    {env.priority}
                  </span>
                  <button className="rounded-md border border-neutral-200 px-2.5 py-1 text-[10px] font-medium text-neutral-500 transition hover:border-neutral-300 hover:text-neutral-700">
                    Connect
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
