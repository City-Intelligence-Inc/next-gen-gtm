"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

const navItems = [
  { label: "Overview", href: "/dashboard", icon: OverviewIcon },
  { label: "X-Ray", href: "/dashboard/insights", icon: InsightsIcon },
  { label: "Test", href: "/dashboard/test", icon: TestIcon },
  { label: "Documents", href: "/dashboard/documents", icon: DocumentsIcon },
  { label: "Settings", href: "/dashboard/settings", icon: SettingsIcon },
];

function OverviewIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="1.5" y="1.5" width="5" height="5" rx="1" />
      <rect x="9.5" y="1.5" width="5" height="5" rx="1" />
      <rect x="1.5" y="9.5" width="5" height="5" rx="1" />
      <rect x="9.5" y="9.5" width="5" height="5" rx="1" />
    </svg>
  );
}

function InsightsIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 13V8M7 13V5M11 13V2" />
    </svg>
  );
}

function TestIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M13 8l-8 5V3l8 5z" />
    </svg>
  );
}

function DocumentsIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="1" width="12" height="14" rx="2" />
      <line x1="5" y1="5" x2="11" y2="5" />
      <line x1="5" y1="8" x2="11" y2="8" />
      <line x1="5" y1="11" x2="9" y2="11" />
    </svg>
  );
}

function SettingsIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="8" cy="8" r="2" />
      <path d="M13.7 9.4a1.2 1.2 0 0 0 .2 1.3l.1.1a1.4 1.4 0 1 1-2 2l-.1-.1a1.2 1.2 0 0 0-1.3-.2 1.2 1.2 0 0 0-.7 1.1v.2a1.4 1.4 0 1 1-2.8 0v-.1a1.2 1.2 0 0 0-.8-1.1 1.2 1.2 0 0 0-1.3.2l-.1.1a1.4 1.4 0 1 1-2-2l.1-.1a1.2 1.2 0 0 0 .2-1.3 1.2 1.2 0 0 0-1.1-.7h-.2a1.4 1.4 0 1 1 0-2.8h.1a1.2 1.2 0 0 0 1.1-.8 1.2 1.2 0 0 0-.2-1.3l-.1-.1a1.4 1.4 0 1 1 2-2l.1.1a1.2 1.2 0 0 0 1.3.2h.1a1.2 1.2 0 0 0 .7-1.1v-.2a1.4 1.4 0 1 1 2.8 0v.1a1.2 1.2 0 0 0 .7 1.1 1.2 1.2 0 0 0 1.3-.2l.1-.1a1.4 1.4 0 1 1 2 2l-.1.1a1.2 1.2 0 0 0-.2 1.3v.1a1.2 1.2 0 0 0 1.1.7h.2a1.4 1.4 0 1 1 0 2.8h-.1a1.2 1.2 0 0 0-1.1.7z" />
    </svg>
  );
}

function MenuIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <line x1="2" y1="4" x2="14" y2="4" />
      <line x1="2" y1="8" x2="14" y2="8" />
      <line x1="2" y1="12" x2="14" y2="12" />
    </svg>
  );
}

function CloseIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <line x1="4" y1="4" x2="12" y2="12" />
      <line x1="12" y1="4" x2="4" y2="12" />
    </svg>
  );
}

function LockIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="7" width="10" height="7" rx="1.5" />
      <path d="M5 7V5a3 3 0 0 1 6 0v2" />
    </svg>
  );
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [onboarded, setOnboarded] = useState(true);
  const [onboardName, setOnboardName] = useState("");
  const [onboardProduct, setOnboardProduct] = useState("");
  const [onboardAudience, setOnboardAudience] = useState("");
  const [onboardTwitter, setOnboardTwitter] = useState("");
  const [mounted, setMounted] = useState(false);
  const [userName, setUserName] = useState("");

  // PIN lock state
  const [pinRequired, setPinRequired] = useState(false);
  const [pinUnlocked, setPinUnlocked] = useState(false);
  const [pinInput, setPinInput] = useState("");
  const [pinError, setPinError] = useState(false);
  const [pinShake, setPinShake] = useState(false);

  // Check onboarding + PIN status
  useEffect(() => {
    if (typeof window === "undefined") return;
    setMounted(true);
    const done = localStorage.getItem("stardrop_onboarded");
    const twitterHandle = localStorage.getItem("stardrop_settings_twitter");

    // Force re-show onboarding if twitter handle is empty/missing even if onboarded
    if (!done || !twitterHandle || !twitterHandle.trim()) {
      console.log("[Stardrop:Layout] Onboarding required (missing twitter handle or not onboarded)");
      setOnboarded(false);
      // Pre-fill existing values if re-showing onboarding
      if (done) {
        setOnboardName(localStorage.getItem("stardrop_settings_name") || "");
        setOnboardProduct(localStorage.getItem("stardrop_settings_product") || "");
        setOnboardAudience(localStorage.getItem("stardrop_settings_audience") || "");
        setOnboardTwitter(twitterHandle || "");
      }
    }

    const name = localStorage.getItem("stardrop_settings_name") || "";
    setUserName(name);

    const savedPin = localStorage.getItem("stardrop_pin");
    if (savedPin) {
      console.log("[Stardrop:Layout] PIN required, showing lock screen");
      setPinRequired(true);
    }
  }, []);

  const handlePinSubmit = () => {
    const savedPin = localStorage.getItem("stardrop_pin");
    if (pinInput === savedPin) {
      setPinUnlocked(true);
      setPinError(false);
    } else {
      setPinError(true);
      setPinShake(true);
      setTimeout(() => setPinShake(false), 500);
      setPinInput("");
    }
  };

  // Show onboarding gate — Name, Product, Twitter all required; Audience optional
  if (mounted && !onboarded) {
    const canSubmit = onboardName.trim() && onboardProduct.trim() && onboardTwitter.trim();
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#FAFAF9] px-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-6">
            <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-lg bg-[#0A0A0A]">
              <span className="text-base font-bold text-white font-serif italic">S</span>
            </div>
            <h1 className="mt-3 text-lg font-semibold text-[#0A0A0A] tracking-tight">Welcome to Stardrop</h1>
            <p className="mt-1 text-xs text-neutral-500 leading-relaxed">Tell us about your product so Stardrop can give you personalized GTM intelligence.</p>
          </div>
          <div className="space-y-3 border border-neutral-200 bg-white p-5 rounded-lg">
            <div>
              <label className="block text-[10px] font-semibold uppercase tracking-widest text-neutral-400 mb-1">Name *</label>
              <input
                value={onboardName}
                onChange={(e) => setOnboardName(e.target.value)}
                placeholder="e.g. Ari"
                className="w-full border border-neutral-200 px-3 py-2 text-sm outline-none focus:border-[#0A0A0A] focus:ring-1 focus:ring-[#0A0A0A] rounded"
              />
            </div>
            <div>
              <label className="block text-[10px] font-semibold uppercase tracking-widest text-neutral-400 mb-1">Product *</label>
              <input
                value={onboardProduct}
                onChange={(e) => setOnboardProduct(e.target.value)}
                placeholder="e.g. AI code review tool for engineering teams"
                className="w-full border border-neutral-200 px-3 py-2 text-sm outline-none focus:border-[#0A0A0A] focus:ring-1 focus:ring-[#0A0A0A] rounded"
              />
            </div>
            <div>
              <label className="block text-[10px] font-semibold uppercase tracking-widest text-neutral-400 mb-1">Audience <span className="text-neutral-300 normal-case tracking-normal">(optional)</span></label>
              <input
                value={onboardAudience}
                onChange={(e) => setOnboardAudience(e.target.value)}
                placeholder="e.g. VP Engineering at B2B SaaS, 50-500 employees"
                className="w-full border border-neutral-200 px-3 py-2 text-sm outline-none focus:border-[#0A0A0A] focus:ring-1 focus:ring-[#0A0A0A] rounded"
              />
            </div>
            <div>
              <label className="block text-[10px] font-semibold uppercase tracking-widest text-neutral-400 mb-1">Twitter Handle *</label>
              <input
                value={onboardTwitter}
                onChange={(e) => setOnboardTwitter(e.target.value)}
                placeholder="@yourhandle"
                className="w-full border border-neutral-200 px-3 py-2 text-sm outline-none focus:border-[#0A0A0A] focus:ring-1 focus:ring-[#0A0A0A] rounded"
              />
            </div>
            <button
              onClick={() => {
                if (!canSubmit) return;
                localStorage.setItem("stardrop_onboarded", "true");
                localStorage.setItem("stardrop_settings_name", onboardName);
                localStorage.setItem("stardrop_settings_product", onboardProduct);
                localStorage.setItem("stardrop_settings_audience", onboardAudience);
                localStorage.setItem("stardrop_settings_twitter", onboardTwitter);
                console.log("[Stardrop:Onboarding] Completed:", { name: onboardName, product: onboardProduct, audience: onboardAudience, twitter: onboardTwitter });
                setUserName(onboardName);
                setOnboarded(true);
              }}
              disabled={!canSubmit}
              className={`w-full px-4 py-2.5 text-sm font-medium text-white transition rounded ${
                canSubmit ? "bg-[#0A0A0A] hover:bg-neutral-800" : "bg-neutral-300 cursor-not-allowed"
              }`}
            >
              Get started
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Show PIN lock screen
  if (mounted && pinRequired && !pinUnlocked) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#FAFAF9] px-4">
        <div className="w-full max-w-xs">
          <div className="text-center mb-6">
            <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-lg bg-[#0A0A0A]">
              <LockIcon className="h-5 w-5 text-white" />
            </div>
            <h1 className="mt-3 text-lg font-semibold text-[#0A0A0A] tracking-tight">Dashboard Locked</h1>
            <p className="mt-1 text-xs text-neutral-500">Enter your 4-digit PIN to continue.</p>
          </div>
          <div className={`space-y-3 border border-neutral-200 bg-white p-5 rounded-lg ${pinShake ? "animate-shake" : ""}`}>
            <div>
              <input
                type="password"
                inputMode="numeric"
                maxLength={4}
                value={pinInput}
                onChange={(e) => {
                  const val = e.target.value.replace(/\D/g, "").slice(0, 4);
                  setPinInput(val);
                  setPinError(false);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && pinInput.length === 4) handlePinSubmit();
                }}
                placeholder="----"
                className={`w-full border px-3 py-3 text-center text-2xl tracking-[0.5em] font-mono outline-none transition rounded ${
                  pinError
                    ? "border-red-400 focus:border-red-500 focus:ring-1 focus:ring-red-500"
                    : "border-neutral-200 focus:border-[#0A0A0A] focus:ring-1 focus:ring-[#0A0A0A]"
                }`}
                autoFocus
              />
              {pinError && (
                <p className="mt-1.5 text-center text-xs font-medium text-red-500">Wrong PIN</p>
              )}
            </div>
            <button
              onClick={handlePinSubmit}
              disabled={pinInput.length !== 4}
              className={`w-full px-4 py-2.5 text-sm font-medium text-white transition rounded ${
                pinInput.length === 4 ? "bg-[#0A0A0A] hover:bg-neutral-800" : "bg-neutral-300 cursor-not-allowed"
              }`}
            >
              Unlock
            </button>
          </div>
        </div>
      </div>
    );
  }

  const userInitial = userName ? userName.charAt(0).toUpperCase() : "A";

  return (
    <div className="flex h-screen overflow-hidden bg-[#FAFAF9]">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar — dark */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-[220px] flex-col bg-[#0A0A0A] transition-transform duration-200 md:static md:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Logo area */}
        <div className="flex items-center justify-between px-4 py-4 border-b border-white/10">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="flex h-7 w-7 items-center justify-center rounded-md bg-white/15">
              <span className="text-xs font-bold text-white font-serif italic">S</span>
            </div>
            <span className="text-[11px] font-semibold uppercase tracking-[0.15em] text-white">
              Stardrop
            </span>
          </Link>
          <button
            onClick={() => setSidebarOpen(false)}
            className="rounded p-1 text-white/40 hover:text-white md:hidden"
          >
            <CloseIcon className="h-4 w-4" />
          </button>
        </div>

        {/* Nav links */}
        <nav className="flex-1 overflow-y-auto px-2 py-3">
          <div className="space-y-0.5">
            {navItems.map((item) => {
              const isActive =
                item.href === "/dashboard"
                  ? pathname === "/dashboard"
                  : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-2.5 rounded px-3 py-2 text-[12px] font-medium transition-colors ${
                    isActive
                      ? "text-white border-l-2 border-white bg-white/5"
                      : "text-white/50 hover:text-white/80 hover:bg-white/5 border-l-2 border-transparent"
                  }`}
                >
                  <item.icon className={`h-3.5 w-3.5 shrink-0 ${isActive ? "text-white/70" : "text-white/30"}`} />
                  {item.label}
                </Link>
              );
            })}
          </div>
        </nav>

        {/* Bottom — user info */}
        <div className="border-t border-white/10 px-4 py-3">
          <div className="flex items-center gap-2.5">
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-white/10 text-[10px] font-semibold text-white/70">
              {userInitial}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[11px] font-medium text-white/80 truncate">
                {userName || "Admin"}
              </p>
              <p className="text-[10px] text-white/30 flex items-center gap-1">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-green-500" />
                Active
              </p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Mobile topbar */}
        <div className="flex items-center border-b border-neutral-200 bg-white px-3 py-2.5 md:hidden">
          <button
            onClick={() => setSidebarOpen(true)}
            className="rounded p-1.5 text-neutral-500 hover:bg-neutral-100 hover:text-neutral-900"
          >
            <MenuIcon className="h-5 w-5" />
          </button>
          <span className="ml-2 text-[11px] font-semibold uppercase tracking-[0.15em] text-[#0A0A0A]">
            Stardrop
          </span>
        </div>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
