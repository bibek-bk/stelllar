import React from 'react';

interface ComingSoonProps {
  title: string;
  description?: string;
  icon?: React.ComponentType<{ className?: string; size?: number }>;
}

export function ComingSoon({ title, description, icon: Icon }: ComingSoonProps) {
  return (
    <div className="w-full h-full flex items-center justify-center p-6">
      <div className="text-center max-w-md">
        {Icon ? (
          <Icon className="mx-auto mb-4 text-red-500" size={40} />
        ) : null}
        <h2 className="text-xl font-semibold text-[var(--color-foreground)] mb-2">{title}</h2>
        {description ? (
          <p className="text-sm text-[var(--color-muted-foreground)]">{description}</p>
        ) : null}
      </div>
    </div>
  );
}


