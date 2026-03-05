import { createFileRoute, lazyRouteComponent } from '@tanstack/react-router';

export const Route = createFileRoute('/$locale/_public/post/create/')({
  component: lazyRouteComponent(() =>
    import('@features/post').then((module) => ({ default: module.PostDetailPage })),
  ),
});
