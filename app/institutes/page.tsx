import type { Metadata } from "next";
import { satkaniaInstitutes, directorySources } from "@/data/satkania";
import TopBar from "@/components/TopBar";
import BottomNav from "@/components/BottomNav";

type Params = { q?: string; type?: string; union?: string };

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<Params>;
}): Promise<Metadata> {
  const p = await searchParams;
  const parts = [p.type, p.union, p.q].filter(Boolean);
  return {
    title: parts.length ? `শিক্ষা প্রতিষ্ঠান — ${parts.join(" · ")}` : "সাতকানিয়ার শিক্ষা প্রতিষ্ঠান (EIIN)",
    description: `সাতকানিয়া উপজেলার স্কুল, কলেজ ও মাদ্রাসার EIIN-সহ তালিকা। মোট ${satkaniaInstitutes.length}টি প্রতিষ্ঠান।`,
  };
}

export default async function InstitutesPage({
  searchParams,
}: {
  searchParams: Promise<Params>;
}) {
  const p = await searchParams;
  const q = (p.q || "").trim().toLowerCase();
  const types = [...new Set(satkaniaInstitutes.map((s) => s.type))].sort();
  const unions = [...new Set(satkaniaInstitutes.map((s) => s.union).filter((u): u is string => !!u))].sort();

  let list = satkaniaInstitutes;
  if (p.type) list = list.filter((s) => s.type === p.type);
  if (p.union) list = list.filter((s) => s.union === p.union);
  if (q) {
    list = list.filter(
      (s) =>
        s.name.toLowerCase().includes(q) ||
        s.nameEn.toLowerCase().includes(q) ||
        s.eiin.includes(q)
    );
  }

  return (
    <main className="ps-page">
      <TopBar
        title="শিক্ষা প্রতিষ্ঠান"
        subtitle={`${list.length}টি (EIIN-সহ)`}
        backHref="/area"
      />

      <div className="ps-content">
        <form action="/institutes" method="get" className="ps-search">
          <span className="ps-search-icon">🔍</span>
          <input
            name="q"
            type="search"
            defaultValue={p.q || ""}
            placeholder="নাম বা EIIN দিয়ে খুঁজুন..."
            aria-label="প্রতিষ্ঠান খুঁজুন"
          />
        </form>

        <form action="/institutes" method="get" className="ps-filters">
          <input type="hidden" name="q" value={p.q || ""} />
          <select name="type" defaultValue={p.type || ""} className="ps-select" aria-label="ধরন">
            <option value="">সব ধরন</option>
            {types.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
          <select name="union" defaultValue={p.union || ""} className="ps-select" aria-label="ইউনিয়ন">
            <option value="">সব ইউনিয়ন</option>
            {unions.map((u) => (
              <option key={u} value={u}>
                {u}
              </option>
            ))}
          </select>
          <button type="submit" className="ps-btn-primary">
            ফিল্টার
          </button>
        </form>

        {list.length === 0 ? (
          <div className="ps-empty">
            <div className="ps-empty-icon">🏫</div>
            <h2>কোনো প্রতিষ্ঠান নেই</h2>
            <p>অন্য নাম, EIIN বা ফিল্টার দিয়ে চেষ্টা করুন।</p>
          </div>
        ) : (
          <div className="ps-list">
            {list.map((s) => (
              <div key={s.eiin} className="ps-list-card">
                <div className="ps-list-top">
                  <strong>{s.name}</strong>
                  <span className="ps-badge">EIIN {s.eiin}</span>
                </div>
                <p className="ps-list-loc">
                  🏫 {s.type}
                  {s.union ? ` · 📍 ${s.union}` : ""}
                  {s.area ? ` (${s.area})` : ""}
                </p>
                <p className="ps-list-desc">{s.nameEn}</p>
                {s.note && <p className="ps-list-desc">ℹ️ {s.note}</p>}
              </div>
            ))}
          </div>
        )}

        <div className="ps-list-card" style={{ marginTop: 16 }}>
          <p className="ps-list-desc">
            📚 সূত্র:{" "}
            {directorySources.map((d, i) => (
              <span key={d.url}>
                {i > 0 && " · "}
                <a href={d.url} target="_blank" rel="noopener noreferrer">
                  {d.credit}
                </a>
              </span>
            ))}
          </p>
          <p className="ps-list-desc">
            ইউনিয়ন শুধু সেখানেই লেখা যেখানে প্রতিষ্ঠানের নামেই নিশ্চিত।
          </p>
        </div>
      </div>

      <BottomNav />
    </main>
  );
}
