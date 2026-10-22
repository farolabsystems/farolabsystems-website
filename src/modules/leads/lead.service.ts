import { prisma } from "@/lib/db";
import type { ContactInput } from "@/lib/validators";

export async function createLead(input: ContactInput, ip: string) {
  return prisma.lead.create({
    data: {
      firstName: input.firstName,
      lastName: input.lastName,
      email: input.email,
      company: input.company || "",
      phone: input.phone || "",
      startingFrom: input.startingFrom,
      budget: input.budget || "",
      timeline: input.timeline || "",
      options: [],
      message: input.message,
      newsletter: Boolean(input.newsletter),
      ip,
    },
  });
}

export async function listLeads() {
  return prisma.lead.findMany({ orderBy: { createdAt: "desc" } });
}
