import React from 'react';
import { Search } from 'lucide-react';
import { ComingSoon } from '@/shared/ui/ComingSoon';

export default function SearchComingSoon(): React.JSX.Element {
  return (
    <ComingSoon
      title="Search is coming soon"
      description="Powerful search is on the way. Check back soon!"
      icon={Search}
    />
  );
}


