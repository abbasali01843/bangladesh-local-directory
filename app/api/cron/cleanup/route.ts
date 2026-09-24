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
    const r = await prisma.session.deleteMany({ where: { expiresAt: { lt: new Date() } } });
    return NextResponse.json({ ok: true, deleted: r.count });
  } catch {
    return NextResponse.json({ error: "DATABASE_NOT_CONFIGURED" }, { status: 503 });
  }
}
