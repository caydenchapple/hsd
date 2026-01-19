import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';

interface Props {
  params: Promise<{
    id: string;
  }>;
  searchParams: Promise<{
    type?: string;
  }>;
}

export default async function Watch(props: Props) {
  const { id } = await props.params;
  const { type } = await props.searchParams;
  
  const isTv = type === 'tv';
  const src = isTv
    ? `https://vidnest.fun/tv/${id}/1/1`
    : `https://vidnest.fun/movie/${id}`;

  return (
    <div className="h-screen w-screen bg-black relative">
      <Link href="/" className="absolute top-4 left-4 z-50 flex items-center gap-2 text-white hover:text-gray-300 transition bg-black/50 p-2 rounded">
        <ChevronLeft className="h-8 w-8" />
        <span className="font-bold text-xl">Back to Home</span>
      </Link>
      <iframe
        src={src}
        className="w-full h-full"
        frameBorder="0"
        allowFullScreen
        allow="autoplay; encrypted-media"
      />
    </div>
  );
}
