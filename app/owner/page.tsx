"use client";

import { useEffect, useState } from "react";
import TopBar from "@/components/TopBar";
import BottomNav from "@/components/BottomNav";

import Link from "next/link";
type S = {
  id: string;
  name: string;
  status: string;
  verificationStatus: string;
  category?: { name: string };
  district?: { name: string };
  upazila?: { name: string };
};

type C = {
  id: string;
  status: string;
  service?: { id: string; name: string };
};

const statusBn: Record<string, string> = {
  PENDING: "⏳ রিভিউতে",
  APPROVED: "✅ প্রকাশিত",
  REJECTED: "❌ বাতিল",
  SUSPENDED: "⛔ স্থগিত",
};


function PromotionActions({ serviceId, activePlan }: { serviceId: string; activePlan?: string }) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  async function checkout(plan: "BASIC" | "FEATURED" | "PREMIUM") {
    setBusy(true);
    setError("");
    try {
      const response = await fetch("/api/payments/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ serviceId, plan }),
      });
      const data = await response.json();
      if (!response.ok || !data.checkoutUrl) {
        setError(data.error === "PROFILE_CONTACT_REQUIRED" ? "প্রোফাইলে ইমেইল ও ফোন যোগ করুন" : "চেকআউট শুরু করা যায়নি");
        return;
      }
      window.location.assign(data.checkoutUrl);
    } catch {
      setError("সার্ভারে সংযোগ করা যাচ্ছে না");
    } finally {
      setBusy(false);
    }
  }
  return (
    <div className="ps-list-card" style={{ marginTop: 6 }}>
      <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 8 }}>
        {activePlan ? `চলমান প্রচার: ${activePlan}` : "ব্যবসার প্রচার প্যাকেজ"}
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
        <button type="button" className="ps-btn-ghost" disabled={busy} onClick={() => checkout("BASIC")}>বেসিক ৳২৯৯</button>
        <button type="button" className="ps-btn-ghost" disabled={busy} onClick={() => checkout("FEATURED")}>ফিচার্ড ৳৭৯৯</button>
        <button type="button" className="ps-btn-primary" disabled={busy} onClick={() => checkout("PREMIUM")}>প্রিমিয়াম ৳১,৪৯৯</button>
      </div>
      {busy && <p className="ps-list-desc">চেকআউট তৈরি হচ্ছে...</p>}
      {error && <p className="ps-msg-err" style={{ marginTop: 8 }}>{error}</p>}
    </div>
  );
}

function ListingCard({ x }: { x: S }) {
  const approved = x.status === "APPROVED";
  const inner = (
    <>
      <div className="ps-list-top">
        <strong>{x.name}</strong>
        <span className="ps-badge">{statusBn[x.status] || x.status}</span>
      </div>
      <p className="ps-list-loc">
        📍 {x.upazila?.name || "—"}, {x.district?.name || "—"}
        {x.category?.name ? ` · ${x.category.name}` : ""}
      </p>
    </>
  );
  return approved ? (
    <div>
      <Link href={`/services/${x.id}`} className="ps-list-card">
        {inner}
      </Link>
      <PromotionActions serviceId={x.id} activePlan={x.promotions?.[0]?.plan} />
    </div>
  ) : (
    <div className="ps-list-card">{inner}</div>
  );
}

export default function OwnerDashboard() {
  const [mine, setMine] = useState<S[]>([]);
  const [claimed, setClaimed] = useState<S[]>([]);
  const [claims, setClaims] = useState<C[]>([]);
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(true);
  const [needLogin, setNeedLogin] = useState(false);

  useEffect(() => {
    fetch("/api/owner/services")
      .then(async (r) => {
        const j = await r.json();
        if (r.ok) {
          setMine(j.data?.mine || []);
          setClaimed(j.data?.claimed || []);
          setClaims(j.data?.claims || []);
          setMsg("");
        } else if (j.error === "UNAUTHORIZED") {
          setNeedLogin(true);
          setMsg("লগইন প্রয়োজন");
        } else {
          setMsg(j.message || "ডাটাবেস এখনো সেট হয়নি");
        }
      })
      .catch(() => setMsg("সার্ভারে সংযোগ করা যাচ্ছে না"))
      .finally(() => setLoading(false));
  }, []);

  return (
    <main className="ps-page">
      <TopBar title="ওনার ড্যাশবোর্ড" subtitle="আমার তালিকা" backHref="/" />

      <div className="ps-content">
        {msg && (
          <div className="ps-msg-err" style={{ marginBottom: 12 }}>
            {msg}
            {needLogin && (
              <div style={{ marginTop: 10 }}>
                <Link href="/login" className="ps-btn-primary">
                  লগইন করুন
                </Link>
              </div>
            )}
          </div>
        )}

        {loading ? (
          <div className="ps-empty">
            <p>লোড হচ্ছে...</p>
          </div>
        ) : (
          <>
            <div className="ps-section-head">
              <span className="ps-section-icon">📤</span>
              <h2>আমার জমা ({mine.length})</h2>
            </div>
            {mine.length === 0 ? (
              <div className="ps-list-card" style={{ marginBottom: 14 }}>
                <p className="ps-list-desc">এখনো কিছু জমা দেননি। নিচের বাটনে তথ্য যোগ করুন।</p>
              </div>
            ) : (
              <div className="ps-list" style={{ marginBottom: 14 }}>
                {mine.map((x) => (
                  <ListingCard key={x.id} x={x} />
                ))}
              </div>
            )}

            <div className="ps-section-head">
              <span className="ps-section-icon">🏪</span>
              <h2>আমার মালিকানাধীন ({claimed.length})</h2>
            </div>
            {claimed.length === 0 ? (
              <div className="ps-list-card" style={{ marginBottom: 14 }}>
                <p className="ps-list-desc">
                  কোনো তালিকার মালিকানা নেননি। তালিকার পেজ থেকে “দাবি করুন” চাপুন।
                </p>
              </div>
            ) : (
              <div className="ps-list" style={{ marginBottom: 14 }}>
                {claimed.map((x) => (
                  <ListingCard key={x.id} x={x} />
                ))}
              </div>
            )}

            {claims.length > 0 && (
              <>
                <div className="ps-section-head">
                  <span className="ps-section-icon">📝</span>
                  <h2>আমার দাবি ({claims.length})</h2>
                </div>
                <div className="ps-list" style={{ marginBottom: 14 }}>
                  {claims.map((c) => (
                    <div key={c.id} className="ps-list-card">
                      <div className="ps-list-top">
                        <strong>{c.service?.name || "—"}</strong>
                        <span className="ps-badge">{statusBn[c.status] || c.status}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </>
        )}

        {!needLogin && (
          <Link
            href="/add-listing"
            className="ps-btn-primary ps-btn-block"
            style={{ marginTop: 16 }}
          >
            + নতুন তথ্য যোগ করুন
          </Link>
        )}
      </div>

      <BottomNav active="account" />
    </main>
  );
}
