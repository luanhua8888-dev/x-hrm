import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { I18nProvider } from '@lingui/react';
import { ReactNode, useEffect, useState } from 'react';

import { activateLocale, getInitialLocale, i18n } from '@/i18n/i18n';

interface AppProvidersProps {
  children: ReactNode;
}

export function AppProviders({ children }: AppProvidersProps) {
  const [locale, setLocale] = useState(() => getInitialLocale());
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60_000,
            refetchOnWindowFocus: false,
            retry: 1,
          },
          mutations: {
            retry: false,
          },
        },
      }),
  );

  useEffect(() => {
    void activateLocale(locale);
  }, [locale]);

  useEffect(() => {
    const handleLocaleChange = (event: Event) => {
      const nextLocale = (event as CustomEvent).detail as ReturnType<typeof getInitialLocale>;
      setLocale(nextLocale);
    };

    window.addEventListener('hui-hrm:locale-change', handleLocaleChange);
    return () => window.removeEventListener('hui-hrm:locale-change', handleLocaleChange);
  }, []);

  return (
    <I18nProvider i18n={i18n}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </I18nProvider>
  );
}
