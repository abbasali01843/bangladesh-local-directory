import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

/** মেয়াদোত্তীর্ণ সেশন সাফাই — Vercel Cron (daily) থেকে চলে। */
export async function GET(request: Request) {
  const secret = process.env.CRON_SECRET;
  if (!secret) {
    return NextResponse.json({ error: "CRON_NOT_CONFIGURED" }, { status: 503 });
  }
  const auth = request.headers.get("authorization");
  if (auth !== `Bearer ${secret}`) {
    return NextResponse.json({ error: "FORBIDDEN" }, { status: 403 });
  }
  try {
    const now = new Date();
    const [sessions, promotions] = await prisma.$transaction([
      prisma.session.deleteMany({ where: { expiresAt: { lt: now } } }),
      prisma.promotion.updateMany({ where: { status: "ACTIVE", endsAt: { lte: now } }, data: { status: "EXPIRED" } }),
    ]);
    return NextResponse.json({ ok: true, deletedSessions: sessions.count, expiredPromotions: promotions.count });
  } catch {
    return NextResponse.json({ error: "DATABASE_NOT_CONFIGURED" }, { status: 503 });
  }
}
