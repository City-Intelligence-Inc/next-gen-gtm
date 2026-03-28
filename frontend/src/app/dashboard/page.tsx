"use client";

import { useEffect, useState, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

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
          console.log("[Stardrop:Overview] Fetching dashboard data");
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
      <div className="px-6 py-8 max-w-4xl mx-auto">
        <h1 className="text-xl font-semibold text-neutral-900">Overview</h1>
        <div className="mt-4 rounded-lg border border-neutral-200 p-8 text-center">
          <p className="text-sm text-neutral-500">{error || "No data"}</p>
          <button onClick={() => window.location.reload()} className="mt-3 rounded-lg bg-neutral-900 px-4 py-2 text-xs text-white">Retry</button>
        </div>
      </div>
    );
  }

  const stats = data.stats || {};
  const mentions = data.recent_mentions || [];

  return (
    <div className="px-4 py-6 md:px-8 max-w-4xl mx-auto">
      {/* Agent status */}
      <div className="flex items-center gap-2 mb-6">
        <span className="inline-block h-2.5 w-2.5 rounded-full bg-green-500" />
        <span className="text-sm font-medium text-neutral-900">@stardroplin is active</span>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-3 mb-8">
        {[
          { label: "Total mentions", value: stats.total_mentions || 0 },
          { label: "Replies sent", value: stats.replies_sent || 0 },
          { label: "Avg engagement", value: stats.avg_engagement || 0 },
        ].map((s) => (
          <div key={s.label} className="rounded-lg bg-neutral-950 px-4 py-3">
            <p className="text-[10px] uppercase tracking-widest text-neutral-500">{s.label}</p>
            <p className="mt-0.5 text-xl font-bold text-white tabular-nums">{s.value}</p>
          </div>
        ))}
      </div>

      {/* Recent mentions */}
      <div>
        <h2 className="text-[11px] font-semibold uppercase tracking-widest text-neutral-400 mb-3">
          Recent mentions
        </h2>

        {mentions.length === 0 ? (
          <div className="rounded-lg border border-dashed border-neutral-200 p-8 text-center">
            <p className="text-sm text-neutral-400">No mentions yet.</p>
            <p className="mt-1 text-xs text-neutral-300">Tag @stardroplin on X to get started.</p>
          </div>
        ) : (
          <div className="space-y-2">
            {mentions.map((m: any, i: number) => {
              const tweetText = m.author?.split(": ").slice(1).join(": ") || m.author || "";
              const handle = m.author?.split(":")[0] || "";

              return (
                <a
                  key={i}
                  href={m.mention_id ? `https://x.com/i/status/${m.mention_id}` : "#"}
                  target="_blank"
                  className="group flex gap-3 rounded-lg border border-neutral-200 bg-white p-3 transition hover:border-neutral-300 hover:shadow-sm"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-neutral-900">{handle}</span>
                      <span className="text-[10px] text-neutral-300">{m.ts ? new Date(m.ts).toLocaleDateString() : ""}</span>
                    </div>
                    <p className="mt-1 text-sm text-neutral-700 leading-snug">{tweetText}</p>
                    {m.response_preview && (
                      <div className="mt-2 rounded bg-neutral-50 px-2.5 py-2">
                        <p className="text-[11px] text-neutral-500 leading-relaxed line-clamp-2">{m.response_preview}</p>
                      </div>
                    )}
                  </div>
                </a>
              );
            })}
          </div>
        )}
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
