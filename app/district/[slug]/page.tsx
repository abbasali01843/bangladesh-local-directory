import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import ServiceCard from '@/components/ServiceCard';
import { getCategory, getDistrict, getDistricts, getServices } from '@/lib/data';

export function generateStaticParams() {
  return getDistricts().map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const district = getDistrict(slug);
  return { title: district ? district.name + ' — লোকাল হাব বাংলাদেশ' : 'জেলা' };
}

export default async function DistrictPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const district = getDistrict(slug);
  if (!district) notFound();
  const list = getServices({ district: slug });
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <p className="text-xs text-gray-500 mb-2"><Link href="/" className="hover:underline">হোম</Link> / জেলা</p>
      <h1 className="text-2xl font-bold mb-1">📍 {district.name}</h1>
      <p className="text-sm text-gray-500 mb-6">এই জেলায় মোট {list.length} টি তথ্য</p>
      {list.length === 0 ? (
        <p className="bg-white border border-dashed border-gray-300 rounded-xl p-8 text-center text-gray-500">এই জেলার তথ্য এখনো যোগ হয়নি। <Link href="/add" className="text-green-700 underline">তথ্য যোগ করুন</Link></p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {list.map((s) => (
            <ServiceCard key={s.slug} service={s} categoryName={getCategory(s.categorySlug)?.name} districtName={district.name} />
          ))}
        </div>
      )}
    </div>
  );
}