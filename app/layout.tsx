import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Local Hub Bangladesh — স্থানীয় তথ্য",
    template: "%s | Local Hub",
  },
  description:
    "বাংলাদেশের স্থানীয় ব্যবসা, ডাক্তার, মিস্ত্রি, পরিবহন ও জরুরি সেবা এক জায়গায় খুঁজুন ও যোগ করুন।",
  keywords: ["বাংলাদেশ", "স্থানীয় তথ্য", "ডাক্তার", "মিস্ত্রি", "ডিরেক্টরি", "Local Hub"],
  openGraph: {
    title: "Local Hub Bangladesh",
    description: "স্থানীয় ব্যবসা ও সেবা এক প্ল্যাটফর্মে",
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
