import { useRef, useState } from 'react';
import { LogOut, Menu, PanelLeftClose, PanelLeftOpen, X } from 'lucide-react';
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import {
  filterNavigationByPermissions,
  NavigationItem,
  navigationItems,
  resolveBreadcrumb,
} from '@/config/navigation';
import { useAppStore } from '@/stores/app.store';
import { useAuthStore } from '@/stores/auth.store';
import { useLogout } from '@/queries/auth.query';
import { cn } from '@/utils/cn';

// ─── Breadcrumb bar ───────────────────────────────────────────────────────────
function PageBreadcrumb() {
  const location = useLocation();
  const segments = resolveBreadcrumb(location.pathname);
  if (segments.length === 0) return null;

  return (
    <div className="flex items-center gap-1.5 px-4 pt-5 pb-1 text-sm lg:px-6">
      {segments.map((seg, i) => (
        <span key={seg.path} className="flex items-center gap-1.5">
          {i > 0 && (
            <svg className="h-3.5 w-3.5 text-brand-secondary-text" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
          <span
            className={cn(
              'font-medium',
              i === segments.length - 1
                ? 'text-brand-primary-text'
                : 'text-brand-secondary-text',
            )}
          >
            {seg.title}
          </span>
        </span>
      ))}
    </div>
  );
}

// ─── Collapsed flyout popup (shows on hover when sidebar is collapsed) ───────
function CollapsedFlyout({
  item,
  anchorRef,
  onMouseEnter,
  onMouseLeave,
}: {
  item: NavigationItem;
  anchorRef: React.RefObject<HTMLDivElement | null>;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}) {
  const rect = anchorRef.current?.getBoundingClientRect();
  const top = rect ? rect.top : 0;

  return (
    <div
      className="fixed z-50"
      style={{ left: 80, top }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {/* Invisible bridge to prevent gap between icon and panel */}
      <div className="absolute inset-y-0 -left-2 w-2" />
      <div className="ml-1 min-w-[188px] rounded-lg border border-brand-border bg-white py-1.5 shadow-lg">
        {/* Group title */}
        <div className="px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-brand-secondary-text">
          {item.title}
        </div>
        <div className="my-1 h-px bg-brand-border" />
        {item.children?.map((child) => (
          <NavLink
            key={child.path}
            to={child.path}
            className={({ isActive }) =>
              cn(
                'block px-3 py-2 text-sm transition-colors',
                isActive
                  ? 'bg-primary-light font-medium text-primary'
                  : 'text-brand-primary-text hover:bg-brand-bg',
              )
            }
          >
            {child.title}
          </NavLink>
        ))}
      </div>
    </div>
  );
}

// ─── Collapsed tooltip (shows item name on hover for leaf items) ──────────────
function CollapsedTooltip({
  title,
  anchorRef,
}: {
  title: string;
  anchorRef: React.RefObject<HTMLDivElement | null>;
}) {
  const rect = anchorRef.current?.getBoundingClientRect();
  const top = rect ? rect.top + rect.height / 2 : 0;

  return (
    <div
      className="pointer-events-none fixed z-50 ml-2"
      style={{ left: 80, top, transform: 'translateY(-50%)' }}
    >
      <div className="rounded-md bg-brand-primary-text px-2.5 py-1 text-xs font-medium text-white shadow">
        {title}
      </div>
    </div>
  );
}

// ─── Single nav item ──────────────────────────────────────────────────────────
function NavigationLink({ item, isCollapsed }: { item: NavigationItem; isCollapsed: boolean }) {
  const location = useLocation();
  const Icon = item.icon;
  const hasChildren = !!item.children?.length;

  // Active: leaf item exact match, or any child is active (for parent groups)
  const isActive =
    location.pathname === item.path || location.pathname.startsWith(`${item.path}/`);
  const isChildActive = hasChildren
    ? !!item.children?.some(
        (c) => location.pathname === c.path || location.pathname.startsWith(`${c.path}/`),
      )
    : false;

  // Collapsible group state — open by default if a child is active
  const [isOpen, setIsOpen] = useState<boolean>(true);

  const [hovered, setHovered] = useState(false);
  const anchorRef = useRef<HTMLDivElement>(null);
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showFlyout = () => {
    if (hideTimer.current) clearTimeout(hideTimer.current);
    setHovered(true);
  };

  const hideFlyout = () => {
    hideTimer.current = setTimeout(() => setHovered(false), 120);
  };

  return (
    <div
      ref={anchorRef}
      className="relative"
      onMouseEnter={showFlyout}
      onMouseLeave={hideFlyout}
    >
      {hasChildren ? (
        /* Parent group — clickable label to toggle children */
        !isCollapsed ? (
          <button
            type="button"
            onClick={() => setIsOpen((v) => !v)}
            className={cn(
              'flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-semibold transition-colors select-none',
              isChildActive
                ? 'text-brand-primary-text'
                : 'text-brand-secondary-text hover:text-brand-primary-text',
            )}
          >
            {Icon ? (
              <Icon
                className={cn('h-4 w-4 shrink-0', isChildActive ? 'text-primary' : 'text-brand-secondary-text')}
                aria-hidden="true"
              />
            ) : null}
            <span className="flex-1 text-left">{item.title}</span>
            {/* Chevron indicator */}
            <svg
              className={cn('h-3.5 w-3.5 transition-transform text-brand-secondary-text', isOpen ? 'rotate-90' : '')}
              viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}
            >
              <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        ) : (
          /* Collapsed: icon only, highlight if any child is active */
          <div
            className={cn(
              'flex items-center justify-center rounded-md py-2 transition-colors',
              isChildActive
                ? 'bg-primary text-white'
                : hovered
                ? 'bg-brand-bg text-brand-primary-text'
                : 'text-brand-secondary-text',
            )}
          >
            {Icon ? (
              <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
            ) : null}
          </div>
        )
      ) : (
        /* Leaf item — NavLink */
        <NavLink
          to={item.path}
          className={cn(
            'flex items-center rounded-md py-2 text-sm font-medium transition-colors',
            isCollapsed ? 'justify-center' : 'gap-3 px-3',
            isActive
              ? 'bg-primary text-white'
              : 'text-brand-secondary-text hover:bg-brand-bg hover:text-brand-primary-text',
          )}
        >
          {Icon ? <Icon className="h-4 w-4 shrink-0" aria-hidden="true" /> : null}
          {!isCollapsed ? <span>{item.title}</span> : null}
        </NavLink>
      )}

      {/* Expanded: collapsible children */}
      {!isCollapsed && hasChildren && isOpen ? (
        <div className="ml-7 mt-1 space-y-1">
          {item.children!.map((child) => (
            <NavLink
              key={child.path}
              to={child.path}
              className={({ isActive: childActive }) =>
                cn(
                  'block rounded-md px-3 py-1.5 text-sm transition-colors',
                  childActive
                    ? 'bg-primary-light font-medium text-primary'
                    : 'text-brand-secondary-text hover:bg-brand-bg hover:text-brand-primary-text',
                )
              }
            >
              {child.title}
            </NavLink>
          ))}
        </div>
      ) : null}

      {/* Collapsed + hovered: flyout for groups, tooltip for leaves */}
      {isCollapsed && hovered && hasChildren && (
        <CollapsedFlyout
          item={item}
          anchorRef={anchorRef}
          onMouseEnter={showFlyout}
          onMouseLeave={hideFlyout}
        />
      )}
      {isCollapsed && hovered && !hasChildren && (
        <CollapsedTooltip title={item.title} anchorRef={anchorRef} />
      )}
    </div>
  );
}

// ─── Dashboard layout ─────────────────────────────────────────────────────────
export default function DashboardLayout() {
  const user = useAuthStore((state) => state.user);
  const isCollapsed = useAppStore((state) => state.isSidebarCollapsed);
  const isMobileOpen = useAppStore((state) => state.isMobileNavigationOpen);
  const toggleSidebar = useAppStore((state) => state.ToggleSidebar);
  const setMobileOpen = useAppStore((state) => state.SetMobileNavigationOpen);
  const items = filterNavigationByPermissions(navigationItems, user?.permissions);
  const navigate = useNavigate();
  const logout = useLogout();

  const handleLogout = () => {
    logout.mutate(undefined, {
      onSettled: () => navigate('/login', { replace: true }),
    });
  };

  const sidebar = (
    <aside
      className={cn(
        'flex h-full flex-col border-r border-brand-border bg-brand-surface',
        isCollapsed ? 'w-20' : 'w-72',
      )}
    >
      <div
        className={cn(
          'flex h-16 items-center border-b border-brand-border',
          isCollapsed ? 'justify-center px-0' : 'justify-between px-4',
        )}
      >
        {!isCollapsed ? (
          <span className="text-base font-semibold text-brand-primary-text">HRM Web</span>
        ) : null}
        <Button variant="ghost" size="icon" onClick={toggleSidebar} aria-label="Toggle sidebar">
          {isCollapsed ? (
            <PanelLeftOpen className="h-5 w-5" />
          ) : (
            <PanelLeftClose className="h-5 w-5" />
          )}
        </Button>
      </div>
      <nav className="flex-1 space-y-1 overflow-y-auto p-3">
        {items.map((item) => (
          <NavigationLink key={item.path} item={item} isCollapsed={isCollapsed} />
        ))}
      </nav>
      {/* Sidebar footer: user info + logout */}
      <div className={cn('border-t border-brand-border p-3', isCollapsed ? 'flex justify-center' : '')}>
        {!isCollapsed ? (
          <div className="flex items-center gap-3 rounded-md px-3 py-2">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-semibold text-white">
              {user?.fullName?.charAt(0) ?? 'A'}
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-brand-primary-text">{user?.fullName ?? 'Guest'}</p>
              <p className="truncate text-xs text-brand-secondary-text">{user?.email ?? ''}</p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleLogout}
              aria-label="Logout"
              className="shrink-0 text-brand-secondary-text hover:text-danger"
            >
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        ) : (
          <Button
            variant="ghost"
            size="icon"
            onClick={handleLogout}
            aria-label="Logout"
            className="text-brand-secondary-text hover:text-danger"
          >
            <LogOut className="h-4 w-4" />
          </Button>
        )}
      </div>
    </aside>
  );

  return (
    <div className="min-h-screen bg-brand-bg">
      <div className="hidden lg:fixed lg:inset-y-0 lg:left-0 lg:block">{sidebar}</div>

      {isMobileOpen ? (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-slate-950/40" onClick={() => setMobileOpen(false)} />
          <div className="absolute inset-y-0 left-0 w-80 max-w-[85vw] bg-white shadow-xl">
            <div className="flex h-16 items-center justify-between border-b border-brand-border px-4">
              <span className="text-base font-semibold text-brand-primary-text">HRM Web</span>
              <Button variant="ghost" size="icon" onClick={() => setMobileOpen(false)}>
                <X className="h-5 w-5" />
              </Button>
            </div>
            <nav className="space-y-1 p-3">
              {items.map((item) => (
                <NavigationLink key={item.path} item={item} isCollapsed={false} />
              ))}
            </nav>
          </div>
        </div>
      ) : null}

      <div
        className={cn('min-h-screen transition-[padding]', isCollapsed ? 'lg:pl-20' : 'lg:pl-72')}
      >
        {/* Mobile-only top bar for hamburger + user info */}
        <div className="flex h-14 items-center justify-between border-b border-brand-border bg-brand-surface px-4 lg:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileOpen(true)}
            aria-label="Open navigation"
          >
            <Menu className="h-5 w-5" />
          </Button>
          <div className="text-right">
            <p className="text-sm font-medium text-brand-primary-text">{user?.fullName ?? 'Guest'}</p>
          </div>
        </div>
        <PageBreadcrumb />
        <main className="mx-auto w-full max-w-7xl px-4 pb-6 lg:px-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
