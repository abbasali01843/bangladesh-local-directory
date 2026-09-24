/**
 * সাইটের ব্র্যান্ডিং ও যোগাযোগের কনফিগ।
 * আপনার আসল ফোন/ইমেইল/ফেসবুক লিংক এখানে বসান —
 * খালি রাখলে সংশ্লিষ্ট বোতাম UI থেকে লুকানো থাকবে।
 */
export const site = {
  /** অ্যাপের নাম — priyosherpur.com স্টাইলে "প্রিয় + এলাকা" */
  name: "প্রিয় সাতকানিয়া",
  nameEn: "Priyo Satkania",
  tagline: "সাতকানিয়ার সব তথ্য এক জায়গায়",
  areaLine: "সাতকানিয়া, চট্টগ্রাম",

  /** সাপোর্ট হটলাইন — যেমন "+8801700-000000" */
  supportPhone: "",
  /** ইমেইল — যেমন "info@example.com" */
  supportEmail: "",
  /** ফেসবুক পেজের সম্পূর্ণ URL */
  fbPageUrl: "",
  /** ফেসবুক গ্রুপের সম্পূর্ণ URL */
  fbGroupUrl: "",

  /** ফুটার ক্রেডিট */
  developedBy: "Local Hub Bangladesh",
  developedByUrl: "https://bangladesh-local-directory.vercel.app",
  copyrightYear: "২০২৬",
} as const;

/** Canonical সাইট URL — OG/sitemap/canonical-এ ব্যবহৃত। */
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  "https://bangladesh-local-directory.vercel.app";

export const hasSocial = Boolean(site.fbPageUrl || site.fbGroupUrl);
export const hasSupport = Boolean(site.supportPhone || site.supportEmail);
