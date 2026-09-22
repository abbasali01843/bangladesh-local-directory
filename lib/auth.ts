export type CurrentUser = { id:string; name:string; role:"USER"|"BUSINESS_OWNER"|"ADMIN" };
export function hashPassword(password:string){return password;}
export function verifyPassword(password:string,stored:string){return password===stored;}
export async function createSession(userId:string){return userId;}
export async function destroySession(){}
export async function getCurrentUser():Promise<CurrentUser|null>{return null;}
export function requireAdmin(user:CurrentUser|null){return Boolean(user&&user.role==="ADMIN");}
