"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { contactSchema } from "@/lib/validators";
import { siteConfig } from "@/website-theme/config/site.config";
import { projectIntents } from "@/website-theme/data/contact";
import { Button } from "@/website-theme/ui/Button";
import { Input } from "@/website-theme/ui/Input";
import { PhoneField } from "@/website-theme/ui/PhoneField";
import { Toaster, type ToastItem } from "@/website-theme/ui/Toaster";

type Field = "firstName" | "lastName" | "email" | "company" | "phone" | "startingFrom" | "budget" | "timeline" | "message";
type Errors = Partial<Record<Field, string>>;

export function ContactForm() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [country, setCountry] = useState("IN");
  const [phone, setPhone] = useState("");
  const [startingFrom, setStartingFrom] = useState("");
  const [budget, setBudget] = useState("");
  const [timeline, setTimeline] = useState("");
  const [message, setMessage] = useState("");
  const [newsletter, setNewsletter] = useState(false);
  const [honeypot, setHoneypot] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [sending, setSending] = useState(false);
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  function pushToast(toast: Omit<ToastItem, "id">) {
    const id = Date.now() + Math.floor(Math.random() * 1000);
    setToasts((current) => [...current, { ...toast, id }]);
    window.setTimeout(() => setToasts((current) => current.filter((item) => item.id !== id)), 5000);
  }

  function fieldErrorsFrom(issues: { path: PropertyKey[]; message: string }[]): Errors {
    const next: Errors = {};
    for (const issue of issues) {
      const key = String(issue.path[0] ?? "") as Field;
      if (key && !next[key]) next[key] = issue.message;
    }
    return next;
  }

  function resetForm() {
    setFirstName("");
    setLastName("");
    setEmail("");
    setCompany("");
    setCountry("IN");
    setPhone("");
    setStartingFrom("");
    setBudget("");
    setTimeline("");
    setMessage("");
    setNewsletter(false);
  }

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    const payload = {
      firstName,
      lastName,
      email,
      company,
      country,
      phone,
      startingFrom,
      budget,
      timeline,
      message,
      newsletter,
      company_website: honeypot,
    };
    const parsed = contactSchema.safeParse(payload);
    if (!parsed.success) {
      setErrors(fieldErrorsFrom(parsed.error.issues));
      pushToast({ tone: "error", title: "Check the form", body: "A few fields need a correction before this inquiry can be sent." });
      return;
    }

    setSending(true);
    setErrors({});
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = (await response.json().catch(() => null)) as { error?: string; fieldErrors?: Errors } | null;
      if (response.ok) {
        resetForm();
        pushToast({ tone: "success", title: "Inquiry sent", body: "We received your message. It is now in the inquiry list." });
        return;
      }
      setErrors(result?.fieldErrors ?? {});
      pushToast({
        tone: "error",
        title: "Inquiry not sent",
        body: result?.error || "Something went wrong. Please try again.",
      });
    } catch {
      pushToast({ tone: "error", title: "Inquiry not sent", body: "Something went wrong. Please try again." });
    } finally {
      setSending(false);
    }
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
        <Input id="last-name" name="lastName" label="Last name" placeholder="Enter your last name" value={lastName} error={errors.lastName} onChange={setLastName} />
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <Input id="email" name="email" type="email" label="Business email" placeholder="Enter your email" value={email} error={errors.email} onChange={setEmail} />
        <Input id="company" name="company" label="Company" placeholder="Company name" value={company} error={errors.company} onChange={setCompany} />
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <PhoneField country={country} number={phone} error={errors.phone} onCountry={setCountry} onNumber={setPhone} />
        <label className="grid gap-2" htmlFor="looking-for">
          <span className="body-sm">What are you looking for?</span>
          <select
            id="looking-for"
            name="startingFrom"
            className={errors.startingFrom ? "field field-error" : "field"}
            value={startingFrom}
            onChange={(event) => setStartingFrom(event.target.value)}
          >
            <option value="">Select an option</option>
            {projectIntents.map((intent) => (
              <option key={intent} value={intent}>
                {intent}
              </option>
            ))}
          </select>
          {errors.startingFrom ? (
            <span className="body-sm" style={{ color: "var(--tc-danger)" }}>
              {errors.startingFrom}
            </span>
          ) : null}
        </label>
      </div>
      <Input
        id="message"
        name="message"
        label="Project details"
        multiline
        placeholder="What are you working on, and what should change?"
        value={message}
        error={errors.message}
        onChange={setMessage}
      />
      <div className="grid gap-4 md:grid-cols-2">
        <Input id="budget" name="budget" label="Budget" placeholder="Optional" value={budget} error={errors.budget} onChange={setBudget} />
        <Input id="timeline" name="timeline" label="Timeline" placeholder="Optional" value={timeline} error={errors.timeline} onChange={setTimeline} />
      </div>
      <label className="flex items-start gap-2 body-sm">
        <input type="checkbox" checked={newsletter} onChange={(event) => setNewsletter(event.target.checked)} />
        <span>Send me occasional notes about {siteConfig.name}&apos; work. This is optional.</span>
      </label>
      <div className="flex flex-wrap items-center gap-4">
        <Button type="submit" disabled={sending}>
          {sending ? "Sending…" : "Start a conversation"}
        </Button>
        <Link href="/schedule-meeting" className="body-sm" style={{ color: "var(--tc-primary-active)" }}>
          Schedule a meeting
        </Link>
      </div>
      <Toaster toasts={toasts} onDismiss={(id) => setToasts((current) => current.filter((item) => item.id !== id))} />
    </form>
  );
}
