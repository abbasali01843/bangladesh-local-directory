"use client";
import { useEffect,useState } from "react";
type S={id:string;name:string;description?:string;category?:{name:string};district?:{name:string};upazila?:{name:string};union?:{name:string};area?:{name:string};verificationStatus:string};
type L={id:string;name:string;upazilas?:{id:string;name:string}[]};
export default function Search(){
 const [loc,setLoc]=useState<L[]>([]),[district,setDistrict]=useState(""),[upazila,setUpazila]=useState(""),[q,setQ]=useState(""),[items,setItems]=useState<S[]>([]),[loading,setLoading]=useState(false);
 useEffect(()=>{fetch("/api/locations").then(r=>r.json()).then(j=>setLoc(j.data||[]))},[]);
 const d=loc.find(x=>x.id===district);
 async function search(e?:React.FormEvent){e?.preventDefault();setLoading(true);const p=new URLSearchParams();if(q)p.set("q",q);if(district)p.set("districtId",district);if(upazila)p.set("upazilaId",upazila);const r=await fetch("/api/directory/search?"+p);const j=await r.json();setItems(r.ok?j.data||[]:[]);setLoading(false)}
 useEffect(()=>{search()},[]);
 return <main className="container" style={{padding:"32px 0"}}><h1>স্থানীয় তথ্য খুঁজুন</h1>
 <form onSubmit={search} style={{display:"grid",gridTemplateColumns:"1fr auto",gap:10}}><input value={q} onChange={e=>setQ(e.target.value)} placeholder="ব্যবসা, ডাক্তার, স্কুল, সেবা..." style={{padding:14,border:"1px solid #d0d5dd",borderRadius:10}}/><button style={{border:0,borderRadius:10,padding:"0 22px",background:"#0f766e",color:"#fff"}}>খুঁজুন</button></form>
 <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginTop:12}}><select value={district} onChange={e=>{setDistrict(e.target.value);setUpazila("")}} style={{padding:12}}><option value="">সব জেলা</option>{loc.map(x=><option key={x.id} value={x.id}>{x.name}</option>)}</select><select value={upazila} disabled={!district} onChange={e=>setUpazila(e.target.value)} style={{padding:12}}><option value="">সব উপজেলা</option>{d?.upazilas?.map(x=><option key={x.id} value={x.id}>{x.name}</option>)}</select></div>
 <div style={{marginTop:22}}><strong>{loading?"খুঁজছে...":items.length+"টি ফলাফল"}</strong></div>
 <div style={{display:"grid",gap:14,marginTop:14}}>{items.map(s=><a key={s.id} href={"/services/"+s.id} style={{background:"#fff",border:"1px solid #e5e7eb",borderRadius:16,padding:18,textDecoration:"none",color:"inherit"}}><strong>{s.name}</strong>{s.verificationStatus!=="UNVERIFIED"&&<span style={{marginLeft:10,color:"#087443",fontSize:13}}>✓ Verified</span>}<div style={{marginTop:7,color:"#667085"}}>📍 {[s.area?.name,s.union?.name,s.upazila?.name,s.district?.name].filter(Boolean).join(", ")} · {s.category?.name}</div>{s.description&&<p style={{color:"#667085"}}>{s.description}</p>}</a>)}</div>
 </main>
}