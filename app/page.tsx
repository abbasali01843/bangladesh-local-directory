import Link from 'next/link';
import SearchBar from '@/components/SearchBar';
import CategoryCard from '@/components/CategoryCard';
import { getCategories, getDistricts, getNotices, getServices, getServiceCount } from '@/lib/data';
import { Megaphone, MapPin } from 'lucide-react';

export default function HomePage() {
  const categories = getCategories();
  const districts = getDistricts();
  const notices = getNotices();
  const all = getServices();
  return (
    <div>
      {/* হিরো + সার্চ */}
      <section className="bg-gradient-to-b from-green-700 to-green-600 text-white py-14 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">সারা বাংলাদেশের স্থানীয় তথ্য এক জায়গায়</h1>
          <p className="text-green-100 mb-6">ব্যবসা · সেবা · জরুরি যোগাযোগ — ৬৪ জেলা, ২১ ক্যাটাগরি</p>
          <SearchBar />
          <div className="mt-6 flex justify-center gap-6 text-sm">
            <span>📋 {all.length}+ তথ্য</span>
            <span>📂 {categories.length} ক্যাটাগরি</span>
            <span>📍 {districts.length} জেলা</span>
          </div>
        </div>
      </section>

      {/* নোটিশ টিকার */}
      <div className="bg-amber-50 border-y border-amber-200 text-amber-900 py-2 px-4 overflow-hidden">
        <div className="max-w-6xl mx-auto flex items-center gap-2 text-sm">
          <Megaphone size={16} className="shrink-0" />
          <div className="overflow-hidden flex-1">
            <div className="animate-ticker">
              {notices.map((n) => (
                <Link key={n.id} href="/notice" className="mx-8 hover:underline">📌 {n.title}</Link>
              ))}
              {notices.map((n) => (
                <Link key={'r' + n.id} href="/notice" className="mx-8 hover:underline">📌 {n.title}</Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ক্যাটাগরি */}
      <section id="categories" className="max-w-6xl mx-auto px-4 py-10">
        <h2 className="text-xl font-bold mb-4">📂 ক্যাটাগরি সমূহ</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {categories.map((c) => (
            <CategoryCard key={c.slug} slug={c.slug} name={c.name} emoji={c.emoji} description={c.description} count={getServiceCount(c.slug)} />
          ))}
        </div>
      </section>

      {/* জেলা */}
      <section className="max-w-6xl mx-auto px-4 pb-10">
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2"><MapPin size={20} /> জেলা সমূহ</h2>
        <div className="flex flex-wrap gap-2">
          {districts.map((d) => (
            <Link key={d.slug} href={'/district/' + d.slug} className="bg-white border border-green-200 text-green-800 text-sm px-3 py-1 rounded-full hover:bg-green-50">{d.name}</Link>
          ))}
        </div>
      </section>
    </div>
  );
}