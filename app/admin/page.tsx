"use client";

import { useEffect, useState } from "react";
import TopBar from "@/components/TopBar";
import BottomNav from "@/components/BottomNav";

type Listing = {
  id: string;
  name: string;
  status: string;
  category?: { name: string };
  district?: { name: string };
  upazila?: { name: string };
};

export default function Admin() {
  const [items, setItems] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [ok, setOk] = useState(false);

  async function load() {
    setLoading(true);
    try {
      const r = await fetch("/api/admin/services?status=PENDING");
      const j = await r.json();
      if (r.ok) {
        setItems(j.data || []);
        setMessage("");
      } else {
        setOk(false);
        setMessage(j.message || j.error || "Admin data load হয়নি");
      }
    } catch {
      setOk(false);
      setMessage("সার্ভারে সংযোগ করা যাচ্ছে না");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function act(id: string, action: "approve" | "reject") {
    const r = await fetch("/api/admin/services/" + id + "/" + action, {
      method: "POST",
    });
    const j = await r.json();
    if (r.ok) {
      setItems((x) => x.filter((i) => i.id !== id));
      setOk(true);
      setMessage(action === "approve" ? "লিস্টিং অনুমোদিত হয়েছে" : "লিস্টিং বাতিল হয়েছে");
    } else {
      setOk(false);
      setMessage(j.message || j.error || "কাজটি সম্পন্ন হয়নি");
    }
  }

  return (
    <main className="ps-page">
      <TopBar title="অ্যাডমিন" subtitle="মডারেশন প্যানেল" backHref="/" />

      <div className="ps-content">
        {message && (
          <div className={ok ? "ps-msg-ok" : "ps-msg-err"} style={{ marginBottom: 12 }}>
            {message}
          </div>
        )}

        <div className="ps-section-head">
          <span className="ps-section-icon">🛡️</span>
          <h2>পেন্ডিং সাবমিশন</h2>
        </div>

        {loading ? (
          <div className="ps-empty">
            <p>লোড হচ্ছে...</p>
          </div>
        ) : items.length === 0 ? (
          <div className="ps-empty">
            <div className="ps-empty-icon">✅</div>
            <h2>কোনো পেন্ডিং নেই</h2>
            <p>নতুন সাবমিশন এলে এখানে দেখাবে।</p>
            <button type="button" className="ps-btn-primary" onClick={load}>
              রিফ্রেশ
            </button>
          </div>
        ) : (
          <div className="ps-list">
            {items.map((x) => (
              <div key={x.id} className="ps-list-card">
                <div className="ps-list-top">
                  <strong>{x.name}</strong>
                  <span className="ps-badge">PENDING</span>
                </div>
                <p className="ps-list-loc">
                  📍 {x.upazila?.name || "—"}, {x.district?.name || "—"}
                  {x.category?.name ? ` · ${x.category.name}` : ""}
                </p>
                <p className="ps-list-desc" style={{ fontSize: 11, color: "#9ca3af" }}>
                  #{x.id.slice(0, 8)}
                </p>
                <div className="ps-admin-actions">
                  <button
                    type="button"
                    className="ps-btn-primary"
                    onClick={() => act(x.id, "approve")}
                  >
                    অনুমোদন
                  </button>
                  <button
                    type="button"
                    className="ps-btn-ghost"
                    onClick={() => act(x.id, "reject")}
                  >
                    বাতিল
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <BottomNav active="account" />
    </main>
  );
}
