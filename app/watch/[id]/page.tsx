import WatchPlayer from '@/components/WatchPlayer';
import { fetchTvShowDetails } from '@/utils/requests';

interface Props {
  params: Promise<{
    id: string;
  }>;
  searchParams: Promise<{
    type?: string;
  }>;
}

export default async function Watch(props: Props) {
  const { id } = await props.params;
  const { type } = await props.searchParams;
  
  const isTv = type === 'tv';
  let tvDetails = null;

  if (isTv) {
    tvDetails = await fetchTvShowDetails(id);
  }

  return <WatchPlayer id={id} type={type || 'movie'} tvDetails={tvDetails} />;
}
