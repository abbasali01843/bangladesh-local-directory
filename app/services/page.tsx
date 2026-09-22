"use client";

import { useEffect, useState } from "react";
import { services } from "@/data/services";
import { categories } from "@/data/categories";
import TopBar from "@/components/TopBar";
import BottomNav from "@/components/BottomNav";

type LocalListing = {
  id: string; name: string; category?: string; district?: string; upazila?: string;
  union?: string; area?: string; phone?: string; description?: string;
};

export default function ServicesPage() {
  const [categoryId, setCategoryId] = useState("");
  const [local, setLocal] = useState<LocalListing[]>([]);

  useEffect(() => {
    const p = new URLSearchParams(window.location.search);
    setCategoryId(p.get("category") || "");
    try { setLocal(JSON.parse(localStorage.getItem("bdld_listings") || "[]")); }
    catch { setLocal([]); }
  }, []);

  const category = categoryId ? categories.find((c) => c.id === categoryId) : null;
  const bundled = categoryId ? services.filter((s) => s.category === categoryId) : services;
  const added = categoryId ? local.filter((s) => s.category === categoryId) : local;
  const list = [...added, ...bundled];

  return (
    <main className="ps-page">
      <TopBar title={category ? category.name : "সকল সেবা"} subtitle={`${list.length} টি তথ্য`} backHref="/categories" />
      <div className="ps-content">
        {list.length === 0 ? (
          <div className="ps-empty">
            <div className="ps-empty-icon">{category?.icon || "📋"}</div>
            <h2>এখনো কোনো তথ্য নেই</h2>
            <p>এই ক্যাটাগরিতে এখনো তালিকা যোগ হয়নি। আপনি প্রথম যোগ করতে পারেন।</p>
            <a href="/add-listing" className="ps-btn-primary">+ তথ্য যোগ করুন</a>
          </div>
        ) : (
          <div className="ps-list">
            {added.map((s) => (
              <a key={s.id} href={"/services/" + s.id} className="ps-list-card">
                <div className="ps-list-top"><strong>{s.name}</strong><span className="ps-badge">অফলাইন</span></div>
                <p className="ps-list-loc">📍 {[s.area,s.union,s.upazila,s.district].filter(Boolean).join(", ")}</p>
                {s.description && <p className="ps-list-desc">{s.description}</p>}
                {s.phone && <p className="ps-list-phone">📞 {s.phone}</p>}
              </a>
            ))}
            {bundled.map((s) => (
              <a key={s.id} href={"/services/" + s.id} className="ps-list-card">
                <div className="ps-list-top"><strong>{s.name}</strong>{s.verified && <span className="ps-badge">✓ Verified</span>}</div>
                <p className="ps-list-loc">📍 {s.upazila}, {s.district}{s.area ? " · " + s.area : ""}</p>
                {s.description && <p className="ps-list-desc">{s.description}</p>}
                {s.phone && <p className="ps-list-phone">📞 {s.phone}</p>}
              </a>
            ))}
          </div>
        )}
      </div>
      <BottomNav active="categories" />
    </main>
  );
}
