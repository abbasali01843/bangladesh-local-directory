import { categories } from "@/data/categories";

export default function CategoriesPage() {
  return (
    <main className="ps-page">
      <div className="ps-topwrap">
        <header className="ps-topbar">
          <a href="/" className="ps-iconbtn" aria-label="Back">
            ←
          </a>
          <div className="ps-brand">
            <span className="ps-logo">🇧🇩</span>
            <div>
              <div className="ps-brand-title">ক্যাটাগরি</div>
              <div className="ps-brand-sub">{categories.length}টি বিভাগ</div>
            </div>
          </div>
          <a href="/add-listing" className="ps-iconbtn" aria-label="Add">
            +
          </a>
        </header>
      </div>

      <div className="ps-content">
        <form action="/search" className="ps-search">
          <span className="ps-search-icon">🔍</span>
          <input
            name="q"
            type="search"
            placeholder="ক্যাটাগরি খুঁজুন..."
            aria-label="Search categories"
          />
        </form>

        <div className="ps-section-head">
          <span className="ps-section-icon">📂</span>
          <h2>সকল ক্যাটাগরি</h2>
        </div>

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
      </div>

      <nav className="ps-bottom">
        <a href="/" className="ps-nav-item">
          <span className="ps-nav-ico">🏠</span>
          <span>হোম</span>
        </a>
        <a href="/categories" className="ps-nav-item active">
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
