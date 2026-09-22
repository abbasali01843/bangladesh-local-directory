export type Service = {
  id: string;
  name: string;
  category: string;
  district: string;
  upazila: string;
  area: string;
  phone: string;
  verified: boolean;
  description: string;
  fields: Record<string, string>;
};

/**
 * Listings: কাঞ্চনা ইউনিয়ন অগ্রাধিকার + সাতকানিয়া সদরের প্রয়োজনীয় সেবা।
 * Sources: Wikipedia, UP portal, EIIN, DGHS, hospital pages, national hotlines.
 * Updated: 2026-09-22. Verify phones locally.
 */
export const services: Service[] = [
  // ========== কাঞ্চনা: প্রশাসন ==========
  {
    id: "kn-up",
    name: "৪ নং কাঞ্চনা ইউনিয়ন পরিষদ",
    category: "organization",
    district: "চট্টগ্রাম",
    upazila: "সাতকানিয়া",
    area: "কাঞ্চনা (মনু ফকির হাট বাজার এলাকায় কার্যালয় চলে এসেছে — সংবাদ)",
    phone: "",
    verified: true,
    description:
      "কাঞ্চনা ইউনিয়ন পরিষদ। আয়তন ~১৩.৫৩ বর্গকিমি। গ্রাম: উত্তর, মধ্য, দক্ষিণ কাঞ্চনা। জনসংখ্যা ২০২২: ~২২,৭০৩। ওয়েব: kanchanaup.chittagong.gov.bd। উপজেলা সদর থেকে ~১৫ কিমি।",
    fields: { orgType: "ইউনিয়ন পরিষদ", contactPerson: "চেয়ারম্যান / সচিব অফিস" },
  },
  {
    id: "kn-usc",
    name: "কাঞ্চনা ইউনিয়ন সাব সেন্টার",
    category: "health",
    district: "চট্টগ্রাম",
    upazila: "সাতকানিয়া",
    area: "কাঞ্চনা",
    phone: "",
    verified: true,
    description:
      "DGHS ইউনিয়ন সাব-সেন্টার (Organization Code 10000833)। প্রাথমিক বহির্বিভাগ সেবা।",
    fields: { serviceType: "ইউনিয়ন স্বাস্থ্য উপকেন্দ্র", openingHours: "অফিস সময়" },
  },

  // ========== কাঞ্চনা: শিক্ষা (মাধ্যমিক) ==========
  {
    id: "kn-akbc",
    name: "আমিলাইশ কাঞ্চনা বঙ্গ চন্দ্র ঘোষ ইন্সটিটিউট",
    category: "education",
    district: "চট্টগ্রাম",
    upazila: "সাতকানিয়া",
    area: "কাঞ্চনা",
    phone: "",
    verified: true,
    description: "মাধ্যমিক বিদ্যালয় (ঐতিহ্যবাহী প্রতিষ্ঠান, ~১৯২৯)। EIIN: 104996।",
    fields: { institutionType: "মাধ্যমিক বিদ্যালয়", eiin: "104996" },
  },
  {
    id: "kn-girls-hs",
    name: "কাঞ্চনা বালিকা উচ্চ বিদ্যালয়",
    category: "education",
    district: "চট্টগ্রাম",
    upazila: "সাতকানিয়া",
    area: "কাঞ্চনা",
    phone: "",
    verified: true,
    description: "বালিকা উচ্চ বিদ্যালয়। EIIN: 104998।",
    fields: { institutionType: "বালিকা উচ্চ বিদ্যালয়", eiin: "104998" },
  },
  {
    id: "kn-south-hs",
    name: "দক্ষিণ কাঞ্চনা নুর আহমদ চৌধুরী উচ্চ বিদ্যালয়",
    category: "education",
    district: "চট্টগ্রাম",
    upazila: "সাতকানিয়া",
    area: "দক্ষিণ কাঞ্চনা",
    phone: "",
    verified: true,
    description: "দক্ষিণ কাঞ্চনা মাধ্যমিক বিদ্যালয়। EIIN: 105011।",
    fields: { institutionType: "মাধ্যমিক বিদ্যালয়", eiin: "105011" },
  },

  // ========== কাঞ্চনা: মাদ্রাসা ==========
  {
    id: "kn-anwarul",
    name: "কাঞ্চনা আনোয়ারুল উলুম ইসলামিয়া আলিম মাদ্রাসা",
    category: "education",
    district: "চট্টগ্রাম",
    upazila: "সাতকানিয়া",
    area: "কাঞ্চনা",
    phone: "01815507790",
    verified: true,
    description:
      "আলিম/সিনিয়র মাদ্রাসা। EIIN: 105039। দাখিল ফলাফলে সাতকানিয়ায় শীর্ষস্থানীয় সাফল্যের রেকর্ড (সংবাদ)। যোগাযোগ (পাবলিক তালিকা): ০১৮১৫-৫০৭৭৯০ / ০১৩০৯-১০৫০৩৯।",
    fields: { institutionType: "আলিম মাদ্রাসা", eiin: "105039" },
  },
  {
    id: "kn-rashidia",
    name: "দক্ষিণ কাঞ্চনা শাহ রশিদিয়া ইসলামিয়া দাখিল মাদ্রাসা",
    category: "education",
    district: "চট্টগ্রাম",
    upazila: "সাতকানিয়া",
    area: "দক্ষিণ কাঞ্চনা",
    phone: "",
    verified: true,
    description: "দাখিল মাদ্রাসা, দক্ষিণ কাঞ্চনা (উইকিপিডিয়া তালিকা)।",
    fields: { institutionType: "দাখিল মাদ্রাসা", eiin: "—" },
  },
  {
    id: "kn-darul-ihsan",
    name: "দারুল ইহসান মহিলা দাখিল মাদ্রাসা",
    category: "education",
    district: "চট্টগ্রাম",
    upazila: "সাতকানিয়া",
    area: "কাঞ্চনা",
    phone: "",
    verified: true,
    description: "মহিলা দাখিল মাদ্রাসা, কাঞ্চনা ইউনিয়ন (উইকিপিডিয়া)।",
    fields: { institutionType: "মহিলা দাখিল মাদ্রাসা", eiin: "—" },
  },

  // ========== কাঞ্চনা: প্রাথমিক (নমুনা — সব নাম তালিকায়) ==========
  {
    id: "kn-gps-main",
    name: "কাঞ্চনা সরকারি প্রাথমিক বিদ্যালয়",
    category: "education",
    district: "চট্টগ্রাম",
    upazila: "সাতকানিয়া",
    area: "কাঞ্চনা",
    phone: "",
    verified: true,
    description: "সরকারি প্রাথমিক বিদ্যালয়। ইউনিয়নে মোট ৯টি প্রাথমিক বিদ্যালয় (উইকি)।",
    fields: { institutionType: "সরকারি প্রাথমিক", eiin: "—" },
  },
  {
    id: "kn-gps-north",
    name: "উত্তর কাঞ্চনা সরকারি প্রাথমিক বিদ্যালয়",
    category: "education",
    district: "চট্টগ্রাম",
    upazila: "সাতকানিয়া",
    area: "উত্তর কাঞ্চনা",
    phone: "",
    verified: true,
    description: "উত্তর কাঞ্চনা সরকারি প্রাথমিক বিদ্যালয়।",
    fields: { institutionType: "সরকারি প্রাথমিক", eiin: "—" },
  },
  {
    id: "kn-gps-south",
    name: "দক্ষিণ কাঞ্চনা গুড়গুরী সরকারি প্রাথমিক বিদ্যালয়",
    category: "education",
    district: "চট্টগ্রাম",
    upazila: "সাতকানিয়া",
    area: "দক্ষিণ কাঞ্চনা",
    phone: "",
    verified: true,
    description: "দক্ষিণ কাঞ্চনা গুড়গুরী সরকারি প্রাথমিক বিদ্যালয়।",
    fields: { institutionType: "সরকারি প্রাথমিক", eiin: "—" },
  },

  // ========== কাঞ্চনা: হাট-বাজার ==========
  {
    id: "kn-hat-monu",
    name: "মনু ফকির হাট",
    category: "business",
    district: "চট্টগ্রাম",
    upazila: "সাতকানিয়া",
    area: "কাঞ্চনা",
    phone: "",
    verified: true,
    description: "কাঞ্চনা ইউনিয়নের প্রধান হাটগুলোর একটি। ইউপি কার্যক্রমও এ বাজার এলাকায় চলেছে বলে সংবাদে উল্লেখ।",
    fields: { businessType: "হাট / বাজার", openingHours: "হাটের দিন" },
  },
  {
    id: "kn-hat-jot",
    name: "জোট পুকুরিয়া বাজার",
    category: "business",
    district: "চট্টগ্রাম",
    upazila: "সাতকানিয়া",
    area: "কাঞ্চনা",
    phone: "",
    verified: true,
    description: "কাঞ্চনার প্রধান হাট-বাজার (উইকিপিডিয়া)। পাশে জামে মসজিদ।",
    fields: { businessType: "হাট / বাজার", openingHours: "হাটের দিন" },
  },
  {
    id: "kn-hat-lata",
    name: "লতাপীরের বাজার",
    category: "business",
    district: "চট্টগ্রাম",
    upazila: "সাতকানিয়া",
    area: "কাঞ্চনা",
    phone: "",
    verified: true,
    description: "কাঞ্চনা ইউনিয়নের তৃতীয় প্রধান হাট-বাজার।",
    fields: { businessType: "হাট / বাজার", openingHours: "হাটের দিন" },
  },

  // ========== কাঞ্চনা: ধর্মীয় ==========
  {
    id: "kn-kazi-masjid",
    name: "কাজী বাড়ি / কাজির জামে মসজিদ",
    category: "religious",
    district: "চট্টগ্রাম",
    upazila: "সাতকানিয়া",
    area: "কাঞ্চনা",
    phone: "",
    verified: true,
    description: "ঐতিহ্যবাহী কাজির জামে মসজিদ — উপজেলা/উইকি তালিকায় উল্লেখ।",
    fields: { institutionType: "জামে মসজিদ", contactPerson: "মসজিদ কমিটি" },
  },
  {
    id: "kn-jangli-pir",
    name: "জংলি পীর মাজার, কাঞ্চনা",
    category: "religious",
    district: "চট্টগ্রাম",
    upazila: "সাতকানিয়া",
    area: "কাঞ্চনা",
    phone: "",
    verified: true,
    description: "কাঞ্চনার পরিচিত মাজার/দর্শনীয় স্থান (সাতকানিয়া উইকিপিডিয়া)।",
    fields: { institutionType: "মাজার", contactPerson: "—" },
  },
  {
    id: "kn-kali-bari",
    name: "কাঞ্চনা কালীবাড়ি",
    category: "religious",
    district: "চট্টগ্রাম",
    upazila: "সাতকানিয়া",
    area: "কাঞ্চনা",
    phone: "",
    verified: true,
    description: "হিন্দু মন্দির — বাংলাপিডিয়া/উইকিতে কাঞ্চনা কালীবাড়ি উল্লেখ।",
    fields: { institutionType: "মন্দির", contactPerson: "—" },
  },

  // ========== জরুরি (সারা এলাকা) ==========
  {
    id: "bd-999",
    name: "জাতীয় জরুরি সেবা — ৯৯৯",
    category: "emergency",
    district: "চট্টগ্রাম",
    upazila: "সাতকানিয়া",
    area: "কাঞ্চনা / সারা উপজেলা",
    phone: "999",
    verified: true,
    description: "পুলিশ, ফায়ার, অ্যাম্বুলেন্স — ২৪ ঘণ্টা, বিনামূল্যে।",
    fields: { emergencyType: "পুলিশ / ফায়ার / অ্যাম্বুলেন্স", hotline: "999" },
  },
  {
    id: "bd-102",
    name: "ফায়ার সার্ভিস হটলাইন — ১০২",
    category: "emergency",
    district: "চট্টগ্রাম",
    upazila: "সাতকানিয়া",
    area: "কাঞ্চনা / সারা উপজেলা",
    phone: "102",
    verified: true,
    description: "ফায়ার সার্ভিস ও সিভিল ডিফেন্স জাতীয় হটলাইন।",
    fields: { emergencyType: "ফায়ার সার্ভিস", hotline: "102" },
  },
  {
    id: "bd-109",
    name: "নারী ও শিশু হেল্পলাইন — ১০৯",
    category: "emergency",
    district: "চট্টগ্রাম",
    upazila: "সাতকানিয়া",
    area: "কাঞ্চনা / সারা উপজেলা",
    phone: "109",
    verified: true,
    description: "নারী ও শিশু নির্যাতন প্রতিরোধ হটলাইন।",
    fields: { emergencyType: "নারী ও শিশু সহায়তা", hotline: "109" },
  },

  // ========== সাতকানিয়া সদর (কাঞ্চনাবাসীর জন্য প্রয়োজনীয়) ==========
  {
    id: "sk-uhc",
    name: "সাতকানিয়া উপজেলা স্বাস্থ্য কমপ্লেক্স",
    category: "health",
    district: "চট্টগ্রাম",
    upazila: "সাতকানিয়া",
    area: "সাতকানিয়া সদর",
    phone: "01730324455",
    verified: true,
    description: "সরকারি UHC (~৫০ শয্যা)। ইমেইল: satkania@uhfpo.dghs.gov.bd",
    fields: { serviceType: "সরকারি হাসপাতাল", openingHours: "জরুরি ২৪ ঘণ্টা" },
  },
  {
    id: "sk-alpha",
    name: "আলফা হাসপাতাল এন্ড ডায়াগনস্টিক সেন্টার",
    category: "health",
    district: "চট্টগ্রাম",
    upazila: "সাতকানিয়া",
    area: "কোর্ট রোড, সাতকানিয়া পৌরসভা",
    phone: "01857454074",
    verified: true,
    description: "বেসরকারি হাসপাতাল। সিরিয়াল: ০১৮৫৭-৪৫৪০৭৪, ০১৮৩৮-৮১৭৪৮৪।",
    fields: { serviceType: "বেসরকারি হাসপাতাল", openingHours: "সিরিয়াল অনুযায়ী" },
  },
  {
    id: "sk-dr-romashree",
    name: "ডাঃ রমাশ্রী ধর",
    category: "doctor",
    district: "চট্টগ্রাম",
    upazila: "সাতকানিয়া",
    area: "আলফা হাসপাতাল, কোর্ট রোড",
    phone: "01857454074",
    verified: true,
    description: "মেডিসিন, ডায়াবেটিস, কিডনি, লিভার বিশেষজ্ঞ। এফসিপিএস (মেডিসিন)।",
    fields: {
      specialization: "মেডিসিন / ডায়াবেটিস",
      chamber: "আলফা হাসপাতাল",
      visitingTime: "শুক্র ১০–৪; শনি/সোম/বুধ ২–৪",
    },
  },
  {
    id: "sk-govt-college",
    name: "সাতকানিয়া সরকারি কলেজ",
    category: "education",
    district: "চট্টগ্রাম",
    upazila: "সাতকানিয়া",
    area: "সাতকানিয়া পৌরসভা",
    phone: "01824107190",
    verified: true,
    description: "সরকারি কলেজ (১৯৪৯)। EIIN: 105061।",
    fields: { institutionType: "সরকারি কলেজ", eiin: "105061" },
  },
  {
    id: "sk-bus",
    name: "সাতকানিয়া মহাসড়ক / বাস যোগাযোগ",
    category: "transport",
    district: "চট্টগ্রাম",
    upazila: "সাতকানিয়া",
    area: "চট্টগ্রাম–কক্সবাজার মহাসড়ক",
    phone: "",
    verified: true,
    description: "কাঞ্চনা থেকে সিএনজি/রিক্সা/বাসযোগে উপজেলা সদর ও চট্টগ্রাম।",
    fields: {
      route: "কাঞ্চনা – সাতকানিয়া – চট্টগ্রাম",
      departure: "সারা দিন",
      counter: "স্থানীয় স্ট্যান্ড",
    },
  },
];

export function countByCategory(categoryId: string) {
  return services.filter((s) => s.category === categoryId).length;
}

export function servicesInPilot() {
  return services.filter(
    (s) => s.district === "চট্টগ্রাম" && s.upazila === "সাতকানিয়া"
  );
}

export function servicesInKanchana() {
  return services.filter(
    (s) =>
      s.area.includes("কাঞ্চনা") ||
      s.id.startsWith("kn-") ||
      s.area.includes("মনু ফকির") ||
      s.area.includes("জোট পুকুরি")
  );
}
