"use client";

import { Reveal } from "@/components/motion/Reveal";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { hero } from "@/lib/copy";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

function RotatingAgentName({ names }: { names: string[] }) {
  const [index, setIndex] = useState(0);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce || names.length < 2) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % names.length);
    }, 2200);
    return () => clearInterval(id);
  }, [names.length, reduce]);

  if (reduce) {
    return <span className="text-purple">{names[0]}</span>;
  }

  return (
    <span className="relative inline-flex min-h-[1.15em] min-w-[9ch] items-center justify-center overflow-hidden align-bottom">
      <AnimatePresence mode="wait">
        <motion.span
          key={names[index]}
          initial={{ y: 32, opacity: 0, filter: "blur(4px)" }}
          animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
          exit={{ y: -32, opacity: 0, filter: "blur(4px)" }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="inline-block text-purple"
        >
          {names[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

export function Hero() {
  return (
    <section className="relative overflow-hidden px-5 pb-24 pt-28 md:px-8 md:pb-32 md:pt-40">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-24 h-[28rem] w-[28rem] -translate-x-1/2 rounded-full bg-purple/20 blur-[120px]" />
        <div className="absolute right-[15%] top-40 h-72 w-72 rounded-full bg-emerald/10 blur-[100px]" />
        <div className="absolute bottom-0 left-1/2 h-48 w-[90%] -translate-x-1/2 bg-gradient-to-t from-background to-transparent" />
      </div>

      <div className="relative mx-auto max-w-5xl text-center">
        <Reveal>
          <Badge>{hero.badge}</Badge>
        </Reveal>

        <Reveal delay={0.08}>
          <h1 className="mx-auto mt-8 max-w-5xl text-4xl font-semibold leading-[1.12] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-[4rem]">
            {hero.headlineBefore}
            <RotatingAgentName names={hero.rotatingAgents} />
            {hero.headlineAfter}
          </h1>
        </Reveal>

        <Reveal delay={0.16}>
          <p className="mx-auto mt-8 max-w-3xl text-base leading-relaxed text-muted sm:text-lg md:text-xl md:leading-relaxed">
            {hero.subheadline}
          </p>
        </Reveal>

        <Reveal delay={0.24}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <Button href="#request-access" className="!px-7 !py-3.5 !text-base">
              {hero.primaryCta}
            </Button>
            <Button
              href="#demo"
              variant="secondary"
              className="!px-7 !py-3.5 !text-base"
            >
              {hero.secondaryCta}
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
