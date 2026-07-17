import { ADMIN_COOKIE, sessionCookieOptions } from "@/lib/admin-auth";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
  const store = await cookies();
  store.set(ADMIN_COOKIE, "", { ...sessionCookieOptions(0), maxAge: 0 });
  return NextResponse.json({ ok: true });
}
