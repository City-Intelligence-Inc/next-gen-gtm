"use client";

import { useParams } from "next/navigation";
import Link from "next/link";

function unslugify(slug: string): string {
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export default function ResearchDocumentPage() {
  const params = useParams();
  const slug = typeof params.slug === "string" ? params.slug : "";
  const title = unslugify(slug);

  return (
    <main className="min-h-screen bg-white">
      {/* Nav */}
      <nav className="sticky top-0 z-40 border-b border-neutral-200 bg-white/95 backdrop-blur-sm">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <Link href="/" className="font-serif text-xl italic text-neutral-900">
              Stardrop
            </Link>
            <span className="rounded-md bg-neutral-100 px-2 py-0.5 text-xs font-medium text-neutral-500">
              Research
            </span>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/research"
              className="text-sm text-neutral-500 transition hover:text-neutral-900"
            >
              All Research
            </Link>
            <Link
              href="/dashboard"
              className="text-sm text-neutral-500 transition hover:text-neutral-900"
            >
              Dashboard
            </Link>
          </div>
        </div>
      </nav>

      {/* Content */}
      <article className="mx-auto max-w-3xl px-6 pt-16 pb-24">
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-1 text-xs font-medium text-neutral-400 transition hover:text-neutral-700 mb-8"
        >
          <span>&larr;</span> Back to Dashboard
        </Link>

        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-neutral-400 mb-3">
          Vault Document
        </p>

        <h1 className="font-serif text-3xl italic leading-tight tracking-tight sm:text-4xl text-neutral-900">
          {title}
        </h1>

        <div className="mt-8 rounded-xl border border-neutral-200 bg-neutral-50 p-6 sm:p-8">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-neutral-400 mb-3">
            Coming Soon
          </p>
          <p className="text-sm leading-relaxed text-neutral-600">
            Vault documents will be readable here in a future update. This note is part of the
            Stardrop research vault -- 60+ curated markdown notes on GTM strategy, frameworks,
            tools, case studies, and signal architecture.
          </p>
          <p className="mt-4 text-sm leading-relaxed text-neutral-600">
            The RAG system retrieves relevant chunks from these notes to ground every Stardrop
            response in real research, not generic advice.
          </p>
          <div className="mt-6 flex gap-3">
            <Link
              href="/research"
              className="rounded-lg bg-neutral-900 px-5 py-2.5 text-xs font-medium text-white transition hover:bg-neutral-800"
            >
              Browse All Research
            </Link>
            <Link
              href="/dashboard/test"
              className="rounded-lg border border-neutral-200 px-5 py-2.5 text-xs font-medium text-neutral-600 transition hover:border-neutral-300 hover:text-neutral-900"
            >
              Test in The Lab
            </Link>
          </div>
        </div>
      </article>
    </main>
  );
}
