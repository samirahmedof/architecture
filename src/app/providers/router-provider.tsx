import i18n from '@app/core/i18n.ts';
import type { QueryClient } from '@tanstack/react-query';
import { createRouter, RouterProvider } from '@tanstack/react-router';
import type { ReactNode } from 'react';
import { routeTree } from '../../routes/routeTree.gen.ts';

interface AppRouterProviderProps {
  queryClient: QueryClient;
  children?: ReactNode;
}

export const createProjectRouter = () =>
  createRouter({
    routeTree,
    defaultPreload: 'intent',
    defaultPendingMs: 300,
    defaultPendingMinMs: 500,
    context: {
      queryClient: undefined as unknown as QueryClient,
      i18n,
    },
  });

const router = createProjectRouter();

export const AppRouterProvider = ({ queryClient }: AppRouterProviderProps) => (
  <RouterProvider router={router} context={{ queryClient }} />
);
