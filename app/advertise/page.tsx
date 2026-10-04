import type { Metadata } from "next";
import Link from "next/link";
import TopBar from "@/components/TopBar";
import BottomNav from "@/components/BottomNav";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "আপনার ব্যবসার প্রচার করুন",
  description: "প্রিয় সাতকানিয়ায় আপনার ব্যবসা বা সেবাকে আরও মানুষের কাছে পৌঁছে দিন।",
};

const packages = [
  {
    name: "বেসিক",
    price: "৳২৯৯",
    period: "/ মাস",
    description: "ছোট ব্যবসা ও নতুন উদ্যোক্তাদের জন্য",
    features: ["সার্চে অগ্রাধিকার", "বিশেষ ব্যবসা ব্যাজ", "ফোন ও ঠিকানা প্রদর্শন"],
  },
  {
    name: "ফিচার্ড",
    price: "৳৭৯৯",
    period: "/ মাস",
    description: "আরও বেশি স্থানীয় গ্রাহকের নজরে আসুন",
    featured: true,
    features: ["বেসিকের সব সুবিধা", "ক্যাটাগরি পেজে ফিচার্ড অবস্থান", "৩টি ব্যবসার ছবি", "WhatsApp যোগাযোগ বাটন"],
  },
  {
    name: "প্রিমিয়াম",
    price: "৳১,৪৯৯",
    period: "/ মাস",
    description: "যারা নিয়মিত প্রচার চান",
    features: ["ফিচার্ডের সব সুবিধা", "হোমপেজে প্রচার স্লট", "৫টি ব্যবসার ছবি", "মাসিক পারফরম্যান্স রিপোর্ট"],
  },
];

export default function AdvertisePage() {
  const phone = site.supportPhone.replace(/\D/g, "");
  const message = encodeURIComponent("আমি আমার ব্যবসার জন্য প্রিয় সাতকানিয়ার বিজ্ঞাপন/ফিচার্ড লিস্টিং নিতে চাই। প্যাকেজ ও পেমেন্টের বিস্তারিত জানাবেন?");
  const contactHref = phone ? `https://wa.me/${phone}?text=${message}` : "/contact";

  return (
    <main className="ps-page">
      <TopBar title="ব্যবসার প্রচার" subtitle="আপনার ব্যবসা আরও মানুষের কাছে" backHref="/" />
      <div className="ps-content">
        <section className="ps-detail" style={{ background: "linear-gradient(145deg,#075e36,#0a7a3e)", color: "#fff" }}>
          <div style={{ fontSize: 34 }}>📣</div>
          <h1 className="ps-detail-title">আপনার ব্যবসা, আরও বেশি মানুষের সামনে</h1>
          <p className="ps-detail-desc" style={{ color: "rgba(255,255,255,.88)" }}>
            সাতকানিয়ার মানুষ যখন ডাক্তার, দোকান, রেস্টুরেন্ট বা প্রয়োজনীয় সেবা খুঁজবেন—তখন আপনার ব্যবসাটিও যেন সহজে খুঁজে পান।
          </p>
          <Link href={contactHref} className="ps-btn-primary" style={{ background: "#fff", color: "#075e36" }}>
            প্যাকেজ নিতে যোগাযোগ করুন →
          </Link>
        </section>

        <div className="ps-section-head" style={{ marginTop: 22 }}>
          <span className="ps-section-icon">💼</span>
          <h2>প্রচার প্যাকেজ</h2>
        </div>
        <div className="ps-list">
          {packages.map((item) => (
            <section key={item.name} className="ps-detail" style={{ border: item.featured ? "2px solid #0a7a3e" : "1px solid #e5e7eb", position: "relative" }}>
              {item.featured && <div className="ps-badge" style={{ display: "inline-block", marginBottom: 10 }}>সবচেয়ে জনপ্রিয়</div>}
              <h2 style={{ margin: "0 0 4px", fontSize: 19 }}>{item.name}</h2>
              <p className="ps-list-desc" style={{ margin: "0 0 12px" }}>{item.description}</p>
              <div style={{ display: "flex", alignItems: "baseline", gap: 5, marginBottom: 14 }}>
                <strong style={{ fontSize: 28, color: "#0a7a3e" }}>{item.price}</strong>
                <span style={{ color: "#6b7280", fontSize: 13 }}>{item.period}</span>
              </div>
              <div style={{ display: "grid", gap: 9 }}>
                {item.features.map((feature) => (
                  <div key={feature} style={{ fontSize: 14, color: "#374151" }}>✓ {feature}</div>
                ))}
              </div>
              <Link href={contactHref} className="ps-btn-primary ps-btn-block" style={{ marginTop: 18 }}>
                এই প্যাকেজটি নিতে চাই
              </Link>
            </section>
          ))}
        </div>

        <section className="ps-detail" style={{ marginTop: 14 }}>
          <h2 style={{ margin: "0 0 8px", fontSize: 17 }}>কীভাবে শুরু করবেন?</h2>
          <p className="ps-detail-desc" style={{ margin: 0 }}>
            ১. পছন্দের প্যাকেজ নির্বাচন করুন।<br />
            ২. ব্যবসার নাম, ক্যাটাগরি ও যোগাযোগের তথ্য দিন।<br />
            ৩. তথ্য যাচাই ও পেমেন্ট নিশ্চিত হলে প্রচার চালু হবে।
          </p>
          <p className="ps-muted-note">দ্রষ্টব্য: এগুলো প্রস্তাবিত প্রাথমিক মূল্য। বিজ্ঞাপন চালুর আগে ব্যবসার মালিকের সঙ্গে প্যাকেজ, মেয়াদ ও শর্ত নিশ্চিত করতে হবে।</p>
        </section>
        <Link href="/add-listing" className="ps-btn-primary ps-btn-block" style={{ marginTop: 14 }}>
          আগে ফ্রি ব্যবসার তথ্য যোগ করুন
        </Link>
      </div>
      <BottomNav />
    </main>
  );
}
