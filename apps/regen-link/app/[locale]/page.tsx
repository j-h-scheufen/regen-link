import { Button, Card, CardBody, Spacer } from '@heroui/react';

import type { NextPageProps } from '@/app/[locale]/layout';
import { createTranslation } from '@/app/i18n/server';
import { type SupportedLanguage, fallbackLng, isSupportedLanguage } from '@/app/i18n/settings';

export default async function Home({ params: { locale } }: NextPageProps) {
  const lang: SupportedLanguage = isSupportedLanguage(locale)
    ? (locale as SupportedLanguage)
    : fallbackLng;

  const { t } = await createTranslation(lang, 'home');

  return (
    <main className="min-h-screen bg-gradient-to-b from-primary to-primary-300 dark:from-primary-900 dark:to-primary-600 flex flex-col items-center justify-center p-6">
      <Card className="max-w-md w-full p-8 shadow-lg">
        <CardBody className="flex flex-col items-center text-center gap-6">
          <h1 className="text-4xl font-bold bg-gradient-to-br from-primary to-primary-300 dark:from-primary-900 dark:to-primary-600 bg-clip-text text-transparent">
            {t('home.title')}
          </h1>

          <p className="text-lg text-neutral-600 dark:text-neutral-300">{t('home.description')}</p>

          <Spacer y={4} />

          <div className="flex gap-4">
            <Button color="primary" size="lg" radius="full">
              {t('home.getStarted')}
            </Button>
            <Button variant="bordered" size="lg" radius="full">
              {t('home.learnMore')}
            </Button>
          </div>
        </CardBody>
      </Card>

      <p className="mt-8 text-sm text-neutral-500">© 2025 Regen Link. All rights reserved.</p>
    </main>
  );
}
