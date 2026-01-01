'use client';

import { useState } from 'react';
import { X } from 'lucide-react';

interface AddProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (product: { name: string; description: string; imageUrl: string }) => void;
}

export default function AddProductModal({ isOpen, onClose, onAdd }: AddProductModalProps) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd({ name, description, imageUrl });
    setName('');
    setDescription('');
    setImageUrl('');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-[60] flex items-center justify-center p-4">
      <div className="bg-white rounded-xl w-full max-w-md overflow-hidden">
        <div className="border-b border-gray-200 p-3 flex justify-between items-center">
            <h2 className="font-semibold text-center flex-1">Create new post</h2>
            <button onClick={onClose} className="text-blue-500 font-semibold text-sm">Cancel</button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 flex flex-col space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
                <input 
                    id="product-name"
                    required
                    type="text" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-1 focus:ring-black"
                    placeholder="e.g. ChatGPT"
                />
            </div>
            
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                <input 
                    id="product-image"
                    required
                    type="url" 
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-1 focus:ring-black"
                    placeholder="https://..."
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea 
                    id="product-desc"
                    required
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-1 focus:ring-black h-24 resize-none"
                    placeholder="Write a caption..."
                />
            </div>

            <button 
                id="submit-product-btn"
                type="submit"
                className="w-full bg-blue-500 text-white font-semibold py-2 rounded hover:bg-blue-600 transition"
            >
                Share
            </button>
        </form>
      </div>
    </div>
  );
}
