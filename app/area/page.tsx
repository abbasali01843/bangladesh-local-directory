import {
  kanchanaProfile,
  kanchanaSchools,
  borderSchools,
  kanchanaMadrasas,
  kanchanaPrimarySchools,
  kanchanaMosques,
} from "@/data/kanchana";
import { servicesInKanchana, servicesInSatkaniaSadar } from "@/data/services";
import TopBar from "@/components/TopBar";
import BottomNav from "@/components/BottomNav";

export default function AreaPage() {
  const knList = servicesInKanchana();
  const sadarList = servicesInSatkaniaSadar();
  const p = kanchanaProfile;

  return (
    <main className="ps-page">
      <TopBar title="কাঞ্চনা ইউনিয়ন" subtitle="সাতকানিয়া, চট্টগ্রাম" backHref="/" />

      <div className="ps-content">
        <div className="ps-detail" style={{ marginBottom: 16 }}>
          <div className="ps-detail-icon">📍</div>
          <h1 className="ps-detail-title">{p.name}</h1>
          <p className="ps-list-loc">
            {p.code} · {p.upazila} · {p.district} · পোস্ট {p.postcode}
          </p>
          <p className="ps-detail-desc">
            আয়তন ~{p.areaKm2} বর্গকিমি · জনসংখ্যা ২০২২:{" "}
            {p.population2022.toLocaleString("bn-BD")} · সদর থেকে ~{p.distanceToSadarKm} কিমি
          </p>
          <p className="ps-list-desc">{p.borders}</p>
          <a href={p.website} target="_blank" rel="noopener noreferrer" className="ps-btn-primary ps-btn-block">
            ইউপি ওয়েবসাইট
          </a>
        </div>

        <div className="ps-section-head">
          <span className="ps-section-icon">🏘️</span>
          <h2>গ্রাম (কাঞ্চনা)</h2>
        </div>
        <div className="ps-chips" style={{ marginBottom: 16 }}>
          {p.villages.map((v) => (
            <span key={v} className="ps-chip">{v}</span>
          ))}
        </div>

        <div className="ps-section-head">
          <span className="ps-section-icon">🛒</span>
          <h2>হাট-বাজার (কাঞ্চনা)</h2>
        </div>
        <div className="ps-chips" style={{ marginBottom: 16 }}>
          {p.hats.map((h) => (
            <span key={h} className="ps-chip">{h}</span>
          ))}
        </div>

        <div className="ps-section-head">
          <span className="ps-section-icon">🏫</span>
          <h2>মাধ্যমিক — কাঞ্চনা ইউনিয়ন</h2>
        </div>
        <div className="ps-list" style={{ marginBottom: 16 }}>
          {kanchanaSchools.map((s) => (
            <div key={s.eiin} className="ps-list-card">
              <div className="ps-list-top">
                <strong>{s.name}</strong>
                <span className="ps-badge">EIIN {s.eiin}</span>
              </div>
              <p className="ps-list-loc">📍 {s.area}{s.phone ? ` · ${s.phone}` : ""}</p>
            </div>
          ))}
        </div>

        <div className="ps-section-head">
          <span className="ps-section-icon">⚠️</span>
          <h2>সীমান্ত স্কুল (আমিলাইশ–কাঞ্চনা)</h2>
        </div>
        <div className="ps-list" style={{ marginBottom: 16 }}>
          {borderSchools.map((s) => (
            <div key={s.eiin} className="ps-list-card">
              <div className="ps-list-top">
                <strong>{s.name}</strong>
                <span className="ps-badge">সীমান্ত</span>
              </div>
              <p className="ps-list-loc">📍 {s.area} · EIIN {s.eiin}</p>
              <p className="ps-list-desc">{s.note}</p>
            </div>
          ))}
        </div>

        <div className="ps-section-head">
          <span className="ps-section-icon">📖</span>
          <h2>মাদ্রাসা — কাঞ্চনা</h2>
        </div>
        <div className="ps-list" style={{ marginBottom: 16 }}>
          {kanchanaMadrasas.map((s) => (
            <div key={s.name} className="ps-list-card">
              <div className="ps-list-top">
                <strong>{s.name}</strong>
                {s.eiin ? <span className="ps-badge">EIIN {s.eiin}</span> : null}
              </div>
              <p className="ps-list-loc">📍 {s.area}{s.phone ? ` · ${s.phone}` : ""}</p>
            </div>
          ))}
        </div>

        <div className="ps-section-head">
          <span className="ps-section-icon">🎒</span>
          <h2>প্রাথমিক — কাঞ্চনা ({kanchanaPrimarySchools.length})</h2>
        </div>
        <div className="ps-list" style={{ marginBottom: 16 }}>
          {kanchanaPrimarySchools.map((name) => (
            <div key={name} className="ps-list-card">
              <strong style={{ fontSize: 14 }}>{name}</strong>
            </div>
          ))}
        </div>

        <div className="ps-section-head">
          <span className="ps-section-icon">🕌</span>
          <h2>মসজিদ/মাজার — কাঞ্চনা</h2>
        </div>
        <div className="ps-list" style={{ marginBottom: 16 }}>
          {kanchanaMosques.map((name) => (
            <div key={name} className="ps-list-card">
              <strong style={{ fontSize: 14 }}>{name}</strong>
            </div>
          ))}
        </div>

        <div className="ps-section-head">
          <span className="ps-section-icon">📋</span>
          <h2>ডিরেক্টরি — শুধু কাঞ্চনা ({knList.length})</h2>
        </div>
        <div className="ps-list" style={{ marginBottom: 16 }}>
          {knList.map((s) => (
            <a key={s.id} href={`/services/${s.id}`} className="ps-list-card">
              <div className="ps-list-top">
                <strong>{s.name}</strong>
                <span className="ps-badge">কাঞ্চনা</span>
              </div>
              <p className="ps-list-loc">📍 {s.area}</p>
            </a>
          ))}
        </div>

        <div className="ps-section-head">
          <span className="ps-section-icon">🏥</span>
          <h2>সাতকানিয়া সদর (কাঞ্চনা নয় — কাছাকাছি সেবা)</h2>
        </div>
        <div className="ps-list">
          {sadarList.map((s) => (
            <a key={s.id} href={`/services/${s.id}`} className="ps-list-card">
              <div className="ps-list-top">
                <strong>{s.name}</strong>
                <span className="ps-badge">সদর</span>
              </div>
              <p className="ps-list-loc">📍 {s.area}</p>
            </a>
          ))}
        </div>
      </div>

      <BottomNav active="home" />
    </main>
  );
}
