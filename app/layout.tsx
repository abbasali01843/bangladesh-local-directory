import type { Metadata, Viewport } from "next";
import { site, siteUrl } from "@/data/site";
import SwRegister from "@/components/SwRegister";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
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
  alternates: { canonical: "/" },
  openGraph: {
    title: "প্রিয় সাতকানিয়া",
    description: "সাতকানিয়া · কাঞ্চনা থেকে শুরু — সারা বাংলাদেশের স্থানীয় তথ্য",
    url: "/",
    siteName: site.name,
    locale: "bn_BD",
    type: "website",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "প্রিয় সাতকানিয়া — সাতকানিয়ার সব তথ্য এক জায়গায়",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "প্রিয় সাতকানিয়া",
    description: "সাতকানিয়া · কাঞ্চনা থেকে শুরু — সারা বাংলাদেশের স্থানীয় তথ্য",
    images: ["/og.png"],
  },
  icons: {
    icon: "/icons/icon-192.png",
    apple: "/icons/apple-touch-icon.png",
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
      <body>
        <SwRegister />
        {children}
      </body>
    </html>
  );
}
