"use client";

import { formatDate } from "@/lib/status";
import { Organization, Workspace } from "@/lib/types";
import { useEffect, useState } from "react";

export default function AdminWorkspacesPage() {
  const [orgs, setOrgs] = useState<Organization[]>([]);
  const [workspaces, setWorkspaces] = useState<Workspace[]>([]);

  useEffect(() => {
    fetch("/api/admin/overview?resource=workspaces")
      .then((r) => r.json())
      .then((d) => {
        setOrgs(d.organizations || []);
        setWorkspaces(d.workspaces || []);
      });
  }, []);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold text-white">Workspaces</h1>
        <p className="mt-1 text-sm text-muted">
          Organizations and workspaces created on approval.
        </p>
      </div>

      <section className="overflow-hidden rounded-2xl border border-white/10">
        <div className="border-b border-white/10 px-4 py-3 text-sm font-medium text-white">
          Organizations
        </div>
        <table className="w-full min-w-[600px] text-left text-sm">
          <thead className="border-b border-white/10 bg-white/[0.02] text-xs uppercase tracking-wider text-muted-2">
            <tr>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">ID</th>
              <th className="px-4 py-3">Created</th>
            </tr>
          </thead>
          <tbody>
            {orgs.length === 0 ? (
              <tr>
                <td colSpan={3} className="px-4 py-8 text-center text-muted">
                  No organizations yet.
                </td>
              </tr>
            ) : (
              orgs.map((o) => (
                <tr key={o.id} className="border-b border-white/5">
                  <td className="px-4 py-3.5 text-white">{o.name}</td>
                  <td className="px-4 py-3.5 font-mono text-xs text-muted">{o.id}</td>
                  <td className="px-4 py-3.5 text-muted">{formatDate(o.createdAt)}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </section>

      <section className="overflow-hidden rounded-2xl border border-white/10">
        <div className="border-b border-white/10 px-4 py-3 text-sm font-medium text-white">
          Workspaces
        </div>
        <table className="w-full min-w-[600px] text-left text-sm">
          <thead className="border-b border-white/10 bg-white/[0.02] text-xs uppercase tracking-wider text-muted-2">
            <tr>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Organization</th>
              <th className="px-4 py-3">Created</th>
            </tr>
          </thead>
          <tbody>
            {workspaces.length === 0 ? (
              <tr>
                <td colSpan={3} className="px-4 py-8 text-center text-muted">
                  No workspaces yet.
                </td>
              </tr>
            ) : (
              workspaces.map((w) => (
                <tr key={w.id} className="border-b border-white/5">
                  <td className="px-4 py-3.5 text-white">{w.name}</td>
                  <td className="px-4 py-3.5 font-mono text-xs text-muted">
                    {w.organizationId}
                  </td>
                  <td className="px-4 py-3.5 text-muted">{formatDate(w.createdAt)}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </section>
    </div>
  );
}
