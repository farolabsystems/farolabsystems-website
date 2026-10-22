"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { siteConfig } from "@/website-theme/config/site.config";
import { startingOptions } from "@/website-theme/data/contact";
import { Button } from "@/website-theme/ui/Button";
import { Chip } from "@/website-theme/ui/Chip";
import { Input } from "@/website-theme/ui/Input";

type Errors = Partial<Record<"firstName" | "email" | "message", string>>;

export function ContactForm() {
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [startingFrom, setStartingFrom] = useState<"" | "new" | "continuation">("");
  const [options, setOptions] = useState<string[]>([]);
  const [message, setMessage] = useState("");
  const [newsletter, setNewsletter] = useState(false);
  const [honeypot, setHoneypot] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const chips = startingOptions.find((option) => option.id === startingFrom)?.chips ?? [];

  function toggle(option: string) {
    setOptions((current) => (current.includes(option) ? current.filter((item) => item !== option) : [...current, option]));
  }

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    setStatus("sending");
    setErrors({});
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ firstName, email, startingFrom, options, message, newsletter, company_website: honeypot }),
    });
    const payload = (await response.json().catch(() => null)) as { error?: string; fieldErrors?: Errors } | null;
    if (response.ok) {
      setStatus("success");
      return;
    }
    setStatus("error");
    setErrors(payload?.fieldErrors ?? {});
  }

  if (status === "success") {
    return (
      <div className="card grid gap-3" role="status">
        <h3 className="heading-5">Thanks. We received your message.</h3>
        <p className="body muted">A founder will reply to {email}. If a call is easier, you can still book a time.</p>
        <Link href="/schedule-meeting" style={{ color: "var(--tc-primary-active)" }}>
          Book a call instead
        </Link>
      </div>
    );
  }

  return (
    <form className="grid gap-4" onSubmit={onSubmit} noValidate>
      <div className="hp" aria-hidden="true">
        <label>
          Company website
          <input tabIndex={-1} autoComplete="off" value={honeypot} onChange={(event) => setHoneypot(event.target.value)} />
        </label>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <Input id="first-name" name="firstName" label="First name" placeholder="Enter your first name" value={firstName} error={errors.firstName} onChange={setFirstName} />
        <Input id="email" name="email" type="email" label="Business email" placeholder="Enter your email" value={email} error={errors.email} onChange={setEmail} />
      </div>
      <fieldset className="grid gap-3">
        <legend className="body-sm">Where are you starting from? (optional)</legend>
        <div className="grid gap-2 md:grid-cols-2">
          {startingOptions.map((option) => (
            <label key={option.id} className="card grid gap-1" style={{ padding: "var(--tc-space-4)", cursor: "pointer" }}>
              <span className="flex items-center gap-2">
                <input
                  type="radio"
                  name="startingFrom"
                  checked={startingFrom === option.id}
                  onChange={() => {
                    setStartingFrom(option.id);
                    setOptions([]);
                  }}
                />
                <span className="body">{option.label}</span>
              </span>
              <span className="body-sm muted">{option.hint}</span>
            </label>
          ))}
        </div>
        {chips.length ? (
          <div className="flex flex-wrap gap-2">
            {chips.map((chip) => (
              <Chip key={chip} pressed={options.includes(chip)} onClick={() => toggle(chip)}>
                {chip}
              </Chip>
            ))}
          </div>
        ) : null}
      </fieldset>
      <Input
        id="message"
        name="message"
        label="Message"
        multiline
        placeholder="What should this solve? A prototype link is welcome."
        value={message}
        error={errors.message}
        onChange={setMessage}
      />
      <label className="flex items-start gap-2 body-sm">
        <input type="checkbox" checked={newsletter} onChange={(event) => setNewsletter(event.target.checked)} />
        <span>I want occasional notes about {siteConfig.name}&apos;s work. This is optional.</span>
      </label>
      {status === "error" ? (
        <p className="body-sm" role="alert" style={{ color: "var(--tc-danger)" }}>
          We couldn&apos;t send that. Please try again.
        </p>
      ) : null}
      <div className="flex flex-wrap items-center gap-4">
        <Button type="submit" disabled={status === "sending"}>
          {status === "sending" ? "Sending…" : "Get a free consultation"}
        </Button>
        <Link href="/schedule-meeting" className="body-sm" style={{ color: "var(--tc-primary-active)" }}>
          Book a call instead
        </Link>
      </div>
    </form>
  );
}
