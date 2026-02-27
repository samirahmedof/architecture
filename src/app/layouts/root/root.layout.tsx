import { ENV } from '@core/config/env.config.ts';
import { useSentryRouterTracking } from '@core/monitoring/sentry-router-integration.tsx';
import { useSentryUserSync } from '@core/monitoring/sentry-user-sync.ts';
import * as Sentry from '@sentry/react';
import { MainErrorFallback } from '@shared/ui/error/main-error.tsx';
import { Loader } from '@shared/ui/loader/loader.tsx';
import { QueryErrorResetBoundary } from '@tanstack/react-query';
import { Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { Toaster } from 'sonner';

const RootLayout = () => {
  useSentryRouterTracking();
  useSentryUserSync();

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
