import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser, requireAdmin } from "@/lib/auth";

export async function POST(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const user = await getCurrentUser();
  if (!requireAdmin(user)) return NextResponse.json({ error: "FORBIDDEN" }, { status: 403 });
  const { id } = await params;
  try {
    const existing = await prisma.service.findUnique({ where: { id }, select: { id: true, status: true } });
    if (!existing) return NextResponse.json({ error: "NOT_FOUND" }, { status: 404 });
    const data = await prisma.service.update({
      where: { id },
      data: { status: "APPROVED", moderationNote: null },
    });
    return NextResponse.json({ data, message: "লিস্টিং আবার প্রকাশিত হয়েছে।" });
  } catch {
    return NextResponse.json({ error: "SERVER_ERROR" }, { status: 500 });
  }
}