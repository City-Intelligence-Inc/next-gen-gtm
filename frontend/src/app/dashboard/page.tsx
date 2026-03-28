"use client";

import { useEffect, useState, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

const INTENT_LABELS: Record<string, string> = {
  competitor_intel: "Competitor",
  icp_analyzer: "ICP",
  signal_scanner: "Signals",
  gtm_roast: "Roast",
  stack_advisor: "Stack",
  outbound_generator: "Outbound",
  general_gtm: "GTM",
};

function ScoreRing({ score, size = 40 }: { score: number; size?: number }) {
  const r = size / 2;
  const stroke = 3;
  const radius = r - stroke;
  const circ = 2 * Math.PI * radius;
  const maxScore = 50;
  const pct = Math.min(score / maxScore, 1);
  const offset = circ * (1 - pct);
  const color = score > 10 ? "#16a34a" : score > 0 ? "#171717" : "#d4d4d4";

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={r} cy={r} r={radius} fill="none" stroke="#f5f5f5" strokeWidth={stroke} />
        <circle cx={r} cy={r} r={radius} fill="none" stroke={color} strokeWidth={stroke}
          strokeDasharray={circ} strokeDashoffset={offset} strokeLinecap="round" />
      </svg>
      <span className="absolute inset-0 flex items-center justify-center text-[11px] font-bold text-neutral-900">
        {score}
      </span>
    </div>
  );
}

function DashboardContent() {
  const searchParams = useSearchParams();
  const urlUser = searchParams.get("user");
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState<string | null>(null);
  const fetched = useRef(false);

  useEffect(() => {
    const saved = urlUser || (typeof window !== "undefined" ? localStorage.getItem("stardrop_username") : null);
    setCurrentUser(saved);
  }, [urlUser]);

  useEffect(() => {
    if (fetched.current) return;
    fetched.current = true;

    async function load(attempts = 3) {
      const endpoint = currentUser
        ? `/api/proxy/dashboard/${currentUser}`
        : `/api/proxy/dashboard/overview`;

      for (let i = 0; i < attempts; i++) {
        try {
          const r = await fetch(endpoint);
          if ((r.status === 503 || r.status === 502) && i < attempts - 1) {
            await new Promise(res => setTimeout(res, (i + 1) * 3000));
            continue;
          }
          if (!r.ok) throw new Error(`${r.status}`);
          const d = await r.json();
          setData(d);
          return;
        } catch (e) {
          if (i === attempts - 1) setError(e instanceof Error ? e.message : "Failed");
          else await new Promise(res => setTimeout(res, (i + 1) * 3000));
        }
      }
    }
    load().finally(() => setLoading(false));
  }, [currentUser]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="h-5 w-5 animate-spin rounded-full border-2 border-neutral-200 border-t-neutral-900" />
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="px-6 py-8 max-w-5xl mx-auto">
        <h1 className="font-serif text-2xl italic text-neutral-900">Dashboard</h1>
        <div className="mt-4 rounded-lg border border-neutral-200 p-8 text-center">
          <p className="text-sm text-neutral-500">{error || "No data"}</p>
          <button onClick={() => window.location.reload()} className="mt-3 rounded-lg bg-neutral-900 px-4 py-2 text-xs text-white">Retry</button>
        </div>
      </div>
    );
  }

  const stats = data.stats || {};
  const mentions = data.recent_mentions || [];
  const intents = data.intent_distribution || {};
  const environments = data.environments || {};
  const user = data.user;

  return (
    <div className="px-4 py-6 md:px-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-serif text-2xl italic text-neutral-900">
              {currentUser ? `@${currentUser}` : "Dashboard"}
            </h1>
            {currentUser && (
              <span className="rounded-full bg-neutral-900 px-2 py-0.5 text-[10px] font-medium text-white">personal agent</span>
            )}
          </div>
          <p className="mt-0.5 text-xs text-neutral-400">{stats.total_mentions || 0} mentions &middot; {stats.replies_sent || 0} replies</p>
        </div>
        <div className="flex items-center gap-2">
          <a href="/improve" className="rounded-lg border border-neutral-200 px-3 py-1.5 text-xs font-medium text-neutral-600 hover:bg-neutral-50">Improve</a>
          <a href="/rate" className="rounded-lg border border-neutral-200 px-3 py-1.5 text-xs font-medium text-neutral-600 hover:bg-neutral-50">Rate</a>
          {!currentUser && (
            <a href="/onboard" className="rounded-lg bg-neutral-900 px-3 py-1.5 text-xs font-medium text-white hover:bg-neutral-800">Connect X</a>
          )}
        </div>
      </div>

      {/* Stats row — compact */}
      <div className="grid grid-cols-4 gap-2 mb-6">
        {[
          { label: "Mentions", value: stats.total_mentions || 0 },
          { label: "Replied", value: stats.replies_sent || 0 },
          { label: "Engagement", value: stats.avg_engagement || 0 },
          { label: "Score", value: `${stats.avg_engagement || 0}/50` },
        ].map((s) => (
          <div key={s.label} className="rounded-lg bg-neutral-950 px-4 py-3">
            <p className="text-[10px] uppercase tracking-widest text-neutral-500">{s.label}</p>
            <p className="mt-0.5 text-xl font-bold text-white tabular-nums">{s.value}</p>
          </div>
        ))}
      </div>

      {/* Main grid */}
      <div className="grid gap-4 lg:grid-cols-[1fr_280px]">
        {/* Mentions feed */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-[11px] font-semibold uppercase tracking-widest text-neutral-400">Mentions</h2>
            <span className="text-[11px] text-neutral-300">{mentions.length} total</span>
          </div>

          {mentions.length === 0 ? (
            <div className="rounded-lg border border-dashed border-neutral-200 p-8 text-center">
              <p className="text-sm text-neutral-400">
                {currentUser ? `No mentions from @${currentUser} yet.` : "No mentions yet."}
              </p>
              <p className="mt-1 text-xs text-neutral-300">Tag @stardroplin on X to get started.</p>
            </div>
          ) : (
            <div className="space-y-2">
              {mentions.map((m: any, i: number) => {
                const score = (m.likes || 0) * 3 + (m.replies || 0) * 5 + (m.retweets || 0) * 2;
                const tweetText = m.author?.split(": ").slice(1).join(": ") || m.author || "";
                const handle = m.author?.split(":")[0] || "";

                return (
                  <a
                    key={i}
                    href={m.mention_id ? `https://x.com/i/status/${m.mention_id}` : "#"}
                    target="_blank"
                    className="group flex gap-3 rounded-lg border border-neutral-200 bg-white p-3 transition hover:border-neutral-300 hover:shadow-sm"
                  >
                    {/* Score ring */}
                    <div className="shrink-0 pt-0.5">
                      <ScoreRing score={score} size={38} />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-semibold text-neutral-900">{handle}</span>
                          <span className="rounded bg-neutral-100 px-1.5 py-0.5 text-[9px] font-medium text-neutral-500 uppercase">
                            {INTENT_LABELS[m.intent] || m.intent}
                          </span>
                          {m.replied && (
                            <span className="h-1.5 w-1.5 rounded-full bg-green-500" title="replied" />
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] text-neutral-300">{m.ts ? new Date(m.ts).toLocaleDateString() : ""}</span>
                          <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 text-neutral-300 group-hover:text-neutral-500" fill="currentColor">
                            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                          </svg>
                        </div>
                      </div>

                      <p className="mt-1 text-sm text-neutral-700 leading-snug">{tweetText}</p>

                      {m.response_preview && (
                        <div className="mt-2 rounded bg-neutral-50 px-2.5 py-2">
                          <p className="text-[11px] text-neutral-500 leading-relaxed line-clamp-2">{m.response_preview}</p>
                        </div>
                      )}

                      {/* Engagement inline */}
                      <div className="mt-1.5 flex items-center gap-3 text-[10px] text-neutral-400">
                        <span>{m.likes || 0}L</span>
                        <span>{m.replies || 0}R</span>
                        <span>{m.retweets || 0}RT</span>
                        <span className="font-semibold text-neutral-600">{score}pts</span>
                      </div>
                    </div>
                  </a>
                );
              })}
            </div>
          )}
        </div>

        {/* Sidebar — compact */}
        <div className="space-y-4">
          {/* Intents */}
          {Object.keys(intents).length > 0 && (
            <div className="rounded-lg border border-neutral-200 p-3">
              <h3 className="text-[10px] font-semibold uppercase tracking-widest text-neutral-400 mb-2">Intents</h3>
              {Object.entries(intents).map(([k, v]: [string, any]) => (
                <div key={k} className="mb-1.5">
                  <div className="flex justify-between text-[11px]">
                    <span className="text-neutral-600">{INTENT_LABELS[k] || k}</span>
                    <span className="font-bold tabular-nums">{v}%</span>
                  </div>
                  <div className="mt-0.5 h-1 rounded-full bg-neutral-100">
                    <div className="h-1 rounded-full bg-neutral-900" style={{ width: `${v}%` }} />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Environments */}
          {Object.keys(environments).length > 0 && (
            <div className="rounded-lg border border-neutral-200 p-3">
              <h3 className="text-[10px] font-semibold uppercase tracking-widest text-neutral-400 mb-2">Environments</h3>
              {Object.entries(environments).map(([name, status]: [string, any]) => (
                <div key={name} className="flex items-center justify-between py-1 text-[11px]">
                  <span className="text-neutral-600 capitalize">{name.replace("_", " ")}</span>
                  <span className="flex items-center gap-1 text-green-600">
                    <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
                    live
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* Quick actions */}
          <div className="rounded-lg bg-neutral-950 p-3">
            <h3 className="text-[10px] font-semibold uppercase tracking-widest text-neutral-500 mb-2">Quick</h3>
            <div className="space-y-1.5">
              <a href="https://x.com/intent/tweet?text=@stardroplin%20" target="_blank"
                className="block rounded bg-white/10 px-3 py-2 text-xs text-white hover:bg-white/20 transition">
                Tag @stardroplin
              </a>
              <a href="/improve" className="block rounded bg-white/10 px-3 py-2 text-xs text-white hover:bg-white/20 transition">
                Improve responses
              </a>
              <a href="/rate" className="block rounded bg-white/10 px-3 py-2 text-xs text-white hover:bg-white/20 transition">
                Rate responses
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function DashboardOverview() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center py-20"><div className="h-5 w-5 animate-spin rounded-full border-2 border-neutral-200 border-t-neutral-900" /></div>}>
      <DashboardContent />
    </Suspense>
  );
}
