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
          <div className="space-y-4">
            {[
              {
                label: "OpenAI API Key",
                placeholder: "sk-...",
                connected: true,
                hint: "Used for GPT-4o inference. Required.",
              },
              {
                label: "X / Twitter Bearer Token",
                placeholder: "AAAA...",
                connected: true,
                hint: "OAuth 1.0a for mention detection and replies.",
              },
              {
                label: "X / Twitter API Key",
                placeholder: "API key...",
                connected: true,
                hint: "Consumer key for the Twitter API v2.",
              },
              {
                label: "X / Twitter API Secret",
                placeholder: "API secret...",
                connected: true,
                hint: "Consumer secret for the Twitter API v2.",
              },
              {
                label: "X / Twitter Access Token",
                placeholder: "Access token...",
                connected: true,
                hint: "User-level access for posting replies.",
              },
              {
                label: "X / Twitter Access Token Secret",
                placeholder: "Access token secret...",
                connected: true,
                hint: "User-level secret for posting replies.",
              },
              {
                label: "GitHub App Private Key",
                placeholder: "-----BEGIN RSA PRIVATE KEY-----",
                connected: true,
                hint: "For repo creation and CI/CD triggers.",
              },
              {
                label: "Luma API Key",
                placeholder: "luma_...",
                connected: true,
                hint: "Event creation and attendee management.",
              },
              {
                label: "HubSpot API Key",
                placeholder: "pat-...",
                connected: false,
                hint: "For CRM contact and deal sync. Coming soon.",
              },
              {
                label: "Clay API Key",
                placeholder: "clay_...",
                connected: false,
                hint: "For waterfall enrichment. Coming soon.",
              },
            ].map((key) => (
              <div key={key.label}>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-sm font-medium text-neutral-700">
                    {key.label}
                  </label>
                  {key.connected ? (
                    <span className="flex items-center gap-1.5 text-[10px] font-medium text-green-600">
                      <span className="inline-block h-1.5 w-1.5 rounded-full bg-green-500" />
                      Connected
                    </span>
                  ) : (
                    <span className="text-[10px] font-medium text-neutral-400">
                      Not configured
                    </span>
                  )}
                </div>
                <div className="flex gap-2">
                  <input
                    type="password"
                    placeholder={key.placeholder}
                    defaultValue={key.connected ? "configured-key-hidden" : ""}
                    className="flex-1 rounded-md border border-neutral-200 bg-neutral-50 px-3 py-2 text-sm text-neutral-700 placeholder:text-neutral-300 focus:border-neutral-400 focus:outline-none transition"
                  />
                  <button className="shrink-0 rounded-md bg-neutral-900 px-4 py-2 text-xs font-medium text-white transition hover:bg-neutral-800">
                    Save
                  </button>
                </div>
                <p className="mt-1 text-[10px] text-neutral-400">{key.hint}</p>
              </div>
            ))}
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
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-neutral-700">
                Target persona
              </label>
              <input
                type="text"
                defaultValue="VP Engineering, Engineering Manager"
                className="w-full rounded-md border border-neutral-200 bg-neutral-50 px-3 py-2 text-sm text-neutral-700 focus:border-neutral-400 focus:outline-none transition"
              />
              <p className="mt-1 text-[10px] text-neutral-400">
                Job titles to target in ICP analysis
              </p>
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-neutral-700">
                Company size
              </label>
              <input
                type="text"
                defaultValue="50-500 employees"
                className="w-full rounded-md border border-neutral-200 bg-neutral-50 px-3 py-2 text-sm text-neutral-700 focus:border-neutral-400 focus:outline-none transition"
              />
              <p className="mt-1 text-[10px] text-neutral-400">
                Employee count range for target companies
              </p>
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-neutral-700">
                Industries
              </label>
              <input
                type="text"
                defaultValue="B2B SaaS, Developer Tools, DevOps"
                className="w-full rounded-md border border-neutral-200 bg-neutral-50 px-3 py-2 text-sm text-neutral-700 focus:border-neutral-400 focus:outline-none transition"
              />
              <p className="mt-1 text-[10px] text-neutral-400">
                Comma-separated target industries
              </p>
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-neutral-700">
                Funding stage
              </label>
              <input
                type="text"
                defaultValue="Series A to Series C"
                className="w-full rounded-md border border-neutral-200 bg-neutral-50 px-3 py-2 text-sm text-neutral-700 focus:border-neutral-400 focus:outline-none transition"
              />
              <p className="mt-1 text-[10px] text-neutral-400">
                Target company funding stage
              </p>
            </div>
            <div className="sm:col-span-2">
              <label className="mb-1.5 block text-sm font-medium text-neutral-700">
                Pain points
              </label>
              <textarea
                rows={3}
                defaultValue="Alert fatigue from too many monitoring tools. Slow MTTR. Manual incident response. No unified observability across microservices."
                className="w-full rounded-md border border-neutral-200 bg-neutral-50 px-3 py-2 text-sm text-neutral-700 focus:border-neutral-400 focus:outline-none transition resize-none"
              />
              <p className="mt-1 text-[10px] text-neutral-400">
                Key customer pain points to reference in responses
              </p>
            </div>
            <div className="sm:col-span-2">
              <label className="mb-1.5 block text-sm font-medium text-neutral-700">
                Buying signals
              </label>
              <textarea
                rows={3}
                defaultValue="Hiring SRE or DevOps engineers. Posting about observability challenges. Recently raised funding. Migrating to Kubernetes. Expanding engineering team."
                className="w-full rounded-md border border-neutral-200 bg-neutral-50 px-3 py-2 text-sm text-neutral-700 focus:border-neutral-400 focus:outline-none transition resize-none"
              />
              <p className="mt-1 text-[10px] text-neutral-400">
                Signals that indicate a company is ready to buy
              </p>
            </div>
          </div>
          <div className="mt-5 flex justify-end">
            <button className="rounded-md bg-neutral-900 px-6 py-2 text-sm font-medium text-white transition hover:bg-neutral-800">
              Save ICP
            </button>
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
          <div className="space-y-4">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-neutral-700">
                Tone
              </label>
              <div className="flex flex-wrap gap-2">
                {[
                  { label: "Direct", active: true },
                  { label: "Friendly", active: false },
                  { label: "Academic", active: false },
                  { label: "Provocative", active: false },
                  { label: "Casual", active: false },
                ].map((tone) => (
                  <button
                    key={tone.label}
                    className={`rounded-md px-3 py-1.5 text-xs font-medium transition ${
                      tone.active
                        ? "bg-neutral-900 text-white"
                        : "border border-neutral-200 text-neutral-500 hover:border-neutral-300 hover:text-neutral-700"
                    }`}
                  >
                    {tone.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-neutral-700">
                Response length
              </label>
              <div className="flex flex-wrap gap-2">
                {[
                  { label: "Concise (1 tweet)", active: false },
                  { label: "Standard (2-3 tweets)", active: true },
                  { label: "Detailed (thread)", active: false },
                ].map((length) => (
                  <button
                    key={length.label}
                    className={`rounded-md px-3 py-1.5 text-xs font-medium transition ${
                      length.active
                        ? "bg-neutral-900 text-white"
                        : "border border-neutral-200 text-neutral-500 hover:border-neutral-300 hover:text-neutral-700"
                    }`}
                  >
                    {length.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-neutral-700">
                Always include
              </label>
              <div className="flex flex-wrap gap-2">
                {[
                  { label: "Specific tools", active: true },
                  { label: "Dollar amounts", active: true },
                  { label: "This-week action", active: true },
                  { label: "Case study reference", active: false },
                  { label: "Competitor mention", active: false },
                ].map((inc) => (
                  <button
                    key={inc.label}
                    className={`rounded-md px-3 py-1.5 text-xs font-medium transition ${
                      inc.active
                        ? "bg-neutral-900 text-white"
                        : "border border-neutral-200 text-neutral-500 hover:border-neutral-300 hover:text-neutral-700"
                    }`}
                  >
                    {inc.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-neutral-700">
                Custom system prompt addition
              </label>
              <textarea
                rows={4}
                defaultValue="Always name specific tools (Clay, Apollo, Instantly, Attio). Include quantified recommendations with real numbers. End every response with a concrete this-week action the founder can execute immediately. Reference relevant case studies when available."
                className="w-full rounded-md border border-neutral-200 bg-neutral-50 px-3 py-2 text-sm text-neutral-700 font-mono leading-relaxed focus:border-neutral-400 focus:outline-none transition resize-none"
              />
              <p className="mt-1 text-[10px] text-neutral-400">
                Appended to the system prompt for every response generation.
              </p>
            </div>
          </div>
          <div className="mt-5 flex justify-end">
            <button className="rounded-md bg-neutral-900 px-6 py-2 text-sm font-medium text-white transition hover:bg-neutral-800">
              Save preferences
            </button>
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
