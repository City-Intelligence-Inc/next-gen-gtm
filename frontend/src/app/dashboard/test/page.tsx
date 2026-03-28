"use client";

import { useState, useEffect, useRef } from "react";

interface TestEntry {
  id: string;
  query: string;
  response: string;
  rating: "good" | "bad" | null;
  timestamp: number;
}

const STORAGE_KEY = "stardrop_tests";

function loadTests(): TestEntry[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  } catch {
    return [];
  }
}

function saveTests(tests: TestEntry[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tests));
}

export default function TestPage() {
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [currentId, setCurrentId] = useState<string | null>(null);
  const [tests, setTests] = useState<TestEntry[]>([]);
  const [sliding, setSliding] = useState(false);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    setTests(loadTests());
  }, []);

  async function handleGenerate() {
    if (!query.trim() || loading) return;
    const trimmed = query.trim();
    console.log(`[Stardrop:Test] Generating response for: "${trimmed}"`);
    setLoading(true);
    setResponse(null);

    try {
      const r = await fetch(`/api/proxy/gtm/analyze?text=${encodeURIComponent(trimmed)}&author=dashboard`);
      console.log(`[Stardrop:Test] API response: ${r.status}`);
      if (!r.ok) throw new Error(`${r.status}`);
      const d = await r.json();
      const text = d.response || d.reply || d.analysis || JSON.stringify(d);
      const id = Date.now().toString();
      setResponse(text);
      setCurrentId(id);

      const entry: TestEntry = {
        id,
        query: trimmed,
        response: text,
        rating: null,
        timestamp: Date.now(),
      };
      const updated = [entry, ...loadTests()];
      saveTests(updated);
      setTests(updated);
    } catch (e) {
      console.log(`[Stardrop:Test] Error: ${e}`);
      setResponse("Failed to get response. Check that the backend is running.");
    } finally {
      setLoading(false);
    }
  }

  function handleRate(rating: "good" | "bad") {
    if (!currentId) return;
    console.log(`[Stardrop:Test] Rated: ${rating}`);

    const updated = loadTests().map((t) =>
      t.id === currentId ? { ...t, rating } : t
    );
    saveTests(updated);
    setTests(updated);

    // Slide away
    setSliding(true);
    setTimeout(() => {
      setSliding(false);
      setResponse(null);
      setCurrentId(null);
      setQuery("");
      inputRef.current?.focus();
    }, 300);
  }

  return (
    <div className="px-4 py-6 md:px-8 max-w-2xl mx-auto">
      <h1 className="text-xl font-semibold text-neutral-900 mb-1">Test</h1>
      <p className="text-sm text-neutral-400 mb-6">Ask Stardrop anything and rate the response.</p>

      {/* Input area */}
      <div className="mb-6">
        <textarea
          ref={inputRef}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleGenerate();
            }
          }}
          placeholder="Ask Stardrop anything..."
          rows={3}
          className="w-full rounded-lg border border-neutral-200 bg-white px-4 py-3 text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-neutral-400 focus:outline-none resize-none"
        />
        <button
          onClick={handleGenerate}
          disabled={!query.trim() || loading}
          className="mt-2 w-full rounded-lg bg-neutral-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-neutral-800 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-neutral-600 border-t-white" />
              Generating...
            </span>
          ) : (
            "Generate"
          )}
        </button>
      </div>

      {/* Response card */}
      {response && (
        <div
          className={`mb-8 transition-all duration-300 ${
            sliding ? "opacity-0 translate-x-full" : "opacity-100 translate-x-0"
          }`}
        >
          <div className="rounded-lg border border-neutral-200 bg-white p-4">
            <p className="text-sm text-neutral-700 leading-relaxed whitespace-pre-wrap">{response}</p>
          </div>

          {/* Rating buttons */}
          <div className="mt-3 flex gap-3">
            <button
              onClick={() => handleRate("good")}
              className="flex-1 rounded-lg border border-neutral-200 bg-white px-4 py-3 text-sm font-medium text-neutral-700 transition hover:border-green-300 hover:bg-green-50"
            >
              <span className="mr-1.5">👍</span> Good
            </button>
            <button
              onClick={() => handleRate("bad")}
              className="flex-1 rounded-lg border border-neutral-200 bg-white px-4 py-3 text-sm font-medium text-neutral-700 transition hover:border-red-300 hover:bg-red-50"
            >
              <span className="mr-1.5">👎</span> Bad
            </button>
          </div>
        </div>
      )}

      {/* Past tests */}
      {tests.length > 0 && (
        <div>
          <h2 className="text-[11px] font-semibold uppercase tracking-widest text-neutral-400 mb-3">
            Past tests
          </h2>
          <div className="space-y-2">
            {tests.map((t) => (
              <div key={t.id} className="rounded-lg border border-neutral-100 bg-neutral-50/50 px-4 py-3">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-xs font-medium text-neutral-900 truncate pr-4">{t.query}</p>
                  <div className="flex items-center gap-2 shrink-0">
                    {t.rating === "good" && <span className="text-xs text-green-600">👍</span>}
                    {t.rating === "bad" && <span className="text-xs text-red-600">👎</span>}
                    {!t.rating && <span className="text-[10px] text-neutral-300">no rating</span>}
                    <span className="text-[10px] text-neutral-300">
                      {new Date(t.timestamp).toLocaleDateString()}
                    </span>
                  </div>
                </div>
                <p className="text-xs text-neutral-500 line-clamp-2">{t.response}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
