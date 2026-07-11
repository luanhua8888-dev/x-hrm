import { useLingui } from '@lingui/react';
import { Check, ChevronDown } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

import { activateLocale, SupportedLocale } from '@/i18n/i18n';
import { cn } from '@/utils/cn';

const flags: Record<SupportedLocale, React.ReactNode> = {
  vi: (
    <svg viewBox="0 0 900 600" className="h-[14px] w-[20px] object-cover">
      <rect width="900" height="600" fill="#da251d" />
      <polygon fill="#ffcd00" points="450,120 547,418 293,234 607,234 353,418" />
    </svg>
  ),
  en: (
    <svg viewBox="0 0 640 480" className="h-[14px] w-[20px] object-cover">
      <path fill="#012169" d="M0 0h640v480H0z" />
      <path
        fill="#FFF"
        d="m75 0 244 181L562 0h78v62L400 241l240 178v61h-80L320 301 81 480H0v-60l239-178L0 64V0h75z"
      />
      <path
        fill="#C8102E"
        d="m424 281 216 159v40L369 281h55zm-184 20 6 35L22 480H0v-50l240-179zM640 0v3L391 191l2-44L590 0h50zM0 0l239 176h-60L0 42V0z"
      />
      <path fill="#FFF" d="M241 0v480h160V0H241zM0 160v160h640V160H0z" />
      <path fill="#C8102E" d="M0 193v96h640v-96H0zM273 0v480h96V0h-96z" />
    </svg>
  ),
};

const labels: Record<SupportedLocale, string> = {
  vi: 'Tiếng Việt',
  en: 'English',
};

const locales = ['vi', 'en'] as const;

export function LanguageSwitcher() {
  const { i18n } = useLingui();
  const [isOpen, setIsOpen] = useState(false);
  const [isChanging, setIsChanging] = useState(false);
  const currentLocale = (i18n.locale || 'vi') as SupportedLocale;
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const changeLocale = async (locale: SupportedLocale) => {
    if (locale === currentLocale || isChanging) return;
    setIsChanging(true);
    setIsOpen(false);
    try {
      await activateLocale(locale);
    } finally {
      setIsChanging(false);
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'flex h-8 items-center gap-1.5 rounded-full px-2.5 transition-all',
          isOpen ? 'bg-slate-100 shadow-inner' : 'hover:bg-slate-100/80',
        )}
        aria-label="Select Language"
        aria-expanded={isOpen}
      >
        <span className="flex shrink-0 overflow-hidden rounded-[3px] shadow-[0_0_0_1px_rgba(0,0,0,0.1)]">
          {flags[currentLocale]}
        </span>
        <span className="text-[12px] font-semibold uppercase tracking-wider text-slate-700">
          {currentLocale}
        </span>
        <ChevronDown
          className={cn(
            'h-3.5 w-3.5 text-slate-400 transition-transform duration-200',
            isOpen && 'rotate-180 text-slate-600',
          )}
        />
      </button>

      {isOpen ? (
        <div className="absolute right-0 top-full mt-1.5 min-w-[140px] origin-top-right rounded-xl border border-slate-200/80 bg-white/95 p-1.5 shadow-lg backdrop-blur-xl animate-in fade-in zoom-in-95">
          {locales.map((locale) => {
            const isSelected = locale === currentLocale;
            return (
              <button
                key={locale}
                type="button"
                disabled={isChanging}
                onClick={() => void changeLocale(locale)}
                className={cn(
                  'flex w-full items-center gap-2.5 rounded-md px-2.5 py-2 text-[13px] transition-colors',
                  isSelected
                    ? 'bg-primary/10 font-semibold text-primary'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900',
                )}
              >
                <span className="flex shrink-0 overflow-hidden rounded-[3px] shadow-[0_0_0_1px_rgba(0,0,0,0.1)]">
                  {flags[locale]}
                </span>
                <span className="flex-1 whitespace-nowrap text-left leading-none">
                  {labels[locale]}
                </span>
                {isSelected ? <Check className="h-4 w-4 shrink-0" /> : null}
              </button>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
