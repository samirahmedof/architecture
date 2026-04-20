import { QueryProvider, queryClient } from '@app/query-provider.tsx';
import { AppRouterProvider } from '@app/router-provider.tsx';
import { initSentry } from '@shared/lib/monitoring/sentry.ts';
import { initTheme } from '@shared/lib/theme/theme.ts';
import { StrictMode, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import '../assets/styles/index.css';

initSentry();
initTheme();

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
