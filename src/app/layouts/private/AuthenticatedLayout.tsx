import React from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from '@/widgets/navigation/ui/Sidebar';
import { NavBar } from '@/widgets/navigation/ui/NavBar';

export function AuthenticatedLayout(): React.JSX.Element {
  return (
    <div className="h-screen overflow-hidden w-full bg-black">
      <div className="flex w-full">
        <Sidebar />
        <main className="flex flex-col w-full justify-start py-8 pb-20 lg:pb-8 h-screen overflow-y-auto">
          <Outlet />
        </main>
        <NavBar />
      </div>
    </div>
  );
}


