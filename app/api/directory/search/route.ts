import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { services } from "@/data/services";
import { categories } from "@/data/categories";

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
    // Fallback: search static demo services
    let list = services;
    if (categoryId) list = list.filter((s) => s.category === categoryId);
    if (q) {
      const qd = q.replace(/\D/g, "").replace(/^880/, "").replace(/^0/, "");
      list = list.filter(
        (s) =>
          s.name.toLowerCase().includes(q) ||
          s.description.toLowerCase().includes(q) ||
          s.district.includes(q) ||
          s.upazila.includes(q) ||
          s.area.includes(q) ||
          (s.phone && (s.phone.includes(q) || (qd.length >= 3 && s.phone.replace(/\D/g, "").includes(qd))))
      );
    }
    const data = list.map((s) => {
      const cat = categories.find((c) => c.id === s.category);
      return {
        id: s.id,
        name: s.name,
        description: s.description,
        verificationStatus: s.verified ? "VERIFIED" : "UNVERIFIED",
        category: { name: cat?.name || s.category },
        district: { name: s.district },
        upazila: { name: s.upazila },
        area: { name: s.area },
      };
    });
    return NextResponse.json({ data, source: "static" });
  }
}
