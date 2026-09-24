import TopBar from "@/components/TopBar";
import BottomNav from "@/components/BottomNav";

import Link from "next/link";
type Item = {
  icon: string;
  label: string;
  desc: string;
  href?: string;
  soon?: boolean;
};

const items: Item[] = [
  { icon: "🚨", label: "জরুরি সেবা", desc: "হটলাইন, পুলিশ, ফায়ার, অ্যাম্বুলেন্স", href: "/services?category=emergency" },
  { icon: "🏘️", label: "আপনার এলাকা", desc: "কাঞ্চনা ইউনিয়ন প্রোফাইল", href: "/area" },
  { icon: "➕", label: "তথ্য যোগ করুন", desc: "ফ্রি লিস্টিং জমা দিন", href: "/add-listing" },
  { icon: "📢", label: "বিজ্ঞপ্তি", desc: "সর্বশেষ আপডেট ও ঘোষণা", href: "/notices" },
  { icon: "🔍", label: "খুঁজুন", desc: "নাম, এলাকা বা ফোন দিয়ে", href: "/search" },
  { icon: "📂", label: "সব ক্যাটাগরি", desc: "২১টি সার্ভিস বিভাগ", href: "/categories" },
  { icon: "🏫", label: "EIIN ডিরেক্টরি", desc: "সাতকানিয়ার স্কুল-কলেজ-মাদ্রাসা", href: "/institutes" },
  { icon: "🎬", label: "ভিডিও", desc: "স্থানীয় ভিডিও ও প্রচারণা", soon: true },
  { icon: "💬", label: "চ্যাট", desc: "কমিউনিটি চ্যাট রুম", soon: true },
  { icon: "💼", label: "চাকরির বিজ্ঞপ্তি", desc: "স্থানীয় চাকরি খোঁজ", soon: true },
  { icon: "🚌", label: "বাসের সময়সূচি", desc: "রুট ও কাউন্টার ভিত্তিক", soon: true },
];

export default function MoreServicesPage() {
  return (
    <main className="ps-page">
      <TopBar title="আরও সার্ভিস" subtitle="সব ফিচার এক জায়গায়" backHref="/" />

      <div className="ps-content">
        <div className="ps-cat-grid">
          {items.map((it) =>
            it.soon ? (
              <div key={it.label} className="ps-cat-card ps-cat-disabled">
                <div className="ps-cat-icon-wrap">
                  <span className="ps-cat-icon">{it.icon}</span>
                </div>
                <div className="ps-cat-name">{it.label}</div>
                <div className="ps-cat-count ps-soon">শীঘ্রই আসছে</div>
              </div>
            ) : (
              <Link key={it.label} href={it.href || "#"} className="ps-cat-card">
                <div className="ps-cat-icon-wrap">
                  <span className="ps-cat-icon">{it.icon}</span>
                </div>
                <div className="ps-cat-name">{it.label}</div>
                <div className="ps-cat-count">{it.desc}</div>
              </Link>
            )
          )}
        </div>
      </div>

      <BottomNav />
    </main>
  );
}
