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
    title: "সাতকানিয়া পাইলট চালু",
    body: "Bangladesh Local Directory প্রথমে চট্টগ্রামের সাতকানিয়া উপজেলা (কাঞ্চনা ইউনিয়নসহ) নিয়ে শুরু হয়েছে। আপনার দোকান, চেম্বার বা সেবা যোগ করুন।",
    date: "২০২৬-০৯-২২",
    type: "info",
  },
  {
    id: "n2",
    title: "কাঞ্চনাবাসীর জন্য",
    body: "কাঞ্চনা ইউনিয়নের ডাক্তার, ফার্মেসি, মিস্ত্রি, স্কুল ও পরিবহন তথ্য যোগ করা হচ্ছে। ভুল তথ্য দেখলে জানান।",
    date: "২০২৬-০৯-২২",
    type: "event",
  },
  {
    id: "n3",
    title: "জরুরি নম্বর",
    body: "জাতীয় জরুরি সেবা: ৯৯৯। অ্যাম্বুলেন্স, ফায়ার, পুলিশ — একটি নম্বরে।",
    date: "২০২৬-০৯-২১",
    type: "alert",
  },
];
