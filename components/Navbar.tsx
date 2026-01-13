import Link from 'next/link';
import { HomeIcon, CreateIcon, HeartIcon, ProfileIcon, SearchIcon } from './Icons';

export default function Navbar({ onAddClick }: { onAddClick: () => void }) {
  return (
    <nav className="fixed top-0 w-full bg-white border-b border-gray-200 z-50 h-[60px] flex items-center justify-center">
      <div className="w-full max-w-[975px] px-5 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-2xl font-semibold tracking-tight" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
          AI Gram
        </Link>
        
        {/* Search Bar (Hidden on mobile) */}
        <div className="hidden md:flex items-center bg-[#efefef] px-4 py-1.5 rounded-lg w-64">
          <SearchIcon className="w-4 h-4 text-gray-400 mr-2" />
          <input 
            type="text" 
            placeholder="Search" 
            className="bg-transparent border-none outline-none text-sm w-full placeholder-gray-500" 
          />
        </div>

        {/* Icons */}
        <div className="flex items-center space-x-6">
          <Link href="/">
            <HomeIcon className="w-[26px] h-[26px] text-[#262626]" />
          </Link>
          <button id="add-product-btn" onClick={onAddClick} className="hover:opacity-60 transition-opacity">
            <CreateIcon className="w-[26px] h-[26px] text-[#262626]" />
          </button>
          <Link href="#">
            <HeartIcon className="w-[26px] h-[26px] text-[#262626]" />
          </Link>
          <Link href="/proxy">
            <ProfileIcon className="w-[26px] h-[26px]" />
          </Link>
        </div>
      </div>
    </nav>
  );
}
