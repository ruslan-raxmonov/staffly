"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  FileText,
  Users,
  Building2,
  BarChart3,
  Mail,
  Bell,
  Settings,
  LogOut,
} from "lucide-react";
import { ReactNode, useEffect, useState } from "react";

const nav = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/applications", label: "Applications", icon: FileText },
  { href: "/admin/users", label: "Users", icon: Users },
  { href: "/admin/workspaces", label: "Workspaces", icon: Building2 },
  { href: "/admin/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/admin/email", label: "Email", icon: Mail },
  { href: "/admin/notifications", label: "Notifications", icon: Bell },
  { href: "/admin/settings", label: "Settings", icon: Settings },
];

export default function AdminLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [authed, setAuthed] = useState<boolean | null>(null);
  const [loginUser, setLoginUser] = useState("");
  const [loginPass, setLoginPass] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch("/api/admin/me")
      .then((r) => setAuthed(r.ok))
      .catch(() => setAuthed(false));
  }, [pathname]);

  const onLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setLoginError("");
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: loginUser, password: loginPass }),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        setLoginError(err.error || "Login failed");
        return;
      }
      setAuthed(true);
      router.refresh();
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    setAuthed(false);
    router.push("/admin");
  };

  if (authed === null) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#08090d] text-muted">
        Loading…
      </div>
    );
  }

  if (!authed) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#08090d] px-5">
        <form
          onSubmit={onLogin}
          className="w-full max-w-sm rounded-[24px] border border-white/10 bg-white/[0.03] p-8"
        >
          <p className="text-xs uppercase tracking-[0.2em] text-purple">Admin</p>
          <h1 className="mt-2 text-2xl font-semibold text-white">Staffly Admin</h1>
          <div className="mt-6 space-y-3">
            <input
              placeholder="Username"
              value={loginUser}
              onChange={(e) => setLoginUser(e.target.value)}
              className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white outline-none"
            />
            <input
              type="password"
              placeholder="Password"
              value={loginPass}
              onChange={(e) => setLoginPass(e.target.value)}
              className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white outline-none"
            />
          </div>
          {loginError ? <p className="mt-3 text-sm text-red-400">{loginError}</p> : null}
          <button
            type="submit"
            disabled={loading}
            className="mt-5 w-full rounded-2xl bg-purple py-3 text-sm font-medium text-white"
          >
            Sign in
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-[#08090d] text-white">
      <aside className="hidden w-60 shrink-0 border-r border-white/10 bg-[#0d0f16] p-4 md:flex md:flex-col">
        <Link href="/admin" className="mb-8 px-2 text-lg font-semibold">
          STɅFFLY Admin
        </Link>
        <nav className="flex flex-1 flex-col gap-1">
          {nav.map((item) => {
            const active =
              item.href === "/admin"
                ? pathname === "/admin"
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
        </nav>
        <button
          type="button"
          onClick={logout}
          className="mt-4 flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm text-muted-2 hover:bg-white/5 hover:text-white"
        >
          <LogOut size={16} />
          Logout
        </button>
      </aside>
      <main className="flex-1 overflow-auto p-5 md:p-8">{children}</main>
    </div>
  );
}
