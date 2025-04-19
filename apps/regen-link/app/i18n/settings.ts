import type { InitOptions } from 'i18next';

export const ALL_LOCALES = ['en', 'de'] as const;
export type SupportedLanguage = (typeof ALL_LOCALES)[number];
export const cookieName = 'i18n';

export function isSupportedLanguage(value: string): value is SupportedLanguage {
  return ALL_LOCALES.includes(value as SupportedLanguage);
}

export const fallbackLng: SupportedLanguage = 'en';
export const defaultNS = 'common';

export function getOptions(lang = fallbackLng, ns = defaultNS): InitOptions {
  return {
    // debug: true, // Set to true to see console logs
    supportedLngs: ALL_LOCALES,
    fallbackLng,
    lng: lang,
    fallbackNS: defaultNS,
    defaultNS,
    ns,
  };
}
