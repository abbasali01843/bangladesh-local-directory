'use client';

import { useState } from 'react';
import { PlusCircle } from 'lucide-react';
import { categories } from '@/data/categories';
import { districts } from '@/data/districts';

export default function AddPage() {
  const [msg, setMsg] = useState('');
  return (
    <div className="max-w-md mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-6 flex items-center gap-2"><PlusCircle /> তথ্য যোগ করুন</h1>
      <form
        className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4"
        onSubmit={(e) => {
          e.preventDefault();
          setMsg('⚠️ ডেমো মোডে তথ্য সেভ হয় না। ডেটাবেজ যুক্ত হলে তথ্য সেভ ও মডারেশন চালু হবে।');
        }}
      >
        <div>
          <label className="text-sm font-medium">নাম</label>
          <input required className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:border-green-600" placeholder='যেমন: ডা. রহিম' />
        </div>
        <div>
          <label className="text-sm font-medium">ক্যাটাগরি</label>
          <select required className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:border-green-600">
            <option value="">-- নির্বাচন করুন --</option>
            {categories.map((c) => (<option key={c.slug} value={c.slug}>{c.emoji} {c.name}</option>))}
          </select>
        </div>
        <div>
          <label className="text-sm font-medium">জেলা</label>
          <select required className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:border-green-600">
            <option value="">-- নির্বাচন করুন --</option>
            {districts.map((d) => (<option key={d.slug} value={d.slug}>{d.name}</option>))}
          </select>
        </div>
        <div>
          <label className="text-sm font-medium">ফোন</label>
          <input required className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:border-green-600" placeholder="০১৭xxxxxxxx" />
        </div>
        <div>
          <label className="text-sm font-medium">ঠিকানা</label>
          <input className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:border-green-600" placeholder="বিস্তারিত ঠিকানা" />
        </div>
        <div>
          <label className="text-sm font-medium">বিবরণ</label>
          <textarea rows={3} className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:border-green-600" placeholder="সেবা সম্পর্কে সংক্ষিপ্ত বিবরণ" />
        </div>
        {msg && <p className="text-sm text-amber-700 bg-amber-50 border border-amber-200 rounded-lg p-3">{msg}</p>}
        <button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white py-2.5 rounded-lg font-semibold">জমা দিন</button>
      </form>
    </div>
  );
}