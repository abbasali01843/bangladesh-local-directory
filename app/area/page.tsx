import { pilot, satkaniaUnions } from "@/data/pilot";
import { servicesInPilot, countByCategory } from "@/data/services";
import { categories } from "@/data/categories";
import TopBar from "@/components/TopBar";
import BottomNav from "@/components/BottomNav";

export default function AreaPage() {
  const list = servicesInPilot();
  const withData = categories.filter((c) => countByCategory(c.id) > 0);

  return (
    <main className="ps-page">
      <TopBar title="আপনার এলাকা" subtitle={pilot.label} backHref="/" />

      <div className="ps-content">
        <div className="ps-detail" style={{ marginBottom: 16 }}>
          <div className="ps-detail-icon">📍</div>
          <h1 className="ps-detail-title">{pilot.upazila.name}</h1>
          <p className="ps-list-loc">
            {pilot.district.name} জেলা · {pilot.union.name} ইউনিয়ন
          </p>
          <p className="ps-detail-desc">
            Bangladesh Local Directory-এর প্রথম পাইলট এলাকা। এখানকার ডাক্তার, দোকান,
            মিস্ত্রি, পরিবহন ও জরুরি সেবা ধাপে ধাপে যোগ হচ্ছে। আপনিও তথ্য যোগ করতে পারেন।
          </p>
          <a href="/add-listing" className="ps-btn-primary ps-btn-block">
            + এই এলাকায় তথ্য যোগ করুন
          </a>
        </div>

        <div className="ps-section-head">
          <span className="ps-section-icon">🏘️</span>
          <h2>ইউনিয়ন সমূহ</h2>
        </div>
        <div className="ps-chips" style={{ marginBottom: 16 }}>
          {satkaniaUnions.map((u) => (
            <a
              key={u.id}
              href={`/search?q=${encodeURIComponent(u.name)}`}
              className="ps-chip"
              style={
                u.id === pilot.union.id
                  ? { borderColor: "#0a7a3e", color: "#0a7a3e", fontWeight: 800 }
                  : undefined
              }
            >
              {u.name}
            </a>
          ))}
        </div>

        <div className="ps-section-head">
          <span className="ps-section-icon">📂</span>
          <h2>ক্যাটাগরি ({withData.length})</h2>
        </div>
        <div className="ps-cat-grid">
          {withData.map((c) => (
            <a key={c.id} href={`/services?category=${c.id}`} className="ps-cat-card">
              <div className="ps-cat-icon-wrap">
                <span className="ps-cat-icon">{c.icon}</span>
              </div>
              <div className="ps-cat-name">{c.name}</div>
              <div className="ps-cat-count">{countByCategory(c.id)} টি</div>
            </a>
          ))}
        </div>

        <div className="ps-section-head">
          <span className="ps-section-icon">📋</span>
          <h2>সব তথ্য ({list.length})</h2>
        </div>
        <div className="ps-list">
          {list.map((s) => (
            <a key={s.id} href={`/services/${s.id}`} className="ps-list-card">
              <div className="ps-list-top">
                <strong>{s.name}</strong>
                {s.verified && <span className="ps-badge">✓</span>}
              </div>
              <p className="ps-list-loc">📍 {s.area} · {s.phone || "ফোন নেই"}</p>
            </a>
          ))}
        </div>
      </div>

      <BottomNav active="home" />
    </main>
  );
}
