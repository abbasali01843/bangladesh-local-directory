import { NextResponse } from "next/server";
import { randomBytes } from "node:crypto";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { services } from "@/data/services";
import { categories, subOf } from "@/data/categories";
import { isValidBdPhone } from "@/lib/validate";
import { clientIp, rateLimit } from "@/lib/rate-limit";

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
    const [data, district, upazila] = await Promise.all([
      prisma.service.findMany({
        where: {
          status: "APPROVED",
          ...(districtId ? { districtId } : {}),
          ...(upazilaId ? { upazilaId } : {}),
          ...(categoryId ? { categoryId } : {}),
          ...(subcategory ? { subcategory } : {}),
          ...(q ? { OR: [
            { name: { contains: q, mode: "insensitive" } },
            { description: { contains: q, mode: "insensitive" } },
            { phone: { contains: q } },
            { address: { contains: q, mode: "insensitive" } },
          ] } : {}),
        },
        include: { category: true, district: true, upazila: true, union: true, area: true },
        orderBy: { createdAt: "desc" },
        take: 50,
      }),
      districtId ? prisma.district.findUnique({ where: { id: districtId }, select: { name: true } }) : Promise.resolve(null),
      upazilaId ? prisma.upazila.findUnique({ where: { id: upazilaId }, select: { name: true, districtId: true } }) : Promise.resolve(null),
    ]);

    const qd = digitsOnly(q);
    let legacy = services;
    if (categoryId) legacy = legacy.filter((item) => item.category === categoryId);
    if (subcategory) legacy = legacy.filter((item) => item.subcategory === subcategory);
    if (districtId) legacy = district ? legacy.filter((item) => item.district === district.name) : [];
    if (upazilaId) legacy = upazila ? legacy.filter((item) => item.upazila === upazila.name && (!districtId || upazila.districtId === districtId)) : [];
    if (q) legacy = legacy.filter((item) =>
      item.name.toLowerCase().includes(q) ||
      item.description.toLowerCase().includes(q) ||
      item.union.toLowerCase().includes(q) ||
      item.area.toLowerCase().includes(q) ||
      (item.phone && (item.phone.includes(q) || (qd.length >= 3 && digitsOnly(item.phone).includes(qd))))
    );

    const staticData = legacy.map((item) => {
      const cat = categories.find((category) => category.id === item.category);
      return {
        id: item.id, name: item.name, description: item.description, phone: item.phone,
        subcategory: item.subcategory || null,
        verificationStatus: item.verified ? "VERIFIED" : "UNVERIFIED",
        category: { id: item.category, name: cat?.name || item.category },
        district: { name: item.district }, upazila: { name: item.upazila },
        union: { name: item.union }, area: { name: item.area },
      };
    });
    const identity = (item: { name: string; category: { id: string }; district: { name: string }; upazila: { name: string } }) =>
      [item.name, item.category.id, item.district.name, item.upazila.name].map((value) => value.trim().toLocaleLowerCase()).join("|");
    const seen = new Set(data.map(identity));
    const merged = [...data, ...staticData.filter((item) => !seen.has(identity(item)))].slice(0, 50);
    return NextResponse.json({ data: merged, source: data.length && staticData.length ? "mixed" : staticData.length ? "static" : "db" });
  } catch {
    let list = services;
    if (categoryId) list = list.filter((item) => item.category === categoryId);
    if (subcategory) list = list.filter((item) => item.subcategory === subcategory);
    if (q) {
      const qd = digitsOnly(q);
      list = list.filter((item) =>
        item.name.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.union.includes(q) ||
        item.area.includes(q) ||
        (item.phone && (item.phone.includes(q) || (qd.length >= 3 && digitsOnly(item.phone).includes(qd))))
      );
    }
    const data = list.map((item) => {
      const cat = categories.find((category) => category.id === item.category);
      return {
        id: item.id, name: item.name, description: item.description, phone: item.phone,
        subcategory: item.subcategory || null,
        verificationStatus: item.verified ? "VERIFIED" : "UNVERIFIED",
        category: { id: item.category, name: cat?.name || item.category },
        district: { name: item.district }, upazila: { name: item.upazila },
        union: { name: item.union }, area: { name: item.area },
      };
    });
    return NextResponse.json({ data, source: "static" });
  }
}
export async function POST(request: Request) {
  if (!process.env.POSTGRES_PRISMA_URL && !process.env.DATABASE_URL) {
    return NextResponse.json(
      {
        error: "DATABASE_NOT_CONFIGURED",
        message: "ডাটাবেস এখনো সেট নেই। দেখার জন্য ডেমো তথ্য কাজ করবে; নতুন তথ্য সেভ করতে পরে DB লাগবে।",
      },
      { status: 503 }
    );
  }
  const user = await getCurrentUser();
  const limiterKey = user?.id ? `service-submit:user:${user.id}` : `service-submit:ip:${clientIp(request)}`;
  const limit = await rateLimit(limiterKey, user ? 10 : 5, 10 * 60_000);
  if (!limit.ok) {
    return NextResponse.json(
      { error: "RATE_LIMITED", message: "অনেকবার জমা দেওয়া হয়েছে। ১০ মিনিট পরে আবার চেষ্টা করুন।" },
      { status: 429, headers: { "Retry-After": "600" } }
    );
  }
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
      prisma.upazila.findUnique({ where: { id: upazilaId }, select: { id: true, districtId: true } }),
    ]);
    if (!catExists)
      return NextResponse.json(
        { error: "VALIDATION_ERROR", message: "ক্যাটাগরি DB-তে নেই — আগে `npm run db:seed` চালান।" },
        { status: 400 }
      );
    if (!distExists || !upExists || upExists.districtId !== districtId)
      return NextResponse.json({ error: "VALIDATION_ERROR", message: "জেলা/উপজেলা সঠিক নয় বা একে অপরের সঙ্গে মেলে না।" }, { status: 400 });

    if (body.unionId) {
      const union = await prisma.union.findUnique({ where: { id: String(body.unionId) }, select: { id: true, upazilaId: true } });
      if (!union || union.upazilaId !== upazilaId)
        return NextResponse.json({ error: "VALIDATION_ERROR", message: "নির্বাচিত ইউনিয়ন এই উপজেলার অন্তর্ভুক্ত নয়।" }, { status: 400 });
      if (body.areaId) {
        const area = await prisma.area.findUnique({ where: { id: String(body.areaId) }, select: { id: true, unionId: true } });
        if (!area || area.unionId !== union.id)
          return NextResponse.json({ error: "VALIDATION_ERROR", message: "নির্বাচিত এলাকা এই ইউনিয়নের অন্তর্ভুক্ত নয়।" }, { status: 400 });
      }
    } else if (body.areaId) {
      return NextResponse.json({ error: "VALIDATION_ERROR", message: "এলাকা দিতে হলে ইউনিয়ন নির্বাচন করুন।" }, { status: 400 });
    }

    const hasLatitude = body.latitude !== undefined && body.latitude !== null;
    const hasLongitude = body.longitude !== undefined && body.longitude !== null;
    if (hasLatitude !== hasLongitude ||
        (hasLatitude && (typeof body.latitude !== "number" || !Number.isFinite(body.latitude) || body.latitude < -90 || body.latitude > 90)) ||
        (hasLongitude && (typeof body.longitude !== "number" || !Number.isFinite(body.longitude) || body.longitude < -180 || body.longitude > 180))) {
      return NextResponse.json({ error: "VALIDATION_ERROR", message: "সঠিক latitude ও longitude দিন।" }, { status: 400 });
    }

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
        latitude: hasLatitude ? body.latitude as number : null,
        longitude: hasLongitude ? body.longitude as number : null,
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
