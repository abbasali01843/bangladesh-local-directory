import { categories } from "@/data/categories";
import { services, countByCategory, countByUnion, servicesInKanchana } from "@/data/services";
import { notices } from "@/data/notices";
import { pilot, satkaniaUnions } from "@/data/pilot";
import { donors, initialOf } from "@/data/community";
import { site, hasSocial } from "@/data/site";
import TopBar from "@/components/TopBar";
import BottomNav from "@/components/BottomNav";
import HeroSlider, { type Slide } from "@/components/HeroSlider";
import NoticeTicker from "@/components/NoticeTicker";

export default function Home() {
  const kanchana = servicesInKanchana().slice(0, 6);

  const slides: Slide[] = [
    {
      id: "welcome",
      eyebrow: site.name,
      title: site.tagline,
      desc: "ডাক্তার · দোকান · মিস্ত্রি · পরিবহন · জরুরি সেবা",
      href: "/categories",
      cta: "ক্যাটাগরি দেখুন",
      emoji: "📍",
      tone: "green",
    },
    {
      id: "add",
      eyebrow: "ফ্রি লিস্টিং",
      title: "আপনার ব্যবসা বা সেবার তথ্য যোগ করুন",
      desc: "কয়েক মিনিটে তালিকা জমা দিন — যাচাই শেষে প্রকাশ",
      href: "/add-listing",
      cta: "তথ্য যোগ করুন",
      emoji: "🆓",
      tone: "teal",
    },
    {
      id: "kanchana",
      eyebrow: "বিশেষ বিভাগ",
      title: `${pilot.union.name} ইউনিয়নের তথ্য আলাদা করে সাজানো`,
      desc: "স্কুল · মসজিদ · হাটবাজার · স্বাস্থ্যকেন্দ্র",
      href: "/area",
      cta: "এলাকা দেখুন",
      emoji: "🏘️",
      tone: "amber",
    },
    ...(hasSocial
      ? [
          {
            id: "fb",
            eyebrow: "যুক্ত হোন",
            title: "ফেসবুকে নিয়মিত সেবা ও তথ্য পেতে জয়েন করুন",
            desc: "আমাদের অফিসিয়াল পেজ ও গ্রুপে",
            href: site.fbGroupUrl || site.fbPageUrl,
            cta: "জয়েন করুন",
            emoji: "👥",
            tone: "green" as const,
          },
        ]
      : []),
  ];

  return (
    <main className="ps-page">
      <TopBar />

      <div className="ps-content">
        <HeroSlider slides={slides} />

        <NoticeTicker />

        <a href="/area" className="ps-promo">
          <span className="ps-promo-pill">{pilot.union.name}</span>
          <span className="ps-promo-text">ইউনিয়ন প্রোফাইল · স্কুল · হাট · মসজিদ</span>
          <span className="ps-promo-arrow">›</span>
        </a>

        <form action="/search" className="ps-search">
          <span className="ps-search-icon">🔍</span>
          <input name="q" type="search" placeholder="কি খুঁজছেন? নাম, এলাকা বা ফোন..." aria-label="Search" />
        </form>

        {/* ===== ইউনিয়ন সমূহ — priyosherpur-এর উপজেলা সেকশনের মতো ===== */}
        <div className="ps-section-head">
          <span className="ps-section-icon">🏘️</span>
          <h2>{pilot.upazila.name} উপজেলার ইউনিয়ন সমূহ</h2>
        </div>
        <div className="ps-union-grid">
          {satkaniaUnions.map((u) => {
            const n = countByUnion(u.name);
            const hot = u.id === pilot.union.id;
            return (
              <a
                key={u.id}
                href={hot ? "/area" : `/search?q=${encodeURIComponent(u.name)}`}
                className={`ps-union-card${hot ? " hot" : ""}`}
              >
                <span className="ps-union-pin">📍</span>
                <span className="ps-union-body">
                  <span className="ps-union-name">{u.name}</span>
                  <span className="ps-union-count">
                    {hot ? "বিশেষ বিভাগ" : n > 0 ? `${n} টি তথ্য` : "তথ্য যোগ করা হচ্ছে"}
                  </span>
                </span>
                <span className="ps-promo-arrow">›</span>
              </a>
            );
          })}
        </div>

        {/* ===== ক্যাটাগরি গ্রিড ===== */}
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
                <div className="ps-cat-count">
                  {n > 0 ? `${n} টি তথ্য` : "কোনো তথ্য নেই"}
                </div>
              </a>
            );
          })}
        </div>

        {/* ===== নোটিশ ===== */}
        <div className="ps-section-head">
          <span className="ps-section-icon">📢</span>
          <h2>সর্বশেষ বিজ্ঞপ্তি</h2>
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

        {/* ===== কাঞ্চনা ফিচার্ড ===== */}
        <div className="ps-section-head">
          <span className="ps-section-icon">⭐</span>
          <h2>শুধু {pilot.union.name} ইউনিয়ন</h2>
          <a href="/area" className="ps-section-more">সব ›</a>
        </div>
        <div className="ps-list">
          {kanchana.map((s) => (
            <a key={s.id} href={`/services/${s.id}`} className="ps-list-card">
              <div className="ps-list-top">
                <strong>{s.name}</strong>
                <span className="ps-badge">{s.union}</span>
              </div>
              <p className="ps-list-loc">📍 {s.area}</p>
            </a>
          ))}
        </div>

        {/* ===== সম্মানিত ডোনারবৃন্দ ===== */}
        <div className="ps-section-head" style={{ marginTop: 16 }}>
          <span className="ps-section-icon">💝</span>
          <h2>সম্মানিত ডোনারবৃন্দ</h2>
          <a href="/donors" className="ps-section-more">সম্পূর্ণ তালিকা ›</a>
        </div>
        <div className="ps-person-grid">
          {donors.slice(0, 2).map((d) => (
            <div key={d.id} className="ps-person">
              <span className="ps-person-avatar">{initialOf(d.name)}</span>
              <span className="ps-person-body">
                <span className="ps-person-name">{d.name}</span>
                <span className="ps-person-role">{d.role}</span>
              </span>
              <span className="ps-person-amount">{d.amount}</span>
            </div>
          ))}
        </div>

        {/* ===== যোগাযোগ / ফুটার ===== */}
        <div className="ps-footer-card">
          <div className="ps-footer-brand">
            <span className="ps-logo">📍</span>
            <div>
              <div className="ps-brand-title">{site.name}</div>
              <div className="ps-brand-sub">{site.tagline}</div>
            </div>
          </div>
          <a href="/contact" className="ps-btn-primary ps-btn-block">
            ☎️ যোগাযোগ করুন
          </a>
          <div className="ps-footer-links">
            <a href="/about">আমাদের সম্পর্কে</a>
            <span>·</span>
            <a href="/advisory">উপদেষ্টা পরিষদ</a>
            <span>·</span>
            <a href="/partners">প্রিয় সহযোদ্ধা</a>
            <span>·</span>
            <a href="/privacy">প্রাইভেসি পলিসি</a>
          </div>
          <p className="ps-footer-copy">
            © {site.copyrightYear} {site.name} · ALL RIGHTS RESERVED
          </p>
          <p className="ps-footer-copy">
            Powered by <strong>{site.developedBy}</strong>
          </p>
        </div>
      </div>

      <BottomNav active="home" />
    </main>
  );
}
