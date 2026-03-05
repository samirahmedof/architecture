import { createRoot } from 'react-dom/client';
import './main.scss';
import i18n from '@app/lang/i18n.config.ts';
import { AppProviders, queryClient } from '@app/providers';
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

const router = createProjectRouter();
const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error('Root element error');
}
createRoot(rootElement).render(<AppProviders router={router} queryClient={queryClient} />);
