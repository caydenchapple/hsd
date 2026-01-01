'use client';

import { useState } from 'react';
import { Heart, MessageCircle, Send, Bookmark } from 'lucide-react';
import Image from 'next/image';

interface Product {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  likes: number;
  username: string;
  comments?: { username: string; text: string }[];
}

export default function ProductCard({ product }: { product: Product }) {
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(product.likes);
  const [comments, setComments] = useState(product.comments || []);
  const [newComment, setNewComment] = useState('');

  const toggleLike = () => {
    if (liked) {
      setLikes(likes - 1);
    } else {
      setLikes(likes + 1);
    }
    setLiked(!liked);
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    setComments([...comments, { username: 'current_user', text: newComment }]);
    setNewComment('');
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg mb-8 max-w-[470px] w-full mx-auto">
      {/* Header */}
      <div className="flex items-center p-3">
        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-yellow-400 to-purple-600 p-[2px]">
            <div className="w-full h-full rounded-full bg-white p-[1px]">
                <div className="w-full h-full rounded-full bg-gray-200" />
            </div>
        </div>
        <span className="ml-3 font-semibold text-sm">{product.username}</span>
      </div>

      {/* Image */}
      <div className="relative w-full aspect-square bg-gray-100">
        {product.imageUrl ? (
            <Image 
                src={product.imageUrl} 
                alt={product.name} 
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
        ) : (
            <div className="flex items-center justify-center w-full h-full text-gray-400">No Image</div>
        )}
      </div>

      {/* Actions */}
      <div className="flex justify-between px-4 pt-3 pb-2">
        <div className="flex space-x-4">
          <button onClick={toggleLike}>
            <Heart className={`w-6 h-6 ${liked ? 'fill-red-500 text-red-500' : 'text-gray-800'}`} />
          </button>
          <MessageCircle className="w-6 h-6 text-gray-800" />
          <Send className="w-6 h-6 text-gray-800" />
        </div>
        <Bookmark className="w-6 h-6 text-gray-800" />
      </div>

      {/* Likes */}
      <div className="px-4 text-sm font-semibold mb-1">
        {likes} likes
      </div>

      {/* Caption */}
      <div className="px-4 pb-2">
        <span className="font-semibold text-sm mr-2">{product.username}</span>
        <span className="text-sm">{product.description}</span>
        <div className="text-xs text-gray-500 mt-1 uppercase">
            {product.name}
        </div>
      </div>

      {/* Comments */}
      {comments.length > 0 && (
        <div className="px-4 pb-2 space-y-1">
          {comments.map((comment, i) => (
            <div key={i} className="text-sm">
              <span className="font-semibold mr-2">{comment.username}</span>
              <span>{comment.text}</span>
            </div>
          ))}
        </div>
      )}

      {/* Add Comment */}
      <form onSubmit={handleAddComment} className="border-t border-gray-200 px-4 py-3 flex items-center">
        <input 
          type="text" 
          placeholder="Add a comment..." 
          className="flex-1 outline-none text-sm"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        {newComment && (
          <button type="submit" className="text-blue-500 font-semibold text-sm ml-2">Post</button>
        )}
      </form>
    </div>
  );
}
