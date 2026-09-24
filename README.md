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
- [ ] Phase 5 — Real DB + images + PWA polish (needs your Postgres)

## Optional: Database

When ready, add Vercel Postgres or Neon and set `DATABASE_URL`, then:

```bash
npx prisma db push
npm run db:seed
```
