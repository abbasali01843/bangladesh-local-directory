import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { BadgeCheck, MapPin, Phone, MessageCircle, ChevronLeft } from 'lucide-react';
import { getCategories, getCategory, getDistrict, getService, getServices } from '@/lib/data';
import ServiceCard from '@/components/ServiceCard';

export function generateStaticParams() {
  return getServices().map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  return { title: service ? service.name + ' — লোকাল হাব বাংলাদেশ' : 'তথ্য' };
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();
  const category = getCategory(service.categorySlug);
  const district = getDistrict(service.districtSlug);
  const related = getServices({ category: service.categorySlug }).filter((s) => s.slug !== service.slug).slice(0, 3);
  const waNumber = service.phone.replace(/[^0-9]/g, '').replace(/^0/, '880');
  const mapUrl = 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(service.name + ', ' + service.address);
  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <Link href={'/category/' + service.categorySlug} className="text-sm text-green-700 hover:underline flex items-center gap-1 mb-4"><ChevronLeft size={16} /> {category?.name} এ ফিরে যান</Link>
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h1 className="text-2xl font-bold flex items-center gap-2">{service.name}
          {service.verified && <BadgeCheck className="text-blue-500" size={22} />}
        </h1>
        <p className="text-sm text-gray-500 mt-1">{category?.name} · {district?.name}</p>
        <p className="mt-4 text-gray-700">{service.description}</p>
        <p className="mt-3 text-sm text-gray-600 flex items-center gap-2"><MapPin size={16} /> {service.address}</p>
        <div className="mt-6 grid grid-cols-3 gap-3">
          <a href={'tel:' + service.phone} className="bg-green-600 hover:bg-green-700 text-white text-sm py-2.5 rounded-lg text-center flex items-center justify-center gap-2"><Phone size={16} /> কল</a>
          <a href={'https://wa.me/' + waNumber} target="_blank" rel="noopener noreferrer" className="bg-emerald-500 hover:bg-emerald-600 text-white text-sm py-2.5 rounded-lg text-center flex items-center justify-center gap-2"><MessageCircle size={16} /> WhatsApp</a>
          <a href={mapUrl} target="_blank" rel="noopener noreferrer" className="bg-blue-600 hover:bg-blue-700 text-white text-sm py-2.5 rounded-lg text-center flex items-center justify-center gap-2"><MapPin size={16} /> ম্যাপ</a>
        </div>
      </div>
      {related.length > 0 && (
        <div className="mt-8">
          <h2 className="text-lg font-bold mb-3">সম্পর্কিত আরও তথ্য</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {related.map((s) => (
              <ServiceCard key={s.slug} service={s} categoryName={category?.name} districtName={getDistrict(s.districtSlug)?.name} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}