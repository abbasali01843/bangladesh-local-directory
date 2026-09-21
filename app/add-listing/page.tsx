"use client";
import { useState } from "react";
import { categories } from "@/data/categories";
import { locations } from "@/data/locations";

export default function AddListing() {
  const [message,setMessage]=useState("");
  const [busy,setBusy]=useState(false);
  async function submit(e:React.FormEvent<HTMLFormElement>) {
    e.preventDefault(); setBusy(true); setMessage("");
    const f=new FormData(e.currentTarget);
    const districtName=String(f.get("district"));
    const district=locations.find(x=>x.name===districtName);
    const upazilaName=String(f.get("upazila"));
    const upazila=district?.upazilas.find((x:any)=>x.name===upazilaName);
    try {
      const r=await fetch("/api/services",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({
        name:f.get("name"), categoryId:f.get("category"), districtId:district?.id, upazilaId:upazila?.id,
        phone:f.get("phone"), address:f.get("area"), description:f.get("description")
      })});
      const j=await r.json();
      setMessage(r.ok ? "তথ্য সফলভাবে জমা হয়েছে। Admin approval-এর অপেক্ষায় আছে।" : (j.message || "তথ্য জমা দেওয়া যায়নি।"));
      if(r.ok) e.currentTarget.reset();
    } catch { setMessage("সার্ভারে সংযোগ করা যাচ্ছে না।"); }
    finally { setBusy(false); }
  }
  return <main className="container" style={{padding:"32px 0",maxWidth:760}}>
    <h1>তথ্য যোগ করুন</h1><p style={{color:"#667085"}}>আপনার তথ্য Admin যাচাই করে প্রকাশ করবে।</p>
    <form onSubmit={submit} style={{display:"grid",gap:14,background:"#fff",padding:24,border:"1px solid #e5e7eb",borderRadius:18}}>
      <label>নাম<input required name="name" style={{display:"block",width:"100%",padding:12,marginTop:6}}/></label>
      <label>ক্যাটাগরি<select name="category" style={{display:"block",width:"100%",padding:12,marginTop:6}}>{categories.map(c=><option key={c.id} value={c.id}>{c.name}</option>)}</select></label>
      <label>জেলা<select name="district" style={{display:"block",width:"100%",padding:12,marginTop:6}}>{locations.map(l=><option key={l.id}>{l.name}</option>)}</select></label>
      <label>উপজেলা<input required name="upazila" placeholder="যেমন: শেরপুর সদর" style={{display:"block",width:"100%",padding:12,marginTop:6}}/></label>
      <label>এলাকা/ঠিকানা<input name="area" style={{display:"block",width:"100%",padding:12,marginTop:6}}/></label>
      <label>মোবাইল<input name="phone" type="tel" style={{display:"block",width:"100%",padding:12,marginTop:6}}/></label>
      <label>বিস্তারিত<textarea name="description" rows={5} style={{display:"block",width:"100%",padding:12,marginTop:6}}/></label>
      {message && <div style={{padding:12,borderRadius:10,background:"#f0fdf4"}}>{message}</div>}
      <button disabled={busy} type="submit" style={{padding:14,border:0,borderRadius:10,background:"#0f766e",color:"#fff",fontWeight:700}}>{busy?"জমা হচ্ছে...":"জমা দিন — Admin Review"}</button>
    </form>
  </main>;
}