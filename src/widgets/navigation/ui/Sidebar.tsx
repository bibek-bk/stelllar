import React, { useCallback, useMemo, useState } from 'react';
import { Home, Search, MessageCircle, User, LogOut, PlusSquare } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/shared/hooks/useAuth';
import { signOut } from '@/services/auth';
import { CreatePostModal } from '@/features/create-post';
import { useToast } from '@/shared/hooks/useToast';

export function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { userId } = useAuth();
  const [isSigningOut, setIsSigningOut] = useState(false);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const { error: showError } = useToast();

  const menuItems = useMemo(() => ([
    { icon: Home, label: 'Home', id: 'home', onClick: () => navigate('/') },
    { icon: Search, label: 'Search', id: 'search', onClick: () => navigate('/search') },
    { icon: MessageCircle, label: 'Messages', id: 'messages', onClick: () => navigate('/messages') },
    { icon: PlusSquare, label: 'Create', id: 'create', onClick: () => setIsCreateOpen(true) },
    { icon: User, label: 'Profile', id: 'profile', onClick: () => { if (userId) navigate(`/profile/${userId}`); } },
  ]), [navigate, userId]);

  const isActive = (itemId: string) => {
    switch (itemId) {
      case 'home':
        return location.pathname === '/';
      case 'search':
        return location.pathname === '/search';
      case 'messages':
        return location.pathname === '/messages';
      case 'profile':
        return location.pathname === `/profile/${userId}`;
      default:
        return false;
    }
  };

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
    <aside className="w-80 bg-[var(--color-background)] border-r border-[var(--color-border)] flex-col p-6 sticky top-0 h-screen hidden lg:flex" aria-label="Main navigation">
      {/* App Name */}
      <header className="mb-8">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
          stelllar
        </h1>
      </header>

      {/* Menu Items */}
      <nav className="space-y-2 flex-1" aria-label="Primary navigation">
        {menuItems.map((item) => {
          const active = isActive(item.id);
          return (
            <button
              key={item.id}
              onClick={item.onClick}
              aria-label={item.label}
              aria-current={active ? 'page' : undefined}
              className={`w-full flex items-center space-x-4 px-4 py-3 rounded-xl transition-all duration-200 group cursor-pointer focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none ${
                active 
                  ? 'bg-gray-100 dark:bg-gray-900' 
                  : 'bg-transparent hover:bg-gray-100 dark:hover:bg-gray-900'
              }`}
            >
              <item.icon className={`w-6 h-6 transition-colors duration-200 ${
                active 
                  ? 'text-red-500' 
                  : 'text-[var(--color-muted-foreground)] group-hover:text-red-500'
              }`} aria-hidden="true" />
              <span className={`font-medium transition-colors duration-200 ${
                active 
                  ? 'text-red-500' 
                  : 'text-[var(--color-muted-foreground)] group-hover:text-red-500'
              }`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </nav>

      {/* Sign Out Button */}
      <div className="mt-auto mb-4">
        <button
          onClick={handleSignOut}
          disabled={isSigningOut}
          aria-label={isSigningOut ? 'Signing out' : 'Sign out'}
          aria-busy={isSigningOut}
          className="w-full flex items-center space-x-4 px-4 py-3 rounded-xl border border-[var(--color-border)] bg-transparent hover:bg-gray-100 dark:hover:bg-gray-900 hover:border-[var(--color-border-strong)] transition-all duration-200 group cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed focus:ring-2 focus:ring-blue-500 focus:outline-none"
        >
          <LogOut className="w-6 h-6 text-[var(--color-muted-foreground)] group-hover:text-red-500 transition-colors duration-200" aria-hidden="true" />
          <span className="text-[var(--color-muted-foreground)] group-hover:text-red-500 font-medium transition-colors duration-200">
            {isSigningOut ? 'Signing out…' : 'Sign Out'}
          </span>
          {isSigningOut && <span className="sr-only">Signing out, please wait</span>}
        </button>
      </div>
      <CreatePostModal isOpen={isCreateOpen} onClose={() => setIsCreateOpen(false)} />
    </aside>
  );
}

