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
        <h1 className="text-2xl font-bold md:text-3xl lg:text-4xl text-white mb-8">
          Results for "{query}"
        </h1>
        {movies && movies.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {movies.map((movie: any) => (
              <Thumbnail key={movie.id} movie={movie} />
            ))}
          </div>
        ) : (
          <div className="text-white text-xl">
            No results found for "{query}". Try searching for something else.
          </div>
        )}
      </main>
    </div>
  );
}
