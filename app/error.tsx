"use client";

import Link from "next/link";
import TopBar from "@/components/TopBar";
import BottomNav from "@/components/BottomNav";

export default function ErrorPage({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="ps-page">
      <TopBar title="সমস্যা হয়েছে" subtitle="দুঃখিত" backHref="/" />
      <div className="ps-content">
        <div className="ps-empty">
          <div className="ps-empty-icon">⚠️</div>
          <h2>কিছু একটা গোলমাল হয়েছে</h2>
          <p>পেজটি লোড করা যায়নি। আবার চেষ্টা করুন।</p>
          <button type="button" className="ps-btn-primary" onClick={() => reset()}>
            আবার চেষ্টা করুন
          </button>
          <p style={{ marginTop: 12 }}>
            <Link href="/">← হোমে ফিরুন</Link>
          </p>
        </div>
      </div>
      <BottomNav />
    </main>
  );
}
