"use client";

import { Reveal } from "@/components/motion/Reveal";
import { Section, SectionHeading } from "@/components/ui/Section";
import { security } from "@/lib/copy";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
} from "framer-motion";
import {
  FileKey,
  KeyRound,
  Lock,
  ScrollText,
  ShieldCheck,
  Webhook,
  type LucideIcon,
} from "lucide-react";
import { MouseEvent, useState } from "react";

const icons: LucideIcon[] = [
  KeyRound,
  Lock,
  ScrollText,
  ShieldCheck,
  FileKey,
  Webhook,
];

function SecurityCard({
  card,
  index,
}: {
  card: (typeof security.cards)[number];
  index: number;
}) {
  const Icon = icons[index] ?? ShieldCheck;
  const isEmerald = index % 2 === 1;
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [hover, setHover] = useState(false);
  const reduce = useReducedMotion();

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  const glow = useMotionTemplate`radial-gradient(280px circle at ${mouseX}px ${mouseY}px, ${
    isEmerald ? "rgba(34,197,94,0.16)" : "rgba(124,92,255,0.2)"
  }, transparent 55%)`;

  return (
    <motion.div
      onMouseMove={onMove}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      whileHover={reduce ? undefined : { y: -6 }}
      transition={{ duration: 0.25 }}
      className="group relative h-full overflow-hidden rounded-[20px] border border-white/10 bg-white/[0.03] p-5 md:p-6"
    >
      <motion.div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: glow }}
      />
      <div
        className={`pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full blur-3xl transition-opacity duration-500 ${
          hover ? "opacity-60" : "opacity-25"
        } ${isEmerald ? "bg-emerald/25" : "bg-purple/30"}`}
      />

      <div className="relative">
        <div className="mb-4 flex items-start justify-between gap-3">
          <div
            className={`flex h-11 w-11 items-center justify-center rounded-2xl border ${
              isEmerald
                ? "border-emerald/25 bg-emerald-soft text-emerald"
                : "border-purple/25 bg-purple-soft text-purple"
            }`}
          >
            <Icon size={18} />
          </div>
          <span className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[10px] text-muted-2">
            {card.tag}
          </span>
        </div>

        <h3 className="text-base font-semibold tracking-tight text-white">
          {card.title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-muted">
          {card.description}
        </p>

        <motion.div
          className={`mt-5 h-px ${isEmerald ? "bg-emerald/50" : "bg-purple/50"}`}
          animate={{ width: hover ? 56 : 32 }}
          transition={{ duration: 0.3 }}
        />
      </div>
    </motion.div>
  );
}

function ShieldHero() {
  const reduce = useReducedMotion();

  return (
    <div className="relative overflow-hidden rounded-[24px] border border-white/10 bg-gradient-to-br from-purple/15 via-white/[0.03] to-emerald/10 p-6 md:p-8 lg:min-h-full">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-10 top-0 h-40 w-40 rounded-full bg-purple/20 blur-[80px]" />
        <div className="absolute -bottom-8 -right-8 h-36 w-36 rounded-full bg-emerald/15 blur-[70px]" />
      </div>

      <div className="relative flex h-full flex-col">
        <span className="mb-5 inline-flex w-fit items-center gap-2 rounded-full border border-emerald/25 bg-emerald-soft px-3 py-1 text-[11px] font-medium text-emerald">
          <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-emerald" />
          {security.badge}
        </span>

        <div className="mx-auto my-6 flex items-center justify-center md:my-8">
          <div className="relative flex h-36 w-36 items-center justify-center md:h-44 md:w-44">
            <motion.div
              className="absolute inset-0 rounded-full border border-purple/25"
              animate={reduce ? undefined : { rotate: 360 }}
              transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
              className="absolute inset-3 rounded-full border border-dashed border-emerald/30"
              animate={reduce ? undefined : { rotate: -360 }}
              transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
              className="absolute inset-0 rounded-full bg-purple/20 blur-2xl"
              animate={
                reduce
                  ? undefined
                  : { opacity: [0.35, 0.65, 0.35], scale: [0.95, 1.05, 0.95] }
              }
              transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
            />
            <div className="relative flex h-20 w-20 items-center justify-center rounded-3xl border border-white/15 bg-[#0d0f16]/80 text-purple shadow-[0_0_40px_rgba(124,92,255,0.35)] backdrop-blur-md md:h-24 md:w-24">
              <ShieldCheck size={36} className="text-purple md:h-10 md:w-10" />
            </div>

            {[
              { label: "Lock", Icon: Lock, pos: "left-0 top-4", color: "text-emerald" },
              { label: "Key", Icon: KeyRound, pos: "right-0 top-6", color: "text-purple" },
              { label: "Log", Icon: ScrollText, pos: "bottom-2 left-6", color: "text-purple" },
              { label: "API", Icon: Webhook, pos: "bottom-3 right-4", color: "text-emerald" },
            ].map((item, i) => (
              <motion.div
                key={item.label}
                className={`absolute ${item.pos} flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-[#0d0f16]/85 backdrop-blur-sm ${item.color}`}
                animate={
                  reduce
                    ? undefined
                    : { y: [0, -6, 0], opacity: [0.75, 1, 0.75] }
                }
                transition={{
                  duration: 2.8 + i * 0.3,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.2,
                }}
              >
                <item.Icon size={14} />
              </motion.div>
            ))}
          </div>
        </div>

        <p className="mx-auto max-w-sm text-center text-sm leading-relaxed text-muted md:text-base">
          {security.highlight}
        </p>

        <div className="mt-6 grid grid-cols-3 gap-2 border-t border-white/10 pt-5">
          {security.stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-sm font-semibold text-white md:text-base">
                {stat.value}
              </p>
              <p className="mt-0.5 text-[10px] text-muted-2 md:text-[11px]">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function EnterpriseSecurity() {
  const reduce = useReducedMotion();

  return (
    <Section id="resurslar" className="overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <motion.div
          className="absolute left-1/4 top-1/4 h-64 w-64 rounded-full bg-purple/10 blur-[110px]"
          animate={
            reduce ? undefined : { opacity: [0.3, 0.55, 0.3], x: [0, 18, 0] }
          }
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-16 right-1/5 h-52 w-52 rounded-full bg-emerald/10 blur-[100px]"
          animate={
            reduce ? undefined : { opacity: [0.25, 0.5, 0.25], y: [0, -14, 0] }
          }
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <Reveal>
        <SectionHeading title={security.title} subtitle={security.subtitle} />
      </Reveal>

      <div className="grid gap-5 lg:grid-cols-[0.95fr_1.05fr] lg:items-stretch">
        <Reveal>
          <ShieldHero />
        </Reveal>

        <div className="grid gap-3 sm:grid-cols-2 sm:gap-4">
          {security.cards.map((card, i) => (
            <Reveal key={card.title} delay={0.05 + i * 0.05}>
              <SecurityCard card={card} index={i} />
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
