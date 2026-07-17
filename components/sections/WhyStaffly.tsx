"use client";

import { Reveal } from "@/components/motion/Reveal";
import { Section } from "@/components/ui/Section";
import { whyStaffly } from "@/lib/copy";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import {
  BarChart3,
  Box,
  Brain,
  Layers,
  Monitor,
  Sparkles,
} from "lucide-react";
import { MouseEvent, useState } from "react";

const icons = {
  monitor: Monitor,
  brain: Brain,
  memory: Layers,
  jarvis: Sparkles,
  office: Box,
  chart: BarChart3,
};

function FeatureCard({
  feature,
  index,
}: {
  feature: (typeof whyStaffly.features)[number];
  index: number;
}) {
  const Icon = icons[feature.icon as keyof typeof icons] ?? Monitor;
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [hover, setHover] = useState(false);

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  const glow = useMotionTemplate`radial-gradient(320px circle at ${mouseX}px ${mouseY}px, ${
    feature.accent === "emerald"
      ? "rgba(34,197,94,0.18)"
      : "rgba(124,92,255,0.22)"
  }, transparent 55%)`;

  return (
    <motion.div
      onMouseMove={onMove}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.25 }}
      className="group relative h-full overflow-hidden rounded-[20px] border border-white/10 bg-white/[0.03] p-6 md:p-7"
    >
      <motion.div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: glow }}
      />

      <div
        className={`pointer-events-none absolute -right-8 -top-8 h-36 w-36 rounded-full blur-3xl transition-opacity duration-500 ${
          hover ? "opacity-70" : "opacity-30"
        } ${
          feature.accent === "emerald" ? "bg-emerald/25" : "bg-purple/30"
        }`}
      />

      <div className="relative flex h-full flex-col">
        <div className="mb-5 flex items-start justify-between gap-3">
          <div
            className={`flex h-12 w-12 items-center justify-center rounded-2xl border ${
              feature.accent === "emerald"
                ? "border-emerald/25 bg-emerald-soft text-emerald"
                : "border-purple/25 bg-purple-soft text-purple"
            }`}
          >
            <Icon size={20} />
          </div>
          <span className="font-mono text-xs text-white/25">
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>

        <h3 className="text-lg font-semibold tracking-tight text-white">
          {feature.title}
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-muted">
          {feature.description}
        </p>

        <div
          className={`mt-5 h-px w-12 transition-all duration-300 group-hover:w-20 ${
            feature.accent === "emerald" ? "bg-emerald/50" : "bg-purple/50"
          }`}
        />
      </div>
    </motion.div>
  );
}

export function WhyStaffly() {
  return (
    <Section id="mahsulot" className="overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-0 top-1/3 h-64 w-64 rounded-full bg-purple/10 blur-[100px]" />
        <div className="absolute bottom-10 right-0 h-56 w-56 rounded-full bg-emerald/10 blur-[90px]" />
      </div>

      <div className="mb-14 grid items-end gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <Reveal>
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.22em] text-purple">
            {whyStaffly.eyebrow}
          </p>
          <h2 className="text-3xl font-semibold tracking-tight text-white md:text-5xl lg:text-[3.25rem] lg:leading-[1.1]">
            Nima uchun{" "}
            <span className="bg-gradient-to-r from-white via-purple to-emerald bg-clip-text text-transparent">
              STɅFFLY
            </span>
            ?
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="max-w-md text-base leading-relaxed text-muted md:text-lg lg:justify-self-end lg:text-right">
            {whyStaffly.subtitle}
          </p>
        </Reveal>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {whyStaffly.features.map((feature, i) => (
          <Reveal key={feature.title} delay={0.05 + i * 0.04}>
            <FeatureCard feature={feature} index={i} />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
