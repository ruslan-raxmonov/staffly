import { supabase } from '@/lib/db';
import {
  Application,
  ApplicationInput,
  ApplicationStatus,
  AppUser,
  Organization,
  Workspace,
  MockEmail,
  ActivityLog,
  AppNotification,
} from '@/lib/types';
import { token, uid } from './fs';

// Map snake_case DB fields to camelCase TypeScript
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapApp(row: any): Application {
  return {
    id: row.id,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    firstName: row.first_name,
    lastName: row.last_name,
    email: row.email,
    phone: row.phone,
    company: row.company || '',
    country: row.country || '',
    website: row.website || '',
    companySize: row.company_size || '',
    industry: row.industry || '',
    jobTitle: row.job_title || '',
    reason: row.reason,
    userType: row.user_type,
    expectedAiEmployees: row.expected_ai_employees || '',
    currentTools: row.current_tools || '',
    notes: row.notes || '',
    status: row.status,
    emailVerifiedAt: row.email_verified_at,
    emailVerifyToken: row.email_verify_token,
    approvedAt: row.approved_at,
    rejectedAt: row.rejected_at,
    internalNotes: row.internal_notes || '',
    organizationId: row.organization_id,
    userId: row.user_id,
  };
}

// Map camelCase TypeScript to snake_case DB
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function toDbApp(app: Partial<Application>): any {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const row: any = {};
  if (app.id !== undefined) row.id = app.id;
  if (app.createdAt !== undefined) row.created_at = app.createdAt;
  if (app.updatedAt !== undefined) row.updated_at = app.updatedAt;
  if (app.firstName !== undefined) row.first_name = app.firstName;
  if (app.lastName !== undefined) row.last_name = app.lastName;
  if (app.email !== undefined) row.email = app.email;
  if (app.phone !== undefined) row.phone = app.phone;
  if (app.company !== undefined) row.company = app.company;
  if (app.country !== undefined) row.country = app.country;
  if (app.website !== undefined) row.website = app.website;
  if (app.companySize !== undefined) row.company_size = app.companySize;
  if (app.industry !== undefined) row.industry = app.industry;
  if (app.jobTitle !== undefined) row.job_title = app.jobTitle;
  if (app.reason !== undefined) row.reason = app.reason;
  if (app.userType !== undefined) row.user_type = app.userType;
  if (app.expectedAiEmployees !== undefined) row.expected_ai_employees = app.expectedAiEmployees;
  if (app.currentTools !== undefined) row.current_tools = app.currentTools;
  if (app.notes !== undefined) row.notes = app.notes;
  if (app.status !== undefined) row.status = app.status;
  if (app.emailVerifiedAt !== undefined) row.email_verified_at = app.emailVerifiedAt;
  if (app.emailVerifyToken !== undefined) row.email_verify_token = app.emailVerifyToken;
  if (app.approvedAt !== undefined) row.approved_at = app.approvedAt;
  if (app.rejectedAt !== undefined) row.rejected_at = app.rejectedAt;
  if (app.internalNotes !== undefined) row.internal_notes = app.internalNotes;
  if (app.organizationId !== undefined) row.organization_id = app.organizationId;
  if (app.userId !== undefined) row.user_id = app.userId;
  return row;
}

// Applications
export async function getApplications(): Promise<Application[]> {
  const { data, error } = await supabase
    .from('applications')
    .select('*')
    .order('created_at', { ascending: false });
  
  if (error) {
    console.error('getApplications error:', error);
    return [];
  }
  return (data || []).map(mapApp);
}

export async function getApplicationById(id: string): Promise<Application | null> {
  const { data, error } = await supabase
    .from('applications')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) return null;
  return data ? mapApp(data) : null;
}

export async function getApplicationByEmail(email: string): Promise<Application | null> {
  const { data, error } = await supabase
    .from('applications')
    .select('*')
    .ilike('email', email)
    .single();
  
  if (error) return null;
  return data ? mapApp(data) : null;
}

export async function getApplicationByVerifyToken(token: string): Promise<Application | null> {
  const { data, error } = await supabase
    .from('applications')
    .select('*')
    .eq('email_verify_token', token)
    .single();
  
  if (error) return null;
  return data ? mapApp(data) : null;
}

export async function createApplication(input: ApplicationInput): Promise<Application> {
  const now = new Date().toISOString();
  const app: Application = {
    id: uid('app'),
    firstName: input.firstName,
    lastName: input.lastName,
    email: input.email,
    phone: input.phone,
    company: input.company || '',
    country: input.country || '',
    website: input.website || '',
    companySize: input.companySize || '',
    industry: input.industry || '',
    jobTitle: input.jobTitle || '',
    reason: input.reason,
    userType: input.userType,
    expectedAiEmployees: input.expectedAiEmployees || '',
    currentTools: input.currentTools || '',
    notes: input.notes || '',
    status: 'email_pending',
    emailVerifiedAt: null,
    emailVerifyToken: token(32),
    approvedAt: null,
    rejectedAt: null,
    internalNotes: '',
    organizationId: null,
    userId: null,
    createdAt: now,
    updatedAt: now,
  };

  const { data, error } = await supabase
    .from('applications')
    .insert([toDbApp(app)])
    .select()
    .single();

  if (error) {
    console.error('createApplication error:', error);
    throw error;
  }

  await addActivity({
    actor: 'user',
    action: 'application_submitted',
    entityType: 'application',
    entityId: app.id,
    detail: app.email,
  });

  return mapApp(data);
}

export async function updateApplication(
  id: string,
  patch: Partial<Application>
): Promise<Application | null> {
  const dbPatch = toDbApp({ ...patch, updatedAt: new Date().toISOString() });
  
  const { data, error } = await supabase
    .from('applications')
    .update(dbPatch)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('updateApplication error:', error);
    return null;
  }
  return mapApp(data);
}

export async function verifyApplicationEmail(tokenValue: string): Promise<Application | null> {
  const app = await getApplicationByVerifyToken(tokenValue);
  if (!app) return null;
  
  if (app.status === 'email_pending') {
    return updateApplication(app.id, {
      status: 'pending',
      emailVerifiedAt: new Date().toISOString(),
    });
  }
  return app;
}

// Map user from snake_case DB
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapUser(row: any): AppUser {
  return {
    id: row.id,
    email: row.email,
    firstName: row.first_name,
    lastName: row.last_name,
    passwordHash: row.password_hash,
    setPasswordToken: row.set_password_token,
    applicationId: row.application_id,
    organizationId: row.organization_id,
    workspaceId: row.workspace_id,
    role: row.role,
    active: row.active,
    createdAt: row.created_at,
  };
}

// Users
export async function getUsers(): Promise<AppUser[]> {
  const { data, error } = await supabase.from('users').select('*');
  if (error) return [];
  return (data || []).map(mapUser);
}

export async function saveUsers(): Promise<void> {
  // Supabase doesn't need bulk save — use insert/update directly
  // This is here for compatibility with fs-store
  console.warn('saveUsers is a no-op in Supabase mode');
}

export async function getUserByEmail(email: string): Promise<AppUser | null> {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .ilike('email', email)
    .single();
  if (error) return null;
  return mapUser(data);
}

export async function getUserById(id: string): Promise<AppUser | null> {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', id)
    .single();
  if (error) return null;
  return mapUser(data);
}

export async function getUserBySetPasswordToken(t: string): Promise<AppUser | null> {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('set_password_token', t)
    .single();
  if (error) return null;
  return mapUser(data);
}

// Organizations
export async function getOrganizations(): Promise<Organization[]> {
  const { data, error } = await supabase.from('organizations').select('*');
  if (error) return [];
  return data || [];
}

// Workspaces
export async function getWorkspaces(): Promise<Workspace[]> {
  const { data, error } = await supabase.from('workspaces').select('*');
  if (error) return [];
  return data || [];
}

// Emails
export async function getEmails(): Promise<MockEmail[]> {
  const { data, error } = await supabase
    .from('emails')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) return [];
  return data || [];
}

export async function saveEmail(email: MockEmail): Promise<MockEmail> {
  const dbEmail = {
    id: email.id,
    to_email: email.to,
    subject: email.subject,
    html: email.html,
    text: email.body,
    meta: email.meta || {},
    created_at: email.createdAt,
  };

  const { data, error } = await supabase
    .from('emails')
    .insert([dbEmail])
    .select()
    .single();
  
  if (error) {
    console.error('saveEmail error:', error);
    return email;
  }
  return email; // Return original format for compatibility
}

// Activity
export async function getActivity(): Promise<ActivityLog[]> {
  const { data, error } = await supabase
    .from('activity')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(500);
  if (error) return [];
  return data || [];
}

export async function addActivity(
  input: Omit<ActivityLog, 'id' | 'createdAt'>
): Promise<ActivityLog> {
  const entry: ActivityLog = {
    id: uid('act'),
    actor: input.actor,
    action: input.action,
    entityType: input.entityType,
    entityId: input.entityId,
    detail: input.detail || '',
    createdAt: new Date().toISOString(),
  };

  const dbEntry = {
    id: entry.id,
    actor: entry.actor,
    action: entry.action,
    entity_type: entry.entityType,
    entity_id: entry.entityId,
    detail: entry.detail,
    created_at: entry.createdAt,
  };

  const { data, error } = await supabase
    .from('activity')
    .insert([dbEntry])
    .select()
    .single();

  if (error) {
    console.error('addActivity error:', error);
    return entry;
  }
  return entry;
}

// Notifications
export async function getNotifications(): Promise<AppNotification[]> {
  const { data, error } = await supabase
    .from('notifications')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(200);
  if (error) return [];
  return data || [];
}

export async function addNotification(
  input: Omit<AppNotification, 'id' | 'createdAt' | 'read'>
): Promise<AppNotification> {
  const n: AppNotification = {
    id: uid('ntf'),
    title: input.title,
    body: input.body,
    href: input.href || '',
    read: false,
    createdAt: new Date().toISOString(),
  };

  const dbNotif = {
    id: n.id,
    title: n.title,
    body: n.body,
    href: n.href,
    read: n.read,
    created_at: n.createdAt,
  };

  const { data, error } = await supabase
    .from('notifications')
    .insert([dbNotif])
    .select()
    .single();

  if (error) {
    console.error('addNotification error:', error);
    return n;
  }
  return n;
}

// Approve/Reject
export async function approveApplication(id: string) {
  const app = await getApplicationById(id);
  if (!app) return null;

  if (app.status === 'approved' && app.organizationId) {
    return { application: app, user: await getUserById(app.userId!) };
  }

  const now = new Date().toISOString();
  const orgId = uid('org');
  const wsId = uid('ws');
  const userId = uid('usr');
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
    name: 'Main Workspace',
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
    role: 'owner',
    active: true,
    createdAt: now,
  };

  // Insert org, workspace, user
  const dbOrg = {
    id: org.id,
    name: org.name,
    created_at: org.createdAt,
    application_id: org.applicationId,
    owner_user_id: org.ownerUserId,
  };

  const dbWorkspace = {
    id: workspace.id,
    organization_id: workspace.organizationId,
    name: workspace.name,
    created_at: workspace.createdAt,
  };

  const dbUser = {
    id: user.id,
    email: user.email,
    first_name: user.firstName,
    last_name: user.lastName,
    password_hash: user.passwordHash,
    set_password_token: user.setPasswordToken,
    application_id: user.applicationId,
    organization_id: user.organizationId,
    workspace_id: user.workspaceId,
    role: user.role,
    active: user.active,
    created_at: user.createdAt,
  };

  await supabase.from('organizations').insert([dbOrg]);
  await supabase.from('workspaces').insert([dbWorkspace]);
  await supabase.from('users').insert([dbUser]);

  const updated = await updateApplication(id, {
    status: 'approved',
    approvedAt: now,
    rejectedAt: null,
    organizationId: orgId,
    userId,
  });

  await addActivity({
    actor: 'admin',
    action: 'application_approved',
    entityType: 'application',
    entityId: id,
    detail: app.email,
  });

  await addNotification({
    title: 'Application approved',
    body: `${app.firstName} ${app.lastName} (${app.email}) approved`,
    href: `/admin/applications/${id}`,
  });

  return { application: updated!, user, org, workspace };
}

export async function rejectApplication(id: string, notes?: string) {
  const app = await getApplicationById(id);
  if (!app) return null;

  const internalNotes = notes
    ? `${app.internalNotes || ''}\n${notes}`.trim()
    : app.internalNotes;

  const updated = await updateApplication(id, {
    status: 'rejected',
    rejectedAt: new Date().toISOString(),
    internalNotes,
  });

  if (updated) {
    await addActivity({
      actor: 'admin',
      action: 'application_rejected',
      entityType: 'application',
      entityId: id,
      detail: updated.email,
    });
  }

  return updated;
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
    byCountry[a.country || 'Unknown'] =
      (byCountry[a.country || 'Unknown'] || 0) + 1;
    byIndustry[a.industry || 'Unknown'] =
      (byIndustry[a.industry || 'Unknown'] || 0) + 1;
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
