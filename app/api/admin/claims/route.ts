import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser, requireAdmin } from "@/lib/auth";
export async function GET(){
 const user=await getCurrentUser(); if(!requireAdmin(user))return NextResponse.json({error:"FORBIDDEN"},{status:403});
 try{const data=await prisma.claim.findMany({where:{status:"PENDING"},include:{service:true,user:true},orderBy:{createdAt:"asc"}});return NextResponse.json({data});}
 catch{return NextResponse.json({error:"DATABASE_NOT_CONFIGURED"},{status:503});}
}