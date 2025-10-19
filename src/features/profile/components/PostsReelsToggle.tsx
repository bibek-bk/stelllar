import React from 'react';

interface PostsReelsToggleProps {
  activeTab: 'posts' | 'reels';
  onTabChange: (tab: 'posts' | 'reels') => void;
  className?: string;
}

const PostsReelsToggle: React.FC<PostsReelsToggleProps> = ({
  activeTab,
  onTabChange,
  className = ''
}) => {
  return (
    <div className={`px-4 sm:px-6 ${className}`} role="tablist" aria-label="Content type">
      <div className="flex border-b border-[var(--color-border)]">
        {/* Posts Tab */}
        <button
          onClick={() => onTabChange('posts')}
          className={`flex-1 py-3 px-4 text-center font-medium text-sm transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none ${
            activeTab === 'posts'
              ? 'text-[var(--color-text-primary)] ]'
              : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'
          }`}
          aria-label="View posts"
          role="tab"
          aria-selected={activeTab === 'posts'}
        >
          <div className="flex items-center justify-center gap-2">
            <svg 
              width="16" 
              height="16" 
              viewBox="0 0 24 24" 
              fill="none" 
              className={activeTab === 'posts' ? 'text-[var(--color-primary)]' : 'text-[var(--color-text-secondary)]'}
              aria-hidden="true"
            >
              <rect 
                x="3" 
                y="3" 
                width="7" 
                height="7" 
                rx="1" 
                stroke="currentColor" 
                strokeWidth="2"
              />
              <rect 
                x="14" 
                y="3" 
                width="7" 
                height="7" 
                rx="1" 
                stroke="currentColor" 
                strokeWidth="2"
              />
              <rect 
                x="14" 
                y="14" 
                width="7" 
                height="7" 
                rx="1" 
                stroke="currentColor" 
                strokeWidth="2"
              />
              <rect 
                x="3" 
                y="14" 
                width="7" 
                height="7" 
                rx="1" 
                stroke="currentColor" 
                strokeWidth="2"
              />
            </svg>
            Posts
          </div>
        </button>

        {/* Reels Tab */}
        <button
          onClick={() => onTabChange('reels')}
          className={`flex-1 py-3 px-4 text-center font-medium text-sm transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none ${
            activeTab === 'reels'
              ? 'text-[var(--color-text-primary)]]'
              : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'
          }`}
          aria-label="View reels"
          role="tab"
          aria-selected={activeTab === 'reels'}
        >
          <div className="flex items-center justify-center gap-2 border-l">
            <svg 
              width="16" 
              height="16" 
              viewBox="0 0 24 24" 
              fill="none" 
              className={activeTab === 'reels' ? 'text-[var(--color-primary)]' : 'text-[var(--color-text-secondary)]'}
              aria-hidden="true"
            >
              <rect 
                x="2" 
                y="3" 
                width="20" 
                height="14" 
                rx="2" 
                ry="2" 
                stroke="currentColor" 
                strokeWidth="2"
              />
              <line 
                x1="8" 
                y1="21" 
                x2="16" 
                y2="21" 
                stroke="currentColor" 
                strokeWidth="2"
              />
              <line 
                x1="12" 
                y1="17" 
                x2="12" 
                y2="21" 
                stroke="currentColor" 
                strokeWidth="2"
              />
            </svg>
            Reels
          </div>
        </button>
      </div>
    </div>
  );
};

export default PostsReelsToggle;
