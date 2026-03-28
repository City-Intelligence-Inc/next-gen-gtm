"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navItems = [
  { label: "Overview", href: "/dashboard", icon: OverviewIcon },
  { label: "History", href: "/dashboard/history", icon: HistoryIcon },
  { label: "Insights", href: "/dashboard/insights", icon: InsightsIcon },
  { label: "Environments", href: "/dashboard/environments", icon: EnvironmentsIcon },
  { label: "Knowledge", href: "/dashboard/knowledge", icon: KnowledgeIcon },
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

function HistoryIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="8" cy="8" r="6.5" />
      <polyline points="8 4 8 8 11 10" />
    </svg>
  );
}

function InsightsIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="1.5 12 5 6 8.5 9 14.5 2" />
      <polyline points="10.5 2 14.5 2 14.5 6" />
    </svg>
  );
}

function EnvironmentsIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="8" cy="8" r="6.5" />
      <path d="M1.5 8h13" />
      <ellipse cx="8" cy="8" rx="3" ry="6.5" />
    </svg>
  );
}

function KnowledgeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 2.5h4.5a2 2 0 0 1 2 2v9.5a1.5 1.5 0 0 0-1.5-1.5H2z" />
      <path d="M14 2.5H9.5a2 2 0 0 0-2 2v9.5a1.5 1.5 0 0 1 1.5-1.5H14z" />
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

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

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
