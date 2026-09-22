import {
  kanchanaProfile,
  kanchanaSchools,
  kanchanaMadrasas,
  kanchanaPrimarySchools,
  kanchanaMosques,
} from "@/data/kanchana";
import { servicesInKanchana, countByCategory } from "@/data/services";
import { categories } from "@/data/categories";
import TopBar from "@/components/TopBar";
import BottomNav from "@/components/BottomNav";

export default function AreaPage() {
  const list = servicesInKanchana();
  const withData = categories.filter((c) => countByCategory(c.id) > 0);
  const p = kanchanaProfile;

  return (
    <main className="ps-page">
      <TopBar title="কাঞ্চনা ইউনিয়ন" subtitle="সাতকানিয়া, চট্টগ্রাম" backHref="/" />

      <div className="ps-content">
        <div className="ps-detail" style={{ marginBottom: 16 }}>
          <div className="ps-detail-icon">📍</div>
          <h1 className="ps-detail-title">{p.name}</h1>
          <p className="ps-list-loc">
            {p.code} · {p.upazila} · {p.district} · পোস্টকোড {p.postcode}
          </p>
          <p className="ps-detail-desc">
            আয়তন ~{p.areaKm2} বর্গকিমি · জনসংখ্যা ২০২২: {p.population2022.toLocaleString("bn-BD")} ·
            উপজেলা সদর থেকে ~{p.distanceToSadarKm} কিমি · গ্রাম: {p.villages.join(", ")}
          </p>
          <p className="ps-list-desc">{p.borders}</p>
          <a href={p.website} target="_blank" rel="noopener noreferrer" className="ps-btn-primary ps-btn-block">
            অফিসিয়াল ইউপি ওয়েবসাইট
          </a>
          <a href="/add-listing" className="ps-btn-primary ps-btn-block" style={{ marginTop: 8 }}>
            + কাঞ্চনায় তথ্য যোগ করুন
          </a>
        </div>

        <div className="ps-section-head">
          <span className="ps-section-icon">🏘️</span>
          <h2>গ্রাম ({p.villages.length})</h2>
        </div>
        <div className="ps-chips" style={{ marginBottom: 16 }}>
          {p.villages.map((v) => (
            <a key={v} href={`/search?q=${encodeURIComponent(v)}`} className="ps-chip">
              {v}
            </a>
          ))}
        </div>

        <div className="ps-section-head">
          <span className="ps-section-icon">🛒</span>
          <h2>হাট-বাজার</h2>
        </div>
        <div className="ps-chips" style={{ marginBottom: 16 }}>
          {p.hats.map((h) => (
            <a key={h} href={`/search?q=${encodeURIComponent(h)}`} className="ps-chip">
              {h}
            </a>
          ))}
        </div>

        <div className="ps-section-head">
          <span className="ps-section-icon">🏫</span>
          <h2>মাধ্যমিক বিদ্যালয়</h2>
        </div>
        <div className="ps-list" style={{ marginBottom: 16 }}>
          {kanchanaSchools.map((s) => (
            <div key={s.eiin} className="ps-list-card">
              <div className="ps-list-top">
                <strong>{s.name}</strong>
                <span className="ps-badge">EIIN {s.eiin}</span>
              </div>
              <p className="ps-list-loc">📍 {s.area} · {s.type}</p>
            </div>
          ))}
        </div>

        <div className="ps-section-head">
          <span className="ps-section-icon">📖</span>
          <h2>মাদ্রাসা</h2>
        </div>
        <div className="ps-list" style={{ marginBottom: 16 }}>
          {kanchanaMadrasas.map((s) => (
            <div key={s.name} className="ps-list-card">
              <div className="ps-list-top">
                <strong>{s.name}</strong>
                {s.eiin && <span className="ps-badge">EIIN {s.eiin}</span>}
              </div>
              <p className="ps-list-loc">📍 {s.area} · {s.type}</p>
              {s.note && <p className="ps-list-desc">{s.note}</p>}
            </div>
          ))}
        </div>

        <div className="ps-section-head">
          <span className="ps-section-icon">🎒</span>
          <h2>প্রাথমিক বিদ্যালয় ({kanchanaPrimarySchools.length})</h2>
        </div>
        <div className="ps-list" style={{ marginBottom: 16 }}>
          {kanchanaPrimarySchools.map((name) => (
            <div key={name} className="ps-list-card">
              <strong style={{ fontSize: 14 }}>{name}</strong>
            </div>
          ))}
        </div>

        <div className="ps-section-head">
          <span className="ps-section-icon">🕌</span>
          <h2>মসজিদ / ধর্মীয় স্থান</h2>
        </div>
        <div className="ps-list" style={{ marginBottom: 16 }}>
          {kanchanaMosques.map((name) => (
            <div key={name} className="ps-list-card">
              <strong style={{ fontSize: 14 }}>{name}</strong>
            </div>
          ))}
        </div>

        <div className="ps-section-head">
          <span className="ps-section-icon">📂</span>
          <h2>ডিরেক্টরি ক্যাটাগরি</h2>
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
          <h2>লিস্টিং ({list.length})</h2>
        </div>
        <div className="ps-list">
          {list.map((s) => (
            <a key={s.id} href={`/services/${s.id}`} className="ps-list-card">
              <div className="ps-list-top">
                <strong>{s.name}</strong>
                {s.verified && <span className="ps-badge">✓</span>}
              </div>
              <p className="ps-list-loc">📍 {s.area}{s.phone ? ` · ${s.phone}` : ""}</p>
            </a>
          ))}
        </div>
      </div>

      <BottomNav active="home" />
    </main>
  );
}
