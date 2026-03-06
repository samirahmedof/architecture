import { createRoot } from 'react-dom/client';
import './main.scss';
import { queryClient } from '@app/http/error-handler.ts';
import { AppProviders } from '@app/providers/app-providers.tsx';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error('Root element error');
}
createRoot(rootElement).render(<AppProviders queryClient={queryClient} />);
