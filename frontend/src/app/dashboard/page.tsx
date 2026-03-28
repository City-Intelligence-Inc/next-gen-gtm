"use client";

import { useEffect, useState, useRef } from "react";

type FilterMode = "all" | "mine";

export default function DashboardOverview() {
  const [mentions, setMentions] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [ratings, setRatings] = useState<Record<string, string>>({});
  const [filterMode, setFilterMode] = useState<FilterMode>("all");
  const [twitterHandle, setTwitterHandle] = useState("");
  const fetched = useRef(false);

  // Load ratings + twitter handle from localStorage
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const saved = localStorage.getItem("stardrop_mention_ratings");
      if (saved) setRatings(JSON.parse(saved));
    } catch {}
    const handle = localStorage.getItem("stardrop_settings_twitter") || "";
    setTwitterHandle(handle);
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

  // Filter mentions based on mode
  const normalizedHandle = twitterHandle.replace(/^@/, "").toLowerCase();
  const filteredMentions =
    filterMode === "mine" && normalizedHandle
      ? mentions.filter((m: any) => {
          const author = (m.author || "").toLowerCase();
          return author.includes(normalizedHandle);
        })
      : mentions;

  useEffect(() => {
    if (typeof window === "undefined") return;
    console.log(
      `[Stardrop:Overview] Filtering: ${filterMode} (handle: ${twitterHandle})`
    );
  }, [filterMode, twitterHandle]);

  // Stats
  const totalMentions = mentions.length;
  const repliedCount = mentions.filter((m: any) => m.response_preview).length;
  const ratedCount = Object.keys(ratings).length;

  const now = new Date();
  const dateStr = now.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20 bg-[#FAFAF9]">
        <div className="h-4 w-4 animate-spin rounded-full border-2 border-neutral-300 border-t-[#0A0A0A]" />
      </div>
    );
  }

  return (
    <div className="min-h-full bg-[#FAFAF9]">
      {/* Top banner — black bar */}
      <div className="bg-[#0A0A0A] text-white px-4 py-2.5 md:px-6">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/70">
            Stardrop GTM Intelligence
          </span>
          <div className="flex items-center gap-4">
            <span className="text-[10px] text-white/40">{dateStr}</span>
            <span className="flex items-center gap-1.5 text-[10px] text-white/50">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-green-500" />
              @stardroplin
            </span>
          </div>
        </div>
      </div>

      {/* Stats row */}
      <div className="border-b border-neutral-200 bg-white px-4 py-3 md:px-6">
        <div className="grid grid-cols-3 divide-x divide-neutral-200">
          <div className="pr-4">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-neutral-400">Total Mentions</p>
            <p className="text-2xl font-serif italic text-[#0A0A0A] leading-tight">{totalMentions}</p>
          </div>
          <div className="px-4">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-neutral-400">Replies</p>
            <p className="text-2xl font-serif italic text-[#0A0A0A] leading-tight">{repliedCount}</p>
          </div>
          <div className="pl-4">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-neutral-400">Rated</p>
            <p className="text-2xl font-serif italic text-[#0A0A0A] leading-tight">{ratedCount}</p>
          </div>
        </div>
      </div>

      {/* Mentions section */}
      <div className="px-4 py-3 md:px-6">
        {/* Header + filter */}
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-3">
            <h2 className="text-[10px] font-semibold uppercase tracking-widest text-neutral-400">
              Latest Mentions
            </h2>
            <span className="text-[10px] text-neutral-300">
              {filteredMentions.length}
              {filterMode === "mine" && mentions.length !== filteredMentions.length && (
                <span className="ml-0.5">of {mentions.length}</span>
              )}
            </span>
          </div>
          <div className="flex items-center gap-0.5">
            {twitterHandle && (
              <>
                <button
                  onClick={() => setFilterMode("all")}
                  className={`px-2.5 py-1 text-[10px] font-medium rounded transition ${
                    filterMode === "all"
                      ? "bg-[#0A0A0A] text-white"
                      : "text-neutral-400 hover:text-neutral-600"
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => setFilterMode("mine")}
                  className={`px-2.5 py-1 text-[10px] font-medium rounded transition ${
                    filterMode === "mine"
                      ? "bg-[#0A0A0A] text-white"
                      : "text-neutral-400 hover:text-neutral-600"
                  }`}
                >
                  Mine
                </button>
              </>
            )}
            <a
              href="https://x.com/stardroplin"
              target="_blank"
              className="ml-2 text-[10px] text-neutral-300 hover:text-neutral-600 transition"
            >
              View on X
            </a>
          </div>
        </div>

        <div className="h-px bg-neutral-200 mb-2" />

        {error ? (
          <div className="border border-neutral-200 bg-white p-6 text-center rounded">
            <p className="text-xs text-neutral-500">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-2 bg-[#0A0A0A] px-3 py-1.5 text-[11px] font-medium text-white rounded"
            >
              Retry
            </button>
          </div>
        ) : filteredMentions.length === 0 ? (
          <div className="border border-dashed border-neutral-200 bg-white p-8 text-center rounded">
            <p className="text-xs text-neutral-500">
              {filterMode === "mine"
                ? "No mentions from your handle yet."
                : "No mentions yet."}
            </p>
            {filterMode === "mine" ? (
              <button
                onClick={() => setFilterMode("all")}
                className="mt-3 bg-[#0A0A0A] px-4 py-2 text-xs font-medium text-white rounded"
              >
                Show all mentions
              </button>
            ) : (
              <a
                href="https://x.com/intent/tweet?text=@stardroplin%20"
                target="_blank"
                className="mt-3 inline-block bg-[#0A0A0A] px-4 py-2 text-xs font-medium text-white rounded"
              >
                Tag @stardroplin on X
              </a>
            )}
          </div>
        ) : (
          <div className="space-y-0">
            {filteredMentions.map((m: any, i: number) => {
              const tweetText =
                m.author?.split(": ").slice(1).join(": ") || m.author || "";
              const handle = m.author?.split(":")[0] || "";
              const id = m.mention_id || `${i}`;
              const currentRating = ratings[id];

              // Left border color based on rating
              const borderColor = currentRating === "good"
                ? "border-l-green-500"
                : currentRating === "bad"
                ? "border-l-red-500"
                : "border-l-[#0A0A0A]";

              return (
                <div
                  key={id}
                  className={`border border-neutral-200 border-l-[3px] ${borderColor} bg-white overflow-hidden ${i > 0 ? "-mt-px" : ""}`}
                >
                  {/* Mention */}
                  <a
                    href={
                      m.mention_id
                        ? `https://x.com/i/status/${m.mention_id}`
                        : "#"
                    }
                    target="_blank"
                    className="block px-3 pt-2.5 pb-1.5 hover:bg-neutral-50/50 transition"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-semibold text-[#0A0A0A]">
                        {handle}
                      </span>
                      <span className="text-[10px] text-neutral-300">
                        {m.ts ? new Date(m.ts).toLocaleString() : ""}
                      </span>
                    </div>
                    <p className="mt-1 text-[13px] text-neutral-700 leading-snug">
                      {tweetText}
                    </p>
                  </a>

                  {/* Stardrop's response */}
                  {m.response_preview && (
                    <div className="mx-3 mt-0.5 mb-2 bg-neutral-50 px-2.5 py-2 rounded">
                      <p className="text-[10px] font-medium text-neutral-400 mb-0.5">
                        @stardroplin
                      </p>
                      <p className="text-[12px] text-neutral-600 leading-snug">
                        {m.response_preview}
                      </p>
                    </div>
                  )}

                  {/* Bottom bar: intent + rating */}
                  <div className="flex items-center border-t border-neutral-100 px-3 py-1.5">
                    <span className="rounded-sm bg-neutral-100 px-1.5 py-0.5 text-[9px] font-medium text-neutral-500 uppercase tracking-wide">
                      {m.intent || "general"}
                    </span>
                    <div className="ml-auto flex items-center">
                      {currentRating ? (
                        <span
                          className={`text-[11px] font-medium ${
                            currentRating === "good"
                              ? "text-green-600"
                              : "text-red-500"
                          }`}
                        >
                          {currentRating === "good" ? "Good" : "Bad"}
                        </span>
                      ) : (
                        <div className="flex gap-0.5">
                          <button
                            onClick={() => rate(id, "bad")}
                            className="px-2 py-0.5 text-[10px] font-medium text-neutral-400 hover:bg-red-50 hover:text-red-600 transition rounded"
                          >
                            Bad
                          </button>
                          <button
                            onClick={() => rate(id, "good")}
                            className="px-2 py-0.5 text-[10px] font-medium text-neutral-400 hover:bg-green-50 hover:text-green-600 transition rounded"
                          >
                            Good
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
