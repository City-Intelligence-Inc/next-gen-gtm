"use client";

import { useState } from "react";

const API = "";

export default function ImprovePage() {
  const [question, setQuestion] = useState("");
  const [response, setResponse] = useState<string[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [betterResponse, setBetterResponse] = useState("");
  const [saved, setSaved] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [history, setHistory] = useState<Array<{q: string; original: string[]; improved: string}>>([]);

  async function generate() {
    if (!question.trim()) return;
    setLoading(true);
    setSaved(false);
    setResponse(null);
    setBetterResponse("");
    setErrorMsg(null);

    const url = `/api/proxy/gtm/analyze?text=${encodeURIComponent(question)}&author=improve_session`;
    console.log("[improve] Fetching:", url);

    try {
      const r = await fetch(url, { method: "POST" });
      console.log("[improve] Status:", r.status);
      const text = await r.text();
      console.log("[improve] Raw response:", text);

      if (!r.ok) {
        setErrorMsg(`API returned ${r.status}: ${text.slice(0, 200)}`);
        setLoading(false);
        return;
      }

      const data = JSON.parse(text);
      console.log("[improve] Parsed:", data);

      if (data.response_tweets && data.response_tweets.length > 0) {
        setResponse(data.response_tweets);
      } else {
        setErrorMsg("API returned empty response_tweets");
      }
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      console.error("[improve] Error:", msg);
      setErrorMsg(`Fetch failed: ${msg}`);
    }
    setLoading(false);
  }

  function saveImprovement() {
    if (!betterResponse.trim() || !response) return;
    // Save to local history (would POST to /api/improve in production)
    setHistory(prev => [...prev, { q: question, original: response, improved: betterResponse }]);
    setSaved(true);

    // Save to backend with username
    const username = typeof window !== "undefined" ? localStorage.getItem("stardrop_username") || "" : "";
    fetch(`/api/proxy/improve`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        question,
        original_response: response,
        improved_response: betterResponse,
        username,
        ts: new Date().toISOString(),
      }),
    }).catch(() => {});
  }

  return (
    <div className="min-h-screen bg-white">
      <nav className="border-b border-neutral-200 bg-white/95 backdrop-blur-sm">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-6 py-4">
          <a href="/" className="font-serif text-xl italic text-neutral-900">Stardrop</a>
          <div className="flex gap-4">
            <a href="/dashboard" className="text-sm text-neutral-500 hover:text-neutral-900">Dashboard</a>
            <a href="/improve" className="text-sm font-medium text-neutral-900">Improve</a>
          </div>
        </div>
      </nav>

      <div className="mx-auto max-w-3xl px-6 py-12">
        <h1 className="font-serif text-3xl italic tracking-tight text-neutral-900">
          Improve Stardrop
        </h1>
        <p className="mt-2 text-sm text-neutral-500">
          Test a question, see what Stardrop says, then write what it SHOULD have said. The system learns from your corrections.
        </p>

        {/* Input */}
        <div className="mt-8">
          <label className="text-xs font-semibold uppercase tracking-widest text-neutral-400">
            Test a GTM question
          </label>
          <div className="mt-2 flex gap-2">
            <input
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && generate()}
              placeholder="who should I sell to? we built an AI code review tool"
              className="flex-1 rounded-lg border border-neutral-200 px-4 py-3 text-sm outline-none transition focus:border-neutral-400"
            />
            <button
              onClick={generate}
              disabled={loading || !question.trim()}
              className="rounded-lg bg-neutral-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-neutral-800 disabled:opacity-50"
            >
              {loading ? "..." : "Generate"}
            </button>
          </div>
        </div>

        {/* Error */}
        {errorMsg && (
          <div className="mt-6 rounded-lg border border-red-200 bg-red-50 p-4">
            <p className="text-sm text-red-600">{errorMsg}</p>
          </div>
        )}

        {/* Response */}
        {response && (
          <div className="mt-8 space-y-6">
            <div>
              <label className="text-xs font-semibold uppercase tracking-widest text-neutral-400">
                Stardrop&apos;s response
              </label>
              <div className="mt-2 space-y-2">
                {response.map((tweet, i) => (
                  <div key={i} className="rounded-lg border border-neutral-200 bg-neutral-50 p-4">
                    <p className="text-sm text-neutral-700 leading-relaxed">{tweet}</p>
                    <p className="mt-1 text-[10px] text-neutral-400">{tweet.length}/280 chars</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Improvement */}
            <div>
              <label className="text-xs font-semibold uppercase tracking-widest text-neutral-400">
                What should it have said instead?
              </label>
              <p className="mt-1 text-xs text-neutral-400">
                Write the ideal response. No fluff, specific numbers, practitioner voice. This teaches the system.
              </p>
              <textarea
                value={betterResponse}
                onChange={(e) => setBetterResponse(e.target.value)}
                placeholder={"Target: Engineering Managers at B2B SaaS, 50-500 employees. They run 15+ PRs/day.\n\nSignal: Companies posting \"hiring senior engineers\" = more PRs = more pain.\n\nThis week: Use Apollo, find 50 Eng Managers at Series A-B. Send 10 emails referencing their GitHub."}
                rows={6}
                className="mt-2 w-full rounded-lg border border-neutral-200 px-4 py-3 text-sm outline-none transition focus:border-neutral-400 resize-none"
              />
              <div className="mt-3 flex items-center gap-3">
                <button
                  onClick={saveImprovement}
                  disabled={!betterResponse.trim() || saved}
                  className="rounded-lg bg-neutral-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-neutral-800 disabled:opacity-50"
                >
                  {saved ? "Saved" : "Save improvement"}
                </button>
                {saved && (
                  <span className="text-xs text-green-600">
                    Saved. Stardrop will use this as a reference for similar questions.
                  </span>
                )}
              </div>
            </div>
          </div>
        )}

        {/* History */}
        {history.length > 0 && (
          <div className="mt-12 border-t border-neutral-200 pt-8">
            <h2 className="text-xs font-semibold uppercase tracking-widest text-neutral-400">
              Improvements this session ({history.length})
            </h2>
            <div className="mt-4 space-y-4">
              {history.map((h, i) => (
                <div key={i} className="rounded-xl border border-neutral-200 p-4">
                  <p className="text-xs font-medium text-neutral-500">Q: {h.q}</p>
                  <div className="mt-2 grid gap-3 sm:grid-cols-2">
                    <div>
                      <p className="text-[10px] uppercase tracking-widest text-red-400 mb-1">Original</p>
                      <p className="text-xs text-neutral-500 line-clamp-3">{h.original[0]}</p>
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-widest text-green-500 mb-1">Improved</p>
                      <p className="text-xs text-neutral-700 line-clamp-3">{h.improved}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="mt-16 border-t border-neutral-200 pt-8">
          <p className="font-serif text-lg italic text-neutral-300">
            Every correction makes the next response better.
          </p>
        </div>
      </div>
    </div>
  );
}
