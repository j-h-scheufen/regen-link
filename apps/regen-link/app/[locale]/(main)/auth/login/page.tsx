import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { Suspense } from 'react';

import { type NextPageProps } from '@/app/[locale]/layout';
import { type SupportedLanguage, fallbackLng, isSupportedLanguage } from '@/app/i18n/settings';
import SignInForm from '@/components/auth/SignInForm';
import { PATHS } from '@/config/constants';

export default async function LoginPage({ params: { locale } }: NextPageProps) {
  const session = await getServerSession();

  if (session) {
    redirect(PATHS.dashboard);
  }

  const lang: SupportedLanguage = isSupportedLanguage(locale)
    ? (locale as SupportedLanguage)
    : fallbackLng;

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 py-6 sm:px-6">
      <Suspense fallback={<div>Loading...</div>}>
        <div className="w-full max-w-[800px] mx-auto">
          <SignInForm lang={lang} />
        </div>
      </Suspense>
    </main>
  );
}
