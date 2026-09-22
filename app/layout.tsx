import type { Metadata } from 'next';
import { Noto_Sans_Bengali } from 'next/font/google';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import './globals.css';

const bengali = Noto_Sans_Bengali({
  subsets: ['bengali'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-bengali',
});

export const metadata: Metadata = {
  title: 'লোকাল হাব বাংলাদেশ — স্থানীয় তথ্য ডিরেক্টরি',
  description: 'সারা বাংলাদেশের স্থানীয় ব্যবসা, সেবা ও প্রয়োজনীয় তথ্য এক জায়গায় — ৬৪ জেলা, ২১ ক্যাটাগরি।',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="bn" className={bengali.variable}>
      <body className="min-h-screen flex flex-col antialiased" style={{ fontFamily: 'var(--font-bengali), system-ui, sans-serif' }}>
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}