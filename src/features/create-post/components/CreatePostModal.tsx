import React, { useRef, useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, Image as ImageIcon, Loader2, Check } from 'lucide-react';
import { useCreatePostFlow } from '@/features/create-post/hooks/useCreatePostFlow';
import { Button } from '@/design-system/components/Button/Button';

interface CreatePostModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ImagePreview: React.FC<{ preview: string; onRemove: () => void }> = ({ preview, onRemove }) => {
  return (
    <div className="relative w-full aspect-square rounded-xl overflow-hidden bg-[var(--color-background-secondary)]">
      <img src={preview} alt="Preview" className="w-full h-full object-cover" />
      <button
        onClick={onRemove}
        className="absolute top-2 right-2 p-1.5 bg-black/60 hover:bg-black/80 rounded-full text-white transition-colors focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none"
        type="button"
        aria-label="Remove image"
      >
        <X size={18} aria-hidden="true" />
      </button>
    </div>
  );
};

const ImageUploader: React.FC<{ onImageSelect: (file: File) => void; disabled?: boolean }> = ({ onImageSelect, disabled }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') setDragActive(true);
    else if (e.type === 'dragleave') setDragActive(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) onImageSelect(e.dataTransfer.files[0]);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) onImageSelect(e.target.files[0]);
  };

  return (
    <div
      className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-colors ${
        dragActive ? 'border-[var(--color-primary)] bg-[var(--color-primary)]/10' : 'border-[var(--color-border)] hover:border-[var(--color-border)]/80'
      } ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
      onClick={() => !disabled && inputRef.current?.click()}
    >
      <input ref={inputRef} type="file" accept="image/*" onChange={handleChange} className="hidden" disabled={disabled} id="image-upload" aria-label="Upload image" />
      <ImageIcon className="mx-auto mb-4 text-[var(--color-text-secondary)]" size={48} aria-hidden="true" />
      <p className="text-[var(--color-text-primary)] font-medium mb-1">Drag and drop your photo here</p>
      <p className="text-sm text-[var(--color-text-secondary)]">or click to browse</p>
    </div>
  );
};

const ProgressBar: React.FC<{ progress: number; stage: 'uploading' | 'creating' | 'complete' }> = ({ progress, stage }) => {
  const stageText = { uploading: 'Uploading image...', creating: 'Creating post...', complete: 'Complete!' };
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-sm">
        <span className="text-[var(--color-text-secondary)]">{stageText[stage]}</span>
        <span className="text-[var(--color-text-secondary)] font-medium">{progress}%</span>
      </div>
      <div className="w-full bg-[var(--color-background-secondary)] rounded-full h-2 overflow-hidden">
        <div className="bg-[var(--color-primary)] h-full transition-all duration-300 ease-out" style={{ width: `${progress}%` }} />
      </div>
    </div>
  );
};

export const CreatePostModal: React.FC<CreatePostModalProps> = ({ isOpen, onClose }) => {
  const {
    selectedImage,
    imagePreview,
    caption,
    uploadProgress,
    error,
    isPending,
    isSuccess,
    canSubmit,
    setCaption,
    handleImageSelect,
    handleImageRemove,
    handleSubmit,
    resetForm,
  } = useCreatePostFlow();

  // Focus management for accessibility
  useEffect(() => {
    if (isOpen) {
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden';
      
      // Focus the modal container
      const modalElement = document.querySelector('[role="dialog"]') as HTMLElement;
      if (modalElement) {
        modalElement.focus();
      }
    } else {
      // Restore body scroll when modal is closed
      document.body.style.overflow = 'unset';
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await handleSubmit();
    if (success) {
      setTimeout(() => {
        handleClose();
      }, 1000);
    }
  };

  const handleClose = () => {
    if (isPending) return;
    resetForm();
    onClose();
  };

  // Handle keyboard events
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape' && !isPending) {
      handleClose();
    }
  };

  if (!isOpen) return null;

  const modalContent = (
    <div 
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      onKeyDown={handleKeyDown}
      tabIndex={-1}
    >
      <div className="absolute inset-0 z-[9998] bg-black/80" onClick={handleClose} />
      <div className="relative z-[9999] bg-[var(--color-background-secondary)] rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col border border-[var(--color-border)]">
        <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--color-border)]">
          <h2 id="modal-title" className="text-xl font-semibold text-[var(--color-text-primary)]">Create new post</h2>
          {!isPending && (
            <button onClick={handleClose} className="p-1 hover:bg-[var(--color-background)] rounded-full transition-colors focus:ring-2 focus:ring-blue-500 focus:outline-none" aria-label="Close modal">
              <X size={24} className="text-[var(--color-text-secondary)]" aria-hidden="true" />
            </button>
          )}
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          <form onSubmit={onSubmit} className="space-y-6">
            {!selectedImage ? (
              <ImageUploader onImageSelect={handleImageSelect} disabled={isPending} />
            ) : (
              <ImagePreview preview={imagePreview} onRemove={handleImageRemove} />
            )}

            {selectedImage && (
              <div>
                <label htmlFor="caption" className="block text-sm font-medium text-[var(--color-text-primary)] mb-2">Caption</label>
                <textarea
                  id="caption"
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                  placeholder="Write a caption..."
                  className="w-full px-4 py-3 border border-[var(--color-border)] rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none bg-[var(--color-background)] text-[var(--color-text-primary)] placeholder-[var(--color-text-secondary)]"
                  rows={4}
                  maxLength={2200}
                  disabled={isPending}
                  aria-describedby="caption-counter"
                />
                <div id="caption-counter" className="text-right text-sm text-[var(--color-text-secondary)] mt-1" aria-live="polite">{caption.length}/2200</div>
              </div>
            )}

            {isPending && (
              <div role="status" aria-live="polite" aria-busy="true">
                <ProgressBar progress={uploadProgress.progress} stage={uploadProgress.stage} />
                <span className="sr-only">Uploading post, {uploadProgress.progress}% complete</span>
              </div>
            )}

            {isSuccess && (
              <div className="flex items-center gap-2 p-4 bg-green-500/10 text-green-400 rounded-xl border border-green-500/20" role="status" aria-live="polite">
                <Check size={20} aria-hidden="true" />
                <span className="font-medium">Post created successfully!</span>
              </div>
            )}

            {error && (
              <div className="p-4 bg-red-500/10 text-red-400 rounded-xl border border-red-500/20" role="alert">
                <p className="font-medium">Failed to create post</p>
                <p className="text-sm mt-1">{error}</p>
              </div>
            )}

            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                onClick={handleClose}
                disabled={isPending}
                variant="secondary"
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={!canSubmit || isPending}
                variant="primary"
                className="flex-1 flex items-center justify-center gap-2 disabled:cursor-not-allowed"
                aria-busy={isPending}
              >
                {isPending ? (
                  <>
                    <Loader2 className="animate-spin" size={20} aria-hidden="true" />
                    <span>Creating...</span>
                    <span className="sr-only">Creating post, please wait</span>
                  </>
                ) : (
                  'Share'
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
};

export default CreatePostModal;


