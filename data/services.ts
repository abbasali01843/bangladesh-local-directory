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
 * Public listings compiled from open web sources (Wikipedia, hospital pages,
 * national hotlines, gov portals). Phones/hours may change — verify locally.
 * Last research pass: 2026-09-22.
 */
export const services: Service[] = [
  // —— স্বাস্থ্য / হাসপাতাল ——
  {
    id: "sk-uhc",
    name: "সাতকানিয়া উপজেলা স্বাস্থ্য কমপ্লেক্স",
    category: "health",
    district: "চট্টগ্রাম",
    upazila: "সাতকানিয়া",
    area: "সাতকানিয়া সদর",
    phone: "01730324455",
    verified: true,
    description:
      "সরকারি উপজেলা স্বাস্থ্য কমপ্লেক্স (প্রায় ৫০ শয্যা)। বর্হিবিভাগে প্রতিদিন শত শত রোগী সেবা নেন। ইমেইল: satkania@uhfpo.dghs.gov.bd",
    fields: {
      serviceType: "সরকারি হাসপাতাল / UHC",
      openingHours: "জরুরি সেবা ২৪ ঘণ্টা",
    },
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
    description:
      "বেসরকারি হাসপাতাল ও ডায়াগনস্টিক। কোর্ট রোড, সাতকানিয়া পৌরসভা। সিরিয়াল: ০১৮৫৭-৪৫৪০৭৪, ০১৮৩৮-৮১৭৪৮৪। ইমেইল: alphahospital18@gmail.com",
    fields: {
      serviceType: "বেসরকারি হাসপাতাল / ডায়াগনস্টিক",
      openingHours: "সিরিয়াল অনুযায়ী",
    },
  },
  {
    id: "sk-ahmad-sufia",
    name: "আহমদ সুফিয়া দাতব্য চিকিৎসালয়",
    category: "health",
    district: "চট্টগ্রাম",
    upazila: "সাতকানিয়া",
    area: "মধ্য রূপকানিয়া, সাতকানিয়া পৌরসভা",
    phone: "",
    verified: true,
    description:
      "দাতব্য চিকিৎসালয় (মধ্য রূপকানিয়া)। প্রতি সোমবার বিনামূল্যে প্রাথমিক চিকিৎসা ও ওষুধ — স্থানীয় সংবাদ সূত্রে।",
    fields: {
      serviceType: "দাতব্য চিকিৎসালয়",
      openingHours: "সোমবার (দাতব্য সেবা)",
    },
  },
  {
    id: "sk-vet",
    name: "উপজেলা প্রাণিসম্পদ দপ্তর ও ভেটেরিনারি হাসপাতাল",
    category: "health",
    district: "চট্টগ্রাম",
    upazila: "সাতকানিয়া",
    area: "সাতকানিয়া সদর",
    phone: "",
    verified: true,
    description: "সাতকানিয়া উপজেলা প্রাণিসম্পদ দপ্তর ও ভেটেরিনারি হাসপাতাল — পশু চিকিৎসা ও প্রাণিসম্পদ সেবা।",
    fields: {
      serviceType: "ভেটেরিনারি হাসপাতাল",
      openingHours: "অফিস সময়",
    },
  },

  // —— ডাক্তার (আলফা হাসপাতাল চেম্বার — পাবলিক লিস্ট) ——
  {
    id: "sk-dr-romashree",
    name: "ডাঃ রমাশ্রী ধর",
    category: "doctor",
    district: "চট্টগ্রাম",
    upazila: "সাতকানিয়া",
    area: "আলফা হাসপাতাল, কোর্ট রোড",
    phone: "01857454074",
    verified: true,
    description:
      "মেডিসিন, ডায়াবেটিস, কিডনি, লিভার, শ্বাসরোগ ও বাতরোগ বিশেষজ্ঞ। এমবিবিএস, বিসিএস (স্বাস্থ্য), এমএসিপি (ইউএসএ), এফসিপিএস (মেডিসিন)। বিএমডিসি: এ-৪২৯৪৪।",
    fields: {
      specialization: "মেডিসিন / ডায়াবেটিস",
      chamber: "আলফা হাসপাতাল, কোর্ট রোড",
      visitingTime: "শুক্র ১০টা–৪টা; শনি/সোম/বুধ ২টা–৪টা",
    },
  },
  {
    id: "sk-dr-mannan",
    name: "ডাঃ এম. এ. মান্নান ভূঁইয়া",
    category: "doctor",
    district: "চট্টগ্রাম",
    upazila: "সাতকানিয়া",
    area: "আলফা হাসপাতাল, কোর্ট রোড",
    phone: "01857454074",
    verified: true,
    description:
      "চক্ষু বিশেষজ্ঞ ও সার্জন। এমবিবিএস, ডিসিও (সি.ইউ), এফআইসিও (লন্ডন)। চট্টগ্রাম চক্ষু হাসপাতাল ও প্রশিক্ষণ কমপ্লেক্স।",
    fields: {
      specialization: "চক্ষু",
      chamber: "আলফা হাসপাতাল, কোর্ট রোড",
      visitingTime: "শুক্রবার দুপুর ২টা – বিকাল ৫টা",
    },
  },
  {
    id: "sk-dr-farhad",
    name: "ডাঃ ফরহাদ উদ্দিন হাছান চৌধুরী (মারুফ)",
    category: "doctor",
    district: "চট্টগ্রাম",
    upazila: "সাতকানিয়া",
    area: "আলফা হাসপাতাল, কোর্ট রোড",
    phone: "01857454074",
    verified: true,
    description:
      "মেডিসিন ও ইনফেকশন বিশেষজ্ঞ। এমবিবিএস, বিসিএস (স্বাস্থ্য), এফসিপিএস (মেডিসিন), এমএসসি (ইনফেকশাস ডিজিজ, ইংল্যান্ড)। ঢাকা মেডিকেল কলেজ হাসপাতাল।",
    fields: {
      specialization: "মেডিসিন / ইনফেকশন",
      chamber: "আলফা হাসপাতাল, কোর্ট রোড",
      visitingTime: "সিরিয়াল অনুযায়ী",
    },
  },
  {
    id: "sk-dr-ishtiak",
    name: "ডাঃ মোঃ ইশতিয়াক খালেদ (শাওন)",
    category: "doctor",
    district: "চট্টগ্রাম",
    upazila: "সাতকানিয়া",
    area: "আলফা হাসপাতাল, কোর্ট রোড",
    phone: "01857454074",
    verified: true,
    description:
      "হৃদরোগ বিশেষজ্ঞ। এমবিবিএস (চমেক), বিসিএস (স্বাস্থ্য), ডি-কার্ড (বিএমইউ)। চট্টগ্রাম জেনারেল হাসপাতাল।",
    fields: {
      specialization: "কার্ডিওলজি / হৃদরোগ",
      chamber: "আলফা হাসপাতাল, কোর্ট রোড",
      visitingTime: "সিরিয়াল অনুযায়ী",
    },
  },
  {
    id: "sk-dr-mithila",
    name: "ডাঃ মিথিলা শারমিন",
    category: "doctor",
    district: "চট্টগ্রাম",
    upazila: "সাতকানিয়া",
    area: "আলফা হাসপাতাল, কোর্ট রোড",
    phone: "01857454074",
    verified: true,
    description:
      "মুখ ও দন্তরোগ বিশেষজ্ঞ। বিডিএস, পিজিটি (এন্ডোডন্টিক্স), ডেন্টাল ইমপ্লান্ট প্রশিক্ষণ। চট্টগ্রাম মেডিকেল কলেজ।",
    fields: {
      specialization: "দন্তরোগ",
      chamber: "আলফা হাসপাতাল, কোর্ট রোড",
      visitingTime: "শুক্রবার সকাল ১১টা – রাত ৮টা",
    },
  },

  // —— জরুরি ——
  {
    id: "sk-999",
    name: "জাতীয় জরুরি সেবা — ৯৯৯",
    category: "emergency",
    district: "চট্টগ্রাম",
    upazila: "সাতকানিয়া",
    area: "সারা উপজেলা",
    phone: "999",
    verified: true,
    description:
      "পুলিশ, ফায়ার, অ্যাম্বুলেন্স — একটি নম্বরে ২৪ ঘণ্টা। যেকোনো মোবাইল থেকে বিনামূল্যে কল।",
    fields: { emergencyType: "পুলিশ / ফায়ার / অ্যাম্বুলেন্স", hotline: "999" },
  },
  {
    id: "sk-102",
    name: "ফায়ার সার্ভিস হটলাইন — ১০২",
    category: "emergency",
    district: "চট্টগ্রাম",
    upazila: "সাতকানিয়া",
    area: "সারা উপজেলা",
    phone: "102",
    verified: true,
    description: "ফায়ার সার্ভিস ও সিভিল ডিফেন্স জাতীয় হটলাইন। অগ্নিকাণ্ড ও দুর্ঘটনায় কল করুন।",
    fields: { emergencyType: "ফায়ার সার্ভিস", hotline: "102" },
  },
  {
    id: "sk-109",
    name: "নারী ও শিশু নির্যাতন প্রতিরোধ হটলাইন — ১০৯",
    category: "emergency",
    district: "চট্টগ্রাম",
    upazila: "সাতকানিয়া",
    area: "সারা উপজেলা",
    phone: "109",
    verified: true,
    description: "নারী ও শিশু নির্যাতন প্রতিরোধে জাতীয় হেল্পলাইন।",
    fields: { emergencyType: "নারী ও শিশু সহায়তা", hotline: "109" },
  },

  // —— শিক্ষা ——
  {
    id: "sk-govt-college",
    name: "সাতকানিয়া সরকারি কলেজ",
    category: "education",
    district: "চট্টগ্রাম",
    upazila: "সাতকানিয়া",
    area: "সাতকানিয়া পৌরসভা",
    phone: "01824107190",
    verified: true,
    description:
      "১৯৪৯ সালে প্রতিষ্ঠিত সরকারি কলেজ। উচ্চ মাধ্যমিক ও স্নাতক। EIIN: 105061। ওয়েব: satkaniagovtcollege.edu.bd",
    fields: { institutionType: "সরকারি কলেজ", eiin: "105061" },
  },
  {
    id: "sk-mohila-college",
    name: "সাতকানিয়া আদর্শ মহিলা কলেজ",
    category: "education",
    district: "চট্টগ্রাম",
    upazila: "সাতকানিয়া",
    area: "সাতকানিয়া",
    phone: "",
    verified: true,
    description: "সাতকানিয়ার মহিলা কলেজ। EIIN: 105059 (পাবলিক EIIN তালিকা)।",
    fields: { institutionType: "মহিলা কলেজ", eiin: "105059" },
  },
  {
    id: "sk-kanchana-school",
    name: "আমিলাইশ কাঞ্চনা উচ্চ বিদ্যালয় / কাঞ্চনা বালিকা উচ্চ বিদ্যালয় এলাকা",
    category: "education",
    district: "চট্টগ্রাম",
    upazila: "সাতকানিয়া",
    area: "কাঞ্চনা",
    phone: "",
    verified: true,
    description:
      "কাঞ্চনা ইউনিয়নে উচ্চ বিদ্যালয় ও প্রাথমিক বিদ্যালয় রয়েছে। ইউনিয়ন পরিষদ সূত্রে: সরকারি প্রাথমিক ৫টি, উচ্চ বিদ্যালয় ৩টি।",
    fields: { institutionType: "মাধ্যমিক / প্রাথমিক", eiin: "—" },
  },

  // —— প্রশাসন / সংগঠন ——
  {
    id: "sk-kanchana-up",
    name: "৪ নং কাঞ্চনা ইউনিয়ন পরিষদ",
    category: "organization",
    district: "চট্টগ্রাম",
    upazila: "সাতকানিয়া",
    area: "কাঞ্চনা (মনু ফকির হাট বাজার এলাকা)",
    phone: "",
    verified: true,
    description:
      "কাঞ্চনা ইউনিয়ন পরিষদ। জনসংখ্যা প্রায় ২১,৫০০+। গ্রাম: উত্তর/মধ্য/দক্ষিণ কাঞ্চনা। ওয়েব: kanchanaup.chittagong.gov.bd। জন্মনিবন্ধন, নাগরিক সনদ ইত্যাদি সেবা।",
    fields: {
      orgType: "ইউনিয়ন পরিষদ",
      contactPerson: "চেয়ারম্যান অফিস",
    },
  },
  {
    id: "sk-upazila-hq",
    name: "সাতকানিয়া উপজেলা পরিষদ / প্রশাসন",
    category: "organization",
    district: "চট্টগ্রাম",
    upazila: "সাতকানিয়া",
    area: "সাতকানিয়া সদর",
    phone: "",
    verified: true,
    description:
      "সাতকানিয়া উপজেলা প্রশাসনিক সদর। পোস্টকোড ৪৩৮৬। ১টি পৌরসভা ও ১৭টি ইউনিয়ন নিয়ে গঠিত উপজেলা।",
    fields: { orgType: "উপজেলা প্রশাসন", contactPerson: "উপজেলা নির্বাহী অফিসার" },
  },

  // —— পরিবহন ——
  {
    id: "sk-bus",
    name: "সাতকানিয়া বাস / মহাসড়ক যোগাযোগ",
    category: "transport",
    district: "চট্টগ্রাম",
    upazila: "সাতকানিয়া",
    area: "চট্টগ্রাম–কক্সবাজার মহাসড়ক",
    phone: "",
    verified: true,
    description:
      "প্রধান সড়ক: চট্টগ্রাম–কক্সবাজার মহাসড়ক। চট্টগ্রাম শহর ও আশেপাশের উপজেলায় বাস/সিএনজি চলাচল করে। সাতকানিয়া রেলওয়ে স্টেশনও রয়েছে।",
    fields: {
      route: "সাতকানিয়া – চট্টগ্রাম / কক্সবাজার",
      departure: "সারা দিন",
      counter: "মহাসড়ক ও স্থানীয় স্ট্যান্ড",
    },
  },
  {
    id: "sk-rail",
    name: "সাতকানিয়া রেলওয়ে স্টেশন",
    category: "transport",
    district: "চট্টগ্রাম",
    upazila: "সাতকানিয়া",
    area: "সাতকানিয়া",
    phone: "",
    verified: true,
    description: "সাতকানিয়া রেলওয়ে স্টেশন — উপজেলার দর্শনীয় ও যোগাযোগ কেন্দ্রগুলোর একটি।",
    fields: {
      route: "রেল যোগাযোগ",
      departure: "ট্রেন সময়সূচি অনুযায়ী",
      counter: "স্টেশন",
    },
  },

  // —— কুরিয়ার ——
  {
    id: "sk-sundarban",
    name: "সুন্দরবন কুরিয়ার সার্ভিস — সাতকানিয়া শাখা",
    category: "courier",
    district: "চট্টগ্রাম",
    upazila: "সাতকানিয়া",
    area: "স্টেশন রোড, সাতকানিয়া পৌরসভা",
    phone: "01191778272",
    verified: true,
    description: "সুন্দরবন কুরিয়ার — সাতকানিয়া শাখা। ঠিকানা: এস.এম. এন্টারপ্রাইজ, স্টেশন রোড (পাবলিক ডিরেক্টরি সূত্র)।",
    fields: { coverage: "সারা দেশ", hotline: "01191778272" },
  },

  // —— ধর্মীয় ——
  {
    id: "sk-kazi-bari-masjid",
    name: "কাজী বাড়ি জামে মসজিদ, কাঞ্চনা",
    category: "religious",
    district: "চট্টগ্রাম",
    upazila: "সাতকানিয়া",
    area: "কাঞ্চনা",
    phone: "",
    verified: true,
    description: "কাঞ্চনার পরিচিত জামে মসজিদ (উইকিপিডিয়া / স্থানীয় তালিকায় উল্লেখ)।",
    fields: { institutionType: "মসজিদ", contactPerson: "মসজিদ কমিটি" },
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
