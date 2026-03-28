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
    <div className="min-h-full bg-[#FAFAF9]">
      {/* Header bar */}
      <div className="bg-[#0A0A0A] text-white px-4 py-2.5 md:px-6">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/70">
            Knowledge Base
          </span>
          <span className="text-[10px] text-white/40">
            {docs.length} document{docs.length !== 1 ? "s" : ""} saved
          </span>
        </div>
      </div>

      {/* Two-column layout */}
      <div className="flex flex-col lg:flex-row min-h-[calc(100vh-100px)]">
        {/* Left: Upload form */}
        <div
          className="lg:w-[45%] border-r border-neutral-200 p-4 md:p-5"
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
        >
          <h2 className="text-[10px] font-semibold uppercase tracking-widest text-neutral-400 mb-3">
            Add Document
          </h2>
          <p className="text-[11px] text-neutral-400 mb-3">
            Drag a file here or fill in the fields. Stardrop uses these to personalize responses.
          </p>

          <div className="space-y-2.5">
            {/* Title */}
            <div>
              <label className="block text-[9px] font-semibold uppercase tracking-widest text-neutral-400 mb-1">Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Document title"
                className="w-full border border-neutral-200 bg-white px-3 py-2 text-[13px] text-neutral-900 placeholder:text-neutral-400 focus:border-[#0A0A0A] focus:outline-none rounded"
              />
            </div>

            {/* Category pills */}
            <div>
              <label className="block text-[9px] font-semibold uppercase tracking-widest text-neutral-400 mb-1">Category</label>
              <div className="flex flex-wrap gap-1.5">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setCategory(cat)}
                    className={`px-2.5 py-1 text-[10px] font-medium transition rounded ${
                      category === cat
                        ? "bg-[#0A0A0A] text-white"
                        : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Content */}
            <div>
              <label className="block text-[9px] font-semibold uppercase tracking-widest text-neutral-400 mb-1">Content</label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Paste or type content..."
                rows={8}
                className="w-full border border-neutral-200 bg-white px-3 py-2 text-[13px] text-neutral-900 placeholder:text-neutral-400 focus:border-[#0A0A0A] focus:outline-none resize-none rounded"
              />
            </div>

            {/* Save */}
            <button
              onClick={handleSave}
              disabled={!title.trim() || !content.trim()}
              className="w-full bg-[#0A0A0A] px-4 py-2.5 text-[11px] font-semibold uppercase tracking-widest text-white transition hover:bg-neutral-800 disabled:opacity-40 disabled:cursor-not-allowed rounded"
            >
              {saved ? "Saved!" : "Save Document"}
            </button>
          </div>
        </div>

        {/* Right: Documents table */}
        <div className="flex-1 p-4 md:p-5">
          <h2 className="text-[10px] font-semibold uppercase tracking-widest text-neutral-400 mb-3">
            Saved Documents
          </h2>

          {docs.length === 0 ? (
            <div className="border border-dashed border-neutral-200 bg-white p-8 text-center rounded">
              <p className="text-[11px] text-neutral-400">No documents yet. Add one to get started.</p>
            </div>
          ) : (
            <div className="border border-neutral-200 rounded overflow-hidden bg-white">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-neutral-100 bg-neutral-50">
                    <th className="px-3 py-1.5 text-[9px] font-semibold uppercase tracking-widest text-neutral-400">Title</th>
                    <th className="px-3 py-1.5 text-[9px] font-semibold uppercase tracking-widest text-neutral-400 w-24">Category</th>
                    <th className="px-3 py-1.5 text-[9px] font-semibold uppercase tracking-widest text-neutral-400 w-20 text-right">Date</th>
                    <th className="px-3 py-1.5 text-[9px] font-semibold uppercase tracking-widest text-neutral-400 w-10"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-50">
                  {docs.map((doc) => (
                    <tr key={doc.id} className="group hover:bg-neutral-50 transition">
                      <td className="px-3 py-2">
                        <p className="text-[11px] font-medium text-neutral-800 truncate max-w-[220px]">{doc.title}</p>
                        <p className="text-[10px] text-neutral-400 truncate max-w-[220px]">{doc.content.slice(0, 60)}</p>
                      </td>
                      <td className="px-3 py-2">
                        <span className="rounded bg-neutral-100 px-1.5 py-0.5 text-[9px] font-medium text-neutral-500 uppercase tracking-wide">
                          {doc.category}
                        </span>
                      </td>
                      <td className="px-3 py-2 text-right">
                        <span className="text-[10px] font-serif italic text-neutral-400">
                          {new Date(doc.createdAt).toLocaleDateString()}
                        </span>
                      </td>
                      <td className="px-3 py-2 text-right">
                        <button
                          onClick={() => handleDelete(doc.id)}
                          className="opacity-0 group-hover:opacity-100 p-1 text-neutral-300 hover:text-red-500 transition rounded"
                        >
                          <svg className="h-3.5 w-3.5" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                            <line x1="4" y1="4" x2="12" y2="12" />
                            <line x1="12" y1="4" x2="4" y2="12" />
                          </svg>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
