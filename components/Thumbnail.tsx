import Image from 'next/image';
import { Movie, TMDB_IMAGE_BASE_URL } from '../utils/mockData';
import Link from 'next/link';

interface Props {
  movie: Movie;
}

export default function Thumbnail({ movie }: Props) {
  const isTv = !!movie.name;
  return (
    <Link 
      href={`/watch/${movie.id}?type=${isTv ? 'tv' : 'movie'}`} 
      className="relative h-28 min-w-[180px] cursor-pointer transition duration-200 ease-out md:h-36 md:min-w-[260px] md:hover:scale-105 block group"
    >
      <Image
        src={movie.backdrop_path || movie.poster_path ? `${TMDB_IMAGE_BASE_URL}${movie.backdrop_path || movie.poster_path}` : "https://via.placeholder.com/500x281?text=No+Image"}
        className="rounded-sm object-cover md:rounded"
        fill
        sizes="(max-width: 768px) 180px, 260px"
        alt={movie.title || movie.name || "Movie"}
      />
      <div className="absolute bottom-0 left-0 right-0 p-1 md:p-2 bg-black/60 text-white text-[10px] md:text-xs font-bold rounded-b-sm md:rounded-b">
        <p className="truncate text-center">{movie.title || movie.name}</p>
      </div>
    </Link>
  );
}
