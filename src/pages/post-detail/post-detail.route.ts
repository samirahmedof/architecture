import { publicLayoutRoute } from '@app/layouts/public/public.route.tsx';
import { PATHS } from '@app/router/paths.router.ts';
import { postQueries } from '@pages/post/api/post.queries.ts';
import { createRoute, lazyRouteComponent } from '@tanstack/react-router';

export const postCreateRoute = createRoute({
  getParentRoute: () => publicLayoutRoute,
  path: PATHS.POST_CREATE,
  component: lazyRouteComponent(() => import('./post-detail.page.tsx')),
});

export const postEditRoute = createRoute({
  getParentRoute: () => publicLayoutRoute,
  path: PATHS.POST_EDIT,
  component: lazyRouteComponent(() => import('./post-detail.page.tsx')),
  params: {
    parse: (raw) => {
      const id = Number(raw.postId);
      if (Number.isNaN(id)) {
        throw new Error('Invalid Post ID');
      }
      return { postId: id };
    },
    stringify: (parsed) => ({
      postId: String(parsed.postId),
    }),
  },
  loader: ({ context, params }) =>
    context.queryClient.ensureQueryData(postQueries.detail(Number(params.postId))),
});
