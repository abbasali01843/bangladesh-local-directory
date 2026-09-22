import { categories } from "@/data/categories";
import TopBar from "@/components/TopBar";
import BottomNav from "@/components/BottomNav";

export default function CategoriesPage() {
  return (
    <main className="ps-page">
      <TopBar title="ক্যাটাগরি" subtitle={`${categories.length}টি বিভাগ`} backHref="/" />

      <div className="ps-content">
        <form action="/search" className="ps-search">
          <span className="ps-search-icon">🔍</span>
          <input name="q" type="search" placeholder="ক্যাটাগরি খুঁজুন..." aria-label="Search" />
        </form>

        <div className="ps-cat-grid">
          {categories.map((c) => (
            <a key={c.id} href={`/services?category=${c.id}`} className="ps-cat-card">
              <div className="ps-cat-icon-wrap">
                <span className="ps-cat-icon">{c.icon}</span>
              </div>
              <div className="ps-cat-name">{c.name}</div>
              <div className="ps-cat-count">{c.count} টি তথ্য</div>
            </a>
          ))}
        </div>
      </div>

      <BottomNav active="categories" />
    </main>
  );
}
