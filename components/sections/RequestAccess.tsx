"use client";

import { Reveal } from "@/components/motion/Reveal";
import { UserType } from "@/lib/types";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "framer-motion";
import {
  Building2,
  Check,
  CheckCircle2,
  Loader2,
  Send,
  User,
} from "lucide-react";
import Link from "next/link";
import { FormEvent, useMemo, useState } from "react";

type FormState = {
  name: string;
  email: string;
  phone: string;
  reason: string;
  userType: UserType | "";
};

type FieldErrors = Partial<Record<keyof FormState, string>>;

const initial: FormState = {
  name: "",
  email: "",
  phone: "",
  reason: "",
  userType: "",
};

function Confetti({ active }: { active: boolean }) {
  const reduce = useReducedMotion();
  const pieces = useMemo(
    () =>
      Array.from({ length: 40 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        delay: Math.random() * 0.4,
        duration: 1.6 + Math.random() * 1.2,
        size: 5 + Math.random() * 6,
        rotate: Math.random() * 360,
        color: i % 2 === 0 ? "#7c5cff" : "#22c55e",
      })),
    []
  );
  if (!active || reduce) return null;
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {pieces.map((p) => (
        <motion.span
          key={p.id}
          className="absolute top-0 rounded-sm"
          style={{
            left: `${p.x}%`,
            width: p.size,
            height: p.size * 0.5,
            backgroundColor: p.color,
          }}
          initial={{ y: -10, opacity: 1 }}
          animate={{
            y: 380,
            opacity: [1, 1, 0],
            rotate: p.rotate,
            x: (Math.random() - 0.5) * 100,
          }}
          transition={{ duration: p.duration, delay: p.delay, ease: "easeOut" }}
        />
      ))}
    </div>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block space-y-2">
      <span className="text-xs font-medium text-muted-2">{label}</span>
      {children}
      {error ? <p className="text-[11px] text-red-400">{error}</p> : null}
    </label>
  );
}

const fieldClass =
  "w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3.5 text-sm text-white placeholder:text-muted/80 outline-none transition focus:border-purple/50 focus:bg-white/[0.06] focus:ring-2 focus:ring-purple/20 disabled:opacity-60";

export function RequestAccess() {
  const [form, setForm] = useState<FormState>(initial);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [done, setDone] = useState<{
    id: string;
    verifyPreviewUrl?: string;
  } | null>(null);
  const reduce = useReducedMotion();

  const set =
    (key: keyof FormState) =>
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >
    ) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const validate = () => {
    const next: FieldErrors = {};
    if (!form.name.trim()) next.name = "Ism majburiy";
    if (!form.email.trim()) next.email = "Email majburiy";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      next.email = "Email noto‘g‘ri";
    }
    if (!form.phone.trim()) next.phone = "Telefon majburiy";
    else if (form.phone.replace(/\D/g, "").length < 9) {
      next.phone = "Telefon noto‘g‘ri";
    }
    if (!form.userType) next.userType = "Tanlang";
    if (!form.reason.trim()) next.reason = "Maqsad majburiy";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitError("");
    if (!validate()) return;
    setSubmitting(true);
    try {
      const res = await fetch("/api/requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
          phone: form.phone.trim(),
          reason: form.reason.trim(),
          userType: form.userType,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setSubmitError(data.error || "Xatolik yuz berdi");
        return;
      }
      setDone({ id: data.id, verifyPreviewUrl: data.verifyPreviewUrl });
      setForm(initial);
    } catch {
      setSubmitError("Tarmoq xatosi. Qayta urinib ko‘ring.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section
      id="request-access"
      className="relative overflow-hidden px-5 py-24 md:px-8 md:py-32"
    >
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-[12%] top-1/4 h-72 w-72 rounded-full bg-purple/20 blur-[130px]" />
        <div className="absolute bottom-16 right-[8%] h-64 w-64 rounded-full bg-emerald/15 blur-[110px]" />
      </div>

      <div className="mx-auto grid max-w-6xl items-start gap-10 lg:grid-cols-[0.9fr_1.2fr] lg:gap-12 lg:items-center">
        <Reveal>
          <div>
            <span className="mb-5 inline-flex rounded-full border border-purple/30 bg-purple-soft px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] text-purple">
              Erta kirish
            </span>
            <h2 className="text-3xl font-semibold tracking-tight text-white md:text-4xl lg:text-5xl lg:leading-[1.1]">
              Erta kirish uchun so&apos;rov yuboring
            </h2>
            <p className="mt-5 max-w-lg text-base leading-relaxed text-muted md:text-lg">
              Staffly hozir beta bosqichida. So&apos;rovingizdan so&apos;ng emailni
              tasdiqlang — jamoa 24–48 soat ichida ko&apos;rib chiqadi.
            </p>
            <ul className="mt-8 space-y-3 text-sm text-muted-2">
              {[
                "Email orqali tasdiqlash majburiy",
                "Dashboardga kirishdan oldin admin tasdiqlashi kerak",
                "Tasdiqlangandan so‘ng workspace avtomatik ochiladi",
              ].map((t) => (
                <li key={t} className="flex items-center gap-3">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full border border-emerald/25 bg-emerald-soft text-emerald">
                    <Check size={12} />
                  </span>
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="relative overflow-hidden rounded-[24px] border border-white/10 bg-[#0d0f16]/75 p-6 shadow-[0_0_80px_rgba(124,92,255,0.1)] backdrop-blur-xl sm:p-8">
            <AnimatePresence mode="wait">
              {done ? (
                <motion.div
                  key="done"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="relative py-6 text-center"
                >
                  <Confetti active />
                  <div className="relative mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald/10">
                    <CheckCircle2 className="h-8 w-8 text-emerald" />
                  </div>
                  <h3 className="relative text-2xl font-semibold text-white">
                    ✓ So&apos;rov yuborildi!
                  </h3>
                  <p className="relative mx-auto mt-3 max-w-md text-sm text-muted">
                    Tasdiqlash xati yuborildi. Emailingizni tasdiqlang — so&apos;rovingiz
                    ko&apos;rib chiqishga o&apos;tadi.
                  </p>
                  <div className="relative mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
                    {done.verifyPreviewUrl ? (
                      <a
                        href={done.verifyPreviewUrl}
                        className="inline-flex items-center justify-center rounded-2xl bg-purple px-5 py-3 text-sm font-medium text-white transition-all hover:bg-purple/90"
                      >
                        Emailni tasdiqlash
                      </a>
                    ) : null}
                    <a
                      href="https://t.me/stafflyio"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-medium text-white transition-all hover:bg-white/10"
                    >
                      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z"/>
                      </svg>
                      Telegram kanalga qo&apos;shiling
                    </a>
                  </div>
                  <div className="relative mt-4">
                    <Link
                      href={`/access-pending?id=${done.id}`}
                      className="text-sm text-muted-2 underline-offset-4 hover:text-white hover:underline"
                    >
                      So‘rov holatini ko‘rish
                    </Link>
                  </div>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={onSubmit}
                  noValidate
                  className="relative space-y-4"
                >
                  <Field label="Ism" error={errors.name}>
                    <input
                      className={fieldClass}
                      placeholder="Ismingiz"
                      value={form.name}
                      onChange={set("name")}
                      disabled={submitting}
                    />
                  </Field>

                  <Field label="Telefon raqam" error={errors.phone}>
                    <input
                      type="tel"
                      className={fieldClass}
                      placeholder="+998 90 123 45 67"
                      value={form.phone}
                      onChange={set("phone")}
                      disabled={submitting}
                    />
                  </Field>

                  <Field label="Email" error={errors.email}>
                    <input
                      type="email"
                      className={fieldClass}
                      placeholder="email@example.com"
                      value={form.email}
                      onChange={set("email")}
                      disabled={submitting}
                    />
                  </Field>

                  <div className="space-y-2">
                    <span className="text-xs font-medium text-muted-2">
                      Biznes yoki Individual
                    </span>
                    <div className="grid gap-3 sm:grid-cols-2">
                      {(
                        [
                          ["business", "Biznes", Building2],
                          ["individual", "Individual", User],
                        ] as const
                      ).map(([value, label, Icon]) => {
                        const selected = form.userType === value;
                        return (
                          <button
                            key={value}
                            type="button"
                            onClick={() =>
                              setForm((f) => ({ ...f, userType: value }))
                            }
                            className={`flex items-center gap-3 rounded-2xl border px-4 py-3.5 text-left transition ${
                              selected
                                ? value === "business"
                                  ? "border-purple/50 bg-purple/[0.12]"
                                  : "border-emerald/45 bg-emerald/[0.1]"
                                : "border-white/10 bg-white/[0.03] hover:border-white/20"
                            }`}
                          >
                            <Icon
                              size={18}
                              className={
                                selected
                                  ? value === "business"
                                    ? "text-purple"
                                    : "text-emerald"
                                  : "text-muted-2"
                              }
                            />
                            <span className="text-sm font-medium text-white">
                              {label}
                            </span>
                            {selected ? (
                              <Check size={14} className="ml-auto text-white" />
                            ) : null}
                          </button>
                        );
                      })}
                    </div>
                    {errors.userType ? (
                      <p className="text-[11px] text-red-400">{errors.userType}</p>
                    ) : null}
                  </div>

                  <Field
                    label="Nima maqsadda ishlatmoqchisiz?"
                    error={errors.reason}
                  >
                    <textarea
                      className={`${fieldClass} min-h-[110px] resize-y`}
                      value={form.reason}
                      onChange={set("reason")}
                      disabled={submitting}
                      placeholder="Masalan: savdo, qo‘llab-quvvatlash, kontent, tadqiqot…"
                    />
                  </Field>

                  {submitError ? (
                    <p className="text-sm text-red-400">{submitError}</p>
                  ) : null}

                  <motion.button
                    type="submit"
                    disabled={submitting}
                    whileHover={
                      submitting || reduce ? undefined : { scale: 1.01 }
                    }
                    whileTap={
                      submitting || reduce ? undefined : { scale: 0.985 }
                    }
                    className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-purple px-5 py-4 text-sm font-medium text-white shadow-[0_0_28px_rgba(124,92,255,0.4)] transition hover:bg-[#6a4aef] disabled:opacity-60"
                  >
                    {submitting ? (
                      <>
                        <Loader2 size={16} className="animate-spin" />{" "}
                        Yuborilmoqda…
                      </>
                    ) : (
                      <>
                        <Send size={16} /> So‘rov yuborish
                      </>
                    )}
                  </motion.button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
