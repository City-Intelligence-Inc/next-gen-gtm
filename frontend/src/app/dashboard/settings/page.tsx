export default function SettingsPage() {
  return (
    <div className="px-6 py-8 md:px-10 md:py-10 max-w-4xl">
      {/* Header */}
      <div className="mb-8">
        <p className="text-xs font-medium uppercase tracking-[0.15em] text-neutral-400">
          Dashboard
        </p>
        <h1 className="mt-1 font-serif text-3xl italic tracking-tight text-neutral-900">
          Settings
        </h1>
        <p className="mt-2 text-sm text-neutral-500">
          Read-only overview of the Stardrop agent configuration.
        </p>
      </div>

      <div className="space-y-8">
        {/* Agent Status */}
        <section className="rounded-xl border border-neutral-200 bg-white p-6">
          <h2 className="text-sm font-semibold text-neutral-900 mb-5">
            Agent status
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="rounded-lg border border-neutral-100 bg-neutral-50/50 px-4 py-3">
              <p className="text-[11px] font-medium uppercase tracking-wide text-neutral-400">
                Agent
              </p>
              <p className="mt-1 text-sm font-medium text-neutral-900">
                @stardroplin
              </p>
            </div>
            <div className="rounded-lg border border-neutral-100 bg-neutral-50/50 px-4 py-3">
              <p className="text-[11px] font-medium uppercase tracking-wide text-neutral-400">
                Status
              </p>
              <p className="mt-1 flex items-center gap-1.5 text-sm font-medium text-neutral-900">
                <span className="inline-block h-2 w-2 rounded-full bg-green-500" />
                Active
              </p>
            </div>
            <div className="rounded-lg border border-neutral-100 bg-neutral-50/50 px-4 py-3">
              <p className="text-[11px] font-medium uppercase tracking-wide text-neutral-400">
                Poll interval
              </p>
              <p className="mt-1 text-sm font-medium text-neutral-900">
                60s
              </p>
            </div>
            <div className="rounded-lg border border-neutral-100 bg-neutral-50/50 px-4 py-3">
              <p className="text-[11px] font-medium uppercase tracking-wide text-neutral-400">
                Model
              </p>
              <p className="mt-1 text-sm font-medium text-neutral-900">
                GPT-4o
              </p>
            </div>
            <div className="rounded-lg border border-neutral-100 bg-neutral-50/50 px-4 py-3 sm:col-span-2">
              <p className="text-[11px] font-medium uppercase tracking-wide text-neutral-400">
                RAG
              </p>
              <p className="mt-1 text-sm font-medium text-neutral-900">
                60+ notes, 441 chunks
              </p>
            </div>
          </div>
        </section>

        {/* How Stardrop Works */}
        <section className="rounded-xl border border-neutral-200 bg-white p-6">
          <h2 className="text-sm font-semibold text-neutral-900 mb-3">
            How Stardrop works
          </h2>
          <div className="space-y-3 text-sm leading-relaxed text-neutral-600">
            <p>
              Stardrop is configured via environment variables on AWS App Runner. There
              is no UI-based configuration.
            </p>
            <p>
              To modify behavior, update the system prompt in the codebase or add notes
              to the Obsidian vault.
            </p>
          </div>
        </section>

        {/* Links */}
        <section className="rounded-xl border border-neutral-200 bg-white p-6">
          <h2 className="text-sm font-semibold text-neutral-900 mb-5">
            Links
          </h2>
          <div className="space-y-3">
            <a
              href="https://github.com/City-Intelligence-Inc/next-gen-gtm"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between rounded-lg border border-neutral-100 bg-neutral-50/50 px-4 py-3 transition-colors hover:border-neutral-300 hover:bg-neutral-100/60"
            >
              <div>
                <p className="text-sm font-medium text-neutral-900">
                  GitHub repo
                </p>
                <p className="mt-0.5 text-xs text-neutral-400">
                  City-Intelligence-Inc/next-gen-gtm
                </p>
              </div>
              <ArrowUpRightIcon className="h-4 w-4 shrink-0 text-neutral-400" />
            </a>
            <a
              href="https://xitwxb23yn.us-east-1.awsapprunner.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between rounded-lg border border-neutral-100 bg-neutral-50/50 px-4 py-3 transition-colors hover:border-neutral-300 hover:bg-neutral-100/60"
            >
              <div>
                <p className="text-sm font-medium text-neutral-900">
                  API
                </p>
                <p className="mt-0.5 text-xs text-neutral-400">
                  xitwxb23yn.us-east-1.awsapprunner.com
                </p>
              </div>
              <ArrowUpRightIcon className="h-4 w-4 shrink-0 text-neutral-400" />
            </a>
            <a
              href="https://x.com/stardroplin"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between rounded-lg border border-neutral-100 bg-neutral-50/50 px-4 py-3 transition-colors hover:border-neutral-300 hover:bg-neutral-100/60"
            >
              <div>
                <p className="text-sm font-medium text-neutral-900">
                  Bot
                </p>
                <p className="mt-0.5 text-xs text-neutral-400">
                  x.com/stardroplin
                </p>
              </div>
              <ArrowUpRightIcon className="h-4 w-4 shrink-0 text-neutral-400" />
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}

function ArrowUpRightIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="4" y1="12" x2="12" y2="4" />
      <polyline points="6 4 12 4 12 10" />
    </svg>
  );
}
