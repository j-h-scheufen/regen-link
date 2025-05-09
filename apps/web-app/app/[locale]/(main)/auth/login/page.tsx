'use client';

import { Button } from '@heroui/react';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { useAccount } from 'wagmi';

import { useTranslation } from '@/app/i18n/client';
import { PATHS } from '@/config/constants';
import useAuth from '@/hooks/useAuth';

export default function LoginPage() {
  const { data: session } = useSession();
  const { address, isConnecting, isConnected } = useAccount();
  const {
    signIn,
    connect,
    state: { loading, error },
  } = useAuth();

  if (session) {
    redirect(PATHS.dashboard);
  }

  const { t } = useTranslation('auth');

  return (
    <section className="pt-16 sm:pt-24">
      <div className="min-h-[120px]">
        <h1 className="page-title">{t('auth.title')}</h1>
      </div>

      {!address && (
        <>
          <p className="page-explainer">{t('auth.connectExplainer')}</p>
          <div className="mt-24 sm:mt-32">
            <Button
              className="primary-button"
              size="lg"
              radius="full"
              onPress={connect}
              isLoading={loading || isConnecting}
            >
              {t('auth.connectWallet')}
            </Button>
          </div>
        </>
      )}

      {address && isConnected && !session && (
        <>
          <p className="page-explainer">{t('auth.signInExplainer')}</p>
          <div className="mt-24 sm:mt-32">
            <Button
              className="primary-button"
              size="lg"
              radius="full"
              onPress={() => signIn()}
              isLoading={loading}
            >
              {t('auth.signIn')}
            </Button>
          </div>
        </>
      )}

      {error && <p className="text-danger mt-4">{error.message}</p>}
    </section>
  );
}
