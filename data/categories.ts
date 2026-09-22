import type { Category } from '@/lib/types';

// ২১টি ক্যাটাগরি
export const categories: Category[] = [
  { slug: 'doctor', name: 'ডাক্তার', emoji: '🩺', description: 'সব জেলার বিভিন্ন বিশেষজ্ঞ ডাক্তারদের তথ্য' },
  { slug: 'emergency', name: 'জরুরি সেবা', emoji: '🚑', description: 'ফায়ার সার্ভিস, অ্যাম্বুলেন্স, পুলিশ ইত্যাদি' },
  { slug: 'health', name: 'অন্যান্য স্বাস্থ্যসেবা', emoji: '🏥', description: 'হাসপাতাল, ক্লিনিক, ডায়াগনস্টিক সেন্টার' },
  { slug: 'transport', name: 'পরিবহন সেবা', emoji: '🚌', description: 'বাস, ট্রেন, লঞ্চ ও ভাড়া যানের তথ্য' },
  { slug: 'business', name: 'ব্যবসা প্রতিষ্ঠান', emoji: '🏬', description: 'দোকান, কোম্পানি ও ব্যবসা প্রতিষ্ঠান' },
  { slug: 'education', name: 'শিক্ষা প্রতিষ্ঠান', emoji: '🎓', description: 'স্কুল, কলেজ, মাদ্রাসা ও কোচিং' },
  { slug: 'mistri', name: 'মিস্ত্রি', emoji: '🔧', description: 'ইলেকট্রিশিয়ান, প্লাম্বার, কাঠমিস্ত্রি ইত্যাদি' },
  { slug: 'organization', name: 'সংগঠন', emoji: '🤝', description: 'সামাজিক, সাংস্কৃতিক ও স্বেচ্ছাসেবী সংগঠন' },
  { slug: 'finance', name: 'আর্থিক ও ব্যবসায়িক সেবা', emoji: '🏦', description: 'ব্যাংক, ইন্স্যুরেন্স ও আর্থিক প্রতিষ্ঠান' },
  { slug: 'rent', name: 'ভাড়া', emoji: '🏠', description: 'বাসা, দোকান ও যানবাহন ভাড়া' },
  { slug: 'buy-sell', name: 'ক্রয়/বিক্রয়', emoji: '🛒', description: 'কেনা-বেচার বিজ্ঞাপন' },
  { slug: 'courier', name: 'কুরিয়ার ও পার্সেল সার্ভিস', emoji: '📦', description: 'কুরিয়ার ও ডেলিভারি সার্ভিস' },
  { slug: 'hotel', name: 'হোটেল/রেস্তোরাঁ', emoji: '🍽️', description: 'হোটেল ও রেস্তোরাঁর তথ্য' },
  { slug: 'journalist', name: 'সাংবাদিক', emoji: '📰', description: 'স্থানীয় সাংবাদিকদের যোগাযোগ' },
  { slug: 'lawyer', name: 'আইনজীবী', emoji: '⚖️', description: 'আইনজীবী ও আইনি পরামর্শদাতা' },
  { slug: 'entrepreneur', name: 'উদ্যোক্তা', emoji: '💡', description: 'স্থানীয় উদ্যোক্তা ও ফ্রিল্যান্সার' },
  { slug: 'tuition', name: 'টিউশন সেবা', emoji: '📚', description: 'টিউটর ও টিউশনের বিজ্ঞাপন' },
  { slug: 'residential-hotel', name: 'আবাসিক হোটেল', emoji: '🛏️', description: 'থাকার হোটেল ও মেস' },
  { slug: 'religious-social', name: 'ধর্মীয় ও সামাজিক প্রতিষ্ঠান', emoji: '🕌', description: 'মসজিদ, মন্দির, গির্জা ও সামাজিক প্রতিষ্ঠান' },
  { slug: 'nursery', name: 'নার্সারি ও গাছপালা', emoji: '🌱', description: 'গাছ, ফলের চারা ও নার্সারি' },
  { slug: 'event', name: 'ইভেন্ট ম্যানেজমেন্ট', emoji: '🎪', description: 'বিয়ে, সেমিনার ও অনুষ্ঠানের আয়োজক' },
  { slug: 'identity', name: 'আমার পরিচয়', emoji: '🪪', description: 'গুরুত্বপূর্ণ ব্যক্তিত্ব ও পেশাজীবীদের পরিচয়' },
];