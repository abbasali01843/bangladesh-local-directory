import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";

/** অনুমোদিত রিভিউ (পাবলিক)। */
export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  try {
    const data = await prisma.review.findMany({
      where: { serviceId: id, status: "APPROVED" },
      include: { user: { select: { name: true } } },
      orderBy: { createdAt: "desc" },
      take: 20,
    });
    return NextResponse.json({ data });
  } catch {
    return NextResponse.json({ error: "DATABASE_NOT_CONFIGURED" }, { status: 503 });
  }
}

/** রিভিউ দিন — লগইন আবশ্যক, প্রতি তালিকায় ১টি (এডিট করলে আবার রিভিউতে যাবে)। */
export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "UNAUTHORIZED" }, { status: 401 });
  const { id } = await params;
  let body: { rating?: unknown; body?: unknown };
  try {
    body = (await request.json()) as { rating?: unknown; body?: unknown };
  } catch {
    return NextResponse.json({ error: "VALIDATION", message: "সঠিক তথ্য দিন।" }, { status: 400 });
  }
  const rating = Number(body.rating);
  const text = typeof body.body === "string" ? body.body.trim().slice(0, 500) : "";
  if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
    return NextResponse.json({ error: "VALIDATION", message: "রেটিং ১–৫ দিন।" }, { status: 400 });
  }
  try {
    const service = await prisma.service.findUnique({ where: { id }, select: { id: true } });
    if (!service) return NextResponse.json({ error: "NOT_FOUND" }, { status: 404 });
    const data = await prisma.review.upsert({
      where: { serviceId_userId: { serviceId: id, userId: user.id } },
      update: { rating, body: text || null, status: "PENDING" },
      create: { serviceId: id, userId: user.id, rating, body: text || null, status: "PENDING" },
    });
    return NextResponse.json(
      { data, message: "রিভিউ জমা হয়েছে। অ্যাডমিন অনুমোদনের পর দেখা যাবে।" },
      { status: 201 }
    );
  } catch {
    return NextResponse.json({ error: "DATABASE_NOT_CONFIGURED" }, { status: 503 });
  }
}
