import { notFound } from "next/navigation";
import { services } from "@/data/services";
import { categories } from "@/data/categories";
import TopBar from "@/components/TopBar";
import BottomNav from "@/components/BottomNav";

export default async function ServiceDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const s = services.find((x) => x.id === id);
  if (!s) notFound();
  const c = categories.find((x) => x.id === s.category);

  return (
    <main className="ps-page">
      <TopBar
        title="বিস্তারিত"
        subtitle={s.union}
        backHref={s.union === "কাঞ্চনা" ? "/area" : "/"}
      />

      <div className="ps-content">
        <div className="ps-detail">
          <div className="ps-detail-icon">{c?.icon || "📋"}</div>
          <h1 className="ps-detail-title">{s.name}</h1>
          {s.verified && <span className="ps-badge">✓ যাচাইকৃত সূত্র</span>}
          <p className="ps-list-loc" style={{ marginTop: 10 }}>
            📍 {s.area}
          </p>
          <p className="ps-list-loc">
            ইউনিয়ন/এলাকা: <strong>{s.union}</strong> · {s.upazila}, {s.district}
          </p>
          <p className="ps-detail-desc">{s.description}</p>

          <div className="ps-detail-fields">
            {Object.entries(s.fields).map(([key, value]) => (
              <div key={key} className="ps-field-row">
                <span className="ps-field-label">
                  {c?.fields.find((f) => f.key === key)?.label || key}
                </span>
                <span className="ps-field-value">{value}</span>
              </div>
            ))}
          </div>

          {s.phone && (
            <a href={`tel:${s.phone}`} className="ps-btn-primary ps-btn-block">
              📞 কল — {s.phone}
            </a>
          )}
        </div>
      </div>

      <BottomNav />
    </main>
  );
}
