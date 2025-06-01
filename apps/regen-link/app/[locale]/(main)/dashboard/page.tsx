'use client';

import { useTranslation } from '@/app/i18n/client';
import { PageExplainer, PageTitle, PrimaryButton } from '@/components/simple';
import useAuth from '@/hooks/useAuth';

export default function DashboardPage() {
  const { t } = useTranslation('dashboard');
  const { logout } = useAuth();

  return (
    <section className="pt-16 sm:pt-24">
      <div className="min-h-[120px]">
        <PageTitle>{t('page.title')}</PageTitle>
      </div>

      <PageExplainer>{t('page.description')}</PageExplainer>

      <div className="mt-24 sm:mt-32">
        <PrimaryButton onPress={logout}>{t('button.logout')}</PrimaryButton>
      </div>
    </section>
  );
}
