import { isAdminAuthenticated } from "@/lib/admin-auth";
import {
  approveApplication,
  rejectApplication,
  updateApplication,
  getApplicationById,
  setApplicationStatus,
} from "@/lib/store";
import {
  sendWelcomeEmail,
  sendRejectionEmail,
  sendMoreInfoEmail,
  sendMockEmail,
} from "@/lib/mail";
import { ApplicationStatus } from "@/lib/types";
import { NextResponse } from "next/server";

type Ctx = { params: Promise<{ id: string }> };

export async function GET(_req: Request, ctx: Ctx) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await ctx.params;
  const app = await getApplicationById(id);
  if (!app) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ application: app });
}

export async function PATCH(req: Request, ctx: Ctx) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await ctx.params;
  const body = await req.json().catch(() => ({}));
  const action = String(body.action || body.status || "");

  if (action === "approve" || action === "approved") {
    const result = await approveApplication(id);
    if (!result || !result.user) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    const user = result.user;
    await sendWelcomeEmail(
      user.email,
      user.firstName,
      user.setPasswordToken || ""
    );
    return NextResponse.json({
      ok: true,
      application: result.application,
      user: { id: user.id, email: user.email },
    });
  }

  if (action === "reject" || action === "rejected") {
    const app = await rejectApplication(id, body.notes);
    if (!app) return NextResponse.json({ error: "Not found" }, { status: 404 });
    await sendRejectionEmail(app.email, app.firstName);
    return NextResponse.json({ ok: true, application: app });
  }

  if (action === "more_info") {
    const message =
      String(body.message || "").trim() ||
      "Please reply with more details about your use case.";
    const app = await setApplicationStatus(id, "more_info");
    if (!app) return NextResponse.json({ error: "Not found" }, { status: 404 });
    await sendMoreInfoEmail(app.email, app.firstName, message);
    if (body.notes) {
      await updateApplication(id, {
        internalNotes: `${app.internalNotes}\n${body.notes}`.trim(),
      });
    }
    return NextResponse.json({ ok: true, application: app });
  }

  if (action === "send_email") {
    const app = await getApplicationById(id);
    if (!app) return NextResponse.json({ error: "Not found" }, { status: 404 });
    await sendMockEmail({
      to: app.email,
      subject: String(body.subject || "Message from Staffly"),
      body: String(body.body || ""),
      type: "custom",
    });
    return NextResponse.json({ ok: true });
  }

  if (action === "notes") {
    const app = await updateApplication(id, {
      internalNotes: String(body.notes || ""),
    });
    return NextResponse.json({ ok: true, application: app });
  }

  const status = action as ApplicationStatus;
  if (
    ["email_pending", "pending", "approved", "rejected", "more_info"].includes(
      status
    )
  ) {
    const updated = await setApplicationStatus(id, status);
    return NextResponse.json({ ok: true, application: updated });
  }

  return NextResponse.json({ error: "Invalid action" }, { status: 400 });
}
