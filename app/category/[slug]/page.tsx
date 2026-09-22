import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import ServiceCard from '@/components/ServiceCard';
import { getCategories, getCategory, getDistrict, getDistricts, getServices } from '@/lib/data';

export function generateStaticParams() {
  return getCategories().map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategory(slug);
  return { title: category ? category.name + ' — লোকাল হাব বাংলাদেশ' : 'ক্যাটাগরি' };
}

export default async function CategoryPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ district?: string }>;
}) {
  const { slug } = await params;
  const { district } = await searchParams;
  const category = getCategory(slug);
  if (!category) notFound();
  const districts = getDistricts();
  const list = getServices({ category: slug, district });
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <p className="text-xs text-gray-500 mb-2"><Link href="/" className="hover:underline">হোম</Link> / {category.name}</p>
      <h1 className="text-2xl font-bold mb-1">{category.emoji} {category.name}</h1>
      <p className="text-sm text-gray-500 mb-4">{category.description} · মোট {list.length} টি তথ্য</p>
      <div className="flex flex-wrap gap-2 mb-6">
        <Link href={'/category/' + slug} className={'text-xs px-3 py-1 rounded-full border ' + (!district ? 'bg-green-600 text-white border-green-600' : 'bg-white border-gray-300 text-gray-700 hover:bg-green-50')}>সব জেলা</Link>
        {districts.map((d) => (
          <Link key={d.slug} href={'/category/' + slug + '?district=' + d.slug} className={'text-xs px-3 py-1 rounded-full border ' + (district === d.slug ? 'bg-green-600 text-white border-green-600' : 'bg-white border-gray-300 text-gray-700 hover:bg-green-50')}>{d.name}</Link>
        ))}
      </div>
      {list.length === 0 ? (
        <p className="bg-white border border-dashed border-gray-300 rounded-xl p-8 text-center text-gray-500">এই ফিল্টারে এখনো কোনো তথ্য নেই। <Link href="/add" className="text-green-700 underline">তথ্য যোগ করুন</Link></p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {list.map((s) => (
            <ServiceCard key={s.slug} service={s} categoryName={category.name} districtName={getDistrict(s.districtSlug)?.name} />
          ))}
        </div>
      )}
    </div>
  );
}