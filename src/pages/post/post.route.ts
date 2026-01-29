import { publicLayoutRoute } from '@app/layouts/public/public.route.tsx';
import { PATHS } from '@app/router/paths.router.ts';
import { createRoute, lazyRouteComponent } from '@tanstack/react-router';

export const postRoute = createRoute({
  getParentRoute: () => publicLayoutRoute,
  path: PATHS.POST,
  component: lazyRouteComponent(() => import('./post.page.tsx')),
});
