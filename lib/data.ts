import { categories } from '@/data/categories';
import { districts } from '@/data/districts';
import { notices } from '@/data/notices';
import { services } from '@/data/services';
import type { Category, District, Notice, Service } from '@/lib/types';

export function getCategories(): Category[] { return categories; }

export function getCategory(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}

export function getDistricts(): District[] { return districts; }

export function getDistrict(slug: string): District | undefined {
  return districts.find((d) => d.slug === slug);
}

export function getNotices(): Notice[] { return notices; }

export function getServiceCount(categorySlug: string): number {
  return services.filter((s) => s.categorySlug === categorySlug).length;
}

export function getServices(opts: { category?: string; district?: string; q?: string } = {}): Service[] {
  let list = services;
  if (opts.category) list = list.filter((s) => s.categorySlug === opts.category);
  if (opts.district) list = list.filter((s) => s.districtSlug === opts.district);
  if (opts.q) {
    const q = opts.q.toLowerCase();
    list = list.filter((s) =>
      s.name.toLowerCase().includes(q) ||
      s.address.toLowerCase().includes(q) ||
      s.description.toLowerCase().includes(q)
    );
  }
  return list;
}

export function getService(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}

// ডেটাবেজ যুক্ত করার সময় এই ফাংশনগুলো Prisma/DB কলে প্রতিস্থাপন করবেন