import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request:Request){
 const p=new URL(request.url).searchParams;
 const q=p.get("q")?.trim()||"",districtId=p.get("districtId")||undefined,upazilaId=p.get("upazilaId")||undefined,categoryId=p.get("categoryId")||undefined;
 try{
  const data=await prisma.service.findMany({
   where:{status:"APPROVED",...(districtId?{districtId}:{}),...(upazilaId?{upazilaId}:{}),...(categoryId?{categoryId}:{}),
    ...(q?{OR:[{name:{contains:q,mode:"insensitive"}},{description:{contains:q,mode:"insensitive"}},{address:{contains:q,mode:"insensitive"}}]}:{})},
   include:{category:true,district:true,upazila:true,union:true,area:true},orderBy:{createdAt:"desc"},take:100
  });
  return NextResponse.json({data});
 }catch{return NextResponse.json({error:"DATABASE_NOT_CONFIGURED"},{status:503});}
}