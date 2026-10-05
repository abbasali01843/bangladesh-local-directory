import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import TopBar from "@/components/TopBar";
import BottomNav from "@/components/BottomNav";

export default async function UnionPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const union = await prisma.union.findUnique({
    where: { upazilaId_slug: { upazilaId: "u_15_74", slug } },
  });
  if (!union || union.id === "un_15_74_4621") notFound();

  const [areas, health, education, services] = await Promise.all([
    prisma.area.findMany({
      where: { unionId: union.id, verificationLevel: { not: "ARCHIVED" } },
      orderBy: [{ type: "asc" }, { name: "asc" }],
    }),
    prisma.service.findMany({
      where: {
        unionId: union.id,
        status: "APPROVED",
        category: { name: { contains: "স্বাস্থ্য" } },
      },
      include: { area: true },
      orderBy: { name: "asc" },
      take: 20,
    }),
    prisma.service.findMany({
      where: {
        unionId: union.id,
        status: "APPROVED",
        category: { name: { contains: "শিক্ষা" } },
      },
      include: { area: true },
      orderBy: { name: "asc" },
      take: 20,
    }),
    prisma.service.findMany({
      where: { unionId: union.id, status: "APPROVED" },
      include: { category: true, area: true },
      orderBy: { name: "asc" },
      take: 50,
    }),
  ]);

  const villages = areas.filter(a => a.type === "VILLAGE");
  const mauzas = areas.filter(a => a.type === "MAUZA");
  const markets = areas.filter(a => a.type === "MARKET");
  const landmarks = areas.filter(a => a.type === "LANDMARK");

  return (
    <main className="ps-page">
      <TopBar title={union.name} subtitle="সাতকানিয়া · চট্টগ্রাম" backHref="/satkania" />
      <div className="ps-content">
        <div className="ps-directory-hero">
          <div className="ps-directory-kicker">UNION DIRECTORY · SATKANIA</div>
          <h1 className="ps-directory-title">{union.name} ইউনিয়ন</h1>
          <p className="ps-directory-sub">স্থানীয় এলাকা, প্রতিষ্ঠান ও সেবার তথ্য এক জায়গায়।</p>
          <div className="ps-stat-grid">
            <div className="ps-stat"><b>{villages.length}</b><span>গ্রাম</span></div>
            <div className="ps-stat"><b>{mauzas.length}</b><span>মৌজা</span></div>
            <div className="ps-stat"><b>{services.length}</b><span>সেবা</span></div>
          </div>
        </div>

        <div className="ps-section-head"><span className="ps-section-icon">🌾</span><h2>গ্রাম ({villages.length})</h2></div>
        <div className="ps-chips" style={{ marginBottom: 16 }}>
          {villages.length ? villages.map(v => <span key={v.id} className="ps-chip">{v.name}</span>) : <p className="ps-section-note">গ্রামের তথ্য এখনো যোগ করা হয়নি।</p>}
        </div>

        {mauzas.length > 0 && <>
          <div className="ps-section-head"><span className="ps-section-icon">📍</span><h2>মৌজা ({mauzas.length})</h2></div>
          <div className="ps-chips" style={{ marginBottom: 16 }}>{mauzas.map(a => <span key={a.id} className="ps-chip">{a.name}</span>)}</div>
        </>}

        {markets.length > 0 && <>
          <div className="ps-section-head"><span className="ps-section-icon">🛍️</span><h2>বাজার ({markets.length})</h2></div>
          <div className="ps-chips" style={{ marginBottom: 16 }}>{markets.map(a => <span key={a.id} className="ps-chip">{a.name}</span>)}</div>
        </>}

        {landmarks.length > 0 && <>
          <div className="ps-section-head"><span className="ps-section-icon">📌</span><h2>গুরুত্বপূর্ণ স্থান ({landmarks.length})</h2></div>
          <div className="ps-chips" style={{ marginBottom: 16 }}>{landmarks.map(a => <span key={a.id} className="ps-chip">{a.name}</span>)}</div>
        </>}

        <div className="ps-section-head"><span className="ps-section-icon">🏥</span><h2>স্বাস্থ্যসেবা ({health.length})</h2></div>
        <div>{health.length ? health.map(s => (
          <Link key={s.id} href={"/services/" + s.id} className="ps-prof-card">
            <div className="ps-doctor-head"><div className="ps-doctor-avatar">🏥</div><div className="ps-doctor-main"><h3 className="ps-doctor-name">{s.name}</h3><div className="ps-doctor-specialty">{s.subcategory || "স্বাস্থ্যসেবা"}</div></div><span className="ps-verified">{s.verificationLevel}</span></div>
            <div className="ps-meta-grid"><div className="ps-meta"><span className="ps-meta-label">এলাকা</span><span className="ps-meta-value">{s.area?.name || union.name}</span></div></div>
          </Link>
        )) : <p className="ps-section-note">এই ইউনিয়নের স্বাস্থ্যসেবা এখনো যোগ করা হয়নি।</p>}</div>

        <div className="ps-section-head"><span className="ps-section-icon">🎓</span><h2>শিক্ষা ({education.length})</h2></div>
        <div>{education.length ? education.map(s => (
          <Link key={s.id} href={"/services/" + s.id} className="ps-prof-card">
            <div className="ps-doctor-head"><div className="ps-doctor-avatar">🎓</div><div className="ps-doctor-main"><h3 className="ps-doctor-name">{s.name}</h3><div className="ps-doctor-specialty">{s.subcategory || "শিক্ষা প্রতিষ্ঠান"}</div></div></div>
            <div className="ps-meta-grid"><div className="ps-meta"><span className="ps-meta-label">এলাকা</span><span className="ps-meta-value">{s.area?.name || union.name}</span></div></div>
          </Link>
        )) : <p className="ps-section-note">এই ইউনিয়নের শিক্ষা প্রতিষ্ঠানের তথ্য এখনো যোগ করা হয়নি।</p>}</div>

        <div className="ps-section-head"><span className="ps-section-icon">📋</span><h2>অন্যান্য সেবা ({services.length})</h2></div>
        <div className="ps-chips" style={{ marginBottom: 16 }}>
          {services.map(s => <Link key={s.id} href={"/services/" + s.id} className="ps-chip">{s.name}</Link>)}
        </div>
      </div>
      <BottomNav active="home" />
    </main>
  );
}
