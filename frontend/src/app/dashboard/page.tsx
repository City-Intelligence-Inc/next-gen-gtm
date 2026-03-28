"use client";

import { useEffect, useState } from "react";

const API = "https://xitwxb23yn.us-east-1.awsapprunner.com";

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

function EmptyState({
  title,
  subtitle,
  apiHint,
}: {
  title: string;
  subtitle: string;
  apiHint?: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-neutral-200 bg-neutral-50/50 px-6 py-16 text-center">
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-neutral-100">
        <div className="h-5 w-5 rounded-sm bg-neutral-300" />
      </div>
      <h3 className="text-sm font-semibold text-neutral-700">{title}</h3>
      <p className="mt-1.5 max-w-sm text-xs text-neutral-400 leading-relaxed">
        {subtitle}
      </p>
      {apiHint && (
        <p className="mt-3 rounded-md bg-neutral-100 px-3 py-1.5 font-mono text-[10px] text-neutral-400">
          {apiHint}
        </p>
      )}
    </div>
  );
}

export default function DashboardOverview() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API}/api/dashboard/overview`)
      .then((r) => {
        if (!r.ok) throw new Error(`${r.status}`);
        return r.json();
      })
      .then(setData)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center px-6 py-20">
        <p className="text-sm text-neutral-400">Loading...</p>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="px-6 py-8 md:px-10 md:py-10 max-w-6xl">
        <div className="mb-8">
          <p className="text-xs font-medium uppercase tracking-[0.15em] text-neutral-400">
            Dashboard
          </p>
          <h1 className="mt-1 font-serif text-3xl italic tracking-tight text-neutral-900">
            Overview
          </h1>
          <p className="mt-2 text-sm text-neutral-500">
            Live data from Stardrop&apos;s GTM agent.
          </p>
        </div>

        <EmptyState
          title="Waiting for data"
          subtitle="The dashboard will populate once the agent starts processing mentions. Tag @stardroplin on X to generate data."
        />
      </div>
    );
  }

  const { stats, intent_distribution, recent_mentions, learnings, worker, environments } = data;

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
          Live data from Stardrop&apos;s GTM agent.
        </p>
      </div>

      {/* Stats cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: "Total mentions", value: stats.total_mentions },
          { label: "Replies sent", value: stats.replies_sent },
          { label: "Avg engagement", value: stats.avg_engagement_score },
          { label: "Processed", value: worker.processed_count },
        ].map((s) => (
          <div
            key={s.label}
            className="rounded-xl border border-neutral-200 bg-white p-5"
          >
            <p className="text-xs font-medium uppercase tracking-widest text-neutral-400">
              {s.label}
            </p>
            <p className="mt-2 font-serif text-3xl italic text-neutral-900">
              {s.value}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-[2fr_1fr]">
        {/* Recent mentions */}
        <div>
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-widest text-neutral-400">
            Recent mentions
          </h2>
          <div className="space-y-3">
            {recent_mentions.length === 0 ? (
              <EmptyState
                title="No mentions yet"
                subtitle="Tag @stardroplin on X to get started. Mentions and responses will appear here."
              />
            ) : (
              recent_mentions.map((m, i) => (
                <div
                  key={i}
                  className="rounded-xl border border-neutral-200 bg-white p-4"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <p className="text-sm text-neutral-700">{m.author}</p>
                      {m.response_preview && (
                        <p className="mt-1 text-xs text-neutral-400 truncate">
                          Reply: {m.response_preview}
                        </p>
                      )}
                    </div>
                    <div className="flex items-center gap-3 shrink-0 ml-4">
                      <span className="rounded bg-neutral-100 px-2 py-0.5 text-[10px] font-medium text-neutral-500 uppercase">
                        {INTENT_LABELS[m.intent] || m.intent}
                      </span>
                      {m.replied && (
                        <span className="text-[10px] text-green-600 font-medium">replied</span>
                      )}
                    </div>
                  </div>
                  <div className="mt-2 flex items-center gap-3 text-xs text-neutral-400">
                    <span>{m.likes} likes</span>
                    <span>{m.replies} replies</span>
                    <span>{m.retweets} retweets</span>
                    {m.ts && (
                      <span className="ml-auto">
                        {new Date(m.ts).toLocaleDateString()}
                      </span>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
          {/* Environments */}
          <div>
            <h2 className="mb-4 text-sm font-semibold uppercase tracking-widest text-neutral-400">
              Environments
            </h2>
            <div className="space-y-2">
              {(() => {
                const ENV_LINKS: Record<string, string> = {
                  twitter: "https://x.com/stardroplin",
                  openai: "https://platform.openai.com",
                  chromadb: "https://www.trychroma.com",
                  app_runner: "https://xitwxb23yn.us-east-1.awsapprunner.com",
                  github: "https://github.com/stardrop-cli",
                  luma: "https://luma.com/user/stardrop",
                };
                return Object.keys(environments).length === 0 ? (
                  <p className="text-xs text-neutral-400">No environments connected yet.</p>
                ) : (
                  Object.entries(environments).map(([name, status]) => (
                    <a
                      key={name}
                      href={ENV_LINKS[name] || "#"}
                      target="_blank"
                      className="flex items-center justify-between rounded-lg border border-neutral-200 bg-white px-4 py-2.5 transition hover:border-neutral-300 hover:shadow-sm"
                    >
                      <span className="text-sm font-medium capitalize">
                        {name.replace("_", " ")}
                      </span>
                      <span className="flex items-center gap-1.5 text-xs text-green-600">
                        <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
                        {status}
                      </span>
                    </a>
                  ))
                );
              })()}
            </div>
          </div>

          {/* Intent distribution */}
          <div>
            <h2 className="mb-4 text-sm font-semibold uppercase tracking-widest text-neutral-400">
              Intent distribution
            </h2>
            <div className="space-y-2">
              {Object.entries(intent_distribution).map(([intent, pct]) => (
                <div key={intent}>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-neutral-600">
                      {INTENT_LABELS[intent] || intent}
                    </span>
                    <span className="text-neutral-400">{pct}%</span>
                  </div>
                  <div className="mt-1 h-1.5 w-full rounded-full bg-neutral-100">
                    <div
                      className="h-1.5 rounded-full bg-neutral-900"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              ))}
              {Object.keys(intent_distribution).length === 0 && (
                <p className="text-xs text-neutral-400">No data yet</p>
              )}
            </div>
          </div>

          {/* Learnings */}
          <div>
            <h2 className="mb-4 text-sm font-semibold uppercase tracking-widest text-neutral-400">
              Top learnings
            </h2>
            <div className="space-y-2">
              {learnings.length === 0 ? (
                <p className="text-xs text-neutral-400">
                  Learnings will appear after the feedback loop collects enough engagement data.
                </p>
              ) : (
                learnings.map((l, i) => (
                  <div
                    key={i}
                    className="rounded-lg border border-neutral-200 bg-white p-3"
                  >
                    <p className="text-xs text-neutral-600 line-clamp-2">
                      {l.example_tweet}
                    </p>
                    <p className="mt-1 text-[10px] text-neutral-400">
                      Score: {l.score} · {l.engagement.likes}L {l.engagement.replies}R
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
