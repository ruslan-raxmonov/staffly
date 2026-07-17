export type UserType = "business" | "individual";

export type ApplicationStatus =
  | "email_pending"
  | "pending"
  | "approved"
  | "rejected"
  | "more_info";

export type Application = {
  id: string;
  createdAt: string;
  updatedAt: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
  country: string;
  website: string;
  companySize: string;
  industry: string;
  jobTitle: string;
  reason: string;
  userType: UserType;
  expectedAiEmployees: string;
  currentTools: string;
  notes: string;
  status: ApplicationStatus;
  emailVerifiedAt: string | null;
  emailVerifyToken: string;
  approvedAt: string | null;
  rejectedAt: string | null;
  internalNotes: string;
  organizationId: string | null;
  userId: string | null;
};

export type ApplicationInput = Omit<
  Application,
  | "id"
  | "createdAt"
  | "updatedAt"
  | "status"
  | "emailVerifiedAt"
  | "emailVerifyToken"
  | "approvedAt"
  | "rejectedAt"
  | "internalNotes"
  | "organizationId"
  | "userId"
>;

/** @deprecated Use Application */
export type AccessRequest = Application & {
  role: string;
};

/** @deprecated */
export type RequestInput = ApplicationInput;

export type Organization = {
  id: string;
  name: string;
  createdAt: string;
  applicationId: string;
  ownerUserId: string;
};

export type Workspace = {
  id: string;
  organizationId: string;
  name: string;
  createdAt: string;
};

export type AppUser = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  passwordHash: string | null;
  setPasswordToken: string | null;
  applicationId: string;
  organizationId: string | null;
  workspaceId: string | null;
  role: "owner" | "member";
  active: boolean;
  createdAt: string;
};

export type MockEmail = {
  id: string;
  to: string;
  subject: string;
  body: string;
  html: string;
  createdAt: string;
  type: "verification" | "welcome" | "rejection" | "more_info" | "custom";
  meta?: Record<string, string>;
};

export type ActivityLog = {
  id: string;
  createdAt: string;
  actor: "system" | "admin" | "user";
  action: string;
  entityType: string;
  entityId: string;
  detail?: string;
};

export type AppNotification = {
  id: string;
  createdAt: string;
  title: string;
  body: string;
  read: boolean;
  href?: string;
};
