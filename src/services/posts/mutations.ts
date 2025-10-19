import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postsApi, type CreatePostPayload, type DbPostRow } from '@/api/posts.api';
import { supabase } from '@/shared/config/supabaseClient';
import { postKeys } from './keys';
import { useToast } from '@/shared/hooks/useToast';
import { profileKeys } from '@/services/profiles/keys';
import type { User } from '@/entities/user/types';

export const useUploadImage = () => {
  const { success, error } = useToast();

  return useMutation({
    mutationFn: ({ file, userId }: { file: File; userId: string }) =>
      postsApi.uploadImage(file, userId),
    onError: (err) => {
      error('Failed to upload image', err instanceof Error ? err.message : 'Please try again with a different image.');
    },
  });
};

export const useCreatePost = () => {
  const queryClient = useQueryClient();
  const { success, error } = useToast();

  return useMutation({
    mutationFn: (payload: CreatePostPayload) => postsApi.createPost(payload),
    onMutate: async (payload: CreatePostPayload) => {
      // Cancel any outgoing refetches for user posts and profile
      await queryClient.cancelQueries({ queryKey: ['userPosts', payload.user_id] });
      await queryClient.cancelQueries({ queryKey: profileKeys.detail(payload.user_id) });

      // Snapshot the previous values
      // const previousUserPosts = queryClient.getQueryData<DbPostRow[]>(['userPosts', payload.user_id]);
      // const previousProfile = queryClient.getQueryData<User>(profileKeys.detail(payload.user_id));

      // Create optimistic post with temporary data

      // const optimisticPost: DbPostRow = {
      //   id: `temp-${Date.now()}`, // Temporary ID
      //   user_id: payload.user_id,
      //   caption: payload.caption,
      //   image_url: payload.image_url,
      //   created_at: new Date().toISOString(),
      //   updated_at: new Date().toISOString(),
      //   like_count: 0,
      //   isLiked: false,
      //   profiles: {
      //     id: payload.user_id,
      //     username: '', // Will be filled if we have profile data
      //     avatar_url: null,
      //   }
      // };

      // Try to get current user profile data for better optimistic update
      // if (previousProfile) {
      //   optimisticPost.profiles = {
      //     id: payload.user_id,
      //     username: previousProfile.username || '',
      //     avatar_url: previousProfile.avatar_url || null,
      //   };
      // }

      // Optimistically update user posts query
      // queryClient.setQueryData<DbPostRow[]>(['userPosts', payload.user_id], (old = []) => [optimisticPost, ...old]);

      // // Optimistically update profile posts count
      // if (previousProfile) {
      //   queryClient.setQueryData<User>(profileKeys.detail(payload.user_id), {
      //     ...previousProfile,
      //     posts_count: previousProfile.posts_count + 1,
      //   });
      // }

      // Return a context object with the snapshotted values
      // return { previousUserPosts, previousProfile };
    },
    onError: (err, payload, context) => {

      // If the mutation fails, use the context returned from onMutate to roll back


      // if (context?.previousUserPosts) {
      //   queryClient.setQueryData(['userPosts', payload.user_id], context.previousUserPosts);
      // }
      // if (context?.previousProfile) {
      //   queryClient.setQueryData(profileKeys.detail(payload.user_id), context.previousProfile);
      // }


      error('Failed to create post', err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    },

    onSuccess: (newPost) => {
      //This commented code is to replace the old or optimistic data with new data until the re-fetch due invalidation 

      // Replace old post with new post data in user posts
      // queryClient.setQueryData<DbPostRow[]>(['userPosts', newPost.user_id], (old = []) =>
      //   old.map(post => post.id === `temp-${Date.now()}` ? newPost : post)
      // );

      // Update profile posts count with real data
      // const currentProfile = queryClient.getQueryData<User>(profileKeys.detail(newPost.user_id));
      // if (currentProfile) {
      //   queryClient.setQueryData<User>(profileKeys.detail(newPost.user_id), {
      //     ...currentProfile,
      //     posts_count: currentProfile.posts_count, // Keep the incremented count
      //   });
      // }

      
      // Invalidate queries to ensure we have the latest data
      queryClient.invalidateQueries({ queryKey: ['userPosts', newPost.user_id] });
      queryClient.invalidateQueries({ queryKey: profileKeys.detail(newPost.user_id) });

      success('Post created successfully!', 'Your post has been shared.');
    },
  });
};

export const useDeleteImage = () => {
  return useMutation({
    mutationFn: (imageUrl: string) => postsApi.deleteImage(imageUrl),
  });
};

;

