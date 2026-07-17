"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ReactNode } from "react";

type GlassCardProps = {
  children: ReactNode;
  className?: string;
  hover?: boolean;
};

export function GlassCard({
  children,
  className = "",
  hover = true,
}: GlassCardProps) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className={`glass rounded-[20px] p-6 ${className}`}
      whileHover={
        hover && !reduce
          ? {
              y: -4,
              borderColor: "rgba(124, 92, 255, 0.35)",
              boxShadow: "0 12px 40px rgba(124, 92, 255, 0.12)",
            }
          : undefined
      }
      transition={{ duration: 0.25 }}
    >
      {children}
    </motion.div>
  );
}
