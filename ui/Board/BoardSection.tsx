// app/Board/BoardSection.tsx
'use client';

interface BoardSectionProps {
  id: string;
  activeTab: string;
  children: React.ReactNode;
  className?: string;
}

export function BoardSection({ id, activeTab, children, className = '' }: BoardSectionProps) {
  return (
    <div 
      className={`${activeTab === id ? 'block' : 'hidden'} md:block ${className}`}
      data-section={id}
    >
      {children}
    </div>
  );
}