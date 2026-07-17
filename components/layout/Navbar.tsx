"use client";

import { Button } from "@/components/ui/Button";
import { nav } from "@/lib/copy";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? "glass-strong border-b border-white/5" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 md:h-[4.5rem] md:px-8">
        <Link
          href="/"
          className="text-2xl font-semibold tracking-tight text-white md:text-3xl"
        >
          {nav.logo}
        </Link>

        <nav className="hidden items-center gap-7 lg:flex">
          {nav.links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm text-muted-2 transition hover:text-white"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <Link
            href="/login"
            className="px-3 py-2 text-sm text-muted-2 transition hover:text-white"
          >
            {nav.login}
          </Link>
          <Button href="#request-access" className="!py-2.5 !text-sm">
            {nav.cta}
          </Button>
        </div>

        <button
          type="button"
          className="rounded-xl border border-white/10 p-2 text-white lg:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Menyu"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="glass-strong border-t border-white/5 lg:hidden"
          >
            <div className="flex flex-col gap-1 px-5 py-4">
              {nav.links.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="rounded-xl px-3 py-2.5 text-sm text-muted-2 hover:bg-white/5 hover:text-white"
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <div className="mt-3 flex flex-col gap-2 border-t border-white/5 pt-3">
                <Link
                  href="/login"
                  className="rounded-xl px-3 py-2.5 text-sm text-muted-2"
                  onClick={() => setOpen(false)}
                >
                  {nav.login}
                </Link>
                <Button href="#request-access" onClick={() => setOpen(false)}>
                  {nav.cta}
                </Button>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
