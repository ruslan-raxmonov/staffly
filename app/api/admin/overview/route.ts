import { isAdminAuthenticated } from "@/lib/admin-auth";
import {
  getEmails,
  getUsers,
  getOrganizations,
  getWorkspaces,
  getNotifications,
  getActivity,
  getApplications,
  computeApplicationStats,
} from "@/lib/store";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { searchParams } = new URL(req.url);
  const resource = searchParams.get("resource") || "overview";

  if (resource === "emails") {
    return NextResponse.json({ emails: await getEmails() });
  }
  if (resource === "users") {
    return NextResponse.json({ users: await getUsers() });
  }
  if (resource === "workspaces") {
    return NextResponse.json({
      organizations: await getOrganizations(),
      workspaces: await getWorkspaces(),
    });
  }
  if (resource === "notifications") {
    return NextResponse.json({ notifications: await getNotifications() });
  }
  if (resource === "activity") {
    return NextResponse.json({ activity: await getActivity() });
  }

  const applications = await getApplications();
  return NextResponse.json({
    stats: computeApplicationStats(applications),
    recent: applications.slice(0, 8),
    emails: (await getEmails()).slice(0, 5),
    notifications: (await getNotifications()).slice(0, 8),
  });
}
