"use client";

export function LogoutButton({ className = "nav-link" }: { className?: string }) {
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
      Log out
    </button>
  );
}
