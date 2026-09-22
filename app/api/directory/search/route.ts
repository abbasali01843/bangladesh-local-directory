import { NextResponse } from "next/server";
import { services } from "@/data/services";
import { categories } from "@/data/categories";

export async function GET(request: Request) {
  const p = new URL(request.url).searchParams;
  const q = p.get("q")?.trim().toLowerCase() || "";
  const districtId = p.get("districtId") || "";
  const upazilaId = p.get("upazilaId") || "";
  const categoryId = p.get("categoryId") || "";

  let list = services;
  if (categoryId) list = list.filter((s) => s.category === categoryId);
  if (districtId) list = list.filter((s) => s.district === districtId || s.district.toLowerCase() === districtId.toLowerCase());
  if (upazilaId) list = list.filter((s) => s.upazila === upazilaId || s.upazila.toLowerCase() === upazilaId.toLowerCase());
  if (q) list = list.filter((s) => [s.name,s.description,s.district,s.upazila,s.union,s.area].some(v => v.toLowerCase().includes(q)));

  const data = list.slice(0,100).map((s) => {
    const cat = categories.find((c) => c.id === s.category);
    return {
      id:s.id,name:s.name,description:s.description,
      verificationStatus:s.verified ? "VERIFIED" : "UNVERIFIED",
      category:{name:cat?.name || s.category},
      district:{name:s.district},upazila:{name:s.upazila},
      union:{name:s.union},area:{name:s.area},phone:s.phone
    };
  });
  return NextResponse.json({data,source:"static"});
}
