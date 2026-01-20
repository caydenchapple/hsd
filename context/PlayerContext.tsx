'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

interface VideoState {
  id: string;
  type: string; // 'movie' | 'tv'
  tvDetails?: any;
  season?: number;
  episode?: number;
}

interface PlayerContextType {
  video: VideoState | null;
  setVideo: (video: VideoState | null) => void;
  isMinimized: boolean;
  setIsMinimized: (value: boolean) => void;
  closePlayer: () => void;
}

const PlayerContext = createContext<PlayerContextType | undefined>(undefined);

export function PlayerProvider({ children }: { children: ReactNode }) {
  const [video, setVideo] = useState<VideoState | null>(null);
  const [isMinimized, setIsMinimized] = useState(false);

  const closePlayer = () => {
    setVideo(null);
    setIsMinimized(false);
  };

  return (
    <PlayerContext.Provider value={{ video, setVideo, isMinimized, setIsMinimized, closePlayer }}>
      {children}
    </PlayerContext.Provider>
  );
}

export function usePlayer() {
  const context = useContext(PlayerContext);
  if (context === undefined) {
    throw new Error('usePlayer must be used within a PlayerProvider');
  }
  return context;
}
