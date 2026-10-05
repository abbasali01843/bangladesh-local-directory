"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import TopBar from "@/components/TopBar";
import BottomNav from "@/components/BottomNav";

type S={id:string;name:string;status:string;category?:{name:string;id:string};district?:{name:string;id:string};upazila?:{name:string;id:string}};
type C={id:string;status:string;service?:{id:string;name:string}};
const statusBn:Record<string,string>={PENDING:"⏳ রিভিউতে",APPROVED:"✅ প্রকাশিত",REJECTED:"❌ বাতিল",SUSPENDED:"⛔ স্থগিত"};

export default function OwnerDashboard(){
 const [mine,setMine]=useState<S[]>([]),[claimed,setClaimed]=useState<S[]>([]),[claims,setClaims]=useState<C[]>([]);
 const [loading,setLoading]=useState(true),[msg,setMsg]=useState(""),[needLogin,setNeedLogin]=useState(false),[actionId,setActionId]=useState<string|null>(null);
 useEffect(()=>{fetch("/api/owner/services").then(async r=>{const j=await r.json();if(r.ok){setMine(j.data?.mine||[]);setClaimed(j.data?.claimed||[])}else if(j.error==="UNAUTHORIZED"){setNeedLogin(true);setMsg("লগইন প্রয়োজন")}else setMsg(j.message||"ডাটা লোড হয়নি");}).catch(()=>setMsg("সার্ভারে সংযোগ করা যাচ্ছে না")).finally(()=>setLoading(false));},[]);
 async function suspend(id:string){if(!window.confirm("এই listing-টি public থেকে সরিয়ে দিতে চান?"))return;setActionId(id);const r=await fetch("/api/services/"+id+"/suspend",{method:"POST"});const j=await r.json().catch(()=>({}));setActionId(null);if(r.ok){setMine(v=>v.map(x=>x.id===id?{...x,status:"SUSPENDED"}:x));setClaimed(v=>v.map(x=>x.id===id?{...x,status:"SUSPENDED"}:x));}else setMsg(j.message||"লিস্টিংটি সরানো যায়নি");}
 function Card({x}:{x:S}){return <div className="ps-list-card"><div onClick={()=>x.status==="APPROVED"&&(window.location.href="/services/"+x.id)} style={{cursor:x.status==="APPROVED"?"pointer":"default"}}><div className="ps-list-top"><strong>{x.name}</strong><span className="ps-badge">{statusBn[x.status]||x.status}</span></div><p className="ps-list-loc">📍 {x.upazila?.name||"—"}, {x.district?.name||"—"}{x.category?.name?" · "+x.category.name:""}</p></div><div style={{display:"flex",gap:8,marginTop:8}}><Link href={"/owner/"+x.id+"/edit"} className="ps-btn-ghost">✏️ সম্পাদনা</Link>{x.status!=="SUSPENDED"&&<button className="ps-btn-ghost" disabled={actionId===x.id} onClick={()=>suspend(x.id)}>{actionId===x.id?"...":"⏸️ সরান"}</button>}</div></div>}
 return <main className="ps-page"><TopBar title="ওনার ড্যাশবোর্ড" subtitle="আমার তালিকা" backHref="/"/><div className="ps-content">{msg&&<div className="ps-msg-err" style={{marginBottom:12}}>{msg}{needLogin&&<div style={{marginTop:10}}><Link href="/login" className="ps-btn-primary">লগইন করুন</Link></div>}</div>}{loading?<div className="ps-empty"><p>লোড হচ্ছে...</p></div>:!needLogin&&<><div className="ps-section-head"><span className="ps-section-icon">📤</span><h2>আমার জমা ({mine.length})</h2></div>{mine.length?<div className="ps-list">{mine.map(x=><Card key={x.id} x={x}/>)}</div>:<div className="ps-list-card"><p className="ps-list-desc">এখনো কিছু জমা দেননি।</p></div>}<div className="ps-section-head" style={{marginTop:14}}><span className="ps-section-icon">🏪</span><h2>আমার মালিকানাধীন ({claimed.length})</h2></div>{claimed.length?<div className="ps-list">{claimed.map(x=><Card key={x.id} x={x}/>)}</div>:<div className="ps-list-card"><p className="ps-list-desc">কোনো তালিকার মালিকানা নেননি।</p></div>}<Link href="/add-listing" className="ps-btn-primary ps-btn-block" style={{marginTop:16}}>+ নতুন তথ্য যোগ করুন</Link></>}</div><BottomNav active="account"/></main>;
}