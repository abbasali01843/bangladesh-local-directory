"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import TopBar from "@/components/TopBar";
import BottomNav from "@/components/BottomNav";

type Payment = {
  id: string;
  transactionId: string;
  amount: string | number;
  currency: string;
  plan: string;
  status: string;
  createdAt: string;
  paidAt?: string | null;
  user: { name: string; phone?: string | null; email?: string | null };
  service: { id: string; name: string };
  promotion?: { status: string; endsAt: string } | null;
};

const statusBn: Record<string, string> = {
  PENDING: "অপেক্ষমাণ",
  PAID: "পরিশোধিত",
  FAILED: "ব্যর্থ",
  CANCELLED: "বাতিল",
  REVIEW: "ম্যানুয়াল যাচাই প্রয়োজন",
};

export default function AdminPaymentsPage() {
  const [items, setItems] = useState<Payment[]>([]);
  const [message, setMessage] = useState("লোড হচ্ছে...");
  useEffect(() => {
    fetch("/api/admin/payments")
      .then(async (response) => {
        const data = await response.json();
        if (!response.ok) throw new Error(data.error || "পেমেন্ট লোড হয়নি");
        setItems(data.data || []);
        setMessage("");
      })
      .catch((error) => setMessage(error instanceof Error ? error.message : "সার্ভারে সমস্যা"));
  }, []);

  return (
    <main className="ps-page">
      <TopBar title="পেমেন্ট" subtitle="বিজ্ঞাপন অর্ডার ও যাচাই" backHref="/admin" />
      <div className="ps-content">
        <Link href="/admin" className="ps-btn-ghost" style={{ display: "inline-flex", marginBottom: 12 }}>← অ্যাডমিন প্যানেল</Link>
        {message ? <div className="ps-empty"><p>{message}</p></div> : items.length === 0 ? (
          <div className="ps-empty"><p>এখনো কোনো পেমেন্ট অর্ডার নেই।</p></div>
        ) : (
          <div className="ps-list">
            {items.map((item) => (
              <section className="ps-list-card" key={item.id}>
                <div className="ps-list-top">
                  <strong>{item.service.name}</strong>
                  <span className="ps-badge">{statusBn[item.status] || item.status}</span>
                </div>
                <p className="ps-list-loc">👤 {item.user.name} {item.user.phone ? `· ${item.user.phone}` : ""}</p>
                <p className="ps-list-desc">প্যাকেজ: {item.plan} · ৳{Number(item.amount).toLocaleString("bn-BD")} {item.currency}</p>
                <p className="ps-list-desc">ট্রানজ্যাকশন: {item.transactionId}</p>
                <p className="ps-list-desc">অর্ডার: {new Date(item.createdAt).toLocaleString("bn-BD")}</p>
                {item.promotion && <p className="ps-list-desc">প্রচার শেষ: {new Date(item.promotion.endsAt).toLocaleDateString("bn-BD")}</p>}
              </section>
            ))}
          </div>
        )}
      </div>
      <BottomNav active="account" />
    </main>
  );
}
