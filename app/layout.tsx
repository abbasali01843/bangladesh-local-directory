import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Bangladesh Local Directory — সারা বাংলাদেশ",
    template: "%s | Bangladesh Local Directory",
  },
  description:
    "সারা বাংলাদেশের স্থানীয় ব্যবসা, সেবা, প্রতিষ্ঠান ও প্রয়োজনীয় তথ্য খুঁজুন এবং আপনার এলাকার তথ্য যোগ করুন।",
  keywords: [
    "Bangladesh Local Directory",
    "বাংলাদেশ লোকাল ডিরেক্টরি",
    "স্থানীয় তথ্য",
    "ব্যবসা",
    "সেবা",
    "প্রতিষ্ঠান",
    "ডাক্তার",
    "শিক্ষা",
    "জরুরি সেবা",
  ],
  openGraph: {
    title: "Bangladesh Local Directory",
    description: "সারা বাংলাদেশের স্থানীয় ব্যবসা, সেবা ও প্রতিষ্ঠানের তথ্য এক জায়গায়।",
    locale: "bn_BD",
    type: "website",
  },
  manifest: "/manifest.webmanifest",
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0a7a3e",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="bn">
      <body>{children}</body>
    </html>
  );
}
