import { NAMESPACES } from '@core/lang/i18n.config.ts';
import { createFileRoute, lazyRouteComponent } from '@tanstack/react-router';

export const Route = createFileRoute('/$locale/_public/post/')({
  component: lazyRouteComponent(() => import('@features/post/post.page.tsx')),
  // Bu route yüklənərkən 'post' namespace-ni preload et
  loader: ({ context }) => context.i18n.loadNamespaces(NAMESPACES.POST),
});
