"use client";

import { useEffect, useState } from "react";
import type { ListingView } from "@/lib/listings";

import Link from "next/link";
type Review = ListingView["reviews"][number];

function Stars({ n, size = 16 }: { n: number; size?: number }) {
  return (
    <span aria-label={`${n} স্টার`} style={{ fontSize: size, letterSpacing: 1 }}>
      {[1, 2, 3, 4, 5].map((i) => (
        <span key={i} style={{ color: i <= Math.round(n) ? "#f59e0b" : "#d1d5db" }}>
          ★
        </span>
      ))}
    </span>
  );
}

export default function ReviewSection({
  serviceId,
  initial,
}: {
  serviceId: string;
  initial: ListingView["reviews"];
}) {
  const [reviews] = useState<Review[]>(initial);
  const [loggedIn, setLoggedIn] = useState<boolean | null>(null);
  const [rating, setRating] = useState(5);
  const [body, setBody] = useState("");
  const [msg, setMsg] = useState("");
  const [ok, setOk] = useState(false);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    fetch("/api/auth/me")
      .then((r) => r.json())
      .then((j) => setLoggedIn(!!j.data))
      .catch(() => setLoggedIn(false));
  }, []);

  const avg = reviews.length
    ? Math.round((reviews.reduce((a, r) => a + r.rating, 0) / reviews.length) * 10) / 10
    : 0;

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setMsg("");
    try {
      const r = await fetch(`/api/services/${serviceId}/reviews`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rating, body }),
      });
      const j = await r.json();
      if (r.ok) {
        setOk(true);
        setMsg(j.message || "রিভিউ জমা হয়েছে।");
        setBody("");
      } else {
        setOk(false);
        setMsg(
          j.error === "UNAUTHORIZED"
            ? "রিভিউ দিতে লগইন করুন।"
            : j.message || "রিভিউ জমা দেওয়া যায়নি।"
        );
      }
    } catch {
      setOk(false);
      setMsg("সার্ভারে সংযোগ করা যাচ্ছে না।");
    }
    setBusy(false);
  }

  return (
    <div style={{ marginTop: 16 }}>
      <div className="ps-section-head">
        <span className="ps-section-icon">⭐</span>
        <h2>
          রিভিউ {reviews.length > 0 && `(${reviews.length}টি · গড় ${avg})`}
        </h2>
      </div>

      {reviews.length === 0 ? (
        <div className="ps-list-card">
          <p className="ps-list-desc">এখনো কোনো রিভিউ নেই — প্রথম রিভিউ আপনিই দিন।</p>
        </div>
      ) : (
        <div className="ps-list" style={{ marginBottom: 12 }}>
          {reviews.map((r) => (
            <div key={r.id} className="ps-list-card">
              <div className="ps-list-top">
                <strong>{r.userName}</strong>
                <Stars n={r.rating} />
              </div>
              {r.body && <p className="ps-list-desc">{r.body}</p>}
            </div>
          ))}
        </div>
      )}

      {loggedIn === null ? null : loggedIn ? (
        <form onSubmit={submit} className="ps-form">
          <label className="ps-label">
            আপনার রেটিং
            <select
              className="ps-input"
              value={rating}
              onChange={(e) => setRating(Number(e.target.value))}
            >
              {[5, 4, 3, 2, 1].map((n) => (
                <option key={n} value={n}>
                  {"★".repeat(n)} ({n})
                </option>
              ))}
            </select>
          </label>
          <label className="ps-label">
            মতামত (ঐচ্ছিক)
            <textarea
              className="ps-input"
              rows={3}
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder="সেবা কেমন লাগলো?"
              maxLength={500}
            />
          </label>
          {msg && <div className={ok ? "ps-msg-ok" : "ps-msg-err"}>{msg}</div>}
          <button disabled={busy} className="ps-btn-primary ps-btn-block">
            {busy ? "জমা হচ্ছে..." : "রিভিউ জমা দিন"}
          </button>
        </form>
      ) : (
        <div className="ps-list-card">
          <p className="ps-list-desc">
            রিভিউ দিতে <Link href="/login">লগইন করুন</Link>।
          </p>
        </div>
      )}
    </div>
  );
}
