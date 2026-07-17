"use client";

import { StatusBadge } from "@/components/admin/StatusBadge";
import { Application } from "@/lib/types";
import { formatDate } from "@/lib/status";
import {
  CheckCircle2,
  FileText,
  Percent,
  UserX,
  Users,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

type Overview = {
  stats: {
    today: number;
    approved: number;
    rejected: number;
    pending: number;
    conversionRate: number;
    total: number;
    topCountries: { name: string; count: number }[];
    topIndustries: { name: string; count: number }[];
  };
  recent: Application[];
  emails: { id: string; to: string; subject: string; createdAt: string; type: string }[];
  notifications: { id: string; title: string; body: string; createdAt: string }[];
};

export default function AdminDashboardPage() {
  const [data, setData] = useState<Overview | null>(null);

  useEffect(() => {
    fetch("/api/admin/overview")
      .then((r) => r.json())
      .then(setData)
      .catch(() => setData(null));
  }, []);

  if (!data) {
    return <p className="text-sm text-muted">Loading overview…</p>;
  }

  const { stats } = data;
  const kpis = [
    { label: "Applications Today", value: stats.today, icon: FileText, accent: "text-purple" },
    { label: "Approved", value: stats.approved, icon: CheckCircle2, accent: "text-emerald" },
    { label: "Rejected", value: stats.rejected, icon: UserX, accent: "text-red-300" },
    { label: "Conversion Rate", value: `${stats.conversionRate}%`, icon: Percent, accent: "text-amber-300" },
    { label: "In Review", value: stats.pending, icon: Users, accent: "text-purple" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-white md:text-3xl">
          Dashboard
        </h1>
        <p className="mt-1 text-sm text-muted">
          Approval pipeline overview · {stats.total} total applications
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        {kpis.map((k) => {
          const Icon = k.icon;
          return (
            <div
              key={k.label}
              className="rounded-2xl border border-white/10 bg-white/[0.03] p-5"
            >
              <div className="flex items-center justify-between">
                <p className="text-xs text-muted-2">{k.label}</p>
                <Icon size={16} className={k.accent} />
              </div>
              <p className="mt-3 text-3xl font-semibold tracking-tight text-white">
                {k.value}
              </p>
            </div>
          );
        })}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-sm font-medium text-white">Recent applications</h2>
            <Link href="/admin/applications" className="text-xs text-purple hover:underline">
              View all
            </Link>
          </div>
          <div className="space-y-3">
            {data.recent.length === 0 ? (
              <p className="text-sm text-muted">No applications yet.</p>
            ) : (
              data.recent.map((a) => (
                <Link
                  key={a.id}
                  href={`/admin/applications/${a.id}`}
                  className="flex items-center justify-between gap-3 rounded-xl border border-white/5 bg-white/[0.02] px-3 py-3 transition hover:border-white/15"
                >
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-white">
                      {a.firstName} {a.lastName}
                    </p>
                    <p className="truncate text-xs text-muted">
                      {a.company} · {a.country}
                    </p>
                  </div>
                  <StatusBadge status={a.status} />
                </Link>
              ))
            )}
          </div>
        </section>

        <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
          <h2 className="mb-4 text-sm font-medium text-white">Top countries</h2>
          <div className="space-y-3">
            {stats.topCountries.length === 0 ? (
              <p className="text-sm text-muted">No data yet.</p>
            ) : (
              stats.topCountries.map((c) => {
                const max = stats.topCountries[0]?.count || 1;
                return (
                  <div key={c.name}>
                    <div className="mb-1 flex justify-between text-xs">
                      <span className="text-muted-2">{c.name}</span>
                      <span className="text-white">{c.count}</span>
                    </div>
                    <div className="h-1.5 overflow-hidden rounded-full bg-white/5">
                      <div
                        className="h-full rounded-full bg-purple"
                        style={{ width: `${(c.count / max) * 100}%` }}
                      />
                    </div>
                  </div>
                );
              })
            )}
          </div>
          <h2 className="mb-4 mt-8 text-sm font-medium text-white">Top industries</h2>
          <div className="flex flex-wrap gap-2">
            {stats.topIndustries.map((i) => (
              <span
                key={i.name}
                className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-muted-2"
              >
                {i.name} · {i.count}
              </span>
            ))}
          </div>
        </section>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-sm font-medium text-white">Email outbox</h2>
            <Link href="/admin/email" className="text-xs text-purple hover:underline">
              Open
            </Link>
          </div>
          <div className="space-y-2">
            {data.emails.map((e) => (
              <div key={e.id} className="rounded-xl border border-white/5 px-3 py-2.5">
                <p className="text-sm text-white">{e.subject}</p>
                <p className="text-xs text-muted">
                  {e.to} · {e.type} · {formatDate(e.createdAt)}
                </p>
              </div>
            ))}
            {data.emails.length === 0 ? (
              <p className="text-sm text-muted">No emails sent yet.</p>
            ) : null}
          </div>
        </section>

        <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-sm font-medium text-white">Notifications</h2>
            <Link href="/admin/notifications" className="text-xs text-purple hover:underline">
              Open
            </Link>
          </div>
          <div className="space-y-2">
            {data.notifications.map((n) => (
              <div key={n.id} className="rounded-xl border border-white/5 px-3 py-2.5">
                <p className="text-sm text-white">{n.title}</p>
                <p className="text-xs text-muted">{n.body}</p>
              </div>
            ))}
            {data.notifications.length === 0 ? (
              <p className="text-sm text-muted">No notifications.</p>
            ) : null}
          </div>
        </section>
      </div>
    </div>
  );
}
