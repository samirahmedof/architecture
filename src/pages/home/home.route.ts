import { publicLayoutRoute } from '@app/layouts/public/public.route.tsx';
import { PATHS } from '@app/router/paths.router.ts';
import HomePage from '@pages/home/home.page.tsx';
import { createRoute } from '@tanstack/react-router';

export const homeRoute = createRoute({
  getParentRoute: () => publicLayoutRoute,
  path: PATHS.HOME,
  component: HomePage,
});
