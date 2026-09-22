import { Megaphone } from 'lucide-react';
import { getNotices } from '@/lib/data';

export const metadata = { title: 'বিজ্ঞপ্তি — লোকাল হাব বাংলাদেশ' };

export default function NoticePage() {
  const notices = getNotices();
  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6 flex items-center gap-2"><Megaphone /> বিজ্ঞপ্তি</h1>
      <div className="space-y-4">
        {notices.map((n) => (
          <div key={n.id} className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
            <p className="font-semibold text-green-800">{n.title}</p>
            <p className="text-xs text-gray-400 mb-2">{n.date}</p>
            <p className="text-sm text-gray-600">{n.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}