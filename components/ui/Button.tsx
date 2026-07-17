import Link from "next/link";
import { ButtonHTMLAttributes, MouseEventHandler, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  href?: string;
  children: ReactNode;
  className?: string;
  onClick?: MouseEventHandler<HTMLElement>;
};

const variants: Record<Variant, string> = {
  primary:
    "bg-purple text-white hover:bg-[#6a4aef] shadow-[0_0_24px_rgba(124,92,255,0.35)] hover:shadow-[0_0_32px_rgba(124,92,255,0.5)]",
  secondary:
    "glass text-white hover:bg-white/10 hover:border-white/20",
  ghost: "text-muted-2 hover:text-white bg-transparent",
};

export function Button({
  variant = "primary",
  href,
  children,
  className = "",
  onClick,
  ...props
}: ButtonProps) {
  const classes = `inline-flex items-center justify-center gap-2 rounded-2xl px-5 py-3 text-sm font-medium transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-60 ${variants[variant]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes} onClick={onClick}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} onClick={onClick} {...props}>
      {children}
    </button>
  );
}
