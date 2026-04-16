import type { createProjectRouter } from '@app/providers/router-provider.tsx';
import { RootLayout } from '@layouts/root/root.layout.tsx';
import type i18n from '@shared/lib/i18n/i18n.ts';
import type { QueryClient } from '@tanstack/react-query';
import { createRootRouteWithContext } from '@tanstack/react-router';

export interface ArchitectureRouterContext {
  queryClient: QueryClient;
  i18n: typeof i18n;
}
export const Route = createRootRouteWithContext<ArchitectureRouterContext>()({
  component: RootLayout,
});

declare module '@tanstack/react-router' {
  interface Register {
    router: ReturnType<typeof createProjectRouter>;
  }
}
