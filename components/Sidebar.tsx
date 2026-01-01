import Link from 'next/link';
import { Home, Search, Compass, Clapperboard, MessageCircle, Heart, PlusSquare, Menu, Instagram } from 'lucide-react';

interface SidebarProps {
  onAddClick: () => void;
}

export default function Sidebar({ onAddClick }: SidebarProps) {
  const menuItems = [
    { icon: Home, label: 'Home', href: '/' },
    { icon: Search, label: 'Search', href: '#' },
    { icon: Compass, label: 'Explore', href: '#' },
    { icon: Clapperboard, label: 'Reels', href: '#' },
    { icon: MessageCircle, label: 'Messages', href: '#' },
    { icon: Heart, label: 'Notifications', href: '#' },
  ];

  return (
    <div className="hidden md:flex flex-col fixed left-0 top-0 h-full w-[245px] border-r border-gray-200 bg-white z-50 px-3 pb-5 pt-2">
      {/* Logo */}
      <div className="h-[73px] flex items-center px-3 mb-2">
        <Link href="/" className="text-2xl font-semibold tracking-tight" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
          AI Gram
        </Link>
      </div>

      {/* Nav Items */}
      <div className="flex-1 space-y-2">
        {menuItems.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className="flex items-center p-3 rounded-lg hover:bg-gray-50 transition-colors group"
          >
            <item.icon className="w-6 h-6 text-[#262626] group-hover:scale-105 transition-transform stroke-[1.5px]" />
            <span className="ml-4 text-[16px] text-[#262626]">{item.label}</span>
          </Link>
        ))}

        {/* Create Button */}
        <button
          onClick={onAddClick}
          className="w-full flex items-center p-3 rounded-lg hover:bg-gray-50 transition-colors group text-left"
        >
          <PlusSquare className="w-6 h-6 text-[#262626] group-hover:scale-105 transition-transform stroke-[1.5px]" />
          <span className="ml-4 text-[16px] text-[#262626]">Create</span>
        </button>

        {/* Profile Link */}
        <Link
          href="#"
          className="flex items-center p-3 rounded-lg hover:bg-gray-50 transition-colors group"
        >
          <div className="w-6 h-6 rounded-full bg-gray-200 border border-gray-300 overflow-hidden">
             {/* Placeholder for user avatar */}
          </div>
          <span className="ml-4 text-[16px] font-bold text-[#262626]">Profile</span>
        </Link>
      </div>

      {/* More Menu */}
      <button className="flex items-center p-3 rounded-lg hover:bg-gray-50 transition-colors group mt-auto text-left">
        <Menu className="w-6 h-6 text-[#262626] group-hover:scale-105 transition-transform stroke-[1.5px]" />
        <span className="ml-4 text-[16px] text-[#262626]">More</span>
      </button>
    </div>
  );
}
