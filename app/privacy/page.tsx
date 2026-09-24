import TopBar from "@/components/TopBar";
import BottomNav from "@/components/BottomNav";
import { site } from "@/data/site";

import Link from "next/link";
const sections: { title: string; body: string }[] = [
  {
    title: "আমরা যে তথ্য সংগ্রহ করি",
    body: "অ্যাকাউন্ট খুললে আপনার নাম, মোবাইল নম্বর ও এলাকার তথ্য সংরক্ষণ করা হয়। তালিকা যোগ করলে প্রতিষ্ঠান/সেবার নাম, ঠিকানা ও যোগাযোগ নম্বর সংরক্ষিত হয় — এগুলোই ডিরেক্টরির মূল উদ্দেশ্য।",
  },
  {
    title: "তথ্য কীভাবে ব্যবহার হয়",
    body: "তালিকার তথ্য স্থানীয় মানুষকে সেবা খুঁজে পেতে সাহায্য করেই প্রকাশ করা হয়। অ্যাকাউন্ট তথ্য শুধু লগইন, মালিকানা যাচাই ও যোগাযোগের কাজে ব্যবহৃত হয়।",
  },
  {
    title: "তথ্য শেয়ার",
    body: "আইনি প্রয়োজন ছাড়া আপনার ব্যক্তিগত তথ্য তৃতীয় পক্ষের সঙ্গে শেয়ার বা বিক্রি করা হয় না। পাবলিক তালিকার নম্বর/ঠিকানা ইতোমধ্যে প্রকাশ্য করেই যুক্ত করা হয়।",
  },
  {
    title: "তথ্য সংশোধন ও মুছে ফেলা",
    body: "আপনার তালিকার তথ্য ভুল থাকলে বা মুছে ফেলতে চাইলে যোগাযোগ পেজ থেকে জানান — যাচাই করে প্রয়োজনীয় ব্যবস্থা নেওয়া হবে।",
  },
  {
    title: "নিরাপত্তা",
    body: "ডেটা এনক্রিপ্ট করা সংযোগে (HTTPS) আদান-প্রদান হয়। পাসওয়ার্ড হ্যাশ করে সংরক্ষণ করা হয়; কেউ মূল পাসওয়ার্ড দেখতে পায় না।",
  },
  {
    title: "নীতিমালা পরিবর্তন",
    body: "প্রয়োজনে এই পলিসি হালনাগাদ হতে পারে। বড় পরিবর্তন হলে বিজ্ঞপ্তি পেজে জানানো হবে।",
  },
];

export default function PrivacyPage() {
  return (
    <main className="ps-page">
      <TopBar title="প্রাইভেসি পলিসি" subtitle={site.name} backHref="/" />

      <div className="ps-content">
        <div className="ps-detail" style={{ marginBottom: 12 }}>
          <div className="ps-detail-icon">🔒</div>
          <h1 className="ps-detail-title">প্রাইভেসি পলিসি</h1>
          <p className="ps-detail-desc">
            আপনার তথ্যের গোপনীয়তা আমাদের কাছে গুরুত্বপূর্ণ। আমরা কী তথ্য রাখি,
            কেন রাখি ও আপনার অধিকার কী — সেটা সংক্ষেপে নিচে দেওয়া হলো।
          </p>
          <p className="ps-list-loc">সর্বশেষ হালনাগাদ: ২০২৬-০৯-২৪</p>
        </div>

        <div className="ps-list">
          {sections.map((s, i) => (
            <section key={s.title} className="ps-list-card">
              <div className="ps-list-top">
                <strong>
                  {i + 1}. {s.title}
                </strong>
              </div>
              <p className="ps-list-desc">{s.body}</p>
            </section>
          ))}
        </div>

        <div style={{ marginTop: 16 }}>
          <Link href="/contact" className="ps-btn-primary ps-btn-block">
            ☎️ প্রশ্ন থাকলে যোগাযোগ করুন
          </Link>
        </div>
      </div>

      <BottomNav />
    </main>
  );
}
