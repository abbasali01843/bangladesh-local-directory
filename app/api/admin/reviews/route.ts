import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser, requireAdmin } from "@/lib/auth";

export async function GET() {
  const user = await getCurrentUser();
  if (!requireAdmin(user)) return NextResponse.json({ error: "FORBIDDEN" }, { status: 403 });
  try {
    const data = await prisma.review.findMany({
      where: { status: "PENDING" },
      include: {
        service: { select: { id: true, name: true } },
        user: { select: { name: true } },
      },
      orderBy: { createdAt: "asc" },
      take: 100,
    });
    return NextResponse.json({ data });
  } catch {
    return NextResponse.json({ error: "DATABASE_NOT_CONFIGURED" }, { status: 503 });
  }
}
