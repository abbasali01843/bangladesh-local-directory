import { categories } from "@/data/categories";
import { getHomeEmergencyServices } from "@/data/services";
import { getCategoryCounts } from "@/lib/listings";
import { site } from "@/data/site";
import { websiteJsonLd } from "@/lib/seo";
import { prisma } from "@/lib/prisma";
import TopBar from "@/components/TopBar";
import BottomNav from "@/components/BottomNav";
import HeroSlider, { type Slide } from "@/components/HeroSlider";
import NoticeTicker from "@/components/NoticeTicker";
import Link from "next/link";

export default async function Home() {
  const ruralUnions = await prisma.union.findMany({
    where: { upazilaId: "u_15_74", id: { not: "un_15_74_4621" } },
    orderBy: { name: "asc" },
  });
  const categoryCounts = await getCategoryCounts();
  const emergencyPins = getHomeEmergencyServices();
  const activeServiceCount = Object.values(categoryCounts).reduce((sum, n) => sum + n, 0);

  const slides: Slide[] = [{
    id: "welcome",
    eyebrow: site.name,
    title: site.tagline,
    desc: "স্থানীয় ব্যবসা, স্বাস্থ্য, শিক্ষা, পরিবহন ও জরুরি তথ্য এক জায়গায়।",
    href: "/categories",
    cta: "ডিরেক্টরি দেখুন",
    emoji: "⌖",
    tone: "green",
  }];

  return (
    <main className="ps-page">
      <script dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd()) }} />
      <TopBar />
      <div className="ps-content">
        <HeroSlider slides={slides} />
        <NoticeTicker />

        <section className="ps-home-status" aria-label="কভারেজ স্ট্যাটাস">
          <div className="ps-home-status-main">
            <span className="ps-live-dot" />
            <div><strong>সাতকানিয়া সক্রিয়</strong><span>স্থানীয় ডিরেক্টরি ধাপে ধাপে তৈরি হচ্ছে</span></div>
          </div>
          <div className="ps-home-stats">
            <span><b>{ruralUnions.length}</b> ইউনিয়ন</span>
            <span><b>{activeServiceCount}</b> তথ্য</span>
          </div>
        </section>

        <form action="/search" className="ps-search" role="search">
          <span className="ps-search-icon" aria-hidden="true">⌕</span>
          <input name="q" type="search" placeholder="নাম, এলাকা বা ফোন দিয়ে খুঁজুন" aria-label="খুঁজুন" />
          <button type="submit">খুঁজুন</button>
        </form>

        <section>
          <div className="ps-section-head"><h2>জরুরি সেবা</h2><Link href="/services?category=emergency" className="ps-section-more">সব দেখুন →</Link></div>
          <div className="ps-emergency-grid">
            {emergencyPins.map((s) => (
              <a key={s.id} href={`tel:${s.phone.replace(/\s/g, "")}`} className="ps-emergency-card">
                <span className="ps-emergency-icon">{s.pinEmoji}</span>
                <span><strong>{s.pinLabel}</strong><small>{s.phone}</small></span>
              </a>
            ))}
          </div>
        </section>

        <section>
          <div className="ps-section-head"><h2>সাতকানিয়ার ইউনিয়ন</h2><Link href="/satkania" className="ps-section-more">সব দেখুন →</Link></div>
          <div className="ps-union-grid">
            {ruralUnions.map((u) => (
              <Link key={u.id} href={"/union/" + encodeURIComponent(u.slug)} className="ps-union-card">
                <span className="ps-union-body"><span className="ps-union-name">{u.name}</span><span className="ps-union-count">বিস্তারিত প্রোফাইল</span></span>
                <span className="ps-promo-arrow">→</span>
              </Link>
            ))}
          </div>
        </section>

        <section>
          <div className="ps-section-head"><h2>ক্যাটাগরি</h2><Link href="/categories" className="ps-section-more">সব দেখুন →</Link></div>
          <div className="ps-cat-grid">
            {categories.map((c) => {
              const n = categoryCounts[c.id] ?? 0;
              return <Link key={c.id} href={`/services?category=${c.id}`} className="ps-cat-card">
                <div className="ps-cat-icon-wrap"><span className="ps-cat-icon">{c.icon}</span></div>
                <div className="ps-cat-name">{c.name}</div>
                <div className="ps-cat-count">{n > 0 ? `${n} টি তথ্য` : "শিগগির যোগ হবে"}</div>
              </Link>;
            })}
          </div>
        </section>

        <section className="ps-home-footer">
          <div><strong>{site.name}</strong><span>{site.tagline}</span></div>
          <Link href="/add-listing" className="ps-btn-primary">তথ্য যোগ করুন</Link>
          <div className="ps-footer-links">
            <Link href="/about">আমাদের সম্পর্কে</Link><Link href="/contact">যোগাযোগ</Link><Link href="/privacy">প্রাইভেসি</Link>
          </div>
          <small>© {site.copyrightYear} {site.name} · Powered by {site.developedBy}</small>
        </section>
      </div>
      <BottomNav active="home" />
    </main>
  );
}
