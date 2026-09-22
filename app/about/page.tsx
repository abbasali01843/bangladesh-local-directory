import TopBar from "@/components/TopBar";
import BottomNav from "@/components/BottomNav";

export default function AboutPage() {
  return (
    <main className="ps-page">
      <TopBar title="পরিচিতি" subtitle="Local Hub সম্পর্কে" backHref="/" />
      <div className="ps-content">
        <div className="ps-detail">
          <div className="ps-detail-icon">🇧🇩</div>
          <h1 className="ps-detail-title">Local Hub Bangladesh</h1>
          <p className="ps-detail-desc">
            বাংলাদেশের স্থানীয় ব্যবসা, সেবা ও প্রয়োজনীয় তথ্য এক জায়গায়।
            ডাক্তার, দোকান, মিস্ত্রি, পরিবহন, জরুরি সেবা — খুঁজুন ও যোগ করুন।
          </p>
          <div className="ps-detail-fields">
            <div className="ps-field-row">
              <span className="ps-field-label">উদ্দেশ্য</span>
              <span className="ps-field-value">স্থানীয় তথ্য সহজ করা</span>
            </div>
            <div className="ps-field-row">
              <span className="ps-field-label">কভারেজ</span>
              <span className="ps-field-value">সারা বাংলাদেশ</span>
            </div>
            <div className="ps-field-row">
              <span className="ps-field-label">খরচ</span>
              <span className="ps-field-value">বিনামূল্যে তালিকাভুক্তি</span>
            </div>
          </div>
          <a href="/add-listing" className="ps-btn-primary ps-btn-block">+ তথ্য যোগ করুন</a>
        </div>
      </div>
      <BottomNav />
    </main>
  );
}
