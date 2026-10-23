import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";
import { Pool } from "pg";

process.env.DATABASE_URL ??= "postgresql://app:app@127.0.0.1:5432/app";

function poolConfig(connectionString: string) {
  const url = new URL(connectionString);
  const sslmode = url.searchParams.get("sslmode");
  url.searchParams.delete("sslmode");
  return {
    connectionString: url.toString(),
    ssl: sslmode ? { rejectUnauthorized: sslmode === "no-verify" ? false : true } : undefined,
  };
}

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

function createPrisma() {
  const pool = new Pool(poolConfig(process.env.DATABASE_URL!));
  return new PrismaClient({ adapter: new PrismaPg(pool) });
}

export const prisma = globalForPrisma.prisma ?? createPrisma();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
