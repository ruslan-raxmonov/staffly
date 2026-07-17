"use client";

import { demoEmployees } from "@/lib/demo-data";
import Image from "next/image";
import Link from "next/link";

export default function EmployeesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-white">AI Employees</h1>
        <p className="mt-1 text-sm text-muted">
          Your digital team — profiles, status, and performance.
        </p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {demoEmployees.map((e) => (
          <Link
            key={e.id}
            href={`/dashboard/employees/${e.id}`}
            className="group overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] transition hover:border-purple/35"
          >
            <div className="relative h-40 w-full overflow-hidden">
              <Image
                src={e.avatar}
                alt={e.name}
                fill
                className="object-cover transition duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#08090d] via-transparent to-transparent" />
              <span className="absolute bottom-3 left-3 rounded-full border border-emerald/30 bg-emerald-soft px-2.5 py-1 text-[11px] text-emerald">
                {e.status}
              </span>
            </div>
            <div className="p-4">
              <h2 className="text-lg font-medium text-white">{e.name}</h2>
              <p className="text-sm text-muted">{e.role}</p>
              <div className="mt-4 grid grid-cols-3 gap-2 text-center">
                <div className="rounded-xl bg-white/[0.03] py-2">
                  <p className="text-sm font-semibold text-white">{e.tasksToday}</p>
                  <p className="text-[10px] text-muted-2">Tasks</p>
                </div>
                <div className="rounded-xl bg-white/[0.03] py-2">
                  <p className="text-sm font-semibold text-white">{e.successRate}%</p>
                  <p className="text-[10px] text-muted-2">Success</p>
                </div>
                <div className="rounded-xl bg-white/[0.03] py-2">
                  <p className="text-sm font-semibold text-white">{e.hoursSaved}h</p>
                  <p className="text-[10px] text-muted-2">Saved</p>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
