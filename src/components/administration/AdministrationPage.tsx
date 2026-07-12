import { useLingui } from '@lingui/react';
import { type ReactNode, useState } from 'react';
import { ShieldAlert, Users, Settings, History, Database, Key, Globe, Bell } from 'lucide-react';

import { cn } from '@/utils/cn';

function Trans({ children }: { children: ReactNode }) {
  const { i18n } = useLingui();
  const text = typeof children === 'string' ? children : '';
  return <>{text ? i18n._({ id: text, message: text }) : children}</>;
}

const settingsCatalog = [
  {
    category: 'Phân quyền & Bảo mật',
    items: [
      {
        id: 'roles',
        name: 'Quản lý Vai trò',
        description: 'Định nghĩa các chức danh và nhóm quyền.',
        icon: Users,
      },
      {
        id: 'permissions',
        name: 'Phân quyền Hệ thống',
        description: 'Cấu hình quyền truy cập chi tiết.',
        icon: ShieldAlert,
      },
      {
        id: 'keys',
        name: 'API & Tích hợp',
        description: 'Quản lý khóa API và webhook.',
        icon: Key,
      },
    ],
  },
  {
    category: 'Hệ thống',
    items: [
      {
        id: 'general',
        name: 'Cài đặt Chung',
        description: 'Thông tin công ty, múi giờ, ngôn ngữ.',
        icon: Globe,
      },
      {
        id: 'notifications',
        name: 'Cấu hình Thông báo',
        description: 'Mẫu email và thông báo đẩy.',
        icon: Bell,
      },
      {
        id: 'database',
        name: 'Sao lưu Dữ liệu',
        description: 'Lịch sử sao lưu và xuất dữ liệu.',
        icon: Database,
      },
      {
        id: 'audit',
        name: 'Nhật ký Hệ thống',
        description: 'Theo dõi mọi thao tác trên hệ thống.',
        icon: History,
      },
    ],
  },
];

export default function AdministrationPage() {
  const [activeItem, setActiveItem] = useState('general');

  return (
    <div className="space-y-4 animate-in fade-in duration-500 pb-8">
      <header className="flex items-center justify-between border-b border-slate-200 pb-3">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-slate-900">
            <Trans>Công cụ Hệ thống</Trans>
          </h1>
          <p className="mt-0.5 text-xs font-medium text-slate-500">
            <Trans>Quản trị phân quyền, bảo mật và cấu hình hệ thống.</Trans>
          </p>
        </div>
      </header>

      <div className="grid grid-cols-1 items-start gap-4 md:grid-cols-[220px_1fr]">
        <nav className="space-y-5">
          {settingsCatalog.map((group) => (
            <div key={group.category} className="space-y-1.5">
              <h3 className="px-2 text-[10px] font-bold uppercase tracking-widest text-slate-400">
                <Trans>{group.category}</Trans>
              </h3>
              <div className="space-y-0.5">
                {group.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeItem === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveItem(item.id)}
                      className={cn(
                        'group flex w-full items-center gap-2.5 rounded-lg px-2.5 py-1.5 text-left transition-all',
                        isActive
                          ? 'bg-slate-900 text-white shadow-sm'
                          : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900',
                      )}
                    >
                      <Icon
                        className={cn(
                          'h-3.5 w-3.5',
                          isActive ? 'text-white' : 'text-slate-400 group-hover:text-slate-600',
                        )}
                      />
                      <span className="text-xs font-semibold">{<Trans>{item.name}</Trans>}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        <section className="min-h-[400px] rounded-xl border border-slate-100 bg-white p-6 shadow-sm">
          <div className="flex flex-col items-center justify-center h-full text-center space-y-3 py-16">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-50 border border-slate-100">
              <Settings className="h-5 w-5 text-slate-400" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-900">
                <Trans>Khu vực Cấu hình</Trans>
              </h2>
              <p className="mt-1 text-xs font-medium text-slate-500 max-w-sm">
                <Trans>
                  Tính năng đang được phát triển. Vui lòng chọn menu bên trái để xem trước.
                </Trans>
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
