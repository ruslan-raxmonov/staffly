"use client";

import { marketplaceAgents } from "@/lib/demo-data";
import Image from "next/image";
import { useState } from "react";

export default function MarketplacePage() {
  const [installed, setInstalled] = useState<Record<string, boolean>>({});

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-white">Marketplace</h1>
        <p className="mt-1 text-sm text-muted">
          Browse AI employees. Install is demo-only — no billing yet.
        </p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {marketplaceAgents.map((a) => {
          const key = `${a.name}-${a.role}`;
          const on = installed[key];
          return (
            <div
              key={key}
              className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]"
            >
              <div className="relative h-36">
                <Image src={a.avatar} alt={a.name} fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#08090d] to-transparent" />
              </div>
              <div className="p-4">
                <h2 className="text-lg font-medium text-white">{a.name}</h2>
                <p className="text-sm text-muted">{a.role}</p>
                <p className="mt-2 text-xs text-muted-2">{a.installs} installs</p>
                <button
                  type="button"
                  onClick={() =>
                    setInstalled((s) => ({ ...s, [key]: !s[key] }))
                  }
                  className={`mt-4 w-full rounded-xl py-2.5 text-sm font-medium transition ${
                    on
                      ? "border border-emerald/30 bg-emerald-soft text-emerald"
                      : "bg-purple text-white hover:bg-[#6a4aef]"
                  }`}
                >
                  {on ? "Installed" : "Install"}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
