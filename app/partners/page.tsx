import TopBar from "@/components/TopBar";
import BottomNav from "@/components/BottomNav";
import { partners, initialOf } from "@/data/community";

export default function PartnersPage() {
  return (
    <main className="ps-page">
      <TopBar title="প্রিয় সহযোদ্ধা" subtitle="যারা পাশে আছেন" backHref="/" />

      <div className="ps-content">
        <div className="ps-list-card" style={{ marginBottom: 12 }}>
          <p className="ps-list-desc">
            তথ্য সংগ্রহ, যাচাই ও উন্নয়নে যেসব ব্যক্তি ও সংগঠন নিয়মিত সহযোগিতা
            করছেন — তারাই আমাদের প্রিয় সহযোদ্ধা।
          </p>
        </div>

        <div className="ps-person-grid">
          {partners.map((p) => (
            <div key={p.id} className="ps-person">
              <span className="ps-person-avatar">{initialOf(p.name)}</span>
              <span className="ps-person-body">
                <span className="ps-person-name">{p.name}</span>
                <span className="ps-person-role">
                  {p.role} {p.note ? `· ${p.note}` : ""}
                </span>
              </span>
              <span className="ps-badge">🤝 সহযোদ্ধা</span>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 16 }}>
          <a href="/contact" className="ps-btn-primary ps-btn-block">
            🤝 আপনিও সহযোদ্ধা হোন — যোগাযোগ করুন
          </a>
        </div>
      </div>

      <BottomNav />
    </main>
  );
}
