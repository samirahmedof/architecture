import { App } from '@app/app.tsx';
import { initSentry } from '@shared/lib/monitoring/sentry.ts';
import { createRoot } from 'react-dom/client';
import './main.scss';

initSentry();

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error('Root element error');
}
createRoot(rootElement).render(<App />);
