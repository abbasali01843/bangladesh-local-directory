import { NextResponse } from "next/server";
import { randomBytes } from "node:crypto";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { services } from "@/data/services";
import { categories, subOf } from "@/data/categories";
import { isValidBdPhone } from "@/lib/validate";

function digitsOnly(s: string) {
  return s.replace(/\D/g, "").replace(/^880/, "").replace(/^0/, "");
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q")?.trim().toLowerCase() || "";
  const districtId = searchParams.get("districtId") || undefined;
  const upazilaId = searchParams.get("upazilaId") || undefined;
  const categoryId = searchParams.get("categoryId") || undefined;
  const subcategory = searchParams.get("subcategory") || undefined;

  try {
    const data = await prisma.service.findMany({
      where: {
        status: "APPROVED",
        ...(districtId ? { districtId } : {}),
        ...(upazilaId ? { upazilaId } : {}),
        ...(categoryId ? { categoryId } : {}),
        ...(subcategory ? { subcategory } : {}),
        ...(q
          ? {
              OR: [
                { name: { contains: q, mode: "insensitive" } },
                { description: { contains: q, mode: "insensitive" } },
                { phone: { contains: q } },
                { address: { contains: q, mode: "insensitive" } },
              ],
            }
          : {}),
      },
      include: { category: true, district: true, upazila: true, union: true, area: true },
      orderBy: { createdAt: "desc" },
      take: 50,
    });
    return NextResponse.json({ data, source: "db" });
  } catch {
    let list = services;
    if (categoryId) list = list.filter((s) => s.category === categoryId);
    if (subcategory) list = list.filter((s) => s.subcategory === subcategory);
    if (q) {
      const qd = digitsOnly(q);
      list = list.filter(
        (s) =>
          s.name.toLowerCase().includes(q) ||
          s.description.toLowerCase().includes(q) ||
          s.union.includes(q) ||
          s.area.includes(q) ||
          (s.phone && (s.phone.includes(q) || (qd.length >= 3 && digitsOnly(s.phone).includes(qd))))
      );
    }
    const data = list.map((s) => {
      const cat = categories.find((c) => c.id === s.category);
      return {
        id: s.id,
        name: s.name,
        description: s.description,
        phone: s.phone,
        subcategory: s.subcategory || null,
        verificationStatus: s.verified ? "VERIFIED" : "UNVERIFIED",
        category: { id: s.category, name: cat?.name || s.category },
        district: { name: s.district },
        upazila: { name: s.upazila },
        union: { name: s.union },
        area: { name: s.area },
      };
    });
    return NextResponse.json({ data, source: "static" });
  }
}

export async function POST(request: Request) {
  if (!process.env.DATABASE_URL) {
    return NextResponse.json(
      {
        error: "DATABASE_NOT_CONFIGURED",
        message: "ডাটাবেস এখনো সেট নেই। দেখার জন্য ডেমো তথ্য কাজ করবে; নতুন তথ্য সেভ করতে পরে DB লাগবে।",
      },
      { status: 503 }
    );
  }
  const user = await getCurrentUser();
  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: "VALIDATION_ERROR", message: "সঠিক JSON পাঠান।" }, { status: 400 });
  }

  const name = String(body.name || "").trim();
  const categoryId = String(body.categoryId || "").trim();
  const districtId = String(body.districtId || "").trim();
  const upazilaId = String(body.upazilaId || "").trim();
  const subcategory = body.subcategory ? String(body.subcategory).trim() : null;
  const phone = body.phone ? String(body.phone).trim() : null;
  const email = body.email ? String(body.email).trim().toLowerCase() : null;

  if (name.length < 2 || name.length > 120)
    return NextResponse.json({ error: "VALIDATION_ERROR", message: "নাম ২–১২০ অক্ষরের মধ্যে দিন।" }, { status: 400 });
  if (!categoryId || !districtId || !upazilaId)
    return NextResponse.json(
      { error: "VALIDATION_ERROR", message: "ক্যাটাগরি, জেলা ও উপজেলা আবশ্যক।" },
      { status: 400 }
    );
  const category = categories.find((c) => c.id === categoryId);
  if (!category)
    return NextResponse.json({ error: "VALIDATION_ERROR", message: "ভুল ক্যাটাগরি।" }, { status: 400 });
  if (subcategory && !subOf(categoryId, subcategory))
    return NextResponse.json({ error: "VALIDATION_ERROR", message: "ভুল সাব-ক্যাটাগরি।" }, { status: 400 });
  if (phone && !isValidBdPhone(phone))
    return NextResponse.json({ error: "VALIDATION_ERROR", message: "সঠিক মোবাইল নম্বর দিন।" }, { status: 400 });
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    return NextResponse.json({ error: "VALIDATION_ERROR", message: "সঠিক ইমেইল দিন।" }, { status: 400 });

  try {
    // FK অস্তিত্ব যাচাই — ভুল id-তে 400, DB ডাউন থাকলে 503/500
    const [catExists, distExists, upExists] = await Promise.all([
      prisma.category.findUnique({ where: { id: categoryId }, select: { id: true } }),
      prisma.district.findUnique({ where: { id: districtId }, select: { id: true } }),
      prisma.upazila.findUnique({ where: { id: upazilaId }, select: { id: true } }),
    ]);
    if (!catExists)
      return NextResponse.json(
        { error: "VALIDATION_ERROR", message: "ক্যাটাগরি DB-তে নেই — আগে `npm run db:seed` চালান।" },
        { status: 400 }
      );
    if (!distExists || !upExists)
      return NextResponse.json({ error: "VALIDATION_ERROR", message: "জেলা/উপজেলা সঠিক নয়।" }, { status: 400 });

    const base =
      name
        .toLowerCase()
        .replace(/[^\p{L}\p{N}]+/gu, "-")
        .replace(/^-|-$/g, "")
        .slice(0, 60) || "listing";
    const slug = `${base}-${randomBytes(4).toString("hex")}`;
    const str = (v: unknown, max: number) =>
      v == null || v === "" ? null : String(v).trim().slice(0, max);

    const data = await prisma.service.create({
      data: {
        name,
        slug,
        categoryId,
        subcategory,
        districtId,
        upazilaId,
        unionId: body.unionId ? String(body.unionId) : null,
        areaId: body.areaId ? String(body.areaId) : null,
        phone,
        email,
        address: str(body.address, 300),
        description: str(body.description, 2000),
        latitude: typeof body.latitude === "number" ? body.latitude : null,
        longitude: typeof body.longitude === "number" ? body.longitude : null,
        createdById: user?.id || null,
        status: "PENDING",
      },
    });
    return NextResponse.json({ data }, { status: 201 });
  } catch (e: unknown) {
    const code = (e as { code?: string })?.code;
    if (code === "P2003")
      return NextResponse.json({ error: "VALIDATION_ERROR", message: "রেফারেন্স তথ্য সঠিক নয়।" }, { status: 400 });
    if (code === "P1001" || code === "P1000")
      return NextResponse.json({ error: "DATABASE_NOT_CONFIGURED", message: "ডাটাবেসে সংযোগ করা যাচ্ছে না।" }, { status: 503 });
    return NextResponse.json({ error: "SERVER_ERROR", message: "জমা দেওয়া যায়নি, পরে চেষ্টা করুন।" }, { status: 500 });
  }
}
