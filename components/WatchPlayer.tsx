'use client';

import { useState, useEffect } from 'react';
import { ChevronLeft, List, X, SkipForward } from 'lucide-react';
import Link from 'next/link';
import { fetchSeasonDetails } from '@/utils/requests';

interface Props {
  id: string;
  type: string;
  tvDetails?: any;
}

export default function WatchPlayer({ id, type, tvDetails }: Props) {
  const isTv = type === 'tv';
  const [season, setSeason] = useState(1);
  const [episode, setEpisode] = useState(1);
  const [episodes, setEpisodes] = useState<any[]>([]);
  const [showMenu, setShowMenu] = useState(isTv); // Show menu by default for TV shows
  const [source, setSource] = useState('vidnest'); // 'vidnest' | 'vidsrc'

  useEffect(() => {
    if (isTv && tvDetails) {
      // Find the first season that is not season 0 (specials) usually, or just default to 1
      const firstSeason = tvDetails.seasons?.find((s: any) => s.season_number > 0) || tvDetails.seasons?.[0];
      if (firstSeason) {
        setSeason(firstSeason.season_number);
        fetchEpisodes(firstSeason.season_number);
      } else {
          fetchEpisodes(1);
      }
    }
  }, [isTv, tvDetails]);

  const fetchEpisodes = async (seasonNum: number) => {
    const data = await fetchSeasonDetails(id, seasonNum);
    if (data && data.episodes) {
      setEpisodes(data.episodes);
    }
  };

  const handleSeasonChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newSeason = parseInt(e.target.value);
    setSeason(newSeason);
    setEpisode(1); // Reset to episode 1
    fetchEpisodes(newSeason);
  };

  const handleNextEpisode = () => {
    const currentEpisodeIndex = episodes.findIndex((ep: any) => ep.episode_number === episode);
    
    // If not found or logic error, do nothing
    if (currentEpisodeIndex === -1) return;

    // Check if there is a next episode in the current season
    if (currentEpisodeIndex < episodes.length - 1) {
      const nextEp = episodes[currentEpisodeIndex + 1];
      setEpisode(nextEp.episode_number);
    } else {
      // Last episode of the season, check for next season
      const currentSeasonIndex = tvDetails?.seasons?.findIndex((s: any) => s.season_number === season);
      if (currentSeasonIndex !== -1 && currentSeasonIndex < tvDetails.seasons.length - 1) {
        // Find next valid season (skip specials if needed, but usually just next index)
        const nextSeason = tvDetails.seasons[currentSeasonIndex + 1];
        if (nextSeason) {
          setSeason(nextSeason.season_number);
          setEpisode(1); // Start at episode 1 of new season
          fetchEpisodes(nextSeason.season_number);
        }
      }
    }
  };

  const hasNextEpisode = () => {
    if (!episodes.length) return false;
    const currentEpisodeIndex = episodes.findIndex((ep: any) => ep.episode_number === episode);
    if (currentEpisodeIndex < episodes.length - 1) return true;
    
    // Check next season
    const currentSeasonIndex = tvDetails?.seasons?.findIndex((s: any) => s.season_number === season);
    if (currentSeasonIndex !== -1 && currentSeasonIndex < tvDetails?.seasons?.length - 1) return true;
    
    return false;
  };

  const getSrc = () => {
    if (source === 'vidnest') {
      return isTv
        ? `https://vidnest.fun/tv/${id}/${season}/${episode}`
        : `https://vidnest.fun/movie/${id}`;
    } else {
      // vidsrc.cc
      return isTv
        ? `https://vidsrc.cc/v2/embed/tv/${id}/${season}/${episode}`
        : `https://vidsrc.cc/v2/embed/movie/${id}`;
    }
  };

  const src = getSrc();

  return (
    <div className="h-screen w-screen bg-black relative flex overflow-hidden">
      <div className="flex-1 relative h-full">
         <Link href="/" className="absolute top-4 left-4 z-50 flex items-center gap-2 text-white hover:text-gray-300 transition bg-black/50 p-2 rounded backdrop-blur-sm">
          <ChevronLeft className="h-6 w-6 md:h-8 md:w-8" />
          <span className="font-bold text-lg md:text-xl">Back to Home</span>
        </Link>
        
        <div className={`absolute top-4 z-50 flex items-center gap-4 ${isTv ? 'right-20 md:right-32' : 'right-4'}`}>
            <select
              value={source}
              onChange={(e) => setSource(e.target.value)}
              className="bg-black/50 text-white p-2 rounded backdrop-blur-sm border border-white/10 hover:bg-white/10 transition appearance-none cursor-pointer"
            >
              <option value="vidnest">Source: VidNest</option>
              <option value="vidsrc">Source: VidSrc</option>
            </select>
        </div>

        {isTv && (
            <div className="absolute top-4 right-4 z-50 flex items-center gap-4">
                {hasNextEpisode() && (
                    <button 
                        onClick={handleNextEpisode}
                        className="flex items-center gap-2 text-white bg-white/10 hover:bg-white/20 transition p-2 rounded backdrop-blur-sm shadow-lg border border-white/10"
                    >
                        <span className="font-bold hidden md:inline">Next Episode</span>
                        <SkipForward className="h-6 w-6" />
                    </button>
                )}
                <button 
                    onClick={() => setShowMenu(!showMenu)}
                    className={`flex items-center gap-2 text-white ${showMenu ? 'bg-red-700' : 'bg-red-600 hover:bg-red-700'} transition p-2 rounded backdrop-blur-sm shadow-lg`}
                >
                    {showMenu ? <X className="h-6 w-6" /> : <List className="h-6 w-6" />}
                    <span className="font-bold hidden md:inline">{showMenu ? 'Close Episodes' : 'Episodes'}</span>
                </button>
            </div>
        )}

        <iframe
          src={src}
          className="w-full h-full"
          frameBorder="0"
          allowFullScreen
          allow="autoplay; encrypted-media"
        />
      </div>

      {isTv && (
        <div className={`fixed inset-y-0 right-0 w-80 bg-[#141414] border-l border-gray-800 p-4 overflow-y-auto z-40 transform transition-transform duration-300 ease-in-out ${showMenu ? 'translate-x-0' : 'translate-x-full'} lg:relative lg:translate-x-0 lg:w-96 ${!showMenu && 'lg:hidden'}`}>
            <div className="mt-16 lg:mt-0">
                <h2 className="text-white text-xl font-bold mb-4">{tvDetails?.name || 'Episodes'}</h2>
                
                <div className="mb-6">
                    <label className="block text-gray-400 text-sm mb-2 font-semibold">Select Season</label>
                    <div className="relative">
                        <select 
                            value={season} 
                            onChange={handleSeasonChange}
                            className="w-full bg-[#2b2b2b] text-white p-3 rounded appearance-none border border-gray-700 focus:outline-none focus:border-red-600 transition"
                        >
                            {tvDetails?.seasons?.filter((s:any) => s.season_number > 0).map((s: any) => (
                                <option key={s.id} value={s.season_number}>
                                    Season {s.season_number} ({s.episode_count} Episodes)
                                </option>
                            ))}
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-white">
                            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                        </div>
                    </div>
                </div>

                <div className="space-y-2 pb-20">
                    <h3 className="text-gray-400 text-sm font-semibold mb-2">Episodes</h3>
                    {episodes.length > 0 ? episodes.map((ep: any) => (
                        <div 
                            key={ep.id}
                            onClick={() => setEpisode(ep.episode_number)}
                            className={`p-3 rounded cursor-pointer transition flex gap-3 group hover:bg-[#2b2b2b] ${episode === ep.episode_number ? 'bg-[#2b2b2b] border-l-4 border-red-600' : 'border-l-4 border-transparent'}`}
                        >
                            <div className="text-gray-500 font-mono text-sm mt-0.5 group-hover:text-white">{ep.episode_number}</div>
                            <div className="flex-1">
                                <h4 className={`text-sm font-medium ${episode === ep.episode_number ? 'text-white' : 'text-gray-300 group-hover:text-white'}`}>
                                    {ep.name || `Episode ${ep.episode_number}`}
                                </h4>
                                {ep.overview && (
                                    <p className="text-xs text-gray-500 line-clamp-2 mt-1 group-hover:text-gray-400">{ep.overview}</p>
                                )}
                            </div>
                        </div>
                    )) : (
                        <div className="text-gray-500 text-center py-10">Loading episodes...</div>
                    )}
                </div>
            </div>
        </div>
      )}
    </div>
  );
}
