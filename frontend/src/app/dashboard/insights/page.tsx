"use client";

import { useEffect, useState, useRef } from "react";

const INTENT_LABELS: Record<string, string> = {
  competitor_intel: "Competitor",
  icp_analyzer: "ICP",
  signal_scanner: "Signals",
  gtm_roast: "Roast",
  stack_advisor: "Stack",
  outbound_generator: "Outbound",
  general_gtm: "GTM",
};

export default function InsightsPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const fetched = useRef(false);

  useEffect(() => {
    if (fetched.current) return;
    fetched.current = true;

    async function load(attempts = 3) {
      for (let i = 0; i < attempts; i++) {
        try {
          const r = await fetch("/api/proxy/dashboard/insights");
          if ((r.status === 503 || r.status === 502) && i < attempts - 1) {
            await new Promise(res => setTimeout(res, (i + 1) * 3000));
            continue;
          }
          if (!r.ok) throw new Error(`${r.status}`);
          setData(await r.json());
          return;
        } catch {
          if (i === attempts - 1) setData(null);
          else await new Promise(res => setTimeout(res, (i + 1) * 3000));
        }
      }
    }
    load().finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="h-5 w-5 animate-spin rounded-full border-2 border-neutral-200 border-t-neutral-900" />
      </div>
    );
  }

  if (!data) {
    return (
      <div className="px-6 py-8 max-w-4xl mx-auto">
        <h1 className="text-xl font-semibold">Insights</h1>
        <div className="mt-4 rounded-lg border border-neutral-200 p-8 text-center">
          <p className="text-sm text-neutral-400">Could not load insights. Backend may be starting.</p>
          <button onClick={() => window.location.reload()} className="mt-3 rounded-lg bg-neutral-900 px-4 py-2 text-xs text-white">Retry</button>
        </div>
      </div>
    );
  }

  const { timeline, intent_performance, top_responses, prompt_versions, summary } = data;
  const maxTimelineScore = Math.max(...(timeline || []).map((t: any) => t.avg_score), 1);

  return (
    <div className="px-4 py-6 md:px-8 max-w-5xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-xl font-semibold text-neutral-900">X-Ray</h1>
        <p className="mt-0.5 text-xs text-neutral-400">How Stardrop is performing and improving over time.</p>
      </div>

      {/* Summary stats */}
      <div className="grid grid-cols-4 gap-2">
        {[
          { label: "Mentions", value: summary.total_mentions },
          { label: "With engagement", value: summary.total_with_engagement },
          { label: "Total score", value: summary.total_score },
          { label: "Avg score", value: summary.avg_score },
        ].map((s) => (
          <div key={s.label} className="rounded-lg bg-neutral-950 px-3 py-2.5">
            <p className="text-[9px] uppercase tracking-widest text-neutral-500">{s.label}</p>
            <p className="mt-0.5 text-lg font-bold text-white tabular-nums">{s.value}</p>
          </div>
        ))}
      </div>

      {/* Engagement timeline */}
      <div className="rounded-lg border border-neutral-200 p-4">
        <h2 className="text-[11px] font-semibold uppercase tracking-widest text-neutral-400 mb-3">
          Engagement over time
        </h2>
        {timeline && timeline.length > 0 ? (
          <>
            <div className="flex items-end gap-1 h-24">
              {timeline.map((t: any, i: number) => (
                <div key={i} className="flex-1 flex flex-col items-center justify-end gap-0.5">
                  <span className="text-[9px] font-bold text-neutral-600 tabular-nums">{t.avg_score}</span>
                  <div
                    className="w-full rounded-t bg-neutral-900 transition-all"
                    style={{ height: `${(t.avg_score / maxTimelineScore) * 72}px`, minHeight: t.avg_score > 0 ? 4 : 1 }}
                  />
                  <span className="text-[8px] text-neutral-400">{t.date.slice(5)}</span>
                </div>
              ))}
            </div>
            <div className="mt-2 flex justify-between text-[9px] text-neutral-300">
              <span>{timeline[0]?.date}</span>
              <span>{timeline.length} days tracked</span>
              <span>{timeline[timeline.length - 1]?.date}</span>
            </div>
          </>
        ) : (
          <p className="text-xs text-neutral-400 text-center py-6">Engagement data will appear after responses get likes/replies.</p>
        )}
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        {/* Intent performance */}
        <div className="rounded-lg border border-neutral-200 p-4">
          <h2 className="text-[11px] font-semibold uppercase tracking-widest text-neutral-400 mb-3">
            Performance by intent
          </h2>
          {Object.keys(intent_performance || {}).length > 0 ? (
            <div className="space-y-2">
              {Object.entries(intent_performance).sort((a: any, b: any) => b[1].avg_score - a[1].avg_score).map(([intent, perf]: [string, any]) => (
                <div key={intent} className="flex items-center gap-3">
                  <span className="w-16 text-[11px] font-medium text-neutral-700 truncate">{INTENT_LABELS[intent] || intent}</span>
                  <div className="flex-1 h-2 rounded-full bg-neutral-100">
                    <div className="h-2 rounded-full bg-neutral-900" style={{ width: `${Math.min((perf.avg_score / 20) * 100, 100)}%` }} />
                  </div>
                  <span className="text-[11px] font-bold tabular-nums w-8 text-right">{perf.avg_score}</span>
                  <span className="text-[9px] text-neutral-400 w-8 text-right">{perf.count}x</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-xs text-neutral-400 text-center py-4">No engagement data yet.</p>
          )}
        </div>

        {/* Prompt version history */}
        <div className="rounded-lg border border-neutral-200 p-4">
          <h2 className="text-[11px] font-semibold uppercase tracking-widest text-neutral-400 mb-3">
            Prompt evolution
          </h2>
          <div className="space-y-0">
            {(prompt_versions || []).map((v: any, i: number) => (
              <div key={i} className="flex gap-3 pb-3 last:pb-0">
                <div className="flex flex-col items-center">
                  <div className={`h-2.5 w-2.5 rounded-full ${i === 0 ? "bg-neutral-300" : "bg-neutral-900"}`} />
                  {i < prompt_versions.length - 1 && <div className="w-px flex-1 bg-neutral-200" />}
                </div>
                <div className="flex-1 -mt-0.5">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-bold text-neutral-900">{v.version}</span>
                    <span className="text-[9px] text-neutral-400">{v.date}</span>
                  </div>
                  <p className="mt-0.5 text-[11px] text-neutral-500 leading-relaxed">{v.change}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top responses */}
      <div className="rounded-lg border border-neutral-200 p-4">
        <h2 className="text-[11px] font-semibold uppercase tracking-widest text-neutral-400 mb-3">
          Top performing responses
        </h2>
        {(top_responses || []).length > 0 ? (
          <div className="space-y-2">
            {top_responses.slice(0, 5).map((r: any, i: number) => (
              <div key={i} className="flex items-start gap-3 rounded-lg bg-neutral-50 p-3">
                <div className="shrink-0 flex items-center justify-center h-8 w-8 rounded-full bg-neutral-900 text-white text-xs font-bold">
                  {r.score}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-medium text-neutral-500">@{r.author}</span>
                    <span className="rounded bg-neutral-200 px-1 py-0.5 text-[9px] font-medium text-neutral-600 uppercase">
                      {INTENT_LABELS[r.intent] || r.intent}
                    </span>
                    <span className="text-[9px] text-neutral-400">{r.likes}L {r.replies}R {r.retweets}RT</span>
                  </div>
                  <p className="mt-1 text-xs text-neutral-700 leading-snug">{r.question}</p>
                  {r.response && (
                    <p className="mt-1 text-[11px] text-neutral-400 line-clamp-1">{r.response}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-xs text-neutral-400 text-center py-4">Responses will be ranked once engagement data is collected.</p>
        )}
      </div>
    </div>
  );
}
