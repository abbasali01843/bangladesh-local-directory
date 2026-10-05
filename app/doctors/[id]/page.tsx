import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import TopBar from "@/components/TopBar";
import BottomNav from "@/components/BottomNav";

export default async function DoctorDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const doctor = await prisma.doctor.findUnique({
    where: { id },
    include: { chambers: { include: { service: true } } },
  });
  if (!doctor) notFound();
  return (
    <main className="ps-page">
      <TopBar title="ডাক্তারের তথ্য" subtitle="সাতকানিয়া" backHref="/doctors" />
      <div className="ps-content">
        <div className="ps-detail">
          <div className="ps-detail-icon">👨‍⚕️</div>
          <h1 className="ps-detail-title">{doctor.name}</h1>
          {doctor.specialty && <p className="ps-list-sub">🩺 {doctor.specialty}</p>}
          {doctor.qualification && <p className="ps-detail-desc">{doctor.qualification}</p>}
          {doctor.bmdcRegNo && <p className="ps-list-desc">BM&DC Reg. No: {doctor.bmdcRegNo}</p>}
        </div>
        <div className="ps-section-head"><span className="ps-section-icon">🏥</span><h2>চেম্বার</h2></div>
        <div className="ps-list">
          {doctor.chambers.map((c) => (
            <div key={c.id} className="ps-list-card">
              <div className="ps-list-top"><strong>{c.chamberName || "চেম্বার"}</strong><span className="ps-badge">{c.verificationLevel}</span></div>
              {c.address && <p className="ps-list-loc">📍 {c.address}</p>}
              {c.days && <p className="ps-list-desc">📅 {c.days}</p>}
              {c.startTime && c.endTime && <p className="ps-list-desc">🕒 {c.startTime} – {c.endTime}</p>}
              {c.appointmentPhone && <p className="ps-list-phone">📞 {c.appointmentPhone}</p>}
              {c.service && <Link href={`/services/${c.service.id}`} className="ps-section-more">প্রতিষ্ঠানের তথ্য ›</Link>}
            </div>
          ))}
        </div>
        <p className="ps-list-desc" style={{ marginTop: 16 }}>তথ্য পরিবর্তিত হতে পারে। চিকিৎসকের চেম্বারে যাওয়ার আগে ফোনে সময় নিশ্চিত করুন।</p>
      </div>
      <BottomNav active="home" />
    </main>
  );
}