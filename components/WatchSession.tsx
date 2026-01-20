'use client';

import { useEffect } from 'react';
import { usePlayer } from '@/context/PlayerContext';

interface Props {
  id: string;
  type: string;
  tvDetails?: any;
}

export default function WatchSession({ id, type, tvDetails }: Props) {
  const { setVideo } = usePlayer();

  useEffect(() => {
    setVideo({
      id,
      type,
      tvDetails
    });
  }, [id, type, tvDetails, setVideo]);

  return null;
}
