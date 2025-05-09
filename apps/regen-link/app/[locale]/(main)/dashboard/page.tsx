'use client';

import { Button } from '@heroui/react';

import { useTranslation } from '@/app/i18n/client';
import useAuth from '@/hooks/useAuth';

export default function DashboardPage() {
  const { t } = useTranslation('dashboard');
  const { logout } = useAuth();

  return (
    <section className="pt-16 sm:pt-24">
      <div className="min-h-[120px]">
        <h1 className="page-title">{t('page.title')}</h1>
      </div>

      <p className="page-explainer">{t('page.description')}</p>

      <div className="mt-24 sm:mt-32">
        <Button className="primary-button" size="lg" radius="full" onPress={logout}>
          {t('button.logout')}
        </Button>
      </div>
    </section>
  );
}
