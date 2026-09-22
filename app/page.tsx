import { categories } from "@/data/categories";
import { services, countByCategory, servicesInPilot } from "@/data/services";
import { notices } from "@/data/notices";
import { pilot, satkaniaUnions } from "@/data/pilot";
import TopBar from "@/components/TopBar";
import BottomNav from "@/components/BottomNav";

export default function Home() {
  const pilotList = servicesInPilot().slice(0, 6);
  const recent = services.slice(0, 5);

  return (
    <main className="ps-page">
      <TopBar title="Bangladesh Local Directory" subtitle={pilot.shortLabel} />

      <div className="ps-content">
        <div className="ps-hero">
          <div className="ps-hero-inner">
            <div className="ps-hero-overlay">
              <p className="ps-hero-tag">{pilot.label}</p>
              <h1 className="ps-hero-title">আপনার এলাকার সব তথ্য এক জায়গায়</h1>
            </div>
          </div>
          <div className="ps-dots">
            <span className="ps-dot active" />
            <span className="ps-dot" />
            <span className="ps-dot" />
          </div>
        </div>

        <a href="/add-listing" className="ps-promo">
          <span className="ps-promo-pill">স্থানীয় তথ্য</span>
          <span className="ps-promo-text">সাতকানিয়া / কাঞ্চনার সেবা খুঁজুন ও যোগ করুন</span>
          <span className="ps-promo-arrow">›</span>
        </a>

        <form action="/search" className="ps-search">
          <span className="ps-search-icon">🔍</span>
          <input
            name="q"
            type="search"
            placeholder="ডাক্তার, দোকান, মিস্ত্রি, বাস..."
            aria-label="Search"
          />
        </form>

        {/* Pilot location */}
        <div className="ps-section-head">
          <span className="ps-section-icon">📍</span>
          <h2>আপনার এলাকা</h2>
          <a href="/area" className="ps-section-more">বিস্তারিত ›</a>
        </div>
        <div className="ps-list-card" style={{ marginBottom: 16 }}>
          <div className="ps-list-top">
            <strong>{pilot.district.name} জেলা</strong>
            <span className="ps-badge">পাইলট</span>
          </div>
          <p className="ps-list-loc">
            থানা/উপজেলা: {pilot.upazila.name} · ইউনিয়ন: {pilot.union.name}
          </p>
          <p className="ps-list-desc">
            এখান থেকে শুরু — পরে সারা বাংলাদেশে বিস্তার।
          </p>
        </div>

        {/* Unions chips */}
        <div className="ps-section-head">
          <span className="ps-section-icon">🏘️</span>
          <h2>সাতকানিয়া ইউনিয়ন</h2>
        </div>
        <div className="ps-chips">
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

        {/* Notices */}
        <div className="ps-section-head">
          <span className="ps-section-icon">📢</span>
          <h2>নোটিশ</h2>
          <a href="/notices" className="ps-section-more">সব ›</a>
        </div>
        <div className="ps-list" style={{ marginBottom: 16 }}>
          {notices.slice(0, 2).map((n) => (
            <a key={n.id} href="/notices" className="ps-list-card">
              <div className="ps-list-top">
                <strong>{n.title}</strong>
                <span className="ps-badge">{n.date}</span>
              </div>
              <p className="ps-list-desc">{n.body.slice(0, 80)}…</p>
            </a>
          ))}
        </div>

        {/* Categories */}
        <div className="ps-section-head">
          <span className="ps-section-icon">📂</span>
          <h2>ক্যাটাগরি</h2>
          <a href="/categories" className="ps-section-more">সব ›</a>
        </div>
        <div className="ps-cat-grid">
          {categories.map((c) => {
            const real = countByCategory(c.id);
            const shown = real > 0 ? real : 0;
            return (
              <a key={c.id} href={`/services?category=${c.id}`} className="ps-cat-card">
                <div className="ps-cat-icon-wrap">
                  <span className="ps-cat-icon">{c.icon}</span>
                </div>
                <div className="ps-cat-name">{c.name}</div>
                <div className="ps-cat-count">{shown} টি তথ্য</div>
              </a>
            );
          })}
        </div>

        {/* Local listings */}
        <div className="ps-section-head">
          <span className="ps-section-icon">⭐</span>
          <h2>সাতকানিয়া / কাঞ্চনা</h2>
        </div>
        <div className="ps-list" style={{ marginBottom: 16 }}>
          {pilotList.map((s) => (
            <a key={s.id} href={`/services/${s.id}`} className="ps-list-card">
              <div className="ps-list-top">
                <strong>{s.name}</strong>
                {s.verified && <span className="ps-badge">✓ Verified</span>}
              </div>
              <p className="ps-list-loc">📍 {s.area}, {s.upazila}</p>
            </a>
          ))}
        </div>

        <div className="ps-section-head">
          <span className="ps-section-icon">🆕</span>
          <h2>সাম্প্রতিক</h2>
        </div>
        <div className="ps-list">
          {recent.map((s) => (
            <a key={s.id} href={`/services/${s.id}`} className="ps-list-card">
              <div className="ps-list-top">
                <strong>{s.name}</strong>
                {s.verified && <span className="ps-badge">✓</span>}
              </div>
              <p className="ps-list-loc">📍 {s.area}, {s.upazila}, {s.district}</p>
            </a>
          ))}
        </div>
      </div>

      <BottomNav active="home" />
    </main>
  );
}
