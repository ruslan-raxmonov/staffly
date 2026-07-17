import { loginWithPassword, clearUserSession, getSessionUser } from "@/lib/auth";
import {
  getApplicationById,
  getApplicationByEmail,
  getUserByEmail,
} from "@/lib/store";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const email = String(body.email || "").trim().toLowerCase();
  const password = String(body.password || "");

  if (!email || !password) {
    return NextResponse.json(
      { error: "Email va parol majburiy" },
      { status: 400 }
    );
  }

  // If no user yet, guide by application status
  const existingUser = await getUserByEmail(email);
  if (!existingUser) {
    const app = await getApplicationByEmail(email);
    if (!app || app.status === "email_pending") {
      return NextResponse.json(
        {
          error:
            "Email tasdiqlanmagan yoki so‘rov topilmadi. Avval so‘rov yuboring.",
          code: "need_request",
          redirect: "/#request-access",
        },
        { status: 403 }
      );
    }
    return NextResponse.json(
      {
        error: "So‘rovingiz hali tasdiqlanmagan",
        code: "not_approved",
        redirect: `/access-pending?id=${app.id}`,
      },
      { status: 403 }
    );
  }

  const result = await loginWithPassword(email, password);
  if ("error" in result && result.error === "password_not_set") {
    return NextResponse.json(
      {
        error: "Birinchi kirish: yangi parol o‘rnating",
        code: "password_not_set",
        action: "set_password",
      },
      { status: 403 }
    );
  }
  if ("error" in result && result.error === "not_approved") {
    const app = result.application;
    return NextResponse.json(
      {
        error: "Hisob hali tasdiqlanmagan",
        code: "not_approved",
        redirect: `/access-pending?id=${app?.id || result.user?.applicationId}`,
      },
      { status: 403 }
    );
  }
  if ("error" in result && result.error === "Account not found") {
    return NextResponse.json(
      {
        error: "Hisob topilmadi. Avval so‘rov yuboring.",
        code: "need_request",
        redirect: "/#request-access",
      },
      { status: 401 }
    );
  }
  if ("error" in result) {
    return NextResponse.json(
      { error: "Email yoki parol noto‘g‘ri", code: "invalid" },
      { status: 401 }
    );
  }

  return NextResponse.json({
    ok: true,
    user: {
      id: result.user.id,
      email: result.user.email,
      firstName: result.user.firstName,
    },
    redirect: "/dashboard",
  });
}

export async function DELETE() {
  await clearUserSession();
  return NextResponse.json({ ok: true });
}

export async function GET() {
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ user: null });
  const app = await getApplicationById(user.applicationId);
  return NextResponse.json({
    user: {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      organizationId: user.organizationId,
      workspaceId: user.workspaceId,
      applicationId: user.applicationId,
    },
    applicationStatus: app?.status ?? null,
  });
}
