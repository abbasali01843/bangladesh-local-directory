import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser, requireAdmin } from "@/lib/auth";

export async function GET() {
  const user = await getCurrentUser();
  if (!requireAdmin(user)) return NextResponse.json({ error: "FORBIDDEN" }, { status: 403 });
  try {
    const data = await prisma.paymentOrder.findMany({
      orderBy: { createdAt: "desc" },
      take: 100,
      include: {
        user: { select: { name: true, phone: true, email: true } },
        service: { select: { id: true, name: true } },
        promotion: { select: { status: true, startsAt: true, endsAt: true } },
      },
    });
    return NextResponse.json({ data });
  } catch {
    return NextResponse.json({ error: "DATABASE_NOT_CONFIGURED" }, { status: 503 });
  }
}
