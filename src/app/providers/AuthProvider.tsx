import { useEffect } from 'react';
import { supabase } from '@/shared/config/supabaseClient';
import { useAppDispatch } from '../store';
import { setAuth, clearAuth, setLoading } from '../store/slices/authSlice';
import { queryClient } from '@/shared/config/queryClient';

interface AuthProviderProps {
  children: React.ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    // Check initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        dispatch(setAuth({ user: session.user, session }));
      } else {
        dispatch(setLoading(false));
      }
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        dispatch(setAuth({ user: session.user, session }));
      } else {
        dispatch(clearAuth());
        // Clear all cached queries on sign-out to prevent stale data display
        queryClient.clear();
      }
    });

    return () => subscription.unsubscribe();
  }, [dispatch]);

  return <>{children}</>;
}