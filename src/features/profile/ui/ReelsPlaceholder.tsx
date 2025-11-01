import React from 'react';

interface ReelsPlaceholderProps {
  className?: string;
}

const ReelsPlaceholder: React.FC<ReelsPlaceholderProps> = ({ className = '' }) => {
  return (
    <div className={`px-4 sm:px-6 ${className}`}>
      <div className="flex flex-col items-center justify-center py-10 md:py-14">
        {/* Icon Placeholder */}
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
            <rect 
              x="2" 
              y="4" 
              width="28" 
              height="20" 
              rx="2" 
              ry="2" 
              stroke="currentColor" 
              strokeWidth="2"
            />
            <line 
              x1="8" 
              y1="28" 
              x2="24" 
              y2="28" 
              stroke="currentColor" 
              strokeWidth="2"
            />
            <line 
              x1="16" 
              y1="24" 
              x2="16" 
              y2="28" 
              stroke="currentColor" 
              strokeWidth="2"
            />
            <polygon 
              points="12,10 20,14 12,18" 
              fill="currentColor"
            />
          </svg>
        </div>

        {/* Message */}
        <div className="text-center">
          <h2 className="text-lg font-medium text-[#E6EEF3] mb-1">
            No reels yet
          </h2>
          <p className="text-sm text-[#9AA6B2]">
            When reels appear, they'll show up here.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ReelsPlaceholder;
