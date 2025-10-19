import { useState } from 'react';
import { useCreatePost, useDeleteImage, useUploadImage } from '@/services/posts/mutations';
import { supabase } from '@/shared/config/supabaseClient';

type UploadStage = 'uploading' | 'creating' | 'complete';

export interface UploadProgress {
  progress: number;
  stage: UploadStage;
}

export const useCreatePostFlow = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [caption, setCaption] = useState('');
  const [uploadProgress, setUploadProgress] = useState<UploadProgress>({ progress: 0, stage: 'uploading' });
  const [error, setError] = useState<string | null>(null);

  const uploadImageMutation = useUploadImage();
  const createPostMutation = useCreatePost();
  const deleteImageMutation = useDeleteImage();

  const getCurrentUser = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('User not authenticated');
    return user;
  };

  const handleImageSelect = (file: File) => {
    setSelectedImage(file);
    setError(null);
    const url = URL.createObjectURL(file);
    setImagePreview(url);
  };

  const handleImageRemove = () => {
    if (imagePreview) URL.revokeObjectURL(imagePreview);
    setSelectedImage(null);
    setImagePreview('');
    setError(null);
  };

  const validateForm = (): boolean => {
    if (!selectedImage) {
      setError('Please select an image');
      return false;
    }
    if (caption.length > 2200) {
      setError('Caption is too long (max 2200 characters)');
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setError(null);
    let uploadedImageUrl: string | null = null;

    try {
      const user = await getCurrentUser();

      setUploadProgress({ progress: 0, stage: 'uploading' });
      uploadedImageUrl = await uploadImageMutation.mutateAsync({ file: selectedImage!, userId: user.id });
      setUploadProgress({ progress: 60, stage: 'uploading' });

      setUploadProgress({ progress: 80, stage: 'creating' });
      await createPostMutation.mutateAsync({ user_id: user.id, caption: caption.trim(), image_url: uploadedImageUrl });

      setUploadProgress({ progress: 100, stage: 'complete' });
      return true;
    } catch (err) {
      
      if (uploadedImageUrl) {
        await deleteImageMutation.mutateAsync(uploadedImageUrl);
      }
      setError(err instanceof Error ? err.message : 'Failed to create post');
      setUploadProgress({ progress: 0, stage: 'uploading' });
      return false;
    }
  };

  const resetForm = () => {
    handleImageRemove();
    setCaption('');
    setUploadProgress({ progress: 0, stage: 'uploading' });
    setError(null);
  };

  const isPending = uploadImageMutation.isPending || createPostMutation.isPending;
  const isSuccess = createPostMutation.isSuccess;

  return {
    selectedImage,
    imagePreview,
    caption,
    uploadProgress,
    error,
    isPending,
    isSuccess,
    setCaption,
    handleImageSelect,
    handleImageRemove,
    handleSubmit,
    resetForm,
    canSubmit: !!selectedImage && !isPending,
  };
};


