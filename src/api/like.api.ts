import { supabase } from "@/shared/config/supabaseClient"

export const likeApi = {
    async insertLike(postId: string, userId: string): Promise<void> {
        console.log(postId,userId,'from api ');
        
        const { error } = await supabase.from('post_likes')
            .insert([{ post_id: postId, user_id: userId }]);
        if (error) throw error;
    },

    async deleteLike(postId: string, userId: string): Promise<void> {
        const { error } = await supabase.from('post_likes')
            .delete()
            .eq('post_id', postId)
            .eq('user_id', userId);
        if (error) throw error;
    },
    async getLikeCount(postId: string): Promise<number> {
        const { count, error } = await supabase.from('post_likes')
            .select('*', { count: 'exact', head: true })
            .eq('post_id', postId);
        if (error) throw error;
        return count || 0;
    },

    async hasUserLikedPost(postId: string, userId: string): Promise<boolean> {
        const { data, error } = await supabase.from('post_likes')
            .select('*')
            .eq('post_id', postId)
            .eq('user_id', userId)
            .maybeSingle();
        if (error) throw error;
        return !!data;
    }
}

// async createPost(payload: CreatePostPayload): Promise<DbPostRow> {
//     const { data, error } = await supabase
//       .from('posts')
//       .insert([payload])
//       .select()
//       .single();

//     if (error) throw error;
//     return data as DbPostRow;
//   },