"use client";

import { useEffect, useState } from "react";
import { categories } from "@/data/categories";
import TopBar from "@/components/TopBar";
import BottomNav from "@/components/BottomNav";

type Area = { id: string; name: string };
type Union = { id: string; name: string; areas?: Area[] };
type Upazila = { id: string; name: string; unions?: Union[] };
type District = { id: string; name: string; upazilas?: Upazila[] };

export default function AddListing() {
  const [loc, setLoc] = useState<District[]>([]);
  const [district, setDistrict] = useState("");
  const [upazila, setUpazila] = useState("");
  const [union, setUnion] = useState("");
  const [area, setArea] = useState("");
  const [message, setMessage] = useState("");
  const [ok, setOk] = useState(false);
  const [busy, setBusy] = useState(false);
  const [staticMode, setStaticMode] = useState(false);

  useEffect(() => {
    fetch("/api/locations")
      .then((r) => r.json())
      .then((j) => {
        setLoc(j.data || []);
        setStaticMode(j.source === "static");
      })
      .catch(() => setStaticMode(true));
  }, []);

  const d = loc.find((x) => x.id === district);
  const u = d?.upazilas?.find((x) => x.id === upazila);
  const n = u?.unions?.find((x) => x.id === union);
  const hasUpazilas = (d?.upazilas?.length || 0) > 0;

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBusy(true);
    setMessage("");
    setOk(false);
    const f = new FormData(e.currentTarget);

    if (staticMode) {
      setOk(false);
      setMessage(
        "ডাটাবেস এখনো সেট নেই। দেখার জন্য ডেমো তথ্য কাজ করছে; নতুন তথ্য সেভ করতে পরে DB লাগবে। এখন শুধু ফর্ম চেক করতে পারেন।"
      );
      setBusy(false);
      return;
    }

    const r = await fetch("/api/services", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: f.get("name"),
        categoryId: f.get("category"),
        districtId: district,
        upazilaId: upazila || "pending",
        unionId: union || null,
        areaId: area || null,
        phone: f.get("phone"),
        description: f.get("description"),
      }),
    });
    const j = await r.json();
    if (r.ok) {
      setOk(true);
      setMessage("তথ্য সফলভাবে জমা হয়েছে। Admin approval-এর অপেক্ষায়।");
      e.currentTarget.reset();
      setDistrict("");
      setUpazila("");
      setUnion("");
      setArea("");
    } else {
      setMessage(j.message || j.error || "জমা দেওয়া যায়নি");
    }
    setBusy(false);
  }

  return (
    <main className="ps-page">
      <TopBar title="তথ্য যোগ করুন" subtitle="নতুন তালিকা" backHref="/" />

      <div className="ps-content">
        {staticMode && (
          <div className="ps-msg-err" style={{ marginBottom: 12 }}>
            ডেমো মোড: ডাটাবেস ছাড়াই সাইট চলছে। তথ্য দেখা যাবে, নতুন সেভ পরে DB সেট করলে চালু হবে।
          </div>
        )}

        <form onSubmit={submit} className="ps-form">
          <label className="ps-label">
            নাম *
            <input required name="name" className="ps-input" placeholder="যেমন: ডা. করিম চেম্বার" />
          </label>

          <label className="ps-label">
            ক্যাটাগরি *
            <select name="category" className="ps-input" required>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.icon} {c.name}
                </option>
              ))}
            </select>
          </label>

          <label className="ps-label">
            জেলা *
            <select
              required
              value={district}
              onChange={(e) => {
                setDistrict(e.target.value);
                setUpazila("");
                setUnion("");
                setArea("");
              }}
              className="ps-input"
            >
              <option value="">জেলা নির্বাচন করুন</option>
              {loc.map((x) => (
                <option key={x.id} value={x.id}>
                  {x.name}
                </option>
              ))}
            </select>
          </label>

          {hasUpazilas && (
            <>
              <label className="ps-label">
                উপজেলা *
                <select
                  required
                  disabled={!district}
                  value={upazila}
                  onChange={(e) => {
                    setUpazila(e.target.value);
                    setUnion("");
                    setArea("");
                  }}
                  className="ps-input"
                >
                  <option value="">উপজেলা নির্বাচন করুন</option>
                  {d?.upazilas?.map((x) => (
                    <option key={x.id} value={x.id}>
                      {x.name}
                    </option>
                  ))}
                </select>
              </label>

              <label className="ps-label">
                ইউনিয়ন
                <select
                  disabled={!upazila}
                  value={union}
                  onChange={(e) => {
                    setUnion(e.target.value);
                    setArea("");
                  }}
                  className="ps-input"
                >
                  <option value="">ইউনিয়ন নির্বাচন করুন</option>
                  {u?.unions?.map((x) => (
                    <option key={x.id} value={x.id}>
                      {x.name}
                    </option>
                  ))}
                </select>
              </label>

              <label className="ps-label">
                এলাকা
                <select
                  disabled={!union}
                  value={area}
                  onChange={(e) => setArea(e.target.value)}
                  className="ps-input"
                >
                  <option value="">এলাকা নির্বাচন করুন</option>
                  {n?.areas?.map((x) => (
                    <option key={x.id} value={x.id}>
                      {x.name}
                    </option>
                  ))}
                </select>
              </label>
            </>
          )}

          <label className="ps-label">
            মোবাইল
            <input name="phone" type="tel" className="ps-input" placeholder="01XXXXXXXXX" />
          </label>

          <label className="ps-label">
            বিস্তারিত
            <textarea name="description" rows={4} className="ps-input" placeholder="সংক্ষিপ্ত বিবরণ..." />
          </label>

          {message && <div className={ok ? "ps-msg-ok" : "ps-msg-err"}>{message}</div>}

          <button disabled={busy || !district} className="ps-btn-primary ps-btn-block">
            {busy ? "জমা হচ্ছে..." : staticMode ? "চেক করুন (ডেমো)" : "জমা দিন — Admin Review"}
          </button>
        </form>
      </div>

      <BottomNav active="add" />
    </main>
  );
}
