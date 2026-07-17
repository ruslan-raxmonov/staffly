"use client";

import { demoEmployees, demoTasks } from "@/lib/demo-data";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";

const tabs = [
  "Profile",
  "Performance",
  "Memory",
  "Knowledge",
  "Prompt",
  "Permissions",
  "Integrations",
  "Tasks",
  "Activity",
] as const;

export default function EmployeeDetailPage() {
  const { id } = useParams<{ id: string }>();
  const employee = demoEmployees.find((e) => e.id === id) || demoEmployees[0];
  const [tab, setTab] = useState<(typeof tabs)[number]>("Profile");
  const tasks = demoTasks.filter((t) => t.employee === employee.name);

  return (
    <div className="space-y-6">
      <Link href="/dashboard/employees" className="text-xs text-muted-2 hover:text-white">
        ← Back to employees
      </Link>

      <div className="flex flex-col gap-5 rounded-2xl border border-white/10 bg-white/[0.03] p-5 sm:flex-row sm:items-center">
        <div className="relative h-24 w-24 overflow-hidden rounded-2xl border border-white/10">
          <Image src={employee.avatar} alt={employee.name} fill className="object-cover" />
        </div>
        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-2xl font-semibold text-white">{employee.name}</h1>
            <span className="rounded-full border border-emerald/30 bg-emerald-soft px-2.5 py-1 text-[11px] text-emerald">
              {employee.status}
            </span>
          </div>
          <p className="mt-1 text-sm text-muted">{employee.role}</p>
        </div>
        <div className="grid grid-cols-3 gap-3 text-center">
          <div>
            <p className="text-xl font-semibold text-white">{employee.tasksToday}</p>
            <p className="text-[10px] text-muted-2">Tasks today</p>
          </div>
          <div>
            <p className="text-xl font-semibold text-white">{employee.successRate}%</p>
            <p className="text-[10px] text-muted-2">Success</p>
          </div>
          <div>
            <p className="text-xl font-semibold text-white">{employee.hoursSaved}h</p>
            <p className="text-[10px] text-muted-2">Saved</p>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {tabs.map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setTab(t)}
            className={`rounded-full border px-3 py-1.5 text-xs transition ${
              tab === t
                ? "border-purple/40 bg-purple-soft text-white"
                : "border-white/10 text-muted-2 hover:text-white"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
        {tab === "Profile" ? (
          <p className="text-sm leading-relaxed text-muted">
            {employee.name} is a production-ready {employee.role.toLowerCase()} running inside
            your Staffly workspace. Status updates live from the Operations Center. This profile
            is demo data for the approval-gated product shell.
          </p>
        ) : null}
        {tab === "Performance" ? (
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              ["Tasks completed", employee.tasksToday * 4],
              ["Avg response", "1.4s"],
              ["Escalation rate", "2.1%"],
            ].map(([l, v]) => (
              <div key={l as string} className="rounded-xl border border-white/8 p-4">
                <p className="text-xs text-muted-2">{l}</p>
                <p className="mt-2 text-2xl font-semibold text-white">{v}</p>
              </div>
            ))}
          </div>
        ) : null}
        {tab === "Memory" ? (
          <ul className="space-y-2">
            {employee.memory.map((m) => (
              <li key={m} className="rounded-xl border border-white/8 px-3 py-2.5 text-sm text-muted">
                {m}
              </li>
            ))}
          </ul>
        ) : null}
        {tab === "Knowledge" ? (
          <ul className="space-y-2">
            {employee.knowledge.map((k) => (
              <li key={k} className="rounded-xl border border-white/8 px-3 py-2.5 text-sm text-white">
                {k}
              </li>
            ))}
          </ul>
        ) : null}
        {tab === "Prompt" ? (
          <pre className="whitespace-pre-wrap rounded-xl border border-white/8 bg-black/30 p-4 text-sm text-muted-2">
            {employee.prompt}
          </pre>
        ) : null}
        {tab === "Permissions" ? (
          <div className="flex flex-wrap gap-2">
            {employee.permissions.map((p) => (
              <span
                key={p}
                className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-muted-2"
              >
                {p}
              </span>
            ))}
          </div>
        ) : null}
        {tab === "Integrations" ? (
          <div className="flex flex-wrap gap-2">
            {employee.integrations.map((p) => (
              <span
                key={p}
                className="rounded-full border border-purple/25 bg-purple-soft px-3 py-1 text-xs text-purple"
              >
                {p}
              </span>
            ))}
          </div>
        ) : null}
        {tab === "Tasks" ? (
          <div className="space-y-2">
            {tasks.map((t) => (
              <div
                key={t.id}
                className="flex items-center justify-between rounded-xl border border-white/8 px-3 py-2.5"
              >
                <p className="text-sm text-white">{t.title}</p>
                <span className="text-[11px] capitalize text-muted-2">{t.status}</span>
              </div>
            ))}
          </div>
        ) : null}
        {tab === "Activity" ? (
          <div className="space-y-3 text-sm text-muted">
            <p>{employee.name} started task queue for today.</p>
            <p>Synced knowledge base documents.</p>
            <p>Updated vector memory with 3 new preferences.</p>
          </div>
        ) : null}
      </div>
    </div>
  );
}
