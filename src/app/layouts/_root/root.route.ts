import RootLayout from '@app/layouts/_root/root.layout.tsx';
import type { QueryClient } from '@tanstack/react-query';
import { createRootRouteWithContext } from '@tanstack/react-router';

export interface MyRouterContext {
  queryClient: QueryClient;
}

export const rootRoute = createRootRouteWithContext<MyRouterContext>()({
  component: RootLayout,
});
