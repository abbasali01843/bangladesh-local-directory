import { NextResponse } from "next/server";
export async function POST(){return NextResponse.json({error:"OFFLINE_MODE",message:"অফলাইন মোডে approval সার্ভারে সংরক্ষণ করা হয় না।"},{status:409});}
