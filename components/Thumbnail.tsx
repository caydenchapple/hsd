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
        className="rounded-sm object-cover md:rounded transition-all duration-300 group-hover:brightness-110"
        fill
        sizes="(max-width: 768px) 180px, 260px"
        alt={movie.title || movie.name || "Movie"}
      />
      {/* Title overlay - only visible on hover */}
      <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/90 to-transparent text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-b-sm md:rounded-b flex flex-col justify-end h-full">
        <p className="truncate text-center text-xs md:text-sm font-bold text-shadow-sm">{movie.title || movie.name}</p>
        <p className="text-[10px] text-green-400 text-center font-semibold mt-1">98% Match</p>
      </div>
    </Link>
  );
}
