import { createFileRoute, lazyRouteComponent } from '@tanstack/react-router';

export const Route = createFileRoute('/$locale/_public/')({
  component: lazyRouteComponent(() => import('@features/home/home.page.tsx')),
});
