"use client";

import { demoActivity } from "@/lib/demo-data";
import { useState } from "react";

export default function NotificationsPage() {
  const [items, setItems] = useState(
    demoActivity.map((a, i) => ({
      id: i,
      title: a.text,
      time: a.time,
      read: i > 2,
    }))
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-white">Notifications</h1>
          <p className="mt-1 text-sm text-muted">Workspace alerts and agent events.</p>
        </div>
        <button
          type="button"
          onClick={() => setItems((xs) => xs.map((x) => ({ ...x, read: true })))}
          className="text-xs text-purple hover:underline"
        >
          Mark all read
        </button>
      </div>
      <div className="space-y-2">
        {items.map((n) => (
          <button
            key={n.id}
            type="button"
            onClick={() =>
              setItems((xs) =>
                xs.map((x) => (x.id === n.id ? { ...x, read: true } : x))
              )
            }
            className={`flex w-full items-start justify-between gap-3 rounded-2xl border px-4 py-4 text-left transition ${
              n.read
                ? "border-white/5 bg-transparent"
                : "border-purple/25 bg-purple/[0.08]"
            }`}
          >
            <div>
              <p className="text-sm text-white">{n.title}</p>
              <p className="mt-1 text-xs text-muted-2">{n.time}</p>
            </div>
            {!n.read ? (
              <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-purple" />
            ) : null}
          </button>
        ))}
      </div>
    </div>
  );
}
