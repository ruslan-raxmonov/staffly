"use client";

import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, Suspense, useState } from "react";

type Step = "email" | "login" | "set_password" | "need_request";

function LoginInner() {
  const router = useRouter();
  const params = useSearchParams();
  const [step, setStep] = useState<Step>("email");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");
  const [loading, setLoading] = useState(false);

  const afterAuth = () => {
    router.push(params.get("next") || "/dashboard");
  };

  const checkEmail = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setInfo("");
    setLoading(true);
    try {
      const res = await fetch("/api/auth/check-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Xatolik");
        return;
      }

      if (data.action === "request") {
        setStep("need_request");
        setInfo(data.message || "Avval so‘rov yuboring.");
        return;
      }
      if (data.action === "pending" && data.redirect) {
        router.push(data.redirect);
        return;
      }
      if (data.action === "set_password") {
        setStep("set_password");
        setInfo(data.message || "Yangi parol o‘rnating.");
        return;
      }
      if (data.action === "login") {
        setStep("login");
        setInfo(data.message || "");
        return;
      }
      setError("Noma’lum holat");
    } catch {
      setError("Tarmoq xatosi");
    } finally {
      setLoading(false);
    }
  };

  const onLogin = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        if (data.code === "password_not_set") {
          setStep("set_password");
          setInfo("Birinchi kirish: yangi parol o‘rnating.");
          setPassword("");
          return;
        }
        if (data.code === "need_request") {
          setStep("need_request");
          setInfo(data.error);
          return;
        }
        if (data.redirect) {
          router.push(data.redirect);
          return;
        }
        setError(data.error || "Kirish amalga oshmadi");
        return;
      }
      afterAuth();
    } catch {
      setError("Tarmoq xatosi");
    } finally {
      setLoading(false);
    }
  };

  const onSetPassword = async (e: FormEvent) => {
    e.preventDefault();
    if (password !== confirm) {
      setError("Parollar mos kelmadi");
      return;
    }
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/auth/set-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        if (data.redirect) {
          router.push(data.redirect);
          return;
        }
        setError(data.error || "Parol o‘rnatilmadi");
        return;
      }
      afterAuth();
    } catch {
      setError("Tarmoq xatosi");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#08090d] px-5">
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md rounded-[24px] border border-white/10 bg-white/[0.03] p-8 backdrop-blur-xl"
      >
        <Link href="/" className="text-lg font-semibold text-white">
          STɅFFLY
        </Link>
        <h1 className="mt-6 text-2xl font-semibold text-white">Kirish</h1>
        <p className="mt-2 text-sm text-muted">
          Faqat tasdiqlangan hisoblar dashboardga kira oladi.
        </p>

        {step === "email" ? (
          <form onSubmit={checkEmail} className="mt-8 space-y-4">
            <label className="block space-y-2">
              <span className="text-xs text-muted-2">Email</span>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white outline-none focus:border-purple/50"
                placeholder="email@example.com"
              />
            </label>
            {error ? <p className="text-sm text-red-400">{error}</p> : null}
            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-2xl bg-purple py-3.5 text-sm font-medium text-white disabled:opacity-60"
            >
              {loading ? <Loader2 size={16} className="animate-spin" /> : null}
              Davom etish
            </button>
          </form>
        ) : null}

        {step === "need_request" ? (
          <div className="mt-8 space-y-4">
            <p className="rounded-2xl border border-amber-300/25 bg-amber-300/10 px-4 py-3 text-sm text-amber-100">
              {info ||
                "Email tasdiqlanmagan. Avval so‘rov yuboring."}
            </p>
            <Link
              href="/#request-access"
              className="flex w-full items-center justify-center rounded-2xl bg-purple py-3.5 text-sm font-medium text-white"
            >
              So‘rov yuborish
            </Link>
            <button
              type="button"
              onClick={() => {
                setStep("email");
                setError("");
                setInfo("");
              }}
              className="w-full text-center text-xs text-muted-2 hover:text-white"
            >
              Boshqa email bilan urinish
            </button>
          </div>
        ) : null}

        {step === "login" ? (
          <form onSubmit={onLogin} className="mt-8 space-y-4">
            <p className="text-sm text-muted-2">{email}</p>
            {info ? <p className="text-sm text-muted">{info}</p> : null}
            <label className="block space-y-2">
              <span className="text-xs text-muted-2">Parol</span>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white outline-none focus:border-purple/50"
              />
            </label>
            {error ? <p className="text-sm text-red-400">{error}</p> : null}
            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-2xl bg-purple py-3.5 text-sm font-medium text-white disabled:opacity-60"
            >
              {loading ? <Loader2 size={16} className="animate-spin" /> : null}
              Kirish
            </button>
            <button
              type="button"
              onClick={() => {
                setStep("email");
                setPassword("");
                setError("");
              }}
              className="w-full text-center text-xs text-muted-2 hover:text-white"
            >
              Emailni o‘zgartirish
            </button>
          </form>
        ) : null}

        {step === "set_password" ? (
          <form onSubmit={onSetPassword} className="mt-8 space-y-4">
            <p className="text-sm text-muted-2">{email}</p>
            <p className="rounded-2xl border border-emerald/25 bg-emerald-soft px-4 py-3 text-sm text-emerald">
              {info || "Birinchi kirish: yangi parol o‘rnating."}
            </p>
            <label className="block space-y-2">
              <span className="text-xs text-muted-2">Yangi parol</span>
              <input
                type="password"
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white outline-none focus:border-purple/50"
              />
            </label>
            <label className="block space-y-2">
              <span className="text-xs text-muted-2">Parolni tasdiqlang</span>
              <input
                type="password"
                required
                minLength={6}
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white outline-none focus:border-purple/50"
              />
            </label>
            {error ? <p className="text-sm text-red-400">{error}</p> : null}
            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-2xl bg-emerald py-3.5 text-sm font-medium text-white disabled:opacity-60"
            >
              {loading ? <Loader2 size={16} className="animate-spin" /> : null}
              Parolni saqlash va kirish
            </button>
          </form>
        ) : null}

        {step === "email" ? (
          <p className="mt-6 text-center text-xs text-muted-2">
            Hisobingiz yo‘qmi?{" "}
            <Link href="/#request-access" className="text-purple">
              So‘rov yuborish
            </Link>
          </p>
        ) : null}
      </motion.div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#08090d]" />}>
      <LoginInner />
    </Suspense>
  );
}
