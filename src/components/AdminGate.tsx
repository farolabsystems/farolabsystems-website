"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { AdminShell } from "@/components/AdminShell";

export function AdminGate({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  if (pathname === "/admin/login") return <div className="admin-login">{children}</div>;
  return <AdminShell>{children}</AdminShell>;
}
