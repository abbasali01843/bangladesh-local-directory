import { NextResponse } from "next/server";
export async function POST(){return NextResponse.json({error:"OFFLINE_MODE",message:"অফলাইন মোডে claim সার্ভারে সংরক্ষণ করা যায় না।"},{status:409});}
