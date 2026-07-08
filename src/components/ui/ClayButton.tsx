import Link from "next/link";
import { ReactNode } from "react";

interface ClayButtonProps {
  href: string;
  children: ReactNode;
  variant?: "primary" | "soft";
  size?: "md" | "lg";
  className?: string;
}

/* Pressable clay pill — the primary action style across the site. */
export default function ClayButton({
  href,
  children,
  variant = "primary",
  size = "md",
  className = "",
}: ClayButtonProps) {
  const variants = {
    primary:
      "bg-accent text-white shadow-[6px_6px_18px_rgba(91,108,255,0.35),-4px_-4px_12px_rgba(255,255,255,0.8)] hover:bg-accent-ink",
    soft: "clay-sm text-ink hover:text-accent-ink",
  };
  const sizes = {
    md: "px-6 py-3 text-sm",
    lg: "px-8 py-4 text-base",
  };

  return (
    <Link
      href={href}
      className={`clay-press inline-flex items-center justify-center gap-2 rounded-full font-heading font-semibold tracking-wide transition-colors duration-300 ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {children}
    </Link>
  );
}
