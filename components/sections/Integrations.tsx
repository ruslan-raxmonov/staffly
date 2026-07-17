"use client";

import { Reveal } from "@/components/motion/Reveal";
import { Section, SectionHeading } from "@/components/ui/Section";
import { integrations } from "@/lib/copy";

export function Integrations() {
  return (
    <Section id="integratsiyalar">
      <Reveal>
        <SectionHeading
          title={integrations.title}
          subtitle={integrations.subtitle}
        />
      </Reveal>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {integrations.items.map((item, i) => (
          <Reveal key={item.name} delay={i * 0.03}>
            <div className="group flex flex-col items-center justify-center gap-3 rounded-[20px] border border-white/10 bg-white/[0.03] px-4 py-6 transition hover:border-purple/30 hover:bg-purple/[0.06]">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03] transition group-hover:border-purple/40 group-hover:bg-white/[0.06]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.src}
                  alt={item.name}
                  width={28}
                  height={28}
                  className="h-7 w-7 object-contain"
                />
              </div>
              <span className="text-center text-xs text-muted-2 group-hover:text-white">
                {item.name}
              </span>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
