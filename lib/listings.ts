import { prisma } from "@/lib/prisma";
import { categories } from "@/data/categories";

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
  source: "db";
  photos: { id: string; url: string }[];
  rating: { avg: number; count: number };
  reviews: { id: string; rating: number; body: string | null; userName: string; createdAt: string }[];
};

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

export async function getCategoryCounts(): Promise<Record<string, number>> {
  const counts = Object.fromEntries(categories.map((c) => [c.id, 0]));
  try {
    const grouped = await prisma.service.groupBy({
      by: ["categoryId"],
      where: { status: "APPROVED" },
      _count: { _all: true },
    });
    for (const row of grouped) counts[row.categoryId] = row._count._all;
  } catch {
    // Keep zero counts if the database is temporarily unavailable.
  }
  return counts;
}

export async function getListings(opts: {
  category?: string;
  sub?: string;
  union?: string;
  take?: number;
}): Promise<{ list: ListingView[]; source: "db" }> {
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
}

export async function getListing(id: string): Promise<ListingView | null> {
  const row = await prisma.service.findFirst({
    where: { id, status: "APPROVED" },
    include: dbInclude,
  });
  return row ? dbToView(row) : null;
}

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
