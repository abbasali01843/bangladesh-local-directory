import { notices } from "@/data/notices";

/** priyosherpur.com-এর ঘূর্ণায়মান বিজ্ঞপ্তি টিকার — সর্বশেষ নোটিশ স্ক্রল হয় */
export default function NoticeTicker() {
  if (!notices.length) return null;
  const text = notices.map((n) => `⭐ ${n.title}`).join("   ");

  return (
    <a href="/notices" className="ps-ticker" aria-label="সব বিজ্ঞপ্তি দেখুন">
      <span className="ps-ticker-badge">📢 বিজ্ঞপ্তি</span>
      <span className="ps-ticker-window">
        <span className="ps-ticker-track">
          {text}&nbsp;&nbsp;&nbsp;&nbsp;{text}&nbsp;&nbsp;&nbsp;&nbsp;
        </span>
      </span>
    </a>
  );
}
