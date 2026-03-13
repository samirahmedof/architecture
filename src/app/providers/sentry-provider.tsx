import { initSentry } from '@app/core/sentry.ts';
import type { ReactNode } from 'react';
import { useEffect } from 'react';

let sentryInitialized = false;

interface SentryProviderProps {
  children: ReactNode;
}

export const SentryProvider = ({ children }: SentryProviderProps) => {
  useEffect(() => {
    if (!sentryInitialized) {
      initSentry();
      sentryInitialized = true;
    }
  }, []);

  return children;
};
