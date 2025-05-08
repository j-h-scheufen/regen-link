'use client';

import { Button } from '@heroui/react';

import { type NextPageProps } from '@/app/[locale]/layout';
import { useTranslation } from '@/app/i18n/client';
import { type SupportedLanguage } from '@/app/i18n/settings';
import useAuth from '@/hooks/useAuth';

export default function DashboardPage({ params: { locale } }: NextPageProps) {
  const { t } = useTranslation(locale as SupportedLanguage, 'dashboard');
  const { logout } = useAuth();

  return (
    <section className="pt-16 sm:pt-24">
      <div className="min-h-[120px]">
        <h1 className="page-title">{t('dashboard.welcome')}</h1>
      </div>

      <p className="page-explainer">{t('dashboard.description')}</p>

      <div className="mt-24 sm:mt-32">
        <Button className="primary-button" size="lg" radius="full" onPress={logout}>
          {t('dashboard.logout')}
        </Button>
      </div>
    </section>
  );
}
