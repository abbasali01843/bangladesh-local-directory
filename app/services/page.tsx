import { services, countInSub, unionsInCategory } from "@/data/services";
import { categories, subOf } from "@/data/categories";
import TopBar from "@/components/TopBar";
import BottomNav from "@/components/BottomNav";

type Params = { category?: string; sub?: string; union?: string };

function hrefWith(p: Params, patch: Partial<Params>) {
  const next = { ...p, ...patch };
  const q = Object.entries(next)
    .filter(([, v]) => v)
    .map(([k, v]) => `${k}=${encodeURIComponent(v as string)}`)
    .join("&");
  return `/services${q ? `?${q}` : ""}`;
}

export default async function ServicesPage({
  searchParams,
}: {
  searchParams: Promise<Params>;
}) {
  const p = await searchParams;
  const category = p.category ? categories.find((c) => c.id === p.category) : undefined;
  const sub = category && p.sub ? subOf(category.id, p.sub as string) : undefined;

  let list = p.category ? services.filter((s) => s.category === p.category) : services;
  if (sub) list = list.filter((s) => s.subcategory === sub.id);
  if (p.union) list = list.filter((s) => s.union === p.union);

  const unions = category ? unionsInCategory(category.id) : [];
  const title = category ? (sub ? `${category.name} — ${sub.name}` : category.name) : "সকল সেবা";

  return (
    <main className="ps-page">
      <TopBar
        title={title}
        subtitle={`${list.length} টি তথ্য`}
        backHref={category ? "/categories" : "/"}
      />

      <div className="ps-content">
        {/* ===== সাব-ক্যাটাগরি গ্রিড — priyosherpur ক্যাটাগরি পেজের মতো ===== */}
        {category?.subcategories && (
          <>
            <div className="ps-section-head">
              <span className="ps-section-icon">{category.icon}</span>
              <h2>{category.name}</h2>
            </div>
            <div className="ps-cat-grid" style={{ marginBottom: 14 }}>
              <a
                href={hrefWith({ category: category.id, union: p.union }, {})}
                className={`ps-cat-card${!sub ? " active" : ""}`}
              >
                <div className="ps-cat-icon-wrap">
                  <span className="ps-cat-icon">📋</span>
                </div>
                <div className="ps-cat-name">সকল</div>
                <div className="ps-cat-count">
                  {category.subcategories.reduce((n, s) => n + countInSub(category.id, s.id), 0)} টি
                </div>
              </a>
              {category.subcategories.map((s) => {
                const n = countInSub(category.id, s.id);
                return (
                  <a
                    key={s.id}
                    href={hrefWith(
                      { category: category.id, sub: sub?.id === s.id ? undefined : s.id, union: p.union },
                      {}
                    )}
                    className={`ps-cat-card${sub?.id === s.id ? " active" : ""}`}
                  >
                    <div className="ps-cat-icon-wrap">
                      <span className="ps-cat-icon">{s.icon || category.icon}</span>
                    </div>
                    <div className="ps-cat-name">{s.name}</div>
                    <div className="ps-cat-count">
                      {n > 0 ? `${n} টি তথ্য` : "কোনো তথ্য নেই"}
                    </div>
                  </a>
                );
              })}
            </div>
          </>
        )}

        {/* ===== ইউনিয়ন ফিল্টার — priyosherpur-এর উপজেলা ফিল্টার ===== */}
        {category && unions.length > 1 && (
          <>
            <div className="ps-section-head">
              <span className="ps-section-icon">📍</span>
              <h2>এলাকা ফিল্টার</h2>
            </div>
            <div className="ps-chips">
              <a
                href={hrefWith(p, { union: undefined })}
                className="ps-chip"
                style={!p.union ? { borderColor: "#0a7a3e", color: "#0a7a3e", fontWeight: 800 } : undefined}
              >
                সকল এলাকা
              </a>
              {unions.map((u) => {
                const n = services.filter(
                  (s) =>
                    s.category === category.id &&
                    (!sub || s.subcategory === sub.id) &&
                    s.union === u
                ).length;
                const active = p.union === u;
                return (
                  <a
                    key={u}
                    href={hrefWith(p, { union: active ? undefined : u })}
                    className="ps-chip"
                    style={active ? { borderColor: "#0a7a3e", color: "#0a7a3e", fontWeight: 800 } : undefined}
                  >
                    {u} ({n})
                  </a>
                );
              })}
            </div>
          </>
        )}

        {/* ===== তালিকা ===== */}
        {list.length === 0 ? (
          <div className="ps-empty">
            <div className="ps-empty-icon">{category?.icon || "📋"}</div>
            <h2>কোনো তথ্য নেই</h2>
            <p>এই ফিল্টারে এখনো তথ্য নেই। আপনিই প্রথম যোগ করতে পারেন।</p>
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
                {s.subcategory && category && (
                  <p className="ps-list-sub">
                    🏷️ {subOf(s.category, s.subcategory)?.name || s.subcategory}
                  </p>
                )}
                <p className="ps-list-loc">
                  📍 {s.union} · {s.area}
                </p>
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
