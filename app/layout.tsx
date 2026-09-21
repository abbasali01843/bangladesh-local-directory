import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Local Hub Bangladesh",
  description: "বাংলাদেশের স্থানীয় ব্যবসা, সেবা ও প্রয়োজনীয় তথ্য এক জায়গায়।",
  manifest: "/manifest.webmanifest",
};

export default function RootLayout({ children }: Readonly<{children: React.ReactNode}>) {
  return <html lang="bn"><body>{children}</body></html>;
}