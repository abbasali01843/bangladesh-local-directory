import TopBar from "@/components/TopBar";
import BottomNav from "@/components/BottomNav";
import { site, hasSocial, hasSupport } from "@/data/site";

import Link from "next/link";
export default function ContactPage() {
  return (
    <main className="ps-page">
      <TopBar title="যোগাযোগ" subtitle="সাপোর্ট ও অভিযোগ" backHref="/" />

      <div className="ps-content">
        <div className="ps-detail" style={{ marginBottom: 12 }}>
          <div className="ps-detail-icon">☎️</div>
          <h1 className="ps-detail-title">যোগাযোগ করুন</h1>
          <p className="ps-detail-desc">
            তথ্য সংশোধন, নতুন তালিকা, অভিযোগ বা পরামর্শের জন্য যোগাযোগ করুন।
            মোবাইলে কাজের সময় সকাল ৯টা — রাত ১০টা।
          </p>
        </div>

        <div className="ps-list">
          {site.supportPhone && (
            <a href={`tel:${site.supportPhone}`} className="ps-contact-row">
              <span className="ps-contact-ico">📞</span>
              <span className="ps-contact-body">
                <strong>কল করুন</strong>
                <span className="ps-contact-sub">{site.supportPhone}</span>
              </span>
              <span className="ps-promo-arrow">›</span>
            </a>
          )}

          {site.supportEmail && (
            <a href={`mailto:${site.supportEmail}`} className="ps-contact-row">
              <span className="ps-contact-ico">✉️</span>
              <span className="ps-contact-body">
                <strong>ইমেইল করুন</strong>
                <span className="ps-contact-sub">{site.supportEmail}</span>
              </span>
              <span className="ps-promo-arrow">›</span>
            </a>
          )}

          {site.fbPageUrl && (
            <a href={site.fbPageUrl} target="_blank" rel="noopener noreferrer" className="ps-contact-row">
              <span className="ps-contact-ico">📘</span>
              <span className="ps-contact-body">
                <strong>ফেসবুক পেইজ</strong>
                <span className="ps-contact-sub">মেসেঞ্জারে মেসেজ করুন</span>
              </span>
              <span className="ps-promo-arrow">›</span>
            </a>
          )}

          {site.fbGroupUrl && (
            <a href={site.fbGroupUrl} target="_blank" rel="noopener noreferrer" className="ps-contact-row">
              <span className="ps-contact-ico">👥</span>
              <span className="ps-contact-body">
                <strong>ফেসবুক গ্রুপ</strong>
                <span className="ps-contact-sub">গ্রুপে পোস্ট করে জানান</span>
              </span>
              <span className="ps-promo-arrow">›</span>
            </a>
          )}

          <div className="ps-contact-row">
            <span className="ps-contact-ico">📍</span>
            <span className="ps-contact-body">
              <strong>ঠিকানা</strong>
              <span className="ps-contact-sub">সাতকানিয়া, চট্টগ্রাম, বাংলাদেশ</span>
            </span>
          </div>

          {!hasSupport && !hasSocial && (
            <div className="ps-list-card">
              <p className="ps-list-desc">
                ⚙️ ফোন নম্বর ও সোশ্যাল লিংক যোগ করা হয়নি। সাইট চালক{" "}
                <strong>data/site.ts</strong> ফাইলে নিজের তথ্য বসালে এখানে বোতাম
                দেখা যাবে।
              </p>
            </div>
          )}
        </div>

        <div style={{ marginTop: 16 }}>
          <Link href="/add-listing" className="ps-btn-primary ps-btn-block">
            ➕ নতুন তথ্য যোগ করতে চান?
          </Link>
        </div>
      </div>

      <BottomNav />
    </main>
  );
}
