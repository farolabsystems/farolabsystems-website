"use client";

export type ToastItem = {
  id: number;
  tone: "success" | "error";
  title: string;
  body?: string;
};

type Props = {
  toasts: ToastItem[];
  onDismiss: (id: number) => void;
};

export function Toaster({ toasts, onDismiss }: Props) {
  if (toasts.length === 0) return null;
  return (
    <div className="toaster" aria-live="polite">
      {toasts.map((toast) => (
        <div key={toast.id} className={toast.tone === "success" ? "toast is-success" : "toast is-error"} role={toast.tone === "error" ? "alert" : "status"}>
          <span className="toast-mark" aria-hidden="true">
            {toast.tone === "success" ? (
              <svg viewBox="0 0 20 20" width="16" height="16">
                <path d="M5 10.5 8.2 14 15 6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            ) : (
              <svg viewBox="0 0 20 20" width="16" height="16">
                <path d="M6 6 14 14M14 6 6 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            )}
          </span>
          <div className="toast-copy">
            <p className="toast-title">{toast.title}</p>
            {toast.body ? <p className="toast-body">{toast.body}</p> : null}
          </div>
          <button type="button" className="toast-close" aria-label="Dismiss notification" onClick={() => onDismiss(toast.id)}>
            ×
          </button>
        </div>
      ))}
    </div>
  );
}
