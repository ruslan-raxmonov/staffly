"use client";

export default function AdminSettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-white">Settings</h1>
        <p className="mt-1 text-sm text-muted">Admin configuration (demo).</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {[
          {
            title: "Access control",
            body: "Only admins can approve applications. Default local credentials can be overridden with env vars in production.",
          },
          {
            title: "Email delivery",
            body: "Mock mailer writes to data/emails.json. Swap lib/mail.ts for Resend/SMTP when ready.",
          },
          {
            title: "Provisioning",
            body: "Approve creates Organization, Workspace, User, and sends a welcome email with set-password link.",
          },
          {
            title: "Database",
            body: "JSON stores under /data. Schema matches a future Supabase migration path.",
          },
        ].map((card) => (
          <div
            key={card.title}
            className="rounded-2xl border border-white/10 bg-white/[0.03] p-5"
          >
            <h2 className="text-sm font-medium text-white">{card.title}</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted">{card.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
