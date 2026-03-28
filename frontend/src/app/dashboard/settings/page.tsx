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
  const [name, setName] = useState("");
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [audience, setAudience] = useState("");
  const [twitter, setTwitter] = useState("");
  const [tone, setTone] = useState("Direct");
  const [length, setLength] = useState("Standard");
  const [saved, setSaved] = useState(false);

  // PIN state
  const [pin, setPin] = useState("");
  const [pinSaved, setPinSaved] = useState(false);
  const [hasPin, setHasPin] = useState(false);

  useEffect(() => {
    setName(load("name", ""));
    setProductName(load("product_name", ""));
    setDescription(load("description", ""));
    setAudience(load("audience", ""));
    setTwitter(load("twitter", ""));
    setTone(load("tone", "Direct"));
    setLength(load("length", "Standard"));

    // Also load the onboarding product field as fallback
    if (!load("product_name", "")) {
      const product = localStorage.getItem("stardrop_settings_product") || "";
      if (product) setProductName(product);
    }

    const existingPin = localStorage.getItem("stardrop_pin");
    if (existingPin) {
      setPin(existingPin);
      setHasPin(true);
    }
  }, []);

  function handleSave() {
    save("name", name);
    save("product_name", productName);
    save("product", productName); // keep in sync with onboarding key
    save("description", description);
    save("audience", audience);
    save("twitter", twitter);
    save("tone", tone);
    save("length", length);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  function handlePinChange(value: string) {
    const digits = value.replace(/\D/g, "").slice(0, 4);
    setPin(digits);
    setPinSaved(false);
  }

  function handlePinSave() {
    if (pin.length === 4) {
      localStorage.setItem("stardrop_pin", pin);
      console.log("[Stardrop:Settings] PIN set");
      setHasPin(true);
      setPinSaved(true);
      setTimeout(() => setPinSaved(false), 2000);
    }
  }

  function handlePinRemove() {
    localStorage.removeItem("stardrop_pin");
    setPin("");
    setHasPin(false);
    setPinSaved(false);
    console.log("[Stardrop:Settings] PIN removed");
  }

  return (
    <div className="min-h-full bg-[#FAFAF9]">
      {/* Header bar */}
      <div className="bg-[#0A0A0A] text-white px-4 py-2.5 md:px-6">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/70">
            Settings
          </span>
          <button
            onClick={handleSave}
            className="bg-white/10 hover:bg-white/20 text-white text-[10px] font-semibold uppercase tracking-widest px-3 py-1 rounded transition"
          >
            {saved ? "Saved!" : "Save All"}
          </button>
        </div>
      </div>

      {/* Content: form + agent info sidebar */}
      <div className="flex flex-col lg:flex-row min-h-[calc(100vh-100px)]">
        {/* Left: Settings form */}
        <div className="flex-1 p-4 md:p-5">
          {/* Profile & Product — 2-column grid */}
          <div className="mb-4">
            <h2 className="text-[10px] font-semibold uppercase tracking-widest text-neutral-400 mb-3">
              Profile &amp; Product
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 bg-white border border-neutral-200 p-3 rounded">
              <div>
                <label className="block text-[9px] font-semibold uppercase tracking-widest text-neutral-400 mb-1">Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  className="w-full border border-neutral-200 px-3 py-2 text-[13px] text-neutral-900 placeholder:text-neutral-400 focus:border-[#0A0A0A] focus:outline-none rounded"
                />
              </div>
              <div>
                <label className="block text-[9px] font-semibold uppercase tracking-widest text-neutral-400 mb-1">Twitter Handle</label>
                <input
                  type="text"
                  value={twitter}
                  onChange={(e) => setTwitter(e.target.value)}
                  placeholder="@yourhandle"
                  className="w-full border border-neutral-200 px-3 py-2 text-[13px] text-neutral-900 placeholder:text-neutral-400 focus:border-[#0A0A0A] focus:outline-none rounded"
                />
              </div>
              <div>
                <label className="block text-[9px] font-semibold uppercase tracking-widest text-neutral-400 mb-1">Product Name</label>
                <input
                  type="text"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  placeholder="e.g. Stardrop"
                  className="w-full border border-neutral-200 px-3 py-2 text-[13px] text-neutral-900 placeholder:text-neutral-400 focus:border-[#0A0A0A] focus:outline-none rounded"
                />
              </div>
              <div>
                <label className="block text-[9px] font-semibold uppercase tracking-widest text-neutral-400 mb-1">Target Audience</label>
                <input
                  type="text"
                  value={audience}
                  onChange={(e) => setAudience(e.target.value)}
                  placeholder="e.g. B2B SaaS founders"
                  className="w-full border border-neutral-200 px-3 py-2 text-[13px] text-neutral-900 placeholder:text-neutral-400 focus:border-[#0A0A0A] focus:outline-none rounded"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-[9px] font-semibold uppercase tracking-widest text-neutral-400 mb-1">Description</label>
                <input
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="One-line description of your product"
                  className="w-full border border-neutral-200 px-3 py-2 text-[13px] text-neutral-900 placeholder:text-neutral-400 focus:border-[#0A0A0A] focus:outline-none rounded"
                />
              </div>
            </div>
          </div>

          <div className="h-px bg-neutral-200 mb-4" />

          {/* Response Style — tone + length */}
          <div className="mb-4">
            <h2 className="text-[10px] font-semibold uppercase tracking-widest text-neutral-400 mb-3">
              Response Style
            </h2>
            <div className="bg-white border border-neutral-200 p-3 rounded">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {/* Tone */}
                <div>
                  <label className="block text-[9px] font-semibold uppercase tracking-widest text-neutral-400 mb-1.5">Tone</label>
                  <div className="flex gap-1.5">
                    {["Direct", "Friendly", "Technical"].map((t) => (
                      <button
                        key={t}
                        onClick={() => setTone(t)}
                        className={`px-3 py-1.5 text-[11px] font-medium transition rounded ${
                          tone === t
                            ? "bg-[#0A0A0A] text-white"
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
                  <label className="block text-[9px] font-semibold uppercase tracking-widest text-neutral-400 mb-1.5">Length</label>
                  <div className="flex gap-1.5">
                    {[
                      { label: "Short", desc: "1 tweet" },
                      { label: "Standard", desc: "2-3" },
                      { label: "Detailed", desc: "thread" },
                    ].map((l) => (
                      <button
                        key={l.label}
                        onClick={() => setLength(l.label)}
                        className={`px-3 py-1.5 text-[11px] font-medium transition rounded ${
                          length === l.label
                            ? "bg-[#0A0A0A] text-white"
                            : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
                        }`}
                      >
                        {l.label}
                        <span className={`ml-1 text-[9px] ${length === l.label ? "text-white/60" : "text-neutral-400"}`}>
                          ({l.desc})
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="h-px bg-neutral-200 mb-4" />

          {/* Security / PIN */}
          <div>
            <h2 className="text-[10px] font-semibold uppercase tracking-widest text-neutral-400 mb-3">
              Security
            </h2>
            <div className="bg-white border border-neutral-200 p-3 rounded">
              <p className="text-[10px] text-neutral-400 mb-2">
                Set a 4-digit PIN to lock your dashboard. Not encryption — prevents casual access.
              </p>
              <div className="flex items-center gap-2">
                <input
                  type="password"
                  inputMode="numeric"
                  maxLength={4}
                  value={pin}
                  onChange={(e) => handlePinChange(e.target.value)}
                  placeholder="----"
                  className="w-24 border border-neutral-200 bg-white px-2.5 py-1.5 text-center text-sm font-mono tracking-[0.3em] text-neutral-900 placeholder:text-neutral-400 focus:border-[#0A0A0A] focus:outline-none rounded"
                />
                <button
                  onClick={handlePinSave}
                  disabled={pin.length !== 4}
                  className={`px-3 py-1.5 text-[11px] font-medium transition rounded ${
                    pin.length === 4
                      ? "bg-[#0A0A0A] text-white hover:bg-neutral-800"
                      : "bg-neutral-200 text-neutral-400 cursor-not-allowed"
                  }`}
                >
                  {pinSaved ? "Saved!" : "Set PIN"}
                </button>
                {hasPin && (
                  <button
                    onClick={handlePinRemove}
                    className="px-3 py-1.5 text-[11px] font-medium text-red-500 hover:bg-red-50 transition rounded"
                  >
                    Remove
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Right: Agent Info sidebar-style panel */}
        <div className="lg:w-[280px] bg-white border-t lg:border-t-0 border-l border-neutral-200 p-4 md:p-5">
          <h2 className="text-[10px] font-semibold uppercase tracking-widest text-neutral-400 mb-3">
            Agent Info
          </h2>
          <div className="space-y-0 border border-neutral-200 rounded overflow-hidden divide-y divide-neutral-100">
            <div className="flex items-center justify-between px-3 py-2">
              <span className="text-[10px] text-neutral-500">Agent</span>
              <span className="text-[11px] font-medium text-neutral-900">@stardroplin</span>
            </div>
            <div className="flex items-center justify-between px-3 py-2">
              <span className="text-[10px] text-neutral-500">Status</span>
              <span className="flex items-center gap-1.5 text-[11px] font-medium text-neutral-900">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-green-500" />
                Active
              </span>
            </div>
            <div className="flex items-center justify-between px-3 py-2">
              <span className="text-[10px] text-neutral-500">API</span>
              <a
                href="https://xitwxb23yn.us-east-1.awsapprunner.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[10px] font-medium text-neutral-700 hover:underline truncate max-w-[140px]"
              >
                awsapprunner.com
              </a>
            </div>
            <div className="flex items-center justify-between px-3 py-2">
              <span className="text-[10px] text-neutral-500">GitHub</span>
              <a
                href="https://github.com/City-Intelligence-Inc/next-gen-gtm"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[10px] font-medium text-neutral-700 hover:underline truncate max-w-[140px]"
              >
                next-gen-gtm
              </a>
            </div>
          </div>

          {/* Current config summary */}
          <div className="mt-4">
            <h2 className="text-[10px] font-semibold uppercase tracking-widest text-neutral-400 mb-2">
              Current Config
            </h2>
            <div className="space-y-1.5 text-[10px]">
              {name && (
                <div className="flex justify-between">
                  <span className="text-neutral-400">Name</span>
                  <span className="text-neutral-700 font-medium">{name}</span>
                </div>
              )}
              {twitter && (
                <div className="flex justify-between">
                  <span className="text-neutral-400">Twitter</span>
                  <span className="text-neutral-700 font-medium">{twitter}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-neutral-400">Tone</span>
                <span className="text-neutral-700 font-medium">{tone}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-400">Length</span>
                <span className="text-neutral-700 font-medium">{length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-400">PIN</span>
                <span className="text-neutral-700 font-medium">{hasPin ? "Set" : "None"}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
