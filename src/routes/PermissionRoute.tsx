import { Navigate, Outlet } from 'react-router-dom';

import { hasPermission, Permission } from '@/config/permissions';
import { useAuthStore } from '@/stores/auth.store';

interface PermissionRouteProps {
  permission: Permission;
}

export default function PermissionRoute({ permission }: PermissionRouteProps) {
  const permissions = useAuthStore((state) => state.user?.permissions);

  if (!hasPermission(permissions, permission)) {
    return <Navigate to="/access-denied" replace />;
  }

  return <Outlet />;
}
