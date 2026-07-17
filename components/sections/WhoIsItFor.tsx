"use client";

import { Reveal } from "@/components/motion/Reveal";
import { Section, SectionHeading } from "@/components/ui/Section";
import { whoIsItFor } from "@/lib/copy";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
} from "framer-motion";
import {
  Building2,
  GraduationCap,
  HeartPulse,
  Landmark,
  Rocket,
  ShoppingBag,
  type LucideIcon,
} from "lucide-react";
import { MouseEvent, useState } from "react";

const icons: LucideIcon[] = [
  Rocket,
  Landmark,
  GraduationCap,
  HeartPulse,
  ShoppingBag,
  Building2,
];

function AudienceCard({
  item,
  index,
}: {
  item: (typeof whoIsItFor.audiences)[number];
  index: number;
}) {
  const Icon = icons[index] ?? Rocket;
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
      className="group relative h-full overflow-hidden rounded-[20px] border border-white/10 bg-white/[0.03] p-6"
    >
      <motion.div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: glow }}
      />
      <div
        className={`pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full blur-3xl transition-opacity duration-500 ${
          hover ? "opacity-60" : "opacity-25"
        } ${isEmerald ? "bg-emerald/25" : "bg-purple/30"}`}
      />

      <div className="relative">
        <div className="mb-5 flex items-start justify-between gap-3">
          <div
            className={`flex h-12 w-12 items-center justify-center rounded-2xl border ${
              isEmerald
                ? "border-emerald/25 bg-emerald-soft text-emerald"
                : "border-purple/25 bg-purple-soft text-purple"
            }`}
          >
            <Icon size={22} />
          </div>
          <span
            className={`rounded-full border px-2.5 py-1 text-[10px] font-medium ${
              isEmerald
                ? "border-emerald/20 bg-emerald-soft text-emerald"
                : "border-purple/20 bg-purple-soft text-purple"
            }`}
          >
            {item.tag}
          </span>
        </div>

        <h3 className="text-lg font-semibold tracking-tight text-white">
          {item.title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-muted">
          {item.description}
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

export function WhoIsItFor() {
  const reduce = useReducedMotion();

  return (
    <Section className="overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <motion.div
          className="absolute left-0 top-1/3 h-56 w-56 rounded-full bg-purple/10 blur-[100px]"
          animate={
            reduce ? undefined : { opacity: [0.3, 0.55, 0.3], y: [0, 16, 0] }
          }
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-10 right-0 h-52 w-52 rounded-full bg-emerald/10 blur-[90px]"
          animate={
            reduce ? undefined : { opacity: [0.25, 0.5, 0.25], y: [0, -12, 0] }
          }
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <Reveal>
        <SectionHeading
          title={whoIsItFor.title}
          subtitle={whoIsItFor.subtitle}
        />
      </Reveal>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {whoIsItFor.audiences.map((item, i) => (
          <Reveal key={item.title} delay={i * 0.05}>
            <AudienceCard item={item} index={i} />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
