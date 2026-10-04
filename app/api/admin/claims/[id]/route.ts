import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { getCurrentUser, requireAdmin } from "@/lib/auth";

export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const user = await getCurrentUser();
  if (!requireAdmin(user)) return NextResponse.json({ error: "FORBIDDEN" }, { status: 403 });

  const { id } = await params;
  const body = await request.json().catch(() => ({}));
  const approve = body.action === "approve";
  if (!approve && body.action !== "reject") {
    return NextResponse.json({ error: "VALIDATION_ERROR", message: "সঠিক action দিন।" }, { status: 400 });
  }

  try {
    const result = await prisma.$transaction(async (tx: Prisma.TransactionClient) => {
      const claim = await tx.claim.findUnique({ where: { id } });
      if (!claim) return { kind: "not_found" as const };
      if (claim.status !== "PENDING") return { kind: "already_reviewed" as const };

      if (approve) {
        const ownership = await tx.service.updateMany({
          where: { id: claim.serviceId, claimedById: null, status: "APPROVED" },
          data: { claimedById: claim.userId, verificationStatus: "OWNER_CLAIMED" },
        });
        if (ownership.count !== 1) return { kind: "ownership_conflict" as const };
      }

      const updated = await tx.claim.updateMany({
        where: { id, status: "PENDING" },
        data: { status: approve ? "APPROVED" : "REJECTED", reviewedAt: new Date() },
      });
      if (updated.count !== 1) return { kind: "already_reviewed" as const };

      if (approve) await tx.user.update({ where: { id: claim.userId }, data: { role: "BUSINESS_OWNER" } });
      return { kind: "ok" as const, claim: await tx.claim.findUnique({ where: { id } }) };
    });

    if (result.kind === "not_found") return NextResponse.json({ error: "NOT_FOUND" }, { status: 404 });
    if (result.kind === "already_reviewed") return NextResponse.json({ error: "ALREADY_REVIEWED" }, { status: 409 });
    if (result.kind === "ownership_conflict") {
      return NextResponse.json({ error: "OWNERSHIP_CONFLICT", message: "এই listing ইতিমধ্যে অন্য account-এর নামে claimed হয়েছে বা approved নয়।" }, { status: 409 });
    }
    return NextResponse.json({ data: result.claim });
  } catch {
    return NextResponse.json({ error: "DATABASE_ERROR" }, { status: 503 });
  }
}