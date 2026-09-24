import { prisma } from "@/lib/prisma";
import { services as staticServices } from "@/data/services";
import { categories } from "@/data/categories";

/** DB ও static — দুই উৎসের একরকম ডিসপ্লে শেপ। */
export type ListingView = {
  id: string;
  name: string;
  category: string;
  categoryName: string;
  categoryIcon: string;
  subcategory: string | null;
  district: string;
  upazila: string;
  union: string;
  area: string;
  phone: string;
  email: string;
  verified: boolean;
  verificationStatus: string;
  description: string;
  fields: { label: string; value: string }[];
  latitude: number | null;
  longitude: number | null;
  source: "db" | "static";
  photos: { id: string; url: string }[];
  rating: { avg: number; count: number };
  reviews: { id: string; rating: number; body: string | null; userName: string; createdAt: string }[];
};

function staticToView(
  s: (typeof staticServices)[number]
): ListingView {
  const c = categories.find((x) => x.id === s.category);
  return {
    id: s.id,
    name: s.name,
    category: s.category,
    categoryName: c?.name || s.category,
    categoryIcon: c?.icon || "📋",
    subcategory: s.subcategory || null,
    district: s.district,
    upazila: s.upazila,
    union: s.union,
    area: s.area,
    phone: s.phone || "",
    email: "",
    verified: s.verified,
    verificationStatus: s.verified ? "VERIFIED" : "UNVERIFIED",
    description: s.description,
    fields: Object.entries(s.fields).map(([key, value]) => ({
      label: c?.fields.find((f) => f.key === key)?.label || key,
      value,
    })),
    latitude: null,
    longitude: null,
    source: "static",
    photos: [],
    rating: { avg: 0, count: 0 },
    reviews: [],
  };
}

type DbService = {
  id: string;
  name: string;
  categoryId: string;
  subcategory: string | null;
  phone: string | null;
  email: string | null;
  address: string | null;
  description: string | null;
  latitude: number | null;
  longitude: number | null;
  verificationStatus: string;
  category: { name: string; icon: string | null };
  district: { name: string };
  upazila: { name: string };
  union: { name: string } | null;
  area: { name: string } | null;
  fields: { value: string; field: { key: string; label: string } }[];
  photos: { id: string; url: string }[];
  reviews: { id: string; rating: number; body: string | null; createdAt: Date; user: { name: string } }[];
};

function dbToView(s: DbService): ListingView {
  const c = categories.find((x) => x.id === s.categoryId);
  const ratings = s.reviews.map((r) => r.rating);
  const avg = ratings.length ? ratings.reduce((a, b) => a + b, 0) / ratings.length : 0;
  return {
    id: s.id,
    name: s.name,
    category: s.categoryId,
    categoryName: s.category.name,
    categoryIcon: s.category.icon || c?.icon || "📋",
    subcategory: s.subcategory,
    district: s.district.name,
    upazila: s.upazila.name,
    union: s.union?.name || "",
    area: s.area?.name || s.address || "",
    phone: s.phone || "",
    email: s.email || "",
    verified: s.verificationStatus !== "UNVERIFIED",
    verificationStatus: s.verificationStatus,
    description: s.description || "",
    fields: s.fields.map((f) => ({ label: f.field.label, value: f.value })),
    latitude: s.latitude,
    longitude: s.longitude,
    source: "db",
    photos: s.photos.map((p) => ({ id: p.id, url: p.url })),
    rating: { avg: Math.round(avg * 10) / 10, count: ratings.length },
    reviews: s.reviews.map((r) => ({
      id: r.id,
      rating: r.rating,
      body: r.body,
      userName: r.user.name,
      createdAt: r.createdAt instanceof Date ? r.createdAt.toISOString() : String(r.createdAt),
    })),
  };
}

const dbInclude = {
  category: true,
  district: true,
  upazila: true,
  union: true,
  area: true,
  fields: { include: { field: true } },
  photos: { orderBy: { sortOrder: "asc" } },
  reviews: {
    where: { status: "APPROVED" },
    include: { user: { select: { name: true } } },
    orderBy: { createdAt: "desc" },
    take: 20,
  },
} as const;

/** তালিকা — DB আগে, না থাকলে static। */
export async function getListings(opts: {
  category?: string;
  sub?: string;
  union?: string;
  take?: number;
}): Promise<{ list: ListingView[]; source: "db" | "static" }> {
  try {
    const rows = await prisma.service.findMany({
      where: {
        status: "APPROVED",
        ...(opts.category ? { categoryId: opts.category } : {}),
        ...(opts.sub ? { subcategory: opts.sub } : {}),
        ...(opts.union ? { union: { name: opts.union } } : {}),
      },
      include: dbInclude,
      orderBy: { createdAt: "desc" },
      take: opts.take || 200,
    });
    return { list: rows.map(dbToView), source: "db" };
  } catch {
    let list = staticServices;
    if (opts.category) list = list.filter((s) => s.category === opts.category);
    if (opts.sub) list = list.filter((s) => s.subcategory === opts.sub);
    if (opts.union) list = list.filter((s) => s.union === opts.union);
    return { list: list.map(staticToView), source: "static" };
  }
}

/** বিস্তারিত — DB-তে APPROVED খুঁজে, না পেলে static id মিলিয়ে। */
export async function getListing(id: string): Promise<ListingView | null> {
  try {
    const row = await prisma.service.findFirst({
      where: { id, status: "APPROVED" },
      include: dbInclude,
    });
    if (row) return dbToView(row);
  } catch {
    // DB নেই — নিচে static fallback
  }
  const s = staticServices.find((x) => x.id === id);
  return s ? staticToView(s) : null;
}

/** বাংলাদেশি মোবাইল → wa.me নম্বর (8801XXXXXXXXX); না হলে null। */
export function waNumber(phone: string): string | null {
  const d = phone.replace(/\D/g, "");
  const norm = d.startsWith("880")
    ? d
    : d.startsWith("01") && d.length === 11
      ? "880" + d.slice(1)
      : null;
  return norm && /^8801[3-9]\d{8}$/.test(norm) ? norm : null;
}

export function mapsUrl(v: ListingView): string {
  if (v.latitude != null && v.longitude != null)
    return `https://www.google.com/maps/search/?api=1&query=${v.latitude},${v.longitude}`;
  const q = [v.name, v.area, v.upazila, v.district].filter(Boolean).join(", ");
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`;
}
