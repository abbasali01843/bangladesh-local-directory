export const metadata = { title: 'প্রাইভেসি পলিসি — লোকাল হাব বাংলাদেশ' };

export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">প্রাইভেসি পলিসি</h1>
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4 text-gray-700 text-sm">
        <p><strong>সংগৃহীত তথ্য:</strong> ব্যবহারকারী নিবন্ধনের সময় নাম, ফোন/ইমেইল ও পাসওয়ার্ড (হ্যাশ আকারে) সংরক্ষিত হয়।</p>
        <p><strong>ব্যবহার:</strong> তথ্য শুধুমাত্র এই প্ল্যাটফর্মের সেবা দিতে ব্যবহৃত হয়, কোনো তৃতীয় পক্ষের কাছে বিক্রি করা হয় না।</p>
        <p><strong>সর্বজনীন তথ্য:</strong> সার্ভিস লিস্টিংয়ে দেওয়া ফোন ও ঠিকানা সম্পূর্ণ সর্বজনীন। তাই কেবল সেই তথ্যই দিন যা প্রকাশ করতে চান।</p>
        <p><strong>মুছে ফেলা:</strong> অ্যাকাউন্ট বা লিস্টিং মুছে ফেলার অনুরোধ করলে তাড়তাড়ি সম্পন্ন করা হবে।</p>
      </div>
    </div>
  );
}