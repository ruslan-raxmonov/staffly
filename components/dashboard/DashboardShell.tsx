"use client";

import {
  BarChart3,
  Bell,
  BookOpen,
  Bot,
  LayoutDashboard,
  LogOut,
  Menu,
  Radio,
  Settings,
  Sparkles,
  Store,
  Workflow,
  X,
  ListTodo,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";

const nav = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/dashboard/employees", label: "Employees", icon: Bot },
  { href: "/dashboard/operations", label: "Operations", icon: Radio },
  { href: "/dashboard/tasks", label: "Tasks", icon: ListTodo },
  { href: "/dashboard/marketplace", label: "Marketplace", icon: Store },
  { href: "/dashboard/knowledge", label: "Knowledge", icon: BookOpen },
  { href: "/dashboard/automation", label: "Automation", icon: Workflow },
  { href: "/dashboard/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/dashboard/notifications", label: "Notifications", icon: Bell },
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
];

type Me = {
  user: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    applicationId?: string;
  } | null;
  applicationStatus: string | null;
};

export function DashboardShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [me, setMe] = useState<Me | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    fetch("/api/auth/login")
      .then((r) => r.json())
      .then((data: Me) => {
        if (!data.user) {
          router.replace("/login?next=/dashboard");
          return;
        }
        if (data.applicationStatus !== "approved") {
          const appId = data.user?.applicationId;
          router.replace(
            appId ? `/access-pending?id=${appId}` : "/access-pending"
          );
          return;
        }
        setMe(data);
      })
      .catch(() => router.replace("/login"));
  }, [router]);

  useEffect(() => setOpen(false), [pathname]);

  const logout = async () => {
    await fetch("/api/auth/login", { method: "DELETE" });
    router.push("/login");
  };

  if (!me?.user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#08090d] text-muted">
        Loading workspace…
      </div>
    );
  }

  const NavLinks = () => (
    <>
      {nav.map((item) => {
        const active =
          item.href === "/dashboard"
            ? pathname === "/dashboard"
            : pathname.startsWith(item.href);
        const Icon = item.icon;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition ${
              active
                ? "bg-purple/20 text-white"
                : "text-muted-2 hover:bg-white/5 hover:text-white"
            }`}
          >
            <Icon size={16} />
            {item.label}
          </Link>
        );
      })}
    </>
  );

  return (
    <div className="flex min-h-screen bg-[#08090d] text-white">
      <aside className="hidden w-64 shrink-0 flex-col border-r border-white/10 bg-[#0d0f16] p-4 lg:flex">
        <Link href="/dashboard" className="mb-2 flex items-center gap-2 px-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-purple/20 text-purple">
            <Sparkles size={16} />
          </span>
          <span className="text-lg font-semibold tracking-tight">STɅFFLY</span>
        </Link>
        <p className="mb-6 px-2 text-[11px] text-muted-2">Main Workspace</p>
        <nav className="flex flex-1 flex-col gap-0.5 overflow-y-auto">
          <NavLinks />
        </nav>
        <div className="mt-4 border-t border-white/10 pt-4">
          <p className="px-2 text-xs text-muted-2">
            {me.user.firstName} {me.user.lastName}
          </p>
          <p className="mb-2 truncate px-2 text-[11px] text-muted">{me.user.email}</p>
          <button
            type="button"
            onClick={logout}
            className="flex w-full items-center gap-2 rounded-xl px-3 py-2.5 text-sm text-muted-2 hover:bg-white/5 hover:text-white"
          >
            <LogOut size={16} />
            Sign out
          </button>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-30 flex items-center justify-between border-b border-white/10 bg-[#08090d]/90 px-4 py-3 backdrop-blur-xl lg:hidden">
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="rounded-xl border border-white/10 p-2 text-white"
          >
            <Menu size={18} />
          </button>
          <span className="font-semibold">STɅFFLY</span>
          <button
            type="button"
            onClick={logout}
            className="rounded-xl border border-white/10 p-2 text-muted-2"
          >
            <LogOut size={16} />
          </button>
        </header>

        {open ? (
          <div className="fixed inset-0 z-40 lg:hidden">
            <button
              type="button"
              className="absolute inset-0 bg-black/60"
              onClick={() => setOpen(false)}
              aria-label="Close menu"
            />
            <div className="absolute left-0 top-0 flex h-full w-72 flex-col bg-[#0d0f16] p-4 shadow-2xl">
              <div className="mb-4 flex items-center justify-between px-2">
                <span className="font-semibold">STɅFFLY</span>
                <button type="button" onClick={() => setOpen(false)}>
                  <X size={18} />
                </button>
              </div>
              <nav className="flex flex-col gap-0.5">
                <NavLinks />
              </nav>
            </div>
          </div>
        ) : null}

        <main className="flex-1 overflow-auto p-4 md:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
