import type i18n from '@app/lang/i18n.config.ts';
import type { createProjectRouter } from '@app/providers/router-provider.tsx';
import type { QueryClient } from '@tanstack/react-query';
import { createRootRouteWithContext } from '@tanstack/react-router';
import RootLayout from '../layouts/root/root.layout.tsx';

export interface MyRouterContext {
  queryClient: QueryClient;
  i18n: typeof i18n;
}
export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: RootLayout,
});

declare module '@tanstack/react-router' {
  interface Register {
    router: ReturnType<typeof createProjectRouter>;
  }
}
