"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
export default function Login(){
 const [identifier,setIdentifier]=useState(""),[password,setPassword]=useState(""),[message,setMessage]=useState(""),[busy,setBusy]=useState(false); const router=useRouter();
 async function submit(e:React.FormEvent){e.preventDefault();setBusy(true);const r=await fetch("/api/auth/login",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({identifier,password})});const j=await r.json();setMessage(r.ok?"Login successful":j.message||"Login failed");setBusy(false);if(r.ok)router.push("/");}
 return <main className="container" style={{maxWidth:460,padding:"48px 0"}}><h1>Login</h1><form onSubmit={submit} style={{display:"grid",gap:14,background:"#fff",padding:24,borderRadius:18,border:"1px solid #e5e7eb"}}><input required placeholder="Email বা মোবাইল" value={identifier} onChange={e=>setIdentifier(e.target.value)} style={{padding:12}}/><input required type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} style={{padding:12}}/>{message&&<p>{message}</p>}<button disabled={busy} style={{padding:13}}>{busy?"অপেক্ষা করুন...":"Login"}</button></form></main>;
}