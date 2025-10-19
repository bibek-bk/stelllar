import React from 'react';
import { Avatar } from '@/design-system/components/Avatar/Avatar';
import { Button } from '@/design-system/components/Button/Button';
import Metrics from './Metrics';
import { FollowButton } from '@/features/follow/FollowButton';
import { Settings } from 'lucide-react';

interface ProfileHeaderProps {
  userId: string;
  avatarSrc?: string;
  avatarAlt?: string;
  posts?: number;
  followers?: number;
  following?: number;
  onEditProfile?: () => void;
  isOwnProfile?: boolean;
  className?: string;
  isLoading: boolean;
  onClick: () => void;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  avatarSrc,
  avatarAlt = 'Profile avatar',
  posts = 0,
  followers = 1280,
  following = 156,
  userId,
  onEditProfile,
  isLoading,
  isOwnProfile = false,
  onClick,
  className = '',
}) => {
  console.log(avatarSrc)

  return (
    <div className={`flex  items-start  sm:items-center gap-4 ${className}`}>
      {/* Avatar */}
      <div className="ml-4 sm:ml-6">
        <Avatar
          src={avatarSrc}
          alt={avatarAlt}
          isLoading={isLoading}
          size="mobile"
          className="sm:w-[110px] sm:h-[110px] lg:w-32 lg:h-32"
        />
      </div>

      {/* Metrics and Follow Button */}
      <div className=" flex flex-col items-center sm:flex-row sm:items-center sm:justify-between  w-full px-4  sm:px-6">
        {/* Metrics */}
        <div className="mb-4 sm:mb-0 flex justify-center  mx-auto">
          <Metrics
            posts={posts}
            followers={followers}
            following={following}
            isLoading={isLoading}
          />
        </div>

        {/* Follow/Edit Profile Button */}
        <div className='flex sm:justify-end w-full justify-center  gap-10'>
          {isOwnProfile ? (
            <Button
              onClick={onEditProfile}
              aria-label="Edit profile"
              className=" sm:w-auto sm:min-w-[120px] gap-2"
            >
              Edit Profile
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                className="opacity-80"
                aria-hidden="true"
              >
                <path
                  d="M8.5 1.5L10.5 3.5L3.5 10.5L1.5 10.5L1.5 8.5L8.5 1.5Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Button>
          ) : (
            <FollowButton
              userId={userId}
            />
          )}
          <button
            onClick={onClick}
            className="lg:hidden p-2 hover:bg-gray-800 rounded-full transition-colors focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none"
            aria-label="Settings"
          >
            <Settings className="w-5 h-5 text-gray-400 hover:text-gray-200" aria-hidden="true" />
          </button>
        </div>

      </div>

    </div>
  );
};

export default ProfileHeader;
