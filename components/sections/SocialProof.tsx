"use client";

import { Reveal } from "@/components/motion/Reveal";
import { socialProof } from "@/lib/copy";

function LogoItem({ name, src }: { name: string; src: string }) {
  return (
    <div className="flex shrink-0 items-center gap-2.5 px-8 opacity-45 grayscale transition hover:opacity-80 md:px-12">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={name}
        width={28}
        height={28}
        className="h-7 w-7 object-contain"
      />
      <span className="whitespace-nowrap text-sm font-semibold tracking-wide text-white">
        {name}
      </span>
    </div>
  );
}

export function SocialProof() {
  const logos = [...socialProof.logos, ...socialProof.logos];

  return (
    <section className="border-y border-white/5 bg-white/[0.015] py-14">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <Reveal>
          <p className="mb-8 text-center text-sm text-muted">{socialProof.title}</p>
        </Reveal>
      </div>

      <div className="logo-marquee relative overflow-hidden">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-[#08090d] to-transparent md:w-28" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-[#08090d] to-transparent md:w-28" />

        <div className="logo-marquee-track flex w-max items-center">
          {logos.map((logo, i) => (
            <LogoItem key={`${logo.name}-${i}`} name={logo.name} src={logo.src} />
          ))}
        </div>
      </div>
    </section>
  );
}
