import { NextResponse } from "next/server";
import { services } from "@/data/services";
import { categories } from "@/data/categories";

export async function GET(request: Request) {
  const p = new URL(request.url).searchParams;
  const q = p.get("q")?.trim().toLowerCase() || "";
  const categoryId = p.get("categoryId") || "";
  let list = services;
  if (categoryId) list = list.filter((s) => s.category === categoryId);
  if (q) list = list.filter((s) => [s.name,s.description,s.district,s.upazila,s.union,s.area].some(v=>v.toLowerCase().includes(q)));
  return NextResponse.json({
    data:list.slice(0,50).map(s=>({id:s.id,name:s.name,description:s.description,phone:s.phone,verificationStatus:s.verified?"VERIFIED":"UNVERIFIED",category:{id:s.category,name:categories.find(c=>c.id===s.category)?.name||s.category},district:{name:s.district},upazila:{name:s.upazila},union:{name:s.union},area:{name:s.area}})),
    source:"static"
  });
}

export async function POST() {
  return NextResponse.json({error:"OFFLINE_MODE",message:"অফলাইন মোডে নতুন তথ্য এই ডিভাইসের Local Storage-এ সংরক্ষণ করা হবে।"}, {status:409});
}
