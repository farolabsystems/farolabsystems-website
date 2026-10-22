import { prisma } from "@/lib/db";
import type { ContactInput } from "@/lib/validators";

export async function createLead(input: ContactInput, ip: string) {
  return prisma.lead.create({
    data: {
      firstName: input.firstName,
      email: input.email,
      startingFrom: input.startingFrom || null,
      options: input.options ?? [],
      message: input.message,
      newsletter: Boolean(input.newsletter),
      ip,
    },
  });
}

export async function listLeads() {
  return prisma.lead.findMany({ orderBy: { createdAt: "desc" } });
}
