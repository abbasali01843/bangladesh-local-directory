import { NextResponse } from "next/server";
export async function GET(){return NextResponse.json({data:[],source:"offline",message:"অফলাইন মোডে সার্ভারভিত্তিক moderation নেই।"});}
