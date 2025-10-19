import React from 'react';
import { Avatar } from '@/design-system/components/Avatar/Avatar';
import { PostMedia } from './PostMedia';
import { Caption } from './Caption';
import {
  PostId,
  Media,
  UserSummary,
  PostInteractionHandlers
} from '@/entities/post/models/types';
import { useNavigate } from 'react-router-dom';
import { timeAgo } from '@/shared/utils/timeAgo';

interface PostCardProps extends PostInteractionHandlers {
  id: PostId;
  user: UserSummary;
  media: Media[];
  caption: string;
  likes?: number;
  isLiked?: boolean;
  isSaved: boolean;
  timestamp: string;
  className?: string;
  isLoading: boolean;
  actionBar?: React.ReactNode
}

export const PostCard: React.FC<PostCardProps> = ({
  id,
  user,
  media,
  caption,
  likes,
  isLiked,
  className = '',
  isLoading,
  timestamp,
  actionBar

}) => {
  const navigate = useNavigate();
  const time = timeAgo(timestamp)

  return (
    <article className={`bg-gray-900 w-full max-w-md mx-auto rounded-xl shadow-lg border border-gray-800 mb-4 sm:mb-6 overflow-hidden ${className}`}>
      {/* Post Header */}
      <header className="flex items-center p-4">
        <Avatar
          src={user.avatar}
          alt={`${user.username}'s avatar`}
          isLoading={isLoading}
          className="cursor-pointer border-gray-700"
        />
        <div className="ml-3 flex-1">
          <div className="flex items-center">
            <button
              className="font-semibold text-white hover:underline focus:ring-2 focus:ring-blue-500 focus:outline-none"
              aria-label={`View ${user.username}'s profile`}
              onClick={() => {
                navigate(`/profile/${user.id}`);
              }}
            >
              {user.username}
            </button>


          </div>
          <p>{time}</p>
        </div>

        <button
          className="p-1 hover:bg-gray-800 rounded-full focus:ring-2 focus:ring-blue-500 focus:outline-none transition-colors"
          aria-label="More options"
        >
          <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
            <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
          </svg>
        </button>

      </header>

      {/* Post Media */}
      <PostMedia media={media} />

      {/* Action Bar */}
      {actionBar}
      {/* Likes Count */}
      {(likes ?? 0) > 0 && (
        <div className="px-4 pb-2">
          <p className="text-sm font-semibold text-white">
            {(likes ?? 0) === 1 ? '1 like' : `${(likes ?? 0).toLocaleString()} likes`}
          </p>
        </div>
      )}

      {/* Caption */}
      <Caption username={user.username} caption={caption} />


    </article>
  );
};



