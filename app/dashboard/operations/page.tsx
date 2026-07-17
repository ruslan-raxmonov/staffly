"use client";

import { demoEmployees, opsLogTemplates } from "@/lib/demo-data";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

type LogLine = {
  id: number;
  text: string;
  agent: string;
  time: string;
};

export default function OperationsPage() {
  const [logs, setLogs] = useState<LogLine[]>([]);

  useEffect(() => {
    let id = 0;
    const push = () => {
      const agent =
        demoEmployees[Math.floor(Math.random() * demoEmployees.length)];
      const text =
        opsLogTemplates[Math.floor(Math.random() * opsLogTemplates.length)];
      const time = new Date().toLocaleTimeString();
      setLogs((prev) =>
        [{ id: ++id, text, agent: agent.name, time }, ...prev].slice(0, 40)
      );
    };
    push();
    const t = setInterval(push, 1600);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-white">Operations Center</h1>
        <p className="mt-1 text-sm text-muted">
          Live command screen — animated demo logs of your AI workforce.
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-[1fr_280px]">
        <section className="relative min-h-[520px] overflow-hidden rounded-2xl border border-emerald/20 bg-[#05060a] p-4 shadow-[0_0_60px_rgba(34,197,94,0.08)]">
          <div className="mb-3 flex items-center justify-between border-b border-white/5 pb-3">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald pulse-dot" />
              <span className="text-xs font-medium uppercase tracking-[0.16em] text-emerald">
                Live
              </span>
            </div>
            <span className="font-mono text-[11px] text-muted-2">
              stream://ops.staffly/main
            </span>
          </div>
          <div className="space-y-2 font-mono text-[12px] leading-relaxed">
            <AnimatePresence initial={false}>
              {logs.map((l) => (
                <motion.div
                  key={l.id}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="rounded-lg border border-white/5 bg-white/[0.02] px-3 py-2"
                >
                  <span className="text-muted-2">[{l.time}]</span>{" "}
                  <span className="text-purple">{l.agent}</span>{" "}
                  <span className="text-emerald/90">{l.text}</span>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </section>

        <aside className="space-y-3">
          <h2 className="text-sm font-medium text-white">Active agents</h2>
          {demoEmployees.map((e) => (
            <div
              key={e.id}
              className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-3"
            >
              <div className="relative h-10 w-10 overflow-hidden rounded-full">
                <Image src={e.avatar} alt={e.name} fill className="object-cover" />
              </div>
              <div>
                <p className="text-sm text-white">{e.name}</p>
                <p className="text-[11px] text-emerald">{e.status}</p>
              </div>
            </div>
          ))}
        </aside>
      </div>
    </div>
  );
}
