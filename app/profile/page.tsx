import Link from 'next/link';

export const metadata = { title: 'প্রোফাইল — লোকাল হাব বাংলাদেশ' };

export default function ProfilePage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">প্রোফাইল</h1>
      <div className="bg-white rounded-xl border border-dashed border-gray-300 p-8 text-center text-gray-500 space-y-3">
        <p>লগইন করলে আপনার প্রোফাইল, যোগ করা তথ্য ও প্ল্যান এখানে দেখা যাবে।</p>
        <div className="flex justify-center gap-3">
          <Link href="/login" className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-green-700">লগইন</Link>
          <Link href="/register" className="bg-white border border-green-600 text-green-700 px-4 py-2 rounded-lg text-sm hover:bg-green-50">রেজিস্ট্রেশন</Link>
        </div>
      </div>
    </div>
  );
}