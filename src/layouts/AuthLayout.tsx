import { Outlet } from 'react-router-dom';
import { Component as InfiniteGridBackground } from '@/components/ui/the-infinite-grid';


export default function AuthLayout() {
  return (
    <InfiniteGridBackground>
      <div className="relative z-10 w-full max-w-5xl">
        {/* Login Area */}
        <div className="w-full">
          <Outlet />
        </div>
      </div>
    </InfiniteGridBackground>
  );
}





