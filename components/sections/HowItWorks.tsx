"use client";

import { Reveal } from "@/components/motion/Reveal";
import { Section, SectionHeading } from "@/components/ui/Section";
import { howItWorks } from "@/lib/copy";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
} from "framer-motion";
import {
  MessageSquare,
  PhoneCall,
  Rocket,
  Settings2,
  type LucideIcon,
} from "lucide-react";
import { MouseEvent, useEffect, useState } from "react";

const stepIcons: LucideIcon[] = [MessageSquare, PhoneCall, Settings2, Rocket];

const accents = [
  { ring: "border-purple/40", soft: "bg-purple-soft", text: "text-purple", glow: "rgba(124,92,255,0.22)", solid: "bg-purple", shadow: "glow-purple" },
  { ring: "border-emerald/40", soft: "bg-emerald-soft", text: "text-emerald", glow: "rgba(34,197,94,0.18)", solid: "bg-emerald", shadow: "glow-emerald" },
  { ring: "border-purple/40", soft: "bg-purple-soft", text: "text-purple", glow: "rgba(124,92,255,0.22)", solid: "bg-purple", shadow: "glow-purple" },
  { ring: "border-emerald/40", soft: "bg-emerald-soft", text: "text-emerald", glow: "rgba(34,197,94,0.18)", solid: "bg-emerald", shadow: "glow-emerald" },
] as const;

function StepCard({
  step,
  index,
  active,
  onHover,
}: {
  step: (typeof howItWorks.steps)[number];
  index: number;
  active: boolean;
  onHover: () => void;
}) {
  const Icon = stepIcons[index] ?? MessageSquare;
  const accent = accents[index] ?? accents[0];
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  const glow = useMotionTemplate`radial-gradient(280px circle at ${mouseX}px ${mouseY}px, ${accent.glow}, transparent 55%)`;

  return (
    <motion.div
      onMouseMove={onMove}
      onMouseEnter={onHover}
      whileHover={{ y: -8 }}
      animate={{
        borderColor: active
          ? index % 2 === 0
            ? "rgba(124,92,255,0.45)"
            : "rgba(34,197,94,0.4)"
          : "rgba(255,255,255,0.1)",
        scale: active ? 1.02 : 1,
      }}
      transition={{ duration: 0.35 }}
      className="group relative h-full overflow-hidden rounded-[20px] border border-white/10 bg-white/[0.03] p-6 text-center md:p-7"
    >
      <motion.div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: glow }}
      />

      <div
        className={`pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full blur-3xl transition-opacity duration-500 ${
          active ? "opacity-60" : "opacity-25"
        } ${index % 2 === 0 ? "bg-purple/30" : "bg-emerald/25"}`}
      />

      <div className="relative flex flex-col items-center">
        <div className="relative mb-5">
          <motion.span
            className={`absolute inset-0 rounded-2xl ${accent.solid} opacity-40 blur-md`}
            animate={
              active
                ? { scale: [1, 1.35, 1], opacity: [0.35, 0.55, 0.35] }
                : { scale: 1, opacity: 0.2 }
            }
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className={`relative flex h-14 w-14 items-center justify-center rounded-2xl border ${accent.ring} ${accent.soft} ${accent.text}`}
            animate={active ? { rotate: [0, -4, 4, 0] } : { rotate: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Icon size={22} />
          </motion.div>
          <span
            className={`absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full text-[11px] font-semibold text-white ${accent.solid} ${accent.shadow}`}
          >
            {step.step}
          </span>
        </div>

        <p className="text-sm font-medium leading-snug text-white md:text-base">
          {step.title}
        </p>

        <motion.div
          className={`mt-5 h-px ${index % 2 === 0 ? "bg-purple" : "bg-emerald"}`}
          initial={{ width: 0 }}
          whileInView={{ width: active ? 56 : 32 }}
          viewport={{ once: true }}
          animate={{ width: active ? 56 : 32, opacity: active ? 1 : 0.45 }}
          transition={{ duration: 0.45 }}
        />
      </div>
    </motion.div>
  );
}

function Connector({
  active,
  fromEmerald,
}: {
  active: boolean;
  fromEmerald: boolean;
}) {
  return (
    <div className="relative mx-1 hidden h-px w-8 shrink-0 overflow-hidden md:block lg:w-12">
      <div className="absolute inset-0 bg-white/10" />
      <motion.div
        className={`absolute inset-y-0 left-0 ${
          fromEmerald
            ? "bg-gradient-to-r from-emerald to-purple"
            : "bg-gradient-to-r from-purple to-emerald"
        }`}
        initial={{ width: "0%" }}
        whileInView={{ width: "100%" }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      />
      <motion.span
        className={`absolute top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full ${
          fromEmerald ? "bg-emerald" : "bg-purple"
        }`}
        animate={{
          left: active ? ["0%", "100%", "0%"] : "50%",
          opacity: active ? [0.4, 1, 0.4] : 0.5,
        }}
        transition={
          active
            ? { duration: 2.4, repeat: Infinity, ease: "easeInOut" }
            : { duration: 0.3 }
        }
      />
    </div>
  );
}

function MobileConnector({ active, emerald }: { active: boolean; emerald: boolean }) {
  return (
    <div className="relative mx-auto my-1 flex h-8 w-px items-center justify-center md:hidden">
      <div className="absolute inset-0 bg-white/10" />
      <motion.div
        className={`absolute left-0 top-0 w-px ${
          emerald ? "bg-emerald" : "bg-purple"
        }`}
        initial={{ height: "0%" }}
        whileInView={{ height: "100%" }}
        viewport={{ once: true }}
        transition={{ duration: 0.55 }}
      />
      <motion.span
        className={`absolute left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full ${
          emerald ? "bg-emerald" : "bg-purple"
        }`}
        animate={
          active
            ? { top: ["0%", "100%", "0%"], opacity: [0.4, 1, 0.4] }
            : { top: "50%", opacity: 0.5 }
        }
        transition={
          active
            ? { duration: 2.2, repeat: Infinity, ease: "easeInOut" }
            : { duration: 0.3 }
        }
      />
    </div>
  );
}

export function HowItWorks() {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (reduce) return;
    const id = window.setInterval(() => {
      setActive((prev) => (prev + 1) % howItWorks.steps.length);
    }, 2800);
    return () => window.clearInterval(id);
  }, [reduce]);

  return (
    <Section id="yechimlar" className="relative !pt-8 overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <motion.div
          className="absolute left-1/4 top-1/3 h-56 w-56 rounded-full bg-purple/10 blur-[100px]"
          animate={reduce ? undefined : { opacity: [0.35, 0.6, 0.35], x: [0, 24, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-10 right-1/4 h-48 w-48 rounded-full bg-emerald/10 blur-[90px]"
          animate={reduce ? undefined : { opacity: [0.3, 0.55, 0.3], x: [0, -20, 0] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <Reveal>
        <SectionHeading
          title={howItWorks.title}
          subtitle={howItWorks.subtitle}
        />
      </Reveal>

      {/* Progress dots */}
      <div className="mb-8 flex items-center justify-center gap-2">
        {howItWorks.steps.map((step, i) => (
          <button
            key={step.step}
            type="button"
            aria-label={`Qadam ${step.step}`}
            onClick={() => setActive(i)}
            className="relative h-2 overflow-hidden rounded-full transition-all"
            style={{ width: active === i ? 28 : 8 }}
          >
            <span className="absolute inset-0 bg-white/15" />
            <motion.span
              className={`absolute inset-0 ${
                i % 2 === 0 ? "bg-purple" : "bg-emerald"
              }`}
              animate={{ opacity: active === i ? 1 : 0 }}
              transition={{ duration: 0.3 }}
            />
          </button>
        ))}
      </div>

      <div className="flex flex-col items-stretch md:flex-row md:items-stretch">
        {howItWorks.steps.map((step, i) => (
          <div key={step.step} className="flex flex-1 flex-col md:flex-row md:items-center">
            <Reveal delay={i * 0.12} className="w-full flex-1">
              <StepCard
                step={step}
                index={i}
                active={active === i}
                onHover={() => setActive(i)}
              />
            </Reveal>

            {i < howItWorks.steps.length - 1 ? (
              <>
                <MobileConnector active={active === i} emerald={i % 2 === 1} />
                <Connector active={active === i} fromEmerald={i % 2 === 1} />
              </>
            ) : null}
          </div>
        ))}
      </div>
    </Section>
  );
}
