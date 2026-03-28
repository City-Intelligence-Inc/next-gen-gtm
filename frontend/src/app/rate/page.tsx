"use client";

import { useState, useEffect, useCallback } from "react";

const API = process.env.NEXT_PUBLIC_API_URL || "https://xitwxb23yn.us-east-1.awsapprunner.com";

const SAMPLE_QUESTIONS = [
  "who should I sell to? we built an AI code review tool",
  "analyze competitor @clay — we're building enrichment for SMBs",
  "roast my GTM. we're doing cold email to 10K people/month with 0.5% reply rate",
  "what GTM stack should I use? early stage, 3 person team, $0 budget",
  "find buying signals for companies adopting AI agents",
  "who should I sell to? we built a DevOps observability tool for mid-market",
  "turn this into outbound: we help SaaS companies reduce churn by 30%",
  "analyze competitor @apollo — we're building a modern CRM",
  "what's the best PLG strategy for a developer tool?",
  "roast my GTM. we have PMF but can't scale past $500K ARR",
];

interface Card {
  question: string;
  response: string[];
  intent: string;
}

export default function RatePage() {
  const [cards, setCards] = useState<Card[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [swiping, setSwiping] = useState<"left" | "right" | null>(null);
  const [stats, setStats] = useState({ good: 0, bad: 0, total: 0 });
  const [touchStart, setTouchStart] = useState<number | null>(null);

  // Generate cards on load
  useEffect(() => {
    async function loadCards() {
      const shuffled = [...SAMPLE_QUESTIONS].sort(() => Math.random() - 0.5).slice(0, 5);
      const generated: Card[] = [];
      for (const q of shuffled) {
        try {
          const r = await fetch(`${API}/api/gtm/analyze?text=${encodeURIComponent(q)}&author=rate_session`, { method: "POST" });
          const data = await r.json();
          generated.push({ question: q, response: data.response_tweets || [], intent: data.intent });
        } catch {
          // skip failed ones
        }
      }
      setCards(generated);
      setLoading(false);
    }
    loadCards();
  }, []);

  const handleSwipe = useCallback((direction: "left" | "right") => {
    if (currentIndex >= cards.length) return;
    setSwiping(direction);

    const card = cards[currentIndex];
    const rating = direction === "right" ? "good" : "bad";

    // Save rating
    fetch(`${API}/api/improve`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        question: card.question,
        original_response: card.response,
        improved_response: "",
        rating,
        ts: new Date().toISOString(),
      }),
    }).catch(() => {});

    setStats(prev => ({
      good: prev.good + (rating === "good" ? 1 : 0),
      bad: prev.bad + (rating === "bad" ? 1 : 0),
      total: prev.total + 1,
    }));

    setTimeout(() => {
      setSwiping(null);
      setCurrentIndex(prev => prev + 1);
    }, 300);
  }, [currentIndex, cards]);

  // Keyboard shortcuts
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "ArrowLeft") handleSwipe("left");
      if (e.key === "ArrowRight") handleSwipe("right");
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [handleSwipe]);

  const card = currentIndex < cards.length ? cards[currentIndex] : null;
  const done = currentIndex >= cards.length && cards.length > 0;

  return (
    <div className="min-h-screen bg-white">
      <nav className="border-b border-neutral-200">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-6 py-4">
          <a href="/" className="font-serif text-xl italic text-neutral-900">Stardrop</a>
          <div className="flex gap-4 text-sm">
            <a href="/dashboard" className="text-neutral-500 hover:text-neutral-900">Dashboard</a>
            <a href="/improve" className="text-neutral-500 hover:text-neutral-900">Improve</a>
            <a href="/rate" className="font-medium text-neutral-900">Rate</a>
          </div>
        </div>
      </nav>

      <div className="mx-auto max-w-xl px-6 py-12">
        <div className="text-center mb-8">
          <h1 className="font-serif text-3xl italic tracking-tight text-neutral-900">
            Rate responses
          </h1>
          <p className="mt-2 text-sm text-neutral-500">
            Swipe right if good, left if bad. Arrow keys work too.
          </p>
          {stats.total > 0 && (
            <div className="mt-4 flex justify-center gap-6 text-sm">
              <span className="text-green-600">{stats.good} good</span>
              <span className="text-red-500">{stats.bad} bad</span>
              <span className="text-neutral-400">{cards.length - currentIndex} left</span>
            </div>
          )}
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-neutral-200 border-t-neutral-900" />
              <p className="mt-4 text-sm text-neutral-400">Generating responses to rate...</p>
            </div>
          </div>
        ) : done ? (
          <div className="rounded-2xl border border-neutral-200 p-12 text-center">
            <p className="font-serif text-4xl italic text-neutral-900">Done</p>
            <p className="mt-4 text-sm text-neutral-500">
              Rated {stats.total} responses: {stats.good} good, {stats.bad} bad.
            </p>
            <p className="mt-2 text-xs text-neutral-400">
              {stats.total > 0 ? `${Math.round((stats.good / stats.total) * 100)}% approval rate` : ""}
            </p>
            <button
              onClick={() => window.location.reload()}
              className="mt-6 rounded-lg bg-neutral-900 px-6 py-3 text-sm font-medium text-white hover:bg-neutral-800"
            >
              Rate more
            </button>
          </div>
        ) : card ? (
          <div
            className={`relative transition-all duration-300 ${
              swiping === "left" ? "-translate-x-full opacity-0 rotate-[-10deg]" :
              swiping === "right" ? "translate-x-full opacity-0 rotate-[10deg]" : ""
            }`}
            onTouchStart={(e) => setTouchStart(e.touches[0].clientX)}
            onTouchEnd={(e) => {
              if (touchStart === null) return;
              const diff = e.changedTouches[0].clientX - touchStart;
              if (Math.abs(diff) > 80) {
                handleSwipe(diff > 0 ? "right" : "left");
              }
              setTouchStart(null);
            }}
          >
            {/* Card */}
            <div className="rounded-2xl border border-neutral-200 bg-white shadow-lg overflow-hidden">
              {/* Question */}
              <div className="border-b border-neutral-100 bg-neutral-50 px-6 py-4">
                <p className="text-xs uppercase tracking-widest text-neutral-400 mb-1">Question</p>
                <p className="text-sm font-medium text-neutral-700">{card.question}</p>
              </div>

              {/* Response */}
              <div className="px-6 py-5 space-y-3">
                <p className="text-xs uppercase tracking-widest text-neutral-400">Stardrop&apos;s response</p>
                {card.response.map((tweet, i) => (
                  <div key={i} className="rounded-lg bg-neutral-50 p-3">
                    <p className="text-sm text-neutral-700 leading-relaxed">{tweet}</p>
                  </div>
                ))}
              </div>

              {/* Swipe hint */}
              <div className="border-t border-neutral-100 px-6 py-4 flex items-center justify-between">
                <span className="text-xs text-red-400">← Bad</span>
                <span className="text-xs text-neutral-300">swipe or arrow keys</span>
                <span className="text-xs text-green-500">Good →</span>
              </div>
            </div>

            {/* Buttons */}
            <div className="mt-6 flex justify-center gap-4">
              <button
                onClick={() => handleSwipe("left")}
                className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-red-200 text-red-400 transition hover:bg-red-50 hover:border-red-400"
              >
                <span className="text-2xl">✕</span>
              </button>
              <button
                onClick={() => handleSwipe("right")}
                className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-green-200 text-green-500 transition hover:bg-green-50 hover:border-green-400"
              >
                <span className="text-2xl">✓</span>
              </button>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
