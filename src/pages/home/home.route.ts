import { publicLayoutRoute } from '@app/layouts/public/public.route.tsx';
import { PATHS } from '@app/router/paths.router.ts';
import { createRoute, lazyRouteComponent } from '@tanstack/react-router';

export const homeRoute = createRoute({
  getParentRoute: () => publicLayoutRoute,
  path: PATHS.HOME,
  component: lazyRouteComponent(() => import('./home.page.tsx')),
});
