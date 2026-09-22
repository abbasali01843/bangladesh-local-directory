import { categories } from "@/data/categories";

// Homepage shows first 8 popular categories
const popularIds = [
  "doctor",
  "business",
  "education",
  "mistri",
  "transport",
  "lawyer",
  "food",
  "emergency",
];

export default function Home() {
  const popular = popularIds
    .map((id) => categories.find((c) => c.id === id))
    .filter(Boolean) as typeof categories;

  return (
    <main className="pb-24">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="container h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl">🇧🇩</span>
            <strong className="text-lg font-bold text-teal-800">Local Hub</strong>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <a href="/login" className="text-teal-700 font-medium">
              লগইন
            </a>
            <a
              href="/add-listing"
              className="bg-teal-700 text-white px-3 py-1.5 rounded-lg text-sm font-medium"
            >
              + যোগ করুন
            </a>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-gradient-to-br from-teal-700 to-cyan-800 text-white">
        <div className="container py-10 md:py-14">
          <p className="text-teal-100 text-sm mb-1">আপনার এলাকার প্রয়োজনীয় তথ্য</p>
          <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-6">
            সবকিছু খুঁজুন
            <br className="md:hidden" /> এক জায়গায়
          </h1>

          <form action="/search" className="flex gap-2 max-w-2xl">
            <input
              name="q"
              aria-label="Search"
              placeholder="ডাক্তার, দোকান, মিস্ত্রি, রেস্টুরেন্ট..."
              className="flex-1 px-4 py-3.5 rounded-xl text-gray-900 border-0 outline-none shadow-sm"
            />
            <button
              type="submit"
              className="bg-white text-teal-800 font-bold px-5 rounded-xl shadow-sm hover:bg-teal-50 transition"
            >
              খুঁজুন
            </button>
          </form>
        </div>
      </section>

      {/* Categories */}
      <section className="container py-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-800">জনপ্রিয় ক্যাটাগরি</h2>
          <a href="/categories" className="text-teal-700 text-sm font-medium">
            সবগুলো ({categories.length}) →
          </a>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {popular.map((c) => (
            <a
              key={c.id}
              href={`/services?category=${c.id}`}
              className="bg-white border border-gray-200 rounded-2xl p-4 text-center hover:shadow-md hover:border-teal-300 transition group"
            >
              <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">
                {c.icon}
              </div>
              <div className="font-semibold text-gray-800 text-sm">{c.name}</div>
              <div className="text-xs text-gray-400 mt-1">তথ্য দেখুন</div>
            </a>
          ))}
        </div>
      </section>

      {/* Quick Actions */}
      <section className="container pb-8">
        <div className="bg-white border border-gray-200 rounded-2xl p-5 flex flex-col sm:flex-row gap-3 items-center justify-between">
          <div>
            <h3 className="font-bold text-gray-800">আপনার ব্যবসা বা সেবা যোগ করুন</h3>
            <p className="text-sm text-gray-500 mt-0.5">
              বিনামূল্যে তালিকাভুক্ত হোন এবং স্থানীয় মানুষের কাছে পৌঁছান
            </p>
          </div>
          <a
            href="/add-listing"
            className="bg-teal-700 text-white px-5 py-2.5 rounded-xl font-medium whitespace-nowrap hover:bg-teal-800 transition"
          >
            + তথ্য যোগ করুন
          </a>
        </div>
      </section>

      {/* Bottom Nav (Mobile) */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 md:hidden">
        <div className="flex items-center justify-around h-16">
          <a href="/" className="flex flex-col items-center text-teal-700 text-xs font-medium">
            <span className="text-xl">🏠</span>
            <span>হোম</span>
          </a>
          <a href="/categories" className="flex flex-col items-center text-gray-500 text-xs">
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
