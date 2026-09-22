export type CategoryField = {
  key: string;
  label: string;
  type: "text" | "tel" | "time" | "number" | "textarea";
};

export type Category = {
  id: string;
  name: string;
  icon: string;
  count: number;
  fields: CategoryField[];
};

export const categories: Category[] = [
  { id: "doctor", name: "ডাক্তার", icon: "🩺", count: 12, fields: [{ key: "specialization", label: "বিশেষত্ব", type: "text" }, { key: "chamber", label: "চেম্বার", type: "text" }, { key: "visitingTime", label: "সাক্ষাতের সময়", type: "text" }] },
  { id: "health", name: "অন্যান্য স্বাস্থ্যসেবা", icon: "🏥", count: 8, fields: [{ key: "serviceType", label: "সেবার ধরন", type: "text" }, { key: "openingHours", label: "খোলার সময়", type: "text" }] },
  { id: "emergency", name: "জরুরি সেবা", icon: "🚨", count: 5, fields: [{ key: "emergencyType", label: "সেবার ধরন", type: "text" }, { key: "hotline", label: "হটলাইন", type: "tel" }] },
  { id: "business", name: "ব্যবসা প্রতিষ্ঠান", icon: "🏪", count: 24, fields: [{ key: "businessType", label: "ব্যবসার ধরন", type: "text" }, { key: "openingHours", label: "খোলার সময়", type: "text" }] },
  { id: "education", name: "শিক্ষা প্রতিষ্ঠান", icon: "🏫", count: 15, fields: [{ key: "institutionType", label: "প্রতিষ্ঠানের ধরন", type: "text" }, { key: "eiin", label: "EIIN", type: "text" }] },
  { id: "mistri", name: "মিস্ত্রি", icon: "🔧", count: 18, fields: [{ key: "skill", label: "দক্ষতা", type: "text" }, { key: "availability", label: "সেবার সময়", type: "text" }] },
  { id: "transport", name: "পরিবহন সেবা", icon: "🚌", count: 9, fields: [{ key: "route", label: "রুট", type: "text" }, { key: "departure", label: "ছাড়ার সময়", type: "time" }, { key: "counter", label: "কাউন্টার", type: "text" }] },
  { id: "lawyer", name: "আইনজীবী", icon: "⚖️", count: 7, fields: [{ key: "court", label: "আদালত", type: "text" }, { key: "specialization", label: "আইনের ক্ষেত্র", type: "text" }] },
  { id: "food", name: "হোটেল ও রেস্টুরেন্ট", icon: "🍴", count: 11, fields: [{ key: "cuisine", label: "খাবারের ধরন", type: "text" }, { key: "openingHours", label: "খোলার সময়", type: "text" }] },
  { id: "hotel", name: "আবাসিক হোটেল", icon: "🏨", count: 3, fields: [{ key: "roomType", label: "রুম টাইপ", type: "text" }, { key: "price", label: "রেট", type: "text" }] },
  { id: "courier", name: "কুরিয়ার ও পার্সেল", icon: "📦", count: 4, fields: [{ key: "coverage", label: "কভারেজ এলাকা", type: "text" }, { key: "hotline", label: "হটলাইন", type: "tel" }] },
  { id: "journalist", name: "সাংবাদিক", icon: "📰", count: 6, fields: [{ key: "media", label: "মিডিয়া / সংস্থা", type: "text" }, { key: "beat", label: "বিট", type: "text" }] },
  { id: "tuition", name: "টিউশন সেবা", icon: "📚", count: 10, fields: [{ key: "subject", label: "বিষয়", type: "text" }, { key: "classLevel", label: "শ্রেণি", type: "text" }] },
  { id: "organization", name: "সংগঠন", icon: "🏛️", count: 5, fields: [{ key: "orgType", label: "সংগঠনের ধরন", type: "text" }, { key: "contactPerson", label: "যোগাযোগকারী", type: "text" }] },
  { id: "finance", name: "আর্থিক ও ব্যবসায়িক সেবা", icon: "🏦", count: 4, fields: [{ key: "serviceType", label: "সেবার ধরন", type: "text" }, { key: "openingHours", label: "খোলার সময়", type: "text" }] },
  { id: "rent", name: "ভাড়া", icon: "🏠", count: 2, fields: [{ key: "propertyType", label: "সম্পত্তির ধরন", type: "text" }, { key: "rentAmount", label: "ভাড়া", type: "text" }] },
  { id: "buy-sell", name: "ক্রয় / বিক্রয়", icon: "🛒", count: 3, fields: [{ key: "itemType", label: "পণ্যের ধরন", type: "text" }, { key: "price", label: "মূল্য", type: "text" }] },
  { id: "entrepreneur", name: "উদ্যোক্তা", icon: "💼", count: 4, fields: [{ key: "businessArea", label: "ব্যবসার ক্ষেত্র", type: "text" }, { key: "experience", label: "অভিজ্ঞতা", type: "text" }] },
  { id: "religious", name: "ধর্মীয় ও সামাজিক প্রতিষ্ঠান", icon: "🕌", count: 6, fields: [{ key: "institutionType", label: "প্রতিষ্ঠানের ধরন", type: "text" }, { key: "contactPerson", label: "যোগাযোগকারী", type: "text" }] },
  { id: "nursery", name: "নার্সারি ও গাছপালা", icon: "🌱", count: 2, fields: [{ key: "plantTypes", label: "গাছের ধরন", type: "text" }, { key: "openingHours", label: "খোলার সময়", type: "text" }] },
  { id: "event", name: "ইভেন্ট ম্যানেজমেন্ট", icon: "🎉", count: 3, fields: [{ key: "eventTypes", label: "ইভেন্টের ধরন", type: "text" }, { key: "coverage", label: "সেবা এলাকা", type: "text" }] },
];
