import AuthLayout from '@app/layouts/auth/auth.layout.tsx';
import { PATHS } from '@app/router/paths.router.ts';
import { rootRoute } from '@app/layouts/_root/root.route.ts';
import { createRoute } from '@tanstack/react-router';

export const authLayoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: PATHS.AUTH,
  component: AuthLayout,
});
