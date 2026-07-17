"use client";

import { StatusBadge } from "@/components/admin/StatusBadge";
import { Application } from "@/lib/types";
import { formatDate } from "@/lib/status";
import {
  ArrowLeft,
  Check,
  Loader2,
  Mail,
  MessageSquare,
  X,
} from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ApplicationDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [app, setApp] = useState<Application | null>(null);
  const [notes, setNotes] = useState("");
  const [emailSubject, setEmailSubject] = useState("");
  const [emailBody, setEmailBody] = useState("");
  const [moreInfoMsg, setMoreInfoMsg] = useState("");
  const [busy, setBusy] = useState("");
  const [message, setMessage] = useState("");

  const load = async () => {
    const res = await fetch(`/api/admin/requests/${id}`);
    const data = await res.json();
    if (res.ok) {
      setApp(data.application);
      setNotes(data.application.internalNotes || "");
    }
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const act = async (action: string, extra: Record<string, string> = {}) => {
    setBusy(action);
    setMessage("");
    try {
      const res = await fetch(`/api/admin/requests/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action, ...extra }),
      });
      const data = await res.json();
      if (!res.ok) {
        setMessage(data.error || "Action failed");
        return;
      }
      if (data.application) setApp(data.application);
      else await load();
      setMessage(
        action === "approve"
          ? "Approved — workspace provisioned & welcome email sent."
          : action === "reject"
            ? "Rejected — email sent."
            : "Done."
      );
      if (action === "approve") router.refresh();
    } finally {
      setBusy("");
    }
  };

  if (!app) {
    return <p className="text-sm text-muted">Loading application…</p>;
  }

  const fields: [string, string][] = [
    ["Name", `${app.firstName} ${app.lastName}`],
    ["Email", app.email],
    ["Phone", app.phone],
    ["Company", app.company],
    ["Country", app.country],
    ["Website", app.website || "—"],
    ["Company size", app.companySize],
    ["Industry", app.industry],
    ["Job title", app.jobTitle],
    ["Type", app.userType],
    ["Expected AI employees", app.expectedAiEmployees],
    ["Current tools", app.currentTools || "—"],
    ["Use case", app.reason],
    ["Notes", app.notes || "—"],
    ["Submitted", formatDate(app.createdAt)],
    ["Email verified", app.emailVerifiedAt ? formatDate(app.emailVerifiedAt) : "Not yet"],
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <Link
            href="/admin/applications"
            className="mb-3 inline-flex items-center gap-1.5 text-xs text-muted-2 hover:text-white"
          >
            <ArrowLeft size={12} /> Back to applications
          </Link>
          <h1 className="text-2xl font-semibold text-white">
            {app.firstName} {app.lastName}
          </h1>
          <p className="mt-1 text-sm text-muted">
            {app.company} · {app.email}
          </p>
        </div>
        <StatusBadge status={app.status} />
      </div>

      {message ? (
        <div className="rounded-xl border border-emerald/25 bg-emerald-soft px-4 py-3 text-sm text-emerald">
          {message}
        </div>
      ) : null}

      <div className="grid gap-6 xl:grid-cols-[1.4fr_1fr]">
        <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
          <h2 className="mb-4 text-sm font-medium text-white">Application details</h2>
          <dl className="grid gap-4 sm:grid-cols-2">
            {fields.map(([label, value]) => (
              <div key={label} className={label === "Use case" || label === "Notes" ? "sm:col-span-2" : ""}>
                <dt className="text-[11px] uppercase tracking-wider text-muted-2">{label}</dt>
                <dd className="mt-1 whitespace-pre-wrap text-sm text-white">{value}</dd>
              </div>
            ))}
          </dl>
        </section>

        <div className="space-y-4">
          <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
            <h2 className="mb-3 text-sm font-medium text-white">Actions</h2>
            <div className="grid gap-2">
              <button
                type="button"
                disabled={!!busy || app.status === "approved"}
                onClick={() => act("approve")}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald px-4 py-2.5 text-sm font-medium text-white disabled:opacity-50"
              >
                {busy === "approve" ? <Loader2 size={14} className="animate-spin" /> : <Check size={14} />}
                Approve
              </button>
              <button
                type="button"
                disabled={!!busy || app.status === "rejected"}
                onClick={() => act("reject")}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-red-400/30 bg-red-400/10 px-4 py-2.5 text-sm font-medium text-red-300 disabled:opacity-50"
              >
                {busy === "reject" ? <Loader2 size={14} className="animate-spin" /> : <X size={14} />}
                Reject
              </button>
              <div className="rounded-xl border border-white/10 p-3">
                <textarea
                  value={moreInfoMsg}
                  onChange={(e) => setMoreInfoMsg(e.target.value)}
                  placeholder="Request more information…"
                  className="mb-2 w-full rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2 text-sm text-white outline-none"
                  rows={3}
                />
                <button
                  type="button"
                  disabled={!!busy}
                  onClick={() =>
                    act("more_info", { message: moreInfoMsg })
                  }
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-amber-300/30 bg-amber-300/10 px-4 py-2 text-sm text-amber-200"
                >
                  <MessageSquare size={14} />
                  Request More Info
                </button>
              </div>
            </div>
          </section>

          <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
            <h2 className="mb-3 text-sm font-medium text-white">Internal notes</h2>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={4}
              className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2 text-sm text-white outline-none"
            />
            <button
              type="button"
              disabled={!!busy}
              onClick={() => act("notes", { notes })}
              className="mt-2 rounded-xl border border-white/10 px-3 py-2 text-xs text-white hover:bg-white/5"
            >
              Save notes
            </button>
          </section>

          <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
            <h2 className="mb-3 text-sm font-medium text-white">Send email</h2>
            <input
              value={emailSubject}
              onChange={(e) => setEmailSubject(e.target.value)}
              placeholder="Subject"
              className="mb-2 w-full rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2 text-sm text-white outline-none"
            />
            <textarea
              value={emailBody}
              onChange={(e) => setEmailBody(e.target.value)}
              placeholder="Message body"
              rows={4}
              className="mb-2 w-full rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2 text-sm text-white outline-none"
            />
            <button
              type="button"
              disabled={!!busy || !emailSubject || !emailBody}
              onClick={() =>
                act("send_email", { subject: emailSubject, body: emailBody })
              }
              className="inline-flex items-center gap-2 rounded-xl bg-purple px-3 py-2 text-xs font-medium text-white disabled:opacity-50"
            >
              <Mail size={12} /> Send Email
            </button>
          </section>
        </div>
      </div>
    </div>
  );
}
