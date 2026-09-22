import { NextResponse } from "next/server";
export async function GET(){return NextResponse.json({data:[],source:"offline",message:"অফলাইন মোডে owner dashboard server data ব্যবহার করে না।"});}
