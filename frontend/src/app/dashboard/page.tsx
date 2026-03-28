"use client";

import { useEffect, useState, useRef } from "react";

export default function DashboardOverview() {
  const [mentions, setMentions] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [ratings, setRatings] = useState<Record<string, string>>({});
  const fetched = useRef(false);

  // Load ratings from localStorage
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const saved = localStorage.getItem("stardrop_mention_ratings");
      if (saved) setRatings(JSON.parse(saved));
    } catch {}
  }, []);

  // Fetch mentions
  useEffect(() => {
    if (fetched.current) return;
    fetched.current = true;
    console.log("[Stardrop:Overview] Loading mentions...");

    async function load() {
      for (let i = 0; i < 3; i++) {
        try {
          const r = await fetch("/api/proxy/dashboard/overview");
          if (r.status >= 500 && i < 2) {
            await new Promise((res) => setTimeout(res, (i + 1) * 3000));
            continue;
          }
          if (!r.ok) throw new Error(`${r.status}`);
          const d = await r.json();
          const items = d.recent_mentions || [];
          console.log(`[Stardrop:Overview] Loaded ${items.length} mentions`);
          setMentions(items);
          return;
        } catch (e) {
          if (i === 2) setError(e instanceof Error ? e.message : "Failed to load");
        }
      }
    }
    load().finally(() => setLoading(false));
  }, []);

  const rate = (mentionId: string, rating: string) => {
    console.log(`[Stardrop:Overview] Rated mention ${mentionId}: ${rating}`);
    const updated = { ...ratings, [mentionId]: rating };
    setRatings(updated);
    localStorage.setItem("stardrop_mention_ratings", JSON.stringify(updated));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="h-5 w-5 animate-spin rounded-full border-2 border-neutral-200 border-t-neutral-900" />
      </div>
    );
  }

  return (
    <div className="px-4 py-6 md:px-8 max-w-3xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <span className="inline-block h-2.5 w-2.5 rounded-full bg-green-500" />
          <span className="text-sm font-medium text-neutral-900">
            @stardroplin
          </span>
          <span className="text-xs text-neutral-400">
            {mentions.length} mention{mentions.length !== 1 ? "s" : ""}
          </span>
        </div>
        <a
          href="https://x.com/stardroplin"
          target="_blank"
          className="text-xs text-neutral-400 hover:text-neutral-900 transition"
        >
          View on X →
        </a>
      </div>

      {error ? (
        <div className="rounded-lg border border-neutral-200 p-8 text-center">
          <p className="text-sm text-neutral-500">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-3 rounded-lg bg-neutral-900 px-4 py-2 text-xs text-white"
          >
            Retry
          </button>
        </div>
      ) : mentions.length === 0 ? (
        <div className="rounded-lg border border-dashed border-neutral-200 p-12 text-center">
          <p className="text-sm text-neutral-500">No mentions yet.</p>
          <a
            href="https://x.com/intent/tweet?text=@stardroplin%20"
            target="_blank"
            className="mt-4 inline-block rounded-lg bg-neutral-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-neutral-800"
          >
            Tag @stardroplin on X
          </a>
        </div>
      ) : (
        <div className="space-y-3">
          {mentions.map((m: any, i: number) => {
            const tweetText =
              m.author?.split(": ").slice(1).join(": ") || m.author || "";
            const handle = m.author?.split(":")[0] || "";
            const id = m.mention_id || `${i}`;
            const currentRating = ratings[id];

            return (
              <div
                key={i}
                className="rounded-xl border border-neutral-200 bg-white overflow-hidden"
              >
                {/* Mention */}
                <a
                  href={
                    m.mention_id
                      ? `https://x.com/i/status/${m.mention_id}`
                      : "#"
                  }
                  target="_blank"
                  className="block px-4 pt-4 pb-2 hover:bg-neutral-50/50 transition"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-neutral-900">
                      {handle}
                    </span>
                    <span className="text-[10px] text-neutral-300">
                      {m.ts ? new Date(m.ts).toLocaleString() : ""}
                    </span>
                  </div>
                  <p className="mt-1.5 text-sm text-neutral-700 leading-snug">
                    {tweetText}
                  </p>
                </a>

                {/* Stardrop's response */}
                {m.response_preview && (
                  <div className="mx-4 mt-1 mb-3 rounded-lg bg-neutral-50 px-3 py-2.5 border-l-2 border-neutral-900">
                    <p className="text-[11px] font-medium text-neutral-400 mb-1">
                      @stardroplin replied
                    </p>
                    <p className="text-xs text-neutral-600 leading-relaxed">
                      {m.response_preview}
                    </p>
                  </div>
                )}

                {/* Rating bar */}
                <div className="flex items-center border-t border-neutral-100 px-4 py-2">
                  <span className="text-[10px] text-neutral-300 mr-auto">
                    {m.intent || "general"}
                  </span>
                  {currentRating ? (
                    <span
                      className={`text-xs font-medium ${
                        currentRating === "good"
                          ? "text-green-600"
                          : "text-red-500"
                      }`}
                    >
                      {currentRating === "good" ? "👍 Good" : "👎 Bad"}
                    </span>
                  ) : (
                    <div className="flex gap-1">
                      <button
                        onClick={() => rate(id, "bad")}
                        className="rounded-md px-3 py-1 text-xs text-neutral-400 hover:bg-red-50 hover:text-red-600 transition"
                      >
                        👎
                      </button>
                      <button
                        onClick={() => rate(id, "good")}
                        className="rounded-md px-3 py-1 text-xs text-neutral-400 hover:bg-green-50 hover:text-green-600 transition"
                      >
                        👍
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
