'use client';

import { Button } from '@heroui/react';
import { useSession } from 'next-auth/react';
import { useAccount } from 'wagmi';

import useAuth from '@/hooks/useAuth';

const SignInForm = () => {
  const { data: session } = useSession();
  const { address, isConnecting, isConnected } = useAccount();
  const {
    signIn,
    connect,
    state: { loading, error },
  } = useAuth();

  return (
    <div className="flex flex-col gap-2 sm:gap-3 max-w-sm mx-auto items-center">
      <h2 className="text-3xl text-default-700 sm:text-default-800 mb-2 sm:mb-4">Login</h2>
      {!address && (
        <div className="flex flex-col gap-4 sm:gap-5">
          <p>Click the button to connect your Silk account.</p>
          <Button
            size="lg"
            color="primary"
            variant="ghost"
            className="w-full mt-2"
            onPress={connect}
            isLoading={loading || isConnecting}
          >
            Connect with Silk
          </Button>
        </div>
      )}
      {address && isConnected && !session && (
        <div className="flex flex-col gap-2 sm:gap-3 align-center">
          <p className="text-center">
            Your Silk account is connected. Please sign the message to log in.
          </p>
          <Button
            size="lg"
            color="primary"
            variant="solid"
            className="w-full mt-2"
            onPress={() => signIn()}
            isLoading={loading}
          >
            Sign In
          </Button>
        </div>
      )}
      {error && <p className="text-red-500 text-sm mt-2 text-center">{error.message}</p>}
    </div>
  );
};

export default SignInForm;
