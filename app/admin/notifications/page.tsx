"use client";

import { formatDate } from "@/lib/status";
import { AppNotification } from "@/lib/types";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function AdminNotificationsPage() {
  const [items, setItems] = useState<AppNotification[]>([]);

  useEffect(() => {
    fetch("/api/admin/overview?resource=notifications")
      .then((r) => r.json())
      .then((d) => setItems(d.notifications || []));
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-white">Notifications</h1>
        <p className="mt-1 text-sm text-muted">System and admin events.</p>
      </div>
      <div className="space-y-2">
        {items.length === 0 ? (
          <p className="text-sm text-muted">No notifications yet.</p>
        ) : (
          items.map((n) => (
            <div
              key={n.id}
              className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-4"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-medium text-white">{n.title}</p>
                  <p className="mt-1 text-sm text-muted">{n.body}</p>
                </div>
                <span className="shrink-0 text-xs text-muted-2">
                  {formatDate(n.createdAt)}
                </span>
              </div>
              {n.href ? (
                <Link href={n.href} className="mt-2 inline-block text-xs text-purple">
                  Open
                </Link>
              ) : null}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
