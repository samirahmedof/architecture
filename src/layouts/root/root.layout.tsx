import * as Sentry from '@sentry/react';
import { ENV } from '@shared/config/env.config.ts';
import { addSentryBreadcrumb, syncSentryUser } from '@shared/lib/monitoring/sentry.ts';
import { useAuthStore } from '@shared/store/auth.store.ts';
import { ErrorFallback, Loader } from '@shared/ui';
import { QueryErrorResetBoundary } from '@tanstack/react-query';
import { Outlet, useRouterState } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import { Suspense, useEffect } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { Toaster } from 'sonner';

export const RootLayout = () => {
  const routerState = useRouterState();
  const { pathname, search, hash } = routerState.location;
  useEffect(() => {
    if (pathname) {
      addSentryBreadcrumb(`Navigation: ${pathname}`, 'navigation', 'info', {
        pathname: pathname,
        search: search,
        hash: hash,
      });
    }
  }, [pathname, search, hash]);
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
            FallbackComponent={ErrorFallback}
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
      <Toaster position='top-right' richColors closeButton />
      {ENV.IS_DEV && <TanStackRouterDevtools />}
    </>
  );
};
