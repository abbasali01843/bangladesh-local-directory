import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { createSession, verifyPassword } from "@/lib/auth";

export async function POST(request:Request){
 try{
  const body=await request.json(); const identifier=String(body.identifier||"").trim().toLowerCase(); const password=String(body.password||"");
  const user=await prisma.user.findFirst({where:{OR:[{email:identifier},{phone:identifier}]}});
  if(!user?.passwordHash||!verifyPassword(password,user.passwordHash))return NextResponse.json({error:"INVALID_CREDENTIALS"},{status:401});
  await createSession(user.id);
  return NextResponse.json({data:{id:user.id,name:user.name,role:user.role}});
 }catch{return NextResponse.json({error:"DATABASE_NOT_CONFIGURED"},{status:503});}
}