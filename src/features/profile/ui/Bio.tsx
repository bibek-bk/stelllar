import { Skeleton } from '@/design-system';
import React from 'react';

interface BioProps {
  name?: string;
  bio?: string;
  className?: string;
  isLoading: boolean
}

const Bio: React.FC<BioProps> = ({
  name = 'Name',
  bio = 'Bio',
  className = '',
  isLoading
}) => {
  return (
    <div className={`px-4 sm:px-6  min-h-20  ${className}`}>
      <div className="space-y-1">
        {/* Name */}

        {
          isLoading ?
            <Skeleton
              className=' bg-gray-700'
              variant='rectangular'
              width='10rem'
              height='20px' />
            : <h1 className="text-base font-bold text-[var(--color-text-primary)] md:text-xl">
              {name}
            </h1>
        }

        {/* Bio */}
        {
          isLoading ?
            <Skeleton
              className=' bg-gray-700'
              variant='rectangular'
              width='10rem'
              height='40px' />
            :   <p className="text-sm text-[var(--color-text-primary)] leading-relaxed">
            {bio}
          </p>
        }
      


      </div>
    </div>
  );
};

export default Bio;
