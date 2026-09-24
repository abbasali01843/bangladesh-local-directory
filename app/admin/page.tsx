"use client";

import { useEffect, useState } from "react";
import TopBar from "@/components/TopBar";
import BottomNav from "@/components/BottomNav";

type Listing = {
  id: string;
  name: string;
  status: string;
  description?: string;
  phone?: string;
  category?: { name: string };
  district?: { name: string };
  upazila?: { name: string };
};

type Claim = {
  id: string;
  status: string;
  createdAt: string;
  service?: { id: string; name: string };
  user?: { id: string; name: string; phone?: string; email?: string };
};

type AdminUser = {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  role: string;
  createdAt: string;
};

type Review = {
  id: string;
  rating: number;
  body?: string;
  service?: { id: string; name: string };
  user?: { name: string };
};

type Tab = "listings" | "claims" | "reviews" | "users";

export default function Admin() {
  const [tab, setTab] = useState<Tab>("listings");
  const [items, setItems] = useState<Listing[]>([]);
  const [claims, setClaims] = useState<Claim[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [ok, setOk] = useState(false);

  async function load(nextTab: Tab = tab) {
    setLoading(true);
    try {
      if (nextTab === "listings") {
        const r = await fetch("/api/admin/services?status=PENDING");
        const j = await r.json();
        if (r.ok) {
          setItems(j.data || []);
          setMessage("");
        } else {
          setOk(false);
          setMessage(j.message || j.error || "Admin data load হয়নি");
        }
      } else if (nextTab === "claims") {
        const r = await fetch("/api/admin/claims");
        const j = await r.json();
        if (r.ok) {
          setClaims(j.data || []);
          setMessage("");
        } else {
          setOk(false);
          setMessage(j.message || j.error || "Claims load হয়নি");
        }
      } else if (nextTab === "reviews") {
        const r = await fetch("/api/admin/reviews");
        const j = await r.json();
        if (r.ok) {
          setReviews(j.data || []);
          setMessage("");
        } else {
          setOk(false);
          setMessage(j.message || j.error || "Reviews load হয়নি");
        }
      } else {
        const r = await fetch("/api/admin/users");
        const j = await r.json();
        if (r.ok) {
          setUsers(j.data || []);
          setMessage("");
        } else {
          setOk(false);
          setMessage(j.message || j.error || "Users load হয়নি");
        }
      }
    } catch {
      setOk(false);
      setMessage("সার্ভারে সংযোগ করা যাচ্ছে না");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    // মাউন্টে একবার ডেটা লোড — ইভেন্ট/সাসপেন্সে সরানোর মতো নয়
    // eslint-disable-next-line react-hooks/set-state-in-effect
    load("listings");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function switchTab(next: Tab) {
    setTab(next);
    setMessage("");
    load(next);
  }

  async function act(id: string, action: "approve" | "reject") {
    const r = await fetch("/api/admin/services/" + id + "/" + action, {
      method: "POST",
    });
    const j = await r.json();
    if (r.ok) {
      setItems((x) => x.filter((i) => i.id !== id));
      setOk(true);
      setMessage(action === "approve" ? "লিস্টিং অনুমোদিত হয়েছে" : "লিস্টিং বাতিল হয়েছে");
    } else {
      setOk(false);
      setMessage(j.message || j.error || "কাজটি সম্পন্ন হয়নি");
    }
  }

  async function reviewClaim(id: string, action: "approve" | "reject") {
    const r = await fetch("/api/admin/claims/" + id, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action }),
    });
    const j = await r.json();
    if (r.ok) {
      setClaims((x) => x.filter((c) => c.id !== id));
      setOk(true);
      setMessage(action === "approve" ? "মালিকানা দাবি অনুমোদিত হয়েছে" : "মালিকানা দাবি বাতিল হয়েছে");
    } else {
      setOk(false);
      setMessage(j.message || j.error || "কাজটি সম্পন্ন হয়নি");
    }
  }

  async function reviewReview(id: string, action: "approve" | "reject") {
    const r = await fetch("/api/admin/reviews/" + id, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action }),
    });
    const j = await r.json();
    if (r.ok) {
      setReviews((x) => x.filter((c) => c.id !== id));
      setOk(true);
      setMessage(action === "approve" ? "রিভিউ প্রকাশিত হয়েছে" : "রিভিউ বাতিল হয়েছে");
    } else {
      setOk(false);
      setMessage(j.message || j.error || "কাজটি সম্পন্ন হয়নি");
    }
  }

  async function changeRole(id: string, role: string) {
    const r = await fetch("/api/admin/users/" + id, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ role }),
    });
    const j = await r.json();
    if (r.ok) {
      setUsers((x) => x.map((u) => (u.id === id ? { ...u, role } : u)));
      setOk(true);
      setMessage("রোল আপডেট হয়েছে");
    } else {
      setOk(false);
      setMessage(j.message || j.error || "রোল বদলানো যায়নি");
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

        <div className="ps-tabs" role="tablist">
          <button
            type="button"
            role="tab"
            aria-selected={tab === "listings"}
            className={tab === "listings" ? "ps-tab active" : "ps-tab"}
            onClick={() => switchTab("listings")}
          >
            📋 তালিকা ({items.length})
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={tab === "claims"}
            className={tab === "claims" ? "ps-tab active" : "ps-tab"}
            onClick={() => switchTab("claims")}
          >
            🏪 দাবি ({claims.length})
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={tab === "reviews"}
            className={tab === "reviews" ? "ps-tab active" : "ps-tab"}
            onClick={() => switchTab("reviews")}
          >
            ⭐ রিভিউ ({reviews.length})
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={tab === "users"}
            className={tab === "users" ? "ps-tab active" : "ps-tab"}
            onClick={() => switchTab("users")}
          >
            👥 ইউজার
          </button>
        </div>

        {loading ? (
          <div className="ps-empty">
            <p>লোড হচ্ছে...</p>
          </div>
        ) : tab === "listings" ? (
          items.length === 0 ? (
            <div className="ps-empty">
              <div className="ps-empty-icon">✅</div>
              <h2>কোনো পেন্ডিং নেই</h2>
              <p>নতুন সাবমিশন এলে এখানে দেখাবে।</p>
              <button type="button" className="ps-btn-primary" onClick={() => load()}>
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
                  {x.phone && <p className="ps-list-phone">📞 {x.phone}</p>}
                  {x.description && <p className="ps-list-desc">{x.description}</p>}
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
          )
        ) : tab === "claims" ? (
          claims.length === 0 ? (
            <div className="ps-empty">
              <div className="ps-empty-icon">✅</div>
              <h2>কোনো পেন্ডিং দাবি নেই</h2>
              <p>মালিকানার দাবি এলে এখানে দেখাবে।</p>
              <button type="button" className="ps-btn-primary" onClick={() => load()}>
                রিফ্রেশ
              </button>
            </div>
          ) : (
            <div className="ps-list">
              {claims.map((c) => (
                <div key={c.id} className="ps-list-card">
                  <div className="ps-list-top">
                    <strong>{c.service?.name || c.service?.id}</strong>
                    <span className="ps-badge">CLAIM</span>
                  </div>
                  <p className="ps-list-loc">
                    👤 {c.user?.name || "—"}
                    {c.user?.phone ? ` · 📞 ${c.user.phone}` : ""}
                  </p>
                  <div className="ps-admin-actions">
                    <button
                      type="button"
                      className="ps-btn-primary"
                      onClick={() => reviewClaim(c.id, "approve")}
                    >
                      অনুমোদন
                    </button>
                    <button
                      type="button"
                      className="ps-btn-ghost"
                      onClick={() => reviewClaim(c.id, "reject")}
                    >
                      বাতিল
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )
        ) : tab === "reviews" ? (
          reviews.length === 0 ? (
            <div className="ps-empty">
              <div className="ps-empty-icon">✅</div>
              <h2>কোনো পেন্ডিং রিভিউ নেই</h2>
              <p>নতুন রিভিউ এলে এখানে দেখাবে।</p>
              <button type="button" className="ps-btn-primary" onClick={() => load()}>
                রিফ্রেশ
              </button>
            </div>
          ) : (
            <div className="ps-list">
              {reviews.map((r) => (
                <div key={r.id} className="ps-list-card">
                  <div className="ps-list-top">
                    <strong>{r.service?.name || "—"}</strong>
                    <span className="ps-badge">{"★".repeat(r.rating)}</span>
                  </div>
                  <p className="ps-list-loc">👤 {r.user?.name || "—"}</p>
                  {r.body && <p className="ps-list-desc">{r.body}</p>}
                  <div className="ps-admin-actions">
                    <button
                      type="button"
                      className="ps-btn-primary"
                      onClick={() => reviewReview(r.id, "approve")}
                    >
                      প্রকাশ
                    </button>
                    <button
                      type="button"
                      className="ps-btn-ghost"
                      onClick={() => reviewReview(r.id, "reject")}
                    >
                      বাতিল
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )
        ) : users.length === 0 ? (
          <div className="ps-empty">
            <div className="ps-empty-icon">👥</div>
            <h2>কোনো ইউজার নেই</h2>
            <button type="button" className="ps-btn-primary" onClick={() => load()}>
              রিফ্রেশ
            </button>
          </div>
        ) : (
          <div className="ps-list">
            {users.map((u) => (
              <div key={u.id} className="ps-list-card">
                <div className="ps-list-top">
                  <strong>{u.name}</strong>
                  <span className="ps-badge">{u.role}</span>
                </div>
                <p className="ps-list-loc">
                  {[u.phone, u.email].filter(Boolean).join(" · ") || "যোগাযোগ নেই"}
                </p>
                <div className="ps-admin-actions">
                  <select
                    className="ps-select"
                    value={u.role}
                    onChange={(e) => changeRole(u.id, e.target.value)}
                    aria-label={`${u.name}-এর রোল`}
                  >
                    <option value="USER">USER</option>
                    <option value="BUSINESS_OWNER">BUSINESS_OWNER</option>
                    <option value="ADMIN">ADMIN</option>
                  </select>
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
