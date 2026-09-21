"use client";
import { useEffect,useState } from "react";
type S={id:string;name:string;status:string;verificationStatus:string;category?:{name:string};district?:{name:string};upazila?:{name:string}};
export default function OwnerDashboard(){
 const [data,setData]=useState<S[]>([]),[msg,setMsg]=useState("Loading...");
 useEffect(()=>{fetch("/api/owner/services").then(async r=>{const j=await r.json();setData(r.ok?j.data||[]:[]);setMsg(r.ok?"":j.error==="UNAUTHORIZED"?"Login required":"Database unavailable")}).catch(()=>setMsg("Server unavailable"))},[]);
 return <main className="container" style={{padding:"32px 0"}}><h1>Business Owner Dashboard</h1>{msg&&<p>{msg}</p>}{data.map(x=><div key={x.id} style={{background:"#fff",padding:18,margin:"12px 0",border:"1px solid #e5e7eb",borderRadius:14}}><strong>{x.name}</strong><div>{x.category?.name} · {x.upazila?.name}, {x.district?.name}</div><small>{x.status} · {x.verificationStatus}</small></div>)}</main>;
}