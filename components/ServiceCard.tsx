import Link from 'next/link';
import { BadgeCheck, Phone } from 'lucide-react';
import type { Service } from '@/lib/types';

export default function ServiceCard({ service, categoryName, districtName }: { service: Service; categoryName?: string; districtName?: string }) {
  return (
    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex flex-col gap-2">
      <Link href={'/service/' + service.slug} className="font-semibold text-green-800 hover:underline flex items-center gap-1">
        {service.name}
        {service.verified && <BadgeCheck size={16} className="text-blue-500" />}
      </Link>
      <p className="text-xs text-gray-500">
        {categoryName} · {districtName} · {service.address}
      </p>
      <p className="text-sm text-gray-600 line-clamp-2">{service.description}</p>
      <a href={'tel:' + service.phone} className="mt-auto w-fit flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white text-sm px-4 py-1.5 rounded-full">
        <Phone size={14} /> কল করুন
      </a>
    </div>
  );
}