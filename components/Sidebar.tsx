import Link from 'next/link';
import { HomeIcon, SearchIcon, ExploreIcon, ReelsIcon, MessagesIcon, NotificationsIcon, CreateIcon, ProfileIcon, MoreIcon, InstagramLogo } from './Icons';

interface SidebarProps {
  onAddClick: () => void;
}

export default function Sidebar({ onAddClick }: SidebarProps) {
  const menuItems = [
    { icon: HomeIcon, label: 'Home', href: '/', active: true },
    { icon: SearchIcon, label: 'Search', href: '#' },
    { icon: ExploreIcon, label: 'Explore', href: '#' },
    { icon: ReelsIcon, label: 'Reels', href: '#' },
    { icon: MessagesIcon, label: 'Messages', href: '#' },
    { icon: NotificationsIcon, label: 'Notifications', href: '#' },
    { icon: CreateIcon, label: 'Create', onClick: onAddClick },
    { icon: ProfileIcon, label: 'Profile', href: '#' },
  ];

  return (
    <div className="hidden md:flex flex-col fixed left-0 top-0 h-full w-[72px] xl:w-[245px] border-r border-gray-200 bg-white z-50 px-3 pb-5 pt-2 transition-all duration-300">
      {/* Logo */}
      <div className="h-[73px] flex items-center px-3 mb-2">
        <Link href="/" className="block group">
            {/* Wide Screen Logo (Text) */}
            <span className="hidden xl:block text-2xl font-semibold tracking-tight group-active:opacity-50" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
                AI Gram
            </span>
            {/* Narrow Screen Logo (Icon) */}
            <div className="xl:hidden group-active:opacity-50 hover:bg-gray-50 rounded-lg p-2 transition-colors">
                <InstagramLogo />
            </div>
        </Link>
      </div>

      {/* Nav Items */}
      <div className="flex-1 space-y-2">
        {menuItems.map((item, i) => {
            const Content = (
                <>
                    <div className="group-hover:scale-105 transition-transform">
                        <item.icon active={item.active} />
                    </div>
                    <span className={`hidden xl:block ml-4 text-[16px] text-[#262626] ${item.active ? 'font-bold' : ''}`}>{item.label}</span>
                </>
            );

            if (item.onClick) {
                return (
                    <button
                        key={i}
                        onClick={item.onClick}
                        className="w-full flex items-center p-3 rounded-lg hover:bg-gray-50 transition-colors group justify-center xl:justify-start"
                    >
                        {Content}
                    </button>
                );
            }

            return (
                <Link
                    key={i}
                    href={item.href || '#'}
                    className="flex items-center p-3 rounded-lg hover:bg-gray-50 transition-colors group justify-center xl:justify-start"
                >
                    {Content}
                </Link>
            );
        })}
      </div>

      {/* More Menu */}
      <button className="flex items-center p-3 rounded-lg hover:bg-gray-50 transition-colors group mt-auto justify-center xl:justify-start">
        <div className="group-hover:scale-105 transition-transform">
            <MoreIcon />
        </div>
        <span className="hidden xl:block ml-4 text-[16px] text-[#262626]">More</span>
      </button>
    </div>
  );
}
