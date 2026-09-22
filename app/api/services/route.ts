import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { services } from "@/data/services";
import { categories } from "@/data/categories";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q")?.trim().toLowerCase() || "";
  const districtId = searchParams.get("districtId") || undefined;
  const upazilaId = searchParams.get("upazilaId") || undefined;
  const categoryId = searchParams.get("categoryId") || undefined;

  try {
    const data = await prisma.service.findMany({
      where: {
        status: "APPROVED",
        ...(districtId ? { districtId } : {}),
        ...(upazilaId ? { upazilaId } : {}),
        ...(categoryId ? { categoryId } : {}),
        ...(q
          ? {
              OR: [
                { name: { contains: q, mode: "insensitive" } },
                { description: { contains: q, mode: "insensitive" } },
              ],
            }
          : {}),
      },
      include: { category: true, district: true, upazila: true },
      orderBy: { createdAt: "desc" },
      take: 50,
    });
    return NextResponse.json({ data, source: "db" });
  } catch {
    let list = services;
    if (categoryId) list = list.filter((s) => s.category === categoryId);
    if (q) {
      list = list.filter(
        (s) =>
          s.name.toLowerCase().includes(q) ||
          s.description.toLowerCase().includes(q)
      );
    }
    const data = list.map((s) => {
      const cat = categories.find((c) => c.id === s.category);
      return {
        id: s.id,
        name: s.name,
        description: s.description,
        phone: s.phone,
        verificationStatus: s.verified ? "VERIFIED" : "UNVERIFIED",
        category: { id: s.category, name: cat?.name || s.category },
        district: { name: s.district },
        upazila: { name: s.upazila },
      };
    });
    return NextResponse.json({ data, source: "static" });
  }
}

export async function POST(request: Request) {
  const user = await getCurrentUser();
  try {
    const body = await request.json();
    if (!body?.name || !body?.categoryId || !body?.districtId || !body?.upazilaId) {
      return NextResponse.json(
        {
          error: "VALIDATION_ERROR",
          message: "name, categoryId, districtId and upazilaId are required.",
        },
        { status: 400 }
      );
    }
    const base =
      String(body.name)
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "") || "listing";
    const slug = base + "-" + Date.now();
    const data = await prisma.service.create({
      data: {
        name: String(body.name),
        slug,
        categoryId: String(body.categoryId),
        districtId: String(body.districtId),
        upazilaId: String(body.upazilaId),
        unionId: body.unionId || null,
        areaId: body.areaId || null,
        phone: body.phone || null,
        email: body.email || null,
        address: body.address || null,
        description: body.description || null,
        latitude: typeof body.latitude === "number" ? body.latitude : null,
        longitude: typeof body.longitude === "number" ? body.longitude : null,
        createdById: user?.id || null,
        status: "PENDING",
      },
    });
    return NextResponse.json({ data }, { status: 201 });
  } catch {
    return NextResponse.json(
      {
        error: "DATABASE_NOT_CONFIGURED",
        message:
          "ডাটাবেস এখনো সেট নেই। দেখার জন্য ডেমো তথ্য কাজ করবে; নতুন তথ্য সেভ করতে পরে DB লাগবে।",
      },
      { status: 503 }
    );
  }
}
