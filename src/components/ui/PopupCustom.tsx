/* eslint-disable react-refresh/only-export-components -- Compound component API intentionally shares one module. */
import { X } from 'lucide-react';
import { createContext, type ReactNode, use, useEffect, useId, useRef } from 'react';
import { createPortal } from 'react-dom';

import { Button } from '@/components/ui/button';
import { cn } from '@/utils/cn';

type PopupSize = 'sm' | 'md' | 'lg';

interface PopupContextValue {
  close: () => void;
  descriptionId: string;
  titleId: string;
}

interface PopupRootProps {
  children: ReactNode;
  className?: string;
  closeOnBackdrop?: boolean;
  onClose: () => void;
  open: boolean;
  size?: PopupSize;
}

const PopupContext = createContext<PopupContextValue | null>(null);

const sizeClasses: Record<PopupSize, string> = {
  sm: 'max-w-md',
  md: 'max-w-xl',
  lg: 'max-w-2xl',
};

function usePopup() {
  const context = use(PopupContext);
  if (!context) throw new Error('PopupCustom components must be used inside PopupCustom.Root');
  return context;
}

function Root({
  children,
  className,
  closeOnBackdrop = true,
  onClose,
  open,
  size = 'md',
}: PopupRootProps) {
  const titleId = useId();
  const descriptionId = useId();
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const previousFocus = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
      if (event.key !== 'Tab' || !panelRef.current) return;
      const focusable = panelRef.current.querySelectorAll<HTMLElement>(
        'button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    requestAnimationFrame(() =>
      panelRef.current?.querySelector<HTMLElement>('[autofocus], input, button')?.focus(),
    );
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', onKeyDown);
      previousFocus?.focus();
    };
  }, [onClose, open]);

  if (!open) return null;

  return createPortal(
    <PopupContext value={{ close: onClose, descriptionId, titleId }}>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
        <button
          type="button"
          aria-label="Close dialog"
          className="absolute inset-0 cursor-default bg-slate-950/35 backdrop-blur-[2px]"
          onClick={closeOnBackdrop ? onClose : undefined}
        />
        <div
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          aria-describedby={descriptionId}
          className={cn(
            'relative flex max-h-[min(86dvh,760px)] w-full flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-[0_24px_70px_rgba(15,23,42,0.22)]',
            sizeClasses[size],
            className,
          )}
        >
          {children}
        </div>
      </div>
    </PopupContext>,
    document.body,
  );
}

function Header({
  children,
  description,
  icon,
}: {
  children: ReactNode;
  description?: ReactNode;
  icon?: ReactNode;
}) {
  const { close, descriptionId, titleId } = usePopup();
  return (
    <header className="flex items-start gap-3 border-b border-slate-100 px-5 py-4">
      {icon ? (
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-700">
          {icon}
        </span>
      ) : null}
      <div className="min-w-0 flex-1">
        <h2 id={titleId} className="text-base font-semibold tracking-tight text-slate-950">
          {children}
        </h2>
        {description ? (
          <p id={descriptionId} className="mt-1 text-xs leading-5 text-slate-500">
            {description}
          </p>
        ) : null}
      </div>
      <Button
        variant="ghost"
        size="compact-icon"
        className="-mr-1 -mt-1 text-slate-400 hover:text-slate-700"
        onClick={close}
        aria-label="Close"
      >
        <X className="h-4 w-4" />
      </Button>
    </header>
  );
}

function Body({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn('min-h-0 overflow-y-auto px-5 py-5', className)}>{children}</div>;
}

function Footer({ children }: { children: ReactNode }) {
  return (
    <footer className="flex items-center justify-end gap-2 border-t border-slate-100 bg-slate-50/70 px-5 py-3.5">
      {children}
    </footer>
  );
}

function Close({ children = 'Cancel' }: { children?: ReactNode }) {
  const { close } = usePopup();
  return (
    <Button variant="secondary" onClick={close}>
      {children}
    </Button>
  );
}

export const PopupCustom = { Body, Close, Footer, Header, Root };
