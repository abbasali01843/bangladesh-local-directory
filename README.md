# 🇧🇩 Local Hub Bangladesh

বাংলাদেশের স্থানীয় ব্যবসা, সেবা ও প্রয়োজনীয় তথ্য এক জায়গায়।

**Live:** [bangladesh-local-directory.vercel.app](https://bangladesh-local-directory.vercel.app)

## Features

- 🔍 সার্চ (ডেমো + DB)
- 📂 ২১টি ক্যাটাগরি + আসল কাউন্ট
- 📍 জেলা চিপস + লোকেশন ফিল্টার
- 📢 নোটিশ সিস্টেম
- ➕ তথ্য যোগ (DB থাকলে সেভ)
- 👤 প্রোফাইল / লগইন / রেজিস্টার
- 🛡️ অ্যাডমিন + ওনার ড্যাশবোর্ড
- 📞 কল / WhatsApp / ম্যাপ
- 📱 মোবাইল-ফার্স্ট UI (Priyo Sherpur style)

## Mode

| Mode | কখন |
|------|------|
| **Static (ডেমো)** | `DATABASE_URL` না থাকলে — ব্রাউজ/সার্চ কাজ করে |
| **Full (DB)** | Postgres সেট থাকলে — লগইন, সেভ, মডারেশন |

## Tech

Next.js 16 · React 19 · Prisma 6 · PostgreSQL · Vercel

## Roadmap status

- [x] Phase 0 — Stabilization (UI, menu, admin/owner style)
- [x] Phase 1 — Data foundation (demo services, counts, fallback APIs)
- [x] Phase 2 — Security basics (rate limit login/register, validation)
- [x] Phase 3 — Core UX (detail call/map/wa, search fallback)
- [x] Phase 4 — Engagement (notices, profile, about, SEO)
- [ ] Phase 5 — Real DB + images + PWA polish (needs your Postgres)

## Optional: Database

When ready, add Vercel Postgres or Neon and set `DATABASE_URL`, then:

```bash
npx prisma db push
npm run db:seed
```
