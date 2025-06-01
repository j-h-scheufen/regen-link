'use client';

import { Button, Link } from '@heroui/react';

import { useTranslation } from '@/app/i18n/client';
import { PrimaryButton } from '@/components/simple';
import { PATHS } from '@/config/constants';

export function HomePageButtons() {
  const { t } = useTranslation('home');

  return (
    <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
      <PrimaryButton as={Link} href={PATHS.login}>
        {t('button.getStarted')}
      </PrimaryButton>

      <Button
        variant="bordered"
        size="lg"
        radius="full"
        className="border-gray-600 text-gray-300 hover:border-gray-400 transition-colors"
      >
        {t('button.learnMore')}
      </Button>
    </div>
  );
}
