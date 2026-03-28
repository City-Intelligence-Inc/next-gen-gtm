"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

const navItems = [
  { label: "Overview", href: "/dashboard", icon: OverviewIcon },
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
  const [onboarded, setOnboarded] = useState(true); // assume true until checked
  const [onboardName, setOnboardName] = useState("");
  const [onboardProduct, setOnboardProduct] = useState("");
  const [onboardAudience, setOnboardAudience] = useState("");
  const [onboardTwitter, setOnboardTwitter] = useState("");
  const [mounted, setMounted] = useState(false);

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
    if (!done) setOnboarded(false);

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

  // Show onboarding gate
  if (mounted && !onboarded) {
    const canSubmit = onboardName.trim() && onboardProduct.trim();
    return (
      <div className="flex min-h-screen items-center justify-center bg-neutral-50 px-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-neutral-900">
              <span className="text-lg font-bold text-white italic">S</span>
            </div>
            <h1 className="mt-4 text-2xl font-semibold text-neutral-900">Welcome to Stardrop</h1>
            <p className="mt-2 text-sm text-neutral-500">Tell us about your product so Stardrop can give you personalized GTM advice.</p>
          </div>
          <div className="space-y-4 rounded-xl border border-neutral-200 bg-white p-6">
            <div>
              <label className="block text-xs font-medium text-neutral-600 mb-1">Your name</label>
              <input
                value={onboardName}
                onChange={(e) => setOnboardName(e.target.value)}
                placeholder="e.g. Ari"
                className="w-full rounded-lg border border-neutral-200 px-3 py-2.5 text-sm outline-none focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-neutral-600 mb-1">What do you sell?</label>
              <input
                value={onboardProduct}
                onChange={(e) => setOnboardProduct(e.target.value)}
                placeholder="e.g. AI code review tool for engineering teams"
                className="w-full rounded-lg border border-neutral-200 px-3 py-2.5 text-sm outline-none focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-neutral-600 mb-1">Who do you sell to? <span className="text-neutral-400">(optional)</span></label>
              <input
                value={onboardAudience}
                onChange={(e) => setOnboardAudience(e.target.value)}
                placeholder="e.g. VP Engineering at B2B SaaS, 50-500 employees"
                className="w-full rounded-lg border border-neutral-200 px-3 py-2.5 text-sm outline-none focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-neutral-600 mb-1">Your X/Twitter handle <span className="text-neutral-400">(optional)</span></label>
              <input
                value={onboardTwitter}
                onChange={(e) => setOnboardTwitter(e.target.value)}
                placeholder="@yourhandle"
                className="w-full rounded-lg border border-neutral-200 px-3 py-2.5 text-sm outline-none focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900"
              />
            </div>
            <button
              onClick={() => {
                if (!canSubmit) return;
                localStorage.setItem("stardrop_onboarded", "true");
                localStorage.setItem("stardrop_settings_name", onboardName);
                localStorage.setItem("stardrop_settings_product", onboardProduct);
                if (onboardAudience) localStorage.setItem("stardrop_settings_audience", onboardAudience);
                if (onboardTwitter) localStorage.setItem("stardrop_settings_twitter", onboardTwitter);
                console.log("[Stardrop:Onboarding] Completed:", { name: onboardName, product: onboardProduct, audience: onboardAudience, twitter: onboardTwitter });
                setOnboarded(true);
              }}
              disabled={!canSubmit}
              className={`w-full rounded-lg px-4 py-3 text-sm font-medium text-white transition ${
                canSubmit ? "bg-neutral-900 hover:bg-neutral-800" : "bg-neutral-300 cursor-not-allowed"
              }`}
            >
              Get started
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Show PIN lock screen (after onboarding, before content)
  if (mounted && pinRequired && !pinUnlocked) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-neutral-50 px-4">
        <div className="w-full max-w-xs">
          <div className="text-center mb-8">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-neutral-900">
              <LockIcon className="h-5 w-5 text-white" />
            </div>
            <h1 className="mt-4 text-xl font-semibold text-neutral-900">Dashboard Locked</h1>
            <p className="mt-2 text-sm text-neutral-500">Enter your 4-digit PIN to continue.</p>
          </div>
          <div className={`space-y-4 rounded-xl border border-neutral-200 bg-white p-6 ${pinShake ? "animate-shake" : ""}`}>
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
                className={`w-full rounded-lg border px-3 py-3 text-center text-2xl tracking-[0.5em] font-mono outline-none transition ${
                  pinError
                    ? "border-red-400 focus:border-red-500 focus:ring-1 focus:ring-red-500"
                    : "border-neutral-200 focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900"
                }`}
                autoFocus
              />
              {pinError && (
                <p className="mt-2 text-center text-xs font-medium text-red-500">Wrong PIN</p>
              )}
            </div>
            <button
              onClick={handlePinSubmit}
              disabled={pinInput.length !== 4}
              className={`w-full rounded-lg px-4 py-3 text-sm font-medium text-white transition ${
                pinInput.length === 4 ? "bg-neutral-900 hover:bg-neutral-800" : "bg-neutral-300 cursor-not-allowed"
              }`}
            >
              Unlock
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen overflow-hidden bg-white">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-[240px] flex-col border-r border-neutral-200 bg-neutral-50 transition-transform duration-200 md:static md:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Logo area */}
        <div className="flex items-center justify-between border-b border-neutral-200 px-5 py-4">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="flex h-7 w-7 items-center justify-center rounded-md bg-neutral-900">
              <span className="text-xs font-bold text-white">S</span>
            </div>
            <div>
              <span className="text-sm font-semibold tracking-tight text-neutral-900">
                Stardrop
              </span>
              <span className="ml-1.5 rounded bg-neutral-200 px-1.5 py-0.5 text-[10px] font-medium text-neutral-500">
                GTM
              </span>
            </div>
          </Link>
          <button
            onClick={() => setSidebarOpen(false)}
            className="rounded-md p-1 text-neutral-400 hover:bg-neutral-200/60 hover:text-neutral-700 md:hidden"
          >
            <CloseIcon className="h-4 w-4" />
          </button>
        </div>

        {/* Nav links */}
        <nav className="flex-1 overflow-y-auto px-3 py-4">
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
                  className={`flex items-center gap-2.5 rounded-md px-3 py-2 text-[13px] transition-colors ${
                    isActive
                      ? "bg-neutral-900 font-medium text-white"
                      : "text-neutral-600 hover:bg-neutral-200/60 hover:text-neutral-900"
                  }`}
                >
                  <item.icon
                    className={`h-4 w-4 shrink-0 ${
                      isActive ? "text-neutral-400" : "text-neutral-400"
                    }`}
                  />
                  {item.label}
                </Link>
              );
            })}
          </div>
        </nav>

        {/* Bottom section */}
        <div className="border-t border-neutral-200 px-4 py-3">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-neutral-200 text-xs font-semibold text-neutral-600">
              A
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[13px] font-medium text-neutral-900 truncate">
                Admin
              </p>
              <p className="text-[11px] text-neutral-400 flex items-center gap-1">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-green-500" />
                Agent active
              </p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Mobile topbar */}
        <div className="flex items-center border-b border-neutral-200 px-4 py-3 md:hidden">
          <button
            onClick={() => setSidebarOpen(true)}
            className="rounded-md p-1.5 text-neutral-500 hover:bg-neutral-100 hover:text-neutral-900"
          >
            <MenuIcon className="h-5 w-5" />
          </button>
          <span className="ml-3 text-sm font-semibold text-neutral-900">
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
