import type { QueryClient } from '@tanstack/react-query';
import type { AnyRouter } from '@tanstack/react-router';
import { RouterProvider } from '@tanstack/react-router';
import type { ReactNode } from 'react';

interface AppRouterProviderProps {
  router: AnyRouter;
  queryClient: QueryClient;
  children?: ReactNode;
}

export const AppRouterProvider = ({ router, queryClient }: AppRouterProviderProps) => (
  <RouterProvider router={router} context={{ queryClient }} />
);
