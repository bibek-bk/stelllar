import { signOut } from '@/services/auth';
import { useToast } from '@/shared/hooks/useToast';
import { LogOut } from 'lucide-react';
import React, { useCallback, useState } from 'react'
import { useNavigate } from 'react-router-dom';

interface SettingModalProps {
  onClose: () => void;
}

const SettingModal: React.FC<SettingModalProps> = ({ onClose }) => {
  const [isSigningOut, setIsSigningOut] = useState(false);
  const { error: showError } = useToast();
  const navigate = useNavigate();

  const handleSignOut = useCallback(async () => {
    if (isSigningOut) return;
    try {
      setIsSigningOut(true);
      await signOut();
      navigate('/login');
    } catch (err) {
      const description = err instanceof Error ? err.message : 'Unexpected error occurred';
      showError('Failed to sign out', description);
    } finally {
      setIsSigningOut(false);
    }
  }, [navigate, isSigningOut, showError]);

  return (
    <div
      className=" lg:hidden fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="settings-title"
    >
      <div
        className="bg-gray-900 rounded-2xl shadow-2xl w-full max-w-md mx-4 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-800">
          <h2 id="settings-title" className="text-xl font-semibold text-white">Settings</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-800 rounded-full transition-colors focus:ring-2 focus:ring-blue-500 focus:outline-none"
            aria-label="Close modal"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              className="text-gray-400"
              aria-hidden="true"
            >
              <path
                d="M15 5L5 15M5 5L15 15"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6">
          <button
            onClick={handleSignOut}
            disabled={isSigningOut}
            className="w-full flex items-center space-x-4 px-4 py-3 rounded-xl border border-[var(--color-border)] bg-transparent hover:bg-gray-100 dark:hover:bg-gray-900 hover:border-[var(--color-border-strong)] transition-all duration-200 group cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed focus:ring-2 focus:ring-blue-500 focus:outline-none"
            aria-label={isSigningOut ? 'Signing out' : 'Sign out'}
            aria-busy={isSigningOut}
          >
            <LogOut className="w-6 h-6 text-[var(--color-muted-foreground)] group-hover:text-red-500 transition-colors duration-200" aria-hidden="true" />
            <span className="text-[var(--color-muted-foreground)] group-hover:text-red-500 font-medium transition-colors duration-200">
              {isSigningOut ? 'Signing out…' : 'Sign Out'}
            </span>
            {isSigningOut && <span className="sr-only">Signing out, please wait</span>}
          </button>
        </div>
      </div>
    </div>
  )
}

export default SettingModal