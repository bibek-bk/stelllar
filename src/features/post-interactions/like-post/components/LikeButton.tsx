import React, { useRef } from 'react';
import { useToggleLike } from '../hooks/useToggleLike';


interface LikeButtonProps {
  postId: string;
  isLiked: boolean;
  className?: string;
}

export const LikeButton: React.FC<LikeButtonProps> = ({ postId, isLiked, className = '' }) => {
  const { toggle, isPending } = useToggleLike(postId, isLiked);
  const lastClickTime = useRef(0);
  const DEBOUNCE_MS = 300;

  const handleClick = () => {
    const now = Date.now();
    if (now - lastClickTime.current < DEBOUNCE_MS) {
      return; // Ignore rapid clicks
    }
    lastClickTime.current = now;
    console.log(lastClickTime);
    
    toggle();
  };

  return (
    <button
      onClick={handleClick}
      className={`flex items-center space-x-1 transition-opacity focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none rounded ${className}`}
      aria-label={isLiked ? 'Unlike post' : 'Like post'}
      aria-pressed={isLiked}
    >
      <svg
        className={`w-6 h-6 transition-all duration-200 ${
          isLiked ? 'text-red-500 fill-current' : 'text-gray-400'
        } ${isPending ? 'scale-110 animate-pulse' : ''}`}
        fill={isLiked ? 'currentColor' : 'none'}
        stroke="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
        />
      </svg>

    </button>
  );
};