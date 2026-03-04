import { createFileRoute, lazyRouteComponent } from '@tanstack/react-router';

export const Route = createFileRoute('/$locale/_public/post/create/')({
  component: lazyRouteComponent(() => import('@features/post/pages/detail/post-detail.page.tsx')),
});
