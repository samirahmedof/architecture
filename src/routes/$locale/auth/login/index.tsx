import { createFileRoute, lazyRouteComponent } from '@tanstack/react-router';

export const Route = createFileRoute('/$locale/auth/login/')({
  component: lazyRouteComponent(() =>
    import('@features/login').then((module) => ({ default: module.LoginPage })),
  ),
});
