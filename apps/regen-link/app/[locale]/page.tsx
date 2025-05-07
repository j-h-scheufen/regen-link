import { Button, Link } from '@heroui/react';

import type { NextPageProps } from '@/app/[locale]/layout';
import { createTranslation } from '@/app/i18n/server';
import { type SupportedLanguage, fallbackLng, isSupportedLanguage } from '@/app/i18n/settings';
import { PATHS } from '@/config/constants';

export default async function Home({ params: { locale } }: NextPageProps) {
  const lang: SupportedLanguage = isSupportedLanguage(locale)
    ? (locale as SupportedLanguage)
    : fallbackLng;

  const { t } = await createTranslation(lang, 'home');

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 py-6 sm:px-6 bg-gradient-to-b from-gray-900 to-gray-950">
      <div className="w-full max-w-[800px] mx-auto text-center">
        <div className="min-h-[120px] flex flex-col justify-center">
          <h1 className="page-title">
            Welcome to
            <br className="sm:hidden" /> <span className="whitespace-nowrap">Regen Link</span>
          </h1>
        </div>

        <p className="page-explainer">{t('home.description')}</p>

        <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
          <Button as={Link} href={PATHS.login} className="primary-button" size="lg" radius="full">
            {t('home.getStarted')}
          </Button>

          <Button
            variant="bordered"
            size="lg"
            radius="full"
            className="border-gray-600 text-gray-300 hover:border-gray-400 transition-colors"
          >
            {t('home.learnMore')}
          </Button>
        </div>

        <p className="mt-16 text-sm text-gray-500">© 2025 Regen Link. All rights reserved.</p>
      </div>
    </main>
  );
}
