# 🇧🇩 Local Hub Bangladesh

বাংলাদেশের স্থানীয় ব্যবসা, সেবা ও প্রয়োজনীয় তথ্য এক জায়গায়।

**Live:** [bangladesh-local-directory.vercel.app](https://bangladesh-local-directory.vercel.app)

## Features

- 🔍 সার্চ (নাম + বিবরণ)
- 📂 ক্যাটাগরি ভিত্তিক ব্রাউজ
- 📍 জেলা → উপজেলা → ইউনিয়ন → এলাকা লোকেশন সিস্টেম
- ➕ তথ্য যোগ করা (মডারেশন সহ)
- 👤 ইউজার রেজিস্ট্রেশন / লগইন
- 🏢 ব্যবসায়ী ক্লেইম সিস্টেম
- 🛡️ অ্যাডমিন প্যানেল (অনুমোদন / প্রত্যাখ্যান)
- ⭐ রিভিউ, রিপোর্ট, ফেভারিট (মডেল রেডি)

## Tech Stack

- **Frontend:** Next.js 16 (App Router) + React 19 + TypeScript
- **Styling:** Tailwind CSS 4 + Custom CSS
- **Database:** PostgreSQL + Prisma 6
- **Auth:** Custom session (scrypt + httpOnly cookie)
- **Deploy:** Vercel

## Getting Started

### 1. Clone & Install

```bash
git clone https://github.com/abbasali01843/bangladesh-local-directory.git
cd bangladesh-local-directory
npm install
```

### 2. Environment

`.env` ফাইল তৈরি করুন:

```env
DATABASE_URL="postgresql://USER:PASSWORD@HOST:5432/DATABASE?sslmode=require"
```

### 3. Database Setup

```bash
npm run db:generate
npm run db:push
npm run db:seed   # (যদি seed থাকে)
```

### 4. Run

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Project Structure

```
app/                  # Next.js App Router pages & API routes
  api/                # Backend API (auth, services, admin, owner)
  add-listing/        # নতুন লিস্টিং যোগ
  admin/              # অ্যাডমিন প্যানেল
  search/             # সার্চ পেজ
  services/           # সার্ভিস লিস্ট ও ডিটেইল
components/           # রিইউজেবল কম্পোনেন্ট
data/                 # স্ট্যাটিক ক্যাটাগরি ও লোকেশন ডেটা
lib/                  # auth.ts, prisma.ts
prisma/               # schema.prisma + seed
```

## Roles

| Role | Access |
|------|--------|
| `USER` | সার্চ, রিভিউ, ফেভারিট, লিস্টিং সাজেস্ট |
| `BUSINESS_OWNER` | নিজের লিস্টিং ম্যানেজ, ক্লেইম |
| `ADMIN` | সব অনুমোদন/প্রত্যাখ্যান, ইউজার ম্যানেজ |

## Roadmap (Priyo Sherpur style)

- [x] Basic structure + Auth + Admin
- [x] Homepage UI improvement
- [ ] More categories + item counts
- [ ] Location selector on homepage
- [ ] Mobile bottom navigation
- [ ] Demo data / better empty states
- [ ] Notice / Announcement system
- [ ] Owner dashboard polish
- [ ] Rate limiting + stronger validation
- [ ] Image upload
- [ ] PWA / App-like experience

## Contributing

Pull requests are welcome. For major changes, please open an issue first.

## License

Private / All rights reserved (for now).
