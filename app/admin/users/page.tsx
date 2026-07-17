"use client";

import { formatDate } from "@/lib/status";
import { AppUser } from "@/lib/types";
import { useEffect, useState } from "react";

export default function AdminUsersPage() {
  const [users, setUsers] = useState<AppUser[]>([]);

  useEffect(() => {
    fetch("/api/admin/overview?resource=users")
      .then((r) => r.json())
      .then((d) => setUsers(d.users || []));
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-white">Users</h1>
        <p className="mt-1 text-sm text-muted">
          Provisioned accounts after approval.
        </p>
      </div>
      <div className="overflow-hidden rounded-2xl border border-white/10">
        <table className="w-full min-w-[700px] text-left text-sm">
          <thead className="border-b border-white/10 bg-white/[0.02] text-xs uppercase tracking-wider text-muted-2">
            <tr>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Role</th>
              <th className="px-4 py-3">Active</th>
              <th className="px-4 py-3">Created</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-4 py-10 text-center text-muted">
                  No users yet. Approve an application to provision one.
                </td>
              </tr>
            ) : (
              users.map((u) => (
                <tr key={u.id} className="border-b border-white/5">
                  <td className="px-4 py-3.5 text-white">
                    {u.firstName} {u.lastName}
                  </td>
                  <td className="px-4 py-3.5 text-muted">{u.email}</td>
                  <td className="px-4 py-3.5 text-muted">{u.role}</td>
                  <td className="px-4 py-3.5">
                    <span
                      className={
                        u.active ? "text-emerald" : "text-muted-2"
                      }
                    >
                      {u.active ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="px-4 py-3.5 text-muted">
                    {formatDate(u.createdAt)}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
