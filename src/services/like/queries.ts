import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/shared/config/supabaseClient';
import { likeApi } from '@/api/like.api';
import { likeKeys } from './keys';

export const useHasUserLikedPost = (postId: string) => {
  return useQuery({
    queryKey: likeKeys.hasLiked(postId),
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return false;
      return likeApi.hasUserLikedPost(postId, user.id);
    },
    enabled: !!postId,
  });
};


