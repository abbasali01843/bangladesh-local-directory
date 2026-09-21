"use client";
import { useEffect,useState } from "react";
import { categories } from "@/data/categories";
type L={id:string;name:string;upazilas?:U[]}; type U={id:string;name:string;unions?:N[]}; type N={id:string;name:string;areas?:A[]}; type A={id:string;name:string};
export default function AddListing(){
 const [loc,setLoc]=useState<L[]>([]),[district,setDistrict]=useState(""),[upazila,setUpazila]=useState(""),[union,setUnion]=useState(""),[area,setArea]=useState(""),[message,setMessage]=useState(""),[busy,setBusy]=useState(false);
 useEffect(()=>{fetch("/api/locations").then(r=>r.json()).then(j=>setLoc(j.data||[])).catch(()=>{})},[]);
 const d=loc.find(x=>x.id===district),u=d?.upazilas?.find(x=>x.id===upazila),n=u?.unions?.find(x=>x.id===union),a=n?.areas?.find(x=>x.id===area);
 async function submit(e:React.FormEvent<HTMLFormElement>){e.preventDefault();setBusy(true);setMessage("");const f=new FormData(e.currentTarget);const r=await fetch("/api/services",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({name:f.get("name"),categoryId:f.get("category"),districtId:district,upazilaId:upazila,unionId:union||null,areaId:area||null,phone:f.get("phone"),description:f.get("description")})});const j=await r.json();setMessage(r.ok?"তথ্য সফলভাবে জমা হয়েছে। Admin approval-এর অপেক্ষায় আছে।":j.message||j.error||"জমা দেওয়া যায়নি");if(r.ok)e.currentTarget.reset();setBusy(false)}
 const selectStyle={display:"block",width:"100%",padding:12,marginTop:6};
 return <main className="container" style={{padding:"32px 0",maxWidth:760}}><h1>তথ্য যোগ করুন</h1><p style={{color:"#667085"}}>সঠিক লোকেশন নির্বাচন করে তথ্য দিন।</p><form onSubmit={submit} style={{display:"grid",gap:14,background:"#fff",padding:24,border:"1px solid #e5e7eb",borderRadius:18}}>
 <label>নাম<input required name="name" style={selectStyle}/></label>
 <label>ক্যাটাগরি<select name="category" style={selectStyle}>{categories.map(c=><option key={c.id} value={c.id}>{c.name}</option>)}</select></label>
 <label>জেলা<select required value={district} onChange={e=>{setDistrict(e.target.value);setUpazila("");setUnion("");setArea("")}} style={selectStyle}><option value="">জেলা নির্বাচন করুন</option>{loc.map(x=><option key={x.id} value={x.id}>{x.name}</option>)}</select></label>
 <label>উপজেলা<select required disabled={!district} value={upazila} onChange={e=>{setUpazila(e.target.value);setUnion("");setArea("")}} style={selectStyle}><option value="">উপজেলা নির্বাচন করুন</option>{d?.upazilas?.map(x=><option key={x.id} value={x.id}>{x.name}</option>)}</select></label>
 <label>ইউনিয়ন<select disabled={!upazila} value={union} onChange={e=>{setUnion(e.target.value);setArea("")}} style={selectStyle}><option value="">ইউনিয়ন নির্বাচন করুন</option>{u?.unions?.map(x=><option key={x.id} value={x.id}>{x.name}</option>)}</select></label>
 <label>এলাকা<select disabled={!union} value={area} onChange={e=>setArea(e.target.value)} style={selectStyle}><option value="">এলাকা নির্বাচন করুন</option>{n?.areas?.map(x=><option key={x.id} value={x.id}>{x.name}</option>)}</select></label>
 <label>মোবাইল<input name="phone" type="tel" style={selectStyle}/></label><label>বিস্তারিত<textarea name="description" rows={5} style={selectStyle}/></label>
 {message&&<div style={{padding:12,background:"#f0fdf4",borderRadius:10}}>{message}</div>}
 <button disabled={busy||!district||!upazila} style={{padding:14,border:0,borderRadius:10,background:"#0f766e",color:"#fff",fontWeight:700}}>{busy?"জমা হচ্ছে...":"জমা দিন — Admin Review"}</button>
 </form></main>
}