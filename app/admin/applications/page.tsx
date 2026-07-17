"use client";

import { StatusBadge } from "@/components/admin/StatusBadge";
import { Application, ApplicationStatus } from "@/lib/types";
import { formatDate } from "@/lib/status";
import { Search } from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

const filters: { label: string; value: ApplicationStatus | "all" }[] = [
  { label: "All", value: "all" },
  { label: "Pending", value: "pending" },
  { label: "Email Pending", value: "email_pending" },
  { label: "Approved", value: "approved" },
  { label: "Rejected", value: "rejected" },
  { label: "More Info", value: "more_info" },
];

export default function ApplicationsPage() {
  const [apps, setApps] = useState<Application[]>([]);
  const [q, setQ] = useState("");
  const [status, setStatus] = useState<ApplicationStatus | "all">("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/requests")
      .then((r) => r.json())
      .then((d) => setApps(d.applications || d.requests || []))
      .finally(() => setLoading(false));
  }, []);

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();
    return apps.filter((a) => {
      if (status !== "all" && a.status !== status) return false;
      if (!query) return true;
      const hay = `${a.firstName} ${a.lastName} ${a.email} ${a.company} ${a.country}`.toLowerCase();
      return hay.includes(query);
    });
  }, [apps, q, status]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-white">Applications</h1>
        <p className="mt-1 text-sm text-muted">
          Review, approve, and provision new workspaces.
        </p>
      </div>

      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="relative max-w-md flex-1">
          <Search
            size={14}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-2"
          />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search applicant, email, company…"
            className="w-full rounded-xl border border-white/10 bg-white/[0.04] py-2.5 pl-9 pr-3 text-sm text-white outline-none focus:border-purple/40"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {filters.map((f) => (
            <button
              key={f.value}
              type="button"
              onClick={() => setStatus(f.value)}
              className={`rounded-full border px-3 py-1.5 text-xs transition ${
                status === f.value
                  ? "border-purple/40 bg-purple-soft text-white"
                  : "border-white/10 text-muted-2 hover:border-white/20 hover:text-white"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-white/10">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] text-left text-sm">
            <thead className="border-b border-white/10 bg-white/[0.02] text-xs uppercase tracking-wider text-muted-2">
              <tr>
                <th className="px-4 py-3 font-medium">Applicant</th>
                <th className="px-4 py-3 font-medium">Email</th>
                <th className="px-4 py-3 font-medium">Company</th>
                <th className="px-4 py-3 font-medium">Country</th>
                <th className="px-4 py-3 font-medium">Submitted</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={7} className="px-4 py-10 text-center text-muted">
                    Loading…
                  </td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-4 py-10 text-center text-muted">
                    No applications found.
                  </td>
                </tr>
              ) : (
                filtered.map((a) => (
                  <tr
                    key={a.id}
                    className="border-b border-white/5 transition hover:bg-white/[0.02]"
                  >
                    <td className="px-4 py-3.5 font-medium text-white">
                      {a.firstName} {a.lastName}
                    </td>
                    <td className="px-4 py-3.5 text-muted">{a.email}</td>
                    <td className="px-4 py-3.5 text-muted">{a.company}</td>
                    <td className="px-4 py-3.5 text-muted">{a.country}</td>
                    <td className="px-4 py-3.5 text-muted">{formatDate(a.createdAt)}</td>
                    <td className="px-4 py-3.5">
                      <StatusBadge status={a.status} />
                    </td>
                    <td className="px-4 py-3.5">
                      <Link
                        href={`/admin/applications/${a.id}`}
                        className="rounded-lg border border-white/10 px-2.5 py-1.5 text-xs text-white transition hover:border-purple/40 hover:bg-purple-soft"
                      >
                        Review
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
