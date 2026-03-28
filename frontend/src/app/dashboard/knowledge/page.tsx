export default function KnowledgePage() {
  const vaultStats = {
    totalNotes: 60,
    totalChunks: 441,
    embeddingModel: "all-MiniLM-L6-v2",
    avgRetrievalTime: "45ms",
    topKRetrieval: 8,
  };

  const categories = [
    {
      name: "GTM Frameworks",
      notes: 12,
      topics: [
        "Signal-Based Selling",
        "ICP Framework",
        "GTM Fit Methodology",
        "MEDDIC Qualification",
        "Bow-Tie Funnel",
        "JTBD for GTM",
      ],
      color: "bg-neutral-900",
    },
    {
      name: "GTM Motions",
      notes: 10,
      topics: [
        "PLG Deep Dive",
        "Product-Led Sales",
        "Sales-Led Growth",
        "Community-Led Growth",
        "Partner-Led Growth",
      ],
      color: "bg-neutral-700",
    },
    {
      name: "Case Studies",
      notes: 8,
      topics: [
        "Case Study - Datadog",
        "Case Study - Figma",
        "Case Study - Notion",
        "Case Study - Ramp",
        "Case Study - Clay",
      ],
      color: "bg-neutral-600",
    },
    {
      name: "Tool Landscape",
      notes: 10,
      topics: [
        "Composable GTM Stack",
        "AI SDR Agents",
        "Data Enrichment Waterfall",
        "Tool Profiles",
        "CRM Comparison",
      ],
      color: "bg-neutral-500",
    },
    {
      name: "Outbound & Signals",
      notes: 8,
      topics: [
        "Cold Email Frameworks",
        "Signal Taxonomy",
        "Signal-Based Selling Deep Dive",
        "Buying Signal Patterns",
      ],
      color: "bg-neutral-400",
    },
    {
      name: "Market Context",
      notes: 12,
      topics: [
        "Current GTM Landscape",
        "GTM Pain Points",
        "Remote Work GTM",
        "AI-First GTM",
        "Market Sizing",
      ],
      color: "bg-neutral-300",
    },
  ];

  const recentlyRetrieved = [
    { note: "Signal-Based Selling", retrievals: 14, lastUsed: "3m ago", chunks: 8 },
    { note: "ICP Framework", retrievals: 11, lastUsed: "18m ago", chunks: 7 },
    { note: "PLG Deep Dive", retrievals: 9, lastUsed: "42m ago", chunks: 6 },
    { note: "Case Study - Datadog", retrievals: 7, lastUsed: "1h ago", chunks: 5 },
    { note: "Composable GTM Stack", retrievals: 6, lastUsed: "1h ago", chunks: 8 },
    { note: "Cold Email Frameworks", retrievals: 5, lastUsed: "2h ago", chunks: 4 },
    { note: "GTM Pain Points", retrievals: 4, lastUsed: "3h ago", chunks: 6 },
    { note: "MEDDIC Qualification", retrievals: 3, lastUsed: "5h ago", chunks: 5 },
  ];

  return (
    <div className="px-6 py-8 md:px-10 md:py-10 max-w-6xl">
      {/* Header */}
      <div className="mb-8">
        <p className="text-xs font-medium uppercase tracking-[0.15em] text-neutral-400">
          Dashboard
        </p>
        <h1 className="mt-1 font-serif text-3xl italic tracking-tight text-neutral-900">
          Knowledge
        </h1>
        <p className="mt-2 text-sm text-neutral-500">
          The Obsidian vault powering Stardrop&apos;s RAG pipeline. 60+ curated research notes, 441 embedded chunks.
        </p>
      </div>

      {/* Stats */}
      <div className="mb-8 grid gap-4 sm:grid-cols-5">
        {[
          { label: "Total notes", value: vaultStats.totalNotes.toString() },
          { label: "Indexed chunks", value: vaultStats.totalChunks.toString() },
          { label: "Embedding model", value: vaultStats.embeddingModel },
          { label: "Avg. retrieval", value: vaultStats.avgRetrievalTime },
          { label: "Top-K", value: vaultStats.topKRetrieval.toString() },
        ].map((stat) => (
          <div
            key={stat.label}
            className="rounded-xl border border-neutral-200 bg-white px-4 py-3"
          >
            <p className="text-[10px] text-neutral-400 uppercase tracking-wider">{stat.label}</p>
            <p className="mt-1 text-sm font-semibold text-neutral-900">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-8 lg:grid-cols-[2fr_1fr]">
        {/* Categories */}
        <div>
          <h2 className="mb-4 text-sm font-semibold text-neutral-900">
            Knowledge categories
          </h2>
          <div className="space-y-4">
            {categories.map((cat) => (
              <div
                key={cat.name}
                className="rounded-xl border border-neutral-200 bg-white p-5 transition hover:border-neutral-300"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className={`h-3 w-3 rounded ${cat.color}`} />
                    <h3 className="text-sm font-semibold text-neutral-900">
                      {cat.name}
                    </h3>
                  </div>
                  <span className="text-xs text-neutral-400">
                    {cat.notes} notes
                  </span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {cat.topics.map((topic) => (
                    <span
                      key={topic}
                      className="rounded-md bg-neutral-100 px-2.5 py-1 text-xs text-neutral-600 transition hover:bg-neutral-200"
                    >
                      {topic}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recently retrieved */}
        <div>
          <h2 className="mb-4 text-sm font-semibold text-neutral-900">
            Recently retrieved
          </h2>
          <div className="rounded-xl border border-neutral-200 bg-white">
            {recentlyRetrieved.map((note, i) => (
              <div
                key={note.note}
                className={`flex items-center gap-3 px-4 py-3 transition hover:bg-neutral-50 ${
                  i < recentlyRetrieved.length - 1 ? "border-b border-neutral-100" : ""
                }`}
              >
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded bg-neutral-100 text-[10px] font-semibold text-neutral-500">
                  {note.retrievals}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-neutral-700 truncate">{note.note}</p>
                  <p className="text-[10px] text-neutral-400">
                    {note.chunks} chunks &middot; {note.lastUsed}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Embedding status */}
          <div className="mt-6 rounded-xl border border-neutral-200 bg-white p-5">
            <h3 className="text-sm font-semibold text-neutral-900 mb-3">
              Embedding pipeline
            </h3>
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-xs text-neutral-500">Status</span>
                <span className="flex items-center gap-1.5 text-xs text-green-600">
                  <span className="inline-block h-1.5 w-1.5 rounded-full bg-green-500" />
                  Synced
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-neutral-500">Last re-index</span>
                <span className="text-xs text-neutral-500">2h ago</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-neutral-500">Similarity</span>
                <span className="text-xs font-mono text-neutral-500">cosine</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-neutral-500">Chunk size</span>
                <span className="text-xs font-mono text-neutral-500">512 tokens</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-neutral-500">Overlap</span>
                <span className="text-xs font-mono text-neutral-500">64 tokens</span>
              </div>
            </div>
            <button className="mt-4 w-full rounded-md border border-neutral-200 py-2 text-xs font-medium text-neutral-600 transition hover:bg-neutral-50 hover:text-neutral-900">
              Re-index vault
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
