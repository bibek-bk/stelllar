import { supabase } from '@/shared/config/supabaseClient';

export async function signOut(): Promise<void> {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}

// Optional helper if we ever need programmatic OAuth sign-in without the UI component
export async function signInWithOAuth(provider: 'google' | 'apple', options?: { redirectTo?: string }) {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: options?.redirectTo,
    },
  });
  if (error) throw error;
  return data;
}


