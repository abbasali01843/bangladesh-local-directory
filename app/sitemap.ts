import type { MetadataRoute } from "next";
import { siteUrl } from "@/data/site";
import { categories } from "@/data/categories";
import { services as staticServices } from "@/data/services";
import { prisma } from "@/lib/prisma";

const STATIC_PAGES = [
  "",
  "/categories",
  "/services",
  "/search",
  "/area",
  "/add-listing",
  "/notices",
  "/about",
  "/contact",
  "/privacy",
  "/donors",
  "/advisory",
  "/partners",
  "/more-services",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const urls: MetadataRoute.Sitemap = STATIC_PAGES.map((p) => ({
    url: siteUrl + p,
    lastModified: now,
    changeFrequency: p === "" ? "daily" : "weekly",
    priority: p === "" ? 1 : 0.7,
  }));

  for (const c of categories) {
    urls.push({
      url: `${siteUrl}/services?category=${c.id}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    });
  }

  // Static ডেমো তালিকা
  for (const s of staticServices) {
    urls.push({
      url: `${siteUrl}/services/${s.id}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    });
  }

  // DB-তে APPROVED থাকলে সেগুলোও (best-effort)
  try {
    const rows = await prisma.service.findMany({
      where: { status: "APPROVED" },
      select: { id: true, updatedAt: true },
      take: 5000,
    });
    for (const r of rows) {
      urls.push({
        url: `${siteUrl}/services/${r.id}`,
        lastModified: r.updatedAt,
        changeFrequency: "weekly",
        priority: 0.6,
      });
    }
  } catch {
    // DB নেই — static দিয়েই sitemap
  }

  return urls;
}
