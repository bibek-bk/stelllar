// src/services/queryClient.ts
import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: import.meta.env.DEV ? 0 : 1,
      refetchOnWindowFocus: false,
      refetchOnMount: import.meta.env.DEV ? false : 'always',
      refetchOnReconnect: import.meta.env.DEV ? false : true,
    },
  },
});