import { useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useLingui } from '@lingui/react';
import { ChevronDown, Globe, X } from 'lucide-react';

import { activateLocale } from '@/i18n/i18n';
import { useAuthStore } from '@/stores/auth.store';
import LoginForm from '@/components/login/LoginForm';
import hospitalBackground from '@/assets/bg1.jpg';

interface LocationState {
  from?: {
    pathname?: string;
  };
}

export default function LoginPage() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const { i18n } = useLingui();
  const navigate = useNavigate();
  const location = useLocation();
  const locationState = location.state as LocationState | null;
  const redirectTo = locationState?.from?.pathname ?? '/dashboard';

  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isFormVisible, setIsFormVisible] = useState(true);

  const currentLang = i18n.locale === 'vi' ? 'VI' : 'EN';

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <main className="flex h-[100dvh] w-full items-center justify-center bg-slate-200/80 p-2 sm:p-3 lg:p-4">
      {/* Outer Card Wrapper - Zooms in softly */}
      <div className="relative flex h-full w-full max-w-[1920px] items-center justify-center overflow-hidden rounded-[1.5rem] shadow-2xl ring-1 ring-slate-900/5 lg:justify-start lg:p-20 xl:p-28 animate-in fade-in zoom-in-[0.98] duration-1000 ease-out">
        {/* Background Image */}
        <div className="absolute inset-0 h-full w-full bg-[#cbd5e1]">
          <img
            src={hospitalBackground}
            alt="Hospital Background"
            className="absolute inset-0 h-full w-full object-cover object-center sm:object-right"
          />
        </div>

        {/* Top Right Controls - Slides down */}
        <div className="absolute right-6 top-6 z-30 flex items-center gap-3 sm:right-8 sm:top-8 animate-in fade-in slide-in-from-top-4 duration-700 delay-300 fill-mode-both">
          {/* Toggle Form Button */}
          <button
            type="button"
            onClick={() => setIsFormVisible(!isFormVisible)}
            className="btn-shimmer rounded-full bg-primary px-5 py-2 text-sm font-bold text-white shadow-md transition-all duration-300 hover:scale-105 hover:bg-primary-hover hover:shadow-lg active:scale-95 focus:outline-none focus:ring-2 focus:ring-white/50"
          >
            {isFormVisible
              ? currentLang === 'VI'
                ? 'Đóng'
                : 'Close'
              : currentLang === 'VI'
                ? 'Đăng nhập'
                : 'Sign in'}
          </button>

          {/* Language Switcher */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setIsLangOpen(!isLangOpen)}
              className="flex items-center gap-2 rounded-full border border-white/30 bg-slate-900/60 px-4 py-2 text-sm font-semibold text-white shadow-md transition-colors hover:bg-slate-900/80 focus:outline-none focus:ring-2 focus:ring-white/50"
            >
              <Globe className="h-4.5 w-4.5 text-white" />
              <span>{currentLang}</span>
              <ChevronDown className="h-4 w-4 text-white/80" />
            </button>

            {isLangOpen && (
              <div className="absolute right-0 mt-2 w-36 animate-in fade-in slide-in-from-top-1 rounded-2xl border border-white/20 bg-slate-900/90 py-1 shadow-2xl z-50">
                <button
                  type="button"
                  onClick={() => {
                    void activateLocale('en');
                    setIsLangOpen(false);
                  }}
                  className="flex w-full items-center px-4 py-2.5 text-left text-sm font-medium text-white transition-colors hover:bg-white/10"
                >
                  English
                </button>
                <button
                  type="button"
                  onClick={() => {
                    void activateLocale('vi');
                    setIsLangOpen(false);
                  }}
                  className="flex w-full items-center px-4 py-2.5 text-left text-sm font-medium text-white transition-colors hover:bg-white/10"
                >
                  Tiếng Việt
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Floating Transparent Form Container */}
        {isFormVisible && (
          <section className="group relative z-10 w-full max-w-[420px] rounded-[2rem] border border-white/60 bg-white/80 backdrop-blur-2xl p-8 shadow-[0_16px_40px_rgba(0,0,0,0.15)] sm:p-10 transition-all duration-500 hover:-translate-y-2 hover:bg-white/95 hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.25)] hover:border-white/80 animate-in fade-in slide-in-from-bottom-8 zoom-in-95 fill-mode-both">
            {/* Soft Glow behind card on hover */}
            <div className="absolute -inset-0.5 -z-10 rounded-[2rem] bg-gradient-to-b from-white/40 to-white/0 opacity-0 blur transition-opacity duration-500 group-hover:opacity-100" />

            {/* Close 'X' Button on the Form */}
            <button
              type="button"
              onClick={() => setIsFormVisible(false)}
              className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full text-slate-500 transition-colors hover:bg-slate-200/50 hover:text-slate-900 focus:outline-none"
              aria-label="Close form"
            >
              <X className="h-5 w-5" />
            </button>

            <LoginForm
              currentLang={currentLang}
              onSubmitSuccess={() => {
                void navigate(redirectTo, { replace: true });
              }}
            />
          </section>
        )}
      </div>
    </main>
  );
}
