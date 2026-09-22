"use client";

import { useEffect, useState } from "react";
import { categories } from "@/data/categories";
import TopBar from "@/components/TopBar";
import BottomNav from "@/components/BottomNav";

type Area={id:string;name:string}; type Union={id:string;name:string;areas?:Area[]}; type Up={id:string;name:string;unions?:Union[]}; type District={id:string;name:string;upazilas?:Up[]}; type Division={id:string;name:string;districts?:District[]};

export default function AddListing(){
 const [loc,setLoc]=useState<Division[]>([]),[division,setDivision]=useState(""),[district,setDistrict]=useState(""),[upazila,setUpazila]=useState(""),[union,setUnion]=useState(""),[area,setArea]=useState(""),[message,setMessage]=useState(""),[ok,setOk]=useState(false),[busy,setBusy]=useState(false),[staticMode,setStaticMode]=useState(false);
 useEffect(()=>{fetch("/api/locations").then(r=>r.json()).then(j=>{setLoc(j.data||[]);setStaticMode(j.source==="static");}).catch(()=>setStaticMode(true));},[]);
 const v=loc.find(x=>x.id===division),d=v?.districts?.find(x=>x.id===district),u=d?.upazilas?.find(x=>x.id===upazila),n=u?.unions?.find(x=>x.id===union);
 async function submit(e:React.FormEvent<HTMLFormElement>){e.preventDefault();setBusy(true);setMessage("");setOk(false);const f=new FormData(e.currentTarget);
  if(staticMode){setMessage("ডাটাবেস এখনো সেট নেই। লোকেশন নির্বাচন ঠিক আছে; তথ্য সেভ করতে DB চালু করতে হবে।");setBusy(false);return;}
  if(!district||!upazila){setMessage("জেলা ও উপজেলা নির্বাচন করুন।");setBusy(false);return;}
  const r=await fetch("/api/services",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({name:f.get("name"),categoryId:f.get("category"),districtId:district,upazilaId:upazila,unionId:union||null,areaId:area||null,phone:f.get("phone"),description:f.get("description")})});
  const j=await r.json(); if(r.ok){setOk(true);setMessage("তথ্য সফলভাবে জমা হয়েছে। Admin approval-এর অপেক্ষায়।");e.currentTarget.reset();setDivision("");setDistrict("");setUpazila("");setUnion("");setArea("");}else setMessage(j.message||j.error||"জমা দেওয়া যায়নি");setBusy(false);
 }
 return <main className="ps-page"><TopBar title="তথ্য যোগ করুন" subtitle="সারা বাংলাদেশ" backHref="/"/><div className="ps-content">
 {staticMode&&<div className="ps-msg-err" style={{marginBottom:12}}>ডেমো মোড: লোকেশন ও ফর্ম কাজ করছে; DB সংযুক্ত হলে তথ্য সংরক্ষণ চালু হবে।</div>}
 <form onSubmit={submit} className="ps-form">
 <label className="ps-label">নাম *<input required name="name" className="ps-input" placeholder="যেমন: ডা. করিম চেম্বার"/></label>
 <label className="ps-label">ক্যাটাগরি *<select name="category" className="ps-input" required>{categories.map(c=><option key={c.id} value={c.id}>{c.icon} {c.name}</option>)}</select></label>
 <label className="ps-label">বিভাগ *<select required value={division} onChange={e=>{setDivision(e.target.value);setDistrict("");setUpazila("");setUnion("");setArea("");}} className="ps-input"><option value="">বিভাগ নির্বাচন করুন</option>{loc.map(x=><option key={x.id} value={x.id}>{x.name}</option>)}</select></label>
 <label className="ps-label">জেলা *<select required disabled={!division} value={district} onChange={e=>{setDistrict(e.target.value);setUpazila("");setUnion("");setArea("");}} className="ps-input"><option value="">জেলা নির্বাচন করুন</option>{v?.districts?.map(x=><option key={x.id} value={x.id}>{x.name}</option>)}</select></label>
 <label className="ps-label">উপজেলা *<select required disabled={!district} value={upazila} onChange={e=>{setUpazila(e.target.value);setUnion("");setArea("");}} className="ps-input"><option value="">উপজেলা নির্বাচন করুন</option>{d?.upazilas?.map(x=><option key={x.id} value={x.id}>{x.name}</option>)}</select></label>
 <label className="ps-label">ইউনিয়ন/পৌরসভা<select disabled={!upazila} value={union} onChange={e=>{setUnion(e.target.value);setArea("");}} className="ps-input"><option value="">নির্বাচন করুন</option>{u?.unions?.map(x=><option key={x.id} value={x.id}>{x.name}</option>)}</select></label>
 <label className="ps-label">এলাকা<select disabled={!union} value={area} onChange={e=>setArea(e.target.value)} className="ps-input"><option value="">এলাকা নির্বাচন করুন</option>{n?.areas?.map(x=><option key={x.id} value={x.id}>{x.name}</option>)}</select></label>
 <label className="ps-label">মোবাইল<input name="phone" type="tel" className="ps-input" placeholder="01XXXXXXXXX"/></label>
 <label className="ps-label">বিস্তারিত<textarea name="description" rows={4} className="ps-input" placeholder="সংক্ষিপ্ত বিবরণ..."/></label>
 {message&&<div className={ok?"ps-msg-ok":"ps-msg-err"}>{message}</div>}
 <button disabled={busy||!upazila} className="ps-btn-primary ps-btn-block">{busy?"জমা হচ্ছে...":staticMode?"চেক করুন (ডেমো)":"জমা দিন — Admin Review"}</button>
 </form></div><BottomNav active="add"/></main>;
}
