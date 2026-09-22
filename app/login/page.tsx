'use client';

import Link from 'next/link';
import { useState } from 'react';
import { LogIn } from 'lucide-react';

export default function LoginPage() {
  const [msg, setMsg] = useState('');
  return (
    <div className="max-w-md mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-6 flex items-center gap-2"><LogIn /> লগইন</h1>
      <form
        className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4"
        onSubmit={(e) => {
          e.preventDefault();
          setMsg('⚠️ এটি ডেমো মোড। ডেটাবেজ যুক্ত হলে লগইন সম্পূর্ণ কার্যকর হবে।');
        }}
      >
        <div>
          <label className="text-sm font-medium">ফোন / ইমেইল</label>
          <input required className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:border-green-600" placeholder="০১৭xxxxxxxx" />
        </div>
        <div>
          <label className="text-sm font-medium">পাসওয়ার্ড</label>
          <input required type="password" className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:border-green-600" placeholder="••••••••" />
        </div>
        {msg && <p className="text-sm text-amber-700 bg-amber-50 border border-amber-200 rounded-lg p-3">{msg}</p>}
        <button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white py-2.5 rounded-lg font-semibold">লগইন করুন</button>
        <p className="text-sm text-center text-gray-500">অ্যাকাউন্ট নেই? <Link href="/register" className="text-green-700 underline">রেজিস্ট্রেশন করুন</Link></p>
      </form>
    </div>
  );
}