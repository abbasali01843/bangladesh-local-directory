import Link from "next/link";
import { prisma } from "@/lib/prisma";
import TopBar from "@/components/TopBar";
import BottomNav from "@/components/BottomNav";

export default async function SatkaniaPage() {
  const paurId = "un_15_74_4621";
  const [paur, ruralUnions, wards, mahallas, villages, health, doctorCount] = await Promise.all([
    prisma.union.findUnique({ where: { id: paurId } }),
    prisma.union.findMany({ where: { upazilaId: "u_15_74", id: { not: paurId } }, orderBy: { name: "asc" } }),
    prisma.area.findMany({ where: { unionId: paurId, type: "WARD", verificationLevel: { not: "ARCHIVED" } }, orderBy: { name: "asc" } }),
    prisma.area.findMany({ where: { unionId: paurId, type: "MAHALLA", verificationLevel: { not: "ARCHIVED" } }, orderBy: { name: "asc" } }),
    prisma.area.findMany({ where: { unionId: paurId, type: "VILLAGE", verificationLevel: { not: "ARCHIVED" } }, orderBy: { name: "asc" } }),
    prisma.service.findMany({ where: { status: "APPROVED", upazila: { name: { contains: "সাতকান" } }, category: { name: { contains: "স্বাস্থ্য" } } }, include: { union: true, area: true }, orderBy: { name: "asc" }, take: 100 }),
    prisma.doctor.count({ where: { chambers: { some: { service: { upazila: { name: { contains: "সাতকান" } } } } } } }),
  ]);

  return (
    <main className="ps-page">
      <TopBar title="সাতকানিয়া উপজেলা" subtitle="চট্টগ্রাম" backHref="/" />
      <div className="ps-content">
        <div className="ps-directory-hero">
          <div className="ps-directory-kicker">LOCAL DIRECTORY · CHATTOGRAM</div>
          <h1 className="ps-directory-title">সাতকানিয়া উপজেলা</h1>
          <p className="ps-directory-sub">স্থানীয় মানুষ, প্রতিষ্ঠান ও সেবার তথ্য এক জায়গায়।</p>
          <div className="ps-stat-grid"><div className="ps-stat"><b>১</b><span>পৌরসভা</span></div><div className="ps-stat"><b>{ruralUnions.length}</b><span>ইউনিয়ন</span></div><div className="ps-stat"><b>{villages.length}</b><span>পৌর গ্রাম</span></div></div>
        </div>
        <div className="ps-section-head"><span className="ps-section-icon">🏛️</span><h2>পৌরসভা</h2></div>
        <div className="ps-list-card"><div className="ps-list-top"><strong>{paur?.name || "সাতকানিয়া পৌরসভা"}</strong><span className="ps-badge">{wards.length} ওয়ার্ড</span></div><p className="ps-list-desc">{mahallas.length}টি মহল্লা</p></div>
        <div className="ps-section-head"><span className="ps-section-icon">🏘️</span><h2>১৭টি ইউনিয়ন</h2></div>
        <div className="ps-chips" style={{ marginBottom: 16 }}>{ruralUnions.map(u => <Link key={u.id} href={"/union/" + u.slug} className="ps-chip">{u.name}</Link>)}</div>
        <div className="ps-section-head"><span className="ps-section-icon">🏠</span><h2>পৌর ওয়ার্ড ({wards.length})</h2></div>
        <div className="ps-chips" style={{ marginBottom: 16 }}>{wards.map(w => <span key={w.id} className="ps-chip">{w.name}</span>)}</div>
        <div className="ps-section-head"><span className="ps-section-icon">🏠</span><h2>পৌর মহল্লা ({mahallas.length})</h2></div>
        <div className="ps-chips" style={{ marginBottom: 16 }}>{mahallas.map(m => <span key={m.id} className="ps-chip">{m.name}</span>)}</div>
        <div className="ps-section-head"><span className="ps-section-icon">🌾</span><h2>পৌর গ্রাম ({villages.length})</h2></div>
        <div className="ps-chips" style={{ marginBottom: 16 }}>{villages.map(v => <span key={v.id} className="ps-chip">{v.name}</span>)}</div>
        <div className="ps-section-head"><span className="ps-section-icon">👨‍⚕️</span><h2>ডাক্তার ({doctorCount})</h2><Link href="/doctors" className="ps-section-more">সব ডাক্তার ›</Link></div>
        <p className="ps-section-note">বিশেষজ্ঞ, চেম্বার ও অ্যাপয়েন্টমেন্ট তথ্য</p>
        <div className="ps-section-head"><span className="ps-section-icon">🏥</span><h2>স্বাস্থ্যসেবা ({health.length})</h2><Link href="/services?category=health" className="ps-section-more">সব ›</Link></div>
        <div>{health.map(s => <Link key={s.id} href={"/services/" + s.id} className="ps-prof-card"><div className="ps-doctor-head"><div className="ps-doctor-avatar">🏥</div><div className="ps-doctor-main"><h3 className="ps-doctor-name">{s.name}</h3><div className="ps-doctor-specialty">{s.subcategory || "স্বাস্থ্যসেবা"}</div></div><span className="ps-verified">{s.verificationLevel}</span></div><div className="ps-meta-grid"><div className="ps-meta"><span className="ps-meta-label">এলাকা</span><span className="ps-meta-value">{[s.union?.name, s.area?.name].filter(Boolean).join(" · ") || "সাতকানিয়া"}</span></div><div className="ps-meta"><span className="ps-meta-label">স্ট্যাটাস</span><span className="ps-meta-value">✓ অনুমোদিত</span></div></div><div className="ps-card-actions"><span className="ps-card-action primary">বিস্তারিত দেখুন</span></div></Link>)}</div>
      </div>
      <BottomNav active="home" />
    </main>
  );
}
