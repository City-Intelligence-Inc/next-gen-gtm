"use client";

import { useState, useEffect } from "react";

interface Document {
  id: string;
  title: string;
  category: string;
  content: string;
  createdAt: number;
}

const STORAGE_KEY = "stardrop_documents";
const CATEGORIES = ["Product", "ICP", "Competitors", "Playbook", "Case Study", "Other"];

function loadDocuments(): Document[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  } catch {
    return [];
  }
}

function saveDocuments(docs: Document[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(docs));
}

export default function DocumentsPage() {
  const [docs, setDocs] = useState<Document[]>([]);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Product");
  const [content, setContent] = useState("");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setDocs(loadDocuments());
  }, []);

  function handleSave() {
    if (!title.trim() || !content.trim()) return;

    const doc: Document = {
      id: Date.now().toString(),
      title: title.trim(),
      category,
      content: content.trim(),
      createdAt: Date.now(),
    };

    console.log(`[Stardrop:Documents] Saved: "${doc.title}" (${doc.category})`);

    const updated = [doc, ...loadDocuments()];
    saveDocuments(updated);
    setDocs(updated);
    setTitle("");
    setContent("");
    setCategory("Product");

    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  function handleDelete(id: string) {
    const updated = loadDocuments().filter((d) => d.id !== id);
    saveDocuments(updated);
    setDocs(updated);
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const text = ev.target?.result;
      if (typeof text === "string") {
        setContent(text);
        if (!title) setTitle(file.name.replace(/\.[^.]+$/, ""));
      }
    };
    reader.readAsText(file);
  }

  return (
    <div className="px-4 py-6 md:px-8 max-w-3xl mx-auto">
      <h1 className="text-xl font-semibold text-neutral-900 mb-1">Documents</h1>
      <p className="text-sm text-neutral-400 mb-1">
        Teach Stardrop about your product.
      </p>
      <p className="text-xs text-neutral-300 mb-6">
        Upload documents and Stardrop will use them to personalize responses for your business.
      </p>

      {/* Counter */}
      {docs.length > 0 && (
        <p className="text-xs text-neutral-500 mb-4">
          {docs.length} document{docs.length !== 1 ? "s" : ""} saved
        </p>
      )}

      {/* Upload area */}
      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
        className="rounded-lg border-2 border-dashed border-neutral-200 bg-white p-5 mb-8 transition hover:border-neutral-300"
      >
        <p className="text-xs text-neutral-400 mb-4 text-center">
          Drag and drop a file here, or fill in the fields below
        </p>

        {/* Title */}
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title (required)"
          className="w-full rounded-lg border border-neutral-200 bg-white px-3 py-2 text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-neutral-400 focus:outline-none mb-3"
        />

        {/* Category pills */}
        <div className="flex flex-wrap gap-2 mb-3">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`rounded-full px-3 py-1 text-xs font-medium transition ${
                category === cat
                  ? "bg-neutral-900 text-white"
                  : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Content */}
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Paste or type your content here..."
          rows={6}
          className="w-full rounded-lg border border-neutral-200 bg-white px-3 py-2 text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-neutral-400 focus:outline-none resize-none mb-3"
        />

        {/* Save button */}
        <button
          onClick={handleSave}
          disabled={!title.trim() || !content.trim()}
          className="w-full rounded-lg bg-neutral-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-neutral-800 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {saved ? "Saved!" : "Save"}
        </button>
      </div>

      {/* Document grid */}
      {docs.length > 0 && (
        <div>
          <h2 className="text-[11px] font-semibold uppercase tracking-widest text-neutral-400 mb-3">
            Saved documents
          </h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {docs.map((doc) => (
              <div key={doc.id} className="rounded-lg border border-neutral-200 bg-white p-4">
                <div className="flex items-start justify-between mb-2">
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-neutral-900 truncate">{doc.title}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="rounded-full bg-neutral-100 px-2 py-0.5 text-[10px] font-medium text-neutral-500">
                        {doc.category}
                      </span>
                      <span className="text-[10px] text-neutral-300">
                        {new Date(doc.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => handleDelete(doc.id)}
                    className="shrink-0 ml-2 rounded p-1 text-neutral-300 hover:text-red-500 hover:bg-red-50 transition"
                  >
                    <svg className="h-4 w-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                      <line x1="4" y1="4" x2="12" y2="12" />
                      <line x1="12" y1="4" x2="4" y2="12" />
                    </svg>
                  </button>
                </div>
                <p className="text-xs text-neutral-500 line-clamp-3">{doc.content.slice(0, 100)}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
