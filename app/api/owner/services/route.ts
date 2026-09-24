import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";

export async function GET() {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "UNAUTHORIZED" }, { status: 401 });
  try {
    const [mine, claimed, claims] = await Promise.all([
      prisma.service.findMany({
        where: { createdById: user.id },
        include: { category: true, district: true, upazila: true },
        orderBy: { updatedAt: "desc" },
      }),
      prisma.service.findMany({
        where: { claimedById: user.id },
        include: { category: true, district: true, upazila: true },
        orderBy: { updatedAt: "desc" },
      }),
      prisma.claim.findMany({
        where: { userId: user.id },
        include: { service: { select: { id: true, name: true } } },
        orderBy: { createdAt: "desc" },
      }),
    ]);
    return NextResponse.json({ data: { mine, claimed, claims } });
  } catch {
    return NextResponse.json({ error: "DATABASE_NOT_CONFIGURED" }, { status: 503 });
  }
}
