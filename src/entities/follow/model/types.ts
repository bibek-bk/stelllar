export interface Follow {
    id: string;
    follower_id: string;
    following_id: string;
    created_at: string;
}

export interface FollowWithProfile extends Follow {
    follower?: UserProfile;
    following?: UserProfile;
}

export interface UserProfile {
    id: string;
    username: string;
    full_name: string | null;
    avatar_url: string | null;
    bio: string | null;
    followers_count: number;
    following_count: number;
    posts_count: number;
    created_at: string;
}

export interface FollowStats {
    followers_count: number;
    following_count: number;
    is_following: boolean;
}
