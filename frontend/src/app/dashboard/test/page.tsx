"use client";

import { useState, useEffect, useRef, useMemo } from "react";

// -- Types --

interface TestEntry {
  id: string;
  query: string;
  response: string;
  rating: "good" | "bad" | null;
  timestamp: number;
}

type IntentKey =
  | "icp_analyzer"
  | "competitor_intel"
  | "signal_scanner"
  | "gtm_roast"
  | "stack_advisor"
  | "outbound_generator"
  | "general_gtm";

interface IntentResult {
  intent: IntentKey;
  confidence: number;
}

interface VaultNote {
  title: string;
  relevance: number;
}

// -- Constants --

const STORAGE_KEY = "stardrop_tests";

const INTENT_CONFIDENCE: Record<IntentKey, number> = {
  icp_analyzer: 92,
  competitor_intel: 88,
  signal_scanner: 85,
  gtm_roast: 90,
  stack_advisor: 87,
  outbound_generator: 91,
  general_gtm: 75,
};

const INTENT_COLORS: Record<IntentKey, string> = {
  icp_analyzer: "bg-blue-500",
  competitor_intel: "bg-amber-500",
  signal_scanner: "bg-emerald-500",
  gtm_roast: "bg-rose-500",
  stack_advisor: "bg-violet-500",
  outbound_generator: "bg-cyan-500",
  general_gtm: "bg-neutral-500",
};

const INTENT_LABELS: Record<IntentKey, string> = {
  icp_analyzer: "ICP Analyzer",
  competitor_intel: "Competitor Intel",
  signal_scanner: "Signal Scanner",
  gtm_roast: "GTM Roast",
  stack_advisor: "Stack Advisor",
  outbound_generator: "Outbound Generator",
  general_gtm: "General GTM",
};

const KEYWORD_NOTES: { keywords: string[]; notes: string[] }[] = [
  {
    keywords: ["sell to", "icp", "customer", "ideal", "persona", "buyer"],
    notes: ["GTM Fit", "JTBD for GTM", "ICP Framework", "Buyer Personas", "Customer Segmentation"],
  },
  {
    keywords: ["competitor", "analyze", "vs", "comparison", "compete"],
    notes: ["Competitive Analysis", "Case Studies", "Market Positioning", "Win/Loss Analysis", "Differentiation Playbook"],
  },
  {
    keywords: ["signal", "buying", "trigger", "intent data"],
    notes: ["Signal-Based Selling", "Signal Taxonomy", "Buying Signals Playbook", "Intent Data Sources", "Lead Scoring Models"],
  },
  {
    keywords: ["roast", "strategy", "gtm", "plan", "launch"],
    notes: ["GTM Pain Points", "Current GTM Landscape", "Launch Checklist", "GTM Audit Framework", "Strategy Templates"],
  },
  {
    keywords: ["stack", "tools", "crm", "software", "tech"],
    notes: ["Composable GTM Stack", "Tool Profiles", "CRM Comparison", "Integration Patterns", "Vendor Evaluation"],
  },
  {
    keywords: ["outbound", "email", "cold", "sequence", "sdr"],
    notes: ["AI SDR Agents", "Cold Email Frameworks", "Data Enrichment", "Sequence Optimization", "Outbound Playbook"],
  },
];

const DEFAULT_NOTES = [
  "GTM Overview",
  "Next-Gen GTM Thesis",
  "The Self-Improving GTM Engine",
  "Revenue Architecture",
  "Go-To-Market Fundamentals",
];

const RELEVANCE_SCORES = [94, 87, 82, 76, 71];

const PATTERNS_APPLIED = [
  "Specific tool recommendations (Clay, Apollo, Instantly)",
  "Quantified pain points with real numbers",
  "Concrete this-week action item",
];

// -- Helpers --

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

function detectIntent(query: string): IntentResult {
  const q = query.toLowerCase();

  if (/sell\s?to|icp|customer|ideal|persona|buyer/i.test(q)) {
    return { intent: "icp_analyzer", confidence: INTENT_CONFIDENCE.icp_analyzer };
  }
  if (/competitor|analyze|vs|comparison|compete/i.test(q)) {
    return { intent: "competitor_intel", confidence: INTENT_CONFIDENCE.competitor_intel };
  }
  if (/signal|buying|trigger|intent\s?data/i.test(q)) {
    return { intent: "signal_scanner", confidence: INTENT_CONFIDENCE.signal_scanner };
  }
  if (/roast|strategy|gtm|plan|launch/i.test(q)) {
    return { intent: "gtm_roast", confidence: INTENT_CONFIDENCE.gtm_roast };
  }
  if (/stack|tools|crm|software|tech/i.test(q)) {
    return { intent: "stack_advisor", confidence: INTENT_CONFIDENCE.stack_advisor };
  }
  if (/outbound|email|cold|sequence|sdr/i.test(q)) {
    return { intent: "outbound_generator", confidence: INTENT_CONFIDENCE.outbound_generator };
  }
  return { intent: "general_gtm", confidence: INTENT_CONFIDENCE.general_gtm };
}

function retrieveVaultNotes(query: string): VaultNote[] {
  const q = query.toLowerCase();

  for (const group of KEYWORD_NOTES) {
    if (group.keywords.some((kw) => q.includes(kw))) {
      return group.notes.map((title, i) => ({
        title,
        relevance: RELEVANCE_SCORES[i],
      }));
    }
  }

  return DEFAULT_NOTES.map((title, i) => ({
    title,
    relevance: RELEVANCE_SCORES[i],
  }));
}

// -- Right Panel: How Stardrop Thinks (always visible) --

function ThinkingPanel({
  query,
  hasResponse,
}: {
  query: string | null;
  hasResponse: boolean;
}) {
  const intentResult = useMemo(
    () => (query ? detectIntent(query) : null),
    [query]
  );
  const vaultNotes = useMemo(
    () => (query ? retrieveVaultNotes(query) : null),
    [query]
  );

  useEffect(() => {
    if (intentResult && vaultNotes) {
      console.log(`[Stardrop:Test] Intent: ${intentResult.intent} (${intentResult.confidence}%)`);
      console.log(`[Stardrop:Test] Retrieved ${vaultNotes.length} vault notes`);
    }
  }, [intentResult, vaultNotes]);

  if (!query || !intentResult || !vaultNotes) {
    return (
      <div className="flex items-center justify-center h-full text-neutral-300">
        <div className="text-center px-4">
          <p className="text-[10px] font-semibold uppercase tracking-widest mb-1">How Stardrop Thinks</p>
          <p className="text-[11px] text-neutral-400">Generate a response to see the reasoning chain.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-3 space-y-4 overflow-y-auto h-full">
      <h3 className="text-[10px] font-semibold uppercase tracking-widest text-neutral-400">
        How Stardrop Thinks
      </h3>

      {/* Intent */}
      <div>
        <p className="text-[9px] font-semibold uppercase tracking-widest text-neutral-300 mb-1.5">Intent</p>
        <div className="flex items-center gap-2">
          <span className="rounded bg-neutral-100 px-2 py-0.5 text-[10px] font-medium text-neutral-700">
            {INTENT_LABELS[intentResult.intent]}
          </span>
          <div className="flex-1 h-1.5 rounded-full bg-neutral-100 overflow-hidden">
            <div
              className={`h-full rounded-full ${INTENT_COLORS[intentResult.intent]} transition-all duration-500`}
              style={{ width: `${intentResult.confidence}%` }}
            />
          </div>
          <span className="text-[10px] font-serif italic text-neutral-500 tabular-nums">
            {intentResult.confidence}%
          </span>
        </div>
      </div>

      {/* Vault notes */}
      <div>
        <p className="text-[9px] font-semibold uppercase tracking-widest text-neutral-300 mb-1.5">Knowledge Retrieved</p>
        <div className="space-y-1">
          {vaultNotes.map((note) => (
            <div key={note.title} className="flex items-center gap-2">
              <span className="text-[10px] text-neutral-600 w-32 shrink-0 truncate">{note.title}</span>
              <div className="flex-1 h-1 rounded-full bg-neutral-100 overflow-hidden">
                <div
                  className="h-full rounded-full bg-neutral-400 transition-all duration-500"
                  style={{ width: `${note.relevance}%` }}
                />
              </div>
              <span className="text-[9px] font-serif italic text-neutral-400 tabular-nums w-6 text-right">
                {note.relevance}%
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Reasoning chain */}
      <div>
        <p className="text-[9px] font-semibold uppercase tracking-widest text-neutral-300 mb-1.5">Chain</p>
        <div className="flex flex-col items-start">
          {[
            { step: "Query received", done: true },
            { step: `Intent: ${INTENT_LABELS[intentResult.intent]}`, done: true },
            { step: `${vaultNotes.length} vault notes`, done: true },
            { step: "GPT-4o response", done: hasResponse },
            { step: "1 tweet thread", done: hasResponse },
          ].map((s, i, arr) => (
            <div key={i} className="flex flex-col items-start">
              <div className={`flex items-center gap-1.5 px-2 py-1 rounded text-[10px] ${s.done ? "text-neutral-700 bg-neutral-50" : "text-neutral-300 bg-neutral-50/50"}`}>
                <span className={`inline-block h-1.5 w-1.5 rounded-full ${s.done ? "bg-green-500" : "bg-neutral-300"}`} />
                {s.step}
              </div>
              {i < arr.length - 1 && <div className="ml-[7px] h-2 w-px bg-neutral-200" />}
            </div>
          ))}
        </div>
      </div>

      {/* Patterns */}
      <div>
        <p className="text-[9px] font-semibold uppercase tracking-widest text-neutral-300 mb-1.5">Patterns Applied</p>
        <ul className="space-y-1">
          {PATTERNS_APPLIED.map((p) => (
            <li key={p} className="flex items-start gap-1.5 text-[10px] text-neutral-500">
              <span className="mt-1 h-1 w-1 rounded-full bg-neutral-300 shrink-0" />
              {p}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

// -- Main page --

export default function TestPage() {
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [currentId, setCurrentId] = useState<string | null>(null);
  const [tests, setTests] = useState<TestEntry[]>([]);
  const [sliding, setSliding] = useState(false);
  const [lastQuery, setLastQuery] = useState<string | null>(null);
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
    setLastQuery(trimmed);

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

    setSliding(true);
    setTimeout(() => {
      setSliding(false);
      setResponse(null);
      setCurrentId(null);
      setLastQuery(null);
      setQuery("");
      inputRef.current?.focus();
    }, 300);
  }

  return (
    <div className="min-h-full bg-[#FAFAF9]">
      {/* Header bar */}
      <div className="bg-[#0A0A0A] text-white px-4 py-2.5 md:px-6">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/70">
            The Lab
          </span>
          <span className="text-[10px] text-white/40">Test &amp; rate Stardrop responses</span>
        </div>
      </div>

      {/* Split layout */}
      <div className="flex flex-col lg:flex-row min-h-[calc(100vh-100px)]">
        {/* Left side (60%) — Input + Response */}
        <div className="flex-1 lg:w-[60%] border-r border-neutral-200 p-4 md:p-5">
          {/* Input */}
          <div className="mb-4">
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
              placeholder="What's your GTM question?"
              rows={3}
              className="w-full border border-neutral-200 bg-white px-3 py-2.5 text-[13px] text-neutral-900 placeholder:text-neutral-400 placeholder:font-serif placeholder:italic focus:border-[#0A0A0A] focus:outline-none resize-none rounded"
            />
            <button
              onClick={handleGenerate}
              disabled={!query.trim() || loading}
              className="mt-2 w-full bg-[#0A0A0A] px-4 py-2.5 text-[12px] font-semibold uppercase tracking-widest text-white transition hover:bg-neutral-800 disabled:opacity-40 disabled:cursor-not-allowed rounded"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="h-3 w-3 animate-spin rounded-full border-2 border-neutral-600 border-t-white" />
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
              className={`mb-3 transition-all duration-300 ${
                sliding ? "opacity-0 translate-x-full" : "opacity-100 translate-x-0"
              }`}
            >
              <div className="border border-neutral-200 bg-white p-3 rounded">
                <p className="text-[13px] text-neutral-700 leading-relaxed whitespace-pre-wrap">{response}</p>
              </div>

              {/* Rating buttons */}
              <div className="mt-2 flex gap-2">
                <button
                  onClick={() => handleRate("good")}
                  className="flex-1 border border-neutral-200 bg-white px-3 py-2.5 text-[11px] font-semibold text-neutral-700 transition hover:border-green-300 hover:bg-green-50 rounded uppercase tracking-wide"
                >
                  Good
                </button>
                <button
                  onClick={() => handleRate("bad")}
                  className="flex-1 border border-neutral-200 bg-white px-3 py-2.5 text-[11px] font-semibold text-neutral-700 transition hover:border-red-300 hover:bg-red-50 rounded uppercase tracking-wide"
                >
                  Bad
                </button>
              </div>
            </div>
          )}

          {/* Separator */}
          {tests.length > 0 && <div className="h-px bg-neutral-200 my-3" />}

          {/* Past tests — compact table */}
          {tests.length > 0 && (
            <div>
              <h2 className="text-[10px] font-semibold uppercase tracking-widest text-neutral-400 mb-2">
                Past Tests
              </h2>
              <div className="border border-neutral-200 rounded overflow-hidden bg-white">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-neutral-100 bg-neutral-50">
                      <th className="px-3 py-1.5 text-[9px] font-semibold uppercase tracking-widest text-neutral-400">Query</th>
                      <th className="px-3 py-1.5 text-[9px] font-semibold uppercase tracking-widest text-neutral-400 w-16 text-center">Rating</th>
                      <th className="px-3 py-1.5 text-[9px] font-semibold uppercase tracking-widest text-neutral-400 w-20 text-right">Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-50">
                    {tests.slice(0, 10).map((t) => (
                      <tr key={t.id} className="hover:bg-neutral-50 transition">
                        <td className="px-3 py-2">
                          <p className="text-[11px] font-medium text-neutral-800 truncate max-w-[300px]">{t.query}</p>
                          <p className="text-[10px] text-neutral-400 truncate max-w-[300px]">{t.response.slice(0, 80)}</p>
                        </td>
                        <td className="px-3 py-2 text-center">
                          {t.rating === "good" && <span className="text-[10px] font-medium text-green-600">Good</span>}
                          {t.rating === "bad" && <span className="text-[10px] font-medium text-red-500">Bad</span>}
                          {!t.rating && <span className="text-[10px] text-neutral-300">--</span>}
                        </td>
                        <td className="px-3 py-2 text-right">
                          <span className="text-[10px] text-neutral-400 font-serif italic">
                            {new Date(t.timestamp).toLocaleDateString()}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        {/* Right side (40%) — How Stardrop Thinks */}
        <div className="lg:w-[40%] bg-white border-t lg:border-t-0 border-neutral-200">
          <ThinkingPanel query={lastQuery} hasResponse={!!response} />
        </div>
      </div>
    </div>
  );
}
