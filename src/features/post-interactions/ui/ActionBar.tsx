
import { LikeButton } from '@/features/post-interactions/like-post';
import { useHasUserLikedPost } from '@/services/like/queries';

interface ActionBarProps {
  postId: string;
  isLiked: boolean;
  className?: string;
}

export const ActionBar: React.FC<ActionBarProps> = ({
  postId,
  isLiked,
  className = ''
}) => {

  


  return (
    <div className={`flex items-center justify-between py-3 px-4 border-t border-gray-800 ${className}`}>
      <div className="flex items-center gap-6">
        {/* Like Button (service-backed) */}
        <LikeButton postId={postId} isLiked={isLiked}  />


        {/* Share Button */}
        <button
          className="flex items-center space-x-1 hover:opacity-70 transition-opacity focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none rounded"
          aria-label="Share post"
        >
          <svg
            className="w-6 h-6 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"
            />
          </svg>
         
        </button>
      </div>

     
    </div>
  );
};



