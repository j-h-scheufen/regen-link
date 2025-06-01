import { Trans } from 'react-i18next/TransWithoutContext';

import type { NextPageProps } from '@/app/[locale]/layout';
import { createTranslation } from '@/app/i18n/server';
import { HomePageButtons, PageExplainer, PageTitle } from '@/components/simple';

export default async function Home({ params }: NextPageProps) {
  const locale = (await params).locale;
  const { t } = await createTranslation(locale, 'home');

  return (
    <section className="h-full flex flex-col justify-center">
      <div className="min-h-[120px] flex flex-col justify-center">
        <PageTitle>
          <Trans
            t={t}
            i18nKey="page.title"
            components={{
              nbsp: <span className="whitespace-nowrap" />,
            }}
          />
        </PageTitle>
      </div>

      <PageExplainer>{t('page.description')}</PageExplainer>

      <HomePageButtons />

      <p className="mt-16 text-sm text-gray-500">© 2025 Regen Link. All rights reserved.</p>
    </section>
  );
}
