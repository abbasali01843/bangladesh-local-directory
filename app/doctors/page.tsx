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
        <div className="ps-directory-hero">
          <div className="ps-directory-kicker">SATKANIA · DOCTOR DIRECTORY</div>
          <h1 className="ps-directory-title">সাতকানিয়ার ডাক্তার</h1>
          <p className="ps-directory-sub">বিশেষজ্ঞ, চেম্বার ও অ্যাপয়েন্টমেন্ট তথ্য এক জায়গায়।</p>
          <div className="ps-stat-grid"><div className="ps-stat"><b>{doctors.length}</b><span>ডাক্তার</span></div><div className="ps-stat"><b>{doctors.reduce((n,d)=>n+d.chambers.length,0)}</b><span>চেম্বার</span></div><div className="ps-stat"><b>২৪/৭</b><span>তথ্য খোঁজা</span></div></div>
        </div>
        <p className="ps-section-note">চেম্বারের সময় পরিবর্তিত হতে পারে—যাওয়ার আগে ফোনে নিশ্চিত করুন।</p>
        {doctors.length === 0 ? (
          <div className="ps-empty"><div className="ps-empty-icon">👨‍⚕️</div><h2>এখনো ডাক্তার তথ্য নেই</h2><p>যাচাই করা তথ্য যোগ হলে এখানে দেখা যাবে।</p></div>
        ) : (
          <div>{doctors.map((d) => {
              const c=d.chambers[0];
              return <Link key={d.id} href={`/doctors/${d.id}`} className="ps-prof-card">
                <div className="ps-doctor-head"><div className="ps-doctor-avatar">👨‍⚕️</div><div className="ps-doctor-main"><h2 className="ps-doctor-name">{d.name}</h2>{d.specialty && <div className="ps-doctor-specialty">{d.specialty}</div>}</div><span className="ps-verified">{d.verificationLevel}</span></div>
                {d.qualification && <p className="ps-section-note" style={{marginTop:10,marginBottom:0}}>{d.qualification}</p>}
                <div className="ps-meta-grid"><div className="ps-meta"><span className="ps-meta-label">চেম্বার</span><span className="ps-meta-value">{c?.chamberName || "—"}</span></div><div className="ps-meta"><span className="ps-meta-label">সময়</span><span className="ps-meta-value">{c?.startTime && c?.endTime ? `${c.startTime} – ${c.endTime}` : "—"}</span></div></div>
                <div className="ps-card-actions">{c?.appointmentPhone && <span className="ps-card-action primary">📞 অ্যাপয়েন্টমেন্ট</span>}<span className="ps-card-action">বিস্তারিত দেখুন ›</span></div>
              </Link>;
            })}</div>
        )}
      </div>
      <BottomNav active="home" />
    </main>
  );
}