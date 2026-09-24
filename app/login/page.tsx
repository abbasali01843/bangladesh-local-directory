"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import TopBar from "@/components/TopBar";
import BottomNav from "@/components/BottomNav";

import Link from "next/link";
export default function Login() {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [ok, setOk] = useState(false);
  const [busy, setBusy] = useState(false);
  const router = useRouter();

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setMessage("");
    const r = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ identifier, password }),
    });
    const j = await r.json();
    if (r.ok) {
      setOk(true);
      setMessage("লগইন সফল!");
      router.push("/");
    } else {
      setOk(false);
      setMessage(j.message || "লগইন ব্যর্থ");
    }
    setBusy(false);
  }

  return (
    <main className="ps-page">
      <TopBar title="লগইন" subtitle="অ্যাকাউন্টে প্রবেশ" backHref="/" />

      <div className="ps-content">
        <form onSubmit={submit} className="ps-form">
          <label className="ps-label">
            ইমেইল বা মোবাইল
            <input
              required
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              placeholder="01XXXXXXXXX বা email"
              className="ps-input"
            />
          </label>
          <label className="ps-label">
            পাসওয়ার্ড
            <input
              required
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="ps-input"
            />
          </label>

          {message && (
            <div className={ok ? "ps-msg-ok" : "ps-msg-err"}>{message}</div>
          )}

          <button disabled={busy} className="ps-btn-primary ps-btn-block">
            {busy ? "অপেক্ষা করুন..." : "লগইন"}
          </button>

          <p className="ps-form-footer">
            অ্যাকাউন্ট নেই? <Link href="/register">রেজিস্টার করুন</Link>
          </p>
        </form>
      </div>

      <BottomNav active="account" />
    </main>
  );
}
