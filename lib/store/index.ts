// Auto-switch between Supabase (production) and filesystem (dev/local)
import type {
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

const USE_DB = !!(
  process.env.NEXT_PUBLIC_SUPABASE_URL &&
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// eslint-disable-next-line @typescript-eslint/no-require-imports
const store = USE_DB ? require('./db') : require('./fs-store');

export const getApplications: () => Promise<Application[]> = store.getApplications;
export const getApplicationById: (id: string) => Promise<Application | null> = store.getApplicationById;
export const getApplicationByEmail: (email: string) => Promise<Application | null> = store.getApplicationByEmail;
export const getApplicationByVerifyToken: (token: string) => Promise<Application | null> = store.getApplicationByVerifyToken;
export const createApplication: (input: ApplicationInput) => Promise<Application> = store.createApplication;
export const updateApplication: (id: string, patch: Partial<Application>) => Promise<Application | null> = store.updateApplication;
export const verifyApplicationEmail: (token: string) => Promise<Application | null> = store.verifyApplicationEmail;

export const getUsers: () => Promise<AppUser[]> = store.getUsers;
export const saveUsers: (users: AppUser[]) => Promise<void> = store.saveUsers;
export const getUserByEmail: (email: string) => Promise<AppUser | null> = store.getUserByEmail;
export const getUserById: (id: string) => Promise<AppUser | null> = store.getUserById;
export const getUserBySetPasswordToken: (token: string) => Promise<AppUser | null> = store.getUserBySetPasswordToken;

export const getOrganizations: () => Promise<Organization[]> = store.getOrganizations;
export const getWorkspaces: () => Promise<Workspace[]> = store.getWorkspaces;

export const getEmails: () => Promise<MockEmail[]> = store.getEmails;
export const saveEmail: (email: MockEmail) => Promise<MockEmail> = store.saveEmail;

export const getActivity: () => Promise<ActivityLog[]> = store.getActivity;
export const addActivity: (input: Omit<ActivityLog, 'id' | 'createdAt'>) => Promise<ActivityLog> = store.addActivity;

export const getNotifications: () => Promise<AppNotification[]> = store.getNotifications;
export const addNotification: (input: Omit<AppNotification, 'id' | 'createdAt' | 'read'>) => Promise<AppNotification> = store.addNotification;

export const approveApplication: (id: string) => Promise<{
  application: Application;
  user: AppUser;
  org: Organization;
  workspace: Workspace;
} | null> = store.approveApplication;
export const rejectApplication: (id: string, notes?: string) => Promise<Application | null> = store.rejectApplication;
export const setApplicationStatus: (id: string, status: ApplicationStatus) => Promise<Application | null> = store.setApplicationStatus;
export const computeApplicationStats: (apps: Application[]) => {
  total: number;
  today: number;
  last7Days: number;
  byStatus: Record<string, number>;
  approved: number;
  rejected: number;
  pending: number;
  conversionRate: number;
  topCountries: Array<{ name: string; count: number }>;
  topIndustries: Array<{ name: string; count: number }>;
} = store.computeApplicationStats;

// Legacy compatibility
export const getRequests = getApplications;
export const addRequest = createApplication;
export const computeStats = computeApplicationStats;
export const updateRequestStatus = setApplicationStatus;
