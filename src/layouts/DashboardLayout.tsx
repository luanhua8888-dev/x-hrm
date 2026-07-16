import { useMemo, useState, useEffect, type ReactNode } from 'react';
import type { MessageDescriptor } from '@lingui/core';
import { useLingui } from '@lingui/react';
import {
  Bell,
  ChevronRight,
  CircleHelp,
  LogOut,
  Menu,
  PanelLeftClose,
  PanelLeftOpen,
  Search,
  X,
} from 'lucide-react';
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';

import doctorAvatar from '@/assets/doctor-avatar.png';
import hospitalLogo from '@/assets/logo2-removebg-preview.png';
import { LanguageSwitcher } from '@/components/i18n/LanguageSwitcher';
import { Button } from '@/components/ui/button';
import {
  filterNavigationByPermissions,
  NavigationItem,
  navigationItems,
  resolveBreadcrumb,
} from '@/config/navigation';
import { useLogout } from '@/queries/auth.query';
import { useAppStore } from '@/stores/app.store';
import { useAuthStore } from '@/stores/auth.store';
import { cn } from '@/utils/cn';

const msg = (descriptor: { id?: string; message: string }): MessageDescriptor => ({
  id: descriptor.id ?? descriptor.message,
  message: descriptor.message,
});

function Trans({ children }: { children: ReactNode }) {
  const { i18n } = useLingui();
  const text = toText(children);
  return <>{i18n._({ id: text, message: text })}</>;
}

function toText(children: ReactNode) {
  if (typeof children === 'string' || typeof children === 'number') {
    return String(children);
  }

  if (Array.isArray(children)) {
    return children
      .map((child) => (typeof child === 'string' || typeof child === 'number' ? String(child) : ''))
      .join('');
  }

  return '';
}

const navigationMessages: Record<string, MessageDescriptor> = {
  Dashboard: msg({ message: 'Bảng điều khiển' }),
  Organization: msg({ message: 'Tổ chức' }),
  Company: msg({ message: 'Công ty' }),
  Departments: msg({ message: 'Phòng ban' }),
  Locations: msg({ message: 'Địa điểm' }),
  'Job Titles': msg({ message: 'Chức danh' }),
  Employees: msg({ message: 'Nhân viên' }),
  Users: msg({ message: 'Người dùng' }),
  Leave: msg({ message: 'Nghỉ phép' }),
  'My Leave': msg({ message: 'Nghỉ phép của tôi' }),
  Requests: msg({ message: 'Yêu cầu' }),
  Calendar: msg({ message: 'Lịch' }),
  Balances: msg({ message: 'Số dư phép' }),
  Types: msg({ message: 'Loại nghỉ phép' }),
  Entitlements: msg({ message: 'Quyền lợi' }),
  Time: msg({ message: 'Thời gian' }),
  Attendance: msg({ message: 'Chấm công' }),
  'My Records': msg({ message: 'Dữ liệu của tôi' }),
  'Employee Records': msg({ message: 'Dữ liệu nhân viên' }),
  Timesheets: msg({ message: 'Bảng công' }),
  'My Timesheet': msg({ message: 'Bảng công của tôi' }),
  'Employee Timesheets': msg({ message: 'Bảng công nhân viên' }),
  Approvals: msg({ message: 'Phê duyệt' }),
  Recruitment: msg({ message: 'Tuyển dụng' }),
  Performance: msg({ message: 'Hiệu suất' }),
  Reports: msg({ message: 'Báo cáo' }),
  Administration: msg({ message: 'Quản trị' }),
  Roles: msg({ message: 'Vai trò' }),
  Permissions: msg({ message: 'Phân quyền' }),
  'Audit Logs': msg({ message: 'Nhật ký hệ thống' }),
  Settings: msg({ message: 'Cài đặt' }),
};

function NavigationLink({ item, isCollapsed }: { item: NavigationItem; isCollapsed: boolean }) {
  const { i18n } = useLingui();
  const location = useLocation();
  const Icon = item.icon;
  const hasChildren = Boolean(item.children?.length);
  const isActive = location.pathname === item.path;
  const isChildActive = Boolean(
    item.children?.some(
      (child) => location.pathname === child.path || location.pathname.startsWith(`${child.path}/`),
    ),
  );
  const [isOpen, setIsOpen] = useState(isChildActive);
  const itemTitle = navigationMessages[item.title]
    ? i18n._(navigationMessages[item.title])
    : item.title;
  const itemTextClass = 'text-sm font-medium leading-5';

  if (isCollapsed) {
    return (
      <div className="mb-1 px-2">
        <NavLink
          to={item.path}
          title={itemTitle}
          className={cn(
            'flex h-10 w-10 items-center justify-center rounded-xl transition-all',
            isActive || isChildActive
              ? 'bg-primary/10 text-primary shadow-sm'
              : 'text-slate-400 hover:bg-slate-100 hover:text-slate-900',
          )}
        >
          {Icon ? <Icon className="h-5 w-5" aria-hidden="true" /> : null}
          <span className="sr-only">{itemTitle}</span>
        </NavLink>
      </div>
    );
  }

  return (
    <div className="mb-0.5 px-3">
      {hasChildren ? (
        <button
          type="button"
          onClick={() => setIsOpen((current) => !current)}
          className={cn(
            'flex h-9 w-full items-center gap-2.5 rounded-lg px-2 text-left transition-all',
            isChildActive ? 'bg-primary/10 text-primary' : 'text-slate-700 hover:bg-slate-100',
          )}
          aria-expanded={isOpen}
        >
          {Icon ? (
            <Icon
              className={cn(
                'h-[18px] w-[18px] shrink-0 transition-colors',
                isChildActive ? 'text-primary' : 'text-slate-400',
              )}
            />
          ) : null}
          <span className={cn('flex-1 truncate', itemTextClass)}>{itemTitle}</span>
          <ChevronRight
            className={cn(
              'h-3.5 w-3.5 shrink-0 text-slate-400 transition-transform duration-200',
              isOpen && 'rotate-90',
            )}
          />
        </button>
      ) : (
        <NavLink
          to={item.path}
          className={cn(
            'flex h-9 items-center gap-2.5 rounded-lg px-2 transition-all',
            isActive ? 'bg-primary/10 text-primary' : 'text-slate-700 hover:bg-slate-100',
          )}
        >
          {Icon ? (
            <Icon
              className={cn(
                'h-[18px] w-[18px] shrink-0 transition-colors',
                isActive ? 'text-primary' : 'text-slate-400',
              )}
            />
          ) : null}
          <span className={cn('flex-1 truncate', itemTextClass)}>{itemTitle}</span>
        </NavLink>
      )}

      {hasChildren && isOpen ? (
        <div className="relative mt-0.5 flex flex-col gap-0.5">
          <div className="absolute bottom-3 left-[17px] top-0 w-px bg-slate-200" />
          {item.children?.map((child) => (
            <NavLink
              key={child.path}
              to={child.path}
              className={({ isActive: childIsActive }) =>
                cn(
                  'relative mx-2 flex h-8 items-center rounded-md pl-9 pr-2 transition-all',
                  childIsActive
                    ? 'bg-primary/10 text-primary'
                    : 'text-slate-500 hover:bg-slate-100 hover:text-slate-900',
                )
              }
            >
              {({ isActive: childIsActive }) => (
                <>
                  <div
                    className={cn(
                      'absolute left-[7px] top-1/2 h-[5px] w-[5px] -translate-y-1/2 rounded-full transition-colors',
                      childIsActive ? 'bg-primary' : 'bg-slate-300',
                    )}
                  />
                  <span className={cn('truncate', itemTextClass)}>
                    {navigationMessages[child.title]
                      ? i18n._(navigationMessages[child.title])
                      : child.title}
                  </span>
                </>
              )}
            </NavLink>
          ))}
        </div>
      ) : null}
    </div>
  );
}

function CommandPalette({
  isOpen,
  onClose,
  links,
}: {
  isOpen: boolean;
  onClose: () => void;
  links: { title: string; path: string; icon?: React.ElementType }[];
}) {
  const { i18n } = useLingui();
  const navigate = useNavigate();
  const [query, setQuery] = useState('');

  if (!isOpen && query !== '') {
    setQuery('');
  }

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filtered = query.trim()
    ? links.filter((link) => {
        const q = query.toLowerCase();
        const localized = navigationMessages[link.title]
          ? i18n._(navigationMessages[link.title]).toLowerCase()
          : link.title.toLowerCase();
        return localized.includes(q) || link.title.toLowerCase().includes(q);
      })
    : [];

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[20vh] sm:pt-[25vh]">
      <div
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      <div className="relative w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 ring-slate-200 animate-in fade-in zoom-in-95 mx-4">
        <div className="flex items-center border-b border-slate-100 px-3">
          <Search className="h-5 w-5 text-slate-400" />
          <input
            autoFocus
            type="text"
            className="flex-1 bg-transparent px-4 py-4 text-[15px] outline-none placeholder:text-slate-400"
            placeholder={i18n._(msg({ message: 'Tìm kiếm menu, chức năng...' }))}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <kbd className="hidden rounded border border-slate-200 bg-slate-50 px-2 py-0.5 text-[10px] font-medium text-slate-400 sm:block">
            ESC
          </kbd>
        </div>
        {query.trim() && (
          <div className="max-h-[60vh] overflow-y-auto p-2">
            {filtered.length === 0 ? (
              <div className="py-14 text-center text-sm text-slate-500">
                <Trans>Không tìm thấy kết quả nào.</Trans>
              </div>
            ) : (
              filtered.map((link) => {
                const Icon = link.icon;
                return (
                  <button
                    key={link.path}
                    type="button"
                    onClick={() => {
                      void navigate(link.path);
                      onClose();
                    }}
                    className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left transition-colors hover:bg-slate-50 focus:bg-slate-50 focus:outline-none"
                  >
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      {Icon ? <Icon className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                    </div>
                    <div className="flex-1 text-sm font-medium text-slate-700">
                      {navigationMessages[link.title]
                        ? i18n._(navigationMessages[link.title])
                        : link.title}
                    </div>
                  </button>
                );
              })
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function NotificationsPopover({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  if (!isOpen) return null;
  return (
    <>
      <div className="fixed inset-0 z-40" onClick={onClose} />
      <div className="absolute right-0 top-full z-50 mt-2 w-80 origin-top-right rounded-xl border border-slate-200/80 bg-white/95 shadow-xl backdrop-blur-xl animate-in fade-in slide-in-from-top-2">
        <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3">
          <span className="font-semibold text-slate-800">
            <Trans>Thông báo</Trans>
          </span>
          <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-bold text-primary">
            2 mới
          </span>
        </div>
        <div className="max-h-80 overflow-y-auto p-1">
          <button
            type="button"
            className="flex w-full items-start gap-3 rounded-lg px-3 py-2.5 text-left transition-colors hover:bg-slate-50"
          >
            <div className="mt-0.5 h-2 w-2 shrink-0 rounded-full bg-rose-500" />
            <div>
              <div className="text-[13px] font-medium text-slate-800">
                <Trans>Hệ thống bảo trì</Trans>
              </div>
              <div className="text-[11px] text-slate-500 mt-0.5">
                <Trans>Hệ thống sẽ bảo trì từ 00:00 đến 04:00 ngày mai để nâng cấp máy chủ.</Trans>
              </div>
            </div>
          </button>
          <button
            type="button"
            className="flex w-full items-start gap-3 rounded-lg px-3 py-2.5 text-left transition-colors hover:bg-slate-50"
          >
            <div className="mt-0.5 h-2 w-2 shrink-0 rounded-full bg-primary" />
            <div>
              <div className="text-[13px] font-medium text-slate-800">
                <Trans>Dữ liệu chấm công</Trans>
              </div>
              <div className="text-[11px] text-slate-500 mt-0.5">
                <Trans>Dữ liệu chấm công tháng này của bạn đã được cập nhật hoàn tất.</Trans>
              </div>
            </div>
          </button>
        </div>
        <div className="border-t border-slate-100 p-2 text-center">
          <button type="button" className="text-xs font-medium text-primary hover:underline">
            <Trans>Đánh dấu đã đọc tất cả</Trans>
          </button>
        </div>
      </div>
    </>
  );
}

function HelpPopover({
  isOpen,
  onClose,
  onOpenGuide,
  onOpenShortcuts,
}: {
  isOpen: boolean;
  onClose: () => void;
  onOpenGuide: () => void;
  onOpenShortcuts: () => void;
}) {
  if (!isOpen) return null;
  return (
    <>
      <div className="fixed inset-0 z-40" onClick={onClose} />
      <div className="absolute right-0 top-full z-50 mt-2 w-56 origin-top-right rounded-xl border border-slate-200/80 bg-white/95 p-2 shadow-xl backdrop-blur-xl animate-in fade-in slide-in-from-top-2">
        <div className="px-2 py-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
          <Trans>Trợ giúp & Hỗ trợ</Trans>
        </div>
        <button
          type="button"
          onClick={() => {
            onClose();
            onOpenGuide();
          }}
          className="mt-1 flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left text-[13px] font-medium text-slate-700 transition-colors hover:bg-slate-50 hover:text-slate-900"
        >
          <CircleHelp className="h-4 w-4 text-slate-400" />
          <Trans>Hướng dẫn sử dụng</Trans>
        </button>
        <button
          type="button"
          onClick={() => {
            onClose();
            onOpenShortcuts();
          }}
          className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left text-[13px] font-medium text-slate-700 transition-colors hover:bg-slate-50 hover:text-slate-900"
        >
          <Menu className="h-4 w-4 text-slate-400" />
          <Trans>Phím tắt hệ thống</Trans>
        </button>
        <div className="my-1 border-t border-slate-100" />
        <div className="px-3 py-1.5 text-[10px] text-slate-400 text-center">
          Phiên bản 0.1.0-alpha
        </div>
      </div>
    </>
  );
}

function GuideModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/40 p-4 backdrop-blur-sm animate-in fade-in">
      <div className="relative flex w-full max-w-2xl flex-col rounded-2xl bg-white shadow-2xl animate-in zoom-in-95">
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
          <h2 className="text-lg font-bold text-slate-900">
            <Trans>Hướng dẫn sử dụng HIU HRM</Trans>
          </h2>
          <button
            onClick={onClose}
            className="rounded-full p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          </button>
        </div>
        <div className="p-6">
          <div className="rounded-xl bg-slate-50 p-6 text-center">
            <CircleHelp className="mx-auto mb-3 h-10 w-10 text-slate-300" />
            <h3 className="mb-2 text-base font-bold text-slate-900">Tài liệu đang được cập nhật</h3>
            <p className="text-sm text-slate-500">
              Cảm ơn bạn đã sử dụng HIU HRM. Tài liệu hướng dẫn sử dụng chi tiết cho từng phân hệ
              hiện đang trong quá trình hoàn thiện và sẽ sớm được ra mắt trong bản cập nhật tới.
            </p>
            <button
              onClick={onClose}
              className="mt-6 rounded-lg bg-slate-900 px-6 py-2 text-sm font-semibold text-white hover:bg-slate-800"
            >
              Đóng lại
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function ShortcutsModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/40 p-4 backdrop-blur-sm animate-in fade-in">
      <div className="relative w-full max-w-lg rounded-2xl bg-white shadow-2xl animate-in zoom-in-95">
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
          <h2 className="text-lg font-bold text-slate-900">
            <Trans>Phím tắt hệ thống</Trans>
          </h2>
          <button
            onClick={onClose}
            className="rounded-full p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          </button>
        </div>
        <div className="p-2">
          <table className="w-full text-left text-sm">
            <tbody>
              {[
                { desc: 'Mở thanh tìm kiếm (Command Palette)', keys: ['Ctrl', 'K'] },
                { desc: 'Đóng cửa sổ hiện tại', keys: ['Esc'] },
                { desc: 'Trở về trang chủ', keys: ['G', 'H'] },
                { desc: 'Mở trung tâm báo cáo', keys: ['G', 'R'] },
              ].map((shortcut, i) => (
                <tr key={i} className="border-b border-slate-50 last:border-0">
                  <td className="px-4 py-3 font-medium text-slate-600">{shortcut.desc}</td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex justify-end gap-1">
                      {shortcut.keys.map((k) => (
                        <kbd
                          key={k}
                          className="rounded-md border border-slate-200 bg-slate-50 px-2 py-0.5 text-xs font-semibold text-slate-500 shadow-sm"
                        >
                          {k}
                        </kbd>
                      ))}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function BreadcrumbBar() {
  const { i18n } = useLingui();
  const location = useLocation();
  const segments = resolveBreadcrumb(location.pathname);

  return (
    <div className="sticky top-12 z-30 flex h-8 items-center gap-1 border-b border-brand-border bg-white px-4 text-xs shadow-[0_1px_2px_rgba(15,23,42,0.04)]">
      <span className="text-brand-secondary-text">HIU HRM</span>
      {segments.map((segment) => (
        <span key={segment.path} className="flex items-center gap-1">
          <ChevronRight className="h-3 w-3 text-slate-400" />
          <span className="font-medium text-brand-primary-text">
            {navigationMessages[segment.title]
              ? i18n._(navigationMessages[segment.title])
              : segment.title}
          </span>
        </span>
      ))}
    </div>
  );
}

export default function DashboardLayout() {
  const user = useAuthStore((state) => state.user);
  const isCollapsed = useAppStore((state) => state.isSidebarCollapsed);
  const isMobileOpen = useAppStore((state) => state.isMobileNavigationOpen);
  const toggleSidebar = useAppStore((state) => state.ToggleSidebar);
  const setMobileOpen = useAppStore((state) => state.SetMobileNavigationOpen);
  const navigate = useNavigate();
  const logout = useLogout();
  const items = useMemo(
    () => filterNavigationByPermissions(navigationItems, user?.permissions),
    [user?.permissions],
  );

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [isGuideOpen, setIsGuideOpen] = useState(false);
  const [isShortcutsOpen, setIsShortcutsOpen] = useState(false);

  const allLinks = useMemo(() => {
    const flat: { title: string; path: string; icon?: React.ElementType }[] = [];
    items.forEach((item) => {
      flat.push({ title: item.title, path: item.path, icon: item.icon });
      item.children?.forEach((child) => {
        flat.push({ title: child.title, path: child.path });
      });
    });
    return flat;
  }, [items]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchOpen((open) => !open);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleLogout = () => {
    logout.mutate(undefined, {
      onSettled: () => void navigate('/login', { replace: true }),
    });
  };

  const sidebar = (
    <aside
      className={cn(
        'flex h-full flex-col border-r border-brand-border bg-brand-surface',
        isCollapsed ? 'w-14' : 'w-60',
      )}
    >
      <div className="flex h-10 items-center justify-between border-b border-brand-border bg-slate-50 px-2">
        {!isCollapsed ? (
          <span className="px-2 text-[11px] font-medium uppercase tracking-widest text-slate-400">
            <Trans>Phân hệ</Trans>
          </span>
        ) : null}
        <Button
          variant="ghost"
          size="compact-icon"
          onClick={toggleSidebar}
          aria-label={isCollapsed ? 'Expand navigation' : 'Collapse navigation'}
          className={cn(isCollapsed && 'mx-auto')}
        >
          {isCollapsed ? (
            <PanelLeftOpen className="h-4 w-4" />
          ) : (
            <PanelLeftClose className="h-4 w-4" />
          )}
        </Button>
      </div>
      <nav className="flex-1 overflow-y-auto py-1" aria-label="Main navigation">
        {items.map((item) => (
          <NavigationLink key={item.path} item={item} isCollapsed={isCollapsed} />
        ))}
      </nav>
    </aside>
  );

  return (
    <div className="flex min-h-screen flex-col overflow-x-clip bg-brand-bg">
      <CommandPalette
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        links={allLinks}
      />
      <GuideModal isOpen={isGuideOpen} onClose={() => setIsGuideOpen(false)} />
      <ShortcutsModal isOpen={isShortcutsOpen} onClose={() => setIsShortcutsOpen(false)} />

      <header className="fixed inset-x-0 top-0 z-40 border-b border-slate-200/80 bg-white/80 shadow-sm backdrop-blur-md">
        <div className="flex h-12 items-center px-2 lg:px-0">
          <div className="flex h-full shrink-0 items-center px-2 lg:w-60 lg:px-4">
            <Button
              variant="ghost"
              size="compact-icon"
              onClick={() => setMobileOpen(true)}
              aria-label="Open navigation"
              className="mr-2 h-8 w-8 rounded-md text-slate-500 hover:bg-slate-100 hover:text-slate-900 lg:hidden"
            >
              <Menu className="h-4 w-4" />
            </Button>
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center">
                <img
                  src={hospitalLogo}
                  alt=""
                  aria-hidden="true"
                  className="h-full w-full object-contain scale-110"
                />
              </div>
              <div className="hidden flex-col justify-center sm:flex">
                <div className="text-[14px] font-bold leading-none tracking-tight text-slate-900">
                  HIU HRM
                </div>
                <div className="mt-1 text-[10px] font-semibold leading-none tracking-[0.06em] text-slate-400 uppercase">
                  <Trans>Quản trị nhân sự</Trans>
                </div>
              </div>
            </div>
          </div>

          <div className="hidden h-[34px] items-center rounded-lg bg-slate-100/80 p-[3px] md:flex ml-6 border border-slate-200/50 shadow-[inset_0_1px_2px_rgba(0,0,0,0.02)]">
            {[
              { key: 'workspace', label: <Trans>Không gian làm việc</Trans>, path: '/dashboard' },
              { key: 'reports', label: <Trans>Báo cáo</Trans>, path: '/reports' },
              { key: 'tools', label: <Trans>Công cụ</Trans>, path: '/administration' },
            ].map((item) => {
              const isActive =
                location.pathname.startsWith(item.path) ||
                (item.key === 'workspace' &&
                  !location.pathname.startsWith('/reports') &&
                  !location.pathname.startsWith('/administration'));

              return (
                <button
                  key={item.key}
                  type="button"
                  onClick={() => void navigate(item.path)}
                  className={cn(
                    'flex h-full items-center rounded-md px-4 text-[13px] transition-all',
                    isActive
                      ? 'bg-white font-semibold text-slate-900 shadow-sm ring-1 ring-slate-200/60'
                      : 'font-medium text-slate-500 hover:text-slate-900 hover:bg-slate-200/50',
                  )}
                >
                  {item.label}
                </button>
              );
            })}
          </div>

          <div className="ml-auto flex items-center gap-1.5 pr-2 lg:pr-4">
            <button
              type="button"
              onClick={() => setIsSearchOpen(true)}
              className="mr-2 hidden h-8 w-64 items-center gap-2 rounded-full border border-slate-200/80 bg-slate-50/50 px-3 text-xs text-slate-400 shadow-[inset_0_1px_2px_rgba(0,0,0,0.02)] transition-all hover:bg-white hover:ring-1 hover:ring-slate-200 focus-within:bg-white focus-within:ring-2 focus-within:ring-primary/20 lg:flex"
            >
              <Search className="h-[14px] w-[14px] shrink-0 text-slate-400" />
              <span className="flex-1 truncate text-left">
                <Trans>Tìm menu hoặc lệnh</Trans>
              </span>
              <kbd className="ml-auto rounded-md border border-slate-200 bg-white px-1.5 py-0.5 text-[10px] font-medium text-slate-400 shadow-sm">
                Ctrl K
              </kbd>
            </button>
            <div className="relative">
              <Button
                variant="ghost"
                size="compact-icon"
                aria-label="Notifications"
                onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                className="relative h-8 w-8 rounded-full text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900"
              >
                <Bell className="h-4 w-4" />
                <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-rose-500 ring-2 ring-white" />
              </Button>
              <NotificationsPopover
                isOpen={isNotificationsOpen}
                onClose={() => setIsNotificationsOpen(false)}
              />
            </div>
            <div className="relative">
              <Button
                variant="ghost"
                size="compact-icon"
                aria-label="Help"
                onClick={() => setIsHelpOpen(!isHelpOpen)}
                className="hidden h-8 w-8 rounded-full text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900 sm:inline-flex"
              >
                <CircleHelp className="h-4 w-4" />
              </Button>
              <HelpPopover
                isOpen={isHelpOpen}
                onClose={() => setIsHelpOpen(false)}
                onOpenGuide={() => setIsGuideOpen(true)}
                onOpenShortcuts={() => setIsShortcutsOpen(true)}
              />
            </div>
            <div className="mx-1 hidden h-4 w-px bg-slate-200 sm:block" />
            <LanguageSwitcher />
            <div className="hidden items-center gap-2 rounded-full py-1 pr-2 pl-1 transition-colors hover:bg-slate-50 sm:flex cursor-default ml-1">
              <img
                src={doctorAvatar}
                alt={user?.fullName ?? ''}
                className="h-8 w-8 rounded-full border border-slate-200 bg-slate-100 object-cover object-[center_38%] shadow-sm"
              />
              <div className="max-w-[120px] leading-tight">
                <div className="truncate text-xs font-semibold text-slate-700">
                  {user?.fullName ?? 'Guest'}
                </div>
                <div className="truncate text-[10px] text-slate-400">
                  {user?.email ?? 'Signed in'}
                </div>
              </div>
            </div>
            <Button
              variant="ghost"
              size="compact-icon"
              onClick={handleLogout}
              aria-label="Logout"
              className="h-8 w-8 rounded-full text-slate-400 transition-colors hover:bg-rose-50 hover:text-rose-600"
            >
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      <div className="flex flex-1 pt-12 pb-6 w-full min-w-0">
        <div className="fixed inset-y-0 left-0 top-12 hidden lg:block">{sidebar}</div>

        {isMobileOpen ? (
          <div className="fixed inset-0 z-50 lg:hidden">
            <button
              className="absolute inset-0 bg-slate-950/40"
              onClick={() => setMobileOpen(false)}
              aria-label="Close navigation"
            />
            <div className="absolute inset-y-0 left-0 w-72 bg-white shadow-xl">
              <div className="flex h-12 items-center justify-between border-b border-brand-border px-3">
                <span className="text-sm font-bold">
                  HIU HRM · <Trans>Phân hệ</Trans>
                </span>
                <Button
                  variant="ghost"
                  size="compact-icon"
                  onClick={() => setMobileOpen(false)}
                  aria-label="Close navigation"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <nav className="overflow-y-auto py-1">
                {items.map((item) => (
                  <NavigationLink key={item.path} item={item} isCollapsed={false} />
                ))}
              </nav>
            </div>
          </div>
        ) : null}

        <div
          className={cn(
            'min-w-0 flex-1 overflow-x-clip transition-[margin]',
            isCollapsed ? 'lg:ml-14' : 'lg:ml-60',
          )}
        >
          <BreadcrumbBar />
          <main className="w-full overflow-x-clip p-3 lg:p-4">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}
