import Navbar from '@/components/Navbar';
import Thumbnail from '@/components/Thumbnail';
import { searchMovies } from '@/utils/requests';

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q: string }>;
}) {
  const { q: query } = await searchParams;
  const movies = await searchMovies(query);

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-gray-900/10 to-[#010511] lg:h-[140vh]">
      <Navbar />
      <main className="relative pl-4 pb-24 lg:space-y-24 lg:pl-16 pt-32">
        <div className="flex items-center justify-between pr-4 md:pr-16 mb-8">
            <h1 className="text-2xl font-bold md:text-3xl lg:text-4xl text-white">
            Results for "{query}"
            </h1>
            <div className="flex items-center gap-2">
                <span className="text-gray-400 text-xs md:text-sm">Powered by</span>
                <img 
                    src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_short-8e7b30f73a4020692ccca9c88bafe5dcb6f8a62a4c6bc55cd9ba82bb2cd95f6c.svg" 
                    alt="TMDB Logo" 
                    className="h-4 md:h-6"
                />
            </div>
        </div>
        
        {movies && movies.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 pr-4 md:pr-16">
            {movies.map((movie: any) => (
              <Thumbnail key={movie.id} movie={movie} />
            ))}
          </div>
        ) : (
          <div className="text-white text-xl flex flex-col items-center justify-center min-h-[50vh]">
            <p className="mb-4">No results found for "{query}".</p>
            <p className="text-gray-400 text-sm">Try searching for something else or browse our collection.</p>
          </div>
        )}
      </main>
    </div>
  );
}
