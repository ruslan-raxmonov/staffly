import { ApplicationStatus } from "@/lib/types";

export const statusLabel: Record<ApplicationStatus, string> = {
  email_pending: "Email Pending",
  pending: "Pending",
  approved: "Approved",
  rejected: "Rejected",
  more_info: "More Info",
};

export const statusClass: Record<ApplicationStatus, string> = {
  email_pending: "border-amber-400/30 bg-amber-400/10 text-amber-300",
  pending: "border-purple/30 bg-purple-soft text-purple",
  approved: "border-emerald/30 bg-emerald-soft text-emerald",
  rejected: "border-red-400/30 bg-red-400/10 text-red-300",
  more_info: "border-amber-300/30 bg-amber-300/10 text-amber-200",
};

export function formatDate(iso: string) {
  try {
    return new Date(iso).toLocaleString(undefined, {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return iso;
  }
}
