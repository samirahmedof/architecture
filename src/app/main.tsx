import { QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider } from '@tanstack/react-router';
import { StrictMode, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import './main.scss';
import '@core/lang/i18n.config.ts';
import { queryClient } from '@core/http/query-provider.ts';
import i18n from '@core/lang/i18n.config.ts';
import { initSentry } from '@core/monitoring/sentry.config';
import type { QueryClient } from '@tanstack/react-query';
import { createRouter } from '@tanstack/react-router';
import { routeTree } from '../routes/routeTree.gen.ts';

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

initSentry();

const router = createProjectRouter();
const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error('Root element error');
}
createRoot(rootElement).render(
  <StrictMode>
    <Suspense fallback={<div>Loading translations...</div>}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} context={{ queryClient }} />
      </QueryClientProvider>
    </Suspense>
  </StrictMode>,
);
