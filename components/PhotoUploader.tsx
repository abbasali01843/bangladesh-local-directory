"use client";

import { useEffect, useState } from "react";

type Photo = { id: string; url: string };

/** মালিক/অ্যাডমিন হলে ছবি যোগ/মোছার UI — বাকিদের কাছে কিছুই দেখায় না। */
export default function PhotoUploader({
  serviceId,
  initial,
}: {
  serviceId: string;
  initial: Photo[];
}) {
  const [allowed, setAllowed] = useState(false);
  const [photos, setPhotos] = useState<Photo[]>(initial);
  const [msg, setMsg] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    Promise.all([
      fetch("/api/auth/me").then((r) => r.json()).catch(() => ({})),
      fetch("/api/owner/services").then((r) => r.json()).catch(() => ({})),
    ]).then(([me, own]) => {
      if (me?.data?.role === "ADMIN") return setAllowed(true);
      const ids = [
        ...(own?.data?.mine || []).map((s: { id: string }) => s.id),
        ...(own?.data?.claimed || []).map((s: { id: string }) => s.id),
      ];
      setAllowed(ids.includes(serviceId));
    });
  }, [serviceId]);

  async function upload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setBusy(true);
    setMsg("");
    try {
      const form = new FormData();
      form.append("file", file);
      const r = await fetch(`/api/services/${serviceId}/photos`, { method: "POST", body: form });
      const j = await r.json();
      if (r.ok) {
        setPhotos((p) => [...p, j.data]);
        setMsg("✅ ছবি যোগ হয়েছে।");
      } else {
        setMsg(j.message || "আপলোড ব্যর্থ হয়েছে।");
      }
    } catch {
      setMsg("সার্ভারে সংযোগ করা যাচ্ছে না।");
    }
    setBusy(false);
    e.target.value = "";
  }

  async function remove(photoId: string) {
    if (!confirm("ছবিটি মুছে ফেলবেন?")) return;
    const r = await fetch(`/api/services/${serviceId}/photos?photoId=${photoId}`, {
      method: "DELETE",
    });
    if (r.ok) {
      setPhotos((p) => p.filter((x) => x.id !== photoId));
      setMsg("ছবি মুছে ফেলা হয়েছে।");
    } else {
      setMsg("মোছা যায়নি।");
    }
  }

  if (!allowed) return null;

  return (
    <div style={{ marginTop: 12 }}>
      <div className="ps-section-head">
        <span className="ps-section-icon">📷</span>
        <h2>ছবি পরিচালনা ({photos.length}/5)</h2>
      </div>
      {photos.length > 0 && (
        <div className="ps-photo-grid" style={{ marginBottom: 10 }}>
          {photos.map((p) => (
            <div key={p.id} className="ps-photo-cell">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={p.url} alt="তালিকার ছবি" loading="lazy" />
              <button
                type="button"
                className="ps-photo-del"
                onClick={() => remove(p.id)}
                aria-label="ছবি মুছুন"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}
      <label className="ps-btn-ghost ps-btn-block" style={{ textAlign: "center", cursor: "pointer" }}>
        {busy ? "আপলোড হচ্ছে..." : "📤 ছবি যোগ করুন (JPG/PNG/WebP, 2MB)"}
        <input type="file" accept="image/jpeg,image/png,image/webp" onChange={upload} hidden disabled={busy} />
      </label>
      {msg && <div className="ps-msg-err" style={{ marginTop: 8 }}>{msg}</div>}
    </div>
  );
}
