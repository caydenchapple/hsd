'use client';

import { useState } from 'react';
import { HeartIcon, CommentIcon, ShareIcon, BookmarkIcon, EmojiIcon } from './Icons';
import { Heart } from 'lucide-react'; // Keeping this for the bouncing overlay ONLY
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
  const [showHeartOverlay, setShowHeartOverlay] = useState(false);
  const [saved, setSaved] = useState(false);

  const toggleLike = () => {
    if (liked) {
      setLikes(likes - 1);
    } else {
      setLikes(likes + 1);
    }
    setLiked(!liked);
  };

  const handleDoubleClick = () => {
    if (!liked) {
      setLikes(likes + 1);
      setLiked(true);
    }
    setShowHeartOverlay(true);
    setTimeout(() => setShowHeartOverlay(false), 1000);
  };

  const toggleSave = () => {
    setSaved(!saved);
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    setComments([...comments, { username: 'current_user', text: newComment }]);
    setNewComment('');
  };

  return (
    <div className="bg-white border-0 md:border md:border-gray-200 rounded-none md:rounded-[8px] mb-0 md:mb-6 max-w-[470px] w-full mx-auto">
      {/* Header */}
      <div className="flex items-center p-3 justify-between">
        <div className="flex items-center">
            <div className="w-[38px] h-[38px] rounded-full bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] p-[2px] cursor-pointer">
                <div className="w-full h-full rounded-full bg-white p-[2px]">
                    <div className="w-full h-full rounded-full bg-gray-200" />
                </div>
            </div>
            <div className="ml-3">
                <span className="font-semibold text-sm text-[#262626] hover:opacity-50 cursor-pointer block leading-none">{product.username}</span>
                <span className="text-xs text-[#8e8e8e] block mt-0.5 cursor-pointer">Original Audio</span>
            </div>
        </div>
        <button className="text-[#262626]">
            <svg aria-label="More options" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24">
                <circle cx="12" cy="12" r="1.5"></circle>
                <circle cx="6" cy="12" r="1.5"></circle>
                <circle cx="18" cy="12" r="1.5"></circle>
            </svg>
        </button>
      </div>

      {/* Image */}
      <div 
        className="relative w-full aspect-square bg-[#efefef] cursor-pointer"
        onDoubleClick={handleDoubleClick}
      >
        {product.imageUrl ? (
            <Image 
                src={product.imageUrl} 
                alt={product.name} 
                fill
                unoptimized
                crossOrigin="anonymous"
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
        ) : (
            <div className="flex items-center justify-center w-full h-full text-gray-400">No Image</div>
        )}
        
        {/* Heart Overlay Animation */}
        <div className={`absolute inset-0 flex items-center justify-center pointer-events-none transition-opacity duration-300 ${showHeartOverlay ? 'opacity-100' : 'opacity-0'}`}>
            <Heart className="w-24 h-24 text-white fill-white drop-shadow-lg animate-bounce" />
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-between px-3 pt-3 pb-2">
        <div className="flex space-x-4">
          <button onClick={toggleLike} className="hover:opacity-50 transition-transform active:scale-90">
            <HeartIcon filled={liked} />
          </button>
          <button className="hover:opacity-50 transition-transform active:scale-90">
             <CommentIcon />
          </button>
          <button className="hover:opacity-50 transition-transform active:scale-90">
             <ShareIcon />
          </button>
        </div>
        <button onClick={toggleSave} className="hover:opacity-50 transition-transform active:scale-90">
            <BookmarkIcon filled={saved} />
        </button>
      </div>

      {/* Likes */}
      <div className="px-3 text-sm font-semibold mb-2 text-[#262626]">
        {likes.toLocaleString()} likes
      </div>

      {/* Caption */}
      <div className="px-3 pb-2">
        <span className="font-semibold text-sm mr-2 text-[#262626] hover:underline cursor-pointer">{product.username}</span>
        <span className="text-sm text-[#262626]">{product.description}</span>
      </div>

      {/* View Comments Link */}
      <div className="px-3 pb-1">
        <button className="text-[#8e8e8e] text-sm cursor-pointer">
            View all {10 + comments.length} comments
        </button>
      </div>

      {/* Comments */}
      {comments.length > 0 && (
        <div className="px-3 pb-2 space-y-0.5">
          {comments.map((comment, i) => (
            <div key={i} className="text-sm">
              <span className="font-semibold mr-2 text-[#262626]">{comment.username}</span>
              <span className="text-[#262626]">{comment.text}</span>
            </div>
          ))}
        </div>
      )}
      
      {/* Time */}
      <div className="px-3 pb-3 border-b border-gray-100 md:border-none">
        <span className="text-[10px] text-[#8e8e8e] uppercase tracking-wide">2 HOURS AGO</span>
      </div>

      {/* Add Comment */}
      <form onSubmit={handleAddComment} className="hidden md:flex border-t border-gray-100 px-3 py-3 items-center">
        <button type="button" className="mr-3">
             <EmojiIcon />
        </button>
        <input 
          type="text" 
          placeholder="Add a comment..." 
          className="flex-1 outline-none text-sm placeholder-gray-500 text-[#262626]"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <button 
            type="submit" 
            disabled={!newComment}
            className={`font-semibold text-sm ml-2 ${newComment ? 'text-[#0095f6] cursor-pointer' : 'text-[#bce3fd] cursor-default'}`}
        >
            Post
        </button>
      </form>
    </div>
  );
}
