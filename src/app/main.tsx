import { createProjectRouter } from '@app/router/tree.router.ts';
import { QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider } from '@tanstack/react-router';
import { StrictMode, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import './main.scss';
import '@core/lang/i18n.config.ts';
import { queryClient } from '@core/http/query-provider.ts';

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
