import { useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';
import { useLingui } from '@lingui/react';

import { router } from '@/app/router';

export default function App() {
  const { i18n } = useLingui();

  useEffect(() => {
    // Determine the title based on the current locale
    const currentLang = i18n.locale === 'vi' ? 'VI' : 'EN';
    document.title =
      currentLang === 'VI'
        ? 'HUI HRM - Hệ thống quản trị nhân sự'
        : 'HUI HRM - Human Resource Management System';
  }, [i18n.locale]);

  return <RouterProvider router={router} />;
}
