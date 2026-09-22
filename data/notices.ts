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
    title: "এলাকা ট্যাগ ঠিক করা হয়েছে",
    body: "কাঞ্চনা ইউনিয়ন, সাতকানিয়া পৌরসভা/সদর, আমিলাইশ–কাঞ্চনা সীমান্ত এবং জাতীয় হটলাইন এখন আলাদা ট্যাগে। সদরের হাসপাতাল আর কাঞ্চনার তালিকায় মিশবে না।",
    date: "২০২৬-০৯-২২",
    type: "info",
  },
  {
    id: "n2",
    title: "জরুরি নম্বর",
    body: "৯৯৯ · ১০২ · ১০৯ — জাতীয় সেবা (কোনো এক ইউনিয়নের নয়)।",
    date: "২০২৬-০৯-২২",
    type: "alert",
  },
];
