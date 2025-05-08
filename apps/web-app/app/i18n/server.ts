import { createInstance } from 'i18next';
import resourcesToBackend from 'i18next-resources-to-backend';
import { initReactI18next } from 'react-i18next/initReactI18next';

import { type SupportedLanguage, fallbackLng, getOptions, isSupportedLanguage } from './settings';

// Initialize the i18n instance
const initI18next = async (lang: SupportedLanguage, ns: string) => {
  const i18nInstance = createInstance();
  await i18nInstance
    .use(initReactI18next)
    .use(
      resourcesToBackend(
        (language: string, namespace: typeof ns) =>
          // load the translation file depending on the language and namespace
          import(`./locales/${language}/${namespace}.json`)
      )
    )
    .init(getOptions(lang, ns));

  return i18nInstance;
};

// It will accept the locale and namespace for i18next to know what file to load
export async function createTranslation(locale: SupportedLanguage | string, ns: string) {
  const lang = isSupportedLanguage(locale) ? locale : fallbackLng;
  const i18nextInstance = await initI18next(lang, ns);

  return {
    // This is the translation function we'll use in our components
    // e.g. t('greeting')
    t: i18nextInstance.getFixedT(lang, Array.isArray(ns) ? ns[0] : ns),
  };
}
