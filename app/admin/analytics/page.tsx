"use client";

import { Application } from "@/lib/types";
import { useEffect, useState } from "react";

type Stats = {
  today: number;
  approved: number;
  rejected: number;
  conversionRate: number;
  pending: number;
  total: number;
  last7Days: number;
  topCountries: { name: string; count: number }[];
  topIndustries: { name: string; count: number }[];
  byStatus: Record<string, number>;
};

export default function AdminAnalyticsPage() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [recent, setRecent] = useState<Application[]>([]);

  useEffect(() => {
    fetch("/api/admin/overview")
      .then((r) => r.json())
      .then((d) => {
        setStats(d.stats);
        setRecent(d.recent || []);
      });
  }, []);

  if (!stats) return <p className="text-sm text-muted">Loading analytics…</p>;

  const weekBars = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - i));
    const key = d.toISOString().slice(0, 10);
    const count = recent.filter((a) => a.createdAt.startsWith(key)).length;
    return { label: d.toLocaleDateString(undefined, { weekday: "short" }), count };
  });
  const maxBar = Math.max(1, ...weekBars.map((b) => b.count));

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold text-white">Analytics</h1>
        <p className="mt-1 text-sm text-muted">
          Approval funnel and acquisition insights.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          ["Applications Today", stats.today],
          ["Approved", stats.approved],
          ["Rejected", stats.rejected],
          ["Conversion Rate", `${stats.conversionRate}%`],
        ].map(([label, value]) => (
          <div
            key={label as string}
            className="rounded-2xl border border-white/10 bg-white/[0.03] p-5"
          >
            <p className="text-xs text-muted-2">{label}</p>
            <p className="mt-2 text-3xl font-semibold text-white">{value}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
          <h2 className="mb-6 text-sm font-medium text-white">
            Applications this week
          </h2>
          <div className="flex h-40 items-end gap-3">
            {weekBars.map((b) => (
              <div key={b.label} className="flex flex-1 flex-col items-center gap-2">
                <div
                  className="w-full rounded-t-lg bg-gradient-to-t from-purple/40 to-purple"
                  style={{ height: `${(b.count / maxBar) * 100}%`, minHeight: b.count ? 8 : 2 }}
                />
                <span className="text-[10px] text-muted-2">{b.label}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
          <h2 className="mb-4 text-sm font-medium text-white">Status mix</h2>
          <div className="space-y-3">
            {Object.entries(stats.byStatus).map(([k, v]) => {
              const pct = stats.total ? Math.round((v / stats.total) * 100) : 0;
              return (
                <div key={k}>
                  <div className="mb-1 flex justify-between text-xs">
                    <span className="capitalize text-muted-2">{k.replace("_", " ")}</span>
                    <span className="text-white">
                      {v} ({pct}%)
                    </span>
                  </div>
                  <div className="h-1.5 overflow-hidden rounded-full bg-white/5">
                    <div
                      className="h-full rounded-full bg-emerald"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
          <h2 className="mb-4 text-sm font-medium text-white">Top countries</h2>
          {stats.topCountries.map((c, i) => (
            <div
              key={c.name}
              className="flex items-center justify-between border-b border-white/5 py-2.5 text-sm last:border-0"
            >
              <span className="text-muted-2">
                {i + 1}. {c.name}
              </span>
              <span className="text-white">{c.count}</span>
            </div>
          ))}
        </section>
        <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
          <h2 className="mb-4 text-sm font-medium text-white">Top industries</h2>
          {stats.topIndustries.map((c, i) => (
            <div
              key={c.name}
              className="flex items-center justify-between border-b border-white/5 py-2.5 text-sm last:border-0"
            >
              <span className="text-muted-2">
                {i + 1}. {c.name}
              </span>
              <span className="text-white">{c.count}</span>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
}
