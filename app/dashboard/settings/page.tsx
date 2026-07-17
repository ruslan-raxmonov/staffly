"use client";

import { settingsSections } from "@/lib/demo-data";
import { useState } from "react";

export default function SettingsPage() {
  const [active, setActive] = useState(settingsSections[0].id);
  const [workspaceName, setWorkspaceName] = useState("Main Workspace");
  const [saved, setSaved] = useState(false);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-white">Settings</h1>
        <p className="mt-1 text-sm text-muted">
          Workspace, members, roles, security, notifications, branding.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[220px_1fr]">
        <nav className="space-y-1">
          {settingsSections.map((s) => (
            <button
              key={s.id}
              type="button"
              onClick={() => setActive(s.id)}
              className={`w-full rounded-xl px-3 py-2.5 text-left text-sm transition ${
                active === s.id
                  ? "bg-purple/20 text-white"
                  : "text-muted-2 hover:bg-white/5 hover:text-white"
              }`}
            >
              {s.title}
            </button>
          ))}
        </nav>

        <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
          {settingsSections
            .filter((s) => s.id === active)
            .map((s) => (
              <div key={s.id}>
                <h2 className="text-lg font-medium text-white">{s.title}</h2>
                <p className="mt-1 text-sm text-muted">{s.desc}</p>

                {s.id === "workspace" ? (
                  <div className="mt-6 space-y-4">
                    <label className="block space-y-2">
                      <span className="text-xs text-muted-2">Workspace name</span>
                      <input
                        value={workspaceName}
                        onChange={(e) => setWorkspaceName(e.target.value)}
                        className="w-full max-w-md rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2.5 text-sm text-white outline-none focus:border-purple/40"
                      />
                    </label>
                    <button
                      type="button"
                      onClick={() => {
                        setSaved(true);
                        setTimeout(() => setSaved(false), 1500);
                      }}
                      className="rounded-xl bg-purple px-4 py-2.5 text-sm font-medium text-white"
                    >
                      {saved ? "Saved" : "Save changes"}
                    </button>
                  </div>
                ) : null}

                {s.id === "members" ? (
                  <div className="mt-6 space-y-2">
                    {["You (Owner)", "Invite pending — teammate@company.com"].map(
                      (m) => (
                        <div
                          key={m}
                          className="rounded-xl border border-white/8 px-3 py-2.5 text-sm text-muted"
                        >
                          {m}
                        </div>
                      )
                    )}
                  </div>
                ) : null}

                {s.id === "roles" ? (
                  <div className="mt-6 flex flex-wrap gap-2">
                    {["Owner", "Admin", "Operator", "Viewer"].map((r) => (
                      <span
                        key={r}
                        className="rounded-full border border-white/10 px-3 py-1 text-xs text-muted-2"
                      >
                        {r}
                      </span>
                    ))}
                  </div>
                ) : null}

                {s.id === "security" ? (
                  <ul className="mt-6 space-y-2 text-sm text-muted">
                    <li>Session length: 14 days</li>
                    <li>SSO: Coming soon</li>
                    <li>Audit log: Enabled (demo)</li>
                  </ul>
                ) : null}

                {s.id === "notifications" ? (
                  <div className="mt-6 space-y-3">
                    {["Email digests", "Slack alerts", "In-app toasts"].map((n) => (
                      <label
                        key={n}
                        className="flex items-center justify-between rounded-xl border border-white/8 px-3 py-2.5 text-sm text-white"
                      >
                        {n}
                        <input type="checkbox" defaultChecked className="accent-purple" />
                      </label>
                    ))}
                  </div>
                ) : null}

                {s.id === "branding" ? (
                  <div className="mt-6 space-y-3 text-sm text-muted">
                    <p>Accent: Staffly Purple (#7C5CFF)</p>
                    <p>Logo: Default STɅFFLY wordmark</p>
                    <p>Email templates: Dark premium</p>
                  </div>
                ) : null}
              </div>
            ))}
        </section>
      </div>
    </div>
  );
}
