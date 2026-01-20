'use client';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { Movie, TMDB_IMAGE_BASE_URL } from '../utils/mockData';
import { Play, Info } from 'lucide-react';
import Link from 'next/link';

interface Props {
  netflixOriginals: Movie[];
}

export default function Banner({ netflixOriginals }: Props) {
  const [movie, setMovie] = useState<Movie | null>(null);

  useEffect(() => {
    setMovie(
      netflixOriginals[Math.floor(Math.random() * netflixOriginals.length)]
    );
  }, [netflixOriginals]);

  if (!movie) return null;
  const isTv = !!movie.name;

  return (
    <div className="flex flex-col space-y-2 py-16 md:space-y-4 lg:h-[65vh] lg:justify-end lg:pb-12 relative">
      <div className="absolute top-0 left-0 -z-10 h-[95vh] w-full">
        <Image
          src={`${TMDB_IMAGE_BASE_URL}${movie.backdrop_path || movie.poster_path}`}
          fill
          style={{ objectFit: 'cover' }}
          alt={movie.title || movie.name || "Banner"}
          priority
        />
        {/* Vignette gradients */}
        <div className="absolute top-0 left-0 h-full w-full bg-gradient-to-r from-[#141414] via-transparent to-transparent opacity-80" />
        <div className="absolute bottom-0 h-48 w-full bg-gradient-to-t from-[#141414] via-[#141414]/60 to-transparent" />
      </div>

      {movie.logo_path ? (
        <div className="relative h-32 w-64 md:h-48 md:w-80 lg:h-64 lg:w-96">
          <Image
            src={`${TMDB_IMAGE_BASE_URL}${movie.logo_path}`}
            fill
            style={{ objectFit: 'contain', objectPosition: 'left bottom' }}
            alt={movie.title || movie.name || "Logo"}
          />
        </div>
      ) : (
        <h1 className="text-2xl font-bold md:text-4xl lg:text-7xl">
          {movie.title || movie.name}
        </h1>
      )}

      <p className="max-w-xs text-xs text-shadow md:max-w-lg md:text-lg lg:max-w-2xl lg:text-2xl">
        {movie.overview?.substring(0, 150)}...
      </p>

      <div className="flex space-x-3">
        <Link href={`/watch/${movie.id}?type=${isTv ? 'tv' : 'movie'}`}>
        <button className="flex items-center gap-x-2 rounded bg-white px-5 py-1.5 text-sm font-bold text-black transition hover:bg-[#e6e6e6] md:px-8 md:py-2.5">
          <Play className="h-4 w-4 md:h-7 md:w-7" fill="black" />
          Play
        </button>
        </Link>
        <button className="flex items-center gap-x-2 rounded bg-[gray]/70 px-5 py-1.5 text-sm font-bold text-white transition hover:bg-[gray]/40 md:px-8 md:py-2.5">
          <Info className="h-4 w-4 md:h-7 md:w-7" />
          More Info
        </button>
      </div>
    </div>
  );
}
