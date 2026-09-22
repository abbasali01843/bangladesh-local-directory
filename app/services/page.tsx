import { services } from "@/data/services";
import { categories } from "@/data/categories";

export default async function ServicesPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const p = await searchParams;
  const category = p.category
    ? categories.find((c) => c.id === p.category)
    : null;
  const list = p.category
    ? services.filter((s) => s.category === p.category)
    : services;

  return (
    <main className="pb-24">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="container h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <a href="/categories" className="text-teal-700 text-sm font-medium">
              ← ক্যাটাগরি
            </a>
            <strong className="text-lg font-bold text-gray-800">
              {category ? category.name : "সকল সেবা"}
            </strong>
          </div>
        </div>
      </header>

      <section className="container py-6">
        {list.length === 0 ? (
          <div className="bg-white border border-gray-200 rounded-2xl p-8 text-center">
            <div className="text-4xl mb-3">{category?.icon || "📋"}</div>
            <h2 className="font-bold text-gray-800 mb-1">এখনো কোনো তথ্য নেই</h2>
            <p className="text-sm text-gray-500 mb-5">
              এই ক্যাটাগরিতে এখনো কোনো তালিকা যোগ করা হয়নি।
              আপনি প্রথম তথ্য যোগ করতে পারেন।
            </p>
            <a
              href="/add-listing"
              className="inline-block bg-teal-700 text-white px-5 py-2.5 rounded-xl font-medium"
            >
              + তথ্য যোগ করুন
            </a>
          </div>
        ) : (
          <div className="grid gap-3">
            {list.map((s) => (
              <a
                key={s.id}
                href={`/services/${s.id}`}
                className="bg-white border border-gray-200 rounded-2xl p-4 hover:shadow-md hover:border-teal-300 transition"
              >
                <div className="flex items-start justify-between gap-3">
                  <strong className="text-gray-800">{s.name}</strong>
                  {s.verified && (
                    <span className="text-xs text-teal-700 font-medium whitespace-nowrap">
                      ✓ Verified
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-500 mt-1">
                  📍 {s.upazila}, {s.district}
                  {s.area ? ` · ${s.area}` : ""}
                </p>
                {s.description && (
                  <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                    {s.description}
                  </p>
                )}
              </a>
            ))}
          </div>
        )}
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
