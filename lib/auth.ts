import { createHash, randomBytes, scryptSync, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";

export type CurrentUser = { id: string; name: string; role: "USER" | "BUSINESS_OWNER" | "ADMIN" };

const COOKIE = "localhub_session";
const DAYS = 30;

function hashToken(token:string){ return createHash("sha256").update(token).digest("hex"); }
export function hashPassword(password:string){
 const salt=randomBytes(16).toString("hex");
 const derived=scryptSync(password,salt,64).toString("hex");
 return salt+":"+derived;
}
export function verifyPassword(password:string, stored:string){
 const [salt,key]=stored.split(":");
 if(!salt||!key)return false;
 const derived=scryptSync(password,salt,64);
 return timingSafeEqual(derived,Buffer.from(key,"hex"));
}
export async function createSession(userId:string){
 const token=randomBytes(32).toString("hex");
 await prisma.session.create({data:{tokenHash:hashToken(token),userId,expiresAt:new Date(Date.now()+DAYS*86400000)}});
 const jar=await cookies();
 jar.set(COOKIE,token,{httpOnly:true,secure:process.env.NODE_ENV==="production",sameSite:"lax",path:"/",maxAge:DAYS*86400});
}
export async function destroySession(){
 const jar=await cookies(); const token=jar.get(COOKIE)?.value;
 if(token) await prisma.session.deleteMany({where:{tokenHash:hashToken(token)}});
 jar.delete(COOKIE);
}
export async function getCurrentUser():Promise<CurrentUser|null>{
 const token=(await cookies()).get(COOKIE)?.value;
 if(!token)return null;
 const session=await prisma.session.findUnique({where:{tokenHash:hashToken(token)},include:{user:true}});
 if(!session||session.expiresAt<=new Date()) return null;
 return {id:session.user.id,name:session.user.name,role:session.user.role};
}
export function requireAdmin(user:CurrentUser|null){return Boolean(user&&user.role==="ADMIN");}
