import { fetchTvShowDetails } from '@/utils/requests';
import WatchSession from '@/components/WatchSession';

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

  return <WatchSession id={id} type={type || 'movie'} tvDetails={tvDetails} />;
}
