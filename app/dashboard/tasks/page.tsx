"use client";

import { demoTasks, DemoTask, DemoTaskStatus } from "@/lib/demo-data";
import { useMemo, useState } from "react";

const columns: { key: DemoTaskStatus; title: string }[] = [
  { key: "todo", title: "Todo" },
  { key: "running", title: "Running" },
  { key: "completed", title: "Completed" },
];

const priorityColor = {
  Low: "text-muted-2 border-white/10",
  Medium: "text-amber-200 border-amber-300/30",
  High: "text-red-300 border-red-400/30",
};

export default function TasksPage() {
  const [tasks, setTasks] = useState(demoTasks);

  const byCol = useMemo(() => {
    const map: Record<DemoTaskStatus, DemoTask[]> = {
      todo: [],
      running: [],
      completed: [],
    };
    for (const t of tasks) map[t.status].push(t);
    return map;
  }, [tasks]);

  const move = (id: string, status: DemoTaskStatus) => {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, status } : t)));
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-white">Tasks</h1>
        <p className="mt-1 text-sm text-muted">
          Kanban board — drag-free demo: click a column button to move cards.
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        {columns.map((col) => (
          <div
            key={col.key}
            className="rounded-2xl border border-white/10 bg-white/[0.02] p-3"
          >
            <div className="mb-3 flex items-center justify-between px-1">
              <h2 className="text-sm font-medium text-white">{col.title}</h2>
              <span className="rounded-full bg-white/5 px-2 py-0.5 text-[11px] text-muted-2">
                {byCol[col.key].length}
              </span>
            </div>
            <div className="space-y-2">
              {byCol[col.key].map((t) => (
                <div
                  key={t.id}
                  className="rounded-xl border border-white/10 bg-[#0d0f16] p-3"
                >
                  <div className="mb-2 flex items-center justify-between">
                    <span
                      className={`rounded-full border px-2 py-0.5 text-[10px] ${priorityColor[t.priority]}`}
                    >
                      {t.priority}
                    </span>
                    <span className="text-[11px] text-muted-2">{t.eta}</span>
                  </div>
                  <p className="text-sm font-medium text-white">{t.title}</p>
                  <p className="mt-1 text-xs text-muted">{t.employee}</p>
                  <div className="mt-3 flex flex-wrap gap-1">
                    {columns
                      .filter((c) => c.key !== t.status)
                      .map((c) => (
                        <button
                          key={c.key}
                          type="button"
                          onClick={() => move(t.id, c.key)}
                          className="rounded-lg border border-white/10 px-2 py-1 text-[10px] text-muted-2 hover:border-purple/40 hover:text-white"
                        >
                          → {c.title}
                        </button>
                      ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
