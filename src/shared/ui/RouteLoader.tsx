
import React from 'react';

/**
 * Unified loading state for all route transitions
 * Replaces inconsistent loading fallbacks
 */
export function RouteLoader(): React.JSX.Element {
  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 border-4 border-white/20 border-t-white rounded-full animate-spin" />
        <span className="text-white/60 text-sm">Loading...</span>
      </div>
    </div>
  );
}