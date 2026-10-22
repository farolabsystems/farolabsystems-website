import nodemailer from "nodemailer";
import { siteConfig } from "@/website-theme/config/site.config";

type LeadMail = {
  firstName: string;
  email: string;
  startingFrom?: string;
  options?: string[];
  message: string;
  newsletter?: boolean;
};

export async function sendLeadEmail(lead: LeadMail) {
  const host = process.env.SMTP_HOST;
  if (!host) return { sent: false as const };

  const port = Number(process.env.SMTP_PORT || 587);
  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: process.env.SMTP_SECURE === "true" || port === 465,
    auth: process.env.SMTP_USER
      ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
      : undefined,
  });

  await transporter.sendMail({
    from: process.env.SMTP_FROM || siteConfig.email,
    to: siteConfig.email,
    replyTo: lead.email,
    subject: `New enquiry from ${lead.firstName}`,
    text: [
      `Name: ${lead.firstName}`,
      `Email: ${lead.email}`,
      `Starting from: ${lead.startingFrom || "—"}`,
      `Options: ${(lead.options ?? []).join(", ") || "—"}`,
      `Newsletter: ${lead.newsletter ? "yes" : "no"}`,
      "",
      lead.message,
    ].join("\n"),
  });

  return { sent: true as const };
}
