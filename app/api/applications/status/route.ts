import {
  getApplicationById,
  verifyApplicationEmail,
  addActivity,
} from "@/lib/store";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get("token");
  if (!token) {
    return NextResponse.json({ error: "Missing token" }, { status: 400 });
  }
  const app = await verifyApplicationEmail(token);
  if (!app) {
    return NextResponse.json({ error: "Invalid token" }, { status: 404 });
  }
  await addActivity({
    actor: "user",
    action: "email_verified",
    entityType: "application",
    entityId: app.id,
    detail: app.email,
  });
  return NextResponse.json({
    ok: true,
    applicationId: app.id,
    status: app.status,
    email: app.email,
  });
}

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const id = String(body.applicationId || "");
  if (!id) {
    return NextResponse.json({ error: "Missing id" }, { status: 400 });
  }
  const app = await getApplicationById(id);
  if (!app) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json({
    id: app.id,
    status: app.status,
    email: app.email,
    firstName: app.firstName,
    emailVerifiedAt: app.emailVerifiedAt,
    createdAt: app.createdAt,
    approvedAt: app.approvedAt,
    rejectedAt: app.rejectedAt,
  });
}
