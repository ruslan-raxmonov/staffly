import {
  InputHTMLAttributes,
  ReactNode,
  SelectHTMLAttributes,
  TextareaHTMLAttributes,
} from "react";

const fieldClass =
  "w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white placeholder:text-muted outline-none transition focus:border-purple/50 focus:ring-2 focus:ring-purple/20";

export function Input({
  label,
  className = "",
  ...props
}: InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  return (
    <label className="block space-y-2">
      <span className="text-xs font-medium text-muted-2">{label}</span>
      <input className={`${fieldClass} ${className}`} {...props} />
    </label>
  );
}

export function Textarea({
  label,
  className = "",
  ...props
}: TextareaHTMLAttributes<HTMLTextAreaElement> & { label: string }) {
  return (
    <label className="block space-y-2">
      <span className="text-xs font-medium text-muted-2">{label}</span>
      <textarea
        className={`${fieldClass} min-h-[110px] resize-y ${className}`}
        {...props}
      />
    </label>
  );
}

export function Select({
  label,
  children,
  className = "",
  ...props
}: SelectHTMLAttributes<HTMLSelectElement> & {
  label: string;
  children: ReactNode;
}) {
  return (
    <label className="block space-y-2">
      <span className="text-xs font-medium text-muted-2">{label}</span>
      <select className={`${fieldClass} ${className}`} {...props}>
        {children}
      </select>
    </label>
  );
}
