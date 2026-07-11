import { type MouseEvent, type ReactNode, useRef } from 'react';

import { cn } from '@/utils/cn';

interface InfiniteGridBackgroundProps {
  children?: ReactNode;
}

export const Component = ({ children }: InfiniteGridBackgroundProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    const container = containerRef.current;
    if (!container) return;

    const bounds = container.getBoundingClientRect();
    container.style.setProperty('--pointer-x', `${event.clientX - bounds.left}px`);
    container.style.setProperty('--pointer-y', `${event.clientY - bounds.top}px`);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className={cn(
        'relative flex min-h-[100dvh] w-full flex-col items-center justify-center overflow-hidden bg-brand-bg px-4 py-4 sm:py-6',
        'animate-bg-shift',
      )}
    >
      <div className="auth-moving-grid absolute inset-0 z-0 opacity-[0.08]" />
      <div className="auth-moving-grid auth-grid-reveal absolute inset-0 z-0 opacity-[0.32]" />
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="animate-pulse-slow absolute top-1/2 left-1/2 h-[650px] w-[650px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/20 blur-[130px]" />
        <div className="animate-drift absolute -top-40 -left-40 h-[450px] w-[450px] rounded-full bg-secondary-teal/10 blur-[110px]" />
        <div className="animate-drift-reverse absolute -right-40 -bottom-40 h-[450px] w-[450px] rounded-full bg-primary/10 blur-[110px]" />
      </div>
      {children}
    </div>
  );
};
