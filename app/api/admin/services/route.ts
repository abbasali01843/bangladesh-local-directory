import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser, requireAdmin } from "@/lib/auth";

export async function GET(request: Request) {
 const user=await getCurrentUser();
 if(!requireAdmin(user)) return NextResponse.json({error:"FORBIDDEN"},{status:403});
 const status=new URL(request.url).searchParams.get("status")||"PENDING";
 try {
  const data=await prisma.service.findMany({where:{status:status as any},include:{category:true,district:true,upazila:true},orderBy:{createdAt:"desc"},take:100});
  return NextResponse.json({data});
 } catch { return NextResponse.json({error:"DATABASE_NOT_CONFIGURED"},{status:503}); }
}