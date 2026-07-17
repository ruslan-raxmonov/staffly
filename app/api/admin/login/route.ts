import {
  ADMIN_PASSWORD,
  ADMIN_USER,
  createSessionToken,
  sessionCookieOptions,
  ADMIN_COOKIE,
} from "@/lib/admin-auth";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const username = String(body.username || "").trim();
  const password = String(body.password || "");

  if (username !== ADMIN_USER || password !== ADMIN_PASSWORD) {
    return NextResponse.json(
      { error: "Login yoki parol noto'g'ri" },
      { status: 401 }
    );
  }

  const store = await cookies();
  store.set(ADMIN_COOKIE, createSessionToken(), sessionCookieOptions());

  return NextResponse.json({ ok: true, user: ADMIN_USER });
}
