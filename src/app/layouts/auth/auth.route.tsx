import AuthLayout from '@app/layouts/auth/auth.layout.tsx';
import { PATHS } from '@app/router/paths.router.ts';
import { rootRouter } from '@app/router/root.router.ts';
import { createRoute } from '@tanstack/react-router';

export const authLayoutRoute = createRoute({
  getParentRoute: () => rootRouter,
  id: PATHS.AUTH,
  component: AuthLayout,
});
