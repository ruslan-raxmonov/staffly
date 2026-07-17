"use client";

import {
  demoActivity,
  demoEmployees,
  demoKpis,
  demoTasks,
} from "@/lib/demo-data";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function DashboardOverviewPage() {
  const running = demoTasks.filter((t) => t.status === "running");

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-white md:text-3xl">
          Operations overview
        </h1>
        <p className="mt-1 text-sm text-muted">
          Your AI workforce is live. Everything below is demo data — no backend AI yet.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        {demoKpis.map((k, i) => (
          <motion.div
            key={k.label}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.05] to-transparent p-5"
          >
            <p className="text-xs text-muted-2">{k.label}</p>
            <p className="mt-2 text-3xl font-semibold tracking-tight text-white">
              {k.value}
            </p>
            <p className="mt-1 text-[11px] text-emerald">{k.delta}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-sm font-medium text-white">AI Employees</h2>
            <Link href="/dashboard/employees" className="text-xs text-purple">
              View all
            </Link>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {demoEmployees.map((e) => (
              <Link
                key={e.id}
                href={`/dashboard/employees/${e.id}`}
                className="flex items-center gap-3 rounded-xl border border-white/8 bg-white/[0.02] p-3 transition hover:border-purple/30"
              >
                <div className="relative h-11 w-11 overflow-hidden rounded-full border border-white/10">
                  <Image src={e.avatar} alt={e.name} fill className="object-cover" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-white">{e.name}</p>
                  <p className="truncate text-xs text-muted">{e.role}</p>
                </div>
                <span className="rounded-full border border-emerald/25 bg-emerald-soft px-2 py-0.5 text-[10px] text-emerald">
                  {e.status}
                </span>
              </Link>
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-sm font-medium text-white">Recent activity</h2>
            <Link href="/dashboard/operations" className="text-xs text-purple">
              Live ops
            </Link>
          </div>
          <div className="space-y-3">
            {demoActivity.map((a) => (
              <div key={a.text} className="flex gap-3 border-b border-white/5 pb-3 last:border-0">
                <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-purple pulse-dot" />
                <div>
                  <p className="text-sm text-white">{a.text}</p>
                  <p className="text-[11px] text-muted-2">{a.time}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-sm font-medium text-white">Running tasks</h2>
          <Link href="/dashboard/tasks" className="text-xs text-purple">
            Kanban
          </Link>
        </div>
        <div className="grid gap-3 md:grid-cols-3">
          {running.map((t) => (
            <div
              key={t.id}
              className="rounded-xl border border-white/8 bg-[#0d0f16] p-4"
            >
              <div className="mb-2 flex items-center justify-between">
                <span className="rounded-full border border-purple/30 bg-purple-soft px-2 py-0.5 text-[10px] text-purple">
                  {t.priority}
                </span>
                <span className="text-[11px] text-muted-2">ETA {t.eta}</span>
              </div>
              <p className="text-sm font-medium text-white">{t.title}</p>
              <p className="mt-2 text-xs text-muted">{t.employee}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
