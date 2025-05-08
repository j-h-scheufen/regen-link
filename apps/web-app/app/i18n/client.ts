'use client';

import i18next from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import resourcesToBackend from 'i18next-resources-to-backend';
import { useEffect, useState } from 'react';
import {
  type UseTranslationOptions,
  initReactI18next,
  useTranslation as useTranslationOrg,
} from 'react-i18next';

import {
  ALL_LOCALES,
  type SupportedLanguage,
  fallbackLng,
  getOptions,
  isSupportedLanguage,
} from './settings';

const runsOnServerSide = typeof window === 'undefined';

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
    lng: undefined, // detect the language on the client
    detection: {
      order: ['path'], // only using the path option. ['path', 'htmlTag', 'cookie', 'navigator'].
    },
    preload: runsOnServerSide ? ALL_LOCALES : [],
  });

export function useTranslation(
  locale: SupportedLanguage | string,
  ns: string,
  options?: UseTranslationOptions<undefined>
) {
  const lang = isSupportedLanguage(locale) ? locale : fallbackLng;
  const instance = useTranslationOrg(ns, options);
  const { i18n } = instance;
  if (runsOnServerSide && lang && i18n.resolvedLanguage !== lang) {
    i18n.changeLanguage(locale);
  } else {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [activeLng, setActiveLng] = useState(i18n.resolvedLanguage);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
      if (activeLng === i18n.resolvedLanguage) return;
      setActiveLng(i18n.resolvedLanguage);
    }, [activeLng, i18n.resolvedLanguage]);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
      if (!locale || i18n.resolvedLanguage === locale) return;
      i18n.changeLanguage(locale);
    }, [locale, i18n]);
  }
  return instance;
}
