import React from 'react';

interface Story {
  id: string;
  label: string;
  initials: string;
}

interface StoriesRowProps {
  stories?: Story[];
  className?: string;
}

const StoriesRow: React.FC<StoriesRowProps> = ({
  stories = [
    { id: '1', label: 'Text 01', initials: 'T1' },
    { id: '2', label: 'Text 02', initials: 'T2' },
    { id: '3', label: 'Text 03', initials: 'T3' },
    { id: '4', label: 'Text 04', initials: 'T4' },
    { id: '5', label: 'Text 05', initials: 'T5' }
  ],
  className = ''
}) => {
  return (
    <div className={`px-4 sm:px-6 ${className}`}>
      <div className="flex gap-[18px] overflow-x-auto scrollbar-hide pb-2 sm:justify-center">
        {stories.map((story) => (
          <button
            key={story.id}
            className="flex flex-col items-center gap-2 flex-shrink-0 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:ring-offset-2 focus:ring-offset-[var(--color-background)] rounded-lg"
            aria-label={`Open story ${story.label}`}
            role="button"
          >
            {/* Story Circle */}
            <div className="relative">
              {/* Outer ring */}
              <div className="w-16 h-16 sm:w-[78px] sm:h-[78px] lg:w-[92px] lg:h-[92px] rounded-full border-4 border-[var(--color-border)] flex items-center justify-center bg-[var(--color-background)]">
                {/* Inner circle with placeholder */}
                <div className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 rounded-full bg-[var(--color-background-secondary)] flex items-center justify-center">
                  <span className="text-xs font-medium text-[var(--color-text-secondary)]">
                    {story.initials}
                  </span>
                </div>
              </div>
            </div>

            {/* Label */}
            <span className="text-xs text-[var(--color-text-secondary)] text-center">
              {story.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default StoriesRow;
