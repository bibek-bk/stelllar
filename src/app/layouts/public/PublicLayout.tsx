import React from 'react';
import { Outlet } from 'react-router-dom';

export function PublicLayout(): React.JSX.Element {
  return (
    <div className="min-h-screen w-full bg-black">
      <Outlet />
    </div>
  );
}


