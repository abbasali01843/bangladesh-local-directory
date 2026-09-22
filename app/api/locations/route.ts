import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { districts } from "@/data/districts";

export async function GET() {
  try {
    const data = await prisma.district.findMany({
      orderBy: { name: "asc" },
      include: {
        upazilas: {
          orderBy: { name: "asc" },
          include: {
            unions: {
              orderBy: { name: "asc" },
              include: { areas: { orderBy: { name: "asc" } } },
            },
          },
        },
      },
    });
    return NextResponse.json({ data, source: "db" });
  } catch {
    // No database — return static districts so UI still works
    const data = districts.map((d) => ({
      id: d.id,
      name: d.name,
      upazilas: [] as { id: string; name: string }[],
    }));
    return NextResponse.json({ data, source: "static" });
  }
}
