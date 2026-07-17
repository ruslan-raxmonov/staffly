"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const queue = [
  { id: "T-1042", title: "Lead follow-up", agent: "Sales", prio: "Yuqori" },
  { id: "T-1043", title: "Ticket triage", agent: "Support", prio: "O'rta" },
  { id: "T-1044", title: "Content draft", agent: "Content", prio: "Past" },
  { id: "T-1045", title: "Weekly report", agent: "Finance", prio: "O'rta" },
];

const activity = [
  "Support Agent javob yubordi",
  "Jarvis vazifani qayta taqsimladi",
  "Research Agent hisobot tayyorladi",
  "Memory sync yakunlandi",
];

export function OperationsMockup() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 900);
    return () => clearTimeout(t);
  }, []);

  if (loading) {
    return (
      <div className="glass overflow-hidden rounded-[20px] p-5 md:p-6">
        <div className="mb-4 h-6 w-48 skeleton rounded-lg" />
        <div className="grid gap-4 lg:grid-cols-3">
          {[0, 1, 2].map((i) => (
            <div key={i} className="h-40 skeleton rounded-2xl" />
          ))}
        </div>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <div className="h-36 skeleton rounded-2xl" />
          <div className="h-36 skeleton rounded-2xl" />
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass overflow-hidden rounded-[20px] p-4 shadow-[0_40px_100px_rgba(0,0,0,0.4)] md:p-6"
    >
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h3 className="text-lg font-semibold text-white">Operations Center</h3>
          <p className="text-sm text-muted">Real-time activity · System health</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="pulse-dot h-2 w-2 rounded-full bg-emerald" />
          <span className="text-xs text-emerald">Barcha tizimlar barqaror</span>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-4 lg:col-span-1">
          <p className="mb-3 text-xs font-medium text-muted">Task queue</p>
          <div className="space-y-2.5">
            {queue.map((t, i) => (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="flex items-center justify-between rounded-xl border border-white/5 bg-background/40 px-3 py-2.5"
              >
                <div>
                  <p className="text-xs font-medium text-white">{t.title}</p>
                  <p className="text-[10px] text-muted">
                    {t.id} · {t.agent}
                  </p>
                </div>
                <span className="rounded-full bg-purple/15 px-2 py-0.5 text-[10px] text-purple">
                  {t.prio}
                </span>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-4">
          <p className="mb-3 text-xs font-medium text-muted">Real-time activity</p>
          <div className="space-y-3">
            {activity.map((a, i) => (
              <div key={a} className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald pulse-dot" />
                <div>
                  <p className="text-xs text-white">{a}</p>
                  <p className="text-[10px] text-muted">{i + 1} daqiqa oldin</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-4">
          <p className="mb-3 text-xs font-medium text-muted">Performance</p>
          <div className="flex h-28 items-end gap-2">
            {[55, 70, 48, 88, 62, 95, 78, 84].map((h, i) => (
              <motion.div
                key={i}
                className="flex-1 rounded-t-md bg-gradient-to-t from-emerald/30 to-emerald"
                initial={{ height: 0 }}
                whileInView={{ height: `${h}%` }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 + i * 0.06, duration: 0.5 }}
              />
            ))}
          </div>
          <div className="mt-4 space-y-2">
            <div>
              <div className="mb-1 flex justify-between text-[10px] text-muted">
                <span>CPU</span>
                <span>42%</span>
              </div>
              <div className="h-1.5 overflow-hidden rounded-full bg-white/5">
                <div className="h-full w-[42%] rounded-full bg-purple" />
              </div>
            </div>
            <div>
              <div className="mb-1 flex justify-between text-[10px] text-muted">
                <span>Memory</span>
                <span>67%</span>
              </div>
              <div className="h-1.5 overflow-hidden rounded-full bg-white/5">
                <div className="h-full w-[67%] rounded-full bg-emerald" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-4">
          <p className="mb-3 text-xs font-medium text-muted">System logs</p>
          <div className="space-y-1.5 font-mono text-[10px] text-muted-2">
            <p>
              <span className="text-emerald">INFO</span> agent.sales started task T-1042
            </p>
            <p>
              <span className="text-purple">SYNC</span> shared-memory updated (+4)
            </p>
            <p>
              <span className="text-emerald">OK</span> jarvis.scheduler heartbeat
            </p>
            <p>
              <span className="text-muted">DEBUG</span> api.latency p95=112ms
            </p>
          </div>
        </div>
        <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-4">
          <p className="mb-3 text-xs font-medium text-muted">Alerts · AI Employees</p>
          <div className="grid grid-cols-2 gap-2">
            {["Sales", "Support", "HR", "Content", "Marketing", "Dev"].map((name) => (
              <div
                key={name}
                className="flex items-center gap-2 rounded-xl border border-white/5 px-2.5 py-2"
              >
                <span className="h-2 w-2 rounded-full bg-emerald pulse-dot" />
                <span className="text-xs text-white">{name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
