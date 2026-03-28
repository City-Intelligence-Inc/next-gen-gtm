export default function EnvironmentsPage() {
  return (
    <div className="px-6 py-8 md:px-10 md:py-10 max-w-6xl">
      {/* Header */}
      <div className="mb-8">
        <p className="text-xs font-medium uppercase tracking-[0.15em] text-neutral-400">
          Dashboard
        </p>
        <h1 className="mt-1 font-serif text-3xl italic tracking-tight text-neutral-900">
          Environments
        </h1>
        <p className="mt-2 text-sm text-neutral-500">
          Every GTM system is an environment. Connect, authenticate, and monitor each integration.
        </p>
      </div>

      {/* Empty state */}
      <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-neutral-200 bg-neutral-50/50 px-6 py-20 text-center">
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-neutral-100">
          <svg
            className="h-5 w-5 text-neutral-400"
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="8" cy="8" r="6.5" />
            <path d="M1.5 8h13" />
            <ellipse cx="8" cy="8" rx="3" ry="6.5" />
          </svg>
        </div>
        <h3 className="text-sm font-semibold text-neutral-700">
          No environments connected
        </h3>
        <p className="mt-1.5 max-w-sm text-xs text-neutral-400 leading-relaxed">
          Connect the API to see live environment status, metrics, and integration health. Environments will appear here once configured.
        </p>
        <p className="mt-3 rounded-md bg-neutral-100 px-3 py-1.5 font-mono text-[10px] text-neutral-400">
          GET /api/dashboard/environments
        </p>
      </div>
    </div>
  );
}
