import Link from "next/link";
import { prisma } from "@/lib/prisma";
import TopBar from "@/components/TopBar";
import BottomNav from "@/components/BottomNav";

export default async function SatkaniaPage() {
  const paur = await prisma.union.findFirst({ where: { id: "un_15_74_4621" } });
  const [wards, mahallas, villages, health, doctorCount] = await Promise.all([
    prisma.area.findMany({ where: { unionId: "un_15_74_4621" }, orderBy: { name: "asc" } }),
    prisma.area.findMany({ where: { unionId: "un_15_74_4621" }, orderBy: { name: "asc" } }),
    prisma.area.findMany({ where: { unionId: "un_15_74_4621" }, orderBy: { name: "asc" } }),
    prisma.service.findMany({
      where: {
        status: "APPROVED",
        upazila: { name: { contains: "সাতকান" } },
        category: { name: { contains: "স্বাস্থ্য" } },
      },
      include: { union: true, area: true },
      orderBy: { name: "asc" },
      take: 100,
    }),
    prisma.doctor.count({
      where: {
        chambers: {
          some: { service: { upazila: { name: { contains: "সাতকান" } } } },
        },
      },
    }),
  ]);

  return (
    <main className="ps-page">
      <TopBar title="সাতকানিয়া উপজেলা" subtitle="চট্টগ্রাম" backHref="/" />
      <div className="ps-content">
        <div className="ps-detail" style={{ marginBottom: 16 }}>
          <div className="ps-detail-icon">📍</div>
          <h1 className="ps-detail-title">সাতকানিয়া উপজেলা</h1>
          <p className="ps-list-loc">১টি পৌরসভা · ১৭টি ইউনিয়ন · ৯টি পৌর ওয়ার্ড</p>
          <p className="ps-detail-desc">২০২২ জনশুমারি অনুযায়ী ৭৩টি মৌজা ও ৮৪টি গ্রাম।</p>
        </div>

        <div className="ps-section-head"><span className="ps-section-icon">🏛️</span><h2>পৌরসভা</h2></div>
        <div className="ps-list-card">
          <div className="ps-list-top"><strong>{paur?.name || "সাতকানিয়া পৌরসভা"}</strong><span className="ps-badge">৯ ওয়ার্ড</span></div>
          <p className="ps-list-desc">১৯টি মহল্লা</p>
        </div>

        <div className="ps-section-head"><span className="ps-section-icon">🏘️</span><h2>পৌর ওয়ার্ড ({wards.length})</h2></div>
        <div className="ps-chips" style={{ marginBottom: 16 }}>
          {wards.map(w => <span key={w.id} className="ps-chip">{w.name}</span>)}
        </div>

        <div className="ps-section-head"><span className="ps-section-icon">🏠</span><h2>পৌর মহল্লা ({mahallas.length})</h2></div>
        <div className="ps-chips" style={{ marginBottom: 16 }}>
          {mahallas.map(m => <span key={m.id} className="ps-chip">{m.name}</span>)}
        </div>

        <div className="ps-section-head"><span className="ps-section-icon">🌾</span><h2>গ্রাম ({villages.length})</h2></div>
        <div className="ps-chips" style={{ marginBottom: 16 }}>
          {villages.map(v => <span key={v.id} className="ps-chip">{v.name}</span>)}
        </div>

        <div className="ps-section-head">
          <span className="ps-section-icon">👨‍⚕️</span><h2>ডাক্তার ({doctorCount})</h2><Link href="/doctors" className="ps-section-more">দেখুন ›</Link>
        </div>

        <div className="ps-section-head">
          <span className="ps-section-icon">🏥</span>
          <h2>স্বাস্থ্যসেবা ({health.length})</h2>
          <Link href="/services?category=health" className="ps-section-more">সব ›</Link>
        </div>
        <div className="ps-list">
          {health.map(s => (
            <Link key={s.id} href={`/services/${s.id}`} className="ps-list-card">
              <div className="ps-list-top">
                <strong>{s.name}</strong>
                <span className="ps-badge">✓ {s.verificationLevel}</span>
              </div>
              <p className="ps-list-loc">📍 {[s.union?.name, s.area?.name].filter(Boolean).join(" · ") || "সাতকানিয়া"}</p>
              {s.subcategory && <p className="ps-list-sub">🏷️ {s.subcategory}</p>}
            </Link>
          ))}
        </div>
      </div>
      <BottomNav active="home" />
    </main>
  );
}
