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

export const services: Service[] = [
  {
    id: "demo-1",
    name: "ডা. করিম চেম্বার",
    category: "doctor",
    district: "শেরপুর",
    upazila: "শেরপুর সদর",
    area: "শেরপুর শহর",
    phone: "01700-000001",
    verified: true,
    description: "মেডিসিন বিশেষজ্ঞ। সকাল ১০টা থেকে দুপুর ১টা পর্যন্ত চেম্বার খোলা থাকে।",
    fields: {
      specialization: "মেডিসিন",
      chamber: "শেরপুর শহর, মেইন রোড",
      visitingTime: "সকাল ১০টা – দুপুর ১টা",
    },
  },
  {
    id: "demo-2",
    name: "আল-মাদিনা সুপার স্টোর",
    category: "business",
    district: "চট্টগ্রাম",
    upazila: "সাতকানিয়া",
    area: "সাতকানিয়া বাজার",
    phone: "01800-000002",
    verified: false,
    description: "খুচরা ও পাইকারি মুদি দোকান। প্রতিদিন সকাল ৮টা থেকে রাত ১০টা পর্যন্ত খোলা।",
    fields: {
      businessType: "মুদি / সুপার স্টোর",
      openingHours: "সকাল ৮টা – রাত ১০টা",
    },
  },
  {
    id: "demo-3",
    name: "ইলেকট্রিশিয়ান রফিক",
    category: "mistri",
    district: "ঢাকা",
    upazila: "সাভার",
    area: "আশুলিয়া",
    phone: "01900-000003",
    verified: true,
    description: "বাসা ও অফিসের ইলেকট্রিক্যাল কাজ। জরুরি কল সাপোর্ট আছে।",
    fields: {
      skill: "ইলেকট্রিশিয়ান",
      availability: "সকাল ৯টা – রাত ৯টা",
    },
  },
  {
    id: "demo-4",
    name: "শেরপুর এক্সপ্রেস বাস কাউন্টার",
    category: "transport",
    district: "শেরপুর",
    upazila: "শেরপুর সদর",
    area: "বাস স্ট্যান্ড",
    phone: "01600-000004",
    verified: true,
    description: "ঢাকা–শেরপুর রুটে নিয়মিত বাস সার্ভিস।",
    fields: {
      route: "ঢাকা – শেরপুর",
      departure: "সকাল ৬:৩০, সন্ধ্যা ৫:০০",
      counter: "শেরপুর বাস স্ট্যান্ড",
    },
  },
  {
    id: "demo-5",
    name: "জরুরি অ্যাম্বুলেন্স সেবা",
    category: "emergency",
    district: "শেরপুর",
    upazila: "নকলা",
    area: "নকলা সদর",
    phone: "999",
    verified: true,
    description: "২৪ ঘণ্টা অ্যাম্বুলেন্স সার্ভিস।",
    fields: {
      emergencyType: "অ্যাম্বুলেন্স",
      hotline: "999",
    },
  },
];
