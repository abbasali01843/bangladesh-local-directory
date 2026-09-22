export const metadata = { title: 'সম্মানিত ডোনারবৃন্দ — লোকাল হাব বাংলাদেশ' };

export default function DonorsPage() {
  const donors = [
    { name: 'প্রথম ডোনার (নমুনা)', role: 'শিক্ষাবিদ', amount: '৳১০,০০০' },
    { name: 'দ্বিতীয় ডোনার (নমুনা)', role: 'সমাজসেবক', amount: '৳৫,০০০' },
  ];
  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-2">সম্মানিত ডোনারবৃন্দ</h1>
      <p className="text-sm text-gray-500 mb-6">যাঁরা প্ল্যাটফর্মের উন্নয়ন ও সেবার মান বাড়াতে সহযোগিতা করেছেন।</p>
      <div className="space-y-3">
        {donors.map((d) => (
          <div key={d.name} className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 flex items-center justify-between">
            <div><p className="font-semibold">{d.name}</p><p className="text-xs text-gray-500">{d.role}</p></div>
            <span className="text-green-700 font-bold">{d.amount}</span>
          </div>
        ))}
      </div>
      <div className="mt-6 bg-white rounded-xl border border-dashed border-gray-300 p-6 text-center text-gray-500 text-sm">সম্পূর্ণ তালিকা ডেটাবেজ যুক্ত হওয়ার পর এখানে আসবে।</div>
    </div>
  );
}