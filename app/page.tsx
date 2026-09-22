import { categories } from "@/data/categories";
import { services, countByCategory, servicesInKanchana } from "@/data/services";
import { notices } from "@/data/notices";
import { pilot, satkaniaUnions } from "@/data/pilot";
import TopBar from "@/components/TopBar";
import BottomNav from "@/components/BottomNav";

export default function Home() {
  const kanchana = servicesInKanchana().slice(0, 8);

  return (
    <main className="ps-page">
      <TopBar title="Bangladesh Local Directory" subtitle={pilot.shortLabel} />

      <div className="ps-content">
        <div className="ps-hero">
          <div className="ps-hero-inner">
            <div className="ps-hero-overlay">
              <p className="ps-hero-tag">{pilot.label}</p>
              <h1 className="ps-hero-title">কাঞ্চনা ইউনিয়নের তথ্য আলাদা করে সাজানো</h1>
            </div>
          </div>
        </div>

        <a href="/area" className="ps-promo">
          <span className="ps-promo-pill">কাঞ্চনা</span>
          <span className="ps-promo-text">ইউনিয়ন প্রোফাইল · স্কুল · হাট · মসজিদ</span>
          <span className="ps-promo-arrow">›</span>
        </a>

        <form action="/search" className="ps-search">
          <span className="ps-search-icon">🔍</span>
          <input name="q" type="search" placeholder="কাঞ্চনায় খুঁজুন..." aria-label="Search" />
        </form>

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
              <p className="ps-list-desc">{n.body.slice(0, 90)}…</p>
            </a>
          ))}
        </div>

        <div className="ps-section-head">
          <span className="ps-section-icon">🏘️</span>
          <h2>সাতকানিয়া ইউনিয়ন</h2>
        </div>
        <div className="ps-chips">
          {satkaniaUnions.map((u) => (
            <a
              key={u.id}
              href={u.id === "kanchana" ? "/area" : `/search?q=${encodeURIComponent(u.name)}`}
              className="ps-chip"
              style={
                u.id === "kanchana"
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
          <h2>ক্যাটাগরি</h2>
          <a href="/categories" className="ps-section-more">সব ›</a>
        </div>
        <div className="ps-cat-grid">
          {categories.map((c) => {
            const n = countByCategory(c.id);
            return (
              <a key={c.id} href={`/services?category=${c.id}`} className="ps-cat-card">
                <div className="ps-cat-icon-wrap">
                  <span className="ps-cat-icon">{c.icon}</span>
                </div>
                <div className="ps-cat-name">{c.name}</div>
                <div className="ps-cat-count">{n} টি</div>
              </a>
            );
          })}
        </div>

        <div className="ps-section-head">
          <span className="ps-section-icon">⭐</span>
          <h2>শুধু কাঞ্চনা ইউনিয়ন</h2>
          <a href="/area" className="ps-section-more">সব ›</a>
        </div>
        <div className="ps-list">
          {kanchana.map((s) => (
            <a key={s.id} href={`/services/${s.id}`} className="ps-list-card">
              <div className="ps-list-top">
                <strong>{s.name}</strong>
                <span className="ps-badge">কাঞ্চনা</span>
              </div>
              <p className="ps-list-loc">📍 {s.area}</p>
            </a>
          ))}
        </div>
      </div>

      <BottomNav active="home" />
    </main>
  );
}
