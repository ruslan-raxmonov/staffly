"use client";

import { Reveal } from "@/components/motion/Reveal";
import { Section, SectionHeading } from "@/components/ui/Section";
import { operations } from "@/lib/copy";
import dynamic from "next/dynamic";

const VirtualOffice3D = dynamic(
  () =>
    import("@/components/mockups/VirtualOffice3D").then(
      (m) => m.VirtualOffice3D
    ),
  {
    ssr: false,
    loading: () => (
      <div className="glass overflow-hidden rounded-[20px] p-5 md:p-6">
        <div className="mb-4 h-6 w-56 skeleton rounded-lg" />
        <div className="h-[380px] skeleton rounded-2xl md:h-[480px]" />
      </div>
    ),
  }
);

export function OperationsPreview() {
  return (
    <Section id="demo">
      <Reveal>
        <SectionHeading title={operations.title} subtitle={operations.subtitle} />
      </Reveal>
      <Reveal delay={0.12}>
        <VirtualOffice3D />
      </Reveal>
    </Section>
  );
}
