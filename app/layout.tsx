import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "প্রিয় সাতকানিয়া — সাতকানিয়ার সব তথ্য এক জায়গায়",
    template: "%s | প্রিয় সাতকানিয়া",
  },
  description:
    "সাতকানিয়া ও কাঞ্চনা ইউনিয়নসহ স্থানীয় ডাক্তার, ব্যবসা, মিস্ত্রি, পরিবহন, জরুরি সেবা — সব প্রয়োজনীয় তথ্য এক জায়গায়। Bangladesh Local Directory-র অংশ।",
  keywords: [
    "প্রিয় সাতকানিয়া",
    "Priyo Satkania",
    "Bangladesh Local Directory",
    "সাতকানিয়া",
    "কাঞ্চনা",
    "চট্টগ্রাম",
    "স্থানীয় তথ্য",
    "ডাক্তার",
    "মিস্ত্রি",
  ],
  openGraph: {
    title: "প্রিয় সাতকানিয়া",
    description: "সাতকানিয়া · কাঞ্চনা থেকে শুরু — সারা বাংলাদেশের স্থানীয় তথ্য",
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
