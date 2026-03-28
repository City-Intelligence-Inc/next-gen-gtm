"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import Link from "next/link";

type FilterMode = "all" | "mine";

interface RagSource {
  title: string;
  folder: string;
  file: string;
  relevance: number;
}

function toSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function SourceCitations({ sources }: { sources: RagSource[] }) {
  if (!sources || sources.length === 0) return null;

  return (
    <div className="flex flex-wrap items-center gap-1.5 mt-2">
      <span className="text-[9px] font-semibold uppercase tracking-widest text-neutral-300">
        Sources:
      </span>
      {sources.map((src) => (
        <Link
          key={src.title}
          href={`/research/${toSlug(src.title)}`}
          className="inline-flex items-center gap-1 rounded-full border border-neutral-200 bg-neutral-50 px-2 py-0.5 text-[10px] text-neutral-500 transition hover:border-neutral-300 hover:text-neutral-700"
        >
          {src.title}
          <span className="rounded-sm bg-neutral-200 px-1 py-px text-[8px] font-semibold text-neutral-400 tabular-nums">
            {src.relevance}%
          </span>
        </Link>
      ))}
    </div>
  );
}

export default function DashboardOverview() {
  const [mentions, setMentions] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [ratings, setRatings] = useState<Record<string, string>>({});
  const [filterMode, setFilterMode] = useState<FilterMode>("all");
  const [twitterHandle, setTwitterHandle] = useState("");
  const [view, setView] = useState<"feed" | "rate">("feed");
  const [rateIndex, setRateIndex] = useState(0);
  const [swipeDir, setSwipeDir] = useState<"left" | "right" | null>(null);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const fetched = useRef(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const saved = localStorage.getItem("stardrop_mention_ratings");
      if (saved) setRatings(JSON.parse(saved));
    } catch {}
    setTwitterHandle(localStorage.getItem("stardrop_settings_twitter") || "");
  }, []);

  useEffect(() => {
    if (fetched.current) return;
    fetched.current = true;
    console.log("[Stardrop:Overview] Loading mentions...");
    async function load() {
      for (let i = 0; i < 3; i++) {
        try {
          const r = await fetch("/api/proxy/dashboard/overview");
          if (r.status >= 500 && i < 2) { await new Promise(res => setTimeout(res, (i + 1) * 3000)); continue; }
          if (!r.ok) throw new Error(`${r.status}`);
          const d = await r.json();
          setMentions(d.recent_mentions || []);
          return;
        } catch (e) { if (i === 2) setError(e instanceof Error ? e.message : "Failed"); }
      }
    }
    load().finally(() => setLoading(false));
  }, []);

  const rate = useCallback((mentionId: string, rating: string) => {
    console.log(`[Stardrop:Overview] Rated mention ${mentionId}: ${rating}`);
    setRatings(prev => {
      const updated = { ...prev, [mentionId]: rating };
      localStorage.setItem("stardrop_mention_ratings", JSON.stringify(updated));
      return updated;
    });
  }, []);

  // Filter
  const normalizedHandle = twitterHandle.replace(/^@/, "").toLowerCase();
  const filteredMentions = filterMode === "mine" && normalizedHandle
    ? mentions.filter((m: any) => (m.author || "").toLowerCase().includes(normalizedHandle))
    : mentions;

  // Unrated mentions for rate mode
  const unrated = filteredMentions.filter((m: any) => {
    const id = m.mention_id || "";
    return !ratings[id];
  });

  // Swipe handler for rate mode
  const handleSwipe = useCallback((dir: "left" | "right") => {
    if (rateIndex >= unrated.length) return;
    const m = unrated[rateIndex];
    const id = m.mention_id || `${rateIndex}`;
    setSwipeDir(dir);
    setTimeout(() => {
      rate(id, dir === "right" ? "good" : "bad");
      setRateIndex(prev => prev + 1);
      setSwipeDir(null);
    }, 250);
  }, [rateIndex, unrated, rate]);

  // Keyboard shortcuts in rate mode
  useEffect(() => {
    if (view !== "rate") return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") handleSwipe("left");
      else if (e.key === "ArrowRight") handleSwipe("right");
      else if (e.key === " ") { e.preventDefault(); setRateIndex(prev => prev + 1); }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [view, handleSwipe]);

  // Stats
  const totalMentions = mentions.length;
  const ratedGood = Object.values(ratings).filter(r => r === "good").length;
  const ratedBad = Object.values(ratings).filter(r => r === "bad").length;
  const dateStr = new Date().toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });

  if (loading) {
    return (
      <div className="min-h-full bg-[#FAFAF9]">
        <div className="bg-[#0A0A0A] text-white px-4 py-2 md:px-6">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/70">Stardrop GTM Intelligence</span>
            <span className="flex items-center gap-1.5 text-[10px] text-white/50">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
              @stardroplin
            </span>
          </div>
        </div>
        <div className="border-b border-neutral-200 bg-white px-4 py-2.5 md:px-6">
          <div className="flex items-center gap-6">
            {[1,2,3,4].map(i => (
              <div key={i}>
                <div className="h-2 w-12 rounded bg-neutral-100 animate-pulse" />
                <div className="mt-2 h-5 w-8 rounded bg-neutral-100 animate-pulse" />
              </div>
            ))}
          </div>
        </div>
        <div className="px-4 py-3 md:px-6 space-y-2">
          {[1,2,3,4].map(i => (
            <div key={i} className="rounded-xl border border-neutral-200 bg-white p-4">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-full bg-neutral-100 animate-pulse" />
                <div className="flex-1 space-y-2">
                  <div className="h-3 w-24 rounded bg-neutral-100 animate-pulse" />
                  <div className="h-3 w-full rounded bg-neutral-50 animate-pulse" />
                </div>
              </div>
              <div className="mt-3 ml-11 rounded-lg bg-neutral-50 p-3">
                <div className="space-y-1.5">
                  <div className="h-2.5 w-3/4 rounded bg-neutral-100 animate-pulse" />
                  <div className="h-2.5 w-1/2 rounded bg-neutral-100 animate-pulse" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-full bg-[#FAFAF9]">
      {/* Top banner */}
      <div className="bg-[#0A0A0A] text-white px-4 py-2 md:px-6">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/70">
            Stardrop GTM Intelligence
          </span>
          <div className="flex items-center gap-3">
            <span className="text-[10px] text-white/40">{dateStr}</span>
            <span className="flex items-center gap-1.5 text-[10px] text-white/50">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-green-500" />
              @stardroplin
            </span>
          </div>
        </div>
      </div>

      {/* Stats + View toggle */}
      <div className="border-b border-neutral-200 bg-white px-4 py-2.5 md:px-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div>
              <p className="text-[9px] font-semibold uppercase tracking-widest text-neutral-400">Mentions</p>
              <p className="text-xl font-serif italic text-[#0A0A0A] leading-tight">{totalMentions}</p>
            </div>
            <div className="h-8 w-px bg-neutral-200" />
            <div>
              <p className="text-[9px] font-semibold uppercase tracking-widest text-green-600">Good</p>
              <p className="text-xl font-serif italic text-green-600 leading-tight">{ratedGood}</p>
            </div>
            <div>
              <p className="text-[9px] font-semibold uppercase tracking-widest text-red-500">Bad</p>
              <p className="text-xl font-serif italic text-red-500 leading-tight">{ratedBad}</p>
            </div>
            <div>
              <p className="text-[9px] font-semibold uppercase tracking-widest text-neutral-400">Unrated</p>
              <p className="text-xl font-serif italic text-neutral-400 leading-tight">{unrated.length}</p>
            </div>
          </div>
          <div className="flex items-center gap-1 rounded-lg border border-neutral-200 p-0.5">
            <button
              onClick={() => { setView("feed"); setRateIndex(0); }}
              className={`px-3 py-1.5 text-[10px] font-semibold rounded-md transition ${
                view === "feed" ? "bg-[#0A0A0A] text-white" : "text-neutral-500 hover:text-neutral-700"
              }`}
            >
              Feed
            </button>
            <button
              onClick={() => { setView("rate"); setRateIndex(0); }}
              className={`px-3 py-1.5 text-[10px] font-semibold rounded-md transition ${
                view === "rate" ? "bg-[#0A0A0A] text-white" : "text-neutral-500 hover:text-neutral-700"
              }`}
            >
              Rate {unrated.length > 0 && <span className="ml-1 rounded-full bg-red-500 px-1.5 py-0.5 text-[9px] text-white">{unrated.length}</span>}
            </button>
          </div>
        </div>
      </div>

      {error ? (
        <div className="px-4 py-12 md:px-6 text-center">
          <div className="mx-auto max-w-sm rounded-xl border border-neutral-200 bg-white p-8">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-neutral-100">
              <svg className="h-5 w-5 text-neutral-400" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                <circle cx="10" cy="10" r="8" />
                <line x1="10" y1="6" x2="10" y2="10" />
                <circle cx="10" cy="13" r="0.5" fill="currentColor" />
              </svg>
            </div>
            <p className="text-sm font-semibold text-neutral-900">Backend warming up</p>
            <p className="mt-1 text-xs text-neutral-500">App Runner is cold starting. Usually takes 10-30 seconds.</p>
            <p className="mt-2 font-mono text-[10px] text-neutral-300">{error}</p>
            <button onClick={() => window.location.reload()} className="mt-4 bg-[#0A0A0A] px-5 py-2 text-xs font-medium text-white rounded-lg hover:bg-neutral-800 transition">
              Retry
            </button>
          </div>
        </div>
      ) : view === "rate" ? (
        /* ======= RATE MODE — Swipeable Twitter-style cards ======= */
        <div className="px-4 py-6 md:px-6 flex flex-col items-center">
          {rateIndex < unrated.length ? (
            <>
              <p className="text-[10px] font-semibold uppercase tracking-widest text-neutral-400 mb-3">
                {rateIndex + 1} of {unrated.length} to rate
              </p>

              {/* The swipeable card */}
              <div
                className={`w-full max-w-lg rounded-2xl border border-neutral-200 bg-white shadow-lg overflow-hidden transition-all duration-250 ${
                  swipeDir === "left" ? "-translate-x-[120%] rotate-[-8deg] opacity-0" :
                  swipeDir === "right" ? "translate-x-[120%] rotate-[8deg] opacity-0" : ""
                }`}
                onTouchStart={(e) => setTouchStart(e.touches[0].clientX)}
                onTouchEnd={(e) => {
                  if (touchStart === null) return;
                  const diff = e.changedTouches[0].clientX - touchStart;
                  if (diff > 80) handleSwipe("right");
                  else if (diff < -80) handleSwipe("left");
                  setTouchStart(null);
                }}
              >
                {/* Tweet header */}
                <div className="px-5 pt-5 pb-3">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-neutral-200 flex items-center justify-center text-sm font-bold text-neutral-500">
                      {(unrated[rateIndex].author?.split(":")[0] || "?").charAt(1)?.toUpperCase() || "?"}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-[#0A0A0A]">
                        {unrated[rateIndex].author?.split(":")[0] || ""}
                      </p>
                      <p className="text-[11px] text-neutral-400">
                        {unrated[rateIndex].ts ? new Date(unrated[rateIndex].ts).toLocaleString() : ""}
                      </p>
                    </div>
                    <a
                      href={unrated[rateIndex].mention_id && /^\d+$/.test(unrated[rateIndex].mention_id) ? `https://x.com/i/status/${unrated[rateIndex].mention_id}` : "#"}
                      target="_blank"
                      className="ml-auto text-[10px] text-neutral-300 hover:text-neutral-600"
                    >
                      View →
                    </a>
                  </div>
                  <p className="mt-3 text-[15px] text-[#0A0A0A] leading-relaxed">
                    {unrated[rateIndex].author?.split(": ").slice(1).join(": ") || ""}
                  </p>
                </div>

                {/* Stardrop reply */}
                {unrated[rateIndex].response_preview && (
                  <div className="mx-5 mb-4 rounded-xl bg-neutral-50 border border-neutral-100 px-4 py-3">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="h-6 w-6 rounded-full bg-[#0A0A0A] flex items-center justify-center">
                        <span className="text-[10px] font-bold text-white italic">S</span>
                      </div>
                      <span className="text-[11px] font-semibold text-neutral-600">@stardroplin</span>
                      <span className="rounded-sm bg-neutral-200 px-1.5 py-0.5 text-[8px] font-semibold text-neutral-500 uppercase tracking-wide">
                        {unrated[rateIndex].intent || "general"}
                      </span>
                    </div>
                    <p className="text-[13px] text-neutral-700 leading-relaxed">
                      {unrated[rateIndex].response_preview}
                    </p>
                    <SourceCitations sources={unrated[rateIndex].rag_sources || []} />
                  </div>
                )}

                {/* Swipe hint */}
                <div className="border-t border-neutral-100 px-5 py-3 flex items-center justify-between text-neutral-400">
                  <span className="text-[10px]">← swipe or press ← for Bad</span>
                  <span className="text-[10px]">swipe or press → for Good →</span>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex items-center gap-4 mt-6">
                <button
                  onClick={() => handleSwipe("left")}
                  className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-red-200 text-red-400 hover:bg-red-50 hover:border-red-400 hover:text-red-600 transition-all text-xl"
                >
                  ✕
                </button>
                <button
                  onClick={() => setRateIndex(prev => prev + 1)}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-neutral-200 text-neutral-400 hover:bg-neutral-100 transition text-sm"
                >
                  ›
                </button>
                <button
                  onClick={() => handleSwipe("right")}
                  className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-green-200 text-green-400 hover:bg-green-50 hover:border-green-400 hover:text-green-600 transition-all text-xl"
                >
                  ✓
                </button>
              </div>

              <p className="mt-3 text-[10px] text-neutral-300">
                Keyboard: ← Bad · Space Skip · → Good
              </p>
            </>
          ) : (
            /* All rated! */
            <div className="text-center py-12">
              <p className="text-4xl mb-3">🎉</p>
              <p className="text-lg font-semibold text-[#0A0A0A]">All caught up!</p>
              <p className="mt-1 text-sm text-neutral-500">
                You rated {ratedGood + ratedBad} responses — {ratedGood} good, {ratedBad} bad.
              </p>
              <button
                onClick={() => setView("feed")}
                className="mt-4 bg-[#0A0A0A] px-5 py-2.5 text-xs font-medium text-white rounded-lg"
              >
                Back to feed
              </button>
            </div>
          )}
        </div>
      ) : (
        /* ======= FEED MODE — Twitter-style timeline ======= */
        <div className="px-4 py-3 md:px-6">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-3">
              <h2 className="text-[10px] font-semibold uppercase tracking-widest text-neutral-400">Latest</h2>
              {twitterHandle && (
                <div className="flex gap-0.5">
                  <button onClick={() => setFilterMode("all")} className={`px-2 py-0.5 text-[10px] font-medium rounded transition ${filterMode === "all" ? "bg-[#0A0A0A] text-white" : "text-neutral-400"}`}>All</button>
                  <button onClick={() => setFilterMode("mine")} className={`px-2 py-0.5 text-[10px] font-medium rounded transition ${filterMode === "mine" ? "bg-[#0A0A0A] text-white" : "text-neutral-400"}`}>Mine</button>
                </div>
              )}
            </div>
          </div>

          {filteredMentions.length === 0 ? (
            <div className="border border-dashed border-neutral-200 bg-white p-8 text-center rounded-lg">
              <p className="text-xs text-neutral-500">{filterMode === "mine" ? "No mentions from your handle." : "No mentions yet."}</p>
              <a href="https://x.com/intent/tweet?text=@stardroplin%20" target="_blank" className="mt-3 inline-block bg-[#0A0A0A] px-4 py-2 text-xs font-medium text-white rounded-lg">
                Tag @stardroplin on X
              </a>
            </div>
          ) : (
            <div className="space-y-2">
              {filteredMentions.map((m: any, i: number) => {
                const tweetText = m.author?.split(": ").slice(1).join(": ") || "";
                const handle = m.author?.split(":")[0] || "";
                const id = m.mention_id || `${i}`;
                const currentRating = ratings[id];

                return (
                  <div key={id} className="rounded-xl border border-neutral-200 bg-white overflow-hidden hover:shadow-sm transition">
                    {/* Tweet */}
                    <a href={m.mention_id && /^\d+$/.test(m.mention_id) ? `https://x.com/i/status/${m.mention_id}` : "#"} target="_blank" className="block px-4 pt-3 pb-2">
                      <div className="flex items-center gap-2.5">
                        <div className="h-8 w-8 rounded-full bg-neutral-100 flex items-center justify-center text-xs font-bold text-neutral-400">
                          {handle.charAt(1)?.toUpperCase() || "?"}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="text-[13px] font-bold text-[#0A0A0A]">{handle}</span>
                            <span className="text-[11px] text-neutral-300">{m.ts ? new Date(m.ts).toLocaleTimeString([], {hour: "2-digit", minute: "2-digit"}) : ""}</span>
                          </div>
                        </div>
                      </div>
                      <p className="mt-2 text-[14px] text-[#0A0A0A] leading-snug">{tweetText}</p>
                    </a>

                    {/* Reply */}
                    {m.response_preview && (
                      <div className="mx-4 mb-2 pl-3 border-l-2 border-[#0A0A0A]">
                        <div className="flex items-center gap-1.5 mb-1">
                          <span className="text-[11px] font-semibold text-neutral-500">@stardroplin</span>
                          <span className="rounded bg-neutral-100 px-1 py-0.5 text-[8px] font-semibold text-neutral-400 uppercase">{m.intent || "general"}</span>
                        </div>
                        <p className="text-[12px] text-neutral-600 leading-snug">{m.response_preview}</p>
                        <SourceCitations sources={m.rag_sources || []} />
                      </div>
                    )}

                    {/* Action bar — Twitter-style */}
                    <div className="flex items-center border-t border-neutral-100 px-4 py-1.5">
                      <a href={m.mention_id && /^\d+$/.test(m.mention_id) ? `https://x.com/i/status/${m.mention_id}` : "#"} target="_blank" className="text-[10px] text-neutral-300 hover:text-neutral-500 transition mr-auto">
                        View on X
                      </a>
                      {currentRating ? (
                        <span className={`text-[11px] font-semibold ${currentRating === "good" ? "text-green-600" : "text-red-500"}`}>
                          {currentRating === "good" ? "👍 Good" : "👎 Bad"}
                        </span>
                      ) : (
                        <div className="flex gap-1">
                          <button onClick={() => rate(id, "bad")} className="flex items-center gap-1 rounded-full px-3 py-1 text-[11px] text-neutral-400 hover:bg-red-50 hover:text-red-600 transition">
                            👎 <span className="hidden sm:inline">Bad</span>
                          </button>
                          <button onClick={() => rate(id, "good")} className="flex items-center gap-1 rounded-full px-3 py-1 text-[11px] text-neutral-400 hover:bg-green-50 hover:text-green-600 transition">
                            👍 <span className="hidden sm:inline">Good</span>
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
      )}
    </div>
  );
}
