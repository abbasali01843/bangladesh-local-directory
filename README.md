# 📍 প্রিয় সাতকানিয়া (Bangladesh Local Directory)

বাংলাদেশের স্থানীয় ব্যবসা, সেবা ও প্রয়োজনীয় তথ্য এক জায়গায় —
**[priyosherpur.com](https://priyosherpur.com/) স্টাইলের** সম্পূর্ণ লোকাল ডিরেক্টরি।

**Live:** [bangladesh-local-directory.vercel.app](https://bangladesh-local-directory.vercel.app)

## Features (Priyo-Sherpur style)

- 🎠 হোমে অটো হিরো স্লাইডার (ব্যানার ক্যারোসেল) + ডট নেভিগেশন
- 📢 ঘূর্ণায়মান বিজ্ঞপ্তি টিকার (নোটিশ মার্কি)
- 🏘️ ইউনিয়ন সমূহ গ্রিড (উপজেলা স্টাইল কার্ড, কাউন্টসহ)
- 📂 ২১টি ক্যাটাগরি → সাব-ক্যাটাগরি গ্রিড → তালিকা → বিস্তারিত
- 📍 এলাকা (ইউনিয়ন) ফিল্টার — প্রতিটি ক্যাটাগরি পেজে
- 🔍 সার্চ (ডেমো + DB)
- 👤 প্রোফাইল / লগইন / রেজিস্টার
- 🛡️ অ্যাডমিন + ওনার ড্যাশবোর্ড
- 💝 সম্মানিত ডোনারবৃন্দ · 🎓 উপদেষ্টা পরিষদ · 🤝 প্রিয় সহযোদ্ধা
- ☎️ যোগাযোগ · 🔒 প্রাইভেসি পলিসি · 🧩 আরও সার্ভিস পেজ
- 📱 মোবাইল-ফার্স্ট UI — প্রিয় শেরপুরের মতো সিম মেনু ও বটম নেভ

## কাস্টমাইজ

| কী বদলাবেন | কোথায় |
|---|---|
| অ্যাপের নাম, ফোন, ইমেইল, FB লিংক | `data/site.ts` |
| ডোনার / উপদেষ্টা / সহযোদ্ধা তালিকা | `data/community.ts` |
| ক্যাটাগরি ও সাব-ক্যাটাগরি | `data/categories.ts` |
| তালিকার তথ্য | `data/services.ts` |
| বিজ্ঞপ্তি / টিকার টেক্সট | `data/notices.ts` |

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
- [x] Sprint 1 — DB-mode hardening (P0 fixes: category seed, admin bootstrap, DB-first pages, search `?q`, claims/users admin UI, my submissions, ESLint 9, CI on PR)
- [x] Sprint 2 — Production hardening + SEO/PWA (security headers, Upstash-ready rate limit, auth validation, sitemap/robots/JSON-LD/OG, PWA icons + service worker)
- [x] Sprint 3 — Depth (EIIN directory, listing photos, reviews+moderation, next/link, error/404 pages, cron cleanup, A11y, vitest)
- [ ] Phase 5 — Real DB live + scale (needs your Postgres; see below)

## Optional: Database

When ready, add Vercel Postgres or Neon and set `DATABASE_URL`, then:

```bash
npx prisma db push
npm run db:seed   # seeds 21 categories + locations (+ admin if ADMIN_* set)
```

### First admin (pick one)

```bash
# A. Seed-time (before db:seed):
ADMIN_PHONE="01XXXXXXXXX" ADMIN_PASSWORD="change-me-123" npm run db:seed

# B. Promote an existing registered user:
npm run db:promote -- 01XXXXXXXXX
```

### Useful scripts

| Script | কাজ |
|---|---|
| `npm run dev` | Dev সার্ভার |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run lint` | ESLint 9 (flat config) |
| `npm run test` | Vitest ইউনিট টেস্ট |
| `npm run db:push` / `db:seed` / `db:promote` | Schema push / seed / make admin |

### Photos, reviews & cron (DB mode)

- Listing photos need Vercel Blob: set `BLOB_READ_WRITE_TOKEN` (else upload API returns 503).
- Reviews are PENDING by default; moderate in Admin → ⭐ রিভিউ ট্যাব.
- Expired sessions are cleaned by `GET /api/cron/cleanup` (daily Vercel Cron, needs `CRON_SECRET`).
