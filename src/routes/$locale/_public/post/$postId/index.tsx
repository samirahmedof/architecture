import { postQueries } from '@features/post';
import { createFileRoute, lazyRouteComponent } from '@tanstack/react-router';

export const Route = createFileRoute('/$locale/_public/post/$postId/')({
  component: lazyRouteComponent(() =>
    import('@features/post').then((module) => ({ default: module.PostDetailPage })),
  ),
  params: {
    parse: (raw) => {
      const id = Number(raw.postId);
      if (Number.isNaN(id)) throw new Error('Invalid Post ID');
      return { postId: id };
    },
    stringify: (parsed) => ({ postId: String(parsed.postId) }),
  },
  loader: ({ context, params }) =>
    context.queryClient.ensureQueryData(postQueries.detail(Number(params.postId))),
});
