"use client";

import { motion } from "framer-motion";
import { useState } from "react";

const nodes = [
  { id: "trigger", label: "Trigger", x: 8, y: 40, color: "border-purple/40 bg-purple-soft" },
  { id: "agent", label: "AI Employee", x: 36, y: 20, color: "border-emerald/40 bg-emerald-soft" },
  { id: "tool", label: "Tool Call", x: 36, y: 60, color: "border-amber-300/40 bg-amber-300/10" },
  { id: "memory", label: "Memory", x: 64, y: 40, color: "border-white/20 bg-white/[0.04]" },
  { id: "output", label: "Output", x: 88, y: 40, color: "border-emerald/40 bg-emerald-soft" },
];

export default function AutomationPage() {
  const [running, setRunning] = useState(false);
  const [step, setStep] = useState(0);

  const run = () => {
    setRunning(true);
    setStep(0);
    let i = 0;
    const t = setInterval(() => {
      i += 1;
      setStep(i);
      if (i >= nodes.length) {
        clearInterval(t);
        setRunning(false);
      }
    }, 700);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-white">Automation</h1>
          <p className="mt-1 text-sm text-muted">
            Workflow builder demo — visualize agent pipelines.
          </p>
        </div>
        <button
          type="button"
          onClick={run}
          disabled={running}
          className="rounded-xl bg-purple px-4 py-2.5 text-sm font-medium text-white disabled:opacity-50"
        >
          {running ? "Running…" : "Run workflow"}
        </button>
      </div>

      <div className="relative min-h-[420px] overflow-hidden rounded-2xl border border-white/10 bg-[radial-gradient(circle_at_30%_20%,rgba(124,92,255,0.12),transparent_40%),radial-gradient(circle_at_70%_70%,rgba(34,197,94,0.08),transparent_35%),#0a0b10] p-6">
        <svg className="pointer-events-none absolute inset-0 h-full w-full opacity-40">
          <line x1="16%" y1="46%" x2="40%" y2="28%" stroke="#7c5cff" strokeWidth="1.5" />
          <line x1="16%" y1="46%" x2="40%" y2="68%" stroke="#7c5cff" strokeWidth="1.5" />
          <line x1="48%" y1="28%" x2="68%" y2="46%" stroke="#22c55e" strokeWidth="1.5" />
          <line x1="48%" y1="68%" x2="68%" y2="46%" stroke="#fcd34d" strokeWidth="1.5" />
          <line x1="74%" y1="46%" x2="90%" y2="46%" stroke="#22c55e" strokeWidth="1.5" />
        </svg>

        {nodes.map((n, i) => (
          <motion.div
            key={n.id}
            animate={{
              scale: step > i ? 1.05 : 1,
              boxShadow:
                step > i
                  ? "0 0 24px rgba(124,92,255,0.35)"
                  : "0 0 0 rgba(0,0,0,0)",
            }}
            className={`absolute w-36 -translate-x-1/2 -translate-y-1/2 rounded-2xl border px-3 py-3 text-center ${n.color}`}
            style={{ left: `${n.x}%`, top: `${n.y}%` }}
          >
            <p className="text-xs font-medium text-white">{n.label}</p>
            <p className="mt-1 text-[10px] text-muted-2">{n.id}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        {[
          "When ticket created → Sophia replies",
          "When lead scores > 80 → Alex outreaches",
          "Every Monday → Lucas sends digest",
        ].map((w) => (
          <div
            key={w}
            className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-muted"
          >
            {w}
          </div>
        ))}
      </div>
    </div>
  );
}
