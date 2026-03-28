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
          Configure API keys, ICP preferences, and response style for the Stardrop agent.
        </p>
      </div>

      <div className="space-y-8">
        {/* API Keys */}
        <section className="rounded-xl border border-neutral-200 bg-white p-6">
          <h2 className="text-sm font-semibold text-neutral-900 mb-1">
            API keys
          </h2>
          <p className="text-xs text-neutral-400 mb-5">
            Credentials for connected environments. Keys are encrypted at rest.
          </p>
          <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-neutral-200 bg-neutral-50/50 px-6 py-12 text-center">
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-neutral-100">
              <div className="h-4 w-4 rounded-sm bg-neutral-300" />
            </div>
            <h3 className="text-sm font-semibold text-neutral-700">
              No API keys configured
            </h3>
            <p className="mt-1.5 max-w-sm text-xs text-neutral-400 leading-relaxed">
              Connect the settings API to manage API keys for OpenAI, X/Twitter, GitHub, and other integrations.
            </p>
            <p className="mt-3 rounded-md bg-neutral-100 px-3 py-1.5 font-mono text-[10px] text-neutral-400">
              GET /api/dashboard/settings
            </p>
          </div>
        </section>

        {/* ICP Configuration */}
        <section className="rounded-xl border border-neutral-200 bg-white p-6">
          <h2 className="text-sm font-semibold text-neutral-900 mb-1">
            ICP configuration
          </h2>
          <p className="text-xs text-neutral-400 mb-5">
            Define your Ideal Customer Profile so Stardrop tailors responses to your market.
          </p>
          <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-neutral-200 bg-neutral-50/50 px-6 py-12 text-center">
            <h3 className="text-sm font-semibold text-neutral-700">
              No ICP defined
            </h3>
            <p className="mt-1.5 max-w-sm text-xs text-neutral-400 leading-relaxed">
              ICP settings will be configurable once the settings API is connected.
            </p>
          </div>
        </section>

        {/* Response style */}
        <section className="rounded-xl border border-neutral-200 bg-white p-6">
          <h2 className="text-sm font-semibold text-neutral-900 mb-1">
            Response style
          </h2>
          <p className="text-xs text-neutral-400 mb-5">
            Control how Stardrop writes its replies on X.
          </p>
          <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-neutral-200 bg-neutral-50/50 px-6 py-12 text-center">
            <h3 className="text-sm font-semibold text-neutral-700">
              No preferences set
            </h3>
            <p className="mt-1.5 max-w-sm text-xs text-neutral-400 leading-relaxed">
              Response tone, length, and style preferences will be configurable once the settings API is connected.
            </p>
          </div>
        </section>

        {/* Danger zone */}
        <section className="rounded-xl border border-red-200 bg-red-50/30 p-6">
          <h2 className="text-sm font-semibold text-red-900 mb-1">
            Danger zone
          </h2>
          <p className="text-xs text-red-400 mb-4">
            Irreversible actions. Proceed with caution.
          </p>
          <div className="space-y-3">
            <div className="flex items-center justify-between rounded-lg border border-red-200 bg-white px-4 py-3">
              <div>
                <p className="text-sm font-medium text-neutral-900">
                  Pause agent
                </p>
                <p className="text-xs text-neutral-400">
                  Stop the agent from polling X and replying to mentions.
                </p>
              </div>
              <button className="rounded-md border border-red-200 px-4 py-1.5 text-xs font-medium text-red-600 transition hover:bg-red-50">
                Pause
              </button>
            </div>
            <div className="flex items-center justify-between rounded-lg border border-red-200 bg-white px-4 py-3">
              <div>
                <p className="text-sm font-medium text-neutral-900">
                  Clear all learnings
                </p>
                <p className="text-xs text-neutral-400">
                  Delete all extracted learnings and reset the knowledge graph.
                </p>
              </div>
              <button className="rounded-md border border-red-200 px-4 py-1.5 text-xs font-medium text-red-600 transition hover:bg-red-50">
                Clear
              </button>
            </div>
            <div className="flex items-center justify-between rounded-lg border border-red-200 bg-white px-4 py-3">
              <div>
                <p className="text-sm font-medium text-neutral-900">
                  Re-index vault
                </p>
                <p className="text-xs text-neutral-400">
                  Drop and rebuild all ChromaDB embeddings from scratch.
                </p>
              </div>
              <button className="rounded-md border border-red-200 px-4 py-1.5 text-xs font-medium text-red-600 transition hover:bg-red-50">
                Re-index
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
