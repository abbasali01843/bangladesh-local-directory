import TopBar from "@/components/TopBar";
import BottomNav from "@/components/BottomNav";
import { donors, donorIntro, initialOf } from "@/data/community";

export default function DonorsPage() {
  return (
    <main className="ps-page">
      <TopBar title="সম্মানিত ডোনারবৃন্দ" subtitle="কৃতজ্ঞতার সঙ্গে" backHref="/" />

      <div className="ps-content">
        <div className="ps-list-card" style={{ marginBottom: 12 }}>
          <p className="ps-list-desc">💝 {donorIntro}</p>
        </div>

        <div className="ps-person-grid">
          {donors.map((d) => (
            <div key={d.id} className="ps-person">
              <span className="ps-person-avatar">{initialOf(d.name)}</span>
              <span className="ps-person-body">
                <span className="ps-person-name">{d.name}</span>
                <span className="ps-person-role">{d.role}</span>
                {d.note && <span className="ps-person-role">{d.note}</span>}
              </span>
              <span className="ps-person-amount">{d.amount}</span>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 16 }}>
          <a href="/contact" className="ps-btn-primary ps-btn-block">
            💝 ডোনার হতে চাইলে যোগাযোগ করুন
          </a>
        </div>
      </div>

      <BottomNav />
    </main>
  );
}
