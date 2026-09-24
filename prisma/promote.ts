/**
 * একবারের CLI — কোনো ইউজারকে ADMIN বানানো।
 * ব্যবহার: npm run db:promote -- 01XXXXXXXXX
 *       বা: npm run db:promote -- user@example.com
 */
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const identifier = process.argv[2]?.trim();
  if (!identifier) {
    console.error("Usage: npm run db:promote -- <phone-or-email>");
    process.exit(1);
  }
  const user = await prisma.user.findFirst({
    where: { OR: [{ phone: identifier }, { email: identifier.toLowerCase() }] },
  });
  if (!user) {
    console.error(`User not found: ${identifier}`);
    process.exit(1);
  }
  await prisma.user.update({ where: { id: user.id }, data: { role: "ADMIN" } });
  console.log(`Promoted to ADMIN: ${user.name} (${identifier})`);
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
