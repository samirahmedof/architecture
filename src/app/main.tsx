import { createProjectRouter } from '@app/router/tree.router.ts';
import { QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider } from '@tanstack/react-router';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './main.scss';
import { queryClient } from '@core/http/query-provider.ts';

const router = createProjectRouter(queryClient);
const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error('Root element error');
}
createRoot(rootElement).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>,
);
