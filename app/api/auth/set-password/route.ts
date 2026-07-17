import { setPasswordWithToken, setPasswordForApprovedEmail } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const token = String(body.token || "");
  const email = String(body.email || "").trim().toLowerCase();
  const password = String(body.password || "");

  if (password.length < 6) {
    return NextResponse.json(
      { error: "Parol kamida 6 ta belgidan iborat bo‘lishi kerak" },
      { status: 400 }
    );
  }

  if (token) {
    const user = await setPasswordWithToken(token, password);
    if (!user) {
      return NextResponse.json(
        { error: "Havola yaroqsiz yoki muddati o‘tgan" },
        { status: 400 }
      );
    }
    return NextResponse.json({
      ok: true,
      redirect: "/dashboard",
      user: { id: user.id, email: user.email, firstName: user.firstName },
    });
  }

  if (!email) {
    return NextResponse.json(
      { error: "Email yoki token kerak" },
      { status: 400 }
    );
  }

  const result = await setPasswordForApprovedEmail(email, password);
  if ("error" in result) {
    if (result.error === "already_set") {
      return NextResponse.json(
        {
          error: "Parol allaqachon o‘rnatilgan. Kirish sahifasidan foydalaning.",
          code: "already_set",
          redirect: "/login",
        },
        { status: 409 }
      );
    }
    if (result.error === "not_approved") {
      return NextResponse.json(
        {
          error: "Hisob hali tasdiqlanmagan",
          code: "not_approved",
          redirect: `/access-pending?id=${result.application?.id || ""}`,
        },
        { status: 403 }
      );
    }
    return NextResponse.json({ error: "Hisob topilmadi" }, { status: 404 });
  }

  return NextResponse.json({
    ok: true,
    redirect: "/dashboard",
    user: {
      id: result.user.id,
      email: result.user.email,
      firstName: result.user.firstName,
    },
  });
}
