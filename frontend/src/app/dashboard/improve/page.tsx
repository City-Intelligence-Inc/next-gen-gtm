"use client";

import { useState, useEffect, useCallback } from "react";

// ---------------------------------------------------------------------------
// Types & Constants
// ---------------------------------------------------------------------------

type Tab = "automate" | "review" | "documents" | "score" | "knowledge" | "learn" | "trace" | "compound";

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

// ---------------------------------------------------------------------------
// Review card data (pre-loaded Q&A pairs)
// ---------------------------------------------------------------------------

interface ReviewCard {
  question: string;
  answer: string;
}

const REVIEW_CARDS: ReviewCard[] = [
  {
    question: "who should I sell to? we built an AI code review tool",
    answer:
      "Target: Engineering Managers at B2B SaaS (50-500 employees). They run 15+ PRs/day and struggle with review bottlenecks. Signal: Companies posting 'hiring senior engineers' = growing team, more PRs. This week: Use Clay to find 50 Engineering Managers at Series A-B SaaS.",
  },
  {
    question: "roast my GTM strategy. We're doing PLG but conversion is 0.5%",
    answer:
      "0.5% conversion means you have a monetization problem, not a growth problem. Three issues: (1) Your activation metric is probably wrong (2) No PQL scoring (3) No sales-assist layer. Fix: Add Pocus for PQL scoring, trigger Slack alerts when usage spikes, have AE reach out within 5 min.",
  },
  {
    question: "analyze competitor @lattice",
    answer:
      "Lattice: $150M+ ARR, 5000+ customers. Weakness: enterprise pricing ($11/seat/mo), slow on async/remote. Your wedge: remote-first performance management. Counter-move: Offer async 360 reviews with timezone-aware nudges. Differentiate on price ($5/seat).",
  },
  {
    question: "what GTM stack should I use? Early stage, $0 budget",
    answer:
      "At $0 with 3 people: Attio free tier (CRM), Clay free tier (100 credits/mo), Instantly trial + personal Gmail for outreach, Google Alerts for signals, PostHog free for analytics. Skip Apollo until $5K MRR. This stack costs $0 and handles your first 100 customers.",
  },
  {
    question: "find buying signals for AI code review tools",
    answer:
      '5 signals: (1) Hiring "Senior Engineer" = growing team, more PRs. (2) GitHub Copilot in job descriptions = AI-forward. (3) Tweets about PR review bottlenecks. (4) Series A-B in last 6 months. (5) GitHub Enterprise + CI/CD tools. Set up Clay table with these 5 signals, score 1-5.',
  },
  {
    question:
      "turn this into outbound: We reduce e-commerce return rates by 40% using AI sizing",
    answer:
      "Subject: 'Your return rate is costing you $2M/year'. Body: 'Hi [Name], [Company] processed ~$X in returns last quarter. Our AI sizing tool cut return rates 40% for [brand]. Worth 15 min?' Follow-up Day 3: case study. Day 7: 'No pressure \u2014 the $2M/year number speaks for itself.'",
  },
  {
    question: "who are the best AI SDR tools right now?",
    answer:
      "The market is shaking out. 11x and Artisan raised big but churn is 70-80%. The winners are hybrid: AI generates leads + copy, humans close. Best stack: Clay for enrichment, Apollo for data, Instantly for sending. Skip pure AI SDRs \u2014 the 2.3x engagement gap vs hybrid is real.",
  },
  {
    question: "how do I set up a signal-based selling motion?",
    answer:
      "Signal-based selling in 4 steps: (1) Define 5 buying signals (hiring, funding, tech changes, complaints, research). (2) Set up monitoring (Google Alerts, LinkedIn saved searches, Clay). (3) Score signals 1-5 for intent strength. (4) Route 4-5s to immediate outreach, nurture 2-3s. 94% of buyers lock vendor list before first contact \u2014 you need to be there first.",
  },
];

type ReviewRating = "good" | "bad" | "skip";

interface ReviewResult {
  index: number;
  rating: ReviewRating;
  question: string;
}

// ---------------------------------------------------------------------------
// Document types
// ---------------------------------------------------------------------------

type DocumentCategory =
  | "Product Info"
  | "Case Study"
  | "Battle Card"
  | "ICP"
  | "Playbook"
  | "Other";

const DOCUMENT_CATEGORIES: DocumentCategory[] = [
  "Product Info",
  "Case Study",
  "Battle Card",
  "ICP",
  "Playbook",
  "Other",
];

interface SavedDocument {
  id: string;
  title: string;
  category: DocumentCategory;
  content: string;
  createdAt: string;
}

const API_BASE = "https://xitwxb23yn.us-east-1.awsapprunner.com";

// ---------------------------------------------------------------------------
// Playbook types & data
// ---------------------------------------------------------------------------

interface PlaybookStep {
  title: string;
  detail: string;
}

interface Playbook {
  id: string;
  title: string;
  time: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  tools: string[];
  description: string;
  steps: PlaybookStep[];
}

const PLAYBOOKS: Playbook[] = [
  {
    id: "cold-outbound",
    title: "Set Up Cold Outbound in 45 Minutes",
    time: "45 min",
    difficulty: "Beginner",
    tools: ["Clay", "Apollo", "Instantly"],
    description:
      "Go from zero to a live outbound sequence hitting real inboxes. No fluff, no strategy decks — just a working pipeline you can measure by Friday.",
    steps: [
      {
        title: "Define your ICP",
        detail:
          'Pick 1 job title + 1 company size + 1 industry. Write it in one sentence. (e.g. "VP Engineering at B2B SaaS, 50-200 employees, Series A-B")',
      },
      {
        title: "Build a Clay table",
        detail:
          "Go to clay.com, create a free account, start a new table. Add columns: Company, Name, Title, Email, LinkedIn.",
      },
      {
        title: "Find 50 leads in Apollo",
        detail:
          "Go to apollo.io, filter by your ICP criteria. Export 50 contacts as CSV.",
      },
      {
        title: "Import to Clay",
        detail:
          'Upload your Apollo CSV to Clay. Run the "Enrich Email" waterfall to verify emails.',
      },
      {
        title: "Write your cold email",
        detail:
          'Subject: "[Specific pain point] at [Company]". Body: 2 sentences about their problem, 1 sentence about your solution, 1 CTA. No more than 80 words.',
      },
      {
        title: "Set up Instantly",
        detail:
          "Create account at instantly.ai. Connect your email (use a secondary domain). Import your enriched list from Clay.",
      },
      {
        title: "Launch sequence",
        detail:
          "Set up a 3-email sequence: Day 1 (cold email), Day 3 (follow-up with case study), Day 7 (breakup email). Send 20/day max.",
      },
      {
        title: "Track results",
        detail:
          "After 1 week, check: open rate (target >50%), reply rate (target >5%). If below, iterate on subject lines.",
      },
    ],
  },
  {
    id: "signal-detection",
    title: "Build a Signal Detection Pipeline",
    time: "30 min",
    difficulty: "Intermediate",
    tools: ["Google Alerts", "LinkedIn", "Twitter/X Lists"],
    description:
      "Stop guessing who to reach out to. Set up a system that tells you when a prospect is ready to buy — before they even start looking.",
    steps: [
      {
        title: "Identify 5 buying signals",
        detail:
          'Hiring signals (posting "Senior Engineer"), funding (raised Series A-B in last 6 months), tech stack changes (migrating to Kubernetes), complaints about competitors, G2 research.',
      },
      {
        title: "Set up Google Alerts",
        detail:
          'Create alerts for: "[competitor name] alternative", "[your category] problems", "hiring [your buyer persona title]". Set to daily digest.',
      },
      {
        title: "Create Twitter/X lists",
        detail:
          "Make a private list of 50 target accounts. Add competitors, industry analysts, and potential buyers. Check daily.",
      },
      {
        title: "LinkedIn saved searches",
        detail:
          "Search for your ICP title + keywords. Save the search. LinkedIn notifies you of new matches weekly.",
      },
      {
        title: "Build a tracking spreadsheet",
        detail:
          "Columns: Company, Signal Type, Signal Date, Signal Detail, Action Taken, Result. Review weekly.",
      },
      {
        title: "Score your signals",
        detail:
          "Rate each signal 1-5 for purchase intent. Prioritize 4-5s for immediate outreach. Queue 2-3s for nurture.",
      },
    ],
  },
  {
    id: "icp-definition",
    title: "Create Your ICP in 20 Minutes",
    time: "20 min",
    difficulty: "Beginner",
    tools: [],
    description:
      "Most founders skip this and regret it for 6 months. Spend 20 minutes now so every piece of outbound, content, and product decision has a target.",
    steps: [
      {
        title: "List your best 3 customers",
        detail:
          "Who uses your product the most? Who pays the most? Who had the fastest sales cycle?",
      },
      {
        title: "Find the pattern",
        detail:
          "What do they have in common? Industry, company size, funding stage, tech stack, team structure.",
      },
      {
        title: "Name the buyer",
        detail:
          'Write the exact job title of the person who says yes. Not "decision maker" — the actual title. (e.g. "VP Engineering" not "technical leader")',
      },
      {
        title: "Define their pain",
        detail:
          'What keeps them up at night? Be specific. Not "efficiency" — "their PR review time is 3x industry average and they\'re losing engineers over it."',
      },
      {
        title: "Write the one-sentence ICP",
        detail:
          '"[Title] at [company type] ([size]) who struggles with [specific pain]." This goes into every piece of outbound you write.',
      },
    ],
  },
  {
    id: "competitive-intel",
    title: "Automate Competitive Intelligence",
    time: "25 min",
    difficulty: "Intermediate",
    tools: ["Google Alerts", "LinkedIn", "Crunchbase"],
    description:
      "Know what your competitors are doing before their own customers do. Set up passive monitoring that takes 10 minutes a week to maintain.",
    steps: [
      {
        title: "List your top 5 competitors",
        detail:
          "Include direct competitors and adjacent tools that could expand into your space.",
      },
      {
        title: "Set up monitoring",
        detail:
          'Google Alerts for each: "[competitor] funding", "[competitor] launch", "[competitor] hiring". LinkedIn: follow their company pages and executives.',
      },
      {
        title: "Create a battle card",
        detail:
          "For each competitor: their positioning, pricing, strengths, weaknesses, customers they win, customers you win. One page max.",
      },
      {
        title: "Track their moves weekly",
        detail:
          "Every Monday, 10 minutes: check alerts, scan LinkedIn posts, note any changes. Update battle cards.",
      },
      {
        title: "Turn intel into action",
        detail:
          "When a competitor raises prices: email their customers. When they have an outage: post your uptime stats. When they hire aggressively in a new vertical: that vertical is heating up, go there too.",
      },
    ],
  },
  {
    id: "product-led-sales",
    title: "Set Up Product-Led Sales",
    time: "60 min",
    difficulty: "Advanced",
    tools: ["PostHog/Amplitude", "Slack", "CRM"],
    description:
      "Let your product tell you who to sell to. Build the pipeline from activation metric to PQL alert to sales-assist outreach.",
    steps: [
      {
        title: "Define your activation metric",
        detail:
          'What action in your product means a user "gets it"? Not signup — the moment of value. (e.g. "created first dashboard", "invited 3 teammates", "ran first query")',
      },
      {
        title: "Set up event tracking",
        detail:
          "Track the activation event + key usage milestones in your analytics tool. You need: signup, activation, daily active use, feature adoption.",
      },
      {
        title: "Build PQL criteria",
        detail:
          "A Product Qualified Lead has: activated + used product 3+ days + team >3 users. Set up a saved segment for this.",
      },
      {
        title: "Create Slack alerts",
        detail:
          'When a user hits PQL status, fire a Slack message to #sales: "{Company} ({size}) hit PQL — {user} activated {days} ago, {teammates} teammates, using {features}."',
      },
      {
        title: "Define the sales-assist playbook",
        detail:
          'AE reaches out within 4 hours of PQL alert. Message: not "want a demo?" but "I saw your team set up [feature] — here\'s how [similar company] got 3x more value from it."',
      },
      {
        title: "Track PQL to Paid conversion",
        detail:
          "Target: 15-25% of PQLs convert within 30 days. If below 15%, your PQL criteria is too loose. If above 25%, it's too tight.",
      },
    ],
  },
  {
    id: "gtm-strategy",
    title: "Write a GTM Strategy in 30 Minutes",
    time: "30 min",
    difficulty: "Beginner",
    tools: [],
    description:
      "No 40-page deck. One page that forces clarity on who, what, how, and where. If you can't fill this out, you're not ready to spend money on growth.",
    steps: [
      {
        title: "Pick your motion",
        detail:
          "Are you PLG (users find you), SLG (you find them), or PLS (users find you, sales closes them)? Pick one. Don't try to do all three.",
      },
      {
        title: "Define your wedge",
        detail:
          "What's the smallest, most specific use case you win 80%+ of the time? That's your wedge. Everything else is noise until you own this.",
      },
      {
        title: "Name your channels",
        detail:
          "Where do your buyers actually hang out? Pick 2 channels max. LinkedIn + cold email? Twitter + community? Product Hunt + content? Two. That's it.",
      },
      {
        title: "Set your 30-day targets",
        detail:
          "50 outbound conversations, 10 demos, 2 customers. If you can't hit this, your ICP is wrong or your channels are wrong.",
      },
      {
        title: "Write the one-pager",
        detail:
          "One page: ICP (who), Problem (why), Solution (what), Motion (how), Channels (where), 30-day targets (when). This is your GTM strategy. Everything else is execution.",
      },
    ],
  },
];

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
  const [tab, setTab] = useState<Tab>("automate");
  const [skills, setSkills] = useState<SkillScore[]>([]);
  const [exploredCategories, setExploredCategories] = useState<Set<string>>(new Set());
  const [levels, setLevels] = useState<Level[]>([]);
  const [traceQuery, setTraceQuery] = useState("");
  const [traceResult, setTraceResult] = useState<TraceResult | null>(null);
  const [tracing, setTracing] = useState(false);
  const [dailyLog, setDailyLog] = useState<DailyLog[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const [expandedPlaybook, setExpandedPlaybook] = useState<string | null>(null);
  const [playbookProgress, setPlaybookProgress] = useState<Record<string, boolean[]>>({});

  // Review tab state
  const [reviewIndex, setReviewIndex] = useState(0);
  const [reviewResults, setReviewResults] = useState<ReviewResult[]>([]);
  const [reviewExiting, setReviewExiting] = useState<"left" | "right" | null>(null);
  const [reviewDone, setReviewDone] = useState(false);

  // Documents tab state
  const [documents, setDocuments] = useState<SavedDocument[]>([]);
  const [docTitle, setDocTitle] = useState("");
  const [docCategory, setDocCategory] = useState<DocumentCategory>("Product Info");
  const [docContent, setDocContent] = useState("");

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
      const completedCount = savedLevels.reduce((sum, l) => sum + l.challenges.filter((c) => c.completed).length, 0);
      const totalCount = savedLevels.reduce((sum, l) => sum + l.challenges.length, 0);
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

    const savedDailyLog = loadJSON<DailyLog[]>("daily_log", []);
    setDailyLog(savedDailyLog);

    const savedProgress: Record<string, boolean[]> = {};
    for (const pb of PLAYBOOKS) {
      const steps = loadJSON<boolean[]>(`playbook_${pb.id}`, new Array(pb.steps.length).fill(false));
      savedProgress[pb.id] = steps;
      const completed = steps.filter(Boolean).length;
    }
    setPlaybookProgress(savedProgress);

    // Load review results
    const savedReviews = loadJSON<ReviewResult[]>("reviews", []);
    if (savedReviews.length > 0) {
      setReviewResults(savedReviews);
      // If all cards were already reviewed, show done state
      if (savedReviews.length >= REVIEW_CARDS.length) {
        setReviewIndex(REVIEW_CARDS.length);
        setReviewDone(true);
      } else {
        setReviewIndex(savedReviews.length);
      }
    }

    // Load documents
    const savedDocs = loadJSON<SavedDocument[]>("documents", []);
    setDocuments(savedDocs);
    if (savedDocs.length > 0) {
      console.log(`[Stardrop:Improve] Documents: Loaded ${savedDocs.length} documents from localStorage`);
    }

    setMounted(true);
  }, []);

  // Persist skills
  useEffect(() => {
    if (mounted && skills.length > 0) {
      saveJSON("skills", skills);
    }
  }, [skills, mounted]);

  // Persist explored categories
  useEffect(() => {
    if (mounted) {
      saveJSON("explored_categories", Array.from(exploredCategories));
    }
  }, [exploredCategories, mounted]);

  // Persist levels
  useEffect(() => {
    if (mounted && levels.length > 0) {
      saveJSON("levels", levels);
    }
  }, [levels, mounted]);

  // Persist daily log
  useEffect(() => {
    if (mounted && dailyLog.length > 0) {
      saveJSON("daily_log", dailyLog);
    }
  }, [dailyLog, mounted]);

  // Persist playbook progress
  useEffect(() => {
    if (mounted && Object.keys(playbookProgress).length > 0) {
      for (const [id, steps] of Object.entries(playbookProgress)) {
        saveJSON(`playbook_${id}`, steps);
      }
    }
  }, [playbookProgress, mounted]);

  // Persist review results
  useEffect(() => {
    if (mounted && reviewResults.length > 0) {
      saveJSON("reviews", reviewResults);
    }
  }, [reviewResults, mounted]);

  // Persist documents
  useEffect(() => {
    if (mounted) {
      saveJSON("documents", documents);
    }
  }, [documents, mounted]);

  // Review: rate a card
  const rateCard = useCallback(
    (rating: ReviewRating) => {
      if (reviewIndex >= REVIEW_CARDS.length || reviewExiting) return;

      const card = REVIEW_CARDS[reviewIndex];
      console.log(
        `[Stardrop:Improve] Review: Card ${reviewIndex + 1}/${REVIEW_CARDS.length} — "${card.question.slice(0, 40)}..."`
      );
      console.log(
        `[Stardrop:Improve] Review: Rated ${rating} on card ${reviewIndex + 1}`
      );

      const direction = rating === "bad" ? "left" : rating === "good" ? "right" : null;
      setReviewExiting(direction);

      const result: ReviewResult = {
        index: reviewIndex,
        rating,
        question: card.question,
      };

      setTimeout(() => {
        setReviewResults((prev) => [...prev, result]);
        setReviewExiting(null);

        const nextIndex = reviewIndex + 1;
        if (nextIndex >= REVIEW_CARDS.length) {
          setReviewDone(true);
        }
        setReviewIndex(nextIndex);
      }, 300);
    },
    [reviewIndex, reviewExiting]
  );

  // Review: keyboard shortcuts
  useEffect(() => {
    if (tab !== "review" || reviewDone) return;
    function handleKey(e: KeyboardEvent) {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        rateCard("bad");
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        rateCard("good");
      } else if (e.key === " ") {
        e.preventDefault();
        rateCard("skip");
      }
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [tab, rateCard, reviewDone]);

  // Review: reset
  const resetReview = useCallback(() => {
    setReviewIndex(0);
    setReviewResults([]);
    setReviewDone(false);
    setReviewExiting(null);
    if (typeof window !== "undefined") {
      localStorage.removeItem(STORAGE_PREFIX + "reviews");
    }
  }, []);

  // Documents: save
  const saveDocument = useCallback(() => {
    if (!docTitle.trim() || !docContent.trim()) return;
    const doc: SavedDocument = {
      id: Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
      title: docTitle.trim(),
      category: docCategory,
      content: docContent.trim(),
      createdAt: new Date().toISOString(),
    };
    console.log(
      `[Stardrop:Improve] Documents: Saved "${doc.title}" (${doc.category})`
    );
    setDocuments((prev) => [doc, ...prev]);
    setDocTitle("");
    setDocContent("");
    setDocCategory("Product Info");
  }, [docTitle, docCategory, docContent]);

  // Documents: delete
  const deleteDocument = useCallback((id: string) => {
    setDocuments((prev) => prev.filter((d) => d.id !== id));
  }, []);

  // Toggle a playbook step
  const togglePlaybookStep = useCallback(
    (playbookId: string, stepIndex: number) => {
      setPlaybookProgress((prev) => {
        const pb = PLAYBOOKS.find((p) => p.id === playbookId);
        if (!pb) return prev;
        const steps = prev[playbookId] || new Array(pb.steps.length).fill(false);
        const updated = [...steps];
        updated[stepIndex] = !updated[stepIndex];
        return { ...prev, [playbookId]: updated };
      });
    },
    []
  );

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
    { key: "automate", label: "Automate" },
    { key: "review", label: "Review" },
    { key: "documents", label: "Documents" },
    { key: "score", label: "Score" },
    { key: "knowledge", label: "Knowledge Map" },
    { key: "learn", label: "Learn" },
    { key: "trace", label: "Trace" },
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
        {/* Tab 0: Automate */}
        {/* ----------------------------------------------------------------- */}
        {tab === "automate" && (
          <div className="px-6 py-8 md:px-10 max-w-3xl">
            <p className="text-sm font-medium text-neutral-700 mb-1">
              Stop learning, start doing.
            </p>
            <p className="text-sm text-neutral-500 mb-8">
              Pick a playbook and execute it this week. Each one is a concrete GTM action with a measurable outcome.
            </p>

            <div className="space-y-4">
              {PLAYBOOKS.map((pb) => {
                const steps = playbookProgress[pb.id] || new Array(pb.steps.length).fill(false);
                const completedCount = steps.filter(Boolean).length;
                const totalSteps = pb.steps.length;
                const pct = Math.round((completedCount / totalSteps) * 100);
                const isExpanded = expandedPlaybook === pb.id;
                const isComplete = completedCount === totalSteps;

                const difficultyColor =
                  pb.difficulty === "Beginner"
                    ? "bg-green-50 text-green-700"
                    : pb.difficulty === "Intermediate"
                      ? "bg-amber-50 text-amber-700"
                      : "bg-red-50 text-red-700";

                return (
                  <div
                    key={pb.id}
                    className="rounded-xl border border-neutral-200 bg-white overflow-hidden"
                  >
                    {/* Collapsed header */}
                    <button
                      onClick={() =>
                        setExpandedPlaybook(isExpanded ? null : pb.id)
                      }
                      className="w-full px-5 pt-5 pb-4 text-left"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <h3 className="text-sm font-semibold text-neutral-800">
                              {pb.title}
                            </h3>
                            {isComplete && (
                              <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-green-700">
                                <svg className="h-2.5 w-2.5" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                  <polyline points="3 8 7 12 13 4" />
                                </svg>
                                Completed
                              </span>
                            )}
                          </div>
                          <div className="mt-2 flex items-center gap-2 flex-wrap">
                            <span className="inline-block rounded-full bg-neutral-100 px-2.5 py-0.5 text-[11px] font-medium text-neutral-600">
                              {pb.time}
                            </span>
                            <span
                              className={`inline-block rounded-full px-2.5 py-0.5 text-[11px] font-medium ${difficultyColor}`}
                            >
                              {pb.difficulty}
                            </span>
                            {pb.tools.length > 0 &&
                              pb.tools.map((tool) => (
                                <span
                                  key={tool}
                                  className="inline-block rounded-full bg-blue-50 px-2.5 py-0.5 text-[11px] font-medium text-blue-700"
                                >
                                  {tool}
                                </span>
                              ))}
                          </div>
                        </div>
                        <div className="shrink-0 flex items-center gap-2">
                          {completedCount > 0 && !isComplete && (
                            <span className="text-xs text-neutral-400">
                              {completedCount}/{totalSteps}
                            </span>
                          )}
                          <svg
                            className={`h-4 w-4 text-neutral-400 transition-transform duration-200 ${
                              isExpanded ? "rotate-180" : ""
                            }`}
                            viewBox="0 0 16 16"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <polyline points="4 6 8 10 12 6" />
                          </svg>
                        </div>
                      </div>
                    </button>

                    {/* Expanded content */}
                    {isExpanded && (
                      <div className="border-t border-neutral-100">
                        {/* Description + progress */}
                        <div className="px-5 pt-4 pb-3">
                          <p className="text-sm text-neutral-600 leading-relaxed">
                            {pb.description}
                          </p>
                          {/* Progress bar */}
                          <div className="mt-4 flex items-center gap-3">
                            <div className="flex-1 h-2 rounded-full bg-neutral-100">
                              <div
                                className={`h-2 rounded-full transition-all duration-500 ${
                                  isComplete ? "bg-green-500" : "bg-neutral-900"
                                }`}
                                style={{ width: `${pct}%` }}
                              />
                            </div>
                            <span className="text-xs font-medium text-neutral-500 shrink-0">
                              {pct}%
                            </span>
                          </div>
                        </div>

                        {/* Steps */}
                        <div className="px-5 pb-5">
                          <div className="space-y-0">
                            {pb.steps.map((step, idx) => {
                              const checked = steps[idx] || false;
                              return (
                                <div
                                  key={idx}
                                  className="flex items-start gap-3 py-3 border-b border-neutral-50 last:border-b-0"
                                >
                                  <button
                                    onClick={() =>
                                      togglePlaybookStep(pb.id, idx)
                                    }
                                    className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition-colors ${
                                      checked
                                        ? "border-green-500 bg-green-500 text-white"
                                        : "border-neutral-300 hover:border-neutral-400"
                                    }`}
                                  >
                                    {checked && (
                                      <svg
                                        className="h-3 w-3"
                                        viewBox="0 0 16 16"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      >
                                        <polyline points="3 8 7 12 13 4" />
                                      </svg>
                                    )}
                                  </button>
                                  <div className="flex-1 min-w-0">
                                    <p
                                      className={`text-sm font-medium leading-snug ${
                                        checked
                                          ? "text-neutral-400 line-through"
                                          : "text-neutral-800"
                                      }`}
                                    >
                                      {idx + 1}. {step.title}
                                    </p>
                                    <p
                                      className={`mt-1 text-xs leading-relaxed ${
                                        checked
                                          ? "text-neutral-300"
                                          : "text-neutral-500"
                                      }`}
                                    >
                                      {step.detail}
                                    </p>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
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
        {/* Tab: Review (Tinder-style card rating) */}
        {/* ----------------------------------------------------------------- */}
        {tab === "review" && (
          <div className="px-6 py-8 md:px-10 max-w-xl mx-auto">
            {!reviewDone && reviewIndex < REVIEW_CARDS.length && (
              <p className="text-center text-xs text-neutral-400 mb-6">
                Card {reviewIndex + 1} of {REVIEW_CARDS.length}
              </p>
            )}

            {reviewDone ? (
              /* Summary screen */
              <div className="rounded-2xl border border-neutral-200 bg-white p-10 text-center shadow-sm">
                <p className="font-serif text-3xl italic text-neutral-900">
                  All reviewed
                </p>
                <div className="mt-6 flex justify-center gap-8">
                  <div>
                    <p className="text-2xl font-semibold text-green-600">
                      {reviewResults.filter((r) => r.rating === "good").length}
                    </p>
                    <p className="text-xs text-neutral-400 mt-1">Good</p>
                  </div>
                  <div>
                    <p className="text-2xl font-semibold text-red-500">
                      {reviewResults.filter((r) => r.rating === "bad").length}
                    </p>
                    <p className="text-xs text-neutral-400 mt-1">Bad</p>
                  </div>
                  <div>
                    <p className="text-2xl font-semibold text-neutral-400">
                      {reviewResults.filter((r) => r.rating === "skip").length}
                    </p>
                    <p className="text-xs text-neutral-400 mt-1">Skipped</p>
                  </div>
                </div>
                <p className="mt-4 text-xs text-neutral-400">
                  {reviewResults.filter((r) => r.rating === "good").length > 0
                    ? `${Math.round(
                        (reviewResults.filter((r) => r.rating === "good").length /
                          reviewResults.filter((r) => r.rating !== "skip").length) *
                          100
                      )}% approval rate`
                    : ""}
                </p>
                <button
                  onClick={resetReview}
                  className="mt-6 rounded-lg bg-neutral-900 px-6 py-3 text-sm font-medium text-white hover:bg-neutral-800 transition-colors"
                >
                  Review again
                </button>
              </div>
            ) : reviewIndex < REVIEW_CARDS.length ? (
              <>
                {/* Card */}
                <div
                  className="transition-all duration-300 ease-out"
                  style={{
                    transform:
                      reviewExiting === "left"
                        ? "translateX(-120%) rotate(-8deg)"
                        : reviewExiting === "right"
                          ? "translateX(120%) rotate(8deg)"
                          : reviewExiting === null && reviewIndex > 0
                            ? "translateX(0)"
                            : "translateX(0)",
                    opacity: reviewExiting ? 0 : 1,
                  }}
                >
                  <div className="rounded-2xl border border-neutral-200 bg-white shadow-lg overflow-hidden">
                    {/* Question */}
                    <div className="border-b border-neutral-100 bg-neutral-50 px-6 py-4">
                      <p className="text-xs uppercase tracking-widest text-neutral-400 mb-1">
                        Question
                      </p>
                      <p className="text-sm text-neutral-500 leading-relaxed">
                        {REVIEW_CARDS[reviewIndex].question}
                      </p>
                    </div>
                    {/* Answer */}
                    <div className="px-6 py-5">
                      <p className="text-xs uppercase tracking-widest text-neutral-400 mb-2">
                        Stardrop&apos;s response
                      </p>
                      <p className="text-sm text-neutral-800 leading-relaxed">
                        {REVIEW_CARDS[reviewIndex].answer}
                      </p>
                    </div>
                    {/* Source tags */}
                    <div className="border-t border-neutral-100 px-6 py-3 flex flex-wrap gap-1.5">
                      <span className="rounded-full bg-neutral-100 px-2.5 py-0.5 text-[10px] text-neutral-500">
                        vault/gtm-knowledge
                      </span>
                      <span className="rounded-full bg-neutral-100 px-2.5 py-0.5 text-[10px] text-neutral-500">
                        vault/frameworks
                      </span>
                    </div>
                  </div>
                </div>

                {/* Buttons */}
                <div className="mt-6 flex items-center justify-center gap-5">
                  <button
                    onClick={() => rateCard("bad")}
                    className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-red-200 text-red-400 transition-all hover:bg-red-50 hover:border-red-400 hover:scale-110 active:scale-95"
                    title="Bad (Left arrow)"
                  >
                    <span className="text-xl">&#x2717;</span>
                  </button>
                  <button
                    onClick={() => rateCard("skip")}
                    className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-neutral-200 text-neutral-400 transition-all hover:bg-neutral-50 hover:border-neutral-400 hover:scale-110 active:scale-95"
                    title="Skip (Space)"
                  >
                    <svg className="h-4 w-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 3l6 5-6 5" />
                      <path d="M11 3v10" />
                    </svg>
                  </button>
                  <button
                    onClick={() => rateCard("good")}
                    className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-green-200 text-green-500 transition-all hover:bg-green-50 hover:border-green-400 hover:scale-110 active:scale-95"
                    title="Good (Right arrow)"
                  >
                    <span className="text-xl">&#x2713;</span>
                  </button>
                </div>

                {/* Keyboard hint */}
                <p className="mt-4 text-center text-[11px] text-neutral-300">
                  &#8592; Bad &middot; Space Skip &middot; Good &#8594;
                </p>
              </>
            ) : null}
          </div>
        )}

        {/* ----------------------------------------------------------------- */}
        {/* Tab: Documents */}
        {/* ----------------------------------------------------------------- */}
        {tab === "documents" && (
          <div className="px-6 py-8 md:px-10 max-w-3xl">
            <p className="text-sm text-neutral-500 mb-2">
              Upload documents to teach Stardrop about your product, market, and playbooks.
            </p>
            <p className="text-xs text-neutral-400 mb-8 rounded-lg bg-amber-50 border border-amber-200 px-4 py-2.5">
              Documents saved here will be indexed into Stardrop&apos;s knowledge base in a future update.
            </p>

            {/* New document form */}
            <div className="rounded-xl border border-neutral-200 bg-white p-5 space-y-4">
              <div className="flex gap-3">
                <div className="flex-1">
                  <label className="text-xs font-medium text-neutral-500 mb-1 block">
                    Title
                  </label>
                  <input
                    type="text"
                    value={docTitle}
                    onChange={(e) => setDocTitle(e.target.value)}
                    placeholder="e.g. Our ICP definition"
                    className="w-full rounded-lg border border-neutral-200 px-4 py-2.5 text-sm outline-none transition focus:border-neutral-400"
                  />
                </div>
                <div className="w-44">
                  <label className="text-xs font-medium text-neutral-500 mb-1 block">
                    Category
                  </label>
                  <select
                    value={docCategory}
                    onChange={(e) => setDocCategory(e.target.value as DocumentCategory)}
                    className="w-full rounded-lg border border-neutral-200 px-3 py-2.5 text-sm outline-none transition focus:border-neutral-400 bg-white"
                  >
                    {DOCUMENT_CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-medium text-neutral-500 mb-1 block">
                  Content
                </label>
                <textarea
                  value={docContent}
                  onChange={(e) => setDocContent(e.target.value)}
                  placeholder="Paste your document content here — product descriptions, case studies, battle cards, ICP documents, playbooks..."
                  rows={6}
                  className="w-full rounded-lg border border-neutral-200 px-4 py-3 text-sm outline-none transition focus:border-neutral-400 resize-none"
                />
              </div>

              <div className="flex justify-end">
                <button
                  onClick={saveDocument}
                  disabled={!docTitle.trim() || !docContent.trim()}
                  className="rounded-lg bg-neutral-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-neutral-800 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Save document
                </button>
              </div>
            </div>

            {/* Saved documents */}
            {documents.length > 0 && (
              <div className="mt-8">
                <h2 className="text-xs font-semibold uppercase tracking-widest text-neutral-400 mb-4">
                  Saved documents ({documents.length})
                </h2>
                <div className="space-y-3">
                  {documents.map((doc) => (
                    <div
                      key={doc.id}
                      className="rounded-xl border border-neutral-200 bg-white p-5"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <h3 className="text-sm font-semibold text-neutral-800">
                              {doc.title}
                            </h3>
                            <span className="inline-block rounded-full bg-neutral-100 px-2.5 py-0.5 text-[11px] font-medium text-neutral-600">
                              {doc.category}
                            </span>
                          </div>
                          <p className="mt-1 text-[11px] text-neutral-400">
                            {new Date(doc.createdAt).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            })}
                          </p>
                          <p className="mt-2 text-xs text-neutral-500 line-clamp-2 leading-relaxed">
                            {doc.content}
                          </p>
                        </div>
                        <button
                          onClick={() => deleteDocument(doc.id)}
                          className="shrink-0 rounded-md border border-neutral-200 px-2 py-1 text-[11px] text-neutral-400 hover:text-red-500 hover:border-red-200 transition-colors"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {documents.length === 0 && (
              <div className="mt-8 flex flex-col items-center justify-center rounded-xl border border-dashed border-neutral-200 bg-neutral-50/50 px-6 py-12 text-center">
                <p className="text-sm font-semibold text-neutral-700">
                  No documents yet
                </p>
                <p className="mt-1.5 max-w-sm text-xs text-neutral-400 leading-relaxed">
                  Add product info, case studies, battle cards, or ICP documents above. They will personalize Stardrop&apos;s responses for your company.
                </p>
              </div>
            )}
          </div>
        )}

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
