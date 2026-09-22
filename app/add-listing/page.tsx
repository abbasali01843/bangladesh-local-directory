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
  if(!district||!upazila){setMessage("জেলা ও উপজেলা নির্বাচন করুন।");setBusy(false);return;}
  const listing={id:"local-"+Date.now(),name:String(f.get("name")||""),category:String(f.get("category")||""),district:district,upazila:upazila,union:union||"",area:area||"",phone:String(f.get("phone")||""),description:String(f.get("description")||""),verified:false};
  const saved=JSON.parse(localStorage.getItem("bdld_listings")||"[]");
  localStorage.setItem("bdld_listings",JSON.stringify([listing,...saved]));
  setOk(true);setMessage("তথ্য এই ডিভাইসে অফলাইনে সংরক্ষণ হয়েছে।");e.currentTarget.reset();setDivision("");setDistrict("");setUpazila("");setUnion("");setArea("");setBusy(false);
 }
 return <main className="ps-page"><TopBar title="তথ্য যোগ করুন" subtitle="সারা বাংলাদেশ" backHref="/"/><div className="ps-content">
 {staticMode&&<div className="ps-msg-err" style={{marginBottom:12}}>অফলাইন মোড: আপনার যোগ করা তথ্য এই ডিভাইসেই সংরক্ষণ হবে।</div>}
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
 <button disabled={busy||!upazila} className="ps-btn-primary ps-btn-block">{busy?"সংরক্ষণ হচ্ছে...":"অফলাইনে সংরক্ষণ করুন"}</button>
 </form></div><BottomNav active="add"/></main>;
}
