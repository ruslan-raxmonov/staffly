import { cookies } from "next/headers";

export const ADMIN_COOKIE = "staffly_admin_session";
export const ADMIN_USER = "ruslan";
export const ADMIN_PASSWORD = "ruslan";

const SESSION_TOKEN = "staffly_admin_ok_v1";

export function createSessionToken() {
  return SESSION_TOKEN;
}

export function isValidSessionToken(token: string | undefined | null) {
  return token === SESSION_TOKEN;
}

export async function isAdminAuthenticated() {
  const store = await cookies();
  return isValidSessionToken(store.get(ADMIN_COOKIE)?.value);
}

export function sessionCookieOptions(maxAge = 60 * 60 * 24 * 7) {
  return {
    httpOnly: true,
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge,
  };
}
