import { type NextPageProps } from '@/app/[locale]/layout';
import { createTranslation } from '@/app/i18n/server';
import { type SupportedLanguage, fallbackLng, isSupportedLanguage } from '@/app/i18n/settings';

export default async function DashboardPage({ params: { locale } }: NextPageProps) {
  const lang: SupportedLanguage = isSupportedLanguage(locale)
    ? (locale as SupportedLanguage)
    : fallbackLng;

  const { t } = await createTranslation(lang, 'dashboard');

  return (
    <div className="w-full max-w-[800px] mx-auto px-4 py-6 sm:px-6">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{t('dashboard.welcome')}</h1>
      <p className="mt-2 text-gray-600 dark:text-gray-300">{t('dashboard.description')}</p>
    </div>
  );
}
