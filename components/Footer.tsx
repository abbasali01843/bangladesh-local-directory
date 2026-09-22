import Link from 'next/link';
import { Mail, Phone } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-green-800 text-green-50 mt-12">
      <div className="max-w-6xl mx-auto px-4 py-8 grid gap-6 md:grid-cols-3 text-sm">
        <div>
          <p className="text-lg font-bold mb-2">🇧🇩 লোকাল হাব বাংলাদেশ</p>
          <p className="text-green-200">সারা বাংলাদেশের স্থানীয় ব্যবসা, সেবা ও প্রয়োজনীয় তথ্য এক জায়গায়।</p>
        </div>
        <div>
          <p className="font-semibold mb-2">সাপোর্ট</p>
          <p className="flex items-center gap-2"><Phone size={14} /> <a href="tel:+8801711000000" className="hover:underline">কল করুন</a></p>
          <p className="flex items-center gap-2 mt-1"><Mail size={14} /> <a href="mailto:info@localhub.example" className="hover:underline">ইমেইল করুন</a></p>
        </div>
        <div>
          <p className="font-semibold mb-2">যোগ হোন</p>
          <p>ফেসবুক পেজ ও গ্রুপে নিয়মিত সেবা ও তথ্য পেতে যোগ দিন।</p>
          <div className="mt-2 flex gap-3">
            <Link href="/contact" className="underline">ফেসবুক পেজ</Link>
            <Link href="/contact" className="underline">ফেসবুক গ্রুপ</Link>
          </div>
        </div>
      </div>
      <div className="border-t border-green-700 py-4 text-center text-xs text-green-200">
        © ২০২৬ লোকাল হাব বাংলাদেশ · সর্বস্বত্ব সংরক্ষিত
      </div>
    </footer>
  );
}