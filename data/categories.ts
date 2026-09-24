export type CategoryField = {
  key: string;
  label: string;
  type: "text" | "tel" | "time" | "number" | "textarea";
};

export type SubCategory = {
  id: string;
  name: string;
  icon?: string;
};

export type Category = {
  id: string;
  name: string;
  icon: string;
  count: number;
  fields: CategoryField[];
  /** প্রিয় শেরপুর স্টাইল সাব-ক্যাটাগরি — থাকলে ক্যাটাগরি পেজে গ্রিড দেখায় */
  subcategories?: SubCategory[];
};

export const categories: Category[] = [
  {
    id: "doctor", name: "ডাক্তার", icon: "🩺", count: 12,
    fields: [{ key: "specialization", label: "বিশেষত্ব", type: "text" }, { key: "chamber", label: "চেম্বার", type: "text" }, { key: "visitingTime", label: "সাক্ষাতের সময়", type: "text" }],
    subcategories: [
      { id: "medicine", name: "মেডিসিন বিশেষজ্ঞ" },
      { id: "gynae", name: "গাইনি বিশেষজ্ঞ" },
      { id: "cardio", name: "হৃদরোগ বিশেষজ্ঞ" },
      { id: "child", name: "শিশু রোগ বিশেষজ্ঞ" },
      { id: "derma", name: "চর্ম ও যৌন রোগ" },
      { id: "ent", name: "নাক, কান ও গলা" },
      { id: "diabetes", name: "ডায়াবেটিস ও হরমোন" },
      { id: "eye", name: "চক্ষু বিশেষজ্ঞ" },
      { id: "ortho", name: "অর্থোপেডিক" },
      { id: "gastro", name: "গ্যাস্ট্রো-লিভার" },
      { id: "surgery", name: "সার্জারি" },
      { id: "dental", name: "ডেন্টিস্ট" },
      { id: "homeo", name: "হোমিওপ্যাথী" },
      { id: "vet", name: "ভেটেরিনারি ডাক্তার" },
    ],
  },
  {
    id: "health", name: "অন্যান্য স্বাস্থ্যসেবা", icon: "🏥", count: 8,
    fields: [{ key: "serviceType", label: "সেবার ধরন", type: "text" }, { key: "openingHours", label: "খোলার সময়", type: "text" }],
    subcategories: [
      { id: "hospital", name: "হাসপাতাল / ক্লিনিক" },
      { id: "diagnostic", name: "ডায়াগনস্টিক সেন্টার" },
      { id: "pharmacy", name: "ফার্মেসি" },
      { id: "community", name: "কমিউনিটি / সাব-সেন্টার" },
      { id: "physio", name: "ফিজিওথেরাপি" },
    ],
  },
  {
    id: "emergency", name: "জরুরি সেবা", icon: "🚨", count: 5,
    fields: [{ key: "emergencyType", label: "সেবার ধরন", type: "text" }, { key: "hotline", label: "হটলাইন", type: "tel" }],
    subcategories: [
      { id: "hotline", name: "জাতীয় হটলাইন" },
      { id: "police", name: "পুলিশ" },
      { id: "fire", name: "ফায়ার সার্ভিস" },
      { id: "ambulance", name: "অ্যাম্বুলেন্স" },
      { id: "blood", name: "রক্তদান" },
    ],
  },
  {
    id: "transport", name: "পরিবহন সেবা", icon: "🚌", count: 9,
    fields: [{ key: "route", label: "রুট", type: "text" }, { key: "departure", label: "ছাড়ার সময়", type: "time" }, { key: "counter", label: "কাউন্টার", type: "text" }],
    subcategories: [
      { id: "bus", name: "বাস কাউন্টার" },
      { id: "cng", name: "সিএনজি / অটোরিকশা" },
      { id: "boat", name: "নৌকা / ঘাট" },
      { id: "pickup", name: "পিকআপ / ট্রাক ভাড়া" },
      { id: "micro", name: "মাইক্রোবাস ভাড়া" },
    ],
  },
  {
    id: "business", name: "ব্যবসা প্রতিষ্ঠান", icon: "🏪", count: 24,
    fields: [{ key: "businessType", label: "ব্যবসার ধরন", type: "text" }, { key: "openingHours", label: "খোলার সময়", type: "text" }],
    subcategories: [
      { id: "hat", name: "হাট / বাজার" },
      { id: "grocery", name: "মুদি দোকান" },
      { id: "clothing", name: "কাপড়ের দোকান" },
      { id: "furniture", name: "ফার্নিচার" },
      { id: "mobile", name: "মোবাইল সার্ভিসিং" },
      { id: "hardware", name: "হার্ডওয়্যার / স্যানিটেশন" },
      { id: "salon", name: "সেলুন / পার্লার" },
    ],
  },
  {
    id: "education", name: "শিক্ষা প্রতিষ্ঠান", icon: "🏫", count: 15,
    fields: [{ key: "institutionType", label: "প্রতিষ্ঠানের ধরন", type: "text" }, { key: "eiin", label: "EIIN", type: "text" }],
    subcategories: [
      { id: "primary", name: "প্রাথমিক বিদ্যালয়" },
      { id: "secondary", name: "মাধ্যমিক বিদ্যালয়" },
      { id: "college", name: "কলেজ" },
      { id: "madrasa", name: "মাদ্রাসা" },
      { id: "kindergarten", name: "কিন্ডারগার্টেন" },
      { id: "coaching", name: "কোচিং সেন্টার" },
    ],
  },
  {
    id: "mistri", name: "মিস্ত্রি", icon: "🔧", count: 18,
    fields: [{ key: "skill", label: "দক্ষতা", type: "text" }, { key: "availability", label: "সেবার সময়", type: "text" }],
    subcategories: [
      { id: "electrician", name: "ইলেকট্রিশিয়ান" },
      { id: "plumber", name: "প্লাম্বার" },
      { id: "mason", name: "রাজমিস্ত্রি" },
      { id: "carpenter", name: "কাঠমিস্ত্রি" },
      { id: "tiles", name: "টাইলস মিস্ত্রি" },
      { id: "painter", name: "পেইন্টার" },
      { id: "mechanic", name: "গ্যারেজ / মেকানিক" },
      { id: "ac-fridge", name: "ফ্রিজ / এসি / টিভি মিস্ত্রি" },
    ],
  },
  {
    id: "organization", name: "সংগঠন", icon: "🏛️", count: 5,
    fields: [{ key: "orgType", label: "সংগঠনের ধরন", type: "text" }, { key: "contactPerson", label: "যোগাযোগকারী", type: "text" }],
    subcategories: [
      { id: "union-parishad", name: "ইউনিয়ন পরিষদ" },
      { id: "ngo", name: "এনজিও" },
      { id: "club", name: "ক্লাব / সেচ্ছাসেবী সংগঠন" },
      { id: "samity", name: "সমবায় / বাজার সমিতি" },
    ],
  },
  {
    id: "finance", name: "আর্থিক ও ব্যবসায়িক সেবা", icon: "🏦", count: 4,
    fields: [{ key: "serviceType", label: "সেবার ধরন", type: "text" }, { key: "openingHours", label: "খোলার সময়", type: "text" }],
    subcategories: [
      { id: "bank", name: "ব্যাংক শাখা" },
      { id: "agent-banking", name: "এজেন্ট ব্যাংকিং" },
      { id: "ngo-loan", name: "এনজিও / ক্ষুদ্রঋণ" },
      { id: "insurance", name: "বীমা" },
    ],
  },
  {
    id: "rent", name: "ভাড়া", icon: "🏠", count: 2,
    fields: [{ key: "propertyType", label: "সম্পত্তির ধরন", type: "text" }, { key: "rentAmount", label: "ভাড়া", type: "text" }],
    subcategories: [
      { id: "house", name: "বাসা ভাড়া" },
      { id: "shop", name: "দোকান ভাড়া" },
      { id: "vehicle", name: "গাড়ি ভাড়া" },
      { id: "hall", name: "কমিউনিটি সেন্টার / হল" },
    ],
  },
  {
    id: "buy-sell", name: "ক্রয় / বিক্রয়", icon: "🛒", count: 3,
    fields: [{ key: "itemType", label: "পণ্যের ধরন", type: "text" }, { key: "price", label: "মূল্য", type: "text" }],
    subcategories: [
      { id: "land", name: "জমি / প্লট" },
      { id: "vehicle", name: "গাড়ি" },
      { id: "used", name: "পুরনো আসবাব / মালামাল" },
      { id: "farm", name: "কৃষিপণ্য / গবাদি পশু" },
    ],
  },
  {
    id: "courier", name: "কুরিয়ার ও পার্সেল", icon: "📦", count: 4,
    fields: [{ key: "coverage", label: "কভারেজ এলাকা", type: "text" }, { key: "hotline", label: "হটলাইন", type: "tel" }],
  },
  {
    id: "food", name: "হোটেল/রেস্তোরাঁ", icon: "🍴", count: 11,
    fields: [{ key: "cuisine", label: "খাবারের ধরন", type: "text" }, { key: "openingHours", label: "খোলার সময়", type: "text" }],
    subcategories: [
      { id: "hotel-food", name: "কাচ্চি / ভোজ" },
      { id: "fast-food", name: "ফাস্ট ফুড" },
      { id: "tea", name: "চায়ের দোকান" },
      { id: "sweets", name: "মিষ্টি ও বেকারি" },
      { id: "catering", name: "ক্যাটারিং" },
    ],
  },
  {
    id: "journalist", name: "সাংবাদিক", icon: "📰", count: 6,
    fields: [{ key: "media", label: "মিডিয়া / সংস্থা", type: "text" }, { key: "beat", label: "বিট", type: "text" }],
    subcategories: [
      { id: "daily", name: "দৈনিক পত্রিকা" },
      { id: "portal", name: "অনলাইন পোর্টাল" },
      { id: "tv", name: "টিভি / ইলেকট্রনিক মিডিয়া" },
    ],
  },
  {
    id: "lawyer", name: "আইনজীবী", icon: "⚖️", count: 7,
    fields: [{ key: "court", label: "আদালত", type: "text" }, { key: "specialization", label: "আইনের ক্ষেত্র", type: "text" }],
    subcategories: [
      { id: "civil", name: "সিভিল মামলা" },
      { id: "criminal", name: "ক্রিমিনাল মামলা" },
      { id: "family", name: "পারিবারিক মামলা" },
      { id: "land", name: "জমিজমা / দলিল" },
      { id: "notary", name: "নোটারি পাবলিক" },
    ],
  },
  { id: "entrepreneur", name: "উদ্যোক্তা", icon: "💼", count: 4, fields: [{ key: "businessArea", label: "ব্যবসার ক্ষেত্র", type: "text" }, { key: "experience", label: "অভিজ্ঞতা", type: "text" }] },
  {
    id: "tuition", name: "টিউশন সেবা", icon: "📚", count: 10,
    fields: [{ key: "subject", label: "বিষয়", type: "text" }, { key: "classLevel", label: "শ্রেণি", type: "text" }],
    subcategories: [
      { id: "home", name: "গৃহশিক্ষক" },
      { id: "batch", name: "ব্যাচ টিউশন" },
      { id: "quran", name: "কুরআন / হেফজ" },
    ],
  },
  { id: "hotel", name: "আবাসিক হোটেল", icon: "🏨", count: 3, fields: [{ key: "roomType", label: "রুম টাইপ", type: "text" }, { key: "price", label: "রেট", type: "text" }] },
  {
    id: "religious", name: "ধর্মীয় ও সামাজিক প্রতিষ্ঠান", icon: "🕌", count: 6,
    fields: [{ key: "institutionType", label: "প্রতিষ্ঠানের ধরন", type: "text" }, { key: "contactPerson", label: "যোগাযোগকারী", type: "text" }],
    subcategories: [
      { id: "mosque", name: "মসজিদ" },
      { id: "temple", name: "মন্দির" },
      { id: "mazar", name: "মাজার" },
      { id: "eidgah", name: "ঈদগাহ / কবরস্থান" },
      { id: "orphanage", name: "এতিমখানা" },
    ],
  },
  {
    id: "nursery", name: "নার্সারি ও গাছপালা", icon: "🌱", count: 2,
    fields: [{ key: "plantTypes", label: "গাছের ধরন", type: "text" }, { key: "openingHours", label: "খোলার সময়", type: "text" }],
    subcategories: [
      { id: "fruit", name: "ফলের চারা" },
      { id: "flower", name: "ফুল ও অলঙ্কারিক" },
      { id: "forest", name: "বনায়ন গাছ" },
    ],
  },
  {
    id: "event", name: "ইভেন্ট ম্যানেজমেন্ট", icon: "🎉", count: 3,
    fields: [{ key: "eventTypes", label: "ইভেন্টের ধরন", type: "text" }, { key: "coverage", label: "সেবা এলাকা", type: "text" }],
    subcategories: [
      { id: "pandel", name: "শামিয়ানা / প্যান্ডেল" },
      { id: "sound", name: "সাউন্ড সিস্টেম" },
      { id: "decoration", name: "ডেকোরেশন" },
      { id: "photo", name: "ফটোগ্রাফি / ভিডিও" },
      { id: "catering", name: "ক্যাটারিং" },
    ],
  },
];

export function subOf(categoryId: string, subId: string) {
  return categories.find((c) => c.id === categoryId)?.subcategories?.find((s) => s.id === subId);
}
