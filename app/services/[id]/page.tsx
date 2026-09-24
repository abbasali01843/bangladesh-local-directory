import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { subOf } from "@/data/categories";
import { getListing, waNumber, mapsUrl } from "@/lib/listings";
import { listingJsonLd } from "@/lib/seo";
import TopBar from "@/components/TopBar";
import BottomNav from "@/components/BottomNav";
import ClaimButton from "@/components/ClaimButton";
import PhotoUploader from "@/components/PhotoUploader";
import ReviewSection from "@/components/ReviewSection";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const s = await getListing(id);
  // loading.tsx স্ট্রিম শুরুর আগেই 404 — না হলে স্ট্যাটাস 200 থেকে যায়
  if (!s) notFound();
  const loc = [s.area, s.union, s.upazila, s.district].filter(Boolean).join(", ");
  const desc = s.description || `${s.categoryName} — ${loc}`;
  return {
    title: s.name,
    description: desc.slice(0, 160),
    alternates: { canonical: `/services/${s.id}` },
    openGraph: {
      title: `${s.name} — ${s.categoryName}`,
      description: desc.slice(0, 160),
      url: `/services/${s.id}`,
      type: "article",
    },
  };
}

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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(listingJsonLd(s)).replace(/</g, "\\u003c") }}
      />
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
          {s.rating.count > 0 && (
            <span className="ps-badge" style={{ marginLeft: 6 }}>
              ⭐ {s.rating.avg} ({s.rating.count})
            </span>
          )}
          {s.photos.length > 0 && (
            <div className="ps-photo-grid" style={{ marginTop: 12 }}>
              {s.photos.map((p) => (
                <a key={p.id} href={p.url} target="_blank" rel="noopener noreferrer" className="ps-photo-cell">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={p.url} alt={`${s.name}-এর ছবি`} loading="lazy" />
                </a>
              ))}
            </div>
          )}
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

        {s.source === "db" && (
          <div className="ps-detail" style={{ marginTop: 12 }}>
            <PhotoUploader serviceId={s.id} initial={s.photos} />
            <ReviewSection serviceId={s.id} initial={s.reviews} />
          </div>
        )}
      </div>

      <BottomNav />
    </main>
  );
}
