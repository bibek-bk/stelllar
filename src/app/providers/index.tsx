import { ReduxProvider } from './ReduxProvider';
import { QueryProvider } from './QueryProvider';
import { AuthProvider } from './AuthProvider';
import { ToastProvider } from '@/shared/ui/ToastProvider';

interface AppProvidersProps {
  children: React.ReactNode;
}

export function AppProviders({ children }: AppProvidersProps) {
  return (
    <ReduxProvider>
      <QueryProvider>
        <ToastProvider>
          <AuthProvider>
            {children}
          </AuthProvider>
        </ToastProvider>
      </QueryProvider>
    </ReduxProvider>
  );
}