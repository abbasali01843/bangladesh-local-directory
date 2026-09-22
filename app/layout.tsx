import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Bangladesh Local Directory — সাতকানিয়া, চট্টগ্রাম",
    template: "%s | Bangladesh Local Directory",
  },
  description:
    "চট্টগ্রামের সাতকানিয়া ও কাঞ্চনাসহ বাংলাদেশের স্থানীয় ডাক্তার, দোকান, মিস্ত্রি, পরিবহন ও জরুরি সেবা এক জায়গায়।",
  keywords: [
    "Bangladesh Local Directory",
    "সাতকানিয়া",
    "কাঞ্চনা",
    "চট্টগ্রাম",
    "স্থানীয় তথ্য",
    "ডাক্তার",
    "মিস্ত্রি",
  ],
  openGraph: {
    title: "Bangladesh Local Directory",
    description: "সাতকানিয়া · কাঞ্চনা থেকে শুরু — সারা বাংলাদেশের স্থানীয় তথ্য",
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
