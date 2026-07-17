"use client";

import { Reveal } from "@/components/motion/Reveal";
import { Accordion } from "@/components/ui/Accordion";
import { Section, SectionHeading } from "@/components/ui/Section";
import { faq } from "@/lib/copy";

export function FAQ() {
  return (
    <Section id="blog">
      <Reveal>
        <SectionHeading title={faq.title} />
      </Reveal>
      <Reveal delay={0.1}>
        <Accordion items={faq.items} />
      </Reveal>
    </Section>
  );
}
