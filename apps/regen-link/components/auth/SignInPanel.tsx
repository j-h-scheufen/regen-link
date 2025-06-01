'use client';

import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { useAccount } from 'wagmi';

import { useTranslation } from '@/app/i18n/client';
import { PageExplainer, PrimaryButton } from '@/components/simple';
import { PATHS } from '@/config/constants';
import useAuth from '@/hooks/useAuth';

export function SignInPanel() {
  const { data: session } = useSession();
  const { address, isConnecting, isConnected } = useAccount();
  const {
    signIn,
    connect,
    state: { loading, error },
  } = useAuth();
  const { t } = useTranslation('auth');

  if (session) {
    redirect(PATHS.dashboard);
  }

  return (
    <>
      {!address && (
        <>
          <PageExplainer>{t('auth.connectExplainer')}</PageExplainer>
          <div className="mt-24 sm:mt-32">
            <PrimaryButton onPress={connect} isLoading={loading || isConnecting}>
              {t('auth.connectWallet')}
            </PrimaryButton>
          </div>
        </>
      )}

      {address && isConnected && !session && (
        <>
          <PageExplainer>{t('auth.signInExplainer')}</PageExplainer>
          <div className="mt-24 sm:mt-32">
            <PrimaryButton onPress={() => signIn()} isLoading={loading}>
              {t('auth.signIn')}
            </PrimaryButton>
          </div>
        </>
      )}

      {error && <p className="text-danger mt-4">{error.message}</p>}
    </>
  );
}
