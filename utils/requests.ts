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
