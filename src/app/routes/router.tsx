// src/app/routes/router.tsx
import React, { Suspense, lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { PublicLayout, AuthenticatedLayout,AdaptiveLayout } from '@/app/layouts';
import { RequireAuth } from '@/shared/guards/RequireAuth';
import { RedirectIfAuthenticated } from '@/shared/guards/RedirectIfAuthenticated';
import { RouteErrorBoundary } from './ErrorBoundary';
import { NotFound } from './NotFound';
import { RouteLoader } from '@/shared/ui/RouteLoader';
import { ROUTES } from '@/shared/constants/routes';

// Lazy-loaded pages
const FeedPage = lazy(() => import('@/pages/FeedPage'));
const ProfilePage = lazy(() => import('@/pages/ProfilePage'));
const AuthPage = lazy(() => import('@/pages/AuthPage'));
const SearchComingSoon = lazy(() => import('@/pages/SearchComingSoon'));
const MessagesComingSoon = lazy(() => import('@/pages/MessagesComingSoon'));

/**
 * Wrapper for consistent Suspense fallback across all routes
 */
const withSuspense = (Component: React.LazyExoticComponent<() => React.JSX.Element>) => (
  <Suspense fallback={<RouteLoader />}>
    <Component />
  </Suspense>
);

export const router = createBrowserRouter([
  // ============================================
  // AUTHENTICATED ROUTES (Protected by layout)
  // ============================================
  {
    path: ROUTES.HOME,
    element: (
      <RequireAuth to={ROUTES.LOGIN}>
        <AuthenticatedLayout />
      </RequireAuth>
    ),
    errorElement: <RouteErrorBoundary />,
    children: [
      {
        index: true,
        element: withSuspense(FeedPage),
      },
      {
        path: 'search',
        element: withSuspense(SearchComingSoon),
      },
      {
        path: 'messages',
        element: withSuspense(MessagesComingSoon),
      },
    ],
  },

  // ============================================
  // PUBLIC ROUTES (Guest-accessible)
  // ============================================
  {
    element: <PublicLayout />,
    errorElement: <RouteErrorBoundary />,
    children: [
      {
        path: ROUTES.LOGIN,
        element: (
          <RedirectIfAuthenticated to={ROUTES.HOME}>
            {withSuspense(AuthPage)}
          </RedirectIfAuthenticated>
        ),
      },
    ],
  },

  // ============================================
  // ADAPTIVE ROUTES (Accessible to both auth and unauth)
  // Layout adapts based on authentication state
  // ============================================
  {
    element: <AdaptiveLayout />,
    errorElement: <RouteErrorBoundary />,
    children: [
      {
        path: 'profile/:id',
        element: withSuspense(ProfilePage),
      },
    ],
  },

  // ============================================
  // FALLBACK
  // ============================================
  {
    path: '*',
    element: <NotFound />,
  },
]);