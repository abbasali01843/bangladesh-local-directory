import { categories } from "@/data/categories";
import TopBar from "@/components/TopBar";
import BottomNav from "@/components/BottomNav";

const districts = [
  "ঢাকা", "চট্টগ্রাম", "রাজশাহী", "খুলনা", "বরিশাল",
  "সিলেট", "রংপুর", "ময়মনসিংহ", "শেরপুর", "কুমিল্লা",
];

export default function Home() {
  return (
    <main className="ps-page">
      <TopBar />

      <div className="ps-content">
        {/* Hero */}
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

        {/* Promo */}
        <a href="/add-listing" className="ps-promo">
          <span className="ps-promo-pill">প্রিয় তথ্য</span>
          <span className="ps-promo-text">আপনার এলাকার সেবা খুঁজুন ও যোগ করুন</span>
          <span className="ps-promo-arrow">›</span>
        </a>

        {/* Search */}
        <form action="/search" className="ps-search">
          <span className="ps-search-icon">🔍</span>
          <input name="q" type="search" placeholder="সেবা, ক্যাটাগরি বা সাবক্যাটাগরি খুঁজুন..." aria-label="Search" />
        </form>

        {/* District chips */}
        <div className="ps-section-head">
          <span className="ps-section-icon">📍</span>
          <h2>জেলা সমূহ</h2>
        </div>
        <div className="ps-chips">
          {districts.map((d) => (
            <a key={d} href={`/search?q=${encodeURIComponent(d)}`} className="ps-chip">
              {d}
            </a>
          ))}
        </div>

        {/* Categories */}
        <div className="ps-section-head" style={{ marginTop: 8 }}>
          <span className="ps-section-icon">📂</span>
          <h2>ক্যাটাগরি সমূহ</h2>
        </div>

        <div className="ps-cat-grid">
          {categories.map((c) => (
            <a key={c.id} href={`/services?category=${c.id}`} className="ps-cat-card">
              <div className="ps-cat-icon-wrap">
                <span className="ps-cat-icon">{c.icon}</span>
              </div>
              <div className="ps-cat-name">{c.name}</div>
              <div className="ps-cat-count">{c.count} টি তথ্য</div>
            </a>
          ))}
        </div>
      </div>

      <BottomNav active="home" />
    </main>
  );
}
