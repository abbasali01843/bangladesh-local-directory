import { notices } from "@/data/notices";
import TopBar from "@/components/TopBar";
import BottomNav from "@/components/BottomNav";

export default function NoticesPage() {
  return (
    <main className="ps-page">
      <TopBar title="বিজ্ঞপ্তি" subtitle="ঘোষণা ও আপডেট" backHref="/" />
      <div className="ps-content">
        <div className="ps-detail ps-notice-hero">
          <div className="ps-detail-icon">🔔</div>
          <h1 className="ps-detail-title">সাতকানিয়া আপডেট</h1>
          <p className="ps-detail-desc">ডিরেক্টরির নতুন তথ্য, পরিবর্তন ও গুরুত্বপূর্ণ ঘোষণা এখানে পাবেন।</p>
        </div>
        <div className="ps-list">
          {notices.map((n) => (
            <article key={n.id} className="ps-list-card ps-notice-card">
              <div className="ps-notice-meta"><span>UPDATE</span><time>{n.date}</time></div>
              <h2 className="ps-notice-title">{n.title}</h2>
              <p className="ps-list-desc">{n.body}</p>
            </article>
          ))}
        </div>
      </div>
      <BottomNav active="home" />
    </main>
  );
}
