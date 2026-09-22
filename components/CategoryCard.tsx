import Link from 'next/link';

export default function CategoryCard({ slug, name, emoji, count, description }: { slug: string; name: string; emoji: string; count: number; description: string }) {
  return (
    <Link href={'/category/' + slug} className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md border border-gray-100 flex items-center gap-3">
      <span className="text-3xl">{emoji}</span>
      <div>
        <p className="font-semibold">{name}</p>
        <p className="text-xs text-gray-500">{count} টি তথ্য</p>
        <p className="text-xs text-gray-400 line-clamp-1">{description}</p>
      </div>
    </Link>
  );
}