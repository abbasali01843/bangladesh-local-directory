import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser, requireAdmin } from "@/lib/auth";

export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const user = await getCurrentUser();
  if (!requireAdmin(user)) return NextResponse.json({ error: "FORBIDDEN" }, { status: 403 });
  const { id } = await params;
  try {
    const body = await request.json().catch(() => ({}));
    const moderationNote = typeof body?.reason === "string" ? body.reason.trim().slice(0, 1000) : null;
    const data = await prisma.service.update({
      where: { id },
      data: { status: "REJECTED", moderationNote },
    });
    return NextResponse.json({ data });
  } catch (error: any) {
    if (error?.code === "P2025") return NextResponse.json({ error: "NOT_FOUND" }, { status: 404 });
    return NextResponse.json({ error: "SERVER_ERROR" }, { status: 500 });
  }
}
