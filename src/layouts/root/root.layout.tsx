import { useSentryRouterTracking } from '@app/monitoring/sentry-router-integration';
import { syncSentryUser } from '@app/monitoring/sentry-user-sync.ts';
import * as Sentry from '@sentry/react';
import { ENV } from '@shared/config/env.config.ts';
import { useAuthStore } from '@shared/store/auth.store.ts';
import { Loader, MainErrorFallback } from '@shared/ui';
import { QueryErrorResetBoundary } from '@tanstack/react-query';
import { Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import { Suspense, useEffect } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { Toaster } from 'sonner';

const RootLayout = () => {
  useSentryRouterTracking();
  const token = useAuthStore((state) => state.accessToken);

  useEffect(() => {
    syncSentryUser(token);
  }, [token]);

  return (
    <>
      <QueryErrorResetBoundary>
        {({ reset }) => (
          <ErrorBoundary
            onReset={reset}
            FallbackComponent={MainErrorFallback}
            onError={(error, info) => {
              Sentry.captureException(error, {
                extra: { componentStack: info.componentStack },
              });
            }}
          >
            <Suspense fallback={<Loader />}>
              <Outlet />
            </Suspense>
          </ErrorBoundary>
        )}
      </QueryErrorResetBoundary>
      <Toaster position="top-right" richColors closeButton />
      {ENV.IS_DEV && <TanStackRouterDevtools />}
    </>
  );
};
export default RootLayout;
