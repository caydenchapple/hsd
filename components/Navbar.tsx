'use client';
import { useState, useEffect } from 'react';
import { Search, Bell, User } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Debounced search effect
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchQuery.trim()) {
        router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
      }
    }, 500); // 500ms delay

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery, router]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <header className={`${isScrolled ? 'bg-[#141414]' : 'bg-transparent'} fixed top-0 z-50 w-full transition-all duration-300 p-4 lg:px-10 lg:py-6 flex items-center justify-between`}>
      <div className="flex items-center space-x-8">
        <Link href="/">
           <h1 className="text-[#E50914] text-3xl font-bold cursor-pointer">NETFLIX</h1>
        </Link>
        <ul className="hidden md:flex space-x-4 text-[#e5e5e5] text-sm font-light">
          <Link href="/"><li className="cursor-pointer font-semibold hover:text-white transition">Home</li></Link>
          <li className="cursor-pointer hover:text-white transition">TV Shows</li>
          <li className="cursor-pointer hover:text-white transition">Movies</li>
          <li className="cursor-pointer hover:text-white transition">New & Popular</li>
          <li className="cursor-pointer hover:text-white transition">My List</li>
        </ul>
      </div>

      <div className="flex items-center space-x-4 text-white text-sm font-light">
        <div className={`flex items-center border ${showSearch ? 'border-white bg-black/50' : 'border-transparent'} transition-all duration-300 rounded px-2`}>
          <Search 
            className="w-6 h-6 cursor-pointer" 
            onClick={() => setShowSearch(!showSearch)} 
          />
          <form onSubmit={handleSearchSubmit}>
            <input 
              type="text" 
              placeholder="Titles, people, genres" 
              className={`bg-transparent text-white outline-none placeholder-gray-400 text-sm ml-2 transition-all duration-300 ${showSearch ? 'w-48 sm:w-64 opacity-100' : 'w-0 opacity-0'}`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onBlur={() => !searchQuery && setShowSearch(false)}
            />
          </form>
        </div>
        <Bell className="w-6 h-6 cursor-pointer" />
        <Link href="/">
           <User className="w-6 h-6 cursor-pointer" />
        </Link>
      </div>
    </header>
  );
}
