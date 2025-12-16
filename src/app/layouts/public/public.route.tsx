import PublicLayout from '@app/layouts/public/public.layout.tsx';
import { PATHS } from '@app/router/paths.router.ts';
import { rootRouter } from '@app/router/root.router.ts';
import { cookieUtils } from '@core/utils/cookie.ts';
import { createRoute, redirect } from '@tanstack/react-router';
// TODO: set auth operation
// const isAuthenticated = true;
export const publicLayoutRoute = createRoute({
  getParentRoute: () => rootRouter,
  id: PATHS.PUBLIC,
  component: PublicLayout,
  beforeLoad: ({ location }) => {
    const isAuth = cookieUtils.isAuthenticated();
    // if (!isAuthenticated) {
    //     throw redirect({
    //         to: PATHS.LOGIN,
    //         search: {
    //             redirect: location.href,
    //         },
    //     });
    // }
    if (!isAuth) {
      throw redirect({
        to: PATHS.LOGIN, // Məsələn: '/login'
        search: {
          redirect: location.href,
        },
      });
    }
  },
});
