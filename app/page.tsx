import { categories } from "@/data/categories";
import { getHomeEmergencyServices } from "@/data/services";
import { getCategoryCounts } from "@/lib/listings";
import { notices } from "@/data/notices";

import { site, hasSocial } from "@/data/site";
import { websiteJsonLd } from "@/lib/seo";
import { prisma } from "@/lib/prisma";
import TopBar from "@/components/TopBar";
import BottomNav from "@/components/BottomNav";
import HeroSlider, { type Slide } from "@/components/HeroSlider";
import NoticeTicker from "@/components/NoticeTicker";

import Link from "next/link";
export default async function Home() {
  const ruralUnions = await prisma.union.findMany({ where: { upazilaId: "u_15_74", id: { not: "un_15_74_4621" } }, orderBy: { name: "asc" } });
  const categoryCounts = await getCategoryCounts();
  const emergencyPins = getHomeEmergencyServices();

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
      id: "advertise",
      eyebrow: "ব্যবসায়ীদের জন্য",
      title: "আপনার ব্যবসার প্রচার করুন",
      desc: "স্থানীয় গ্রাহকের কাছে পৌঁছান — পেইড ফিচার্ড লিস্টিং",
      href: "/advertise",
      cta: "প্যাকেজ দেখুন",
      emoji: "📣",
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd()) }}
      />
      <TopBar />

      <div className="ps-content">
        <HeroSlider slides={slides} />

        <NoticeTicker />

        <div className="ps-section-head">
          <span className="ps-section-icon">🚨</span>
          <h2>জরুরি নম্বর</h2>
          <Link href="/services?category=emergency" className="ps-section-more">সব ›</Link>
        </div>
        <div
          className="ps-union-grid"
          style={{ gridTemplateColumns: "repeat(3, 1fr)", marginBottom: 12 }}
        >
          {emergencyPins.map((s) => (
            <a
              key={s.id}
              href={`tel:${s.phone.replace(/\s/g, "")}`}
              className="ps-union-card hot"
              style={{ flexDirection: "column", alignItems: "center", textAlign: "center", gap: 4, padding: "12px 8px" }}
            >
              <span style={{ fontSize: 22 }}>{s.pinEmoji}</span>
              <span className="ps-union-name" style={{ fontSize: 14 }}>{s.pinLabel}</span>
              <span className="ps-union-count" style={{ fontSize: 12 }}>{s.phone}</span>
            </a>
          ))}
        </div>


        <form action="/search" className="ps-search">
          <span className="ps-search-icon">🔍</span>
          <input name="q" type="search" placeholder="কি খুঁজছেন? নাম, এলাকা বা ফোন..." aria-label="Search" />
        </form>

        {/* ===== কভারেজ রোডম্যাপ ===== */}
        <div className="ps-roadmap" aria-label="কভারেজ রোডম্যাপ">
          <div className="ps-roadmap-step active">
            <span className="ps-roadmap-dot">✓</span>
            <span className="ps-roadmap-name">সাতকানিয়া</span>
            <span className="ps-roadmap-status">✓ সক্রিয় বিভাগ</span>
          </div>
          <span className="ps-roadmap-arrow" aria-hidden>
            →
          </span>
          <div className="ps-roadmap-step active">
            <span className="ps-roadmap-dot">✓</span>
            <span className="ps-roadmap-name">চট্টগ্রাম</span>
            <span className="ps-roadmap-status">পরবর্তী ধাপ</span>
          </div>
          <span className="ps-roadmap-arrow" aria-hidden>
            →
          </span>
          <div className="ps-roadmap-step">
            <span className="ps-roadmap-dot">৩</span>
            <span className="ps-roadmap-name">বাংলাদেশ</span>
            <span className="ps-roadmap-status">ভবিষ্যৎ কভারেজ</span>
          </div>
        </div>

        {/* ===== ইউনিয়ন সমূহ — priyosherpur-এর উপজেলা সেকশনের মতো ===== */}
        <div className="ps-section-head">
          <span className="ps-section-icon">🏘️</span>
          <h2>সাতকানিয়া উপজেলার ইউনিয়ন সমূহ ({ruralUnions.length})</h2>
        </div>
        <div className="ps-union-grid">
          {ruralUnions.map((u) => {
            return (
              <Link key={u.id} href={"/union/" + encodeURIComponent(u.slug)} className="ps-union-card">
                <span className="ps-union-pin">📍</span>
                <span className="ps-union-body">
                  <span className="ps-union-name">{u.name}</span>
                  <span className="ps-union-count">✓ বিস্তারিত প্রোফাইল</span>
                </span>
                <span className="ps-promo-arrow">›</span>
              </Link>
            );
          })}
        </div>

        {/* ===== ক্যাটাগরি গ্রিড ===== */}
        <div className="ps-section-head">
          <span className="ps-section-icon">📂</span>
          <h2>ক্যাটাগরি</h2>
          <Link href="/categories" className="ps-section-more">সব ›</Link>
        </div>
        <div className="ps-cat-grid">
          {categories.map((c) => {
            const n = categoryCounts[c.id] ?? 0;
            return (
              <Link key={c.id} href={`/services?category=${c.id}`} className="ps-cat-card">
                <div className="ps-cat-icon-wrap">
                  <span className="ps-cat-icon">{c.icon}</span>
                </div>
                <div className="ps-cat-name">{c.name}</div>
                <div className="ps-cat-count">
                  {n > 0 ? `${n} টি তথ্য` : "কোনো তথ্য নেই"}
                </div>
              </Link>
            );
          })}
        </div>

        {/* ===== নোটিশ ===== */}
        <div className="ps-section-head">
          <span className="ps-section-icon">📢</span>
          <h2>সর্বশেষ বিজ্ঞপ্তি</h2>
          <Link href="/notices" className="ps-section-more">সব ›</Link>
        </div>
        <div className="ps-list" style={{ marginBottom: 16 }}>
          {notices.slice(0, 2).map((n) => (
            <Link key={n.id} href="/notices" className="ps-list-card">
              <div className="ps-list-top">
                <strong>{n.title}</strong>
                <span className="ps-badge">{n.date}</span>
              </div>
              <p className="ps-list-desc">{n.body.slice(0, 90)}…</p>
            </Link>
          ))}
        </div>

        {/* ===== নির্বাচিত সেবা ===== */}
        <div className="ps-section-head">
          <span className="ps-section-icon">⭐</span>
          <h2>নির্বাচিত সেবা</h2>
          <Link href="/services" className="ps-section-more">সব ›</Link>
        </div>
        <div className="ps-list">
          <div className="ps-empty" style={{ margin: 0 }}>
            <div className="ps-empty-icon">📋</div>
            <p>নতুন সেবা যোগ হলে এখানে দেখাবে।</p>
            <Link href="/add-listing" className="ps-btn-primary">+ তথ্য যোগ করুন</Link>
          </div>
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
          <Link href="/contact" className="ps-btn-primary ps-btn-block">
            ☎️ যোগাযোগ করুন
          </Link>
          <div className="ps-footer-links">
            <Link href="/about">আমাদের সম্পর্কে</Link>
            <span>·</span>
            <Link href="/advisory">উপদেষ্টা পরিষদ</Link>
            <span>·</span>
            <Link href="/partners">প্রিয় সহযোদ্ধা</Link>
            <span>·</span>
            <Link href="/privacy">প্রাইভেসি পলিসি</Link>
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
