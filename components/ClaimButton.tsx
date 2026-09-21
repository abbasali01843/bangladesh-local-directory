"use client";
import { useState } from "react";
export default function ClaimButton({id}:{id:string}){
 const [busy,setBusy]=useState(false),[msg,setMsg]=useState("");
 async function claim(){
  setBusy(true); const r=await fetch("/api/services/"+id+"/claim",{method:"POST"}); const j=await r.json();
  setMsg(r.ok?"Claim request submitted":j.error==="UNAUTHORIZED"?"Login required":"Could not submit claim"); setBusy(false);
 }
 return <div style={{marginTop:16}}><button onClick={claim} disabled={busy}>{busy?"Submitting...":"Claim this listing"}</button>{msg&&<span style={{marginLeft:10}}>{msg}</span>}</div>;
}