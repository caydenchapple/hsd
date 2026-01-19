'use client';
import { useState, useEffect } from 'react';
import { Search, Bell, User } from 'lucide-react';
import Link from 'next/link';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

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

  return (
    <header className={`${isScrolled ? 'bg-[#141414]' : 'bg-transparent'} fixed top-0 z-50 w-full transition-all duration-300 p-4 lg:px-10 lg:py-6 flex items-center justify-between`}>
      <div className="flex items-center space-x-8">
        <Link href="/">
           <h1 className="text-red-600 text-3xl font-bold cursor-pointer">NETFLIX</h1>
        </Link>
        <ul className="hidden md:flex space-x-4 text-[#e5e5e5] text-sm font-light">
          <li className="cursor-pointer font-semibold hover:text-white transition">Home</li>
          <li className="cursor-pointer hover:text-white transition">TV Shows</li>
          <li className="cursor-pointer hover:text-white transition">Movies</li>
          <li className="cursor-pointer hover:text-white transition">New & Popular</li>
          <li className="cursor-pointer hover:text-white transition">My List</li>
        </ul>
      </div>

      <div className="flex items-center space-x-4 text-white text-sm font-light">
        <Search className="hidden sm:inline w-6 h-6 cursor-pointer" />
        <Bell className="w-6 h-6 cursor-pointer" />
        <Link href="/">
           <User className="w-6 h-6 cursor-pointer" />
        </Link>
      </div>
    </header>
  );
}
