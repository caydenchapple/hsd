'use client';

import { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import Thumbnail from './Thumbnail';

interface Movie {
  id: number;
  title?: string;
  name?: string;
  poster_path: string;
  backdrop_path: string;
  overview: string;
  media_type?: string;
}

export default function InfiniteScrollMovies() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [page, setPage] = useState(1);
  const [ref, inView] = useInView();
  const [isLoading, setIsLoading] = useState(false);

  const loadMoreMovies = async () => {
    if (isLoading) return;
    setIsLoading(true);
    
    try {
      // Fetch popular movies (browse database)
      // We use a server action or API route usually, but here we'll call the API directly
      // utilizing the public key logic from requests.ts
      // Note: In a real app, we should use a proxy API route to hide the key if it wasn't NEXT_PUBLIC
      const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
      const BASE_URL = "https://api.themoviedb.org/3";
      
      if (!API_KEY) {
        console.error("API Key missing");
        setIsLoading(false);
        return;
      }

      const url = `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}`;
      
      const res = await fetch(url);
      const data = await res.json();
      
      if (data.results) {
        setMovies((prev) => [...prev, ...data.results]);
        setPage((prev) => prev + 1);
      }
    } catch (error) {
      console.error("Error loading more movies:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (inView) {
      loadMoreMovies();
    }
  }, [inView]);

  return (
    <div className="px-4 lg:px-16 mt-10 space-y-8">
      <h2 className="text-2xl font-semibold text-[#e5e5e5]">Browse All Movies</h2>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {movies.map((movie, index) => (
          <Thumbnail key={`${movie.id}-${index}`} movie={movie} />
        ))}
      </div>
      
      <div ref={ref} className="flex justify-center p-10">
        {isLoading && <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-red-600"></div>}
      </div>
    </div>
  );
}
