import { services } from "@/data/services";
import { categories } from "@/data/categories";
import TopBar from "@/components/TopBar";
import BottomNav from "@/components/BottomNav";

export default async function ServicesPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const p = await searchParams;
  const category = p.category ? categories.find((c) => c.id === p.category) : null;
  const list = p.category ? services.filter((s) => s.category === p.category) : services;

  return (
    <main className="ps-page">
      <TopBar
        title={category ? category.name : "সকল সেবা"}
        subtitle={category ? `${list.length} টি তথ্য` : "সব ক্যাটাগরি"}
        backHref="/categories"
      />

      <div className="ps-content">
        {list.length === 0 ? (
          <div className="ps-empty">
            <div className="ps-empty-icon">{category?.icon || "📋"}</div>
            <h2>এখনো কোনো তথ্য নেই</h2>
            <p>এই ক্যাটাগরিতে এখনো তালিকা যোগ হয়নি। আপনি প্রথম যোগ করতে পারেন।</p>
            <a href="/add-listing" className="ps-btn-primary">+ তথ্য যোগ করুন</a>
          </div>
        ) : (
          <div className="ps-list">
            {list.map((s) => (
              <a key={s.id} href={`/services/${s.id}`} className="ps-list-card">
                <div className="ps-list-top">
                  <strong>{s.name}</strong>
                  {s.verified && <span className="ps-badge">✓ Verified</span>}
                </div>
                <p className="ps-list-loc">📍 {s.upazila}, {s.district}{s.area ? ` · ${s.area}` : ""}</p>
                {s.description && <p className="ps-list-desc">{s.description}</p>}
                {s.phone && <p className="ps-list-phone">📞 {s.phone}</p>}
              </a>
            ))}
          </div>
        )}
      </div>

      <BottomNav active="categories" />
    </main>
  );
}
