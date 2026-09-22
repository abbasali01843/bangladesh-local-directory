import { NextResponse } from "next/server";
export async function POST(){return NextResponse.json({error:"OFFLINE_MODE",message:"অফলাইন মোডে লগইন প্রয়োজন নেই।"}, {status:409});}
