export default function KnowledgePage() {
  return (
    <div className="px-6 py-8 md:px-10 md:py-10 max-w-6xl">
      {/* Header */}
      <div className="mb-8">
        <p className="text-xs font-medium uppercase tracking-[0.15em] text-neutral-400">
          Dashboard
        </p>
        <h1 className="mt-1 font-serif text-3xl italic tracking-tight text-neutral-900">
          Knowledge
        </h1>
        <p className="mt-2 text-sm text-neutral-500">
          The Obsidian vault powering Stardrop&apos;s RAG pipeline.
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
            <path d="M2 2.5h4.5a2 2 0 0 1 2 2v9.5a1.5 1.5 0 0 0-1.5-1.5H2z" />
            <path d="M14 2.5H9.5a2 2 0 0 0-2 2v9.5a1.5 1.5 0 0 1 1.5-1.5H14z" />
          </svg>
        </div>
        <h3 className="text-sm font-semibold text-neutral-700">
          No knowledge indexed
        </h3>
        <p className="mt-1.5 max-w-sm text-xs text-neutral-400 leading-relaxed">
          Knowledge categories, vault notes, and retrieval stats will appear here once the embedding pipeline has indexed the Obsidian vault.
        </p>
        <p className="mt-3 rounded-md bg-neutral-100 px-3 py-1.5 font-mono text-[10px] text-neutral-400">
          GET /api/dashboard/knowledge
        </p>
      </div>
    </div>
  );
}
