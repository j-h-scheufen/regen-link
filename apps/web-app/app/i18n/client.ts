'use client';

import i18next from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import resourcesToBackend from 'i18next-resources-to-backend';
import { useTranslation as useTranslationOrg } from 'react-i18next';
import { initReactI18next } from 'react-i18next';
import { type SupportedLanguage, getOptions } from './settings';

// Initialize i18next for the client side
i18next
  .use(initReactI18next)
  .use(LanguageDetector)
  .use(
    resourcesToBackend(
      (language: SupportedLanguage, namespace: string) =>
        import(`./locales/${language}/${namespace}.json`)
    )
  )
  .init({
    ...getOptions(),
    lng: undefined, // Let the language detector handle it
    detection: {
      order: ['path'], // only using the path option. others: ['path', 'htmlTag', 'cookie', 'navigator'].
    },
  });

export function useTranslation(ns?: string) {
  return useTranslationOrg(ns, {
    useSuspense: false,
  });
}

export const i18n = i18next;
