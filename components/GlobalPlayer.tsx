'use client';

import { useState, useEffect } from 'react';
import { ChevronLeft, List, X, SkipForward, Minimize2, Maximize2, Settings } from 'lucide-react';
import { fetchSeasonDetails } from '@/utils/requests';
import { usePlayer } from '@/context/PlayerContext';
import { useRouter, usePathname } from 'next/navigation';

export default function GlobalPlayer() {
  const { video, setVideo, isMinimized, setIsMinimized, closePlayer } = usePlayer();
  const router = useRouter();
  const pathname = usePathname();

  const [season, setSeason] = useState(1);
  const [episode, setEpisode] = useState(1);
  const [episodes, setEpisodes] = useState<any[]>([]);
  const [showMenu, setShowMenu] = useState(false);
  const [source, setSource] = useState('vidnest'); // 'vidnest' | 'vidsrc'
  const [currentTime, setCurrentTime] = useState(0);
  const [startTime, setStartTime] = useState(0);

  // Reset local state when video changes
  useEffect(() => {
    if (video) {
      const initialSeason = video.season || 
        (video.tvDetails?.seasons?.find((s: any) => s.season_number > 0)?.season_number) || 
        1;
      
      setSeason(initialSeason);
      setEpisode(video.episode || 1);
      setShowMenu(false);
      setStartTime(0);
      setCurrentTime(0);
      
      if (video.type === 'tv') {
        fetchEpisodes(video.id, initialSeason);
      }
    }
  }, [video]);

  // Listen for player events from VidSrc
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      // We accept messages from vidsrc domains
      if (event.origin.includes('vidsrc')) {
        if (event.data && event.data.type === 'PLAYER_EVENT') {
          const { currentTime: time } = event.data.data;
          if (time) setCurrentTime(time);
        }
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  const fetchEpisodes = async (id: string, seasonNum: number) => {
    const data = await fetchSeasonDetails(id, seasonNum);
    if (data && data.episodes) {
      setEpisodes(data.episodes);
    }
  };

  const handleSeasonChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newSeason = parseInt(e.target.value);
    setSeason(newSeason);
    setEpisode(1);
    if (video) fetchEpisodes(video.id, newSeason);
  };

  const handleNextEpisode = () => {
    const currentEpisodeIndex = episodes.findIndex((ep: any) => ep.episode_number === episode);
    if (currentEpisodeIndex === -1) return;

    if (currentEpisodeIndex < episodes.length - 1) {
      setEpisode(episodes[currentEpisodeIndex + 1].episode_number);
    } else {
      const currentSeasonIndex = video?.tvDetails?.seasons?.findIndex((s: any) => s.season_number === season);
      if (currentSeasonIndex !== -1 && video?.tvDetails?.seasons && currentSeasonIndex < video.tvDetails.seasons.length - 1) {
        const nextSeason = video.tvDetails.seasons[currentSeasonIndex + 1];
        if (nextSeason) {
          setSeason(nextSeason.season_number);
          setEpisode(1);
          if (video) fetchEpisodes(video.id, nextSeason.season_number);
        }
      }
    }
  };

  const hasNextEpisode = () => {
    if (!episodes.length) return false;
    const currentEpisodeIndex = episodes.findIndex((ep: any) => ep.episode_number === episode);
    if (currentEpisodeIndex < episodes.length - 1) return true;
    const currentSeasonIndex = video?.tvDetails?.seasons?.findIndex((s: any) => s.season_number === season);
    if (currentSeasonIndex !== -1 && video?.tvDetails?.seasons && currentSeasonIndex < video.tvDetails.seasons.length - 1) return true;
    return false;
  };

  // Reset start time when episode/season/source changes
  useEffect(() => {
    setStartTime(0);
    setCurrentTime(0);
  }, [episode, season, source]);

  const handleSkipIntro = () => {
    // Skip 85 seconds (standard intro length)
    const skipAmount = 85;
    // If we have a current time, skip relative to it. 
    // If not (e.g. vidnest might not send events), we just try to start at 85s.
    const newTime = currentTime > 0 ? currentTime + skipAmount : skipAmount;
    setStartTime(newTime);
  };

  const handleMinimize = () => {
    setIsMinimized(!isMinimized);
    // If we are minimizing and currently on the watch page, go home so user can browse
    if (!isMinimized && pathname.startsWith('/watch/')) {
        router.push('/');
    }
  };

  if (!video) return null;

  const isTv = video.type === 'tv';
  
  const getSrc = () => {
    let baseUrl = '';
    if (source === 'vidnest') {
      baseUrl = isTv
        ? `https://vidnest.fun/tv/${video.id}/${season}/${episode}`
        : `https://vidnest.fun/movie/${video.id}`;
    } else {
      // vidsrc.cc
      baseUrl = isTv
        ? `https://vidsrc.cc/v2/embed/tv/${video.id}/${season}/${episode}`
        : `https://vidsrc.cc/v2/embed/movie/${video.id}`;
    }

    // Append startAt if we have a skip timestamp
    if (startTime > 0) {
      const separator = baseUrl.includes('?') ? '&' : '?';
      return `${baseUrl}${separator}startAt=${Math.floor(startTime)}`;
    }
    
    return baseUrl;
  };

  const src = getSrc();

  const containerClasses = isMinimized
    ? "fixed bottom-4 right-4 w-80 md:w-96 aspect-video z-[100] shadow-2xl rounded-lg overflow-hidden border border-gray-800 bg-black transition-all duration-300"
    : "fixed inset-0 z-[100] bg-black flex overflow-hidden";

  return (
    <div className={containerClasses}>
      {/* Player Controls Overlay (Hover) */}
      <div className={`absolute top-0 left-0 w-full p-4 flex justify-between items-start z-20 pointer-events-none ${isMinimized ? 'opacity-0 hover:opacity-100' : 'opacity-100'}`}>
        {/* Left Controls */}
        <div className="flex items-center gap-2 pointer-events-auto">
          {!isMinimized && (
            <button onClick={closePlayer} className="text-white hover:text-gray-300 bg-black/50 p-2 rounded-full backdrop-blur-sm">
              <ChevronLeft className="h-6 w-6" />
            </button>
          )}
        </div>

        {/* Right Controls */}
        <div className="flex items-center gap-2 pointer-events-auto">
           {/* Source Selector */}
           <div className="relative">
             <select
                value={source}
                onChange={(e) => setSource(e.target.value)}
                className="bg-black/50 text-white p-2 rounded backdrop-blur-sm border border-white/10 hover:bg-white/10 transition appearance-none cursor-pointer text-sm"
              >
                <option value="vidnest">Source: VidNest</option>
                <option value="vidsrc">Source: VidSrc</option>
              </select>
           </div>

          {/* Minimize/Maximize */}
          <button onClick={handleMinimize} className="text-white hover:text-gray-300 bg-black/50 p-2 rounded-full backdrop-blur-sm">
            {isMinimized ? <Maximize2 className="h-5 w-5" /> : <Minimize2 className="h-5 w-5" />}
          </button>

          {/* Close Button (for Mini Player) */}
          {isMinimized && (
             <button onClick={closePlayer} className="text-white hover:text-red-500 bg-black/50 p-2 rounded-full backdrop-blur-sm ml-2">
                <X className="h-5 w-5" />
             </button>
          )}

          {/* Episodes Toggle (Full Screen Only) */}
          {!isMinimized && isTv && (
            <button 
                onClick={() => setShowMenu(!showMenu)}
                className={`flex items-center gap-2 text-white ${showMenu ? 'bg-red-700' : 'bg-red-600 hover:bg-red-700'} transition p-2 rounded backdrop-blur-sm shadow-lg ml-2`}
            >
                {showMenu ? <X className="h-5 w-5" /> : <List className="h-5 w-5" />}
                <span className="font-bold hidden md:inline">{showMenu ? 'Close' : 'Episodes'}</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="relative flex-1 bg-black h-full">
         <iframe
            src={src}
            className="w-full h-full"
            frameBorder="0"
            allowFullScreen
            allow="autoplay; encrypted-media; picture-in-picture"
          />
          
          {/* Next Episode Button (Overlay) */}
          {!isMinimized && isTv && hasNextEpisode() && !showMenu && (
             <button 
                 onClick={handleNextEpisode}
                 className="absolute bottom-20 right-8 flex items-center gap-2 text-white bg-white/10 hover:bg-white/20 transition p-3 rounded backdrop-blur-sm shadow-lg border border-white/10 z-10 group"
             >
                 <span className="font-bold">Next Episode</span>
                 <SkipForward className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
             </button>
          )}

          {/* Skip Intro Button (Overlay) */}
          {!isMinimized && !showMenu && (
             <button 
                 onClick={handleSkipIntro}
                 className="absolute bottom-20 left-8 flex items-center gap-2 text-white bg-white/10 hover:bg-white/20 transition p-3 rounded backdrop-blur-sm shadow-lg border border-white/10 z-10 group"
             >
                 <SkipForward className="h-5 w-5" />
                 <span className="font-bold">Skip Intro (+85s)</span>
             </button>
          )}
      </div>

      {/* Side Menu (Full Screen Only) */}
      {!isMinimized && isTv && (
        <div className={`fixed inset-y-0 right-0 w-80 bg-[#141414] border-l border-gray-800 p-4 overflow-y-auto z-[90] transform transition-transform duration-300 ease-in-out ${showMenu ? 'translate-x-0' : 'translate-x-full'} lg:relative lg:translate-x-0 lg:w-96 ${!showMenu && 'lg:hidden'}`}>
             <div className="mt-16 lg:mt-0">
                <h2 className="text-white text-xl font-bold mb-4">{video.tvDetails?.name || 'Episodes'}</h2>
                
                <div className="mb-6">
                    <label className="block text-gray-400 text-sm mb-2 font-semibold">Select Season</label>
                    <div className="relative">
                        <select 
                            value={season} 
                            onChange={handleSeasonChange}
                            className="w-full bg-[#2b2b2b] text-white p-3 rounded appearance-none border border-gray-700 focus:outline-none focus:border-red-600 transition"
                        >
                            {video.tvDetails?.seasons?.filter((s:any) => s.season_number > 0).map((s: any) => (
                                <option key={s.id} value={s.season_number}>
                                    Season {s.season_number} ({s.episode_count} Episodes)
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="space-y-2 pb-20">
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
                            </div>
                        </div>
                    )) : (
                        <div className="text-gray-500 text-center py-10">Loading...</div>
                    )}
                </div>
            </div>
        </div>
      )}
    </div>
  );
}
