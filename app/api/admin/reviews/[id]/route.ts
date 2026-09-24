import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser, requireAdmin } from "@/lib/auth";

export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const user = await getCurrentUser();
  if (!requireAdmin(user)) return NextResponse.json({ error: "FORBIDDEN" }, { status: 403 });
  const { id } = await params;
  const body = await request.json().catch(() => ({}));
  const approve = body.action === "approve";
  try {
    const data = await prisma.review.update({
      where: { id },
      data: { status: approve ? "APPROVED" : "REJECTED" },
    });
    return NextResponse.json({ data });
  } catch {
    return NextResponse.json({ error: "DATABASE_NOT_CONFIGURED" }, { status: 503 });
  }
}
