import { Follow, FollowWithProfile } from "@/entities/follow/types"
import { supabase } from "@/shared/config/supabaseClient"


export const followApi = {

    followUser: async (followingId: string): Promise<Follow> => {
        const {
            data: { user }
        } = await supabase.auth.getUser()

        if (!user) throw Error('User not authenticated , Signin To Follow')

        const { data, error } = await supabase
            .from('follows')
            .insert([{
                follower_id: user.id,
                following_id: followingId
            }])
            .select()
            .single()
        if (error) throw error
        return data
    },

    unFollowUser: async (followingId: string): Promise<void> => {
        const { data: { user } } = await supabase.auth.getUser()
        if (!user) throw Error('User not authenticated')
        
        const { error } = await supabase
            .from('follows')
            .delete()
            .eq('follower_id', user.id)
            .eq('following_id', followingId)

        if (error) throw error
    },
    getFollowers: async (
        userId: string,
        limit: number = 20,
        offset: number = 0
    ): Promise<FollowWithProfile[]> => {
        const { data, error } = await supabase
            .from('follows')
            .select(
                `
            *,
            follower:profiles!follows_follower_id_fkey(*)
          `
            )
            .eq('following_id', userId)
            .order('created_at', { ascending: false })
            .range(offset, offset + limit - 1);

        if (error) throw error;
        return data || [];
    },
    isFollowing: async (userId: string): Promise<boolean> => {
        const {
            data: { user },
        } = await supabase.auth.getUser();
        if (!user) return false;

        const { data, error } = await supabase
            .from('follows')
            .select('id')
            .eq('follower_id', user.id)
            .eq('following_id', userId)
            .maybeSingle();

        if (error) throw error;
        return !!data;
    },

}