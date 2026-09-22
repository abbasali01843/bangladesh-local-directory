'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Search } from 'lucide-react';

export default function SearchBar({ placeholder = 'ডাক্তার, ব্যবসা, মিস্ত্রি... খুঁজুন' }: { placeholder?: string }) {
  const [q, setQ] = useState('');
  const router = useRouter();
  return (
    <form
      className="flex w-full max-w-xl mx-auto bg-white rounded-full overflow-hidden shadow-lg"
      onSubmit={(e) => {
        e.preventDefault();
        router.push('/search?q=' + encodeURIComponent(q));
      }}
    >
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder={placeholder}
        className="flex-1 px-5 py-3 outline-none text-gray-800"
      />
      <button type="submit" className="bg-green-600 hover:bg-green-700 text-white px-6 flex items-center gap-2">
        <Search size={18} /> খুঁজুন
      </button>
    </form>
  );
}