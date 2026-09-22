import { NextResponse } from "next/server";
export async function PATCH(){return NextResponse.json({error:"OFFLINE_MODE",message:"অফলাইন মোডে ব্যবহারকারী role server-side পরিবর্তন করা যায় না।"},{status:409});}
