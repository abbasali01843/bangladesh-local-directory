import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser, requireAdmin } from "@/lib/auth";

export async function GET(request: Request) {
 const user=await getCurrentUser();
 if(!requireAdmin(user)) return NextResponse.json({error:"FORBIDDEN"},{status:403});
 const raw=new URL(request.url).searchParams.get("status")||"PENDING";
 const allowed=["PENDING","APPROVED","REJECTED","SUSPENDED"] as const;
 type Allowed=(typeof allowed)[number];
 const status:Allowed=(allowed as readonly string[]).includes(raw)?raw as Allowed:"PENDING";
 try {
  const data=await prisma.service.findMany({where:{status},include:{category:true,district:true,upazila:true},orderBy:{createdAt:"desc"},take:100});
  return NextResponse.json({data});
 } catch { return NextResponse.json({error:"DATABASE_NOT_CONFIGURED"},{status:503}); }
}