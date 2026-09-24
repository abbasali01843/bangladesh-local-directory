import TopBar from "@/components/TopBar";
import BottomNav from "@/components/BottomNav";
import { pilot } from "@/data/pilot";

export default function AboutPage() {
  return (
    <main className="ps-page">
      <TopBar title="আমাদের সম্পর্কে" subtitle="প্রিয় সাতকানিয়া" backHref="/" />
      <div className="ps-content">
        <div className="ps-detail">
          <div className="ps-detail-icon">📍</div>
          <h1 className="ps-detail-title">প্রিয় সাতকানিয়া</h1>
          <p className="ps-detail-desc">
            সাতকানিয়ার মানুষের জন্য একটি স্বাধীন লোকাল ডিরেক্টরি প্ল্যাটফর্ম —
            এখানে স্থানীয় ব্যবসা, স্বাস্থ্যসেবা, শিক্ষা প্রতিষ্ঠান, মিস্ত্রি ও
            জরুরি সেবার তথ্য সাজিয়ে দেওয়া হয়। শুরু হয়েছে{" "}
            <strong>{pilot.label}</strong> থেকে — ধাপে ধাপে সারা বাংলাদেশে বিস্তার হবে।
            এটি <strong>Bangladesh Local Directory</strong> প্রকল্পের অংশ।
          </p>
          <p className="ps-list-loc" style={{ marginTop: 8 }}>
            ⚠️ এটি কোনো সরকারি প্রতিষ্ঠানের অ্যাপ নয় এবং সরকারি সেবা প্রদান করে না;
            তথ্য শুধুমাত্র সাধারণ তথ্যভান্ডার হিসেবে দেওয়া হয়।
          </p>
          <div className="ps-detail-fields">
            <div className="ps-field-row">
              <span className="ps-field-label">পাইলট জেলা</span>
              <span className="ps-field-value">{pilot.district.name}</span>
            </div>
            <div className="ps-field-row">
              <span className="ps-field-label">উপজেলা</span>
              <span className="ps-field-value">{pilot.upazila.name}</span>
            </div>
            <div className="ps-field-row">
              <span className="ps-field-label">ইউনিয়ন</span>
              <span className="ps-field-value">{pilot.union.name}</span>
            </div>
            <div className="ps-field-row">
              <span className="ps-field-label">লক্ষ্য</span>
              <span className="ps-field-value">৬৪ জেলা</span>
            </div>
          </div>
          <a href="/area" className="ps-btn-primary ps-btn-block">
            আপনার এলাকা দেখুন
          </a>
          <a
            href="/add-listing"
            className="ps-btn-primary ps-btn-block"
            style={{ marginTop: 8 }}
          >
            + তথ্য যোগ করুন
          </a>
        </div>
      </div>
      <BottomNav />
    </main>
  );
}
