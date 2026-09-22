import { Mail, Phone, Facebook } from 'lucide-react';

export const metadata = { title: 'যোগাযোগ — লোকাল হাব বাংলাদেশ' };

export default function ContactPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">যোগাযোগ</h1>
      <div className="space-y-4">
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 flex items-center gap-3">
          <Phone className="text-green-600" />
          <div><p className="font-semibold">কল করুন</p><a href="tel:+8801711000000" className="text-sm text-green-700 hover:underline">+৮৮০ ১৭১১-০০০০০০</a></div>
        </div>
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 flex items-center gap-3">
          <Mail className="text-green-600" />
          <div><p className="font-semibold">ইমেইল করুন</p><a href="mailto:info@localhub.example" className="text-sm text-green-700 hover:underline">info@localhub.example</a></div>
        </div>
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 flex items-center gap-3">
          <Facebook className="text-green-600" />
          <div><p className="font-semibold">ফেসবুক</p><p className="text-sm text-gray-500">ফেসবুক পেজ ও গ্রুপে যোগ দিন — লিংক এখানে বসান</p></div>
        </div>
      </div>
    </div>
  );
}