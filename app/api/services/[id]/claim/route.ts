import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";

export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "UNAUTHORIZED" }, { status: 401 });

  const { id } = await params;
  try {
    const service = await prisma.service.findUnique({
      where: { id },
      select: { id: true, status: true, createdById: true, claimedById: true },
    });
    if (!service) return NextResponse.json({ error: "NOT_FOUND" }, { status: 404 });
    if (service.status !== "APPROVED") {
      return NextResponse.json(
        { error: "NOT_CLAIMABLE", message: "শুধু প্রকাশিত (approved) listing দাবি করা যাবে।" },
        { status: 409 }
      );
    }
    if (service.createdById === user.id) {
      return NextResponse.json(
        { error: "ALREADY_OWNER", message: "এই listing আপনার account থেকেই তৈরি করা হয়েছে।" },
        { status: 409 }
      );
    }
    if (service.claimedById && service.claimedById !== user.id) {
      return NextResponse.json(
        { error: "ALREADY_CLAIMED", message: "এই listing ইতিমধ্যে অন্য account-এর নামে claimed হয়েছে।" },
        { status: 409 }
      );
    }

    const existing = await prisma.claim.findUnique({
      where: { serviceId_userId: { serviceId: id, userId: user.id } },
    });

    if (existing?.status === "PENDING" || existing?.status === "APPROVED") {
      return NextResponse.json({ data: existing });
    }

    const data = existing
      ? await prisma.claim.update({
          where: { id: existing.id },
          data: { status: "PENDING", reviewedAt: null },
        })
      : await prisma.claim.create({
          data: { serviceId: id, userId: user.id, status: "PENDING" },
        });

    return NextResponse.json({ data }, { status: existing ? 200 : 201 });
  } catch {
    return NextResponse.json({ error: "DATABASE_ERROR" }, { status: 503 });
  }
}