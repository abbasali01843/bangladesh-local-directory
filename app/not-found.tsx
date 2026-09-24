import Link from "next/link";
import TopBar from "@/components/TopBar";
import BottomNav from "@/components/BottomNav";

export default function NotFound() {
  return (
    <main className="ps-page">
      <TopBar title="পাওয়া যায়নি" subtitle="৪০৪" backHref="/" />
      <div className="ps-content">
        <div className="ps-empty">
          <div className="ps-empty-icon">🔍</div>
          <h2>এই ঠিকানায় কিছু নেই</h2>
          <p>লিংকটি ভুল হতে পারে, অথবা তথ্যটি সরিয়ে ফেলা হয়েছে।</p>
          <Link href="/" className="ps-btn-primary">
            হোমে ফিরুন
          </Link>
          <p style={{ marginTop: 12 }}>
            <Link href="/search">খুঁজুন →</Link>
          </p>
        </div>
      </div>
      <BottomNav />
    </main>
  );
}
