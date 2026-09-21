import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";

export async function POST(request:Request,{params}:{params:Promise<{id:string}>}){
 const user=await getCurrentUser(); if(!user)return NextResponse.json({error:"UNAUTHORIZED"},{status:401});
 const {id}=await params;
 try{
  const service=await prisma.service.findUnique({where:{id}});
  if(!service)return NextResponse.json({error:"NOT_FOUND"},{status:404});
  const existing=await prisma.claim.findUnique({where:{serviceId_userId:{serviceId:id,userId:user.id}}});
  if(existing)return NextResponse.json({data:existing});
  const data=await prisma.claim.create({data:{serviceId:id,userId:user.id,status:"PENDING"}});
  return NextResponse.json({data},{status:201});
 }catch{return NextResponse.json({error:"DATABASE_NOT_CONFIGURED"},{status:503});}
}