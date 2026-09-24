"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import TopBar from "@/components/TopBar";
import BottomNav from "@/components/BottomNav";

import Link from "next/link";
export default function Register() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [ok, setOk] = useState(false);
  const [busy, setBusy] = useState(false);
  const router = useRouter();

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setMessage("");
    const r = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, phone, email, password }),
    });
    const j = await r.json();
    if (r.ok) {
      setOk(true);
      setMessage("রেজিস্ট্রেশন সফল!");
      router.push("/");
    } else {
      setOk(false);
      setMessage(j.message || j.error || "রেজিস্ট্রেশন ব্যর্থ");
    }
    setBusy(false);
  }

  return (
    <main className="ps-page">
      <TopBar title="রেজিস্টার" subtitle="নতুন অ্যাকাউন্ট" backHref="/login" />

      <div className="ps-content">
        <form onSubmit={submit} className="ps-form">
          <label className="ps-label">
            নাম *
            <input required value={name} onChange={(e) => setName(e.target.value)} className="ps-input" placeholder="আপনার নাম" />
          </label>
          <label className="ps-label">
            মোবাইল
            <input value={phone} onChange={(e) => setPhone(e.target.value)} className="ps-input" placeholder="01XXXXXXXXX" type="tel" />
          </label>
          <label className="ps-label">
            ইমেইল
            <input value={email} onChange={(e) => setEmail(e.target.value)} className="ps-input" placeholder="email@example.com" type="email" />
          </label>
          <label className="ps-label">
            পাসওয়ার্ড * (কমপক্ষে ৮ অক্ষর)
            <input required type="password" minLength={8} value={password} onChange={(e) => setPassword(e.target.value)} className="ps-input" placeholder="••••••••" />
          </label>

          {message && <div className={ok ? "ps-msg-ok" : "ps-msg-err"}>{message}</div>}

          <button disabled={busy} className="ps-btn-primary ps-btn-block">
            {busy ? "অপেক্ষা করুন..." : "রেজিস্টার"}
          </button>

          <p className="ps-form-footer">
            ইতিমধ্যে অ্যাকাউন্ট আছে? <Link href="/login">লগইন করুন</Link>
          </p>
        </form>
      </div>

      <BottomNav active="account" />
    </main>
  );
}
