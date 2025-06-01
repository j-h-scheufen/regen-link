'use client';

import { Button, type ButtonProps } from '@heroui/react';
import clsx from 'clsx';
import type { PropsWithChildren } from 'react';

export function PageTitle({ children, className }: PropsWithChildren<{ className?: string }>) {
  return (
    <h1
      className={clsx(
        'text-5xl sm:text-5xl md:text-6xl font-sora font-bold leading-[1.1] pb-2',
        'bg-gradient-to-b from-primary-100 via-primary-600 to-primary-100 bg-clip-text text-transparent',
        'drop-shadow-[0_0_30px_rgba(121,217,31,0.6)]',
        className
      )}
    >
      {children}
    </h1>
  );
}

export function PageExplainer({ children, className }: PropsWithChildren<{ className?: string }>) {
  return (
    <p
      className={clsx(
        'mt-3 text-lg sm:text-xl md:text-2xl text-gray-200 dark:text-gray-300',
        className
      )}
    >
      {children}
    </p>
  );
}

export function PrimaryButton({ className, children, ...props }: ButtonProps & PropsWithChildren) {
  return (
    <Button
      size="lg"
      radius="full"
      className={clsx(
        'border-2 border-primary-600 bg-gradient-to-b from-primary-300 via-primary-600 to-primary-400',
        'hover:from-primary-400 hover:via-primary-600 hover:to-primary-500',
        'text-black dark:text-slate-950 font-semibold shadow-lg shadow-primary-500/20',
        'transform transition-all hover:scale-105',
        className
      )}
      {...props}
    >
      {children}
    </Button>
  );
}
