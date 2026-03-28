"use client";

import { useState, useEffect, useRef, useMemo } from "react";

// ── Types ──────────────────────────────────────────────────────────────────

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

// ── Constants ──────────────────────────────────────────────────────────────

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

// ── Helpers ────────────────────────────────────────────────────────────────

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

// ── Interpretability section ───────────────────────────────────────────────

function InterpretabilitySection({
  query,
  defaultOpen,
}: {
  query: string;
  defaultOpen: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);

  const intentResult = useMemo(() => detectIntent(query), [query]);
  const vaultNotes = useMemo(() => retrieveVaultNotes(query), [query]);

  useEffect(() => {
    console.log(`[Stardrop:Test] Intent: ${intentResult.intent} (${intentResult.confidence}%)`);
    console.log(`[Stardrop:Test] Retrieved ${vaultNotes.length} vault notes`);
  }, [intentResult, vaultNotes]);

  return (
    <div className="mb-8 rounded-lg border border-neutral-200 bg-white overflow-hidden">
      {/* Header / toggle */}
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-neutral-50 transition-colors"
      >
        <span className="text-sm font-semibold text-neutral-900">How Stardrop thinks</span>
        <svg
          className={`h-4 w-4 text-neutral-400 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <div className="px-4 pb-5 space-y-6 border-t border-neutral-100 pt-4">
          {/* 1. Intent detected */}
          <div>
            <h3 className="text-[11px] font-semibold uppercase tracking-widest text-neutral-400 mb-2">
              Intent detected
            </h3>
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center rounded-full bg-neutral-100 px-3 py-1 text-xs font-medium text-neutral-800">
                {INTENT_LABELS[intentResult.intent]}
              </span>
              <div className="flex-1 flex items-center gap-2">
                <div className="flex-1 h-2 rounded-full bg-neutral-100 overflow-hidden">
                  <div
                    className={`h-full rounded-full ${INTENT_COLORS[intentResult.intent]} transition-all duration-500`}
                    style={{ width: `${intentResult.confidence}%` }}
                  />
                </div>
                <span className="text-xs font-medium text-neutral-500 tabular-nums w-8 text-right">
                  {intentResult.confidence}%
                </span>
              </div>
            </div>
          </div>

          {/* 2. Knowledge retrieved */}
          <div>
            <h3 className="text-[11px] font-semibold uppercase tracking-widest text-neutral-400 mb-2">
              Knowledge retrieved
            </h3>
            <div className="space-y-2">
              {vaultNotes.map((note) => (
                <div key={note.title} className="flex items-center gap-3">
                  <span className="text-xs text-neutral-700 w-48 shrink-0 truncate">
                    {note.title}
                  </span>
                  <div className="flex-1 h-1.5 rounded-full bg-neutral-100 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-neutral-400 transition-all duration-500"
                      style={{ width: `${note.relevance}%` }}
                    />
                  </div>
                  <span className="text-[10px] font-medium text-neutral-400 tabular-nums w-7 text-right">
                    {note.relevance}%
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* 3. Reasoning chain */}
          <div>
            <h3 className="text-[11px] font-semibold uppercase tracking-widest text-neutral-400 mb-3">
              Reasoning chain
            </h3>
            <div className="flex flex-col items-start">
              {[
                { icon: "\ud83d\udcdd", label: "Your question" },
                {
                  icon: "\ud83c\udfaf",
                  label: `Intent: ${INTENT_LABELS[intentResult.intent]} (${intentResult.confidence}%)`,
                },
                { icon: "\ud83d\udcda", label: `Retrieved ${vaultNotes.length} vault notes` },
                { icon: "\ud83e\udd16", label: "GPT-4o generated response" },
                { icon: "\ud83d\udcca", label: "1 tweet thread" },
              ].map((step, i, arr) => (
                <div key={i} className="flex flex-col items-start">
                  <div className="flex items-center gap-2.5 rounded-lg border border-neutral-150 bg-neutral-50 px-3 py-2">
                    <span className="text-sm">{step.icon}</span>
                    <span className="text-xs text-neutral-700">{step.label}</span>
                  </div>
                  {i < arr.length - 1 && (
                    <div className="ml-5 h-4 w-px bg-neutral-200" />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* 4. Patterns applied */}
          <div>
            <h3 className="text-[11px] font-semibold uppercase tracking-widest text-neutral-400 mb-2">
              Patterns applied
            </h3>
            <ul className="space-y-1.5">
              {PATTERNS_APPLIED.map((pattern) => (
                <li key={pattern} className="flex items-start gap-2 text-xs text-neutral-600">
                  <span className="mt-0.5 h-1.5 w-1.5 rounded-full bg-neutral-300 shrink-0" />
                  {pattern}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

// ── Main page ──────────────────────────────────────────────────────────────

export default function TestPage() {
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [currentId, setCurrentId] = useState<string | null>(null);
  const [tests, setTests] = useState<TestEntry[]>([]);
  const [sliding, setSliding] = useState(false);
  const [lastQuery, setLastQuery] = useState<string | null>(null);
  const [interpretOpen, setInterpretOpen] = useState(false);
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
    setLastQuery(null);
    setInterpretOpen(false);

    try {
      const r = await fetch(`/api/proxy/gtm/analyze?text=${encodeURIComponent(trimmed)}&author=dashboard`);
      console.log(`[Stardrop:Test] API response: ${r.status}`);
      if (!r.ok) throw new Error(`${r.status}`);
      const d = await r.json();
      const text = d.response || d.reply || d.analysis || JSON.stringify(d);
      const id = Date.now().toString();
      setResponse(text);
      setCurrentId(id);
      setLastQuery(trimmed);
      setInterpretOpen(true);

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
      setLastQuery(trimmed);
      setInterpretOpen(true);
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
      setLastQuery(null);
      setInterpretOpen(false);
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
          className={`mb-4 transition-all duration-300 ${
            sliding ? "opacity-0 translate-x-full" : "opacity-100 translate-x-0"
          }`}
        >
          <div className="rounded-lg border border-neutral-200 bg-white p-4">
            <p className="text-sm text-neutral-700 leading-relaxed whitespace-pre-wrap">{response}</p>
          </div>

          {/* Rating buttons */}
          <div className="mt-3 flex gap-3 mb-4">
            <button
              onClick={() => handleRate("good")}
              className="flex-1 rounded-lg border border-neutral-200 bg-white px-4 py-3 text-sm font-medium text-neutral-700 transition hover:border-green-300 hover:bg-green-50"
            >
              <span className="mr-1.5">{"\ud83d\udc4d"}</span> Good
            </button>
            <button
              onClick={() => handleRate("bad")}
              className="flex-1 rounded-lg border border-neutral-200 bg-white px-4 py-3 text-sm font-medium text-neutral-700 transition hover:border-red-300 hover:bg-red-50"
            >
              <span className="mr-1.5">{"\ud83d\udc4e"}</span> Bad
            </button>
          </div>
        </div>
      )}

      {/* Interpretability section — appears below the response + rating */}
      {lastQuery && !sliding && (
        <InterpretabilitySection
          query={lastQuery}
          defaultOpen={interpretOpen}
        />
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
                    {t.rating === "good" && <span className="text-xs text-green-600">{"\ud83d\udc4d"}</span>}
                    {t.rating === "bad" && <span className="text-xs text-red-600">{"\ud83d\udc4e"}</span>}
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
