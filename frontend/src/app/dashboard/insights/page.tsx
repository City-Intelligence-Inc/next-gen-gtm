export default function InsightsPage() {
  const learningsTimeline = [
    {
      date: "Mar 27",
      learnings: [
        { time: "2:30 PM", text: "DevOps ICP responds best to quantified pain points (MTTR, deployment frequency)", confidence: 0.92, mentions: 3 },
        { time: "1:15 PM", text: "PLG roast responses with conversion benchmarks get 3x more engagement", confidence: 0.88, mentions: 8 },
      ],
    },
    {
      date: "Mar 26",
      learnings: [
        { time: "4:45 PM", text: "Series A founders prefer Clay + Instantly stack over Apollo all-in-one", confidence: 0.85, mentions: 5 },
        { time: "11:20 AM", text: "Competitor intel with specific pricing comparisons drives 2x more retweets", confidence: 0.81, mentions: 4 },
        { time: "9:00 AM", text: "Remote-first companies respond to async workflow pain points more than in-office companies", confidence: 0.78, mentions: 6 },
      ],
    },
    {
      date: "Mar 25",
      learnings: [
        { time: "3:30 PM", text: "Hiring signals (VP Sales postings) correlate with 2x higher reply engagement", confidence: 0.94, mentions: 12 },
        { time: "10:15 AM", text: "Outbound copy with specific dollar amounts outperforms vague value props 4:1", confidence: 0.91, mentions: 9 },
      ],
    },
    {
      date: "Mar 24",
      learnings: [
        { time: "5:00 PM", text: "B2B SaaS founders at 10-50 employees are the most engaged ICP segment", confidence: 0.87, mentions: 15 },
        { time: "2:00 PM", text: "Responses citing case studies (Datadog, Figma) get 60% more bookmarks", confidence: 0.83, mentions: 7 },
        { time: "9:30 AM", text: "Signal detection queries peak on Mondays and Tuesdays", confidence: 0.76, mentions: 11 },
      ],
    },
  ];

  const intentEngagement = [
    { intent: "GTM Roast", avgEngagement: 92, color: "bg-neutral-900" },
    { intent: "ICP Analysis", avgEngagement: 78, color: "bg-neutral-700" },
    { intent: "Outbound Gen", avgEngagement: 71, color: "bg-neutral-600" },
    { intent: "Competitor Intel", avgEngagement: 64, color: "bg-neutral-500" },
    { intent: "Stack Advisor", avgEngagement: 58, color: "bg-neutral-400" },
    { intent: "Signal Detection", avgEngagement: 42, color: "bg-neutral-300" },
  ];

  const topPatterns = [
    {
      pattern: "Quantified pain point + specific tool recommendation + this-week action",
      avgScore: 9.2,
      uses: 34,
      example: "Your MTTR is 3x industry average... Use Clay to find 50 VP Engs...",
    },
    {
      pattern: "Case study reference + benchmark comparison + counter-move",
      avgScore: 8.8,
      uses: 28,
      example: "Notion went from 0.3% to 4.2% with this motion...",
    },
    {
      pattern: "Three-issue diagnosis + prioritized fix + composable stack",
      avgScore: 8.5,
      uses: 22,
      example: "(1) Activation metric is wrong (2) No PQL scoring (3) No sales-assist...",
    },
    {
      pattern: "Signal taxonomy + enrichment workflow + scoring rubric",
      avgScore: 8.1,
      uses: 18,
      example: "5 buying signals: hiring, tech stack, funding, pain tweets, G2 research...",
    },
    {
      pattern: "Budget-aware stack recommendation + free-tier optimization",
      avgScore: 7.9,
      uses: 15,
      example: "At $0 budget: Attio free + Clay 100 credits + Instantly trial...",
    },
  ];

  const vaultHeatmap = [
    { topic: "Signal-Based Selling", retrievals: 89, pct: 100 },
    { topic: "ICP Framework", retrievals: 76, pct: 85 },
    { topic: "Composable GTM Stack", retrievals: 68, pct: 76 },
    { topic: "PLG Deep Dive", retrievals: 62, pct: 70 },
    { topic: "Case Study - Datadog", retrievals: 54, pct: 61 },
    { topic: "Cold Email Frameworks", retrievals: 48, pct: 54 },
    { topic: "GTM Pain Points", retrievals: 45, pct: 51 },
    { topic: "Case Study - Notion", retrievals: 41, pct: 46 },
    { topic: "MEDDIC Qualification", retrievals: 38, pct: 43 },
    { topic: "Data Enrichment Waterfall", retrievals: 35, pct: 39 },
    { topic: "Signal Taxonomy", retrievals: 32, pct: 36 },
    { topic: "AI SDR Agents", retrievals: 28, pct: 31 },
    { topic: "Case Study - Clay", retrievals: 24, pct: 27 },
    { topic: "Bow-Tie Funnel", retrievals: 21, pct: 24 },
    { topic: "Case Study - Figma", retrievals: 18, pct: 20 },
    { topic: "Remote Work GTM", retrievals: 15, pct: 17 },
  ];

  const scoreTrend = [
    { day: "Mon", score: 7.8 },
    { day: "Tue", score: 8.1 },
    { day: "Wed", score: 8.4 },
    { day: "Thu", score: 8.2 },
    { day: "Fri", score: 8.6 },
    { day: "Sat", score: 8.9 },
    { day: "Sun", score: 8.7 },
  ];

  return (
    <div className="px-6 py-8 md:px-10 md:py-10 max-w-6xl">
      {/* Header */}
      <div className="mb-8">
        <p className="text-xs font-medium uppercase tracking-[0.15em] text-neutral-400">
          Dashboard
        </p>
        <h1 className="mt-1 font-serif text-3xl italic tracking-tight text-neutral-900">
          Insights
        </h1>
        <p className="mt-2 text-sm text-neutral-500">
          Learnings extracted from interactions, engagement patterns, and knowledge retrieval analysis.
        </p>
      </div>

      {/* Summary stats */}
      <div className="mb-8 grid gap-4 sm:grid-cols-4">
        {[
          { label: "Total learnings", value: "147" },
          { label: "Avg. confidence", value: "0.86" },
          { label: "Top intent", value: "GTM Roast" },
          { label: "Avg. response score", value: "8.2" },
        ].map((stat) => (
          <div
            key={stat.label}
            className="rounded-xl border border-neutral-200 bg-white px-5 py-4"
          >
            <p className="text-xs text-neutral-400">{stat.label}</p>
            <p className="mt-1 text-xl font-semibold text-neutral-900">
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      {/* Score trend + Intent engagement */}
      <div className="mb-8 grid gap-6 lg:grid-cols-2">
        {/* Score trend (CSS chart) */}
        <div className="rounded-xl border border-neutral-200 bg-white p-5">
          <h2 className="text-sm font-semibold text-neutral-900 mb-1">
            Response score trend
          </h2>
          <p className="text-xs text-neutral-400 mb-5">Average score per day this week</p>
          <div className="flex items-end gap-3 h-40">
            {scoreTrend.map((day) => {
              const minScore = 7;
              const maxScore = 10;
              const heightPct = ((day.score - minScore) / (maxScore - minScore)) * 100;
              return (
                <div key={day.day} className="flex flex-1 flex-col items-center gap-1">
                  <span className="text-[10px] font-mono text-neutral-500">
                    {day.score}
                  </span>
                  <div className="w-full flex items-end" style={{ height: "120px" }}>
                    <div
                      className="w-full rounded-t-md bg-neutral-900 transition-all duration-500"
                      style={{ height: `${heightPct}%` }}
                    />
                  </div>
                  <span className="text-[10px] text-neutral-400">{day.day}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Intent engagement bar chart */}
        <div className="rounded-xl border border-neutral-200 bg-white p-5">
          <h2 className="text-sm font-semibold text-neutral-900 mb-1">
            Engagement by intent
          </h2>
          <p className="text-xs text-neutral-400 mb-5">
            Average engagement score (likes + replies + retweets)
          </p>
          <div className="space-y-3">
            {intentEngagement.map((item) => (
              <div key={item.intent}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-neutral-600">{item.intent}</span>
                  <span className="text-xs font-mono text-neutral-400">
                    {item.avgEngagement}
                  </span>
                </div>
                <div className="h-5 w-full rounded bg-neutral-100">
                  <div
                    className={`h-5 rounded ${item.color} transition-all duration-700 flex items-center justify-end pr-2`}
                    style={{ width: `${item.avgEngagement}%` }}
                  >
                    {item.avgEngagement > 30 && (
                      <span className="text-[9px] font-medium text-white">
                        {item.avgEngagement}%
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Learnings timeline */}
      <div className="mb-8 rounded-xl border border-neutral-200 bg-white p-5">
        <h2 className="text-sm font-semibold text-neutral-900 mb-1">
          Learnings timeline
        </h2>
        <p className="text-xs text-neutral-400 mb-6">
          When each learning was extracted, ordered by confidence
        </p>
        <div className="space-y-6">
          {learningsTimeline.map((day) => (
            <div key={day.date}>
              <div className="flex items-center gap-3 mb-3">
                <span className="text-xs font-semibold text-neutral-900 bg-neutral-100 rounded px-2 py-0.5">
                  {day.date}
                </span>
                <div className="flex-1 h-px bg-neutral-100" />
                <span className="text-[10px] text-neutral-400">
                  {day.learnings.length} learnings
                </span>
              </div>
              <div className="space-y-2 ml-2">
                {day.learnings.map((l, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 rounded-lg border border-neutral-100 bg-neutral-50/50 p-3 transition hover:border-neutral-200"
                  >
                    {/* Timeline dot */}
                    <div className="mt-1.5 flex flex-col items-center">
                      <div className="h-2 w-2 rounded-full bg-neutral-900" />
                      {i < day.learnings.length - 1 && (
                        <div className="mt-0.5 h-full w-px bg-neutral-200" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-neutral-700 leading-relaxed">
                        {l.text}
                      </p>
                      <div className="mt-1.5 flex items-center gap-3">
                        <span className="text-[10px] text-neutral-400">{l.time}</span>
                        <span className="text-[10px] text-neutral-400">
                          {l.mentions} mentions
                        </span>
                        <span className="text-[10px] font-mono text-neutral-500">
                          conf: {l.confidence.toFixed(2)}
                        </span>
                        {/* Confidence bar */}
                        <div className="hidden sm:flex items-center gap-1">
                          <div className="h-1 w-16 rounded-full bg-neutral-200">
                            <div
                              className="h-1 rounded-full bg-neutral-900"
                              style={{ width: `${l.confidence * 100}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Top patterns + Knowledge heatmap */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Top performing response patterns */}
        <div className="rounded-xl border border-neutral-200 bg-white p-5">
          <h2 className="text-sm font-semibold text-neutral-900 mb-1">
            Top response patterns
          </h2>
          <p className="text-xs text-neutral-400 mb-5">
            Highest-performing response structures by average score
          </p>
          <div className="space-y-4">
            {topPatterns.map((pattern, i) => (
              <div key={i} className="border-l-2 border-neutral-900 pl-4">
                <div className="flex items-start justify-between gap-2">
                  <p className="text-sm font-medium text-neutral-800">
                    {pattern.pattern}
                  </p>
                  <span
                    className={`shrink-0 rounded px-2 py-0.5 text-xs font-semibold ${
                      pattern.avgScore >= 9
                        ? "bg-green-50 text-green-700"
                        : pattern.avgScore >= 8
                          ? "bg-neutral-100 text-neutral-700"
                          : "bg-yellow-50 text-yellow-700"
                    }`}
                  >
                    {pattern.avgScore}
                  </span>
                </div>
                <p className="mt-1.5 text-xs text-neutral-400 italic leading-relaxed">
                  &quot;{pattern.example}&quot;
                </p>
                <p className="mt-1 text-[10px] text-neutral-400">
                  Used {pattern.uses} times
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Knowledge retrieval heatmap */}
        <div className="rounded-xl border border-neutral-200 bg-white p-5">
          <h2 className="text-sm font-semibold text-neutral-900 mb-1">
            Knowledge retrieval heatmap
          </h2>
          <p className="text-xs text-neutral-400 mb-5">
            Which vault topics are retrieved most frequently
          </p>
          <div className="space-y-1.5">
            {vaultHeatmap.map((topic) => (
              <div key={topic.topic} className="group flex items-center gap-2">
                <span className="w-40 shrink-0 truncate text-xs text-neutral-600 group-hover:text-neutral-900 transition-colors">
                  {topic.topic}
                </span>
                <div className="flex-1 h-6 rounded bg-neutral-50">
                  <div
                    className="h-6 rounded flex items-center justify-end pr-2 transition-all duration-500"
                    style={{
                      width: `${topic.pct}%`,
                      backgroundColor: `rgba(23, 23, 23, ${0.15 + (topic.pct / 100) * 0.85})`,
                    }}
                  >
                    {topic.pct > 25 && (
                      <span className={`text-[9px] font-mono ${topic.pct > 50 ? "text-white" : "text-neutral-600"}`}>
                        {topic.retrievals}
                      </span>
                    )}
                  </div>
                </div>
                <span className="w-8 text-right text-[10px] font-mono text-neutral-400">
                  {topic.retrievals}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
