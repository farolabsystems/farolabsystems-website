import Link from "next/link";
import type { ReactNode } from "react";

type Props = {
  href?: string;
  children: ReactNode;
  variant?: "primary" | "ghost" | "dark";
  type?: "button" | "submit";
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
};

export function Button({
  href,
  children,
  variant = "primary",
  type = "button",
  disabled,
  onClick,
  className = "",
}: Props) {
  const classes = ["btn", variant === "ghost" ? "btn-ghost" : "", variant === "dark" ? "btn-dark" : "", className]
    .filter(Boolean)
    .join(" ");
  if (href) {
    return (
      <Link className={classes} href={href}>
        {children}
      </Link>
    );
  }
  return (
    <button className={classes} type={type} disabled={disabled} onClick={onClick}>
      {children}
    </button>
  );
}
