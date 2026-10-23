"use client";

import type { ReactNode } from "react";

export function LogoutButton({ className = "nav-link", children = "Log out" }: { className?: string; children?: ReactNode }) {
  return (
    <button
      type="button"
      className={className}
      onClick={() => {
        void fetch("/api/auth/logout", { method: "POST" }).then(() => {
          window.location.href = "/admin/login";
        });
      }}
    >
      {children}
    </button>
  );
}
