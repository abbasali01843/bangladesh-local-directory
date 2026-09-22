import { NextResponse } from "next/server";
export async function POST(){return NextResponse.json({error:"OFFLINE_MODE",message:"অফলাইন মোডে দাবি অনুমোদন সার্ভার থেকে করা যায় না।"},{status:409});}
