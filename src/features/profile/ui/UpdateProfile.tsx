import React, { useState,useEffect } from 'react';
import { Camera, X } from 'lucide-react';
import { useUpdateProfile } from '@/services/profiles/mutations';
import { useAuth } from '@/shared/hooks/useAuth';
import { RouteLoader } from '@/shared/ui/RouteLoader';
import { uploadAvatar } from '@/api/profile.api';
import { Button } from '@/design-system/components';
import { cn } from '@/design-system/utils/cn';
import { useProfileQuery } from '@/services/profiles/queries';

interface UpdateProfileProps {
  onClose?: () => void;
}

const UpdateProfile: React.FC<UpdateProfileProps> = ({ onClose }) => {    const { userId } = useAuth();
    const { data: profile, isLoading: profileLoading } = useProfileQuery(userId || '');
    const { mutate: updateProfile, isPending } = useUpdateProfile();
    const [formData, setFormData] = useState({
        username: '',
        bio: '',
        avatar_url: ''
    });
    const [previewUrl, setPreviewUrl] = useState('');
    const [avatarFile, setAvatarFile] = useState<File | null>(null);

    // Update form when profile loads
    useEffect(() => {
        if (profile) {
            setFormData({
                username: profile.username || '',
                bio: profile.bio || '',
                avatar_url: profile.avatar_url || ''
            });
            setPreviewUrl(profile.avatar_url || '');
        }
    }, [profile]);

    // Store the current blob URL to clean it up when changed or unmounted
    const [currentBlobUrl, setCurrentBlobUrl] = useState<string | null>(null);

    // Cleanup blob URL on unmount or when creating a new one
    React.useEffect(() => {
        return () => {
            if (currentBlobUrl) {
                URL.revokeObjectURL(currentBlobUrl);
            }
        };
    }, [currentBlobUrl]);

    const handleAvatarChange = (e : React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            // Revoke previous blob URL if it exists
            if (currentBlobUrl) {
                URL.revokeObjectURL(currentBlobUrl);
            }
            setAvatarFile(file);
            const url = URL.createObjectURL(file);
            setCurrentBlobUrl(url);
            setPreviewUrl(url);
        }
    };
    const handleSubmit = async (e : React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        let avatarUrl = formData.avatar_url;

        // Upload avatar if new file selected
        if (avatarFile) {
            avatarUrl = await uploadAvatar(avatarFile, userId || '')

        }

        updateProfile(
            {
                username: formData.username,
                bio: formData.bio,
                avatar_url: avatarUrl
            },
            {
                onSuccess: () => {
                    onClose?.();
                }
            }
        );
    };

    if (profileLoading) {
        return (
            <RouteLoader />
        );
    }

    return (
        <div className="fixed inset-0 bg-[var(--color-overlay-dark)] flex items-center justify-center z-50 p-4" role="dialog" aria-modal="true" aria-labelledby="edit-profile-title">
            <div className="bg-[var(--color-background-secondary)] rounded-lg max-w-md w-full border border-[var(--color-border)]">
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-[var(--color-border)]">
                    <h2 id="edit-profile-title" className="text-xl font-semibold text-[var(--color-text-primary)]">Edit Profile</h2>
                    <button
                        onClick={onClose}
                        className="text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)] transition-colors focus:ring-2 focus:ring-blue-500 focus:outline-none rounded"
                        aria-label="Close edit profile dialog"
                    >
                        <X size={24} aria-hidden="true" />
                    </button>                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                    {/* Avatar Upload */}
                    <div className="flex flex-col items-center">
                        <div className="relative">
                            <img
                                src={previewUrl || '/placeholder-user.jpg'}
                                alt="Profile avatar preview"
                                className="w-24 h-24 rounded-full object-cover border border-[var(--color-border)]"
                            />
                            <label htmlFor="avatar-upload" className="absolute bottom-0 right-0 bg-[var(--color-primary)] text-[var(--color-text-inverse)] p-2 rounded-full cursor-pointer hover:brightness-110 transition-all focus-within:ring-2 focus-within:ring-blue-500">
                                <Camera size={16} aria-hidden="true" />
                                <span className="sr-only">Change profile photo</span>
                                <input
                                    id="avatar-upload"
                                    type="file"
                                    accept="image/*"
                                    onChange={handleAvatarChange}
                                    className="hidden"
                                    aria-label="Upload profile photo"
                                />
                            </label>
                        </div>
                        <p className="text-sm text-[var(--color-text-secondary)] mt-2">Click camera to change photo</p>
                    </div>

                    {/* Name Input */}
                    <div>
                        <label htmlFor="username" className="block text-sm font-medium text-[var(--color-text-primary)] mb-2">
                            Name
                        </label>
                        <input
                            id="username"
                            type="text"
                            value={formData.username}
                            onChange={(e) =>
                                setFormData({ ...formData, username: e.target.value })
                            }
                            className={cn(
                                "w-full px-3 py-2 bg-[var(--color-background)] border border-[var(--color-border)] rounded-md",
                                "text-[var(--color-text-primary)] placeholder:text-[var(--color-text-tertiary)]",
                                "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent",
                                "transition-colors"
                            )}
                            placeholder="Your name"
                            maxLength={50}
                            aria-required="true"
                        />
                    </div>

                    {/* Bio Input */}
                    <div>
                        <label htmlFor="bio" className="block text-sm font-medium text-[var(--color-text-primary)] mb-2">
                            Bio
                        </label>
                        <textarea
                            id="bio"
                            value={formData.bio}
                            onChange={(e) =>
                                setFormData({ ...formData, bio: e.target.value })
                            }
                            className={cn(
                                "w-full px-3 py-2 bg-[var(--color-background)] border border-[var(--color-border)] rounded-md",
                                "text-[var(--color-text-primary)] placeholder:text-[var(--color-text-tertiary)]",
                                "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent",
                                "transition-colors resize-none"
                            )}
                            placeholder="Tell us about yourself"
                            rows={4}
                            maxLength={150}
                            aria-describedby="bio-counter"
                        />
                        <p id="bio-counter" className="text-xs text-[var(--color-text-tertiary)] mt-1" aria-live="polite">
                            {formData.bio.length}/150 characters
                        </p>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3">
                        <Button
                            type="button"
                            onClick={onClose}
                            variant="secondary"
                            className="flex-1 disabled:cursor-not-allowed"
                            disabled={isPending}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            variant="primary"
                            className="flex-1 disabled:cursor-not-allowed"
                            disabled={isPending}
                            aria-busy={isPending}
                        >
                            {isPending ? 'Saving...' : 'Save'}
                            {isPending && <span className="sr-only">Saving profile changes</span>}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateProfile;