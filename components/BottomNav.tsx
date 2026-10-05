import Link from "next/link";
import type { ReactNode } from "react";

type Props = { active?: "home" | "categories" | "add" | "search" | "account" };

const Icon = ({ children }: { children: ReactNode }) => (
  <span className="ps-nav-icon" aria-hidden="true">{children}</span>
);

export default function BottomNav({ active = "home" }: Props) {
  return (
    <nav className="ps-bottom" aria-label="প্রধান নেভিগেশন">
      <Link href="/" className={active === "home" ? "ps-nav-item active" : "ps-nav-item"}><Icon>⌂</Icon><span>হোম</span></Link>
      <Link href="/categories" className={active === "categories" ? "ps-nav-item active" : "ps-nav-item"}><Icon>▦</Icon><span>ক্যাটাগরি</span></Link>
      <Link href="/add-listing" className="ps-nav-add" aria-label="তথ্য যোগ করুন"><span className="ps-nav-add-icon">+</span><span>তথ্য যোগ</span></Link>
      <Link href="/search" className={active === "search" ? "ps-nav-item active" : "ps-nav-item"}><Icon>⌕</Icon><span>খুঁজুন</span></Link>
      <Link href="/profile" className={active === "account" ? "ps-nav-item active" : "ps-nav-item"}><Icon>♙</Icon><span>অ্যাকাউন্ট</span></Link>
    </nav>
  );
}
