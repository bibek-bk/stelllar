import { UserPlus, Check } from "lucide-react";
import { useToggleFollow } from "../model/useToggleFollow";
import { cn } from "@/design-system";
import { Spinner } from "@/design-system/components/Spinner";

interface FollowButtonProps {
  userId: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'primary' | 'secondary';
  showCount?: boolean;
}

export const FollowButton: React.FC<FollowButtonProps> = ({
  userId,
  size = 'md',
  variant = 'primary',
}) => {
  const { isFollowing, isPending, toggleFollow } = useToggleFollow(userId);

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  const iconSizes = {
    sm: 14,
    md: 16,
    lg: 18,
  };

  const baseClasses =
    'w-full font-medium rounded-lg transition-all duration-200 flex items-center justify-center gap-2 disabled:cursor-not-allowed max-w-[300px] sm:max-w-[110px] min-w-[110px] w-full focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none';

  const variantClasses = isFollowing
    ? 'bg-gray-200 hover:bg-gray-300 text-gray-800'
    : variant === 'primary'
      ? 'bg-blue-500 hover:bg-blue-600 text-white'
      : 'border-2 border-blue-500 text-blue-500 hover:bg-blue-50';

  const spinnerColor = isFollowing ? '#1f2937' : '#ffffff';

  return (
    <button
      onClick={toggleFollow}
      disabled={isPending}
      className={cn(baseClasses, sizeClasses[size], variantClasses)}
      aria-label={isFollowing ? 'Unfollow user' : 'Follow user'}
      aria-pressed={isFollowing}
    >
      {isPending ? (
        <Spinner size={size} color={spinnerColor} />
      ) : (
        <>
          {isFollowing ? (
            <Check size={iconSizes[size]} />
          ) : (
            <UserPlus size={iconSizes[size]} />
          )}
          <span>{isFollowing ? 'Following' : 'Follow'}</span>
        </>
      )}
    </button>
  );
};