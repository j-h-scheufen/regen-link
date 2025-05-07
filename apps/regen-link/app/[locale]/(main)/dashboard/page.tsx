'use client';

import { Button } from '@heroui/react';

import { type NextPageProps } from '@/app/[locale]/layout';
import { useTranslation } from '@/app/i18n/client';
import { type SupportedLanguage, fallbackLng, isSupportedLanguage } from '@/app/i18n/settings';
import useAuth from '@/hooks/useAuth';

export default function DashboardPage({ params: { locale } }: NextPageProps) {
  const lang: SupportedLanguage = isSupportedLanguage(locale)
    ? (locale as SupportedLanguage)
    : fallbackLng;

  const { t } = useTranslation(lang, 'dashboard');
  const { logout } = useAuth();

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 py-6 sm:px-6">
      <div className="w-full max-w-[800px] mx-auto text-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          {t('dashboard.welcome')}
        </h1>
        <p className="mt-2 text-gray-600 dark:text-gray-300">{t('dashboard.description')}</p>

        <div className="mt-8">
          <Button color="danger" variant="light" onPress={logout}>
            {t('dashboard.logout')}
          </Button>
        </div>
      </div>
    </main>
  );
}
