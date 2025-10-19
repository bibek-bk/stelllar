// src/app/layout/AdaptiveProfileLayout.tsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import { useAuth } from '@/shared/hooks/useAuth';
import { Sidebar } from '@/widgets/navigation/ui/Sidebar';
import { NavBar } from '@/widgets/navigation/ui/NavBar';

/**
 * Layout that adapts based on authentication state:
 * - Authenticated users: Shows sidebar and navbar (like AuthenticatedLayout)
 * - Unauthenticated users: Shows only content (like PublicLayout)
 */
export function AdaptiveLayout(): React.JSX.Element {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    // Authenticated: Show full layout with sidebar
    return (
      <div className="h-screen overflow-hidden w-full bg-black">
        <div className="flex w-full">
          <Sidebar />
          <div className="flex flex-col w-full justify-start py-8 pb-20 lg:pb-8 h-screen overflow-y-auto">
            <Outlet />
          </div>
          <NavBar />
        </div>
      </div>
    );
  }

  // Unauthenticated: Show only content (no sidebar/navbar)
  return (
    <div className="min-h-screen w-full bg-black">
      <Outlet />
    </div>
  );
}