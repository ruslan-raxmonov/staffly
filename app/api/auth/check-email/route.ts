import {
  getApplicationByEmail,
  getUserByEmail,
} from "@/lib/store";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const email = String(body.email || "").trim().toLowerCase();

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Email noto‘g‘ri" }, { status: 400 });
  }

  const app = await getApplicationByEmail(email);
  if (!app) {
    return NextResponse.json({
      code: "no_application",
      action: "request",
      message: "Bu email bilan so‘rov topilmadi. Avval so‘rov yuboring.",
    });
  }

  if (app.status === "email_pending") {
    return NextResponse.json({
      code: "email_pending",
      action: "request",
      applicationId: app.id,
      message:
        "Email hali tasdiqlanmagan. Avval so‘rov yuboring yoki emailni tasdiqlang.",
    });
  }

  if (app.status === "pending" || app.status === "more_info") {
    return NextResponse.json({
      code: app.status,
      action: "pending",
      applicationId: app.id,
      redirect: `/access-pending?id=${app.id}`,
      message: "So‘rovingiz ko‘rib chiqilmoqda.",
    });
  }

  if (app.status === "rejected") {
    return NextResponse.json({
      code: "rejected",
      action: "pending",
      applicationId: app.id,
      redirect: `/access-pending?id=${app.id}`,
      message: "So‘rov rad etilgan.",
    });
  }

  // approved
  const user = await getUserByEmail(email);
  if (!user || !user.active) {
    return NextResponse.json({
      code: "no_user",
      action: "request",
      message: "Hisob topilmadi. So‘rov yuboring.",
    });
  }

  if (!user.passwordHash) {
    return NextResponse.json({
      code: "set_password",
      action: "set_password",
      applicationId: app.id,
      firstName: user.firstName,
      message: "Birinchi kirish: yangi parol o‘rnating.",
    });
  }

  return NextResponse.json({
    code: "login",
    action: "login",
    applicationId: app.id,
    firstName: user.firstName,
    message: "Parolingizni kiriting.",
  });
}
