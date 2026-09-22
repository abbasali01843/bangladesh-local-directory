import SearchBar from '@/components/SearchBar';
import ServiceCard from '@/components/ServiceCard';
import { getCategory, getDistrict, getServices } from '@/lib/data';

export default async function SearchPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const { q } = await searchParams;
  const query = q || '';
  const list = getServices({ q: query });
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <SearchBar placeholder="যা খুঁজছেন লিখুন..." />
      <p className="text-sm text-gray-500 mt-6 mb-4">
        {query ? '"' + query + '" এর জন্য ' + list.length + ' টি ফলাফল' : 'সব তথ্য (' + list.length + ')'}
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {list.map((s) => (
          <ServiceCard key={s.slug} service={s} categoryName={getCategory(s.categorySlug)?.name} districtName={getDistrict(s.districtSlug)?.name} />
        ))}
      </div>
    </div>
  );
}