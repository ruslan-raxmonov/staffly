"use client";

import { formatDate } from "@/lib/status";
import { MockEmail } from "@/lib/types";
import { useEffect, useState } from "react";

export default function AdminEmailPage() {
  const [emails, setEmails] = useState<MockEmail[]>([]);
  const [selected, setSelected] = useState<MockEmail | null>(null);

  useEffect(() => {
    fetch("/api/admin/overview?resource=emails")
      .then((r) => r.json())
      .then((d) => setEmails(d.emails || []));
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-white">Email</h1>
        <p className="mt-1 text-sm text-muted">
          Mock outbox — verification, welcome, rejection, and custom messages.
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-[1fr_1.1fr]">
        <div className="space-y-2">
          {emails.length === 0 ? (
            <p className="text-sm text-muted">No emails yet.</p>
          ) : (
            emails.map((e) => (
              <button
                key={e.id}
                type="button"
                onClick={() => setSelected(e)}
                className={`w-full rounded-xl border px-4 py-3 text-left transition ${
                  selected?.id === e.id
                    ? "border-purple/40 bg-purple-soft"
                    : "border-white/10 bg-white/[0.03] hover:border-white/20"
                }`}
              >
                <p className="text-sm font-medium text-white">{e.subject}</p>
                <p className="mt-1 text-xs text-muted">
                  {e.to} · {e.type} · {formatDate(e.createdAt)}
                </p>
              </button>
            ))
          )}
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
          {selected ? (
            <>
              <p className="text-xs uppercase tracking-wider text-muted-2">
                {selected.type}
              </p>
              <h2 className="mt-1 text-lg font-medium text-white">
                {selected.subject}
              </h2>
              <p className="mt-1 text-sm text-muted">To: {selected.to}</p>
              {selected.meta?.link ? (
                <a
                  href={selected.meta.link}
                  className="mt-3 inline-block text-sm text-purple hover:underline"
                >
                  Open link in email
                </a>
              ) : null}
              <pre className="mt-4 whitespace-pre-wrap rounded-xl border border-white/10 bg-black/30 p-4 text-sm text-muted-2">
                {selected.body}
              </pre>
            </>
          ) : (
            <p className="text-sm text-muted">Select an email to preview.</p>
          )}
        </div>
      </div>
    </div>
  );
}
