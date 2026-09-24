import { notFound } from "next/navigation";
import { subOf } from "@/data/categories";
import { getListing, waNumber, mapsUrl } from "@/lib/listings";
import TopBar from "@/components/TopBar";
import BottomNav from "@/components/BottomNav";
import ClaimButton from "@/components/ClaimButton";

export default async function ServiceDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const s = await getListing(id);
  if (!s) notFound();

  const wa = s.phone ? waNumber(s.phone) : null;
  const subName = s.subcategory ? subOf(s.category, s.subcategory)?.name : null;

  return (
    <main className="ps-page">
      <TopBar
        title="বিস্তারিত"
        subtitle={s.union || s.upazila}
        backHref={s.union === "কাঞ্চনা" ? "/area" : `/services?category=${s.category}`}
      />

      <div className="ps-content">
        <div className="ps-detail">
          <div className="ps-detail-icon">{s.categoryIcon}</div>
          <h1 className="ps-detail-title">{s.name}</h1>
          <p className="ps-list-loc">
            🏷️ {s.categoryName}
            {subName ? ` — ${subName}` : ""}
          </p>
          {s.verified && <span className="ps-badge">✓ যাচাইকৃত</span>}
          <p className="ps-list-loc" style={{ marginTop: 10 }}>
            📍 {[s.area, s.union].filter(Boolean).join(", ") || `${s.upazila}, ${s.district}`}
          </p>
          <p className="ps-list-loc">
            {s.union ? (
              <>ইউনিয়ন/এলাকা: <strong>{s.union}</strong> · {s.upazila}, {s.district}</>
            ) : (
              <>{s.upazila}, {s.district}</>
            )}
          </p>
          {s.description && <p className="ps-detail-desc">{s.description}</p>}

          {s.fields.length > 0 && (
            <div className="ps-detail-fields">
              {s.fields.map((f, i) => (
                <div key={i} className="ps-field-row">
                  <span className="ps-field-label">{f.label}</span>
                  <span className="ps-field-value">{f.value}</span>
                </div>
              ))}
            </div>
          )}

          {s.email && (
            <p className="ps-list-loc">
              ✉️ <a href={`mailto:${s.email}`}>{s.email}</a>
            </p>
          )}

          {s.phone && (
            <a href={`tel:${s.phone}`} className="ps-btn-primary ps-btn-block">
              📞 কল — {s.phone}
            </a>
          )}

          <div className="ps-detail-actions">
            {wa && (
              <a
                href={`https://wa.me/${wa}?text=${encodeURIComponent(`আসসালামু আলাইকুম, ${s.name} সম্পর্কে জানতে চাই।`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="ps-btn-ghost"
              >
                💬 WhatsApp
              </a>
            )}
            <a href={mapsUrl(s)} target="_blank" rel="noopener noreferrer" className="ps-btn-ghost">
              🗺️ ম্যাপে দেখুন
            </a>
          </div>

          {s.source === "db" && <ClaimButton id={s.id} />}
        </div>
      </div>

      <BottomNav />
    </main>
  );
}
