"use client";

import { createContext, useCallback, useContext, useState, type ReactNode } from "react";
import { Toaster, type ToastItem } from "@/website-theme/ui/Toaster";

type ToastInput = Omit<ToastItem, "id">;

const AdminToastContext = createContext<(toast: ToastInput) => void>(() => undefined);

export function useAdminToast() {
  return useContext(AdminToastContext);
}

export function AdminToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const push = useCallback((toast: ToastInput) => {
    const id = Date.now();
    setToasts((current) => [...current.filter((item) => item.id !== id), { ...toast, id }]);
    window.setTimeout(() => {
      setToasts((current) => current.filter((item) => item.id !== id));
    }, 4200);
  }, []);

  return (
    <AdminToastContext.Provider value={push}>
      {children}
      <Toaster toasts={toasts} onDismiss={(id) => setToasts((current) => current.filter((item) => item.id !== id))} />
    </AdminToastContext.Provider>
  );
}
