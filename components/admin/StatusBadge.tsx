import { ApplicationStatus } from "@/lib/types";
import { statusClass, statusLabel } from "@/lib/status";

export function StatusBadge({ status }: { status: ApplicationStatus }) {
  return (
    <span
      className={`inline-flex rounded-full border px-2.5 py-1 text-[11px] font-medium ${statusClass[status]}`}
    >
      {statusLabel[status]}
    </span>
  );
}
