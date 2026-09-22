/** Pilot area: user's home region */
export const pilot = {
  district: {
    id: "chattogram",
    name: "চট্টগ্রাম",
    nameEn: "Chattogram",
  },
  upazila: {
    id: "satkania",
    name: "সাতকানিয়া",
    nameEn: "Satkania",
  },
  union: {
    id: "kanchana",
    name: "কাঞ্চনা",
    nameEn: "Kanchana",
  },
  label: "চট্টগ্রাম · সাতকানিয়া · কাঞ্চনা",
  shortLabel: "সাতকানিয়া, চট্টগ্রাম",
} as const;

export const satkaniaUnions = [
  { id: "kanchana", name: "কাঞ্চনা" },
  { id: "satkania-sadar", name: "সাতকানিয়া সদর" },
  { id: "bailchhari", name: "বাইলছড়ি" },
  { id: "charati", name: "চরতি" },
  { id: "dharmapur", name: "ধর্মপুর" },
  { id: "kachuai", name: "কাচুয়াই" },
  { id: "khagaria", name: "খাগড়িয়া" },
  { id: "amilaish", name: "আমিলাইশ" },
  { id: "padua", name: "পদুয়া" },
  { id: "puranagar", name: "পুরানগড়" },
  { id: "sadaha", name: "সাদাহা" },
  { id: "noljiri", name: "নলজিরি" },
  { id: "sonakania", name: "সোনাকানিয়া" },
  { id: "chambal", name: "চাম্বল" },
] as const;
