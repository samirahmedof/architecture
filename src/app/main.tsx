import { QueryProvider, queryClient } from '@app/query-provider.tsx';
import { AppRouterProvider } from '@app/router-provider.tsx';
import { initSentry } from '@shared/lib/monitoring/sentry.ts';
import { StrictMode, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import './main.scss';

initSentry();

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error('Root element error');
}

createRoot(rootElement).render(
  <StrictMode>
    <Suspense fallback={<div>Loading...</div>}>
      <QueryProvider>
        <AppRouterProvider queryClient={queryClient} />
      </QueryProvider>
    </Suspense>
  </StrictMode>,
);
