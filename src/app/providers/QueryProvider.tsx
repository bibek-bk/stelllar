import { QueryClientProvider } from '@tanstack/react-query';
// import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { queryClient } from '@/shared/config/queryClient';

interface QueryProviderProps {
  children: React.ReactNode;
}

export function QueryProvider({ children }: QueryProviderProps) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {/* {import.meta.env.DEV && (
        <ReactQueryDevtools initialIsOpen={false} position="bottom" />
      )} */}
    </QueryClientProvider>
    
  );
}
