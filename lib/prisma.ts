import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

function createClient(): PrismaClient {
  if (globalForPrisma.prisma) return globalForPrisma.prisma;
  const client = new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
  });
  if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = client;
  return client;
}

/**
 * Lazy client — মডিউল ইমপোর্টের সময়ই instantiate হয় না।
 * এর ফলে:
 *  - ডেমো/স্ট্যাটিক মোডে (DATABASE_URL ছাড়া) পেজ বিল্ড ও রেন্ডার সমস্যাহীন
 *  - prisma generate না চলা এনভায়রনমেন্টেও বিল্ড ভাঙে না
 * আসল ক্লায়েন্ট প্রথম DB কলে তৈরি হয়।
 */
export const prisma: PrismaClient = new Proxy({} as PrismaClient, {
  get(_target, prop) {
    const client = createClient() as unknown as Record<PropertyKey, unknown>;
    const value = client[prop];
    return typeof value === "function" ? (value as (...a: unknown[]) => unknown).bind(client) : value;
  },
});
