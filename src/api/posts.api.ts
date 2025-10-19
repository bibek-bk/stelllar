import { supabase } from '@/shared/config/supabaseClient';

export interface CreatePostPayload {
  user_id: string;
  caption: string;
  image_url: string;
}

export interface DbPostRow {
  id: string;
  user_id: string;
  caption: string;
  image_url: string;
  created_at: string;
  updated_at: string;
  like_count: number;
  isLiked?: boolean;  // Added for client-side like status
  profiles?: {
    id: string;
    username: string;
    avatar_url: string | null;
  };
}

export const postsApi = {


  async uploadImage(file: File, userId: string): Promise<string> {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp','image/svg+xml'];
    //better to do validation on both client and storage RLS
    if (!allowedTypes.includes(file.type)) {
      throw new Error('Invalid file type. Only images are allowed.');
    }

    const fileExt = file.name.split('.').pop() || 'jpg';
    const fileName = `${userId}/${Date.now()}.${fileExt}`;

    // Removed the 'posts/' prefix - just use fileName directly

    const { data, error } = await supabase.storage
      .from('post-images')
      .upload(fileName, file, {  // ← Changed from filePath to fileName
        cacheControl: '3600',
        upsert: false,
      });

    if (error) throw error;

    const { data: urlData } = supabase.storage
      .from('post-images')
      .getPublicUrl(data.path);

    return urlData.publicUrl;
  },
  async createPost(payload: CreatePostPayload): Promise<DbPostRow> {
    const { data, error } = await supabase
      .from('posts')
      .insert([payload])
      .select()
      .single();

    if (error) throw error;
    return data as DbPostRow;
  },

  async deleteImage(imageUrl: string): Promise<void> {
    const path = imageUrl.split('/post-images/')[1];
    if (path) {
      const { error } = await supabase.storage.from('post-images').remove([path]);
      if (error) throw error;
    }
  },
  async getAllPosts(userId?: string): Promise<DbPostRow[]> {
    const { data, error } = await supabase
      .from('posts')
      .select(`
        *,
        profiles:user_id (
          id,
          username,
          avatar_url
        )
      `)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    if (!data) return [];
    
    console.log('Raw posts data:', data);
    
    // If no userId, return posts without like status
    if (!userId) {
      return data.map(post => ({ ...post, isLiked: false })) as DbPostRow[];
    }
    
    // Fetch all likes for the current user in one query
    const postIds = data.map(post => post.id);
    const { data: userLikes, error: likesError } = await supabase
      .from('post_likes')
      .select('post_id')
      .eq('user_id', userId)
      .in('post_id', postIds);
    
    if (likesError) {
      console.error('Error fetching user likes:', likesError);
      return data.map(post => ({ ...post, isLiked: false })) as DbPostRow[];
    }
    
    // Create a Set of liked post IDs for O(1) lookup
    const likedPostIds = new Set(userLikes?.map(like => like.post_id) || []);
    
    console.log('User liked posts:', Array.from(likedPostIds));
    
    // Map posts with like status
    return data.map((post: any) => ({
      ...post,
      isLiked: likedPostIds.has(post.id)
    })) as DbPostRow[];
  },
};


