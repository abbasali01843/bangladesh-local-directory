import TopBar from "@/components/TopBar";
import BottomNav from "@/components/BottomNav";
import { advisors, initialOf } from "@/data/community";

export default function AdvisoryPage() {
  return (
    <main className="ps-page">
      <TopBar title="উপদেষ্টা পরিষদ" subtitle={`${advisors.length} জন উপদেষ্টা`} backHref="/" />

      <div className="ps-content">
        <div className="ps-list-card" style={{ marginBottom: 12 }}>
          <p className="ps-list-desc">
            শিক্ষা, সমাজসেবা ও ব্যবসায়িক ক্ষেত্রে অভিজ্ঞ ব্যক্তিবর্গ প্ল্যাটফর্মের
            কার্যক্রমে দিকনির্দেশনা ও পরামর্শ দিয়ে থাকেন।
          </p>
        </div>

        <div className="ps-person-grid">
          {advisors.map((a) => (
            <div key={a.id} className="ps-person">
              <span className="ps-person-avatar">{initialOf(a.name)}</span>
              <span className="ps-person-body">
                <span className="ps-person-name">{a.name}</span>
                <span className="ps-person-role">
                  {a.role} {a.note ? `· ${a.note}` : ""}
                </span>
              </span>
            </div>
          ))}
        </div>

        <p className="ps-muted-note">
          পরিষদের তথ্য হালনাগাদ হলে এই তালিকায় প্রকাশ করা হবে।
        </p>
      </div>

      <BottomNav />
    </main>
  );
}
