import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { categories } from "@/data/categories";
import { countByCategory } from "@/data/services";

/** DB-first ক্যাটাগরি তালিকা (counts সহ) — DB না থাকলে static fallback। */
export async function GET() {
  try {
    const [dbCats, counts] = await Promise.all([
      prisma.category.findMany({ orderBy: { name: "asc" } }),
      prisma.service.groupBy({
        by: ["categoryId"],
        where: { status: "APPROVED" },
        _count: { _all: true },
      }),
    ]);
    const countOf = new Map(
      counts.map((r: { categoryId: string; _count: { _all: number } }) => [r.categoryId, r._count._all])
    );
    const data = dbCats.map((c: { id: string; name: string; icon: string | null }) => {
      const s = categories.find((x) => x.id === c.id);
      return {
        id: c.id,
        name: c.name,
        icon: c.icon || s?.icon || "📋",
        count: countOf.get(c.id) || 0,
        subcategories: s?.subcategories || [],
      };
    });
    return NextResponse.json({ data, source: "db" });
  } catch {
    const data = categories.map((c) => ({
      id: c.id,
      name: c.name,
      icon: c.icon,
      count: countByCategory(c.id),
      subcategories: c.subcategories || [],
    }));
    return NextResponse.json({ data, source: "static" });
  }
}
