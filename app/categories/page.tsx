import { categories } from "@/data/categories";

export default function CategoriesPage() {
  return (
    <main className="pb-24">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="container h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <a href="/" className="text-teal-700 text-sm font-medium">
              ← হোম
            </a>
            <strong className="text-lg font-bold text-gray-800">ক্যাটাগরি</strong>
          </div>
          <a
            href="/add-listing"
            className="bg-teal-700 text-white px-3 py-1.5 rounded-lg text-sm font-medium"
          >
            + যোগ করুন
          </a>
        </div>
      </header>

      <section className="container py-6">
        <p className="text-gray-500 text-sm mb-5">
          আপনার প্রয়োজন অনুযায়ী সেবা বেছে নিন — মোট {categories.length}টি ক্যাটাগরি
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {categories.map((c) => (
            <a
              key={c.id}
              href={`/services?category=${c.id}`}
              className="bg-white border border-gray-200 rounded-2xl p-4 text-center hover:shadow-md hover:border-teal-300 transition group"
            >
              <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">
                {c.icon}
              </div>
              <div className="font-semibold text-gray-800 text-sm leading-snug">
                {c.name}
              </div>
              <div className="text-xs text-teal-600 mt-1.5 font-medium">
                তথ্য দেখুন →
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* Bottom Nav */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 md:hidden">
        <div className="flex items-center justify-around h-16">
          <a href="/" className="flex flex-col items-center text-gray-500 text-xs">
            <span className="text-xl">🏠</span>
            <span>হোম</span>
          </a>
          <a href="/categories" className="flex flex-col items-center text-teal-700 text-xs font-medium">
            <span className="text-xl">📂</span>
            <span>ক্যাটাগরি</span>
          </a>
          <a href="/add-listing" className="flex flex-col items-center -mt-5">
            <span className="bg-teal-700 text-white w-12 h-12 rounded-full flex items-center justify-center text-2xl shadow-lg">
              +
            </span>
          </a>
          <a href="/search" className="flex flex-col items-center text-gray-500 text-xs">
            <span className="text-xl">🔍</span>
            <span>খুঁজুন</span>
          </a>
          <a href="/login" className="flex flex-col items-center text-gray-500 text-xs">
            <span className="text-xl">👤</span>
            <span>অ্যাকাউন্ট</span>
          </a>
        </div>
      </nav>
    </main>
  );
}
