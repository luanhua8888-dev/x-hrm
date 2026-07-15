import { i18n } from '@lingui/core';

import { messages as viMessages } from '@/locales/vi/messages.po';

export const supportedLocales = ['vi', 'en'] as const;
export type SupportedLocale = (typeof supportedLocales)[number];

const LOCALE_STORAGE_KEY = 'hiu-hrm.locale';

function isSupportedLocale(value: string | null): value is SupportedLocale {
  return supportedLocales.includes(value as SupportedLocale);
}

export function getInitialLocale(): SupportedLocale {
  const savedLocale = localStorage.getItem(LOCALE_STORAGE_KEY);
  return isSupportedLocale(savedLocale) ? savedLocale : 'vi';
}

i18n.load('vi', viMessages);
i18n.activate('vi');

export async function activateLocale(locale: SupportedLocale) {
  if (locale === 'en') {
    const { messages } = await import('@/locales/en/messages.po');
    i18n.load('en', messages);
  }

  i18n.activate(locale);
  localStorage.setItem(LOCALE_STORAGE_KEY, locale);
  document.documentElement.lang = locale;
  window.dispatchEvent(new CustomEvent('hiu-hrm:locale-change', { detail: locale }));
}

export { i18n };
