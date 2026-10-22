"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { siteConfig } from "@/website-theme/config/site.config";
import { projectIntents } from "@/website-theme/data/contact";
import { Button } from "@/website-theme/ui/Button";
import { Input } from "@/website-theme/ui/Input";

type Field = "firstName" | "lastName" | "email" | "company" | "phone" | "startingFrom" | "budget" | "timeline" | "message";
type Errors = Partial<Record<Field, string>>;

export function ContactForm() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [phone, setPhone] = useState("");
  const [startingFrom, setStartingFrom] = useState("");
  const [budget, setBudget] = useState("");
  const [timeline, setTimeline] = useState("");
  const [message, setMessage] = useState("");
  const [newsletter, setNewsletter] = useState(false);
  const [honeypot, setHoneypot] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    setStatus("sending");
    setErrors({});
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        firstName,
        lastName,
        email,
        company,
        phone,
        startingFrom,
        budget,
        timeline,
        message,
        newsletter,
        company_website: honeypot,
      }),
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
        <h3 className="heading-5">Thanks for reaching out.</h3>
        <p className="body muted">We&apos;ve received your message and will get back to you soon.</p>
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
        <Input id="last-name" name="lastName" label="Last name" placeholder="Enter your last name" value={lastName} error={errors.lastName} onChange={setLastName} />
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <Input id="email" name="email" type="email" label="Business email" placeholder="Enter your email" value={email} error={errors.email} onChange={setEmail} />
        <Input id="company" name="company" label="Company" placeholder="Company name" value={company} error={errors.company} onChange={setCompany} />
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <Input id="phone" name="phone" type="tel" label="Phone number" placeholder="Optional" value={phone} error={errors.phone} onChange={setPhone} />
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
        <span>Send me occasional notes about {siteConfig.name}&apos;s work. This is optional.</span>
      </label>
      {status === "error" && Object.keys(errors).length === 0 ? (
        <p className="body-sm" role="alert" style={{ color: "var(--tc-danger)" }}>
          Something went wrong while submitting the form. Please try again.
        </p>
      ) : null}
      <div className="flex flex-wrap items-center gap-4">
        <Button type="submit" disabled={status === "sending"}>
          {status === "sending" ? "Sending…" : "Start a conversation"}
        </Button>
        <Link href="/schedule-meeting" className="body-sm" style={{ color: "var(--tc-primary-active)" }}>
          Schedule a meeting
        </Link>
      </div>
    </form>
  );
}
