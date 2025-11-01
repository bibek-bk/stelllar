// Domain types for the Post entity

export type PostId = string;

export type MediaType = 'image' | 'video';

export interface Media {
  id: string;
  type: MediaType;
  url: string;
  alt?: string;
}

export interface UserSummary {
  username: string;
  avatar: string;
  id?: string;
}

export interface Comment {
  id: string;
  username: string;
  text: string;
  likes: number;
  timestamp: string; // ISO 8601
}

export interface Post {
  id: PostId;
  user: UserSummary;
  media: Media[];
  caption: string;
  likes: number; // keep for compatibility with existing UI
  isLiked: boolean; // keep for compatibility
  likesCount?: number; // new optional alias for service layer
  likedByUser?: boolean; // new optional alias for service layer2


  comments: Comment[];
  totalComments: number;
  shares: number;
  isSaved: boolean;
  timestamp: string; // ISO 8601
  location?: string;
}

// Optional: common callbacks used around post interactions
export interface PostInteractionHandlers {
  onLike?: (postId: PostId) => void;
  onComment?: (postId: PostId) => void;
  onShare?: (postId: PostId) => void;
  onSave?: (postId: PostId) => void;
  onViewAllComments?: (postId: PostId) => void;
}

// Helpers for optimistic updates
export const getPostLikedState = (post: Pick<Post, 'isLiked' | 'likedByUser'>): boolean => {
  return typeof post.likedByUser === 'boolean' ? post.likedByUser : !!post.isLiked;
};

export const incrementLikes = <T extends Pick<Post, 'likes' | 'likesCount'>>(post: T): T => {
  const nextLikes = (post.likesCount ?? post.likes) + 1;
  return { ...post, likes: nextLikes, likesCount: nextLikes };
};

export const decrementLikes = <T extends Pick<Post, 'likes' | 'likesCount'>>(post: T): T => {
  const nextLikes = Math.max(0, (post.likesCount ?? post.likes) - 1);
  return { ...post, likes: nextLikes, likesCount: nextLikes };
};


