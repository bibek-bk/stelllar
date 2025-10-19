import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/shared/hooks/useAuth';

interface RedirectIfAuthenticatedProps {
  children: React.ReactNode;
  loadingFallback?: React.ReactNode;
  to?: string; // redirect path when authenticated
}

export function RedirectIfAuthenticated({ children, loadingFallback = null, to = '/' }: RedirectIfAuthenticatedProps) {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) return <>{loadingFallback}</>;
  if (isAuthenticated) return <Navigate to={to} replace />;

  return <>{children}</>;
}


