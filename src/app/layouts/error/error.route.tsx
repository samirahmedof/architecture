import ErrorLayout from '@app/layouts/error/error.layout.tsx';
import { PATHS } from '@app/router/paths.router.ts';
import { rootRoute } from '@app/layouts/_root/root.route.ts';
import { createRoute } from '@tanstack/react-router';

export const errorLayoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: PATHS.ERROR,
  component: ErrorLayout,
});
