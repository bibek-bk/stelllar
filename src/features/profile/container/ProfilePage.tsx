import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import ProfileHeader from '../ui/ProfileHeader';
import Bio from '../ui/Bio';
// import StoriesRow from './StoriesRow';
import PostsReelsToggle from '../ui/PostsReelsToggle';
import ReelsPlaceholder from '../ui/ReelsPlaceholder';
import { useAuth } from '@/shared/hooks/useAuth';
import UpdateProfile from '../ui/UpdateProfile';
import { useGetUserPosts, useProfileQuery } from '@/services/profiles/queries';
import PostsGrid from '../ui/PostsGrid';
import SettingModal from '../ui/SettingModal';

interface User {
  avatar_url: string;
  avatarAlt: string;
  name: string;
  bio: string;
  posts: number;
  followers: number;
  following: number;
  isFollowing: boolean;
}

interface ProfilePageProps {
  user?: User;
  onFollow?: (user: User) => void;
  className?: string;
}

const ProfilePage: React.FC<ProfilePageProps> = ({
  user = {
    avatar_url: '/placeholder-user.jpg',
    avatarAlt: 'Profile avatar',
    name: '',
    bio: 'Bio',
    posts: 0,

  },
  className = ''
}) => {
  const [activeTab, setActiveTab] = useState<'posts' | 'reels'>('posts');
  const { id: profileId } = useParams<{ id: string }>();
  const { userId } = useAuth();
  const { data: profile, isLoading:isProfileLoading } = useProfileQuery(profileId ?? userId ?? '');
  const [isSettingModalOpen, setIsSettingModalOpen] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false)

  const { data: userPosts, isLoading: isGetUserPostLoading } = useGetUserPosts(profileId ?? userId ?? '')

console.log(profileId,profile,'from profile page')
  const isOwnProfile = profileId === userId;


  const handleEditProfile = () => {
    setShowEditModal(true)
  };

  const handleTabChange = (tab: 'posts' | 'reels') => {
    setActiveTab(tab);
  };

  return (
    <div className={`min-h-screen bg-[var(--color-background)] ${className}`}>
      {/* Main Container */}
      <div className="max-w-full sm:max-w-[680px] mx-auto">
        {/* Profile Header - starts 20px from top on mobile, 32px on tablet/desktop */}
        {showEditModal && <UpdateProfile onClose={() => setShowEditModal(false)} />}
          {isSettingModalOpen && <SettingModal onClose={()=> setIsSettingModalOpen(false)}/>}
        <div className="pt-5 sm:pt-8">
          <ProfileHeader
            avatarSrc={profile?.avatar_url || user.avatar_url}
            avatarAlt={user.avatarAlt}
            posts={profile?.posts_count || 0}
            followers={profile?.followers_count || 0}
            following={profile?.following_count || 0}
            onEditProfile={handleEditProfile}
            isOwnProfile={isOwnProfile}
            isLoading={isProfileLoading}
            userId={profileId || ''}
            onClick={() => setIsSettingModalOpen(true)}
          />
        </div>

        {/* Bio Section */}
        <div className="mt-3">
          <Bio
            name={profile?.username || user.name}
            bio={profile?.bio || user.bio}
            isLoading={isProfileLoading}
          />
        </div>

        {/* Stories Row */}
        {/* <div className="mt-6">
          <StoriesRow />
        </div> */}

        {/* Divider */}
        <div className="mt-3 border-t border-[var(--color-border)] mx-4 sm:mx-6"></div>

        {/* Posts/Reels Toggle Bar */}
        <PostsReelsToggle
          activeTab={activeTab}
          onTabChange={handleTabChange}
        />

        {/* Content based on active tab */}
        {activeTab === 'posts' ?
          <PostsGrid
            posts={userPosts || null}
            isLoading={isGetUserPostLoading}
          /> : <ReelsPlaceholder />}
      </div>
    </div>
  );
};

export default ProfilePage;
