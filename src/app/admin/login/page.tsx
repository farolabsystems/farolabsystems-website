"use client";

import { useState, type FormEvent } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { adminDefaults } from "@/lib/admin-defaults";
import { Button } from "@/website-theme/ui/Button";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState<string>(adminDefaults.email);
  const [password, setPassword] = useState<string>(adminDefaults.password);
  const [error, setError] = useState("");

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    setError("");
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    if (!response.ok) {
      setError("Those details were not recognised.");
      return;
    }
    router.push("/admin/posts");
    router.refresh();
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
        <Button type="submit">Sign in</Button>
      </form>
    </main>
  );
}
