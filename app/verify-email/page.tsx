"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Loader2, XCircle } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

function VerifyInner() {
  const params = useSearchParams();
  const router = useRouter();
  const token = params.get("token");
  const [state, setState] = useState<"loading" | "ok" | "error">("loading");
  const [message, setMessage] = useState("");
  const [appId, setAppId] = useState("");

  useEffect(() => {
    if (!token) {
      setState("error");
      setMessage("Verification token missing.");
      return;
    }
    (async () => {
      try {
        const res = await fetch(
          `/api/applications/status?token=${encodeURIComponent(token)}`
        );
        const data = await res.json();
        if (!res.ok) {
          setState("error");
          setMessage(data.error || "Verification failed");
          return;
        }
        setState("ok");
        setAppId(data.applicationId);
        setTimeout(() => {
          router.replace(`/access-pending?id=${data.applicationId}`);
        }, 1600);
      } catch {
        setState("error");
        setMessage("Network error");
      }
    })();
  }, [token, router]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#08090d] px-5">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md rounded-[24px] border border-white/10 bg-white/[0.03] p-8 text-center backdrop-blur-xl"
      >
        {state === "loading" ? (
          <>
            <Loader2 className="mx-auto mb-4 h-10 w-10 animate-spin text-purple" />
            <h1 className="text-xl font-semibold text-white">Verifying email…</h1>
            <p className="mt-2 text-sm text-muted">Please wait a moment.</p>
          </>
        ) : null}
        {state === "ok" ? (
          <>
            <CheckCircle2 className="mx-auto mb-4 h-12 w-12 text-emerald" />
            <h1 className="text-xl font-semibold text-white">Email verified</h1>
            <p className="mt-2 text-sm text-muted">
              Redirecting to your application status…
            </p>
            <Link
              href={`/access-pending?id=${appId}`}
              className="mt-6 inline-block text-sm text-purple"
            >
              Continue now
            </Link>
          </>
        ) : null}
        {state === "error" ? (
          <>
            <XCircle className="mx-auto mb-4 h-12 w-12 text-red-400" />
            <h1 className="text-xl font-semibold text-white">Verification failed</h1>
            <p className="mt-2 text-sm text-muted">{message}</p>
            <Link href="/#request-access" className="mt-6 inline-block text-sm text-purple">
              Back to application
            </Link>
          </>
        ) : null}
      </motion.div>
    </div>
  );
}

export default function VerifyEmailPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-[#08090d] text-muted">
          Loading…
        </div>
      }
    >
      <VerifyInner />
    </Suspense>
  );
}
