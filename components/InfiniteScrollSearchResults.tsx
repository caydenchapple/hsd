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

interface Props {
  initialQuery: string;
  initialMovies?: Movie[];
}

export default function InfiniteScrollSearchResults({ initialQuery, initialMovies = [] }: Props) {
  const [movies, setMovies] = useState<Movie[]>(initialMovies);
  const [page, setPage] = useState(2); // Start fetching from page 2
  const [ref, inView] = useInView();
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  // If query changes, reset state (though this component usually remounts on navigation)
  useEffect(() => {
    setMovies(initialMovies);
    setPage(2);
    setHasMore(true);
  }, [initialQuery, initialMovies]);

  const loadMoreResults = async () => {
    if (isLoading || !hasMore) return;
    setIsLoading(true);
    
    try {
      const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY || 'c32a6a9f960ad2825be04344f6bcc5b3';
      const BASE_URL = "https://api.themoviedb.org/3";
      
      if (!API_KEY) {
        setHasMore(false);
        return;
      }

      const url = `${BASE_URL}/search/multi?api_key=${API_KEY}&language=en-US&query=${encodeURIComponent(initialQuery)}&page=${page}&include_adult=false`;
      
      const res = await fetch(url);
      if (!res.ok) throw new Error('Failed to fetch search results');
      
      const data = await res.json();
      
      if (data.results && data.results.length > 0) {
        const newResults = data.results.filter((item: any) => item.media_type === 'movie' || item.media_type === 'tv');
        
        if (newResults.length === 0) {
           // If we filtered everything out but API returned data, maybe try next page? 
           // For simplicity, let's just stop if the API returns < 20 items usually means end
           if (data.results.length < 20) setHasMore(false);
        } else {
           setMovies((prev) => [...prev, ...newResults]);
           setPage((prev) => prev + 1);
        }

        if (data.page >= data.total_pages) {
          setHasMore(false);
        }
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Error loading more search results:", error);
      setHasMore(false);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (inView) {
      loadMoreResults();
    }
  }, [inView]);

  // We don't render the initial movies here, they are rendered by the server component.
  // We only render the *new* movies.
  // Actually, for consistency, we should probably render ONLY the new ones, OR render ALL if we pass initialMovies as prop and manage them here.
  // A cleaner approach for Next.js App Router:
  // Server renders Page 1. Client renders Page 2+.
  
  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 pr-4 md:pr-16">
        {movies.slice(initialMovies.length).map((movie, index) => (
          <Thumbnail key={`search-${movie.id}-${index}`} movie={movie} />
        ))}
      </div>
      
      {hasMore && (
        <div ref={ref} className="flex justify-center p-10 w-full">
            {isLoading && <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-red-600"></div>}
        </div>
      )}
    </>
  );
}
