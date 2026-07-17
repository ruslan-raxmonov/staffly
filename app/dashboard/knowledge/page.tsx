"use client";

import { knowledgeDocs } from "@/lib/demo-data";
import { FileText, Upload } from "lucide-react";
import { useState } from "react";

export default function KnowledgePage() {
  const [docs, setDocs] = useState(knowledgeDocs);
  const [dragging, setDragging] = useState(false);

  const addDemo = () => {
    setDocs((d) => [
      {
        name: `Upload-${Date.now().toString().slice(-4)}.pdf`,
        status: "Syncing",
        vectors: 0,
        updated: "Just now",
      },
      ...d,
    ]);
    setTimeout(() => {
      setDocs((d) =>
        d.map((doc, i) =>
          i === 0
            ? { ...doc, status: "Indexed", vectors: 120 + Math.floor(Math.random() * 400) }
            : doc
        )
      );
    }, 1800);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-white">Knowledge</h1>
        <p className="mt-1 text-sm text-muted">
          Documents and vector memory powering your AI employees.
        </p>
      </div>

      <button
        type="button"
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragging(false);
          addDemo();
        }}
        onClick={addDemo}
        className={`flex w-full flex-col items-center justify-center rounded-2xl border border-dashed px-6 py-14 transition ${
          dragging
            ? "border-purple bg-purple-soft"
            : "border-white/15 bg-white/[0.02] hover:border-purple/40"
        }`}
      >
        <Upload className="mb-3 text-purple" size={28} />
        <p className="text-sm font-medium text-white">Drop files or click to upload</p>
        <p className="mt-1 text-xs text-muted">Demo upload — files are not stored</p>
      </button>

      <div className="overflow-hidden rounded-2xl border border-white/10">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead className="border-b border-white/10 bg-white/[0.02] text-xs uppercase tracking-wider text-muted-2">
            <tr>
              <th className="px-4 py-3">Document</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Vectors</th>
              <th className="px-4 py-3">Updated</th>
            </tr>
          </thead>
          <tbody>
            {docs.map((d) => (
              <tr key={d.name + d.updated} className="border-b border-white/5">
                <td className="px-4 py-3.5">
                  <span className="inline-flex items-center gap-2 text-white">
                    <FileText size={14} className="text-purple" />
                    {d.name}
                  </span>
                </td>
                <td className="px-4 py-3.5">
                  <span
                    className={
                      d.status === "Indexed" ? "text-emerald" : "text-amber-300"
                    }
                  >
                    {d.status}
                  </span>
                </td>
                <td className="px-4 py-3.5 text-muted">{d.vectors}</td>
                <td className="px-4 py-3.5 text-muted">{d.updated}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
