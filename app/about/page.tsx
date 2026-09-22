import TopBar from "@/components/TopBar";
import BottomNav from "@/components/BottomNav";
import { pilot } from "@/data/pilot";

export default function AboutPage() {
  return (
    <main className="ps-page">
      <TopBar title="পরিচিতি" subtitle="Bangladesh Local Directory" backHref="/" />
      <div className="ps-content">
        <div className="ps-detail">
          <div className="ps-detail-icon">🇧🇩</div>
          <h1 className="ps-detail-title">Bangladesh Local Directory</h1>
          <p className="ps-detail-desc">
            সারা বাংলাদেশের স্থানীয় ব্যবসা ও সেবার ডিরেক্টরি। শুরু হয়েছে{" "}
            <strong>{pilot.label}</strong> থেকে — ধাপে ধাপে সব জেলায় বিস্তার হবে।
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
