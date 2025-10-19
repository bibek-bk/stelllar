import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/shared/hooks/useAuth';

interface RequireAuthProps {
  children: React.ReactNode;
  loadingFallback?: React.ReactNode;
  to?: string; // redirect path when not authenticated
}

export function RequireAuth({ children, loadingFallback , to = '/login' }: RequireAuthProps) {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) return <>{loadingFallback}</>;
  if (!isAuthenticated) return <Navigate to={to} replace />;

  return <>{children}</>;
}


