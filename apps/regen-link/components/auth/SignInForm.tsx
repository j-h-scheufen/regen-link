'use client';

import { useTranslation } from '@/app/i18n/client';
import type { SupportedLanguage } from '@/app/i18n/settings';
import useAuth from '@/hooks/useAuth';
import { Button } from '@heroui/react';
import { useSession } from 'next-auth/react';
import { useAccount } from 'wagmi';

const SignInForm = ({ lang }: { lang: SupportedLanguage }) => {
  const { t } = useTranslation(lang, 'auth');
  const { data: session } = useSession();
  const { address, isConnecting, isConnected } = useAccount();
  const {
    signIn,
    connect,
    state: { loading, error },
  } = useAuth();

  return (
    <div className="flex flex-col items-center gap-4">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{t('auth.welcome')}</h1>

      {!address && (
        <>
          <p className="text-gray-600 dark:text-gray-300">{t('auth.connectExplainer')}</p>
          <Button size="lg" color="primary" onPress={connect} isLoading={loading || isConnecting}>
            {t('auth.connectWallet')}
          </Button>
        </>
      )}

      {address && isConnected && !session && (
        <>
          <p className="text-gray-600 dark:text-gray-300">{t('auth.signInExplainer')}</p>
          <Button size="lg" color="primary" onPress={() => signIn()} isLoading={loading}>
            {t('auth.signIn')}
          </Button>
        </>
      )}

      {error && <p className="text-danger mt-4">{error.message}</p>}
    </div>
  );
};

export default SignInForm;
