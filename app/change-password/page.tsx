"use client";

import { useState } from "react";
import TopBar from "@/components/TopBar";
import BottomNav from "@/components/BottomNav";

export default function ChangePasswordPage() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [ok, setOk] = useState(false);
  const [busy, setBusy] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setMessage("");
    try {
      const r = await fetch("/api/auth/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword, newPassword }),
      });
      const j = await r.json().catch(() => ({}));
      setOk(r.ok);
      setMessage(j.message || j.error || (r.ok ? "পাসওয়ার্ড পরিবর্তন হয়েছে।" : "পাসওয়ার্ড পরিবর্তন করা যায়নি।"));
      if (r.ok) {
        setCurrentPassword("");
        setNewPassword("");
      }
    } catch {
      setOk(false);
      setMessage("সার্ভারে সংযোগ করা যাচ্ছে না।");
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="ps-page">
      <TopBar title="পাসওয়ার্ড পরিবর্তন" subtitle="অ্যাকাউন্ট নিরাপত্তা" backHref="/account" />
      <div className="ps-content">
        <form onSubmit={submit} className="ps-form">
          <label className="ps-label">
            বর্তমান পাসওয়ার্ড
            <input required type="password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} className="ps-input" />
          </label>
          <label className="ps-label">
            নতুন পাসওয়ার্ড
            <input required minLength={8} maxLength={128} type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className="ps-input" />
          </label>
          {message && <div className={ok ? "ps-msg-ok" : "ps-msg-err"}>{message}</div>}
          <button disabled={busy} className="ps-btn-primary ps-btn-block">
            {busy ? "পরিবর্তন হচ্ছে..." : "পাসওয়ার্ড পরিবর্তন করুন"}
          </button>
        </form>
      </div>
      <BottomNav active="account" />
    </main>
  );
}
