import { isAdminAuthenticated } from "@/lib/admin-auth";
import {
  getApplications,
  computeApplicationStats,
} from "@/lib/store";
import { NextResponse } from "next/server";

export async function GET() {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const applications = await getApplications();
  return NextResponse.json({
    requests: applications,
    applications,
    stats: computeApplicationStats(applications),
  });
}
