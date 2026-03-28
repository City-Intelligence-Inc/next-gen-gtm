"use client";

import { useState } from "react";
import dynamic from "next/dynamic";

const VaultGraph = dynamic(() => import("./VaultGraph"), { ssr: false });

// ---------------------------------------------------------------------------
// Vault data (matches the real vault structure)
// ---------------------------------------------------------------------------

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

const TOTAL_NOTES = 65;
const TOTAL_CHUNKS = 441;
const EMBEDDING_MODEL = "all-MiniLM-L6-v2";
const TOTAL_EDGES = 103;

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

type Tab = "graph" | "notes";

export default function KnowledgePage() {
  console.log("[Stardrop:Knowledge] 1. Mounting knowledge page...");
  console.log(`[Stardrop:Knowledge] 2. Vault stats: ${TOTAL_NOTES} notes, ${TOTAL_CHUNKS} chunks, ${TOTAL_EDGES} edges, model=${EMBEDDING_MODEL}`);
  console.log(`[Stardrop:Knowledge] 3. Categories loaded: ${CATEGORIES.length} (${CATEGORIES.map((c) => c.label).join(", ")})`);

  const [tab, setTab] = useState<Tab>("graph");
  const [expandedCats, setExpandedCats] = useState<Set<string>>(
    new Set(CATEGORIES.map((c) => c.key))
  );

  const toggleCat = (key: string) => {
    console.log(`[Stardrop:Knowledge] Toggling category: ${key}`);
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
      <div className="shrink-0 border-b border-neutral-200 px-6 pb-0 pt-8 md:px-10">
        <p className="text-xs font-medium uppercase tracking-[0.15em] text-neutral-400">
          Dashboard
        </p>
        <h1 className="mt-1 font-serif text-3xl italic tracking-tight text-neutral-900">
          Knowledge
        </h1>
        <p className="mt-2 text-sm text-neutral-500">
          The Obsidian vault powering Stardrop&apos;s RAG pipeline.
        </p>

        {/* Stats bar */}
        <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-xs text-neutral-500">
          <div className="flex items-center gap-1.5">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse-dot" />
            <span className="font-medium text-neutral-700">{TOTAL_NOTES}</span> notes indexed
          </div>
          <div>
            <span className="font-medium text-neutral-700">{TOTAL_CHUNKS}</span> chunks embedded
          </div>
          <div>
            <span className="font-medium text-neutral-700">{TOTAL_EDGES}</span> wikilink edges
          </div>
          <div>
            model: <span className="font-mono text-neutral-600">{EMBEDDING_MODEL}</span>
          </div>
        </div>

        {/* Tabs */}
        <div className="mt-4 flex gap-0">
          <button
            onClick={() => { console.log(`[Stardrop:Knowledge] Switched to tab: graph`); setTab("graph"); }}
            className={`relative px-4 py-2.5 text-[13px] font-medium transition-colors ${
              tab === "graph"
                ? "text-neutral-900"
                : "text-neutral-400 hover:text-neutral-600"
            }`}
          >
            Graph
            {tab === "graph" && (
              <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-neutral-900 rounded-full" />
            )}
          </button>
          <button
            onClick={() => { console.log(`[Stardrop:Knowledge] Switched to tab: notes`); setTab("notes"); }}
            className={`relative px-4 py-2.5 text-[13px] font-medium transition-colors ${
              tab === "notes"
                ? "text-neutral-900"
                : "text-neutral-400 hover:text-neutral-600"
            }`}
          >
            Notes
            {tab === "notes" && (
              <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-neutral-900 rounded-full" />
            )}
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-hidden">
        {tab === "graph" && (
          <div className="h-full w-full">
            {(() => { console.log(`[Stardrop:Knowledge] 4. Rendering graph view: ${TOTAL_NOTES} nodes, ${TOTAL_EDGES} edges`); return null; })()}
            <VaultGraph />
          </div>
        )}

        {tab === "notes" && (
          <div className="h-full overflow-y-auto px-6 py-6 md:px-10">
            <div className="max-w-3xl space-y-2">
              {CATEGORIES.map((cat) => {
                const isExpanded = expandedCats.has(cat.key);
                return (
                  <div
                    key={cat.key}
                    className="rounded-lg border border-neutral-200 bg-white"
                  >
                    <button
                      onClick={() => toggleCat(cat.key)}
                      className="flex w-full items-center gap-3 px-4 py-3 text-left"
                    >
                      {/* Chevron */}
                      <svg
                        className={`h-3.5 w-3.5 shrink-0 text-neutral-400 transition-transform ${
                          isExpanded ? "rotate-90" : ""
                        }`}
                        viewBox="0 0 16 16"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="6 4 10 8 6 12" />
                      </svg>

                      {/* Category dot */}
                      <span
                        className="inline-block h-2.5 w-2.5 rounded-full shrink-0"
                        style={{ backgroundColor: cat.color }}
                      />

                      <span className="text-[13px] font-medium text-neutral-800">
                        {cat.label}
                      </span>
                      <span className="ml-auto text-[11px] text-neutral-400">
                        {cat.notes.length} note{cat.notes.length !== 1 ? "s" : ""}
                      </span>
                    </button>

                    {isExpanded && (
                      <div className="border-t border-neutral-100 px-4 pb-3 pt-2">
                        <div className="grid grid-cols-1 gap-0.5 sm:grid-cols-2">
                          {cat.notes.map((note) => (
                            <div
                              key={note}
                              className="flex items-center gap-2 rounded-md px-2 py-1.5 text-[13px] text-neutral-600 hover:bg-neutral-50 transition-colors"
                            >
                              <span className="text-neutral-300">#</span>
                              {note}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
