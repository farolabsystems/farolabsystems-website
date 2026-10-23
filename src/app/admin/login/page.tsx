"use client";

import { useState, type FormEvent } from "react";
import Image from "next/image";
import { adminDefaults } from "@/lib/admin-defaults";
import { Button } from "@/website-theme/ui/Button";

export default function LoginPage() {
  const [email, setEmail] = useState<string>(adminDefaults.email);
  const [password, setPassword] = useState<string>(adminDefaults.password);
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    setError("");
    setSending(true);
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
        credentials: "same-origin",
      });
      if (!response.ok) {
        setError("Those details were not recognised.");
        return;
      }
      // Full navigation so the new session cookie is always sent to middleware.
      window.location.assign("/admin/posts");
    } catch {
      setError("Those details were not recognised.");
    } finally {
      setSending(false);
    }
  }

  return (
    <main className="admin-login-card">
      <form className="card grid gap-4" onSubmit={(event) => void onSubmit(event)}>
        <div className="admin-login-logo">
          <Image src="/assets/brand/logo-header.png" alt="Farolab Systems" width={942} height={224} priority />
        </div>
        <h1 className="heading-4">Admin login</h1>
        <label className="grid gap-2 body-sm">
          Email
          <input className="field" type="email" value={email} onChange={(event) => setEmail(event.target.value)} />
        </label>
        <label className="grid gap-2 body-sm">
          Password
          <input className="field" type="password" value={password} onChange={(event) => setPassword(event.target.value)} />
        </label>
        {error ? <p style={{ color: "var(--tc-danger)" }}>{error}</p> : null}
        <Button type="submit" disabled={sending}>
          {sending ? "Signing in…" : "Sign in"}
        </Button>
      </form>
    </main>
  );
}
