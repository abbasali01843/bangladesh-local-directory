"use client";
import { useState } from "react";

export default function ClaimButton({ id }: { id: string }) {
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState("");
  const [done, setDone] = useState(false);

  async function claim() {
    setBusy(true);
    setMsg("");
    try {
      const r = await fetch("/api/services/" + id + "/claim", { method: "POST" });
      const j = await r.json().catch(() => ({}));
      if (r.ok) {
        setDone(true);
        setMsg("✅ দাবির আবেদন জমা হয়েছে। অ্যাডমিন যাচাই করে জানাবে।");
      } else if (j.error === "UNAUTHORIZED") {
        setMsg("🔑 আগে লগইন করুন, তারপর দাবি করুন।");
      } else if (j.error === "DATABASE_NOT_CONFIGURED") {
        setMsg("ডেমো মোডে দাবি জমা হয় না — DB চালু হলে চেষ্টা করুন।");
      } else if (j.error === "NOT_FOUND") {
        setMsg("এই ডেমো তালিকার দাবি এখন করা যাবে না।");
      } else {
        setMsg("দাবি জমা দেওয়া যায়নি, পরে চেষ্টা করুন।");
      }
    } catch {
      setMsg("সার্ভারে সংযোগ করা যাচ্ছে না।");
    }
    setBusy(false);
  }

  if (done) return <div className="ps-msg-ok" style={{ marginTop: 12 }}>{msg}</div>;

  return (
    <div style={{ marginTop: 12 }}>
      <button type="button" onClick={claim} disabled={busy} className="ps-btn-ghost ps-btn-block">
        {busy ? "জমা হচ্ছে..." : "🏪 এই তালিকার মালিক আমি — দাবি করুন"}
      </button>
      {msg && <div className="ps-msg-err" style={{ marginTop: 8 }}>{msg}</div>}
    </div>
  );
}
