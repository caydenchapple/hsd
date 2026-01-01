import Link from 'next/link';
import { PlusSquare, Home, Heart, User } from 'lucide-react';

export default function Navbar({ onAddClick }: { onAddClick: () => void }) {
  return (
    <nav className="fixed top-0 w-full bg-white border-b border-gray-200 z-50 h-16 flex items-center justify-between px-4 md:px-8 lg:px-16">
      <Link href="/" className="text-xl font-bold font-serif tracking-wider">
        AI Gram
      </Link>
      
      <div className="flex items-center space-x-6">
        <Link href="/">
          <Home className="w-6 h-6 text-gray-800" />
        </Link>
        <button id="add-product-btn" onClick={onAddClick}>
          <PlusSquare className="w-6 h-6 text-gray-800" />
        </button>
        <Link href="#">
          <Heart className="w-6 h-6 text-gray-800" />
        </Link>
        <Link href="#">
          <User className="w-6 h-6 text-gray-800" />
        </Link>
      </div>
    </nav>
  );
}
