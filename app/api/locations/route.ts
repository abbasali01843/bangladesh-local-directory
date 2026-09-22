import { NextResponse } from "next/server";
import locations from "@/data/bangladesh-locations.bn.json";

type Item = { value: string | number; title: string };

function staticLocations() {
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

export async function GET() {
  return NextResponse.json({ data: staticLocations(), source: "static" });
}