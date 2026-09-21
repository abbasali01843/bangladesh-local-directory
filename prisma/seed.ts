import { PrismaClient } from "@prisma/client";
import locations from "../data/bangladesh-locations.bn.json";
const prisma=new PrismaClient();
const slug=(s:string)=>s.toLowerCase().replace(/[^\p{L}\p{N}]+/gu,"-").replace(/^-|-$/g,"");
async function main(){
 const districts:any={};
 for(const [divisionId,items] of Object.entries(locations.districts_bn)) for(const d of items as any[]) districts[d.value]={...d,divisionId};
 for(const d of Object.values(districts) as any[]){
  const district=await prisma.district.upsert({where:{slug:slug(d.title)},update:{name:d.title},create:{name:d.title,slug:slug(d.title)}});
  const ups=(locations.upazilas_bn as any)[d.value]||[];
  for(const u of ups){
   const up=await prisma.upazila.upsert({where:{districtId_slug:{districtId:district.id,slug:slug(u.title)}},update:{name:u.title},create:{name:u.title,slug:slug(u.title),districtId:district.id}});
   const unions=(locations.unions_bn as any)[u.value]||[];
   for(const x of unions) await prisma.union.upsert({where:{upazilaId_slug:{upazilaId:up.id,slug:slug(x.title)}},update:{name:x.title},create:{name:x.title,slug:slug(x.title),upazilaId:up.id}});
  }
 }
 console.log("Location seed complete");
}
main().finally(()=>prisma.$disconnect());