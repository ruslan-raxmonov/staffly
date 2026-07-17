import {
  createApplication,
  getApplicationByEmail,
} from "@/lib/store";
import { sendVerificationEmail } from "@/lib/mail";
import { UserType } from "@/lib/types";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "Noto‘g‘ri so‘rov" }, { status: 400 });
  }

  const fullName = String(body.name || body.firstName || "").trim();
  const nameParts = fullName.split(/\s+/).filter(Boolean);
  const firstName = nameParts[0] || "";
  const lastName =
    String(body.lastName || "").trim() || nameParts.slice(1).join(" ");
  const email = String(body.email || "").trim().toLowerCase();
  const phone = String(body.phone || "").trim();
  const reason = String(body.reason || "").trim();
  const userType = String(body.userType || "").trim() as UserType;

  if (!firstName) {
    return NextResponse.json({ error: "Ism majburiy" }, { status: 400 });
  }
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Email noto‘g‘ri" }, { status: 400 });
  }
  if (!phone || phone.replace(/\D/g, "").length < 9) {
    return NextResponse.json({ error: "Telefon noto‘g‘ri" }, { status: 400 });
  }
  if (userType !== "business" && userType !== "individual") {
    return NextResponse.json(
      { error: "Biznes yoki Individual tanlang" },
      { status: 400 }
    );
  }
  if (!reason) {
    return NextResponse.json(
      { error: "Maqsadni yozing" },
      { status: 400 }
    );
  }

  const existing = await getApplicationByEmail(email);
  if (existing && existing.status !== "rejected") {
    return NextResponse.json(
      {
        error: "Bu email bilan so‘rov allaqachon yuborilgan",
        applicationId: existing.id,
        status: existing.status,
      },
      { status: 409 }
    );
  }

  const app = await createApplication({
    firstName,
    lastName,
    email,
    phone,
    company: "",
    country: "",
    website: "",
    companySize: "",
    industry: "",
    jobTitle: "",
    reason,
    userType,
    expectedAiEmployees: "",
    currentTools: "",
    notes: "",
  });

  const emailMsg = await sendVerificationEmail(
    email,
    firstName,
    app.emailVerifyToken
  );

  return NextResponse.json(
    {
      ok: true,
      id: app.id,
      status: app.status,
      verifyPreviewUrl: emailMsg.meta?.link,
      emailId: emailMsg.id,
    },
    { status: 201 }
  );
}
