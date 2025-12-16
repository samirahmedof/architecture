import { ENV } from '@core/config/env.config.ts';
import { MainErrorFallback } from '@shared/ui/error/main-error.component.tsx';
import { LoaderComponent } from '@shared/ui/loader/loader.component.tsx';
import { QueryErrorResetBoundary } from '@tanstack/react-query';
import { Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { Toaster } from 'sonner';

const RootLayout = () => {
  return (
    <>
      <QueryErrorResetBoundary>
        {({ reset }) => (
          <ErrorBoundary onReset={reset} FallbackComponent={MainErrorFallback}>
            <Suspense fallback={<LoaderComponent />}>
              <Outlet />
            </Suspense>
          </ErrorBoundary>
        )}
      </QueryErrorResetBoundary>
      <Toaster position="top-right" richColors closeButton />
      {/*TODO: check this */}
      {ENV.IS_DEV && <TanStackRouterDevtools />}
    </>
  );
};
export default RootLayout;
