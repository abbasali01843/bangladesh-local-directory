import { categories } from "@/data/categories";
import { services } from "@/data/services";
import { notices } from "@/data/notices";
import locations from "@/data/bangladesh-locations.bn.json";
import TopBar from "@/components/TopBar";
import BottomNav from "@/components/BottomNav";

type LocationItem = { value: string; title: string };

const districtsByDivision = locations.districts_bn as Record<string, LocationItem[]>;
const districts = Object.values(districtsByDivision).flat();
const upazilas = Object.values(locations.upazilas_bn).flat() as LocationItem[];
const unions = Object.values(locations.unions_bn).flat() as LocationItem[];

export default function Home() {
  const divisionStats = locations.divisions_bn.map((d) => ({
    ...d,
    districtCount: (districtsByDivision[d.value] || []).length,
  }));

  const demoCountByCategory = (id: string) =>
    services.filter((s) => s.category === id).length;

  return (
    <main className="ps-page">
      <TopBar title="Bangladesh Local Directory" subtitle="সারা বাংলাদেশের স্থানীয় তথ্য" />
      <div className="ps-content">
        <div className="ps-hero">
          <div className="ps-hero-inner">
            <div className="ps-hero-overlay">
              <p className="ps-hero-tag">🇧🇩 বাংলাদেশ</p>
              <h1 className="ps-hero-title">আপনার এলাকার প্রয়োজনীয় তথ্য এক জায়গায়</h1>
            </div>
          </div>
        </div>

        <a href="/search" className="ps-promo">
          <span className="ps-promo-pill">🔎 খুঁজুন</span>
          <span className="ps-promo-text">ব্যবসা · সেবা · প্রতিষ্ঠান · হাসপাতাল · শিক্ষা</span>
          <span className="ps-promo-arrow">›</span>
        </a>

        <form action="/search" className="ps-search">
          <span className="ps-search-icon">🔍</span>
          <input name="q" type="search" placeholder="ব্যবসা, সেবা, প্রতিষ্ঠান বা এলাকা খুঁজুন..." aria-label="Search" />
        </form>

        <div className="ps-section-head">
          <span className="ps-section-icon">📍</span><h2>বাংলাদেশের লোকেশন</h2>
        </div>
        <div className="ps-chips">
          {divisionStats.map((d) => (
            <a key={d.value} href={"/search?q=" + encodeURIComponent(d.title)} className="ps-chip">
              {d.title} · {d.districtCount} জেলা
            </a>
          ))}
        </div>

        <div className="ps-section-head">
          <span className="ps-section-icon">📊</span><h2>ডিরেক্টরি কাভারেজ</h2>
        </div>
        <div className="ps-chips">
          <span className="ps-chip">৮ বিভাগ</span>
          <span className="ps-chip">{districts.length} জেলা</span>
          <span className="ps-chip">{upazilas.length} উপজেলা</span>
          <span className="ps-chip">{unions.length}+ ইউনিয়ন/পৌরসভা</span>
        </div>

        <div className="ps-section-head">
          <span className="ps-section-icon">📢</span><h2>নোটিশ</h2>
          <a href="/notices" className="ps-section-more">সব ›</a>
        </div>
        <div className="ps-list" style={{ marginBottom: 16 }}>
          {notices.slice(0, 2).map((n) => (
            <a key={n.id} href="/notices" className="ps-list-card">
              <div className="ps-list-top"><strong>{n.title}</strong><span className="ps-badge">{n.date}</span></div>
              <p className="ps-list-desc">{n.body.slice(0, 90)}…</p>
            </a>
          ))}
        </div>

        <div className="ps-section-head">
          <span className="ps-section-icon">📂</span><h2>ক্যাটাগরি</h2>
          <a href="/categories" className="ps-section-more">সব ›</a>
        </div>
        <div className="ps-cat-grid">
          {categories.map((c) => (
            <a key={c.id} href={"/services?category=" + c.id} className="ps-cat-card">
              <div className="ps-cat-icon-wrap"><span className="ps-cat-icon">{c.icon}</span></div>
              <div className="ps-cat-name">{c.name}</div>
              <div className="ps-cat-count">{demoCountByCategory(c.id) ? demoCountByCategory(c.id) + " টি ডেমো" : "তথ্য যোগ করুন"}</div>
            </a>
          ))}
        </div>

        <div className="ps-section-head">
          <span className="ps-section-icon">➕</span><h2>আপনার এলাকার তথ্য যোগ করুন</h2>
        </div>
        <a href="/add-listing" className="ps-promo">
          <span className="ps-promo-pill">তথ্য যোগ</span>
          <span className="ps-promo-text">ব্যবসা বা সেবার তথ্য জমা দিন — Admin Review-এর পর প্রকাশ হবে</span>
          <span className="ps-promo-arrow">›</span>
        </a>
      </div>
      <BottomNav active="home" />
    </main>
  );
}
