import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

import type { NextPageProps } from '@/app/[locale]/layout';
import { createTranslation } from '@/app/i18n/server';
import { SignInPanel } from '@/components/auth';
import { PATHS } from '@/config/constants';

export default async function LoginPage({ params }: NextPageProps) {
  const locale = (await params).locale;
  const session = await getServerSession();
  const { t } = await createTranslation(locale, 'auth');

  if (session) {
    redirect(PATHS.dashboard);
  }

  return (
    <section className="pt-16 sm:pt-24">
      <div className="min-h-[120px]">
        <h1 className="page-title">{t('auth.title')}</h1>
      </div>
      <SignInPanel />
    </section>
  );
}
