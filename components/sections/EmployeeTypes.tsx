"use client";

import { Reveal } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/Section";
import { employeeTypes } from "@/lib/copy";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
} from "framer-motion";
import Image from "next/image";
import { MouseEvent, useState } from "react";

function AgentCard({
  agent,
  index,
}: {
  agent: (typeof employeeTypes.agents)[number];
  index: number;
}) {
  const reduce = useReducedMotion();
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [hover, setHover] = useState(false);
  const isEmerald = agent.accent === "emerald";

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  const glow = useMotionTemplate`radial-gradient(280px circle at ${mouseX}px ${mouseY}px, ${
    isEmerald ? "rgba(34,197,94,0.16)" : "rgba(124,92,255,0.2)"
  }, transparent 55%)`;

  return (
    <motion.article
      onMouseMove={onMove}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      whileHover={reduce ? undefined : { y: -6 }}
      transition={{ duration: 0.28 }}
      className="group relative flex w-[260px] shrink-0 flex-col overflow-hidden rounded-[20px] border border-white/10 bg-white/[0.03] sm:w-[280px]"
    >
      <motion.div
        className="pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: glow }}
      />

      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={agent.image}
          alt={agent.role}
          fill
          sizes="280px"
          className="object-cover object-[center_15%] transition-transform duration-700 ease-out group-hover:scale-105"
          priority={index < 3}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#08090d] via-[#08090d]/35 to-transparent" />
        <div
          className={`pointer-events-none absolute -bottom-6 left-1/2 h-20 w-36 -translate-x-1/2 rounded-full blur-3xl transition-opacity duration-500 ${
            hover ? "opacity-70" : "opacity-40"
          } ${isEmerald ? "bg-emerald/30" : "bg-purple/35"}`}
        />

        <span
          className={`absolute left-3.5 top-3.5 rounded-full px-2.5 py-1 text-[10px] font-medium backdrop-blur-md ${
            agent.status === "Faol"
              ? "border border-emerald/30 bg-emerald-soft text-emerald"
              : agent.status === "Kuzatuv"
                ? "border border-purple/30 bg-purple-soft text-purple"
                : "border border-white/15 bg-white/10 text-muted-2"
          }`}
        >
          {agent.status === "Faol" ? (
            <span className="mr-1.5 inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-emerald align-middle" />
          ) : null}
          {agent.status}
        </span>
      </div>

      <div className="relative z-10 flex flex-1 flex-col px-4 pb-4 pt-1">
        <div className="mb-2 flex items-end justify-between gap-2">
          <div className="min-w-0">
            <h3 className="truncate text-base font-semibold tracking-tight text-white">
              {agent.role}
            </h3>
            <p className="text-[11px] text-muted">AI Employee</p>
          </div>
          <span
            className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border text-[10px] font-semibold ${
              isEmerald
                ? "border-emerald/25 bg-emerald-soft text-emerald"
                : "border-purple/25 bg-purple-soft text-purple"
            }`}
          >
            {agent.avatar}
          </span>
        </div>

        <p className="mb-3 line-clamp-2 text-sm leading-relaxed text-muted">
          {agent.blurb}
        </p>

        <div className="mt-auto flex flex-wrap gap-1.5">
          {agent.tools.map((tool) => (
            <span
              key={tool}
              className="rounded-lg border border-white/10 bg-white/[0.04] px-2 py-0.5 text-[10px] text-muted-2"
            >
              {tool}
            </span>
          ))}
        </div>

        <motion.div
          className={`mt-3 h-px ${isEmerald ? "bg-emerald/50" : "bg-purple/50"}`}
          animate={{ width: hover ? 48 : 28 }}
          transition={{ duration: 0.3 }}
        />
      </div>
    </motion.article>
  );
}

export function EmployeeTypes() {
  const reduce = useReducedMotion();
  const agents = [...employeeTypes.agents, ...employeeTypes.agents];

  return (
    <section className="relative overflow-hidden py-24 md:py-32">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <motion.div
          className="absolute right-0 top-1/4 h-64 w-64 rounded-full bg-purple/10 blur-[110px]"
          animate={
            reduce ? undefined : { opacity: [0.3, 0.55, 0.3], y: [0, 20, 0] }
          }
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-10 left-0 h-56 w-56 rounded-full bg-emerald/10 blur-[100px]"
          animate={
            reduce ? undefined : { opacity: [0.25, 0.5, 0.25], y: [0, -16, 0] }
          }
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <Reveal>
          <SectionHeading
            title={employeeTypes.title}
            subtitle={employeeTypes.subtitle}
          />
        </Reveal>
      </div>

      <div className="agents-marquee relative overflow-hidden">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-[#08090d] to-transparent md:w-24" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-[#08090d] to-transparent md:w-24" />

        <div
          className={`agents-marquee-track flex w-max items-stretch gap-4 px-5 md:gap-5 md:px-8 ${
            reduce ? "!animate-none" : ""
          }`}
        >
          {agents.map((agent, i) => (
            <AgentCard
              key={`${agent.role}-${i}`}
              agent={agent}
              index={i % employeeTypes.agents.length}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
