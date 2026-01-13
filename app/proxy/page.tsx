'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import AddProductModal from '@/components/AddProductModal';
import { SearchIcon } from '@/components/Icons';

export default function ProxyPage() {
  const [url, setUrl] = useState('');
  const [currentUrl, setCurrentUrl] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleBrowse = (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return;
    
    let target = url;
    if (!target.startsWith('http')) {
        target = 'https://' + target;
    }
    
    setIsLoading(true);
    setCurrentUrl(`/api/proxy?url=${encodeURIComponent(target)}`);
  };

  const handleAddProduct = (product: { name: string; description: string; imageUrl: string }) => {
    console.log('Product added from proxy page (not persisted):', product);
    setIsModalOpen(false);
  };

  return (
    <main className="min-h-screen bg-[#fafafa]">
      {/* Mobile Navbar */}
      <div className="md:hidden">
        <Navbar onAddClick={() => setIsModalOpen(true)} />
      </div>

      <div className="flex justify-center">
        {/* Left Sidebar (Desktop) */}
        <Sidebar onAddClick={() => setIsModalOpen(true)} />

        {/* Main Content */}
        <div className="flex-1 w-full pt-[60px] md:pt-0 md:ml-[72px] xl:ml-[245px] min-h-screen transition-all duration-300">
           <div className="flex flex-col h-full w-full">
             
             {/* Browser Bar */}
             <div className="bg-white border-b border-gray-200 p-4 sticky top-0 z-40 shadow-sm">
                <form onSubmit={handleBrowse} className="flex items-center bg-gray-100 rounded-lg px-4 py-2 max-w-3xl mx-auto focus-within:ring-1 focus-within:ring-gray-300">
                    <SearchIcon className="w-5 h-5 text-gray-400 mr-3" />
                    <input 
                        type="text" 
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        placeholder="Enter URL to browse (e.g., google.com)" 
                        className="bg-transparent border-none outline-none text-sm w-full text-gray-800 placeholder-gray-500"
                    />
                    <button type="submit" className="text-[#0095f6] font-semibold text-sm ml-2 hover:text-[#00376b]">Go</button>
                </form>
             </div>

             {/* Browser View */}
             <div className="flex-1 bg-white relative min-h-[calc(100vh-80px)]">
                {isLoading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-white z-10 opacity-75">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
                    </div>
                )}
                {currentUrl ? (
                    <iframe 
                        src={currentUrl} 
                        className="w-full h-[calc(100vh-80px)] border-none"
                        onLoad={() => setIsLoading(false)}
                        sandbox="allow-same-origin allow-scripts allow-forms allow-popups"
                        title="Proxy Browser"
                    />
                ) : (
                    <div className="flex flex-col items-center justify-center h-[calc(100vh-80px)] text-gray-400">
                        <div className="mb-4">
                            <svg className="w-16 h-16 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                            </svg>
                        </div>
                        <p className="text-lg font-medium text-gray-500">Enter a URL to start browsing securely</p>
                        <p className="text-sm text-gray-400 mt-2">Bypass restrictions and browse freely</p>
                    </div>
                )}
             </div>
           </div>
        </div>
      </div>

      <AddProductModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onAdd={handleAddProduct}
      />
    </main>
  );
}
