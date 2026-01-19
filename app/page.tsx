import Banner from '@/components/Banner';
import Navbar from '@/components/Navbar';
import Row from '@/components/Row';
import requests, { fetchMovies } from '@/utils/requests';
import { 
  netflixOriginals as mockNetflixOriginals,
  trendingNow as mockTrendingNow,
  topRated as mockTopRated,
  actionMovies as mockActionMovies,
  comedyMovies as mockComedyMovies,
  horrorMovies as mockHorrorMovies,
  romanceMovies as mockRomanceMovies,
  documentaries as mockDocumentaries
} from '@/utils/mockData';

export default async function Home() {
  const [
    netflixOriginals,
    trendingNow,
    topRated,
    actionMovies,
    comedyMovies,
    horrorMovies,
    romanceMovies,
    documentaries,
  ] = await Promise.all([
    fetchMovies(requests.fetchNetflixOriginals.url),
    fetchMovies(requests.fetchTrending.url),
    fetchMovies(requests.fetchTopRated.url),
    fetchMovies(requests.fetchActionMovies.url),
    fetchMovies(requests.fetchComedyMovies.url),
    fetchMovies(requests.fetchHorrorMovies.url),
    fetchMovies(requests.fetchRomanceMovies.url),
    fetchMovies(requests.fetchDocumentaries.url),
  ]);

  return (
    <div className="relative h-screen bg-gradient-to-b lg:h-[140vh]">
      <Navbar />
      <main className="relative pl-4 pb-24 lg:space-y-24 lg:pl-16">
        <Banner netflixOriginals={netflixOriginals || mockNetflixOriginals} />
        <section className="md:space-y-24">
          <Row title="Trending Now" movies={trendingNow || mockTrendingNow} />
          <Row title="Top Rated" movies={topRated || mockTopRated} />
          <Row title="Action Thrillers" movies={actionMovies || mockActionMovies} />
          <Row title="Comedies" movies={comedyMovies || mockComedyMovies} />
          <Row title="Scary Movies" movies={horrorMovies || mockHorrorMovies} />
          <Row title="Romance Movies" movies={romanceMovies || mockRomanceMovies} />
          <Row title="Documentaries" movies={documentaries || mockDocumentaries} />
        </section>
      </main>
    </div>
  );
}
