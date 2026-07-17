"use client";

import { motion } from "framer-motion";
import {
  Check,
  Clock,
  Mail,
  MessageCircle,
  Shield,
} from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

type StatusPayload = {
  id: string;
  status: string;
  email: string;
  firstName: string;
  emailVerifiedAt: string | null;
  createdAt: string;
  approvedAt: string | null;
  rejectedAt: string | null;
};

const statusMeta: Record<
  string,
  { label: string; color: string; ring: string }
> = {
  email_pending: {
    label: "Email Pending",
    color: "text-amber-300",
    ring: "border-amber-400/30 bg-amber-400/10",
  },
  pending: {
    label: "Pending",
    color: "text-purple",
    ring: "border-purple/30 bg-purple-soft",
  },
  approved: {
    label: "Approved",
    color: "text-emerald",
    ring: "border-emerald/30 bg-emerald-soft",
  },
  rejected: {
    label: "Rejected",
    color: "text-red-300",
    ring: "border-red-400/30 bg-red-400/10",
  },
  more_info: {
    label: "More Info Needed",
    color: "text-amber-200",
    ring: "border-amber-300/30 bg-amber-300/10",
  },
};

function PendingInner() {
  const params = useSearchParams();
  const id = params.get("id");
  const [data, setData] = useState<StatusPayload | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) {
      setError("Application id missing. Submit a request first.");
      return;
    }
    const load = async () => {
      const res = await fetch("/api/applications/status", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ applicationId: id }),
      });
      const json = await res.json();
      if (!res.ok) {
        setError(json.error || "Not found");
        return;
      }
      setData(json);
    };
    load();
    const t = setInterval(load, 8000);
    return () => clearInterval(t);
  }, [id]);

  const status = data?.status || "pending";
  const meta = statusMeta[status] || statusMeta.pending;

  const steps = [
    {
      label: "Application Submitted",
      done: true,
    },
    {
      label: "Email Verified",
      done: Boolean(data?.emailVerifiedAt) || status !== "email_pending",
    },
    {
      label: "Review",
      done: status === "approved" || status === "rejected" || status === "more_info",
      active: status === "pending",
    },
    {
      label: "Approved",
      done: status === "approved",
    },
  ];

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#08090d] px-5 py-16 md:py-24">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/4 top-1/4 h-72 w-72 rounded-full bg-purple/20 blur-[120px]" />
        <div className="absolute bottom-20 right-1/4 h-64 w-64 rounded-full bg-emerald/10 blur-[100px]" />
      </div>

      <div className="mx-auto max-w-2xl">
        <Link href="/" className="mb-10 inline-block text-lg font-semibold text-white">
          STɅFFLY
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-[24px] border border-white/10 bg-white/[0.03] p-8 backdrop-blur-xl md:p-10"
        >
          <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl border border-purple/30 bg-purple-soft text-purple">
            <Shield size={24} />
          </div>

          <h1 className="text-3xl font-semibold tracking-tight text-white md:text-4xl">
            Application Received
          </h1>
          <p className="mt-3 text-base text-muted md:text-lg">
            Thank you for requesting access to Staffly.
            <br />
            Your application is under review.
          </p>

          {error ? (
            <p className="mt-6 text-sm text-red-400">{error}</p>
          ) : null}

          {data ? (
            <>
              <div className={`mt-8 rounded-2xl border px-4 py-4 ${meta.ring}`}>
                <p className="text-xs uppercase tracking-[0.16em] text-muted-2">
                  Current Status
                </p>
                <p className={`mt-1 text-xl font-semibold ${meta.color}`}>
                  {meta.label}
                </p>
                <p className="mt-1 text-sm text-muted">
                  {data.firstName} · {data.email}
                </p>
              </div>

              <div className="mt-8 space-y-0">
                <p className="mb-4 text-xs uppercase tracking-[0.16em] text-muted-2">
                  Timeline
                </p>
                {steps.map((step, i) => (
                  <div key={step.label} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <span
                        className={`flex h-8 w-8 items-center justify-center rounded-full border ${
                          step.done
                            ? "border-emerald/40 bg-emerald-soft text-emerald"
                            : step.active
                              ? "border-purple/40 bg-purple-soft text-purple"
                              : "border-white/10 text-muted-2"
                        }`}
                      >
                        {step.done ? (
                          <Check size={14} />
                        ) : step.active ? (
                          <Clock size={14} />
                        ) : (
                          <span className="text-[10px]">{i + 1}</span>
                        )}
                      </span>
                      {i < steps.length - 1 ? (
                        <span
                          className={`my-1 w-px flex-1 min-h-[28px] ${
                            step.done ? "bg-emerald/40" : "bg-white/10"
                          }`}
                        />
                      ) : null}
                    </div>
                    <div className="pb-6">
                      <p
                        className={`text-sm font-medium ${
                          step.done || step.active ? "text-white" : "text-muted-2"
                        }`}
                      >
                        {step.label}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-2 flex items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-muted">
                <Clock size={16} className="text-purple" />
                Estimated review: <span className="text-white">24–48 hours</span>
              </div>

              {status === "email_pending" ? (
                <p className="mt-4 flex items-start gap-2 text-sm text-amber-200/90">
                  <Mail size={16} className="mt-0.5 shrink-0" />
                  Check your inbox (and mock outbox in admin) to verify your email.
                </p>
              ) : null}

              {status === "approved" ? (
                <Link
                  href="/login"
                  className="mt-6 inline-flex w-full items-center justify-center rounded-2xl bg-emerald px-5 py-3.5 text-sm font-medium text-white"
                >
                  Kirish (yangi parol o‘rnatish)
                </Link>
              ) : null}

              <a
                href="https://t.me/stafflyio"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-3.5 text-sm font-medium text-white transition hover:border-white/20"
              >
                <MessageCircle size={16} />
                Contact Support
              </a>
            </>
          ) : !error ? (
            <p className="mt-8 text-sm text-muted">Loading status…</p>
          ) : null}
        </motion.div>
      </div>
    </div>
  );
}

export default function AccessPendingPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-[#08090d] text-muted">
          Loading…
        </div>
      }
    >
      <PendingInner />
    </Suspense>
  );
}
