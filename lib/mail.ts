import { saveEmail } from "@/lib/store";
import { uid } from "@/lib/store/fs";
import { MockEmail } from "@/lib/types";

function baseUrl() {
  return process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
}

export async function sendMockEmail(input: {
  to: string;
  subject: string;
  body: string;
  html?: string;
  type: MockEmail["type"];
  meta?: Record<string, string>;
}) {
  const email: MockEmail = {
    id: uid("eml"),
    to: input.to,
    subject: input.subject,
    body: input.body,
    html: input.html || `<pre style="font-family:sans-serif">${input.body}</pre>`,
    createdAt: new Date().toISOString(),
    type: input.type,
    meta: input.meta,
  };
  await saveEmail(email);
  return email;
}

export async function sendVerificationEmail(
  to: string,
  firstName: string,
  verifyToken: string
) {
  const link = `${baseUrl()}/verify-email?token=${verifyToken}`;
  return sendMockEmail({
    to,
    type: "verification",
    subject: "Verify your email — Staffly",
    body: `Hi ${firstName},\n\nThanks for applying to Staffly.\nPlease verify your email:\n${link}\n\n— Staffly`,
    html: `
      <div style="font-family:Inter,sans-serif;background:#08090d;color:#fff;padding:32px;border-radius:16px">
        <h2 style="margin:0 0 12px">Verify your email</h2>
        <p style="color:#8b8f9a">Hi ${firstName}, thanks for requesting access to Staffly.</p>
        <p><a href="${link}" style="display:inline-block;background:#7c5cff;color:#fff;padding:12px 20px;border-radius:12px;text-decoration:none">Verify email</a></p>
        <p style="color:#8b8f9a;font-size:12px">${link}</p>
      </div>`,
    meta: { verifyToken, link },
  });
}

export async function sendWelcomeEmail(
  to: string,
  firstName: string,
  setPasswordToken: string
) {
  const setPasswordLink = `${baseUrl()}/set-password?token=${setPasswordToken}`;
  return sendMockEmail({
    to,
    type: "welcome",
    subject: "Welcome to Staffly",
    body: `Congratulations ${firstName}!\\n\\nYour Staffly workspace is now active.\\nSet your password to access the platform:\\n${setPasswordLink}\\n\\n— Staffly`,
    html: `
      <div style="font-family:Inter,sans-serif;background:#08090d;color:#fff;padding:32px;border-radius:16px">
        <h2 style="margin:0 0 12px">Welcome to Staffly</h2>
        <p style="color:#8b8f9a">Congratulations ${firstName}! Your workspace is now active.</p>
        <p style="color:#8b8f9a">Click below to set your password and access the platform.</p>
        <p><a href="${setPasswordLink}" style="display:inline-block;background:#22c55e;color:#fff;padding:12px 20px;border-radius:12px;text-decoration:none">Set Password</a></p>
        <p style="color:#8b8f9a;font-size:12px">${setPasswordLink}</p>
      </div>`,
    meta: { setPasswordToken, setPasswordLink },
  });
}

export async function sendRejectionEmail(to: string, firstName: string) {
  return sendMockEmail({
    to,
    type: "rejection",
    subject: "Update on your Staffly application",
    body: `Hi ${firstName},\n\nThank you for your interest in Staffly. After careful review, we are unable to approve access at this time.\n\nYou are welcome to apply again in the future.\n\n— Staffly Team`,
    html: `
      <div style="font-family:Inter,sans-serif;background:#08090d;color:#fff;padding:32px;border-radius:16px">
        <h2>Application update</h2>
        <p style="color:#8b8f9a">Hi ${firstName}, thank you for your interest. We are unable to approve access at this time.</p>
      </div>`,
  });
}

export async function sendMoreInfoEmail(to: string, firstName: string, message: string) {
  return sendMockEmail({
    to,
    type: "more_info",
    subject: "Staffly needs a bit more information",
    body: `Hi ${firstName},\n\n${message}\n\n— Staffly`,
  });
}
