import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  const p = new URL(request.url).searchParams;
  const q = p.get("q")?.trim().toLowerCase() || "";
  const districtId = p.get("districtId") || undefined;
  const upazilaId = p.get("upazilaId") || undefined;
  const categoryId = p.get("categoryId") || undefined;

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
                { address: { contains: q, mode: "insensitive" } },
                { phone: { contains: q } },
              ],
            }
          : {}),
      },
      include: {
        category: true,
        district: true,
        upazila: true,
        union: true,
        area: true,
      },
      orderBy: { createdAt: "desc" },
      take: 100,
    });
    return NextResponse.json({ data, source: "db" });
  } catch {
    return NextResponse.json({ error: "DATABASE_UNAVAILABLE", message: "ডাটাবেসে সংযোগ করা যাচ্ছে না।" }, { status: 503 });
  }
}
