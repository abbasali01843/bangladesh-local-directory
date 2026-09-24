"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import TopBar from "@/components/TopBar";
import BottomNav from "@/components/BottomNav";

import Link from "next/link";
type Me = { id: string; name: string; role: string } | null;

export default function ProfilePage() {
  const [me, setMe] = useState<Me>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetch("/api/auth/me")
      .then(async (r) => {
        if (!r.ok) return setMe(null);
        const j = await r.json();
        setMe(j.data || j.user || null);
      })
      .catch(() => setMe(null))
      .finally(() => setLoading(false));
  }, []);

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    setMe(null);
    router.push("/");
  }

  return (
    <main className="ps-page">
      <TopBar title="প্রোফাইল" subtitle="আমার অ্যাকাউন্ট" backHref="/" />
      <div className="ps-content">
        {loading ? (
          <div className="ps-empty"><p>লোড হচ্ছে...</p></div>
        ) : me ? (
          <div className="ps-form">
            <div className="ps-detail-icon" style={{ textAlign: "center" }}>👤</div>
            <h2 style={{ textAlign: "center", margin: 0 }}>{me.name}</h2>
            <p style={{ textAlign: "center", color: "#6b7280", margin: "4px 0 16px" }}>
              রোল: {me.role}
            </p>
            <Link href="/owner" className="ps-btn-primary ps-btn-block">ওনার ড্যাশবোর্ড</Link>
            <Link href="/add-listing" className="ps-btn-primary ps-btn-block" style={{ marginTop: 8 }}>
              + তথ্য যোগ
            </Link>
            {me.role === "ADMIN" && (
              <Link href="/admin" className="ps-btn-primary ps-btn-block" style={{ marginTop: 8 }}>
                অ্যাডমিন প্যানেল
              </Link>
            )}
            <button type="button" className="ps-btn-ghost ps-btn-block" style={{ marginTop: 12 }} onClick={logout}>
              লগআউট
            </button>
          </div>
        ) : (
          <div className="ps-empty">
            <div className="ps-empty-icon">👤</div>
            <h2>লগইন করুন</h2>
            <p>প্রোফাইল ও লিস্টিং ম্যানেজ করতে অ্যাকাউন্ট প্রয়োজন।</p>
            <Link href="/login" className="ps-btn-primary">লগইন</Link>
            <p className="ps-form-footer" style={{ marginTop: 12 }}>
              নতুন? <Link href="/register">রেজিস্টার</Link>
            </p>
          </div>
        )}
      </div>
      <BottomNav active="account" />
    </main>
  );
}
