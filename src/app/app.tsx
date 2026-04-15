import { QueryProvider } from '@app/providers/query-provider.tsx';
import { queryClient } from '@app/query-client.ts';
import { StrictMode, Suspense } from 'react';
import { AppRouterProvider } from './providers/router-provider.tsx';
import { SentryProvider } from './providers/sentry-provider.tsx';

export const App = () => {
  return (
    <StrictMode>
      <SentryProvider>
        <Suspense fallback={<div>Loading...</div>}>
          <QueryProvider>
            <AppRouterProvider queryClient={queryClient} />
          </QueryProvider>
        </Suspense>
      </SentryProvider>
    </StrictMode>
  );
};
