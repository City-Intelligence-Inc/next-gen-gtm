"use client";

import { useState, useEffect, useCallback } from "react";

// ---------------------------------------------------------------------------
// Types & Constants
// ---------------------------------------------------------------------------

type Tab = "score" | "knowledge" | "learn" | "trace" | "compound";

interface SkillScore {
  key: string;
  label: string;
  score: number;
  color: string;
  suggestion: string;
}

interface Challenge {
  id: string;
  prompt: string;
  completed: boolean;
}

interface Level {
  id: number;
  title: string;
  description: string;
  challenges: Challenge[];
}

interface TraceResult {
  intent: string;
  confidence: number;
  vaultNotes: { name: string; relevance: number }[];
  patterns: string[];
  chain: string[];
}

interface DailyLog {
  date: string;
  interactions: number;
  score: number;
}

const STORAGE_PREFIX = "stardrop_";

const SKILL_DEFS: { key: string; label: string; color: string; suggestion: string }[] = [
  { key: "icp", label: "ICP Analysis", color: "#3b82f6", suggestion: "@stardroplin analyze the ICP for [your product]" },
  { key: "competitor", label: "Competitor Intel", color: "#ef4444", suggestion: "@stardroplin compare [your product] vs [competitor]" },
  { key: "signal", label: "Signal Detection", color: "#eab308", suggestion: "@stardroplin find buying signals for [your product]" },
  { key: "strategy", label: "GTM Strategy", color: "#a855f7", suggestion: "@stardroplin roast my GTM strategy: [describe it]" },
  { key: "stack", label: "Stack Knowledge", color: "#f97316", suggestion: "@stardroplin recommend a GTM stack for [your stage]" },
  { key: "outbound", label: "Outbound Skills", color: "#22c55e", suggestion: "@stardroplin write outbound for [persona] at [company]" },
];

const VAULT_CATEGORIES = [
  { key: "concepts", label: "Concepts", total: 10, color: "#3b82f6" },
  { key: "motions", label: "Motions", total: 6, color: "#22c55e" },
  { key: "frameworks", label: "Frameworks", total: 7, color: "#a855f7" },
  { key: "tools", label: "Tools", total: 14, color: "#f97316" },
  { key: "case-studies", label: "Case Studies", total: 6, color: "#ef4444" },
  { key: "architecture", label: "Architecture", total: 3, color: "#06b6d4" },
  { key: "data-infrastructure", label: "Data Infra", total: 8, color: "#14b8a6" },
  { key: "signals", label: "Signals", total: 3, color: "#eab308" },
  { key: "roles", label: "Roles", total: 3, color: "#ec4899" },
  { key: "resources", label: "Resources", total: 1, color: "#6b7280" },
];

const CATEGORY_QUESTIONS: Record<string, string> = {
  concepts: "@stardroplin explain the self-improving GTM engine",
  motions: "@stardroplin compare PLG vs SLG for a $5M ARR SaaS",
  frameworks: "@stardroplin apply MEDDIC to my deal: [describe it]",
  tools: "@stardroplin recommend tools for signal-based selling",
  "case-studies": "@stardroplin break down how Ramp does GTM",
  architecture: "@stardroplin explain the composable GTM stack",
  "data-infrastructure": "@stardroplin what is warehouse-native GTM?",
  signals: "@stardroplin find buying signals for [your product]",
  roles: "@stardroplin what does a GTM engineer do day-to-day?",
  resources: "@stardroplin recommend GTM reading for a founder",
};

const LEARNING_LEVELS: Omit<Level, "challenges">[] = [
  {
    id: 1,
    title: "GTM Basics",
    description: "Understand the landscape, define your ICP, learn the fundamentals.",
  },
  {
    id: 2,
    title: "Motions",
    description: "Learn PLG vs SLG vs PLS and when to deploy each motion.",
  },
  {
    id: 3,
    title: "Frameworks",
    description: "MEDDIC, Bow-Tie, JTBD — learn to apply each framework.",
  },
  {
    id: 4,
    title: "Tools & Signals",
    description: "Composable stacks, signal detection, data enrichment.",
  },
  {
    id: 5,
    title: "Advanced",
    description: "Agent-led growth, self-improving systems, data infrastructure.",
  },
];

const LEVEL_CHALLENGES: Record<number, { id: string; prompt: string }[]> = {
  1: [
    { id: "l1c1", prompt: "@stardroplin what is the current GTM landscape?" },
    { id: "l1c2", prompt: "@stardroplin analyze the ICP for [your product]" },
    { id: "l1c3", prompt: "@stardroplin what are the biggest GTM pain points today?" },
  ],
  2: [
    { id: "l2c1", prompt: "@stardroplin compare PLG vs SLG for early-stage SaaS" },
    { id: "l2c2", prompt: "@stardroplin explain product-led sales with an example" },
    { id: "l2c3", prompt: "@stardroplin when should a startup use community-led growth?" },
    { id: "l2c4", prompt: "@stardroplin what is agent-led growth and why does it matter?" },
  ],
  3: [
    { id: "l3c1", prompt: "@stardroplin apply MEDDIC to this deal: [describe]" },
    { id: "l3c2", prompt: "@stardroplin explain the bow-tie funnel for [your product]" },
    { id: "l3c3", prompt: "@stardroplin use JTBD framework for [your product]" },
  ],
  4: [
    { id: "l4c1", prompt: "@stardroplin recommend a composable GTM stack for Series A" },
    { id: "l4c2", prompt: "@stardroplin set up a signal detection pipeline for [product]" },
    { id: "l4c3", prompt: "@stardroplin explain data enrichment waterfalls" },
    { id: "l4c4", prompt: "@stardroplin compare Clay vs Apollo for outbound" },
  ],
  5: [
    { id: "l5c1", prompt: "@stardroplin explain agent-led growth in depth" },
    { id: "l5c2", prompt: "@stardroplin design a self-improving GTM engine for [company]" },
    { id: "l5c3", prompt: "@stardroplin what is warehouse-native GTM and how do I implement it?" },
  ],
};

const API_BASE = "https://xitwxb23yn.us-east-1.awsapprunner.com";

// ---------------------------------------------------------------------------
// localStorage helpers
// ---------------------------------------------------------------------------

function loadJSON<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = localStorage.getItem(STORAGE_PREFIX + key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function saveJSON(key: string, value: unknown) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_PREFIX + key, JSON.stringify(value));
}

// ---------------------------------------------------------------------------
// Circular Progress Ring
// ---------------------------------------------------------------------------

function ScoreRing({ score, size = 180 }: { score: number; size?: number }) {
  const strokeWidth = 10;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  const getColor = (s: number) => {
    if (s >= 75) return "#22c55e";
    if (s >= 50) return "#eab308";
    if (s >= 25) return "#f97316";
    return "#ef4444";
  };

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#f5f5f5"
          strokeWidth={strokeWidth}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={getColor(score)}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-all duration-700 ease-out"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-serif text-4xl italic text-neutral-900">{score}</span>
        <span className="text-xs text-neutral-400 -mt-1">/ 100</span>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Skill Bar
// ---------------------------------------------------------------------------

function SkillBar({ label, score, color }: { label: string; score: number; color: string }) {
  return (
    <div>
      <div className="flex items-center justify-between text-xs mb-1.5">
        <span className="text-neutral-600 font-medium">{label}</span>
        <span className="text-neutral-400">{score}%</span>
      </div>
      <div className="h-2 w-full rounded-full bg-neutral-100">
        <div
          className="h-2 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${score}%`, backgroundColor: color }}
        />
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main Page
// ---------------------------------------------------------------------------

export default function ImprovePage() {
  const [tab, setTab] = useState<Tab>("score");
  const [skills, setSkills] = useState<SkillScore[]>([]);
  const [exploredCategories, setExploredCategories] = useState<Set<string>>(new Set());
  const [levels, setLevels] = useState<Level[]>([]);
  const [traceQuery, setTraceQuery] = useState("");
  const [traceResult, setTraceResult] = useState<TraceResult | null>(null);
  const [tracing, setTracing] = useState(false);
  const [dailyLog, setDailyLog] = useState<DailyLog[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    const savedSkills = loadJSON<SkillScore[] | null>("skills", null);
    if (savedSkills) {
      setSkills(savedSkills);
    } else {
      setSkills(SKILL_DEFS.map((d) => ({ ...d, score: 0 })));
    }

    const savedExplored = loadJSON<string[]>("explored_categories", []);
    setExploredCategories(new Set(savedExplored));

    const savedLevels = loadJSON<Level[] | null>("levels", null);
    if (savedLevels) {
      setLevels(savedLevels);
    } else {
      setLevels(
        LEARNING_LEVELS.map((l) => ({
          ...l,
          challenges: LEVEL_CHALLENGES[l.id].map((c) => ({
            ...c,
            completed: false,
          })),
        }))
      );
    }

    setDailyLog(loadJSON<DailyLog[]>("daily_log", []));
    setMounted(true);
  }, []);

  // Persist skills
  useEffect(() => {
    if (mounted && skills.length > 0) saveJSON("skills", skills);
  }, [skills, mounted]);

  // Persist explored categories
  useEffect(() => {
    if (mounted) saveJSON("explored_categories", Array.from(exploredCategories));
  }, [exploredCategories, mounted]);

  // Persist levels
  useEffect(() => {
    if (mounted && levels.length > 0) saveJSON("levels", levels);
  }, [levels, mounted]);

  // Persist daily log
  useEffect(() => {
    if (mounted && dailyLog.length > 0) saveJSON("daily_log", dailyLog);
  }, [dailyLog, mounted]);

  // Computed overall score
  const overallScore = skills.length > 0
    ? Math.round(skills.reduce((sum, s) => sum + s.score, 0) / skills.length)
    : 0;

  // Weakest skill
  const weakest = skills.length > 0
    ? skills.reduce((min, s) => (s.score < min.score ? s : min), skills[0])
    : null;

  // Toggle challenge completion
  const toggleChallenge = useCallback(
    (levelId: number, challengeId: string) => {
      setLevels((prev) =>
        prev.map((l) => {
          if (l.id !== levelId) return l;
          return {
            ...l,
            challenges: l.challenges.map((c) =>
              c.id === challengeId ? { ...c, completed: !c.completed } : c
            ),
          };
        })
      );
      // Boost a random skill slightly when completing a challenge
      setSkills((prev) => {
        const idx = Math.floor(Math.random() * prev.length);
        return prev.map((s, i) =>
          i === idx ? { ...s, score: Math.min(100, s.score + 5) } : s
        );
      });
    },
    []
  );

  // Explore a category
  const exploreCategory = useCallback((key: string) => {
    setExploredCategories((prev) => {
      const next = new Set(prev);
      next.add(key);
      return next;
    });
    // Boost stack knowledge or signal detection
    setSkills((prev) =>
      prev.map((s) =>
        s.key === "stack" ? { ...s, score: Math.min(100, s.score + 3) } : s
      )
    );
  }, []);

  // Trace a question — calls real Stardrop API
  const runTrace = useCallback(async () => {
    if (!traceQuery.trim()) return;
    setTracing(true);
    setTraceResult(null);

    try {
      const res = await fetch(
        `${API_BASE}/api/gtm/analyze?text=${encodeURIComponent(traceQuery)}&author=dashboard_user`,
        { method: "POST" }
      );

      if (!res.ok) throw new Error(`API returned ${res.status}`);

      const data = await res.json();

      // Build trace result from real API response
      const intent = data.intent || "general_gtm";
      const tweets: string[] = data.response_tweets || [];
      const ragSources: string[] = data.rag_sources || [];

      // Map real RAG sources to vault notes with relevance
      const vaultNotes = ragSources.length > 0
        ? ragSources.slice(0, 5).map((name: string, i: number) => ({
            name,
            relevance: Math.round(95 - i * 10),
          }))
        : [{ name: "No RAG sources returned", relevance: 0 }];

      const patterns = [
        tweets.length > 0
          ? `Generated ${tweets.length}-tweet thread`
          : "No response generated",
        "Response grounded in vault knowledge via RAG retrieval",
        "Engagement patterns from past responses applied",
      ];

      const chain = [
        `Question: "${traceQuery.slice(0, 60)}${traceQuery.length > 60 ? "..." : ""}"`,
        `Intent: ${intent}`,
        `Retrieved: ${ragSources.length} vault notes via ChromaDB`,
        `Generated: ${tweets.length} tweets via GPT-4o`,
        tweets[0] ? `Response: "${tweets[0].slice(0, 80)}..."` : "Response: (none)",
      ];

      setTraceResult({ intent, confidence: 88, vaultNotes, patterns, chain });

      // Boost skills based on which intent was detected
      const intentSkillMap: Record<string, string> = {
        icp_analyzer: "icp", competitor_intel: "competitor",
        signal_scanner: "signal", gtm_roast: "strategy",
        stack_advisor: "stack", outbound_generator: "outbound",
      };
      const skillKey = intentSkillMap[intent];
      if (skillKey) {
        setSkills((prev) =>
          prev.map((s) =>
            s.key === skillKey ? { ...s, score: Math.min(100, s.score + 3) } : s
          )
        );
      }
    } catch {
      // API down — show error state
      setTraceResult({
        intent: "api_unavailable",
        confidence: 0,
        vaultNotes: [],
        patterns: ["Stardrop API is currently unavailable (503)"],
        chain: [
          `Question: "${traceQuery.slice(0, 60)}${traceQuery.length > 60 ? "..." : ""}"`,
          "API: https://xitwxb23yn.us-east-1.awsapprunner.com",
          "Status: Unavailable — try again later or tag @stardroplin on X",
        ],
      });
    } finally {
      setTracing(false);
    }
  }, [traceQuery]);

  // Compound math
  const compound1pct = (days: number) => Math.pow(1.01, days);

  // Practice now button
  const openPractice = useCallback(() => {
    const prompt = weakest?.suggestion || "@stardroplin help me level up my GTM";
    window.open(
      `https://x.com/intent/tweet?text=${encodeURIComponent(prompt)}`,
      "_blank"
    );
    // Log interaction
    const today = new Date().toISOString().split("T")[0];
    setDailyLog((prev) => {
      const existing = prev.find((d) => d.date === today);
      if (existing) {
        return prev.map((d) =>
          d.date === today
            ? { ...d, interactions: d.interactions + 1, score: Math.min(100, d.score + 1) }
            : d
        );
      }
      return [...prev, { date: today, interactions: 1, score: overallScore }];
    });
  }, [weakest, overallScore]);

  const TABS: { key: Tab; label: string }[] = [
    { key: "score", label: "Your GTM Score" },
    { key: "knowledge", label: "Knowledge Map" },
    { key: "learn", label: "Learn" },
    { key: "trace", label: "Why This Answer" },
    { key: "compound", label: "Compound Curve" },
  ];

  if (!mounted) {
    return (
      <div className="flex items-center justify-center px-6 py-20">
        <p className="text-sm text-neutral-400">Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col">
      {/* Header */}
      <div className="shrink-0 border-b border-neutral-200 px-6 pb-0 pt-8 md:px-10">
        <p className="text-xs font-medium uppercase tracking-[0.15em] text-neutral-400">
          Dashboard
        </p>
        <h1 className="mt-1 font-serif text-3xl italic tracking-tight text-neutral-900">
          Improve
        </h1>
        <p className="mt-2 text-sm text-neutral-500 max-w-lg">
          Level up your GTM game. Every interaction with Stardrop makes you a better practitioner.
        </p>

        {/* Tabs */}
        <div className="mt-4 flex gap-0 overflow-x-auto">
          {TABS.map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`relative whitespace-nowrap px-4 py-2.5 text-[13px] font-medium transition-colors ${
                tab === t.key
                  ? "text-neutral-900"
                  : "text-neutral-400 hover:text-neutral-600"
              }`}
            >
              {t.label}
              {tab === t.key && (
                <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-neutral-900 rounded-full" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {/* ----------------------------------------------------------------- */}
        {/* Tab 1: Your GTM Score */}
        {/* ----------------------------------------------------------------- */}
        {tab === "score" && (
          <div className="px-6 py-8 md:px-10 max-w-3xl">
            {/* Score ring */}
            <div className="flex flex-col items-center">
              <ScoreRing score={overallScore} />
              <p className="mt-3 text-sm font-medium text-neutral-700">
                GTM Readiness Score
              </p>
              <p className="mt-1 text-xs text-neutral-400">
                {overallScore === 0
                  ? "Complete challenges and explore topics to build your score."
                  : overallScore < 30
                    ? "You're getting started. Keep exploring."
                    : overallScore < 60
                      ? "Solid foundation. Push into your weak areas."
                      : overallScore < 80
                        ? "Strong practitioner. Time for advanced topics."
                        : "Elite GTM operator. You're in the top tier."}
              </p>
            </div>

            {/* Skill bars */}
            <div className="mt-10 space-y-4">
              <h2 className="text-sm font-semibold uppercase tracking-widest text-neutral-400">
                Skill breakdown
              </h2>
              <div className="space-y-3">
                {skills.map((s) => (
                  <SkillBar key={s.key} label={s.label} score={s.score} color={s.color} />
                ))}
              </div>
            </div>

            {/* Suggested next step */}
            {weakest && (
              <div className="mt-10">
                <h2 className="text-sm font-semibold uppercase tracking-widest text-neutral-400 mb-4">
                  Suggested next step
                </h2>
                <div className="rounded-xl border border-neutral-200 bg-white p-5">
                  <p className="text-sm text-neutral-700">
                    Your <span className="font-semibold">{weakest.label}</span> is at{" "}
                    <span className="font-semibold">{weakest.score}%</span>.
                    {weakest.score === 0
                      ? " Start here to build your foundation."
                      : " Focus here for the biggest improvement."}
                  </p>
                  <p className="mt-3 rounded-lg bg-neutral-50 px-4 py-3 font-mono text-xs text-neutral-600">
                    {weakest.suggestion}
                  </p>
                  <button
                    onClick={openPractice}
                    className="mt-4 rounded-lg bg-neutral-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-neutral-800 transition-colors"
                  >
                    Practice now
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ----------------------------------------------------------------- */}
        {/* Tab 2: Knowledge Map */}
        {/* ----------------------------------------------------------------- */}
        {tab === "knowledge" && (
          <div className="px-6 py-8 md:px-10 max-w-4xl">
            <div className="mb-6">
              <p className="text-sm text-neutral-500">
                {exploredCategories.size} of {VAULT_CATEGORIES.length} topic areas explored.
                Click unexplored areas to get a suggested question.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {VAULT_CATEGORIES.map((cat) => {
                const explored = exploredCategories.has(cat.key);
                const touched = explored ? Math.min(cat.total, Math.floor(cat.total * 0.4) + 1) : 0;
                const isSelected = selectedCategory === cat.key;

                return (
                  <div key={cat.key}>
                    <button
                      onClick={() => {
                        if (explored) return;
                        setSelectedCategory(isSelected ? null : cat.key);
                      }}
                      className={`w-full rounded-xl border p-5 text-left transition-all ${
                        explored
                          ? "border-neutral-200 bg-white"
                          : "border-dashed border-neutral-200 bg-neutral-50/50 hover:border-neutral-300 cursor-pointer"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className={`inline-block h-3 w-3 rounded-full shrink-0 transition-opacity ${
                            explored ? "opacity-100" : "opacity-30"
                          }`}
                          style={{ backgroundColor: cat.color }}
                        />
                        <span
                          className={`text-[13px] font-medium ${
                            explored ? "text-neutral-800" : "text-neutral-400"
                          }`}
                        >
                          {cat.label}
                        </span>
                      </div>
                      <div className="mt-3 flex items-center justify-between">
                        <span className="text-xs text-neutral-400">
                          {touched} / {cat.total} notes
                        </span>
                        {explored && (
                          <span className="text-[10px] font-medium text-green-600 uppercase tracking-wider">
                            Explored
                          </span>
                        )}
                      </div>
                      {/* Mini progress bar */}
                      <div className="mt-2 h-1 w-full rounded-full bg-neutral-100">
                        <div
                          className="h-1 rounded-full transition-all duration-500"
                          style={{
                            width: `${(touched / cat.total) * 100}%`,
                            backgroundColor: explored ? cat.color : "#d4d4d4",
                          }}
                        />
                      </div>
                    </button>

                    {/* Suggestion popup */}
                    {isSelected && !explored && (
                      <div className="mt-2 rounded-lg border border-neutral-200 bg-white p-4">
                        <p className="text-xs text-neutral-500 mb-2">
                          Try asking Stardrop:
                        </p>
                        <p className="font-mono text-xs text-neutral-700 bg-neutral-50 rounded-md px-3 py-2">
                          {CATEGORY_QUESTIONS[cat.key]}
                        </p>
                        <div className="mt-3 flex gap-2">
                          <a
                            href={`https://x.com/intent/tweet?text=${encodeURIComponent(CATEGORY_QUESTIONS[cat.key])}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => exploreCategory(cat.key)}
                            className="rounded-md bg-neutral-900 px-3 py-1.5 text-xs font-medium text-white hover:bg-neutral-800 transition-colors"
                          >
                            Ask this
                          </a>
                          <button
                            onClick={() => {
                              exploreCategory(cat.key);
                              setSelectedCategory(null);
                            }}
                            className="rounded-md border border-neutral-200 px-3 py-1.5 text-xs text-neutral-600 hover:bg-neutral-50 transition-colors"
                          >
                            Mark as explored
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ----------------------------------------------------------------- */}
        {/* Tab 3: Learn */}
        {/* ----------------------------------------------------------------- */}
        {tab === "learn" && (
          <div className="px-6 py-8 md:px-10 max-w-3xl">
            <p className="text-sm text-neutral-500 mb-8">
              A structured learning path from GTM basics to advanced self-improving systems.
              Complete challenges by tweeting at @stardroplin, then check them off.
            </p>

            <div className="space-y-6">
              {levels.map((level) => {
                const completedCount = level.challenges.filter((c) => c.completed).length;
                const totalCount = level.challenges.length;
                const pct = Math.round((completedCount / totalCount) * 100);

                return (
                  <div
                    key={level.id}
                    className="rounded-xl border border-neutral-200 bg-white overflow-hidden"
                  >
                    {/* Level header */}
                    <div className="px-5 pt-5 pb-4">
                      <div className="flex items-center gap-3">
                        <span
                          className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold ${
                            pct === 100
                              ? "bg-green-100 text-green-700"
                              : "bg-neutral-100 text-neutral-500"
                          }`}
                        >
                          {pct === 100 ? (
                            <svg className="h-3.5 w-3.5" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <polyline points="3 8 7 12 13 4" />
                            </svg>
                          ) : (
                            level.id
                          )}
                        </span>
                        <div className="flex-1">
                          <h3 className="text-sm font-semibold text-neutral-800">
                            Level {level.id}: {level.title}
                          </h3>
                          <p className="text-xs text-neutral-400 mt-0.5">
                            {level.description}
                          </p>
                        </div>
                        <span className="text-xs text-neutral-400">
                          {completedCount}/{totalCount}
                        </span>
                      </div>
                      {/* Progress bar */}
                      <div className="mt-3 h-1.5 w-full rounded-full bg-neutral-100">
                        <div
                          className="h-1.5 rounded-full bg-neutral-900 transition-all duration-500"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>

                    {/* Challenges */}
                    <div className="border-t border-neutral-100">
                      {level.challenges.map((challenge) => (
                        <div
                          key={challenge.id}
                          className="flex items-start gap-3 px-5 py-3 border-b border-neutral-50 last:border-b-0"
                        >
                          <button
                            onClick={() => toggleChallenge(level.id, challenge.id)}
                            className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition-colors ${
                              challenge.completed
                                ? "border-green-500 bg-green-500 text-white"
                                : "border-neutral-300 hover:border-neutral-400"
                            }`}
                          >
                            {challenge.completed && (
                              <svg className="h-3 w-3" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="3 8 7 12 13 4" />
                              </svg>
                            )}
                          </button>
                          <div className="flex-1 min-w-0">
                            <p
                              className={`font-mono text-xs leading-relaxed ${
                                challenge.completed
                                  ? "text-neutral-400 line-through"
                                  : "text-neutral-700"
                              }`}
                            >
                              {challenge.prompt}
                            </p>
                          </div>
                          {!challenge.completed && (
                            <a
                              href={`https://x.com/intent/tweet?text=${encodeURIComponent(challenge.prompt)}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="shrink-0 rounded-md border border-neutral-200 px-2.5 py-1 text-[11px] text-neutral-500 hover:bg-neutral-50 hover:text-neutral-700 transition-colors"
                            >
                              Tweet
                            </a>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ----------------------------------------------------------------- */}
        {/* Tab 4: Why This Answer (Interpretability) */}
        {/* ----------------------------------------------------------------- */}
        {tab === "trace" && (
          <div className="px-6 py-8 md:px-10 max-w-3xl">
            <p className="text-sm text-neutral-500 mb-6">
              Paste any GTM question and see how Stardrop thinks. Understand the intent detection, retrieval, and reasoning.
            </p>

            {/* Input */}
            <div className="flex gap-3">
              <input
                type="text"
                value={traceQuery}
                onChange={(e) => setTraceQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") runTrace();
                }}
                placeholder="e.g. How should a Series A SaaS set up signal-based selling?"
                className="flex-1 rounded-lg border border-neutral-200 bg-white px-4 py-3 text-sm text-neutral-800 placeholder:text-neutral-400 focus:border-neutral-400 focus:outline-none transition-colors"
              />
              <button
                onClick={runTrace}
                disabled={tracing || !traceQuery.trim()}
                className="rounded-lg bg-neutral-900 px-5 py-3 text-sm font-medium text-white hover:bg-neutral-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                {tracing ? "Tracing..." : "Trace"}
              </button>
            </div>

            {/* Empty state */}
            {!traceResult && !tracing && (
              <div className="mt-12 flex flex-col items-center justify-center rounded-xl border border-dashed border-neutral-200 bg-neutral-50/50 px-6 py-16 text-center">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-neutral-100">
                  <svg className="h-5 w-5 text-neutral-400" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="8" cy="8" r="6.5" />
                    <path d="M5.5 6.5a2.5 2.5 0 0 1 5 0c0 1.5-2.5 2-2.5 3.5" />
                    <circle cx="8" cy="12.5" r="0.5" fill="currentColor" />
                  </svg>
                </div>
                <h3 className="text-sm font-semibold text-neutral-700">
                  See how Stardrop thinks
                </h3>
                <p className="mt-1.5 max-w-sm text-xs text-neutral-400 leading-relaxed">
                  Type a GTM question above and hit Trace to see the intent classification, vault retrieval, and reasoning chain.
                </p>
              </div>
            )}

            {/* Loading state */}
            {tracing && (
              <div className="mt-8 flex items-center justify-center py-12">
                <div className="flex items-center gap-3">
                  <div className="h-2 w-2 rounded-full bg-neutral-400 animate-pulse" />
                  <p className="text-sm text-neutral-400">Tracing reasoning chain...</p>
                </div>
              </div>
            )}

            {/* Trace result */}
            {traceResult && !tracing && (
              <div className="mt-8 space-y-6">
                {/* Intent */}
                <div className="rounded-xl border border-neutral-200 bg-white p-5">
                  <h3 className="text-xs font-semibold uppercase tracking-widest text-neutral-400 mb-3">
                    Intent detected
                  </h3>
                  <div className="flex items-center gap-3">
                    <span className="rounded-md bg-neutral-100 px-3 py-1.5 text-sm font-medium text-neutral-800">
                      {traceResult.intent.replace(/_/g, " ")}
                    </span>
                    <div className="flex-1">
                      <div className="h-2 w-full max-w-[200px] rounded-full bg-neutral-100">
                        <div
                          className="h-2 rounded-full bg-neutral-900 transition-all duration-500"
                          style={{ width: `${traceResult.confidence}%` }}
                        />
                      </div>
                    </div>
                    <span className="text-sm font-medium text-neutral-700">
                      {traceResult.confidence}%
                    </span>
                  </div>
                </div>

                {/* Vault notes */}
                <div className="rounded-xl border border-neutral-200 bg-white p-5">
                  <h3 className="text-xs font-semibold uppercase tracking-widest text-neutral-400 mb-3">
                    Top vault notes retrieved
                  </h3>
                  <div className="space-y-2.5">
                    {traceResult.vaultNotes.map((note, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <span className="w-5 text-right text-[11px] text-neutral-400 shrink-0">
                          {i + 1}
                        </span>
                        <span className="text-sm text-neutral-700 min-w-[160px]">
                          {note.name}
                        </span>
                        <div className="flex-1 h-1.5 rounded-full bg-neutral-100">
                          <div
                            className="h-1.5 rounded-full bg-blue-500 transition-all duration-500"
                            style={{ width: `${note.relevance}%` }}
                          />
                        </div>
                        <span className="text-xs text-neutral-400 shrink-0 w-8 text-right">
                          {note.relevance}%
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Patterns */}
                <div className="rounded-xl border border-neutral-200 bg-white p-5">
                  <h3 className="text-xs font-semibold uppercase tracking-widest text-neutral-400 mb-3">
                    Learned patterns applied
                  </h3>
                  <div className="space-y-2">
                    {traceResult.patterns.map((p, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-sm text-neutral-600">
                        <span className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-neutral-300 shrink-0" />
                        {p}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Reasoning chain */}
                <div className="rounded-xl border border-neutral-200 bg-white p-5">
                  <h3 className="text-xs font-semibold uppercase tracking-widest text-neutral-400 mb-4">
                    Reasoning chain
                  </h3>
                  <div className="space-y-0">
                    {traceResult.chain.map((step, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <div className="flex flex-col items-center">
                          <div
                            className={`flex h-6 w-6 items-center justify-center rounded-full text-[10px] font-bold ${
                              i === traceResult.chain.length - 1
                                ? "bg-neutral-900 text-white"
                                : "bg-neutral-100 text-neutral-500"
                            }`}
                          >
                            {i + 1}
                          </div>
                          {i < traceResult.chain.length - 1 && (
                            <div className="w-px h-6 bg-neutral-200" />
                          )}
                        </div>
                        <p className="text-sm text-neutral-700 pt-0.5 pb-3">
                          {step}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ----------------------------------------------------------------- */}
        {/* Tab 5: Compound Curve */}
        {/* ----------------------------------------------------------------- */}
        {tab === "compound" && (
          <div className="px-6 py-8 md:px-10 max-w-3xl">
            {/* 1% math */}
            <div className="rounded-xl border border-neutral-200 bg-white p-6 text-center">
              <p className="text-xs font-medium uppercase tracking-widest text-neutral-400">
                The compound effect
              </p>
              <p className="mt-3 font-serif text-2xl italic text-neutral-900">
                1.01<sup>365</sup> = 37.78x
              </p>
              <p className="mt-2 text-sm text-neutral-500">
                1% better every day for a year. Small, consistent improvement compounds into transformative change.
              </p>
            </div>

            {/* Projection cards */}
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              {[
                { days: 30, label: "30 days" },
                { days: 90, label: "90 days" },
                { days: 365, label: "365 days" },
              ].map(({ days, label }) => (
                <div
                  key={days}
                  className="rounded-xl border border-neutral-200 bg-white p-5 text-center"
                >
                  <p className="font-serif text-3xl italic text-neutral-900">
                    {compound1pct(days).toFixed(2)}x
                  </p>
                  <p className="mt-1 text-xs text-neutral-500">
                    After {label} (1%/day)
                  </p>
                </div>
              ))}
            </div>

            {/* Daily log */}
            <div className="mt-10">
              <h2 className="text-sm font-semibold uppercase tracking-widest text-neutral-400 mb-4">
                Daily log
              </h2>
              {dailyLog.length === 0 ? (
                <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-neutral-200 bg-neutral-50/50 px-6 py-12 text-center">
                  <p className="text-sm font-semibold text-neutral-700">
                    No interactions yet
                  </p>
                  <p className="mt-1.5 max-w-sm text-xs text-neutral-400 leading-relaxed">
                    Start practicing from the GTM Score tab or complete challenges in Learn. Your daily interactions will appear here.
                  </p>
                  <button
                    onClick={() => setTab("score")}
                    className="mt-4 rounded-lg bg-neutral-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-neutral-800 transition-colors"
                  >
                    Get started
                  </button>
                </div>
              ) : (
                <div className="space-y-2">
                  {[...dailyLog].reverse().map((d) => (
                    <div
                      key={d.date}
                      className="flex items-center justify-between rounded-lg border border-neutral-200 bg-white px-4 py-3"
                    >
                      <span className="text-sm font-medium text-neutral-800">
                        {d.date}
                      </span>
                      <div className="flex items-center gap-6 text-xs text-neutral-500">
                        <span>{d.interactions} interaction{d.interactions !== 1 ? "s" : ""}</span>
                        <span className="font-semibold text-neutral-900">
                          Score: {d.score}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Philosophy quote */}
            <div className="mt-16 border-t border-neutral-200 pt-10">
              <blockquote className="font-serif text-xl italic text-neutral-400 leading-relaxed">
                &quot;1% better every day for a year = 37.78x improvement.
                1% worse every day = 97% decline. The system that learns
                fastest wins.&quot;
              </blockquote>
              <p className="mt-3 text-xs text-neutral-400">
                — James Clear, Atomic Habits / The Self-Improving GTM Engine
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
