"use client";

import { useEffect, useState } from "react";
import { services } from "@/data/services";
import { categories } from "@/data/categories";
import TopBar from "@/components/TopBar";
import BottomNav from "@/components/BottomNav";

export default function ServiceDetails({params}:{params:Promise<{id:string}>}){
 const [id,setId]=useState(""),[local,setLocal]=useState<any>(null); useEffect(()=>{params.then(p=>setId(p.id));},[params]);
 useEffect(()=>{if(id.startsWith("local-")){try{setLocal(JSON.parse(localStorage.getItem("bdld_listings")||"[]").find((x:any)=>x.id===id)||null)}catch{}}},[id]);
 const s=services.find(x=>x.id===id); const data:any=s||local; if(!data&&!id)return null; if(!data)return <main className="ps-page"><TopBar title="বিস্তারিত" subtitle="সারা বাংলাদেশ" backHref="/search"/><div className="ps-content"><div className="ps-empty"><h2>তথ্য পাওয়া যায়নি</h2><a href="/search" className="ps-btn-primary">খুঁজুন</a></div></div><BottomNav/></main>;
 const c=categories.find(x=>x.id===data.category); const fields=data.fields||{};
 return <main className="ps-page"><TopBar title="বিস্তারিত" subtitle={data.union||"সারা বাংলাদেশ"} backHref="/search"/><div className="ps-content"><div className="ps-detail"><div className="ps-detail-icon">{c?.icon||"📋"}</div><h1 className="ps-detail-title">{data.name}</h1>{data.verified&&<span className="ps-badge">✓ যাচাইকৃত সূত্র</span>}{!data.verified&&<span className="ps-badge">অফলাইন সাবমিশন</span>}<p className="ps-list-loc" style={{marginTop:10}}>📍 {[data.area,data.union,data.upazila,data.district].filter(Boolean).join(", ")}</p><p className="ps-detail-desc">{data.description}</p><div className="ps-detail-fields">{Object.entries(fields).map(([key,value])=><div key={key} className="ps-field-row"><span className="ps-field-label">{c?.fields.find(f=>f.key===key)?.label||key}</span><span className="ps-field-value">{String(value)}</span></div>)}</div>{data.phone&&<a href={`tel:${data.phone}`} className="ps-btn-primary ps-btn-block">📞 কল — {data.phone}</a>}</div></div><BottomNav/></main>;
}
