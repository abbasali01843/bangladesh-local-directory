import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import locations from "@/data/bangladesh-locations.bn.json";

type Item = { value: string | number; title: string };
type LocationNode = {
  id: string;
  name: string;
  districts?: LocationNode[];
  upazilas?: LocationNode[];
  unions?: LocationNode[];
  areas?: LocationNode[];
};

function staticLocations(): LocationNode[] {
  const districtsByDivision = locations.districts_bn as Record<string, Item[]>;
  const upazilasByDistrict = locations.upazilas_bn as Record<string, Item[]>;
  const unionsByUpazila = locations.unions_bn as Record<string, Item[]>;

  return locations.divisions_bn.map((division) => ({
    id: String(division.value),
    name: division.title,
    districts: (districtsByDivision[String(division.value)] || []).map((district) => ({
      id: String(district.value),
      name: district.title,
      upazilas: (upazilasByDistrict[String(district.value)] || []).map((upazila) => ({
        id: String(upazila.value),
        name: upazila.title,
        unions: (unionsByUpazila[String(upazila.value)] || []).map((union) => ({
          id: String(union.value),
          name: union.title.trim(),
          areas: [],
        })),
      })),
    })),
  }));
}

function dbLocations(
  districts: Array<{
    id: string;
    name: string;
    upazilas: Array<{
      id: string;
      name: string;
      unions: Array<{
        id: string;
        name: string;
        areas: Array<{ id: string; name: string }>;
      }>;
    }>;
  }>,
): LocationNode[] {
  const divisionByDistrictName = new Map<string, Item>();
  const districtsByDivision = locations.districts_bn as Record<string, Item[]>;
  for (const [divisionId, items] of Object.entries(districtsByDivision)) {
    for (const item of items) {
      divisionByDistrictName.set(item.title.trim().toLowerCase(), {
        value: divisionId,
        title: locations.divisions_bn.find((d) => String(d.value) === divisionId)?.title || divisionId,
      });
    }
  }

  const groups = new Map<string, LocationNode>();
  for (const district of districts) {
    const match = divisionByDistrictName.get(district.name.trim().toLowerCase());
    const divisionId = String(match?.value || "unknown");
    const divisionName = match?.title || "অন্যান্য";
    if (!groups.has(divisionId)) {
      groups.set(divisionId, { id: divisionId, name: divisionName, districts: [] });
    }
    groups.get(divisionId)!.districts!.push({
      id: district.id,
      name: district.name,
      upazilas: district.upazilas.map((upazila) => ({
        id: upazila.id,
        name: upazila.name,
        unions: upazila.unions.map((union) => ({
          id: union.id,
          name: union.name,
          areas: union.areas,
        })),
      })),
    });
  }

  return [...groups.values()].sort((a, b) => a.name.localeCompare(b.name, "bn"));
}

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
    return NextResponse.json({ data: dbLocations(data), source: "db" });
  } catch {
    return NextResponse.json({ data: staticLocations(), source: "static" });
  }
}
