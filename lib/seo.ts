import { site, siteUrl } from "@/data/site";
import type { ListingView } from "@/lib/listings";

/** হোমপেজের WebSite JSON-LD (সার্চ-অ্যাকশনসহ)। */
export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: site.name,
    alternateName: site.nameEn,
    url: siteUrl,
    inLanguage: "bn",
    potentialAction: {
      "@type": "SearchAction",
      target: `${siteUrl}/search?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}

/** তালিকার LocalBusiness JSON-LD — ডিরেক্টরি SEO-র মূল অস্ত্র। */
export function listingJsonLd(v: ListingView) {
  const addr = [v.area, v.union, v.upazila, v.district].filter(Boolean).join(", ");
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: v.name,
    description: v.description || `${v.categoryName} — ${addr}`,
    url: `${siteUrl}/services/${v.id}`,
    image: `${siteUrl}/og.png`,
    telephone: v.phone || undefined,
    email: v.email || undefined,
    address: {
      "@type": "PostalAddress",
      streetAddress: v.area || undefined,
      addressLocality: v.upazila,
      addressRegion: v.district,
      addressCountry: "BD",
    },
    geo:
      v.latitude != null && v.longitude != null
        ? { "@type": "GeoCoordinates", latitude: v.latitude, longitude: v.longitude }
        : undefined,
    areaServed: addr,
    priceRange: undefined,
  };
}
