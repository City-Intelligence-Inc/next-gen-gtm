"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function OnboardPage() {
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!username.trim()) return;
    setLoading(true);
    setError("");

    const clean = username.trim().replace("@", "");
    try {
      const r = await fetch("/api/proxy/user/onboard", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: clean }),
      });
      const data = await r.json();
      if (data.error) {
        setError(data.error);
      } else {
        localStorage.setItem("stardrop_username", clean);
        router.push(`/dashboard?user=${clean}`);
      }
    } catch {
      setError("Could not connect. Try again.");
    }
    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-neutral-950 flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <h1 className="font-serif text-4xl italic text-white">Stardrop</h1>
          <p className="mt-3 text-sm text-neutral-400">
            Your personal GTM intelligence agent. Enter your X handle to get started.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500 text-sm">@</span>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="yourhandle"
              autoFocus
              className="w-full rounded-xl bg-neutral-900 border border-neutral-800 pl-9 pr-4 py-4 text-white text-sm outline-none transition focus:border-neutral-600 placeholder:text-neutral-600"
            />
          </div>

          {error && (
            <p className="text-sm text-red-400">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading || !username.trim()}
            className="w-full rounded-xl bg-white py-4 text-sm font-semibold text-neutral-900 transition hover:bg-neutral-200 disabled:opacity-50"
          >
            {loading ? "Setting up..." : "Start improving"}
          </button>
        </form>

        <div className="mt-10 border-t border-neutral-800 pt-6">
          <p className="text-xs text-neutral-500 leading-relaxed text-center">
            Tag <span className="text-neutral-300 font-medium">@stardroplin</span> on X with any GTM question.
            Your responses are personalized and improve as you rate them.
          </p>
        </div>
      </div>
    </div>
  );
}
