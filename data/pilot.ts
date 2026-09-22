/** Pilot area */
export const pilot = {
  district: { id: "chattogram", name: "চট্টগ্রাম", nameEn: "Chattogram" },
  upazila: { id: "satkania", name: "সাতকানিয়া", nameEn: "Satkania" },
  union: { id: "kanchana", name: "কাঞ্চনা", nameEn: "Kanchana" },
  label: "চট্টগ্রাম · সাতকানিয়া · কাঞ্চনা",
  shortLabel: "সাতকানিয়া, চট্টগ্রাম",
  postcode: "4386",
} as const;

/** 17 unions of Satkania Upazila (Wikipedia / admin list) */
export const satkaniaUnions = [
  { id: "kanchana", name: "কাঞ্চনা" },
  { id: "satkania", name: "সাতকানিয়া" },
  { id: "amilaish", name: "আমিলাইশ" },
  { id: "bazalia", name: "বাজালিয়া" },
  { id: "charati", name: "চরতী" },
  { id: "dharmapur", name: "ধর্মপুর" },
  { id: "dhemsa", name: "ঢেমশা" },
  { id: "eochia", name: "এওচিয়া" },
  { id: "kaliaish", name: "কালিয়াইশ" },
  { id: "keochia", name: "কেঁওচিয়া" },
  { id: "khagaria", name: "খাগরিয়া" },
  { id: "madarsha", name: "মাদার্শা" },
  { id: "nalua", name: "নলুয়া" },
  { id: "paschim-dhemsa", name: "পশ্চিম ঢেমশা" },
  { id: "purangor", name: "পুরানগড়" },
  { id: "sadaha", name: "ছদাহা" },
  { id: "sonakania", name: "সোনাকানিয়া" },
] as const;
