'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X, Phone, User, PlusCircle } from 'lucide-react';

const menuItems = [
  { href: '/', label: 'হোম' },
  { href: '/notice', label: 'বিজ্ঞপ্তি' },
  { href: '/contact', label: 'যোগাযোগ' },
  { href: '/about', label: 'আমাদের সম্পর্কে' },
  { href: '/advisors', label: 'উপদেষ্টা পরিষদ' },
  { href: '/donors', label: 'সম্মানিত ডোনারবৃন্দ' },
  { href: '/privacy', label: 'প্রাইভেসি পলিসি' },
  { href: '/#categories', label: 'আরও সার্ভিস' },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="bg-green-700 text-white shadow-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-2 flex items-center justify-between text-sm">
        <div className="flex items-center gap-3">
          <a href="tel:+8801711000000" className="flex items-center gap-1 hover:text-green-200">
            <Phone size={14} /> কল করুন
          </a>
          <Link href="/add" className="flex items-center gap-1 hover:text-green-200">
            <PlusCircle size={14} /> তথ্য যোগ করুন
          </Link>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/login" className="flex items-center gap-1 hover:text-green-200"><User size={14} /> লগইন</Link>
          <Link href="/register" className="bg-white text-green-700 px-3 py-0.5 rounded hover:bg-green-50">রেজিস্ট্রেশন</Link>
        </div>
      </div>
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between border-t border-green-600">
        <Link href="/" className="text-2xl font-bold">🇧🇩 লোকাল হাব <span className="text-green-200">বাংলাদেশ</span></Link>
        <nav className="hidden md:flex items-center gap-4 text-sm">
          {menuItems.map((m) => (
            <Link key={m.href + m.label} href={m.href} className="hover:text-green-200">{m.label}</Link>
          ))}
        </nav>
        <button className="md:hidden p-2" onClick={() => setOpen(!open)} aria-label="মেনু">
          {open ? <X /> : <Menu />}
        </button>
      </div>
      {open && (
        <nav className="md:hidden bg-green-800 px-4 pb-4 text-sm flex flex-col gap-3">
          {menuItems.map((m) => (
            <Link key={'m' + m.label} href={m.href} onClick={() => setOpen(false)} className="hover:text-green-200">{m.label}</Link>
          ))}
        </nav>
      )}
    </header>
  );
}