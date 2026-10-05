"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import TopBar from "@/components/TopBar";
import BottomNav from "@/components/BottomNav";
import { categories } from "@/data/categories";

type Loc={id:string;name:string;upazilas?:{id:string;name:string;unions?:{id:string;name:string;areas?:{id:string;name:string}[]}[]}[]};

export default function EditListing(){
 const {id}=useParams<{id:string}>(); const router=useRouter();
 const [x,setX]=useState<any>(null); const [loc,setLoc]=useState<Loc[]>([]); const [msg,setMsg]=useState(""); const [ok,setOk]=useState(false); const [busy,setBusy]=useState(false);
 const [district,setDistrict]=useState(""); const [upazila,setUpazila]=useState(""); const [union,setUnion]=useState(""); const [area,setArea]=useState(""); const [categoryId,setCategoryId]=useState(""); const [subId,setSubId]=useState("");
 useEffect(()=>{Promise.all([fetch("/api/owner/services").then(r=>r.json()),fetch("/api/locations").then(r=>r.json())]).then(([a,b])=>{const all=[...(a.data?.mine||[]),...(a.data?.claimed||[])];const v=all.find((s:any)=>s.id===id);if(!v){setMsg(a.error==="UNAUTHORIZED"?"লগইন প্রয়োজন":"লিস্টিং পাওয়া যায়নি");return} setX(v);setDistrict(v.district?.id||"");setUpazila(v.upazila?.id||"");setCategoryId(v.category?.id||"");setLoc(b.data||[])}).catch(()=>setMsg("ডাটা লোড হয়নি"));},[id]);
 const d=loc.find(v=>v.id===district); const u=d?.upazilas?.find(v=>v.id===upazila); const n=u?.unions?.find(v=>v.id===union); const cat=categories.find(v=>v.id===categoryId);
 async function save(e:React.FormEvent<HTMLFormElement>){e.preventDefault();setBusy(true);const f=new FormData(e.currentTarget);const r=await fetch("/api/services/"+id,{method:"PATCH",headers:{"Content-Type":"application/json"},body:JSON.stringify({name:f.get("name"),categoryId,districtId:district,upazilaId:upazila,unionId:union||null,areaId:area||null,phone:f.get("phone"),email:f.get("email"),address:f.get("address"),description:f.get("description"),subcategory:subId||null})});const j=await r.json();setBusy(false);setOk(r.ok);setMsg(r.ok?"তথ্য আপডেট হয়েছে। আবার Admin Review-তে যাবে।":j.message||j.error||"ব্যর্থ");if(r.ok)setTimeout(()=>router.push("/owner"),700)}
 if(!x)return <main className="ps-page"><TopBar title="তথ্য সম্পাদনা" subtitle="লিস্টিং" backHref="/owner"/><div className="ps-content"><div className="ps-empty"><p>{msg||"লোড হচ্ছে..."}</p><Link href="/owner" className="ps-btn-primary">ফিরুন</Link></div><BottomNav active="account"/></main>;
 return <main className="ps-page"><TopBar title="তথ্য সম্পাদনা" subtitle={x.name} backHref="/owner"/><div className="ps-content"><form onSubmit={save} className="ps-form">
 <label className="ps-label">নাম *<input name="name" required defaultValue={x.name} className="ps-input"/></label>
 <label className="ps-label">ক্যাটাগরি *<select className="ps-input" value={categoryId} onChange={e=>{setCategoryId(e.target.value);setSubId("")}}>{categories.map(c=><option key={c.id} value={c.id}>{c.icon} {c.name}</option>)}</select></label>
 {cat?.subcategories?.length ? <label className="ps-label">সাব-ক্যাটাগরি<select className="ps-input" value={subId} onChange={e=>setSubId(e.target.value)}><option value="">নির্বাচন করুন</option>{cat.subcategories.map(s=><option key={s.id} value={s.id}>{s.name}</option>)}</select></label>:null}
 <label className="ps-label">জেলা *<select className="ps-input" value={district} onChange={e=>{setDistrict(e.target.value);setUpazila("");setUnion("");setArea("")}}>{loc.map(v=><option key={v.id} value={v.id}>{v.name}</option>)}</select></label>
 <label className="ps-label">উপজেলা *<select className="ps-input" value={upazila} onChange={e=>{setUpazila(e.target.value);setUnion("");setArea("")}}>{d?.upazilas?.map(v=><option key={v.id} value={v.id}>{v.name}</option>)}</select></label>
 <label className="ps-label">ইউনিয়ন<select className="ps-input" value={union} onChange={e=>{setUnion(e.target.value);setArea("")}}><option value="">নির্বাচন করুন</option>{u?.unions?.map(v=><option key={v.id} value={v.id}>{v.name}</option>)}</select></label>
 <label className="ps-label">এলাকা<select className="ps-input" value={area} onChange={e=>setArea(e.target.value)}><option value="">নির্বাচন করুন</option>{n?.areas?.map(v=><option key={v.id} value={v.id}>{v.name}</option>)}</select></label>
 <label className="ps-label">মোবাইল<input name="phone" defaultValue={x.phone||""} className="ps-input"/></label>
 <label className="ps-label">ইমেইল<input name="email" type="email" defaultValue={x.email||""} className="ps-input"/></label>
 <label className="ps-label">ঠিকানা<input name="address" defaultValue={x.address||""} className="ps-input"/></label>
 <label className="ps-label">বিস্তারিত<textarea name="description" defaultValue={x.description||""} rows={5} className="ps-input"/></label>
 {msg&&<div className={ok?"ps-msg-ok":"ps-msg-err"}>{msg}</div>}<button disabled={busy} className="ps-btn-primary ps-btn-block">{busy?"সেভ হচ্ছে...":"সেভ করুন"}</button>
 </form></div><BottomNav active="account"/></main>;
}