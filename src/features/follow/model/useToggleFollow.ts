import { useFollowUserMutation, useUnFollowUserMutation } from "@/services/follow/mutations"
import { useIsFollowing } from "@/services/follow/queries"

export const useToggleFollow = (userId: string) => {
    const followUser = useFollowUserMutation()
    const unFollowUser = useUnFollowUserMutation()
    const isFollowingQuery = useIsFollowing(userId)
    const isPending = followUser.isPending || unFollowUser.isPending

    const toggleFollow = async () => {
        const wasFollowing = isFollowingQuery.data as boolean;


        if (wasFollowing) {
            unFollowUser.mutate(userId);
        } else {
            followUser.mutate(userId);
        }

    }

    return {
        toggleFollow,
        isFollowing: isFollowingQuery.data || false,
        isPending: isPending,
    }
}