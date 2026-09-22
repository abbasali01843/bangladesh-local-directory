"use client";

import { useEffect, useState } from "react";
import { categories } from "@/data/categories";

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

  useEffect(() => {
    fetch("/api/locations")
      .then((r) => r.json())
      .then((j) => setLoc(j.data || []))
      .catch(() => {});
  }, []);

  const d = loc.find((x) => x.id === district);
  const u = d?.upazilas?.find((x) => x.id === upazila);
  const n = u?.unions?.find((x) => x.id === union);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBusy(true);
    setMessage("");
    setOk(false);
    const f = new FormData(e.currentTarget);
    const r = await fetch("/api/services", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: f.get("name"),
        categoryId: f.get("category"),
        districtId: district,
        upazilaId: upazila,
        unionId: union || null,
        areaId: area || null,
        phone: f.get("phone"),
        description: f.get("description"),
      }),
    });
    const j = await r.json();
    if (r.ok) {
      setOk(true);
      setMessage("তথ্য সফলভাবে জমা হয়েছে। Admin approval-এর অপেক্ষায় আছে।");
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

  const fieldClass =
    "block w-full mt-1.5 px-3 py-2.5 rounded-xl border border-gray-200 bg-white outline-none focus:border-teal-500";

  return (
    <main className="pb-24">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="container h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <a href="/" className="text-teal-700 text-sm font-medium">
              ← হোম
            </a>
            <strong className="text-lg font-bold text-gray-800">তথ্য যোগ করুন</strong>
          </div>
        </div>
      </header>

      <section className="container py-6" style={{ maxWidth: 640 }}>
        <p className="text-sm text-gray-500 mb-5">
          সঠিক লোকেশন নির্বাচন করে তথ্য দিন। জমা দেওয়ার পর Admin review হবে।
        </p>

        <form
          onSubmit={submit}
          className="bg-white border border-gray-200 rounded-2xl p-5 grid gap-4"
        >
          <label className="text-sm font-medium text-gray-700">
            নাম *
            <input required name="name" className={fieldClass} placeholder="যেমন: ডা. করিম চেম্বার" />
          </label>

          <label className="text-sm font-medium text-gray-700">
            ক্যাটাগরি *
            <select name="category" className={fieldClass} required>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.icon} {c.name}
                </option>
              ))}
            </select>
          </label>

          <label className="text-sm font-medium text-gray-700">
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
              className={fieldClass}
            >
              <option value="">জেলা নির্বাচন করুন</option>
              {loc.map((x) => (
                <option key={x.id} value={x.id}>
                  {x.name}
                </option>
              ))}
            </select>
          </label>

          <label className="text-sm font-medium text-gray-700">
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
              className={fieldClass}
            >
              <option value="">উপজেলা নির্বাচন করুন</option>
              {d?.upazilas?.map((x) => (
                <option key={x.id} value={x.id}>
                  {x.name}
                </option>
              ))}
            </select>
          </label>

          <label className="text-sm font-medium text-gray-700">
            ইউনিয়ন
            <select
              disabled={!upazila}
              value={union}
              onChange={(e) => {
                setUnion(e.target.value);
                setArea("");
              }}
              className={fieldClass}
            >
              <option value="">ইউনিয়ন নির্বাচন করুন</option>
              {u?.unions?.map((x) => (
                <option key={x.id} value={x.id}>
                  {x.name}
                </option>
              ))}
            </select>
          </label>

          <label className="text-sm font-medium text-gray-700">
            এলাকা
            <select
              disabled={!union}
              value={area}
              onChange={(e) => setArea(e.target.value)}
              className={fieldClass}
            >
              <option value="">এলাকা নির্বাচন করুন</option>
              {n?.areas?.map((x) => (
                <option key={x.id} value={x.id}>
                  {x.name}
                </option>
              ))}
            </select>
          </label>

          <label className="text-sm font-medium text-gray-700">
            মোবাইল
            <input name="phone" type="tel" className={fieldClass} placeholder="01XXXXXXXXX" />
          </label>

          <label className="text-sm font-medium text-gray-700">
            বিস্তারিত
            <textarea
              name="description"
              rows={4}
              className={fieldClass}
              placeholder="সংক্ষিপ্ত বিবরণ লিখুন..."
            />
          </label>

          {message && (
            <div
              className={`p-3 rounded-xl text-sm ${
                ok ? "bg-green-50 text-green-800" : "bg-red-50 text-red-700"
              }`}
            >
              {message}
            </div>
          )}

          <button
            disabled={busy || !district || !upazila}
            className="w-full py-3 rounded-xl bg-teal-700 text-white font-bold disabled:opacity-50 hover:bg-teal-800 transition"
          >
            {busy ? "জমা হচ্ছে..." : "জমা দিন — Admin Review"}
          </button>
        </form>
      </section>

      {/* Bottom Nav */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 md:hidden">
        <div className="flex items-center justify-around h-16">
          <a href="/" className="flex flex-col items-center text-gray-500 text-xs">
            <span className="text-xl">🏠</span>
            <span>হোম</span>
          </a>
          <a href="/categories" className="flex flex-col items-center text-gray-500 text-xs">
            <span className="text-xl">📂</span>
            <span>ক্যাটাগরি</span>
          </a>
          <a href="/add-listing" className="flex flex-col items-center -mt-5">
            <span className="bg-teal-700 text-white w-12 h-12 rounded-full flex items-center justify-center text-2xl shadow-lg">
              +
            </span>
          </a>
          <a href="/search" className="flex flex-col items-center text-gray-500 text-xs">
            <span className="text-xl">🔍</span>
            <span>খুঁজুন</span>
          </a>
          <a href="/login" className="flex flex-col items-center text-gray-500 text-xs">
            <span className="text-xl">👤</span>
            <span>অ্যাকাউন্ট</span>
          </a>
        </div>
      </nav>
    </main>
  );
}
