import { ReactNode } from "react";

export function Badge({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border border-purple/30 bg-purple-soft px-3.5 py-1.5 text-xs font-medium text-white/90 ${className}`}
    >
      {children}
    </span>
  );
}
