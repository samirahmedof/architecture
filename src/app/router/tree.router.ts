import { rootRoute } from '@app/layouts/_root/root.route.ts';
import { authLayoutRoute } from '@app/layouts/auth/auth.route.tsx';
import { publicLayoutRoute } from '@app/layouts/public/public.route.tsx';
import { homeRoute } from '@pages/home/home.route.ts';
import { loginRoute } from '@pages/login/login.route.ts';
import { postRoute } from '@pages/post/post.route.ts';
import { postCreateRoute, postEditRoute } from '@pages/post-detail/post-detail.route.ts';
import type { QueryClient } from '@tanstack/react-query';
import { createRouter } from '@tanstack/react-router';

const routeTree = rootRoute.addChildren([
  publicLayoutRoute.addChildren([homeRoute, postRoute, postEditRoute, postCreateRoute]),
  authLayoutRoute.addChildren([loginRoute]),
]);
export const createProjectRouter = () =>
  createRouter({
    routeTree,
    defaultPreload: 'intent',
    defaultPendingMs: 300,
    defaultPendingMinMs: 500,
    context: {
      queryClient: undefined as unknown as QueryClient,
    },
  });

declare module '@tanstack/react-router' {
  interface Register {
    router: ReturnType<typeof createProjectRouter>;
  }
}
