import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser, requireAdmin } from "@/lib/auth";
export async function PATCH(request:Request,{params}:{params:Promise<{id:string}>}){
 const me=await getCurrentUser(); if(!requireAdmin(me))return NextResponse.json({error:"FORBIDDEN"},{status:403});
 const {id}=await params; const body=await request.json(); const allowed=["USER","BUSINESS_OWNER","ADMIN"];
 if(!allowed.includes(body.role))return NextResponse.json({error:"INVALID_ROLE"},{status:400});
 if(id===me!.id && body.role!=="ADMIN")return NextResponse.json({error:"CANNOT_DEMOTE_SELF"},{status:400});
 try{const data=await prisma.user.update({where:{id},data:{role:body.role}});return NextResponse.json({data:{id:data.id,name:data.name,role:data.role}});}
 catch{return NextResponse.json({error:"DATABASE_NOT_CONFIGURED"},{status:503});}
}