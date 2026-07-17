"use client";

import { motion } from "framer-motion";

const employees = [
  { name: "Aisha", role: "Sales", status: "Ishlamoqda" },
  { name: "Noah", role: "Support", status: "Faol" },
  { name: "Mira", role: "Content", status: "Faol" },
  { name: "Jarvis", role: "Chief of Staff", status: "Nazorat" },
];

const logs = [
  { t: "14:02", msg: "Sales Agent — lead kvalifikatsiya qilindi" },
  { t: "14:01", msg: "Jarvis — vazifa navbati optimallashtirildi" },
  { t: "13:58", msg: "Support Agent — tiket yopildi #4821" },
  { t: "13:55", msg: "Memory sync — 12 yangi bilim" },
];

export function DashboardPreview() {
  return (
    <div className="relative float">
      <div className="absolute -inset-6 rounded-[28px] bg-gradient-to-br from-purple/25 via-transparent to-emerald/15 blur-2xl" />
      <div className="glass relative overflow-hidden rounded-[20px] p-4 shadow-[0_30px_80px_rgba(0,0,0,0.45)] md:p-5">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <p className="text-xs text-muted">Operations Center</p>
            <h3 className="text-sm font-semibold text-white">Real-time overview</h3>
          </div>
          <div className="flex items-center gap-2 rounded-full border border-emerald/30 bg-emerald-soft px-2.5 py-1">
            <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-emerald" />
            <span className="text-[10px] font-medium text-emerald">Live</span>
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-3">
            <p className="mb-2 text-[11px] text-muted">AI Employees</p>
            <div className="space-y-2">
              {employees.map((e, i) => (
                <motion.div
                  key={e.name}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + i * 0.08 }}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center gap-2">
                    <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-purple/20 text-[10px] font-semibold text-purple">
                      {e.name.slice(0, 1)}
                    </div>
                    <div>
                      <p className="text-xs text-white">{e.name}</p>
                      <p className="text-[10px] text-muted">{e.role}</p>
                    </div>
                  </div>
                  <span className="text-[10px] text-emerald">{e.status}</span>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-3">
            <p className="mb-2 text-[11px] text-muted">Real-time logs</p>
            <div className="space-y-2">
              {logs.map((l, i) => (
                <motion.div
                  key={l.t + l.msg}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.35 + i * 0.1 }}
                  className="flex gap-2 text-[10px]"
                >
                  <span className="shrink-0 font-mono text-purple">{l.t}</span>
                  <span className="text-muted-2">{l.msg}</span>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-3">
            <p className="mb-3 text-[11px] text-muted">Analytics</p>
            <div className="flex h-16 items-end gap-1.5">
              {[40, 65, 45, 80, 55, 90, 70, 85, 60, 95].map((h, i) => (
                <motion.div
                  key={i}
                  className="flex-1 rounded-t bg-gradient-to-t from-purple/40 to-purple"
                  initial={{ height: 0 }}
                  animate={{ height: `${h}%` }}
                  transition={{ delay: 0.5 + i * 0.05, duration: 0.5 }}
                />
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-3">
              <div className="mb-2 flex items-center justify-between">
                <p className="text-[11px] text-muted">Notifications</p>
                <span className="rounded-full bg-purple/20 px-1.5 text-[9px] text-purple">
                  3
                </span>
              </div>
              <p className="text-[11px] text-muted-2">Yangi vazifa tayinlandi · Jarvis</p>
            </div>
            <div className="rounded-2xl border border-white/5 bg-gradient-to-br from-purple/10 to-emerald/5 p-3">
              <p className="text-[11px] text-muted">3D Office Preview</p>
              <div className="mt-2 flex h-12 items-center justify-center gap-2">
                {[0, 1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="h-8 w-6 rounded-md border border-white/10 bg-white/5"
                    style={{ transform: `perspective(100px) rotateY(${i * 4}deg)` }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
