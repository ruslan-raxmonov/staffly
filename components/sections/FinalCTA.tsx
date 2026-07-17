"use client";

import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { finalCta } from "@/lib/copy";

export function FinalCTA() {
  return (
    <section className="relative overflow-hidden px-5 py-24 md:px-8 md:py-32">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple/25 blur-[100px]" />
        <div className="absolute right-1/4 top-1/3 h-48 w-48 rounded-full bg-emerald/10 blur-[80px]" />
      </div>
      <Reveal>
        <div className="glass relative mx-auto max-w-3xl rounded-[20px] px-8 py-14 text-center md:px-12">
          <h2 className="text-3xl font-semibold tracking-tight text-white md:text-4xl">
            {finalCta.headline}
          </h2>
          <p className="mx-auto mt-4 max-w-md text-muted">{finalCta.text}</p>
          <div className="mt-8">
            <Button href="#request-access">{finalCta.button}</Button>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
