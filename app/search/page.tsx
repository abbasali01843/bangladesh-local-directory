"use client";

import { Suspense, useCallback, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import TopBar from "@/components/TopBar";
import BottomNav from "@/components/BottomNav";

import Link from "next/link";
type S = {
  id: string;
  name: string;
  description?: string;
  category?: { name: string };
  district?: { name: string };
  upazila?: { name: string };
  union?: { name: string };
  area?: { name: string };
  verificationStatus: string;
};
type L = { id: string; name: string; upazilas?: { id: string; name: string }[] };

function SearchInner() {
  const params = useSearchParams();
  const [loc, setLoc] = useState<L[]>([]);
  const [district, setDistrict] = useState(params.get("districtId") || "");
  const [upazila, setUpazila] = useState(params.get("upazilaId") || "");
  const [q, setQ] = useState(params.get("q") || "");
  const [items, setItems] = useState<S[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  useEffect(() => {
    fetch("/api/locations")
      .then((r) => r.json())
      .then((j) => setLoc(j.data || []))
      .catch(() => setLoc([]));
  }, []);

  const d = loc.find((x) => x.id === district);

  const search = useCallback(
    async (e?: React.FormEvent, override?: { q?: string; district?: string; upazila?: string }) => {
      e?.preventDefault();
      setLoading(true);
      const qq = override?.q ?? q;
      const dd = override?.district ?? district;
      const uu = override?.upazila ?? upazila;
      const p = new URLSearchParams();
      if (qq) p.set("q", qq);
      if (dd) p.set("districtId", dd);
      if (uu) p.set("upazilaId", uu);
      try {
        const r = await fetch("/api/directory/search?" + p);
        const j = await r.json();
        setItems(r.ok ? j.data || [] : []);
      } catch {
        setItems([]);
      }
      setLoading(false);
      setSearched(true);
    },
    [q, district, upazila]
  );

  // হোম/ক্যাটাগরি থেকে ?q= নিয়ে এলে অটো-সার্চ (মাউন্টে একবার)
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    search(undefined, {
      q: params.get("q") || "",
      district: params.get("districtId") || "",
      upazila: params.get("upazilaId") || "",
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main className="ps-page">
      <TopBar title="খুঁজুন" subtitle="স্থানীয় তথ্য" backHref="/" />

      <div className="ps-content">
        <form onSubmit={search} className="ps-search">
          <span className="ps-search-icon">🔍</span>
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="ব্যবসা, ডাক্তার, স্কুল, সেবা, ফোন..."
            aria-label="Search"
          />
        </form>

        <div className="ps-filters">
          <select
            value={district}
            onChange={(e) => {
              setDistrict(e.target.value);
              setUpazila("");
            }}
            className="ps-select"
          >
            <option value="">সব জেলা</option>
            {loc.map((x) => (
              <option key={x.id} value={x.id}>
                {x.name}
              </option>
            ))}
          </select>
          <select
            value={upazila}
            disabled={!district}
            onChange={(e) => setUpazila(e.target.value)}
            className="ps-select"
          >
            <option value="">সব উপজেলা</option>
            {d?.upazilas?.map((x) => (
              <option key={x.id} value={x.id}>
                {x.name}
              </option>
            ))}
          </select>
        </div>

        <button type="button" onClick={() => search()} className="ps-btn-primary ps-btn-block" style={{ marginBottom: 16 }}>
          {loading ? "খুঁজছে..." : "খুঁজুন"}
        </button>

        <div className="ps-section-head">
          <h2>{loading ? "খুঁজছে..." : `${items.length}টি ফলাফল`}</h2>
        </div>

        {items.length === 0 && !loading && searched ? (
          <div className="ps-empty">
            <div className="ps-empty-icon">🔍</div>
            <h2>কোনো ফলাফল নেই</h2>
            <p>অন্য কীওয়ার্ড বা লোকেশন দিয়ে চেষ্টা করুন।</p>
          </div>
        ) : (
          <div className="ps-list">
            {items.map((s) => (
              <Link key={s.id} href={`/services/${s.id}`} className="ps-list-card">
                <div className="ps-list-top">
                  <strong>{s.name}</strong>
                  {s.verificationStatus !== "UNVERIFIED" && (
                    <span className="ps-badge">✓ Verified</span>
                  )}
                </div>
                <p className="ps-list-loc">
                  📍 {[s.area?.name, s.union?.name, s.upazila?.name, s.district?.name].filter(Boolean).join(", ")}
                  {s.category?.name ? ` · ${s.category.name}` : ""}
                </p>
                {s.description && <p className="ps-list-desc">{s.description}</p>}
              </Link>
            ))}
          </div>
        )}
      </div>

      <BottomNav active="search" />
    </main>
  );
}

export default function Search() {
  return (
    <Suspense>
      <SearchInner />
    </Suspense>
  );
}
