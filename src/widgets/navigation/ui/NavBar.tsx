import { Home, Search, PlusSquare, MessageCircle, User } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '@/shared/hooks/useAuth';
import { CreatePostModal } from '@/features/create-post';

export function NavBar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { userId } = useAuth();
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  const items = [
    { id: 'home', icon: Home, label: 'Home', onClick: () => navigate('/') },
    { id: 'search', icon: Search, label: 'Search', onClick: () => navigate('/search') },
    { id: 'post', icon: PlusSquare, label: 'Post', onClick: () => setIsCreateOpen(true) },
    { id: 'messages', icon: MessageCircle, label: 'Messages', onClick: () => navigate('/messages') },
    { id: 'profile', icon: User, label: 'Profile', onClick: () => { if (userId) navigate(`/profile/${userId}`); } },
  ] as const;

  const isSearchActive = location.pathname === '/search';
  const isMessagesActive = location.pathname === '/messages';
  const isHomeActive = location.pathname === '/';
  const isProfileActive = location.pathname === `/profile/${userId}`;

  return (
    <nav className="fixed bottom-0 left-0 right-0 lg:hidden bg-[var(--color-background)] border-t border-[var(--color-border)] px-2 py-2 sm:px-4 z-50">
      <div className="max-w-screen-xl mx-auto">
        <ul className="flex items-center justify-around">
          {items.map((item) => {
            const Icon = item.icon;
            const isActive =
              (item.id === 'home' && isHomeActive) ||
              (item.id === 'search' && isSearchActive) ||
              (item.id === 'messages' && isMessagesActive) ||
              (item.id === 'profile' && isProfileActive);
            return (
              <li key={item.id}>
                <button
                  type="button"
                  onClick={item.onClick}
                  className={`flex flex-col items-center justify-center p-2 rounded-lg transition-all duration-200 active:scale-95 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none ${isActive ? 'bg-[var(--color-muted)]' : 'hover:bg-[var(--color-muted)]'}`}
                  aria-label={item.label}
                  aria-current={isActive ? 'page' : undefined}
                >
                  <Icon
                    className={isActive ? 'text-red-500' : 'text-[var(--color-muted-foreground)]'}
                    size={26}
                    strokeWidth={2}
                    aria-hidden="true"
                  />
                </button>
              </li>
            );
          })}
        </ul>
      </div>
      <CreatePostModal isOpen={isCreateOpen} onClose={() => setIsCreateOpen(false)} />
    </nav>
  );
}

