"use client";

import { useState, useEffect } from "react";

const PREFIX = "stardrop_settings_";

function load(key: string, fallback: string): string {
  if (typeof window === "undefined") return fallback;
  return localStorage.getItem(PREFIX + key) || fallback;
}

function save(key: string, value: string) {
  localStorage.setItem(PREFIX + key, value);
  console.log(`[Stardrop:Settings] Saved: ${key} = "${value}"`);
}

export default function SettingsPage() {
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [audience, setAudience] = useState("");
  const [tone, setTone] = useState("Direct");
  const [length, setLength] = useState("Standard");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setProductName(load("product_name", ""));
    setDescription(load("description", ""));
    setAudience(load("audience", ""));
    setTone(load("tone", "Direct"));
    setLength(load("length", "Standard"));
  }, []);

  function handleSave() {
    save("product_name", productName);
    save("description", description);
    save("audience", audience);
    save("tone", tone);
    save("length", length);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <div className="px-4 py-6 md:px-8 max-w-2xl mx-auto">
      <h1 className="text-xl font-semibold text-neutral-900 mb-6">Settings</h1>

      {/* Your Product */}
      <section className="mb-8">
        <h2 className="text-sm font-semibold text-neutral-900 mb-4">Your Product</h2>
        <div className="space-y-3">
          <div>
            <label className="block text-xs font-medium text-neutral-500 mb-1">Product name</label>
            <input
              type="text"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              onBlur={() => save("product_name", productName)}
              placeholder="e.g. Stardrop"
              className="w-full rounded-lg border border-neutral-200 bg-white px-3 py-2 text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-neutral-400 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-neutral-500 mb-1">One-line description</label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              onBlur={() => save("description", description)}
              placeholder="e.g. AI-powered GTM agent for Twitter"
              className="w-full rounded-lg border border-neutral-200 bg-white px-3 py-2 text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-neutral-400 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-neutral-500 mb-1">Target audience</label>
            <input
              type="text"
              value={audience}
              onChange={(e) => setAudience(e.target.value)}
              onBlur={() => save("audience", audience)}
              placeholder="e.g. B2B SaaS founders"
              className="w-full rounded-lg border border-neutral-200 bg-white px-3 py-2 text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-neutral-400 focus:outline-none"
            />
          </div>
        </div>
      </section>

      {/* Response Style */}
      <section className="mb-8">
        <h2 className="text-sm font-semibold text-neutral-900 mb-4">Response Style</h2>

        {/* Tone */}
        <div className="mb-4">
          <label className="block text-xs font-medium text-neutral-500 mb-2">Tone</label>
          <div className="flex gap-2">
            {["Direct", "Friendly", "Technical"].map((t) => (
              <button
                key={t}
                onClick={() => {
                  setTone(t);
                  save("tone", t);
                }}
                className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
                  tone === t
                    ? "bg-neutral-900 text-white"
                    : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Length */}
        <div>
          <label className="block text-xs font-medium text-neutral-500 mb-2">Length</label>
          <div className="flex gap-2">
            {[
              { label: "Short", desc: "1 tweet" },
              { label: "Standard", desc: "2-3" },
              { label: "Detailed", desc: "thread" },
            ].map((l) => (
              <button
                key={l.label}
                onClick={() => {
                  setLength(l.label);
                  save("length", l.label);
                }}
                className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
                  length === l.label
                    ? "bg-neutral-900 text-white"
                    : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
                }`}
              >
                {l.label}
                <span className={`ml-1 text-xs ${length === l.label ? "text-neutral-400" : "text-neutral-400"}`}>
                  ({l.desc})
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Save button */}
      <button
        onClick={handleSave}
        className="w-full rounded-lg bg-neutral-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-neutral-800 mb-8"
      >
        {saved ? "Saved!" : "Save all"}
      </button>

      {/* Agent Info (read-only) */}
      <section>
        <h2 className="text-sm font-semibold text-neutral-900 mb-4">Agent Info</h2>
        <div className="rounded-lg border border-neutral-200 bg-neutral-50/50 divide-y divide-neutral-100">
          <div className="flex items-center justify-between px-4 py-3">
            <span className="text-xs text-neutral-500">Agent</span>
            <span className="text-sm font-medium text-neutral-900">@stardroplin</span>
          </div>
          <div className="flex items-center justify-between px-4 py-3">
            <span className="text-xs text-neutral-500">Status</span>
            <span className="flex items-center gap-1.5 text-sm font-medium text-neutral-900">
              <span className="inline-block h-2 w-2 rounded-full bg-green-500" />
              Active
            </span>
          </div>
          <div className="flex items-center justify-between px-4 py-3">
            <span className="text-xs text-neutral-500">API</span>
            <a
              href="https://xitwxb23yn.us-east-1.awsapprunner.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-neutral-900 hover:underline"
            >
              xitwxb23yn.us-east-1.awsapprunner.com
            </a>
          </div>
          <div className="flex items-center justify-between px-4 py-3">
            <span className="text-xs text-neutral-500">GitHub</span>
            <a
              href="https://github.com/City-Intelligence-Inc/next-gen-gtm"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-neutral-900 hover:underline"
            >
              City-Intelligence-Inc/next-gen-gtm
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
