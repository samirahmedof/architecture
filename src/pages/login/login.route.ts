import { authLayoutRoute } from '@app/layouts/auth/auth.route.tsx';
import { PATHS } from '@app/router/paths.router.ts';
import { createRoute, lazyRouteComponent } from '@tanstack/react-router';

export const loginRoute = createRoute({
  getParentRoute: () => authLayoutRoute,
  path: PATHS.LOGIN,
  component: lazyRouteComponent(() => import('./login.page.tsx')),
});
