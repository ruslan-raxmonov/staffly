import {
  ActivityLog,
  Application,
  ApplicationInput,
  ApplicationStatus,
  AppNotification,
  AppUser,
  MockEmail,
  Organization,
  Workspace,
} from "@/lib/types";
import { readJsonArray, token, uid, writeJsonArray } from "@/lib/store/fs";

const APPS = "applications.json";
const USERS = "users.json";
const ORGS = "organizations.json";
const WORKSPACES = "workspaces.json";
const EMAILS = "emails.json";
const ACTIVITY = "activity.json";
const NOTIFS = "notifications.json";

export async function getApplications(): Promise<Application[]> {
  return readJsonArray<Application>(APPS);
}

export async function saveApplications(apps: Application[]) {
  await writeJsonArray(APPS, apps);
}

export async function getApplicationById(id: string) {
  const apps = await getApplications();
  return apps.find((a) => a.id === id) ?? null;
}

export async function getApplicationByEmail(email: string) {
  const apps = await getApplications();
  const e = email.toLowerCase();
  return apps.find((a) => a.email.toLowerCase() === e) ?? null;
}

export async function getApplicationByVerifyToken(t: string) {
  const apps = await getApplications();
  return apps.find((a) => a.emailVerifyToken === t) ?? null;
}

export async function createApplication(
  input: ApplicationInput
): Promise<Application> {
  const apps = await getApplications();
  const now = new Date().toISOString();
  const app: Application = {
    ...input,
    id: uid("app"),
    createdAt: now,
    updatedAt: now,
    status: "email_pending",
    emailVerifiedAt: null,
    emailVerifyToken: token(32),
    approvedAt: null,
    rejectedAt: null,
    internalNotes: "",
    organizationId: null,
    userId: null,
  };
  apps.unshift(app);
  await saveApplications(apps);
  await addActivity({
    actor: "user",
    action: "application_submitted",
    entityType: "application",
    entityId: app.id,
    detail: app.email,
  });
  return app;
}

export async function updateApplication(
  id: string,
  patch: Partial<Application>
): Promise<Application | null> {
  const apps = await getApplications();
  const idx = apps.findIndex((a) => a.id === id);
  if (idx === -1) return null;
  apps[idx] = {
    ...apps[idx],
    ...patch,
    updatedAt: new Date().toISOString(),
  };
  await saveApplications(apps);
  return apps[idx];
}

export async function verifyApplicationEmail(tokenValue: string) {
  const app = await getApplicationByVerifyToken(tokenValue);
  if (!app) return null;
  if (app.status === "email_pending") {
    return updateApplication(app.id, {
      status: "pending",
      emailVerifiedAt: new Date().toISOString(),
    });
  }
  return app;
}

export async function getUsers() {
  return readJsonArray<AppUser>(USERS);
}

export async function saveUsers(users: AppUser[]) {
  await writeJsonArray(USERS, users);
}

export async function getUserByEmail(email: string) {
  const users = await getUsers();
  return users.find((u) => u.email.toLowerCase() === email.toLowerCase()) ?? null;
}

export async function getUserById(id: string) {
  const users = await getUsers();
  return users.find((u) => u.id === id) ?? null;
}

export async function getUserBySetPasswordToken(t: string) {
  const users = await getUsers();
  return users.find((u) => u.setPasswordToken === t) ?? null;
}

export async function getOrganizations() {
  return readJsonArray<Organization>(ORGS);
}

export async function getWorkspaces() {
  return readJsonArray<Workspace>(WORKSPACES);
}

export async function getEmails() {
  return readJsonArray<MockEmail>(EMAILS);
}

export async function saveEmail(email: MockEmail) {
  const emails = await getEmails();
  emails.unshift(email);
  await writeJsonArray(EMAILS, emails);
  return email;
}

export async function getActivity() {
  return readJsonArray<ActivityLog>(ACTIVITY);
}

export async function addActivity(
  input: Omit<ActivityLog, "id" | "createdAt">
) {
  const logs = await getActivity();
  const entry: ActivityLog = {
    ...input,
    id: uid("act"),
    createdAt: new Date().toISOString(),
  };
  logs.unshift(entry);
  await writeJsonArray(ACTIVITY, logs.slice(0, 500));
  return entry;
}

export async function getNotifications() {
  return readJsonArray<AppNotification>(NOTIFS);
}

export async function addNotification(
  input: Omit<AppNotification, "id" | "createdAt" | "read">
) {
  const list = await getNotifications();
  const n: AppNotification = {
    ...input,
    id: uid("ntf"),
    createdAt: new Date().toISOString(),
    read: false,
  };
  list.unshift(n);
  await writeJsonArray(NOTIFS, list.slice(0, 200));
  return n;
}

export async function approveApplication(id: string) {
  const app = await getApplicationById(id);
  if (!app) return null;
  if (app.status === "approved" && app.organizationId) {
    return { application: app, user: await getUserById(app.userId!) };
  }

  const now = new Date().toISOString();
  const orgId = uid("org");
  const wsId = uid("ws");
  const userId = uid("usr");
  const setPasswordToken = token(32);

  const org: Organization = {
    id: orgId,
    name: app.company || `${app.firstName}'s Org`,
    createdAt: now,
    applicationId: app.id,
    ownerUserId: userId,
  };

  const workspace: Workspace = {
    id: wsId,
    organizationId: orgId,
    name: "Main Workspace",
    createdAt: now,
  };

  const user: AppUser = {
    id: userId,
    email: app.email,
    firstName: app.firstName,
    lastName: app.lastName,
    passwordHash: null,
    setPasswordToken,
    applicationId: app.id,
    organizationId: orgId,
    workspaceId: wsId,
    role: "owner",
    active: true,
    createdAt: now,
  };

  const orgs = await getOrganizations();
  orgs.unshift(org);
  await writeJsonArray(ORGS, orgs);

  const workspaces = await getWorkspaces();
  workspaces.unshift(workspace);
  await writeJsonArray(WORKSPACES, workspaces);

  const users = await getUsers();
  const existing = users.findIndex(
    (u) => u.email.toLowerCase() === app.email.toLowerCase()
  );
  if (existing >= 0) users[existing] = user;
  else users.unshift(user);
  await saveUsers(users);

  const updated = await updateApplication(id, {
    status: "approved",
    approvedAt: now,
    rejectedAt: null,
    organizationId: orgId,
    userId,
  });

  await addActivity({
    actor: "admin",
    action: "application_approved",
    entityType: "application",
    entityId: id,
    detail: app.email,
  });

  await addNotification({
    title: "Application approved",
    body: `${app.firstName} ${app.lastName} (${app.email}) approved`,
    href: `/admin/applications/${id}`,
  });

  return { application: updated!, user, org, workspace };
}

export async function rejectApplication(id: string, notes?: string) {
  const app = await updateApplication(id, {
    status: "rejected",
    rejectedAt: new Date().toISOString(),
    internalNotes: notes
      ? `${(await getApplicationById(id))?.internalNotes || ""}\n${notes}`.trim()
      : undefined,
  });
  if (app) {
    await addActivity({
      actor: "admin",
      action: "application_rejected",
      entityType: "application",
      entityId: id,
      detail: app.email,
    });
  }
  return app;
}

export async function setApplicationStatus(
  id: string,
  status: ApplicationStatus
) {
  return updateApplication(id, { status });
}

export function computeApplicationStats(apps: Application[]) {
  const now = Date.now();
  const day = 24 * 60 * 60 * 1000;
  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);

  const byStatus: Record<string, number> = {
    email_pending: 0,
    pending: 0,
    approved: 0,
    rejected: 0,
    more_info: 0,
  };
  const byCountry: Record<string, number> = {};
  const byIndustry: Record<string, number> = {};

  for (const a of apps) {
    byStatus[a.status] = (byStatus[a.status] || 0) + 1;
    byCountry[a.country || "Unknown"] =
      (byCountry[a.country || "Unknown"] || 0) + 1;
    byIndustry[a.industry || "Unknown"] =
      (byIndustry[a.industry || "Unknown"] || 0) + 1;
  }

  const top = (obj: Record<string, number>, n = 5) =>
    Object.entries(obj)
      .sort((a, b) => b[1] - a[1])
      .slice(0, n)
      .map(([name, count]) => ({ name, count }));

  const approved = byStatus.approved || 0;
  const rejected = byStatus.rejected || 0;
  const decided = approved + rejected;

  return {
    total: apps.length,
    today: apps.filter((a) => new Date(a.createdAt) >= todayStart).length,
    last7Days: apps.filter(
      (a) => now - new Date(a.createdAt).getTime() <= 7 * day
    ).length,
    byStatus,
    approved,
    rejected,
    pending: (byStatus.pending || 0) + (byStatus.email_pending || 0),
    conversionRate: decided ? Math.round((approved / decided) * 100) : 0,
    topCountries: top(byCountry),
    topIndustries: top(byIndustry),
  };
}

/** Legacy compatibility for old admin APIs */
export async function getRequests() {
  return getApplications();
}

export async function addRequest(input: ApplicationInput) {
  return createApplication(input);
}

export function computeStats(apps: Application[]) {
  return computeApplicationStats(apps);
}

export async function updateRequestStatus(
  id: string,
  status: ApplicationStatus | "new" | "reviewed" | "contacted"
) {
  const map: Record<string, ApplicationStatus> = {
    new: "pending",
    reviewed: "pending",
    contacted: "more_info",
    email_pending: "email_pending",
    pending: "pending",
    approved: "approved",
    rejected: "rejected",
    more_info: "more_info",
  };
  return setApplicationStatus(id, map[status] || "pending");
}
