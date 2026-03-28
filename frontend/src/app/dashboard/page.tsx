"use client";

import { useEffect, useState, useRef } from "react";

const API = "";

interface DashboardData {
  stats: {
    total_mentions: number;
    mentions_today: number;
    mentions_this_week: number;
    replies_sent: number;
    avg_engagement_score: number;
    total_learnings: number;
  };
  intent_distribution: Record<string, number>;
  recent_mentions: Array<{
    ts: string;
    author: string;
    mention_id: string;
    intent: string;
    response_preview: string;
    likes: number;
    replies: number;
    retweets: number;
    replied: boolean;
  }>;
  learnings: Array<{
    intent: string;
    score: number;
    example_tweet: string;
    engagement: { likes: number; replies: number; retweets: number };
  }>;
  worker: {
    last_tweet_id: string | null;
    processed_count: number;
  };
  environments: Record<string, string>;
}

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
  app_runner: "",
  github: "https://github.com/stardrop-cli",
  luma: "https://luma.com/user/stardrop",
};

export default function DashboardOverview() {
  const [data, setData] = useState<DashboardData | null>(null);
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
          if (r.status === 503 && i < attempts - 1) {
            console.log(`[dashboard] 503, retrying in ${(i + 1) * 3}s... (${i + 1}/${attempts})`);
            await new Promise(res => setTimeout(res, (i + 1) * 3000));
            continue;
          }
          if (!r.ok) throw new Error(`API returned ${r.status}`);
          const d = await r.json();
          if (d.stats) {
            setData(d);
            return;
          }
          throw new Error("Invalid response");
        } catch (e) {
          if (i === attempts - 1) {
            setError(e instanceof Error ? e.message : "Failed to fetch");
          } else {
            console.log(`[dashboard] Error, retrying in ${(i + 1) * 3}s...`);
            await new Promise(res => setTimeout(res, (i + 1) * 3000));
          }
        }
      }
    }

    fetchWithRetry().finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center px-6 py-20">
        <p className="text-sm text-neutral-400">Loading dashboard...</p>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="px-6 py-8 md:px-10 md:py-10 max-w-6xl">
        <h1 className="font-serif text-3xl italic tracking-tight text-neutral-900">Dashboard</h1>
        <div className="mt-6 rounded-xl border border-dashed border-neutral-200 bg-neutral-50/50 px-6 py-16 text-center">
          <p className="text-sm font-semibold text-neutral-700">
            {error ? `API error: ${error}` : "Waiting for data"}
          </p>
          <p className="mt-2 text-xs text-neutral-400">
            The backend may be cold starting. Try refreshing in 30 seconds.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 rounded-lg bg-neutral-900 px-4 py-2 text-sm text-white hover:bg-neutral-800"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  const { stats, intent_distribution, recent_mentions, learnings, worker, environments } = data;


  return (
    <div className="px-6 py-8 md:px-10 md:py-10 max-w-6xl">
      <div className="mb-8">
        <h1 className="font-serif text-3xl italic tracking-tight text-neutral-900">Dashboard</h1>
        <p className="mt-2 text-sm text-neutral-500">Live data from Stardrop.</p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: "Total mentions", value: stats.total_mentions },
          { label: "Replies sent", value: stats.replies_sent },
          { label: "Avg engagement", value: stats.avg_engagement_score },
          { label: "Processed", value: worker.processed_count },
        ].map((s) => (
          <div key={s.label} className="rounded-xl border border-neutral-200 bg-white p-5">
            <p className="text-xs font-medium uppercase tracking-widest text-neutral-400">{s.label}</p>
            <p className="mt-2 font-serif text-3xl italic text-neutral-900">{s.value}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-[2fr_1fr]">
        {/* Mentions */}
        <div>
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-widest text-neutral-400">Recent mentions</h2>
          {recent_mentions.length === 0 ? (
            <div className="rounded-xl border border-dashed border-neutral-200 p-8 text-center">
              <p className="text-sm text-neutral-400">No mentions logged yet. New mentions will appear here.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {recent_mentions.map((m, i) => (
                <a
                  key={i}
                  href={m.mention_id ? `https://x.com/i/status/${m.mention_id}` : "#"}
                  target="_blank"
                  className="block rounded-xl border border-neutral-200 bg-white p-4 transition hover:border-neutral-300 hover:shadow-sm"
                >
                  <div className="flex items-start justify-between">
                    <p className="text-sm text-neutral-700 flex-1">{m.author}</p>
                    <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0 ml-2 text-neutral-300" fill="currentColor">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                  </div>
                  {m.response_preview && (
                    <p className="mt-1 text-xs text-neutral-400 truncate">Reply: {m.response_preview}</p>
                  )}
                  <div className="mt-2 flex items-center gap-3 text-xs text-neutral-400">
                    <span className="rounded bg-neutral-100 px-2 py-0.5 text-[10px] font-medium text-neutral-500 uppercase">
                      {INTENT_LABELS[m.intent] || m.intent}
                    </span>
                    {m.replied && <span className="text-green-600 font-medium">replied</span>}
                    <span>{m.likes}L {m.replies}R {m.retweets}RT</span>
                  </div>
                </a>
              ))}
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
          {/* Environments */}
          <div>
            <h2 className="mb-3 text-sm font-semibold uppercase tracking-widest text-neutral-400">Environments</h2>
            <div className="space-y-2">
              {Object.entries(environments).map(([name, status]) => (
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
                {Object.entries(intent_distribution).map(([intent, pct]) => (
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

          {/* Learnings */}
          {learnings.length > 0 && (
            <div>
              <h2 className="mb-3 text-sm font-semibold uppercase tracking-widest text-neutral-400">Learnings</h2>
              {learnings.map((l, i) => (
                <div key={i} className="rounded-lg border border-neutral-200 bg-white p-3 mb-2">
                  <p className="text-xs text-neutral-600 line-clamp-2">{l.example_tweet}</p>
                  <p className="mt-1 text-[10px] text-neutral-400">Score: {l.score}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
