"use client";

import { useEffect, useState, useRef } from "react";

const INTENT_LABELS: Record<string, string> = {
  competitor_intel: "Competitor Intel",
  icp_analyzer: "ICP Analysis",
  signal_scanner: "Signal Detection",
  gtm_roast: "GTM Roast",
  stack_advisor: "Stack Advisor",
  outbound_generator: "Outbound Gen",
  general_gtm: "General GTM",
};

const ENV_LINKS: Record<string, string> = {
  twitter: "https://x.com/stardroplin",
  openai: "https://platform.openai.com",
  chromadb: "https://www.trychroma.com",
  app_runner: "https://xitwxb23yn.us-east-1.awsapprunner.com",
  github: "https://github.com/stardrop-cli",
  luma: "https://luma.com/user/stardrop",
};

function XIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4 text-neutral-400" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>
  );
}

function EngagementScore({ likes, replies, retweets }: { likes: number; replies: number; retweets: number }) {
  const score = likes * 3 + replies * 5 + retweets * 2;
  const color = score > 10 ? "text-green-600 bg-green-50 border-green-200" : score > 0 ? "text-amber-600 bg-amber-50 border-amber-200" : "text-neutral-400 bg-neutral-50 border-neutral-200";
  return (
    <span className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[11px] font-semibold ${color}`}>
      {score} pts
    </span>
  );
}

function timeAgo(ts: string) {
  if (!ts) return "";
  const diff = Date.now() - new Date(ts).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  return `${days}d ago`;
}

export default function DashboardOverview() {
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const fetched = useRef(false);

  useEffect(() => {
    if (fetched.current) return;
    fetched.current = true;

    async function fetchWithRetry(attempts = 3) {
      for (let i = 0; i < attempts; i++) {
        try {
          const r = await fetch(`/api/proxy/dashboard/overview`);
          if (r.status === 503 || r.status === 502) {
            if (i < attempts - 1) {
              console.log(`[dashboard] ${r.status}, retrying in ${(i + 1) * 3}s...`);
              await new Promise(res => setTimeout(res, (i + 1) * 3000));
              continue;
            }
          }
          if (!r.ok) throw new Error(`API returned ${r.status}`);
          const d = await r.json();
          if (d.stats) { setData(d); return; }
          throw new Error("Invalid response");
        } catch (e) {
          if (i === attempts - 1) setError(e instanceof Error ? e.message : "Failed");
          else await new Promise(res => setTimeout(res, (i + 1) * 3000));
        }
      }
    }
    fetchWithRetry().finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center px-6 py-20">
        <div className="text-center">
          <div className="mx-auto h-6 w-6 animate-spin rounded-full border-2 border-neutral-200 border-t-neutral-900" />
          <p className="mt-3 text-sm text-neutral-400">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="px-6 py-8 md:px-10 max-w-6xl">
        <h1 className="font-serif text-3xl italic text-neutral-900">Dashboard</h1>
        <div className="mt-6 rounded-xl border border-dashed border-neutral-200 p-12 text-center">
          <p className="text-sm text-neutral-600">{error || "Waiting for data"}</p>
          <p className="mt-2 text-xs text-neutral-400">Backend may be starting. Try in 30 seconds.</p>
          <button onClick={() => window.location.reload()} className="mt-4 rounded-lg bg-neutral-900 px-4 py-2 text-sm text-white hover:bg-neutral-800">
            Retry
          </button>
        </div>
      </div>
    );
  }

  const { stats, intent_distribution, recent_mentions, worker, environments } = data;

  return (
    <div className="px-6 py-8 md:px-10 max-w-6xl">
      <div className="mb-8">
        <h1 className="font-serif text-3xl italic text-neutral-900">Dashboard</h1>
        <p className="mt-1 text-sm text-neutral-500">Live data from Stardrop &mdash; {stats.total_mentions} mentions processed.</p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: "Mentions", value: stats.total_mentions, sub: `${stats.mentions_today} today` },
          { label: "Replies", value: stats.replies_sent, sub: `${stats.mentions_this_week} this week` },
          { label: "Avg engagement", value: stats.avg_engagement_score, sub: "score (L×3 + R×5 + RT×2)" },
          { label: "Processed", value: worker.processed_count, sub: "by worker" },
        ].map((s) => (
          <div key={s.label} className="rounded-xl border border-neutral-200 p-5">
            <p className="text-[11px] font-medium uppercase tracking-widest text-neutral-400">{s.label}</p>
            <p className="mt-1.5 font-serif text-3xl italic text-neutral-900">{s.value}</p>
            <p className="mt-0.5 text-[11px] text-neutral-400">{s.sub}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-[2fr_1fr]">
        {/* Mentions */}
        <div>
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-widest text-neutral-400">Mentions</h2>
          {recent_mentions.length === 0 ? (
            <div className="rounded-xl border border-dashed border-neutral-200 p-10 text-center">
              <p className="text-sm text-neutral-400">No mentions yet. Tag @stardroplin on X.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {recent_mentions.map((m: any, i: number) => {
                const score = (m.likes || 0) * 3 + (m.replies || 0) * 5 + (m.retweets || 0) * 2;
                return (
                  <a
                    key={i}
                    href={m.mention_id ? `https://x.com/i/status/${m.mention_id}` : "#"}
                    target="_blank"
                    className="block rounded-xl border border-neutral-200 bg-white p-4 transition hover:border-neutral-300 hover:shadow-sm"
                  >
                    {/* Header */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-neutral-100 text-xs font-semibold text-neutral-600">
                          {(m.author || "?")[1]?.toUpperCase() || "?"}
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-neutral-900">
                            {m.author?.split(":")[0] || "Unknown"}
                          </p>
                          <p className="text-[11px] text-neutral-400">{timeAgo(m.ts)}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <EngagementScore likes={m.likes || 0} replies={m.replies || 0} retweets={m.retweets || 0} />
                        <XIcon />
                      </div>
                    </div>

                    {/* Tweet text */}
                    <p className="mt-3 text-sm text-neutral-700 leading-relaxed">
                      {m.author?.split(": ").slice(1).join(": ") || ""}
                    </p>

                    {/* Reply preview */}
                    {m.response_preview && (
                      <div className="mt-3 rounded-lg bg-neutral-50 border border-neutral-100 p-3">
                        <p className="text-[11px] uppercase tracking-widest text-neutral-400 mb-1">Stardrop replied</p>
                        <p className="text-xs text-neutral-600 leading-relaxed">{m.response_preview}</p>
                      </div>
                    )}

                    {/* Footer */}
                    <div className="mt-3 flex items-center gap-4 text-[11px] text-neutral-400">
                      <span className="rounded bg-neutral-100 px-2 py-0.5 font-medium text-neutral-500 uppercase text-[10px]">
                        {INTENT_LABELS[m.intent] || m.intent}
                      </span>
                      {m.replied && (
                        <span className="flex items-center gap-1 text-green-600">
                          <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
                          replied
                        </span>
                      )}
                      <span>{m.likes || 0} likes</span>
                      <span>{m.replies || 0} replies</span>
                      <span>{m.retweets || 0} retweets</span>
                    </div>
                  </a>
                );
              })}
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
          {/* Environments */}
          <div>
            <h2 className="mb-3 text-sm font-semibold uppercase tracking-widest text-neutral-400">Environments</h2>
            <div className="space-y-2">
              {Object.entries(environments).map(([name, status]: [string, any]) => (
                <a
                  key={name}
                  href={ENV_LINKS[name] || "#"}
                  target="_blank"
                  className="flex items-center justify-between rounded-lg border border-neutral-200 bg-white px-4 py-2.5 transition hover:border-neutral-300 hover:shadow-sm"
                >
                  <span className="text-sm font-medium capitalize">{name.replace("_", " ")}</span>
                  <span className="flex items-center gap-1.5 text-xs text-green-600">
                    <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
                    {status}
                  </span>
                </a>
              ))}
            </div>
          </div>

          {/* Intent distribution */}
          {Object.keys(intent_distribution).length > 0 && (
            <div>
              <h2 className="mb-3 text-sm font-semibold uppercase tracking-widest text-neutral-400">Intents</h2>
              <div className="space-y-2">
                {Object.entries(intent_distribution).map(([intent, pct]: [string, any]) => (
                  <div key={intent}>
                    <div className="flex justify-between text-xs">
                      <span className="text-neutral-600">{INTENT_LABELS[intent] || intent}</span>
                      <span className="text-neutral-400">{pct}%</span>
                    </div>
                    <div className="mt-1 h-1.5 w-full rounded-full bg-neutral-100">
                      <div className="h-1.5 rounded-full bg-neutral-900" style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
