import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
export async function GET(){
 try{
  const data=await prisma.district.findMany({orderBy:{name:"asc"},include:{upazilas:{orderBy:{name:"asc"},include:{unions:{orderBy:{name:"asc"},include:{areas:{orderBy:{name:"asc"}}}}}}}});
  return NextResponse.json({data});
 }catch{return NextResponse.json({error:"DATABASE_NOT_CONFIGURED"},{status:503});}
}