import {
  netflixOriginals,
  trendingNow,
  topRated,
  actionMovies,
  comedyMovies,
  horrorMovies,
  romanceMovies,
  documentaries
} from './mockData';

const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

export interface TmdbRequest {
  title: string;
  url: string;
}

const requests: Record<string, TmdbRequest> = {
  fetchTrending: {
    title: "Trending",
    url: `${BASE_URL}/trending/all/week?api_key=${API_KEY}&language=en-US`,
  },
  fetchNetflixOriginals: {
    title: "Netflix Originals",
    url: `${BASE_URL}/discover/tv?api_key=${API_KEY}&with_networks=213`,
  },
  fetchTopRated: {
    title: "Top Rated",
    url: `${BASE_URL}/movie/top_rated?api_key=${API_KEY}&language=en-US`,
  },
  fetchActionMovies: {
    title: "Action",
    url: `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=28`,
  },
  fetchComedyMovies: {
    title: "Comedy",
    url: `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=35`,
  },
  fetchHorrorMovies: {
    title: "Horror",
    url: `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=27`,
  },
  fetchRomanceMovies: {
    title: "Romance",
    url: `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=10749`,
  },
  fetchDocumentaries: {
    title: "Documentaries",
    url: `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=99`,
  },
};

export default requests;

export const fetchMovies = async (url: string) => {
  if (!API_KEY) {
    return null;
  }
  try {
    const res = await fetch(url, { next: { revalidate: 3600 } }); // Cache for 1 hour
    if (!res.ok) throw new Error('Failed to fetch data');
    const data = await res.json();
    return data.results;
  } catch (error) {
    console.error("Failed to fetch movies:", error);
    return null;
  }
};

export const searchMovies = async (query: string, page: number = 1) => {
  if (!query) return [];
  
  let results: any[] = [];

  // 1. Try API search if key exists
  if (API_KEY) {
    try {
      const url = `${BASE_URL}/search/multi?api_key=${API_KEY}&language=en-US&query=${encodeURIComponent(query)}&page=${page}&include_adult=false`;
      const res = await fetch(url);
      if (res.ok) {
        const data = await res.json();
        // Filter out people, only keep movies and tv shows
        results = data.results.filter((item: any) => item.media_type === 'movie' || item.media_type === 'tv');
      }
    } catch (error) {
      console.error("Failed to search movies via API:", error);
    }
  }

  // 2. If no results from API (or no key), search mock data (only on page 1)
  if (page === 1 && results.length === 0) {
    const allMockMovies = [
      ...netflixOriginals,
      ...trendingNow,
      ...topRated,
      ...actionMovies,
      ...comedyMovies,
      ...horrorMovies,
      ...romanceMovies,
      ...documentaries
    ];
    
    const lowerQuery = query.toLowerCase();
    const mockResults = allMockMovies.filter(movie => 
      (movie.title && movie.title.toLowerCase().includes(lowerQuery)) ||
      (movie.name && movie.name.toLowerCase().includes(lowerQuery))
    );
    
    // De-duplicate by ID
    const uniqueMockResults = Array.from(new Map(mockResults.map(m => [m.id, m])).values());
    results = uniqueMockResults;
  }
  
  return results;
};

export const fetchTvShowDetails = async (id: string) => {
  if (!API_KEY) return null;
  try {
    const url = `${BASE_URL}/tv/${id}?api_key=${API_KEY}&language=en-US`;
    const res = await fetch(url);
    if (!res.ok) throw new Error('Failed to fetch TV show details');
    return await res.json();
  } catch (error) {
    console.error("Failed to fetch TV show details:", error);
    return null;
  }
};

export const fetchSeasonDetails = async (tvId: string, seasonNumber: number) => {
  if (!API_KEY) return null;
  try {
    const url = `${BASE_URL}/tv/${tvId}/season/${seasonNumber}?api_key=${API_KEY}&language=en-US`;
    const res = await fetch(url);
    if (!res.ok) throw new Error('Failed to fetch season details');
    return await res.json();
  } catch (error) {
    console.error("Failed to fetch season details:", error);
    return null;
  }
};
