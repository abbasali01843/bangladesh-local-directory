import { notices } from "@/data/notices";
import TopBar from "@/components/TopBar";
import BottomNav from "@/components/BottomNav";

export default function NoticesPage() {
  return (
    <main className="ps-page">
      <TopBar title="বিজ্ঞপ্তি" subtitle="ঘোষণা ও আপডেট" backHref="/" />
      <div className="ps-content">
        <div className="ps-list">
          {notices.map((n) => (
            <article key={n.id} className="ps-list-card">
              <div className="ps-list-top">
                <strong>{n.title}</strong>
                <span className="ps-badge">{n.date}</span>
              </div>
              <p className="ps-list-desc">{n.body}</p>
            </article>
          ))}
        </div>
      </div>
      <BottomNav active="home" />
    </main>
  );
}
