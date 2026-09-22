import { categories } from "@/data/categories";

export default function Home() {
  return (
    <main className="ps-page">
      {/* Top floating bar */}
      <div className="ps-topwrap">
        <header className="ps-topbar">
          <button type="button" className="ps-iconbtn" aria-label="Menu">
            ☰
          </button>
          <div className="ps-brand">
            <span className="ps-logo">🇧🇩</span>
            <div>
              <div className="ps-brand-title">Local Hub</div>
              <div className="ps-brand-sub">তথ্যই হোক সংযোগ</div>
            </div>
          </div>
          <a href="/login" className="ps-iconbtn" aria-label="Notifications">
            🔔
          </a>
        </header>
      </div>

      <div className="ps-content">
        {/* Hero image card */}
        <div className="ps-hero">
          <div className="ps-hero-inner">
            <div className="ps-hero-overlay">
              <p className="ps-hero-tag">বাংলাদেশের স্থানীয় তথ্য</p>
              <h1 className="ps-hero-title">সব তথ্য এক প্ল্যাটফর্মে</h1>
            </div>
          </div>
          <div className="ps-dots">
            <span className="ps-dot active" />
            <span className="ps-dot" />
            <span className="ps-dot" />
          </div>
        </div>

        {/* Promo banner */}
        <div className="ps-promo">
          <span className="ps-promo-pill">প্রিয় তথ্য</span>
          <span className="ps-promo-text">আপনার এলাকার সেবা খুঁজুন ও যোগ করুন</span>
          <span className="ps-promo-arrow">›</span>
        </div>

        {/* Search */}
        <form action="/search" className="ps-search">
          <span className="ps-search-icon">🔍</span>
          <input
            name="q"
            type="search"
            placeholder="সেবা, ক্যাটাগরি বা সাবক্যাটাগরি খুঁজুন..."
            aria-label="Search"
          />
        </form>

        {/* Section title */}
        <div className="ps-section-head">
          <span className="ps-section-icon">📍</span>
          <h2>জনপ্রিয় ক্যাটাগরি</h2>
        </div>

        {/* Category grid - 3 cols like Priyo Sherpur */}
        <div className="ps-cat-grid">
          {categories.map((c) => (
            <a key={c.id} href={`/services?category=${c.id}`} className="ps-cat-card">
              <div className="ps-cat-icon-wrap">
                <span className="ps-cat-icon">{c.icon}</span>
              </div>
              <div className="ps-cat-name">{c.name}</div>
              <div className="ps-cat-count">তথ্য দেখুন</div>
            </a>
          ))}
        </div>

        {/* Add listing CTA */}
        <a href="/add-listing" className="ps-cta">
          <div>
            <strong>তথ্য যোগ করুন</strong>
            <p>বিনামূল্যে তালিকাভুক্ত হোন</p>
          </div>
          <span className="ps-cta-btn">+</span>
        </a>
      </div>

      {/* Bottom nav - floating pill */}
      <nav className="ps-bottom">
        <a href="/" className="ps-nav-item active">
          <span className="ps-nav-ico">🏠</span>
          <span>হোম</span>
        </a>
        <a href="/categories" className="ps-nav-item">
          <span className="ps-nav-ico">🔔</span>
          <span>ক্যাটাগরি</span>
        </a>
        <a href="/add-listing" className="ps-nav-center">
          <span className="ps-nav-center-btn">🇧🇩</span>
          <span className="ps-nav-center-label">যোগ করুন</span>
        </a>
        <a href="/search" className="ps-nav-item">
          <span className="ps-nav-ico">💬</span>
          <span>খুঁজুন</span>
        </a>
        <a href="/login" className="ps-nav-item">
          <span className="ps-nav-ico">ℹ️</span>
          <span>অ্যাকাউন্ট</span>
        </a>
      </nav>
    </main>
  );
}
