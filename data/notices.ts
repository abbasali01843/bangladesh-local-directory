export type Notice = {
  id: string;
  title: string;
  body: string;
  date: string;
  type: "info" | "alert" | "event";
};

export const notices: Notice[] = [
  {
    id: "n1",
    title: "Local Hub চালু হয়েছে",
    body: "আপনার এলাকার ডাক্তার, দোকান, মিস্ত্রি ও জরুরি সেবা এখন এক জায়গায় খুঁজুন। নতুন তথ্য যোগ করতে পারেন।",
    date: "২০২৬-০৯-২২",
    type: "info",
  },
  {
    id: "n2",
    title: "তথ্য যাচাই করুন",
    body: "কোনো তথ্য ভুল পেলে রিপোর্ট করুন। যাচাইকৃত (Verified) প্রোফাইলে টিক চিহ্ন থাকবে।",
    date: "২০২৬-০৯-২১",
    type: "alert",
  },
  {
    id: "n3",
    title: "ব্যবসায়ীরা তালিকাভুক্ত হোন",
    body: "বিনামূল্যে আপনার ব্যবসা বা সেবা যোগ করুন। Admin অনুমোদনের পর সবাই দেখতে পাবে।",
    date: "২০২৬-০৯-২০",
    type: "event",
  },
];
