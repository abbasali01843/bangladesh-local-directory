import { PrismaClient } from "@prisma/client";
import locations from "../data/bangladesh-locations.bn.json";
import { categories } from "../data/categories";
import { hashPassword } from "../lib/password";

const prisma = new PrismaClient();
const slug = (s: string) =>
  s.toLowerCase().replace(/[^\p{L}\p{N}]+/gu, "-").replace(/^-|-$/g, "");

async function seedCategories() {
  for (const c of categories) {
    // Static id-ই DB id — ফলে data/categories.ts-এর id সরাসরি FK হিসেবে চলে।
    const cat = await prisma.category.upsert({
      where: { id: c.id },
      update: { name: c.name, icon: c.icon, slug: c.id },
      create: { id: c.id, name: c.name, slug: c.id, icon: c.icon },
    });
    for (const f of c.fields) {
      await prisma.categoryField.upsert({
        where: { categoryId_key: { categoryId: cat.id, key: f.key } },
        update: { label: f.label, type: f.type },
        create: { categoryId: cat.id, key: f.key, label: f.label, type: f.type },
      });
    }
  }
  console.log(`Categories seeded: ${categories.length}`);
}

type NameVal = { title: string; value: string | number };
const upazilasByDistrict = locations.upazilas_bn as unknown as Record<string, NameVal[]>;
const unionsByUpazila = locations.unions_bn as unknown as Record<string, NameVal[]>;

async function seedLocations() {
  const districts: Record<string, NameVal & { divisionId: string }> = {};
  for (const [divisionId, items] of Object.entries(locations.districts_bn))
    for (const d of items as NameVal[]) districts[String(d.value)] = { ...d, divisionId };
  let upCount = 0, unCount = 0;
  for (const d of Object.values(districts)) {
    const district = await prisma.district.upsert({
      where: { slug: slug(d.title) },
      update: { name: d.title },
      create: { name: d.title, slug: slug(d.title) },
    });
    const ups = upazilasByDistrict[String(d.value)] || [];
    for (const u of ups) {
      const up = await prisma.upazila.upsert({
        where: { districtId_slug: { districtId: district.id, slug: slug(u.title) } },
        update: { name: u.title },
        create: { name: u.title, slug: slug(u.title), districtId: district.id },
      });
      upCount++;
      const unions = unionsByUpazila[String(u.value)] || [];
      // Concurrent chunks — একটা একটা করে ~৫০০০ upsert অনেক ধীর
      const CHUNK = 10;
      for (let i = 0; i < unions.length; i += CHUNK) {
        const batch = unions.slice(i, i + CHUNK);
        await Promise.all(
          batch.map((x) =>
            prisma.union.upsert({
              where: { upazilaId_slug: { upazilaId: up.id, slug: slug(x.title) } },
              update: { name: x.title },
              create: { name: x.title, slug: slug(x.title), upazilaId: up.id },
            })
          )
        );
        unCount += batch.length;
      }
    }
  }
  console.log(`Locations seeded: ${Object.keys(districts).length} districts, ${upCount} upazilas, ${unCount} unions`);
}

async function seedAdmin() {
  const phone = process.env.ADMIN_PHONE?.trim() || null;
  const email = process.env.ADMIN_EMAIL?.trim()?.toLowerCase() || null;
  const password = process.env.ADMIN_PASSWORD || "";
  const name = process.env.ADMIN_NAME?.trim() || "অ্যাডমিন";
  if ((!phone && !email) || password.length < 8) {
    console.log("Admin seed skipped — set ADMIN_PHONE (or ADMIN_EMAIL) + ADMIN_PASSWORD (8+ chars) to create one.");
    return;
  }
  const where = phone ? { phone } : { email: email as string };
  const existing = await prisma.user.findFirst({ where });
  if (existing) {
    await prisma.user.update({ where: { id: existing.id }, data: { role: "ADMIN" } });
    console.log(`Admin ensured (existing user promoted): ${phone || email}`);
    return;
  }
  await prisma.user.create({
    data: { name, phone, email, passwordHash: hashPassword(password), role: "ADMIN" },
  });
  console.log(`Admin created: ${phone || email}`);
}

async function main() {
  await seedCategories();
  await seedLocations();
  await seedAdmin();
  console.log("Seed complete");
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
