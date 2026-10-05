import { notices } from "@/data/notices";
import Link from "next/link";

export default function NoticeTicker() {
  const latest = notices[0];
  if (!latest) return null;
  return (
    <Link href="/notices" className="ps-notice-row">
      <span className="ps-notice-label">বিজ্ঞপ্তি</span>
      <span className="ps-notice-title">{latest.title}</span>
      <span className="ps-notice-arrow">→</span>
    </Link>
  );
}
