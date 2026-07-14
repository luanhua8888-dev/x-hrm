import { Outlet } from 'react-router-dom';
import { Component as InfiniteGridBackground } from '@/components/ui/TheInfiniteGrid';

export default function AuthLayout() {
  return (
    <InfiniteGridBackground>
      <div className="w-full">
        {/* Login Area */}
        <div className="w-full">
          <Outlet />
        </div>
      </div>
    </InfiniteGridBackground>
  );
}
