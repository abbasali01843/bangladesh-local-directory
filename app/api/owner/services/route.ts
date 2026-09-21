import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
export async function GET(){
 const user=await getCurrentUser(); if(!user)return NextResponse.json({error:"UNAUTHORIZED"},{status:401});
 try{const data=await prisma.service.findMany({where:{claimedById:user.id},include:{category:true,district:true,upazila:true},orderBy:{updatedAt:"desc"}});return NextResponse.json({data});}
 catch{return NextResponse.json({error:"DATABASE_NOT_CONFIGURED"},{status:503});}
}