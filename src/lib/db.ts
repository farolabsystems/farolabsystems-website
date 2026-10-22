import { PrismaClient } from "@prisma/client";

process.env.DATABASE_URL ??= "postgresql://app:app@127.0.0.1:5432/app";

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

export const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
