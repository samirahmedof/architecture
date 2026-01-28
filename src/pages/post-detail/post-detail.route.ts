import { publicLayoutRoute } from '@app/layouts/public/public.route.tsx';
import { PATHS } from '@app/router/paths.router.ts';
import { postQueries } from '@pages/post/data/post.queries.ts';
import PostDetailPage from '@pages/post-detail/post-detail.page.tsx';
import { createRoute } from '@tanstack/react-router';

export const postCreateRoute = createRoute({
  getParentRoute: () => publicLayoutRoute,
  path: PATHS.POST_CREATE,
  component: PostDetailPage,
});

export const postEditRoute = createRoute({
  getParentRoute: () => publicLayoutRoute,
  path: PATHS.POST_EDIT,
  component: PostDetailPage,
  loader: ({ context: { queryClient }, params }) =>
    queryClient.ensureQueryData(postQueries.detail(Number(params.postId))),
});

// TODO:
// export const postDetailRoute = createRoute({
//   getParentRoute: () => publicLayoutRoute,
//   path: PATHS.POST_DETAIL,
//   component: PostDetailPage,
//   params: {
//     parse: (params) => ({
//       postId: Number(params.postId)
//     }),
//     stringify: (params) => ({
//       postId: String(params.postId)
//     })
//   },
// });
