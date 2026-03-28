"use client";

import { useState } from "react";
import dynamic from "next/dynamic";

const VaultGraph = dynamic(() => import("./VaultGraph"), { ssr: false });

const CATEGORIES: { key: string; label: string; color: string; notes: string[] }[] = [
  {
    key: "concepts",
    label: "Concepts",
    color: "#3b82f6",
    notes: [
      "GTM Overview",
      "Current GTM Landscape",
      "GTM Pain Points",
      "Next-Gen GTM Thesis",
      "The Self-Improving GTM Engine",
      "Antifragile GTM",
      "Flywheel Effect",
      "Product-Market Fit",
      "Composable GTM Stack",
      "Death of Traditional CRM Deep Dive",
    ],
  },
  {
    key: "motions",
    label: "Motions",
    color: "#22c55e",
    notes: [
      "Sales-Led Growth",
      "Product-Led Growth",
      "Community-Led Growth",
      "Product-Led Sales",
      "Agent-Led Growth",
      "Agent-Led Growth Deep Dive",
    ],
  },
  {
    key: "frameworks",
    label: "Frameworks",
    color: "#a855f7",
    notes: [
      "MEDDIC-MEDDPICC",
      "Bow-Tie Funnel",
      "GTM Fit",
      "GTM Metrics That Matter",
      "JTBD for GTM",
      "OODA Loop for GTM",
      "Double-Loop Learning",
      "MEDDIC Deal - Stardrop to Coframe",
    ],
  },
  {
    key: "tools",
    label: "Tools",
    color: "#f97316",
    notes: [
      "Clay",
      "Apollo",
      "Attio",
      "Common Room",
      "Unify",
      "Pocus",
      "Instantly",
      "Hightouch",
      "Rilo",
      "AI SDR Agents",
      "AI SDR Agents Deep Dive",
      "Apollo Vibe GTM Deep Dive",
      "Traditional GTM Tech Stack",
      "Coframe",
    ],
  },
  {
    key: "case-studies",
    label: "Case Studies",
    color: "#ef4444",
    notes: [
      "Case Study - Ramp",
      "Case Study - Figma",
      "Case Study - Datadog",
      "Case Study - Notion",
      "Case Study - Clay",
      "Case Study - Coframe",
    ],
  },
  {
    key: "architecture",
    label: "Architecture",
    color: "#06b6d4",
    notes: [
      "Architecture - Core Layers",
      "GTM Operating System",
      "Composable GTM Stack Deep Dive",
    ],
  },
  {
    key: "data-infrastructure",
    label: "Data Infrastructure",
    color: "#14b8a6",
    notes: [
      "Warehouse-Native GTM",
      "Warehouse-Native GTM Deep Dive",
      "Reverse ETL",
      "Identity Resolution",
      "Modern Data Stack for GTM",
      "Data Enrichment Waterfall",
      "Event-Driven GTM Architecture",
      "Composable CDP",
    ],
  },
  {
    key: "signals",
    label: "Signals",
    color: "#eab308",
    notes: ["Signal-Based Selling", "Signal-Based Selling Deep Dive", "AI Agents in GTM"],
  },
  {
    key: "roles",
    label: "Roles",
    color: "#ec4899",
    notes: ["GTM Engineer", "GTM Engineering Deep Dive", "Bo Mohazzabi"],
  },
  {
    key: "resources",
    label: "Resources",
    color: "#6b7280",
    notes: ["Sources and Reading List"],
  },
];

const TOTAL_NOTES = CATEGORIES.reduce((sum, c) => sum + c.notes.length, 0);

type Tab = "graph" | "notes";

export default function KnowledgePage() {
  const [tab, setTab] = useState<Tab>("graph");
  const [expandedCats, setExpandedCats] = useState<Set<string>>(new Set());

  const toggleCat = (key: string) => {
    setExpandedCats((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  return (
    <div className="flex h-full flex-col">
      {/* Header */}
      <div className="shrink-0 px-6 pt-8 md:px-10">
        <p className="text-xs font-medium uppercase tracking-[0.15em] text-neutral-400">
          Dashboard
        </p>
        <h1 className="mt-1 font-serif text-3xl italic tracking-tight text-neutral-900">
          Knowledge
        </h1>
        <p className="mt-2 max-w-lg text-sm leading-relaxed text-neutral-500">
          The Obsidian vault powering Stardrop&apos;s RAG pipeline. {TOTAL_NOTES} curated
          notes across {CATEGORIES.length} categories, chunked and embedded for retrieval.
        </p>

        {/* Stats */}
        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[
            { value: TOTAL_NOTES.toString(), label: "Notes", sub: "Curated markdown" },
            { value: "441", label: "Chunks", sub: "800 char, 100 overlap" },
            { value: "116", label: "Wikilinks", sub: "Cross-references" },
            { value: "384d", label: "Embeddings", sub: "all-MiniLM-L6-v2" },
          ].map((s) => (
            <div key={s.label} className="rounded-xl border border-neutral-200 bg-white px-4 py-3">
              <p className="font-serif text-2xl italic text-neutral-900">{s.value}</p>
              <p className="mt-0.5 text-xs font-medium text-neutral-700">{s.label}</p>
              <p className="text-[10px] text-neutral-400">{s.sub}</p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="mt-6 flex gap-1 border-b border-neutral-200">
          {(["graph", "notes"] as Tab[]).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`relative px-4 py-2.5 text-[13px] font-medium capitalize transition-colors ${
                tab === t ? "text-neutral-900" : "text-neutral-400 hover:text-neutral-600"
              }`}
            >
              {t}
              {tab === t && (
                <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-neutral-900 rounded-full" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-hidden">
        {tab === "graph" && (
          <div className="h-full w-full">
            <VaultGraph />
          </div>
        )}

        {tab === "notes" && (
          <div className="h-full overflow-y-auto px-6 py-6 md:px-10">
            {/* Category overview */}
            <div className="mb-6 flex flex-wrap gap-2">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.key}
                  onClick={() => toggleCat(cat.key)}
                  className={`flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-medium transition-all ${
                    expandedCats.has(cat.key)
                      ? "border-neutral-900 bg-neutral-900 text-white"
                      : "border-neutral-200 bg-white text-neutral-600 hover:border-neutral-300"
                  }`}
                >
                  <span
                    className="inline-block h-2 w-2 rounded-full"
                    style={{ backgroundColor: expandedCats.has(cat.key) ? "#fff" : cat.color }}
                  />
                  {cat.label}
                  <span className={expandedCats.has(cat.key) ? "text-neutral-400" : "text-neutral-300"}>
                    {cat.notes.length}
                  </span>
                </button>
              ))}
            </div>

            {/* Note grid or collapsed state */}
            {expandedCats.size === 0 ? (
              <div className="max-w-3xl">
                <div className="grid gap-3 sm:grid-cols-2">
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat.key}
                      onClick={() => toggleCat(cat.key)}
                      className="group flex items-start gap-3 rounded-xl border border-neutral-200 bg-white p-4 text-left transition hover:border-neutral-300 hover:shadow-sm"
                    >
                      <span
                        className="mt-1 inline-block h-3 w-3 shrink-0 rounded-full"
                        style={{ backgroundColor: cat.color }}
                      />
                      <div>
                        <p className="text-sm font-semibold text-neutral-900">{cat.label}</p>
                        <p className="mt-0.5 text-xs text-neutral-400">
                          {cat.notes.length} note{cat.notes.length !== 1 ? "s" : ""}
                        </p>
                        <p className="mt-1.5 text-xs leading-relaxed text-neutral-500">
                          {cat.notes.slice(0, 3).join(", ")}
                          {cat.notes.length > 3 && ` +${cat.notes.length - 3} more`}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="max-w-3xl space-y-6">
                {CATEGORIES.filter((c) => expandedCats.has(c.key)).map((cat) => (
                  <div key={cat.key}>
                    <div className="mb-3 flex items-center gap-2">
                      <span
                        className="inline-block h-2.5 w-2.5 rounded-full"
                        style={{ backgroundColor: cat.color }}
                      />
                      <h3 className="text-sm font-semibold text-neutral-900">{cat.label}</h3>
                      <span className="text-xs text-neutral-400">{cat.notes.length}</span>
                    </div>
                    <div className="grid gap-1.5 sm:grid-cols-2">
                      {cat.notes.map((note) => (
                        <div
                          key={note}
                          className="flex items-center gap-2.5 rounded-lg border border-neutral-100 bg-white px-3.5 py-2.5 text-[13px] text-neutral-700 transition hover:border-neutral-200 hover:bg-neutral-50"
                        >
                          <svg className="h-3.5 w-3.5 shrink-0 text-neutral-300" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <rect x="2" y="1" width="12" height="14" rx="2" />
                            <line x1="5" y1="5" x2="11" y2="5" />
                            <line x1="5" y1="8" x2="11" y2="8" />
                            <line x1="5" y1="11" x2="9" y2="11" />
                          </svg>
                          {note}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
