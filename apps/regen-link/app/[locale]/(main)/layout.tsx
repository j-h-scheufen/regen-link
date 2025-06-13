import type { PropsWithChildren } from 'react';

export default function MainLayout({ children }: PropsWithChildren) {
  return (
    <main className="container grow flex flex-col h-screen mx-auto px-4 py-8 text-center">
      {children}
    </main>
  );
}
