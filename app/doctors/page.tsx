import Link from "next/link";
import { prisma } from "@/lib/prisma";
import TopBar from "@/components/TopBar";
import BottomNav from "@/components/BottomNav";

export const metadata = {
  title: "সাতকানিয়া ডাক্তার ডিরেক্টরি",
  description: "সাতকানিয়া উপজেলার ডাক্তার, বিশেষজ্ঞ, চেম্বার ও অ্যাপয়েন্টমেন্ট তথ্য।",
};

export default async function DoctorsPage() {
  const doctors = await prisma.doctor.findMany({
    where: { chambers: { some: { service: { upazila: { name: { contains: "সাতকান" } } } } } },
    include: { chambers: { include: { service: true } } },
    orderBy: { name: "asc" },
  });

  return (
    <main className="ps-page">
      <TopBar title="ডাক্তার ডিরেক্টরি" subtitle="সাতকানিয়া" backHref="/satkania" />
      <div className="ps-content">
        <div className="ps-detail" style={{ marginBottom: 16 }}>
          <div className="ps-detail-icon">👨‍⚕️</div>
          <h1 className="ps-detail-title">সাতকানিয়ার ডাক্তার</h1>
          <p className="ps-detail-desc">চেম্বার, বিশেষত্ব ও অ্যাপয়েন্টমেন্ট তথ্য। সময় পরিবর্তিত হতে পারে—যাওয়ার আগে ফোনে নিশ্চিত করুন।</p>
        </div>
        {doctors.length === 0 ? (
          <div className="ps-empty"><div className="ps-empty-icon">👨‍⚕️</div><h2>এখনো ডাক্তার তথ্য নেই</h2><p>যাচাই করা তথ্য যোগ হলে এখানে দেখা যাবে।</p></div>
        ) : (
          <div className="ps-list">
            {doctors.map((d) => (
              <Link key={d.id} href={`/doctors/${d.id}`} className="ps-list-card">
                <div className="ps-list-top"><strong>{d.name}</strong><span className="ps-badge">{d.verificationLevel}</span></div>
                {d.specialty && <p className="ps-list-sub">🩺 {d.specialty}</p>}
                {d.qualification && <p className="ps-list-desc">{d.qualification}</p>}
                {d.chambers[0] && <p className="ps-list-loc">📍 {d.chambers[0].chamberName || d.chambers[0].address || "সাতকানিয়া"}</p>}
                {d.chambers[0]?.appointmentPhone && <p className="ps-list-phone">📞 {d.chambers[0].appointmentPhone}</p>}
              </Link>
            ))}
          </div>
        )}
      </div>
      <BottomNav active="home" />
    </main>
  );
}