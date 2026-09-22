export type Service = {
  id: string;
  name: string;
  category: string;
  district: string;
  upazila: string;
  /** ইউনিয়ন বা পৌরসভা — এলাকা মিলিয়ে ফিল্টারের জন্য */
  union: string;
  area: string;
  phone: string;
  verified: boolean;
  description: string;
  fields: Record<string, string>;
};

/**
 * এলাকা ট্যাগ নিয়ম:
 * - union: "কাঞ্চনা" = শুধু কাঞ্চনা ইউনিয়ন
 * - union: "সাতকানিয়া পৌরসভা" = উপজেলা সদর/পৌর
 * - union: "আমিলাইশ-কাঞ্চনা" = সীমান্ত/নামে দুই ইউনিয়ন
 * - union: "সাতকানিয়া (উপজেলা)" = পুরো উপজেলা / জাতীয় সেবা
 */
export const services: Service[] = [
  // ========== শুধু কাঞ্চনা ইউনিয়ন ==========
  {
    id: "kn-up",
    name: "৪ নং কাঞ্চনা ইউনিয়ন পরিষদ",
    category: "organization",
    district: "চট্টগ্রাম",
    upazila: "সাতকানিয়া",
    union: "কাঞ্চনা",
    area: "কাঞ্চনা (মনু ফকির হাট এলাকায় কার্যালয় — সংবাদ)",
    phone: "",
    verified: true,
    description:
      "কাঞ্চনা ইউনিয়ন পরিষদ। আয়তন ~১৩.৫৩ বর্গকিমি। গ্রাম: উত্তর, মধ্য, দক্ষিণ কাঞ্চনা। জনসংখ্যা ২০২২: ~২২,৭০৩। ওয়েব: kanchanaup.chittagong.gov.bd",
    fields: { orgType: "ইউনিয়ন পরিষদ", contactPerson: "চেয়ারম্যান / সচিব অফিস" },
  },
  {
    id: "kn-usc",
    name: "কাঞ্চনা ইউনিয়ন সাব সেন্টার",
    category: "health",
    district: "চট্টগ্রাম",
    upazila: "সাতকানিয়া",
    union: "কাঞ্চনা",
    area: "কাঞ্চনা ইউনিয়ন",
    phone: "",
    verified: true,
    description: "DGHS ইউনিয়ন সাব-সেন্টার (Code 10000833)। প্রাথমিক বহির্বিভাগ — কাঞ্চনা ইউনিয়ন।",
    fields: { serviceType: "ইউনিয়ন স্বাস্থ্য উপকেন্দ্র", openingHours: "অফিস সময়" },
  },
  {
    id: "kn-girls-hs",
    name: "কাঞ্চনা বালিকা উচ্চ বিদ্যালয়",
    category: "education",
    district: "চট্টগ্রাম",
    upazila: "সাতকানিয়া",
    union: "কাঞ্চনা",
    area: "কাঞ্চনা ইউনিয়ন",
    phone: "01818136982",
    verified: true,
    description: "বালিকা উচ্চ বিদ্যালয়। EIIN: 104998। Union: KANCHANA (পাবলিক EIIN রেকর্ড)।",
    fields: { institutionType: "বালিকা উচ্চ বিদ্যালয়", eiin: "104998" },
  },
  {
    id: "kn-south-hs",
    name: "দক্ষিণ কাঞ্চনা নুর আহমদ চৌধুরী উচ্চ বিদ্যালয়",
    category: "education",
    district: "চট্টগ্রাম",
    upazila: "সাতকানিয়া",
    union: "কাঞ্চনা",
    area: "দক্ষিণ কাঞ্চনা",
    phone: "",
    verified: true,
    description: "দক্ষিণ কাঞ্চনা মাধ্যমিক। EIIN: 105011। কাঞ্চনা ইউনিয়ন।",
    fields: { institutionType: "মাধ্যমিক বিদ্যালয়", eiin: "105011" },
  },
  {
    id: "kn-anwarul",
    name: "কাঞ্চনা আনোয়ারুল উলুম ইসলামিয়া আলিম মাদ্রাসা",
    category: "education",
    district: "চট্টগ্রাম",
    upazila: "সাতকানিয়া",
    union: "কাঞ্চনা",
    area: "কাঞ্চনা ইউনিয়ন",
    phone: "01815507790",
    verified: true,
    description:
      "আলিম মাদ্রাসা। EIIN: 105039। কাঞ্চনা ইউনিয়ন। ফোন (পাবলিক): ০১৮১৫-৫০৭৭৯০।",
    fields: { institutionType: "আলিম মাদ্রাসা", eiin: "105039" },
  },
  {
    id: "kn-rashidia",
    name: "দক্ষিণ কাঞ্চনা শাহ রশিদিয়া ইসলামিয়া দাখিল মাদ্রাসা",
    category: "education",
    district: "চট্টগ্রাম",
    upazila: "সাতকানিয়া",
    union: "কাঞ্চনা",
    area: "দক্ষিণ কাঞ্চনা",
    phone: "",
    verified: true,
    description: "দাখিল মাদ্রাসা — দক্ষিণ কাঞ্চনা, কাঞ্চনা ইউনিয়ন।",
    fields: { institutionType: "দাখিল মাদ্রাসা", eiin: "—" },
  },
  {
    id: "kn-darul-ihsan",
    name: "দারুল ইহসান মহিলা দাখিল মাদ্রাসা",
    category: "education",
    district: "চট্টগ্রাম",
    upazila: "সাতকানিয়া",
    union: "কাঞ্চনা",
    area: "কাঞ্চনা ইউনিয়ন",
    phone: "",
    verified: true,
    description: "মহিলা দাখিল মাদ্রাসা — কাঞ্চনা, সাতকানিয়া (স্থানীয়/উইকি)।",
    fields: { institutionType: "মহিলা দাখিল মাদ্রাসা", eiin: "—" },
  },
  {
    id: "kn-gps-main",
    name: "কাঞ্চনা সরকারি প্রাথমিক বিদ্যালয়",
    category: "education",
    district: "চট্টগ্রাম",
    upazila: "সাতকানিয়া",
    union: "কাঞ্চনা",
    area: "কাঞ্চনা",
    phone: "",
    verified: true,
    description: "সরকারি প্রাথমিক — কাঞ্চনা ইউনিয়ন।",
    fields: { institutionType: "সরকারি প্রাথমিক", eiin: "—" },
  },
  {
    id: "kn-gps-north",
    name: "উত্তর কাঞ্চনা সরকারি প্রাথমিক বিদ্যালয়",
    category: "education",
    district: "চট্টগ্রাম",
    upazila: "সাতকানিয়া",
    union: "কাঞ্চনা",
    area: "উত্তর কাঞ্চনা",
    phone: "",
    verified: true,
    description: "উত্তর কাঞ্চনা গ্রাম — কাঞ্চনা ইউনিয়ন।",
    fields: { institutionType: "সরকারি প্রাথমিক", eiin: "—" },
  },
  {
    id: "kn-gps-south",
    name: "দক্ষিণ কাঞ্চনা গুড়গুরী সরকারি প্রাথমিক বিদ্যালয়",
    category: "education",
    district: "চট্টগ্রাম",
    upazila: "সাতকানিয়া",
    union: "কাঞ্চনা",
    area: "দক্ষিণ কাঞ্চনা",
    phone: "",
    verified: true,
    description: "দক্ষিণ কাঞ্চনা গুড়গুরী — কাঞ্চনা ইউনিয়ন।",
    fields: { institutionType: "সরকারি প্রাথমিক", eiin: "—" },
  },
  {
    id: "kn-hat-monu",
    name: "মনু ফকির হাট",
    category: "business",
    district: "চট্টগ্রাম",
    upazila: "সাতকানিয়া",
    union: "কাঞ্চনা",
    area: "কাঞ্চনা ইউনিয়ন",
    phone: "",
    verified: true,
    description: "কাঞ্চনা ইউনিয়নের প্রধান হাট।",
    fields: { businessType: "হাট / বাজার", openingHours: "হাটের দিন" },
  },
  {
    id: "kn-hat-jot",
    name: "জোট পুকুরিয়া বাজার",
    category: "business",
    district: "চট্টগ্রাম",
    upazila: "সাতকানিয়া",
    union: "কাঞ্চনা",
    area: "কাঞ্চনা ইউনিয়ন",
    phone: "",
    verified: true,
    description: "কাঞ্চনা ইউনিয়নের হাট-বাজার।",
    fields: { businessType: "হাট / বাজার", openingHours: "হাটের দিন" },
  },
  {
    id: "kn-hat-lata",
    name: "লতাপীরের বাজার",
    category: "business",
    district: "চট্টগ্রাম",
    upazila: "সাতকানিয়া",
    union: "কাঞ্চনা",
    area: "কাঞ্চনা ইউনিয়ন",
    phone: "",
    verified: true,
    description: "কাঞ্চনা ইউনিয়নের হাট-বাজার।",
    fields: { businessType: "হাট / বাজার", openingHours: "হাটের দিন" },
  },
  {
    id: "kn-kazi-masjid",
    name: "কাজী বাড়ি জামে মসজিদ",
    category: "religious",
    district: "চট্টগ্রাম",
    upazila: "সাতকানিয়া",
    union: "কাঞ্চনা",
    area: "কাঞ্চনা ইউনিয়ন",
    phone: "",
    verified: true,
    description: "ঐতিহ্যবাহী জামে মসজিদ — কাঞ্চনা।",
    fields: { institutionType: "জামে মসজিদ", contactPerson: "মসজিদ কমিটি" },
  },
  {
    id: "kn-jangli-pir",
    name: "জংলি পীর মাজার",
    category: "religious",
    district: "চট্টগ্রাম",
    upazila: "সাতকানিয়া",
    union: "কাঞ্চনা",
    area: "কাঞ্চনা ইউনিয়ন",
    phone: "",
    verified: true,
    description: "মাজার — কাঞ্চনা (সাতকানিয়া উইকি তালিকা)।",
    fields: { institutionType: "মাজার", contactPerson: "—" },
  },
  {
    id: "kn-kali-bari",
    name: "কাঞ্চনা কালীবাড়ি",
    category: "religious",
    district: "চট্টগ্রাম",
    upazila: "সাতকানিয়া",
    union: "কাঞ্চনা",
    area: "কাঞ্চনা ইউনিয়ন",
    phone: "",
    verified: true,
    description: "হিন্দু মন্দির — কাঞ্চনা।",
    fields: { institutionType: "মন্দির", contactPerson: "—" },
  },

  // ========== সীমান্ত / নামে দুই এলাকা (আলাদা ট্যাগ) ==========
  {
    id: "ak-akbc",
    name: "আমিলাইশ কাঞ্চনা বঙ্গ চন্দ্র ঘোষ ইন্সটিটিউট",
    category: "education",
    district: "চট্টগ্রাম",
    upazila: "সাতকানিয়া",
    union: "আমিলাইশ-কাঞ্চনা",
    area: "আমিলাইশ–কাঞ্চনা সীমান্ত এলাকা",
    phone: "01309104956",
    verified: true,
    description:
      "ঐতিহ্যবাহী মাধ্যমিক (~১৯২৯)। নামে আমিলাইশ ও কাঞ্চনা দুই ইউনিয়ন। EIIN: 104996। উইকি কখনো কাঞ্চনা স্কুল তালিকায় রাখে — অবস্থান সীমান্তবর্তী।",
    fields: { institutionType: "মাধ্যমিক বিদ্যালয়", eiin: "104996" },
  },

  // ========== সাতকানিয়া পৌরসভা / সদর (কাঞ্চনা নয়) ==========
  {
    id: "sk-uhc",
    name: "সাতকানিয়া উপজেলা স্বাস্থ্য কমপ্লেক্স",
    category: "health",
    district: "চট্টগ্রাম",
    upazila: "সাতকানিয়া",
    union: "সাতকানিয়া পৌরসভা",
    area: "সাতকানিয়া সদর",
    phone: "01730324455",
    verified: true,
    description: "সরকারি UHC — সাতকানিয়া সদর (কাঞ্চনা ইউনিয়ন নয়)। কাঞ্চনা থেকে ~১৫ কিমি।",
    fields: { serviceType: "সরকারি হাসপাতাল", openingHours: "জরুরি ২৪ ঘণ্টা" },
  },
  {
    id: "sk-alpha",
    name: "আলফা হাসপাতাল এন্ড ডায়াগনস্টিক সেন্টার",
    category: "health",
    district: "চট্টগ্রাম",
    upazila: "সাতকানিয়া",
    union: "সাতকানিয়া পৌরসভা",
    area: "কোর্ট রোড, সাতকানিয়া পৌরসভা",
    phone: "01857454074",
    verified: true,
    description: "বেসরকারি হাসপাতাল — সাতকানিয়া পৌরসভা (কাঞ্চনা নয়)। সিরিয়াল: ০১৮৫৭-৪৫৪০৭৪।",
    fields: { serviceType: "বেসরকারি হাসপাতাল", openingHours: "সিরিয়াল অনুযায়ী" },
  },
  {
    id: "sk-dr-romashree",
    name: "ডাঃ রমাশ্রী ধর",
    category: "doctor",
    district: "চট্টগ্রাম",
    upazila: "সাতকানিয়া",
    union: "সাতকানিয়া পৌরসভা",
    area: "আলফা হাসপাতাল, কোর্ট রোড, সাতকানিয়া পৌরসভা",
    phone: "01857454074",
    verified: true,
    description: "মেডিসিন বিশেষজ্ঞ — চেম্বার সাতকানিয়া পৌরসভায় (কাঞ্চনা নয়)।",
    fields: {
      specialization: "মেডিসিন / ডায়াবেটিস",
      chamber: "আলফা হাসপাতাল, সাতকানিয়া সদর",
      visitingTime: "শুক্র ১০–৪; শনি/সোম/বুধ ২–৪",
    },
  },
  {
    id: "sk-govt-college",
    name: "সাতকানিয়া সরকারি কলেজ",
    category: "education",
    district: "চট্টগ্রাম",
    upazila: "সাতকানিয়া",
    union: "সাতকানিয়া পৌরসভা",
    area: "সাতকানিয়া পৌরসভা",
    phone: "01824107190",
    verified: true,
    description: "সরকারি কলেজ — সাতকানিয়া পৌরসভা (কাঞ্চনা ইউনিয়ন নয়)। EIIN: 105061।",
    fields: { institutionType: "সরকারি কলেজ", eiin: "105061" },
  },
  {
    id: "sk-bus",
    name: "সাতকানিয়া মহাসড়ক / বাস",
    category: "transport",
    district: "চট্টগ্রাম",
    upazila: "সাতকানিয়া",
    union: "সাতকানিয়া (উপজেলা)",
    area: "চট্টগ্রাম–কক্সবাজার মহাসড়ক (সাতকানিয়া অংশ)",
    phone: "",
    verified: true,
    description: "উপজেলা যোগাযোগ। কাঞ্চনা থেকে সিএনজি/বাসযোগে সদর ও চট্টগ্রাম।",
    fields: {
      route: "সাতকানিয়া – চট্টগ্রাম",
      departure: "সারা দিন",
      counter: "মহাসড়ক স্ট্যান্ড",
    },
  },

  // ========== জাতীয় / উপজেলা-ব্যাপী (কোনো এক ইউনিয়নের নয়) ==========
  {
    id: "bd-999",
    name: "জাতীয় জরুরি সেবা — ৯৯৯",
    category: "emergency",
    district: "চট্টগ্রাম",
    upazila: "সাতকানিয়া",
    union: "সাতকানিয়া (উপজেলা)",
    area: "সারা বাংলাদেশ",
    phone: "999",
    verified: true,
    description: "পুলিশ, ফায়ার, অ্যাম্বুলেন্স — জাতীয় হটলাইন (কোনো নির্দিষ্ট ইউনিয়ন নয়)।",
    fields: { emergencyType: "পুলিশ / ফায়ার / অ্যাম্বুলেন্স", hotline: "999" },
  },
  {
    id: "bd-102",
    name: "ফায়ার সার্ভিস হটলাইন — ১০২",
    category: "emergency",
    district: "চট্টগ্রাম",
    upazila: "সাতকানিয়া",
    union: "সাতকানিয়া (উপজেলা)",
    area: "সারা বাংলাদেশ",
    phone: "102",
    verified: true,
    description: "ফায়ার সার্ভিস জাতীয় হটলাইন।",
    fields: { emergencyType: "ফায়ার সার্ভিস", hotline: "102" },
  },
  {
    id: "bd-109",
    name: "নারী ও শিশু হেল্পলাইন — ১০৯",
    category: "emergency",
    district: "চট্টগ্রাম",
    upazila: "সাতকানিয়া",
    union: "সাতকানিয়া (উপজেলা)",
    area: "সারা বাংলাদেশ",
    phone: "109",
    verified: true,
    description: "জাতীয় হেল্পলাইন।",
    fields: { emergencyType: "নারী ও শিশু সহায়তা", hotline: "109" },
  },
];

export function countByCategory(categoryId: string) {
  return services.filter((s) => s.category === categoryId).length;
}

export function servicesInPilot() {
  return services.filter((s) => s.upazila === "সাতকানিয়া");
}

/** শুধু কাঞ্চনা ইউনিয়ন — সদর/পৌর/জাতীয় মিশবে না */
export function servicesInKanchana() {
  return services.filter((s) => s.union === "কাঞ্চনা");
}

export function servicesInSatkaniaSadar() {
  return services.filter((s) => s.union === "সাতকানিয়া পৌরসভা");
}
