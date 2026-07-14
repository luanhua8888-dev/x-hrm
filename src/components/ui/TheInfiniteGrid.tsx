import { type ReactNode } from 'react';

interface AuthSurfaceProps {
  children?: ReactNode;
}

export const Component = ({ children }: AuthSurfaceProps) => (
  <div className="min-h-[100dvh] w-full bg-slate-50">{children}</div>
);
