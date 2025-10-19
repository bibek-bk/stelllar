import { Skeleton } from '@/design-system';import React from 'react';
// import Skeleton from '@/design-system/component/Skeleton';

interface Post {
  id: string;
  image_url: string;
  caption: string;
}

interface PostsGridProps {
  posts: Post[] | null;
  isLoading?: boolean;
  className?: string;
}

const PostsGrid: React.FC<PostsGridProps> = ({ posts, isLoading, className = '' }) => {
  
  // Show loading state
  if (isLoading) {
    return (
      <div className={`px-4 sm:px-6 ${className}`}>
        <div className="grid grid-cols-3 gap-1 sm:gap-2 md:gap-3 py-4">
          {[...Array(9)].map((_, i) => (
            <Skeleton 
              key={i}
              className="aspect-square bg-gray-700"
            />
          ))}
        </div>
      </div>
    );
  }

  // Show empty state if no posts
  if (!posts || posts.length === 0) {
    return (
      <div className={`px-4 sm:px-6 ${className}`}>
        <div className="flex flex-col items-center justify-center py-10 md:py-14">
          <div 
            className="w-22 h-22 rounded-lg border-2 border-dashed border-[#1F2A36] flex items-center justify-center mb-4"
            aria-hidden="true"
          >
            <svg 
              width="32" 
              height="32" 
              viewBox="0 0 32 32" 
              fill="none" 
              className="text-[#9AA6B2]"
            >
              <path 
                d="M8 12L16 4L24 12M16 4V28M8 20L16 12L24 20" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
            </svg>
          </div>

          <div className="text-center">
            <h2 className="text-lg font-medium text-[#E6EEF3] mb-1">
              No posts yet
            </h2>
            <p className="text-sm text-[#9AA6B2]">
              When posts appear, they'll show up here.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Show posts grid
  return (
    <div className={`px-4 sm:px-6  ${className}`}>
      <div className="grid grid-cols-3 gap-1 sm:gap-2 md:gap-3 py-4">
        {posts.map((post) => (
          <button 
            key={post.id}
            className="aspect-square rounded-lg relative group cursor-pointer overflow-hidden bg-[#1F2A36] focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none"
            aria-label={`View post: ${post.caption || 'Image post'}`}
          >
            <img 
              src={post.image_url}
              alt={post.caption || 'Post image'}
              className="w-full h-full object-cover transition-transform duration-200 ease-out group-hover:scale-110 will-change-transform"
            />
            
            {/* Hover overlay - only shows on hover */}
            <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-30 transition-opacity duration-200 ease-out pointer-events-none" />
          </button>
        ))}
      </div>
    </div>
  );
};

export default PostsGrid;