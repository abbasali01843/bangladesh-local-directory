"use client";
import { useEffect, useState } from "react";

type Listing={id:string;name:string;status:string;category?:{name:string};district?:{name:string};upazila?:{name:string}};

export default function Admin(){
 const [items,setItems]=useState<Listing[]>([]);
 const [loading,setLoading]=useState(true);
 const [message,setMessage]=useState("");
 async function load(){
  setLoading(true);
  try{
   const r=await fetch("/api/admin/services?status=PENDING");
   const j=await r.json();
   if(r.ok)setItems(j.data||[]); else setMessage(j.message||"Admin data load হয়নি");
  }catch{setMessage("সার্ভারে সংযোগ করা যাচ্ছে না");}
  finally{setLoading(false);}
 }
 useEffect(()=>{load()},[]);
 async function act(id:string,action:"approve"|"reject"){
  const r=await fetch("/api/admin/services/"+id+"/"+action,{method:"POST"});
  const j=await r.json();
  if(r.ok){setItems(x=>x.filter(i=>i.id!==id));setMessage(action==="approve"?"Listing approved":"Listing rejected");}
  else setMessage(j.message||j.error||"কাজটি সম্পন্ন হয়নি");
 }
 return <main className="container" style={{padding:"32px 0"}}>
  <h1>Admin Dashboard</h1>
  <p style={{color:"#667085"}}>Pending listing review এবং moderation.</p>
  {message&&<div style={{margin:"12px 0",padding:12,background:"#f8fafc",borderRadius:10}}>{message}</div>}
  <h2>Pending Submissions</h2>
  {loading?<p>লোড হচ্ছে...</p>:items.length===0?<p>কোনো pending listing নেই।</p>:
   <div style={{display:"grid",gap:12}}>{items.map(x=><div key={x.id} style={{background:"#fff",padding:18,border:"1px solid #e5e7eb",borderRadius:14}}>
    <strong>{x.name}</strong>
    <div style={{color:"#667085",margin:"6px 0"}}>{x.category?.name||"—"} · {x.upazila?.name||"—"}, {x.district?.name||"—"}</div>
    <span style={{fontSize:12}}>#{x.id}</span>
    <div style={{marginTop:12,display:"flex",gap:8}}><button onClick={()=>act(x.id,"approve")}>Approve</button><button onClick={()=>act(x.id,"reject")}>Reject</button></div>
   </div>)}</div>}
 </main>
}