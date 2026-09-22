"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import TopBar from "@/components/TopBar";
import BottomNav from "@/components/BottomNav";

type U = { id: string; name: string; unions?: { id: string; name: string }[] };
type D = { id: string; name: string; upazilas?: U[] };
type V = { id: string; name: string; districts?: D[] };
type S = { id:string; name:string; description?:string; category?:{name:string}; district?:{name:string}; upazila?:{name:string}; union?:{name:string}; area?:{name:string}; verificationStatus:string };

export default function Search() {
  const params = useSearchParams();
  const [loc,setLoc]=useState<V[]>([]);
  const [division,setDivision]=useState("");
  const [district,setDistrict]=useState("");
  const [upazila,setUpazila]=useState("");
  const [q,setQ]=useState(params.get("q")||"");
  const [items,setItems]=useState<S[]>([]);
  const [loading,setLoading]=useState(false);

  useEffect(()=>{ fetch("/api/locations").then(r=>r.json()).then(j=>setLoc(j.data||[])).catch(()=>setLoc([])); },[]);
  const v=loc.find(x=>x.id===division);
  const d=v?.districts?.find(x=>x.id===district);
  const districts=useMemo(()=>division ? (v?.districts||[]) : loc.flatMap(x=>x.districts||[]),[loc,v,division]);

  async function search(e?:React.FormEvent){
    e?.preventDefault(); setLoading(true);
    const p=new URLSearchParams();
    if(q.trim()) p.set("q",q.trim());
    if(district)p.set("districtId",district);
    if(upazila)p.set("upazilaId",upazila);
    try{const r=await fetch("/api/directory/search?"+p);const j=await r.json();setItems(r.ok?j.data||[]:[]);}catch{setItems([]);}
    setLoading(false);
  }
  useEffect(()=>{search();},[]);

  return <main className="ps-page">
    <TopBar title="খুঁজুন" subtitle="সারা বাংলাদেশ" backHref="/" />
    <div className="ps-content">
      <form onSubmit={search} className="ps-search">
        <span className="ps-search-icon">🔍</span><input value={q} onChange={e=>setQ(e.target.value)} placeholder="ব্যবসা, ডাক্তার, স্কুল, সেবা..." aria-label="Search"/>
      </form>
      <div className="ps-filters">
        <select value={division} onChange={e=>{setDivision(e.target.value);setDistrict("");setUpazila("");}} className="ps-select">
          <option value="">সব বিভাগ</option>{loc.map(x=><option key={x.id} value={x.id}>{x.name}</option>)}
        </select>
        <select value={district} onChange={e=>{setDistrict(e.target.value);setUpazila("");}} className="ps-select">
          <option value="">সব জেলা</option>{districts.map(x=><option key={x.id} value={x.id}>{x.name}</option>)}
        </select>
        <select value={upazila} disabled={!district} onChange={e=>setUpazila(e.target.value)} className="ps-select">
          <option value="">সব উপজেলা</option>{d?.upazilas?.map(x=><option key={x.id} value={x.id}>{x.name}</option>)}
        </select>
      </div>
      <button type="button" onClick={()=>search()} className="ps-btn-primary ps-btn-block" style={{marginBottom:16}}>{loading?"খুঁজছে...":"খুঁজুন"}</button>
      <div className="ps-section-head"><h2>{loading?"খুঁজছে...":`${items.length}টি ফলাফল`}</h2></div>
      {items.length===0&&!loading?<div className="ps-empty"><div className="ps-empty-icon">🔍</div><h2>কোনো ফলাফল নেই</h2><p>অন্য কীওয়ার্ড বা লোকেশন দিয়ে চেষ্টা করুন।</p></div>:
      <div className="ps-list">{items.map(s=><a key={s.id} href={`/services/${s.id}`} className="ps-list-card"><div className="ps-list-top"><strong>{s.name}</strong>{s.verificationStatus!=="UNVERIFIED"&&<span className="ps-badge">✓ Verified</span>}</div><p className="ps-list-loc">📍 {[s.area?.name,s.union?.name,s.upazila?.name,s.district?.name].filter(Boolean).join(", ")}{s.category?.name?` · ${s.category.name}`:""}</p>{s.description&&<p className="ps-list-desc">{s.description}</p>}</a>)}</div>}
    </div><BottomNav active="search"/>
  </main>;
}
