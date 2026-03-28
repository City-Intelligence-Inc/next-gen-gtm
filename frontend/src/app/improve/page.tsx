"use client";

import { useEffect, useState } from "react";

const API = "https://xitwxb23yn.us-east-1.awsapprunner.com";

interface ImprovementData {
  summary: {
    total_days: number;
    total_mentions: number;
    total_replies: number;
    first_day_score: number;
    latest_score: number;
    total_improvement_pct: number;
    theoretical_1pct_after_30_days: number;
    theoretical_1pct_after_90_days: number;
    theoretical_1pct_after_365_days: number;
  };
  timeline: Array<{
    date: string;
    mentions: number;
    replies: number;
    avg_engagement: number;
  }>;
  compound_curve: Array<{
    date: string;
    day: number;
    actual: number;
    theoretical_1pct: number;
    improvement_pct: number;
  }>;
}

export default function ImprovePage() {
  const [data, setData] = useState<ImprovementData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API}/api/dashboard/improvement`)
      .then((r) => r.json())
      .then(setData)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const s = data?.summary;
  const curve = data?.compound_curve || [];
  const maxActual = Math.max(...curve.map((c) => c.actual), 1);
  const maxTheoretical = Math.max(...curve.map((c) => c.theoretical_1pct), 1);
  const maxVal = Math.max(maxActual, maxTheoretical, 1);

  return (
    <div className="min-h-screen bg-white">
      {/* Nav */}
      <nav className="border-b border-neutral-200 bg-white/95 backdrop-blur-sm">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-6 py-4">
          <a href="/" className="font-serif text-xl italic text-neutral-900">
            Stardrop
          </a>
          <a
            href="/dashboard"
            className="text-sm text-neutral-500 hover:text-neutral-900 transition"
          >
            Dashboard
          </a>
        </div>
      </nav>

      <div className="mx-auto max-w-4xl px-6 py-16">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-neutral-400">
          1% better every day
        </p>
        <h1 className="mt-2 font-serif text-4xl italic tracking-tight text-neutral-900 sm:text-5xl">
          Compound improvement
        </h1>
        <p className="mt-4 max-w-lg text-sm leading-relaxed text-neutral-500">
          Every interaction makes Stardrop smarter. The feedback loop extracts
          what works, discards what doesn&apos;t, and compounds over time.
          1% daily = 37.78x in a year.
        </p>

        {loading ? (
          <div className="mt-16 text-center">
            <p className="text-sm text-neutral-400">Loading improvement data...</p>
          </div>
        ) : !data || curve.length === 0 ? (
          <div className="mt-16">
            <div className="rounded-2xl border border-dashed border-neutral-200 p-12 text-center">
              <p className="font-serif text-2xl italic text-neutral-300">
                Day 1
              </p>
              <p className="mt-4 text-sm text-neutral-400">
                The improvement curve starts now. Tag @stardroplin on X to
                generate data. Check back tomorrow to see day-over-day
                improvement.
              </p>
              <a
                href="https://x.com/intent/tweet?text=@stardroplin%20"
                target="_blank"
                className="mt-6 inline-block rounded-lg bg-neutral-900 px-6 py-3 text-sm font-medium text-white hover:bg-neutral-800"
              >
                Generate your first data point
              </a>
            </div>

            {/* Show theoretical curve even with no data */}
            <div className="mt-12">
              <h2 className="text-sm font-semibold uppercase tracking-widest text-neutral-400">
                Projected compound curve
              </h2>
              <div className="mt-6 grid gap-4 sm:grid-cols-3">
                <div className="rounded-xl border border-neutral-200 p-5 text-center">
                  <p className="font-serif text-3xl italic text-neutral-900">
                    1.35x
                  </p>
                  <p className="mt-1 text-xs text-neutral-500">
                    After 30 days (1%/day)
                  </p>
                </div>
                <div className="rounded-xl border border-neutral-200 p-5 text-center">
                  <p className="font-serif text-3xl italic text-neutral-900">
                    2.45x
                  </p>
                  <p className="mt-1 text-xs text-neutral-500">
                    After 90 days (1%/day)
                  </p>
                </div>
                <div className="rounded-xl border border-neutral-200 p-5 text-center">
                  <p className="font-serif text-3xl italic text-neutral-900">
                    37.78x
                  </p>
                  <p className="mt-1 text-xs text-neutral-500">
                    After 365 days (1%/day)
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <>
            {/* Stats */}
            <div className="mt-12 grid gap-4 sm:grid-cols-4">
              <div className="rounded-xl border border-neutral-200 p-5">
                <p className="text-xs font-medium uppercase tracking-widest text-neutral-400">
                  Day
                </p>
                <p className="mt-2 font-serif text-3xl italic text-neutral-900">
                  {s?.total_days}
                </p>
              </div>
              <div className="rounded-xl border border-neutral-200 p-5">
                <p className="text-xs font-medium uppercase tracking-widest text-neutral-400">
                  Improvement
                </p>
                <p className="mt-2 font-serif text-3xl italic text-neutral-900">
                  {s && s.total_improvement_pct > 0 ? "+" : ""}
                  {s?.total_improvement_pct}%
                </p>
              </div>
              <div className="rounded-xl border border-neutral-200 p-5">
                <p className="text-xs font-medium uppercase tracking-widest text-neutral-400">
                  Mentions
                </p>
                <p className="mt-2 font-serif text-3xl italic text-neutral-900">
                  {s?.total_mentions}
                </p>
              </div>
              <div className="rounded-xl border border-neutral-200 p-5">
                <p className="text-xs font-medium uppercase tracking-widest text-neutral-400">
                  Replies
                </p>
                <p className="mt-2 font-serif text-3xl italic text-neutral-900">
                  {s?.total_replies}
                </p>
              </div>
            </div>

            {/* Chart */}
            <div className="mt-12">
              <h2 className="text-sm font-semibold uppercase tracking-widest text-neutral-400">
                Engagement score over time
              </h2>
              <div className="mt-6 rounded-2xl border border-neutral-200 p-6">
                <div className="flex items-end gap-1 h-48">
                  {curve.map((c, i) => (
                    <div
                      key={i}
                      className="flex-1 flex flex-col items-center justify-end gap-0.5"
                    >
                      {/* Theoretical line dot */}
                      <div
                        className="w-1.5 rounded-full bg-neutral-200"
                        style={{
                          height: `${(c.theoretical_1pct / maxVal) * 100}%`,
                          minHeight: "2px",
                        }}
                      />
                      {/* Actual bar */}
                      <div
                        className="w-full max-w-[20px] rounded-t bg-neutral-900"
                        style={{
                          height: `${(c.actual / maxVal) * 100}%`,
                          minHeight: c.actual > 0 ? "4px" : "0px",
                        }}
                      />
                    </div>
                  ))}
                </div>
                <div className="mt-4 flex items-center justify-between text-xs text-neutral-400">
                  <span>{curve[0]?.date}</span>
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1">
                      <span className="h-2 w-2 rounded-full bg-neutral-900" />
                      Actual
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="h-2 w-2 rounded-full bg-neutral-200" />
                      1%/day target
                    </span>
                  </div>
                  <span>{curve[curve.length - 1]?.date}</span>
                </div>
              </div>
            </div>

            {/* Projections */}
            <div className="mt-12">
              <h2 className="text-sm font-semibold uppercase tracking-widest text-neutral-400">
                If you keep going
              </h2>
              <div className="mt-6 grid gap-4 sm:grid-cols-3">
                <div className="rounded-xl border border-neutral-200 p-5 text-center">
                  <p className="font-serif text-3xl italic text-neutral-900">
                    {s?.theoretical_1pct_after_30_days}
                  </p>
                  <p className="mt-1 text-xs text-neutral-500">
                    Engagement score at day 30
                  </p>
                </div>
                <div className="rounded-xl border border-neutral-200 p-5 text-center">
                  <p className="font-serif text-3xl italic text-neutral-900">
                    {s?.theoretical_1pct_after_90_days}
                  </p>
                  <p className="mt-1 text-xs text-neutral-500">
                    Engagement score at day 90
                  </p>
                </div>
                <div className="rounded-xl border border-neutral-200 p-5 text-center">
                  <p className="font-serif text-3xl italic text-neutral-900">
                    {s?.theoretical_1pct_after_365_days}
                  </p>
                  <p className="mt-1 text-xs text-neutral-500">
                    Engagement score at day 365
                  </p>
                </div>
              </div>
            </div>

            {/* Daily log */}
            <div className="mt-12">
              <h2 className="text-sm font-semibold uppercase tracking-widest text-neutral-400">
                Daily log
              </h2>
              <div className="mt-4 space-y-2">
                {data.timeline
                  .slice()
                  .reverse()
                  .map((d, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between rounded-lg border border-neutral-200 px-4 py-3"
                    >
                      <span className="text-sm font-medium">{d.date}</span>
                      <div className="flex items-center gap-6 text-xs text-neutral-500">
                        <span>{d.mentions} mentions</span>
                        <span>{d.replies} replies</span>
                        <span className="font-semibold text-neutral-900">
                          {d.avg_engagement} avg score
                        </span>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </>
        )}

        {/* Philosophy */}
        <div className="mt-20 border-t border-neutral-200 pt-12">
          <blockquote className="font-serif text-xl italic text-neutral-400 leading-relaxed">
            &quot;1% better every day for a year = 37.78x improvement.
            1% worse every day = 97% decline. The system that learns
            fastest wins.&quot;
          </blockquote>
          <p className="mt-3 text-xs text-neutral-400">
            — James Clear, Atomic Habits / The Self-Improving GTM Engine
          </p>
        </div>
      </div>
    </div>
  );
}
