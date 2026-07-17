import { ADMIN_USER, isAdminAuthenticated } from "@/lib/admin-auth";
import { NextResponse } from "next/server";

export async function GET() {
  const ok = await isAdminAuthenticated();
  if (!ok) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }
  return NextResponse.json({ authenticated: true, user: ADMIN_USER });
}
