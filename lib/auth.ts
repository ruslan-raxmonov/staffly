import { cookies } from "next/headers";
import { createHash, timingSafeEqual } from "crypto";
import {
  getUserByEmail,
  getUserById,
  getApplicationById,
  saveUsers,
  getUsers,
} from "@/lib/store";
import { AppUser } from "@/lib/types";

export const USER_COOKIE = "staffly_user_session";

function hashPassword(password: string) {
  return createHash("sha256").update(`staffly:${password}`).digest("hex");
}

export function verifyPassword(password: string, hash: string | null) {
  if (!hash) return false;
  const a = Buffer.from(hashPassword(password));
  const b = Buffer.from(hash);
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

export function sessionCookieOptions(maxAge = 60 * 60 * 24 * 14) {
  return {
    httpOnly: true,
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge,
  };
}

export async function setUserSession(userId: string) {
  const store = await cookies();
  store.set(USER_COOKIE, userId, sessionCookieOptions());
}

export async function clearUserSession() {
  const store = await cookies();
  store.delete(USER_COOKIE);
}

export async function getSessionUser(): Promise<AppUser | null> {
  const store = await cookies();
  const id = store.get(USER_COOKIE)?.value;
  if (!id) return null;
  const user = await getUserById(id);
  if (!user || !user.active) return null;
  return user;
}

export async function loginWithPassword(email: string, password: string) {
  const user = await getUserByEmail(email);
  if (!user || !user.active) return { error: "Account not found" as const };
  if (!user.passwordHash) {
    return { error: "password_not_set" as const, user };
  }
  if (!verifyPassword(password, user.passwordHash)) {
    return { error: "Invalid credentials" as const };
  }
  const app = await getApplicationById(user.applicationId);
  if (!app || app.status !== "approved") {
    return { error: "not_approved" as const, user, application: app };
  }
  await setUserSession(user.id);
  return { user, application: app };
}

export async function setPasswordWithToken(tokenValue: string, password: string) {
  const users = await getUsers();
  const idx = users.findIndex((u) => u.setPasswordToken === tokenValue);
  if (idx === -1) return null;
  users[idx] = {
    ...users[idx],
    passwordHash: hashPassword(password),
    setPasswordToken: null,
  };
  await saveUsers(users);
  await setUserSession(users[idx].id);
  return users[idx];
}

/** First login after approval: set password by email when none exists yet. */
export async function setPasswordForApprovedEmail(
  email: string,
  password: string
) {
  const user = await getUserByEmail(email);
  if (!user || !user.active) return { error: "not_found" as const };
  if (user.passwordHash) return { error: "already_set" as const };

  const app = await getApplicationById(user.applicationId);
  if (!app || app.status !== "approved") {
    return { error: "not_approved" as const, application: app };
  }

  const users = await getUsers();
  const idx = users.findIndex((u) => u.id === user.id);
  if (idx === -1) return { error: "not_found" as const };

  users[idx] = {
    ...users[idx],
    passwordHash: hashPassword(password),
    setPasswordToken: null,
  };
  await saveUsers(users);
  await setUserSession(users[idx].id);
  return { user: users[idx] };
}

export { hashPassword };
