import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";

export async function POST(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "UNAUTHORIZED" }, { status: 401 });
  const { id } = await params;
  try {
    const existing = await prisma.service.findUnique({
      where: { id },
      select: { id: true, createdById: true, claimedById: true, status: true },
    });
    if (!existing) return NextResponse.json({ error: "NOT_FOUND" }, { status: 404 });
    if (user.role !== "ADMIN" && existing.createdById !== user.id && existing.claimedById !== user.id)
      return NextResponse.json({ error: "FORBIDDEN" }, { status: 403 });

    const data = await prisma.service.update({
      where: { id },
      data: { status: "SUSPENDED" },
    });
    return NextResponse.json({ data, message: "লিস্টিংটি আনপাবলিশ করা হয়েছে।" });
  } catch {
    return NextResponse.json({ error: "SERVER_ERROR", message: "লিস্টিংটি আনপাবলিশ করা যায়নি।" }, { status: 500 });
  }
}

export async function DELETE(request: Request, context: { params: Promise<{ id: string }> }) {
  return POST(request, context);
}