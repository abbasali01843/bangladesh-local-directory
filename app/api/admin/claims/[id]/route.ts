import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser, requireAdmin } from "@/lib/auth";
export async function POST(request:Request,{params}:{params:Promise<{id:string}>}){
 const user=await getCurrentUser(); if(!requireAdmin(user))return NextResponse.json({error:"FORBIDDEN"},{status:403});
 const {id}=await params; const body=await request.json().catch(()=>({})); const approve=body.action==="approve";
 try{
  const claim=await prisma.claim.findUnique({where:{id}}); if(!claim)return NextResponse.json({error:"NOT_FOUND"},{status:404});
  const data=await prisma.$transaction(async (tx:typeof prisma)=>{
   const c=await tx.claim.update({where:{id},data:{status:approve?"APPROVED":"REJECTED",reviewedAt:new Date()}});
   if(approve)await tx.service.update({where:{id:claim.serviceId},data:{claimedById:claim.userId,verificationStatus:"OWNER_CLAIMED"}});
   return c;
  });
  return NextResponse.json({data});
 }catch{return NextResponse.json({error:"DATABASE_NOT_CONFIGURED"},{status:503});}
}