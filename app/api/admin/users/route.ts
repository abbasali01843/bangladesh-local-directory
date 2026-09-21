import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser, requireAdmin } from "@/lib/auth";
export async function GET(){
 const me=await getCurrentUser(); if(!requireAdmin(me))return NextResponse.json({error:"FORBIDDEN"},{status:403});
 try{const data=await prisma.user.findMany({select:{id:true,name:true,email:true,phone:true,role:true,createdAt:true},orderBy:{createdAt:"desc"},take:200});return NextResponse.json({data});}
 catch{return NextResponse.json({error:"DATABASE_NOT_CONFIGURED"},{status:503});}
}