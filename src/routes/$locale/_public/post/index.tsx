import { NAMESPACES } from '@app/lang/i18n.config.ts';
import { createFileRoute, lazyRouteComponent } from '@tanstack/react-router';

export const Route = createFileRoute('/$locale/_public/post/')({
  component: lazyRouteComponent(() =>
    import('@features/post').then((module) => ({ default: module.PostPage })),
  ),
  // Bu route yüklənərkən 'post' namespace-ni preload et
  loader: ({ context }) => context.i18n.loadNamespaces(NAMESPACES.POST),
});
