"use client";

import { analyticsSeries } from "@/lib/demo-data";

function Bars({
  data,
  color,
}: {
  data: number[];
  color: string;
}) {
  const max = Math.max(...data);
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  return (
    <div className="flex h-44 items-end gap-2">
      {data.map((v, i) => (
        <div key={days[i]} className="flex flex-1 flex-col items-center gap-2">
          <div
            className={`w-full rounded-t-md ${color}`}
            style={{ height: `${(v / max) * 100}%`, minHeight: 6 }}
          />
          <span className="text-[10px] text-muted-2">{days[i]}</span>
        </div>
      ))}
    </div>
  );
}

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-white">Analytics</h1>
        <p className="mt-1 text-sm text-muted">
          Business impact, ROI, and completion — generated demo metrics.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          ["Hours Saved", "94", "+12 vs last week"],
          ["Task Completion", "138", "Today"],
          ["ROI Multiple", "3.1×", "Estimated"],
          ["Business Impact", "$48.2k", "Value created"],
        ].map(([l, v, s]) => (
          <div
            key={l}
            className="rounded-2xl border border-white/10 bg-white/[0.03] p-5"
          >
            <p className="text-xs text-muted-2">{l}</p>
            <p className="mt-2 text-3xl font-semibold text-white">{v}</p>
            <p className="mt-1 text-[11px] text-emerald">{s}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
          <h2 className="mb-4 text-sm font-medium text-white">Hours saved</h2>
          <Bars data={analyticsSeries.hoursSaved} color="bg-gradient-to-t from-purple/50 to-purple" />
        </section>
        <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
          <h2 className="mb-4 text-sm font-medium text-white">Tasks completed</h2>
          <Bars data={analyticsSeries.tasksCompleted} color="bg-gradient-to-t from-emerald/40 to-emerald" />
        </section>
      </div>

      <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
        <h2 className="mb-4 text-sm font-medium text-white">ROI trend</h2>
        <div className="relative h-40">
          <svg viewBox="0 0 280 100" className="h-full w-full overflow-visible">
            <defs>
              <linearGradient id="roiFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#7c5cff" stopOpacity="0.35" />
                <stop offset="100%" stopColor="#7c5cff" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path
              d="M0,80 L46,72 L93,65 L140,52 L186,40 L233,28 L280,12 L280,100 L0,100 Z"
              fill="url(#roiFill)"
            />
            <path
              d="M0,80 L46,72 L93,65 L140,52 L186,40 L233,28 L280,12"
              fill="none"
              stroke="#7c5cff"
              strokeWidth="2.5"
            />
          </svg>
        </div>
        <p className="mt-2 text-xs text-muted">
          Estimated productivity ROI based on hours saved × blended hourly cost.
        </p>
      </section>
    </div>
  );
}
