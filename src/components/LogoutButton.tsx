"use client";

export function LogoutButton() {
  return (
    <button
      type="button"
      className="nav-link"
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
