'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import ProductCard from '@/components/ProductCard';
import AddProductModal from '@/components/AddProductModal';

// Mock initial data
const INITIAL_PRODUCTS = [
  {
    id: '1',
    name: 'ChatGPT',
    description: 'Optimizing language models for dialogue. This AI is changing the world one prompt at a time.',
    imageUrl: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800',
    likes: 1240,
    username: 'openai_official'
  },
  {
    id: '2',
    name: 'Midjourney',
    description: 'Generative AI program and service created and hosted by San Francisco-based independent research lab Midjourney, Inc.',
    imageUrl: 'https://images.unsplash.com/photo-1684469225528-98e9860b299a?auto=format&fit=crop&q=80&w=800',
    likes: 856,
    username: 'midjourney_art'
  },
  {
    id: '3',
    name: 'GitHub Copilot',
    description: 'Your AI pair programmer. Spend less time creating boilerplate and repetitive code patterns, and more time on what matters.',
    imageUrl: 'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?auto=format&fit=crop&q=80&w=800',
    likes: 2103,
    username: 'github_dev'
  }
];

export default function Home() {
  const [products, setProducts] = useState(INITIAL_PRODUCTS);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddProduct = (newProduct: { name: string; description: string; imageUrl: string }) => {
    const product = {
      id: Date.now().toString(),
      ...newProduct,
      likes: 0,
      username: 'current_user' // Simulating logged in user
    };
    setProducts([product, ...products]);
  };

  return (
    <main className="min-h-screen bg-gray-50 pb-20">
      <Navbar onAddClick={() => setIsModalOpen(true)} />
      
      <div className="pt-24 px-4 flex flex-col items-center">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <AddProductModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onAdd={handleAddProduct}
      />
    </main>
  );
}
