import { publicLayoutRoute } from '@app/layouts/public/public.route.tsx';
import { PATHS } from '@app/router/paths.router.ts';
import PostPage from '@pages/post/post.page.tsx';
import { createRoute } from '@tanstack/react-router';

export const postRoute = createRoute({
  getParentRoute: () => publicLayoutRoute,
  path: PATHS.POST,
  component: PostPage,
});
