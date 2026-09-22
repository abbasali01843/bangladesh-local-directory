export const metadata = { title: 'অ্যাডমিন ড্যাশবোর্ড — লোকাল হাব বাংলাদেশ' };

export default function AdminPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">🛡️ অ্যাডমিন ড্যাশবোর্ড</h1>
      <div className="bg-white rounded-xl border border-dashed border-gray-300 p-8 text-center text-gray-500">
        <p>ডেটাবেজ যুক্ত হওয়ার পর অ্যাডমিন প্যানেল (লিস্টিং অনুমোদন, রিপোর্ট, ব্যবহারকারী ব্যবস্থাপনা) এখানে সক্রিয় হবে।</p>
      </div>
    </div>
  );
}