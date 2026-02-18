import { useRouterState } from '@tanstack/react-router';
import { useEffect } from 'react';
import { addSentryBreadcrumb } from './sentry.config';

/**
 * Hook to track route changes in Sentry
 * Add this to your root layout or router provider
 */

export const useSentryRouterTracking = () => {
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
};
