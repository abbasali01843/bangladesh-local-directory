"use client";

import { useEffect, useState } from "react";
import TopBar from "@/components/TopBar";
import BottomNav from "@/components/BottomNav";

type S = {
  id: string;
  name: string;
  status: string;
  verificationStatus: string;
  category?: { name: string };
  district?: { name: string };
  upazila?: { name: string };
};

export default function OwnerDashboard() {
  const [data, setData] = useState<S[]>([]);
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(true);
  const [needLogin, setNeedLogin] = useState(false);

  useEffect(() => {
    fetch("/api/owner/services")
      .then(async (r) => {
        const j = await r.json();
        if (r.ok) {
          setData(j.data || []);
          setMsg("");
        } else if (j.error === "UNAUTHORIZED") {
          setNeedLogin(true);
          setMsg("লগইন প্রয়োজন");
        } else {
          setMsg(j.message || "Database unavailable");
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
          <div className={needLogin ? "ps-msg-err" : "ps-msg-err"} style={{ marginBottom: 12 }}>
            {msg}
            {needLogin && (
              <div style={{ marginTop: 10 }}>
                <a href="/login" className="ps-btn-primary">
                  লগইন করুন
                </a>
              </div>
            )}
          </div>
        )}

        <div className="ps-section-head">
          <span className="ps-section-icon">🏪</span>
          <h2>আমার লিস্টিং</h2>
        </div>

        {loading ? (
          <div className="ps-empty">
            <p>লোড হচ্ছে...</p>
          </div>
        ) : data.length === 0 && !needLogin ? (
          <div className="ps-empty">
            <div className="ps-empty-icon">📋</div>
            <h2>এখনো কোনো তালিকা নেই</h2>
            <p>আপনার ব্যবসা বা সেবা যোগ করুন।</p>
            <a href="/add-listing" className="ps-btn-primary">
              + তথ্য যোগ করুন
            </a>
          </div>
        ) : (
          <div className="ps-list">
            {data.map((x) => (
              <a key={x.id} href={`/services/${x.id}`} className="ps-list-card">
                <div className="ps-list-top">
                  <strong>{x.name}</strong>
                  <span className="ps-badge">{x.status}</span>
                </div>
                <p className="ps-list-loc">
                  📍 {x.upazila?.name || "—"}, {x.district?.name || "—"}
                  {x.category?.name ? ` · ${x.category.name}` : ""}
                </p>
                <p className="ps-list-desc">
                  যাচাই: {x.verificationStatus}
                </p>
              </a>
            ))}
          </div>
        )}

        {!needLogin && (
          <a
            href="/add-listing"
            className="ps-btn-primary ps-btn-block"
            style={{ marginTop: 16 }}
          >
            + নতুন তথ্য যোগ করুন
          </a>
        )}
      </div>

      <BottomNav active="account" />
    </main>
  );
}
