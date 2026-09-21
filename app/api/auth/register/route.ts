import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { createSession, hashPassword } from "@/lib/auth";

export async function POST(request:Request){
 try{
  const body=await request.json();
  const name=String(body.name||"").trim(), phone=String(body.phone||"").trim(), email=String(body.email||"").trim().toLowerCase(), password=String(body.password||"");
  if(!name||(!phone&&!email)||password.length<8)return NextResponse.json({error:"VALIDATION_ERROR",message:"Name, phone/email and password (minimum 8 characters) are required."},{status:400});
  const exists=await prisma.user.findFirst({where:{OR:[...(phone?[{phone}]:[]),...(email?[{email}]:[])]}});
  if(exists)return NextResponse.json({error:"ACCOUNT_EXISTS"},{status:409});
  const user=await prisma.user.create({data:{name,phone:phone||null,email:email||null,passwordHash:hashPassword(password),role:"USER"}});
  await createSession(user.id);
  return NextResponse.json({data:{id:user.id,name:user.name,role:user.role}},{status:201});
 }catch{return NextResponse.json({error:"DATABASE_NOT_CONFIGURED"},{status:503});}
}