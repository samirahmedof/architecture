import PublicLayout from '@app/layouts/public/public.layout.tsx';
import { PATHS } from '@app/router/paths.router.ts';
import { rootRoute } from '@app/layouts/_root/root.route.ts';
import { createRoute, redirect } from '@tanstack/react-router';
// TODO: gonna change auth logic
const isAuth = true;
export const publicLayoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: PATHS.PUBLIC,
  component: PublicLayout,
  beforeLoad: ({ location }) => {
    if (!isAuth) {
      throw redirect({
        to: PATHS.LOGIN,
        search: {
          redirect: location.href,
        },
      });
    }
  },
});
