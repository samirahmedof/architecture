import { publicLayoutRoute } from '@app/layouts/public/public.route.tsx';
import { PATHS } from '@app/router/paths.router.ts';
import PostDetailPage from '@pages/post-detail/post-detail.page.tsx';
import { createRoute } from '@tanstack/react-router';

export const postDetailRoute = createRoute({
  getParentRoute: () => publicLayoutRoute,
  path: PATHS.POST_DETAIL,
  component: PostDetailPage,
});
