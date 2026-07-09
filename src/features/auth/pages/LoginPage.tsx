import { useState, useRef } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';

import { useAuthStore } from '@/stores/auth.store';
import LoginLeftPanel from '@/components/login/LoginLeftPanel';
import LoginForm from '@/components/login/LoginForm';

interface LocationState {
  from?: {
    pathname?: string;
  };
}

export default function LoginPage() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const navigate = useNavigate();
  const location = useLocation();
  const locationState = location.state as LocationState | null;
  const redirectTo = locationState?.from?.pathname ?? '/dashboard';

  // Locale setup
  const [currentLang, setCurrentLang] = useState<'EN' | 'VI'>('EN');
  const [isLangOpen, setIsLangOpen] = useState(false);

  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const xc = rect.width / 2;
    const yc = rect.height / 2;

    const MAX_TILT = 4.5; // Maximum tilt angle in degrees
    const rotateY = ((x - xc) / xc) * MAX_TILT;
    const rotateX = -((y - yc) / yc) * MAX_TILT;

    card.style.transition = 'transform 0.08s ease-out';
    card.style.transform = `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transition = 'transform 0.6s cubic-bezier(0.25, 1, 0.5, 1)';
    card.style.transform = 'perspective(1200px) rotateX(0deg) rotateY(0deg)';
  };

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="w-full animate-fade-in-up">
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="w-full h-auto md:h-[82vh] min-h-[520px] md:min-h-[600px] md:max-h-[720px] rounded-[24px] border border-white/20 shadow-2xl flex flex-col md:flex-row overflow-hidden relative"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Left Panel - Hero Graphic */}
        <LoginLeftPanel currentLang={currentLang} />

        {/* Right Panel - Active Auth Form */}
        <div className="w-full md:w-[54%] relative z-10 bg-brand-surface p-6 md:p-10 lg:p-12 flex flex-col justify-center min-h-[inherit]">
          {/* Locale Dropdown selector */}
          <div className="absolute top-6 right-6 z-30">
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsLangOpen(!isLangOpen)}
                className="flex items-center gap-2 rounded-full border border-brand-border px-3 py-1.5 text-xs font-semibold text-brand-secondary-text hover:bg-slate-50 transition-colors cursor-pointer select-none"
              >
                {currentLang === 'EN' ? (
                  <svg className="h-3.5 w-5 shrink-0 rounded-[1px] shadow-sm border border-slate-200" viewBox="0 0 60 30" width="18" height="10">
                    <rect width="60" height="30" fill="#012169"/>
                    <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6"/>
                    <path d="M0,0 L60,30 M60,0 L0,30" stroke="#c8102e" strokeWidth="4"/>
                    <path d="M30,0 L30,30 M0,15 L60,15" stroke="#fff" strokeWidth="10"/>
                    <path d="M30,0 L30,30 M0,15 L60,15" stroke="#c8102e" strokeWidth="6"/>
                  </svg>
                ) : (
                  <svg className="h-3.5 w-5 shrink-0 rounded-[1px] shadow-sm border border-slate-200" viewBox="0 0 60 40" width="18" height="10">
                    <rect width="60" height="40" fill="#da251d"/>
                    <path d="M30,10 L32.35,17.24 L39.9,17.24 L33.78,21.68 L36.13,28.92 L30,24.48 L23.87,28.92 L26.22,21.68 L20.1,17.24 L27.65,17.24 Z" fill="#ffff00"/>
                  </svg>
                )}
                <span>{currentLang}</span>
                <ChevronDown className="h-3.5 w-3.5 text-brand-secondary-text/80" />
              </button>
              {isLangOpen && (
                <div className="absolute right-0 mt-1.5 w-32 rounded-xl border border-brand-border bg-white py-1 shadow-lg z-50 animate-in fade-in slide-in-from-top-1 duration-200">
                  <button
                    type="button"
                    onClick={() => {
                      setCurrentLang('EN');
                      setIsLangOpen(false);
                    }}
                    className="w-full px-3 py-2 text-left text-xs font-semibold hover:bg-slate-50 flex items-center gap-2 transition-colors cursor-pointer"
                  >
                    <svg className="h-3 w-4.5 shrink-0 rounded-[1px] shadow-sm border border-slate-100" viewBox="0 0 60 30" width="14" height="8">
                      <rect width="60" height="30" fill="#012169"/>
                      <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6"/>
                      <path d="M0,0 L60,30 M60,0 L0,30" stroke="#c8102e" strokeWidth="4"/>
                      <path d="M30,0 L30,30 M0,15 L60,15" stroke="#fff" strokeWidth="10"/>
                      <path d="M30,0 L30,30 M0,15 L60,15" stroke="#c8102e" strokeWidth="6"/>
                    </svg>
                    <span>English</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setCurrentLang('VI');
                      setIsLangOpen(false);
                    }}
                    className="w-full px-3 py-2 text-left text-xs font-semibold hover:bg-slate-50 flex items-center gap-2 transition-colors cursor-pointer"
                  >
                    <svg className="h-3 w-4.5 shrink-0 rounded-[1px] shadow-sm border border-slate-100" viewBox="0 0 60 40" width="14" height="8">
                      <rect width="60" height="40" fill="#da251d"/>
                      <path d="M30,10 L32.35,17.24 L39.9,17.24 L33.78,21.68 L36.13,28.92 L30,24.48 L23.87,28.92 L26.22,21.68 L20.1,17.24 L27.65,17.24 Z" fill="#ffff00"/>
                    </svg>
                    <span>Tiếng Việt</span>
                  </button>
                </div>
              )}
            </div>
          </div>

          <LoginForm
            currentLang={currentLang}
            onSubmitSuccess={() => {
              void navigate(redirectTo, { replace: true });
            }}
          />
        </div>
      </div>
    </div>
  );
}
