import { Suspense } from 'react';

import SignInForm from '@/components/auth/SignInForm';

const LoginPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="flex flex-col text-center">
        <SignInForm />
      </div>
    </Suspense>
  );
};

export default LoginPage;
