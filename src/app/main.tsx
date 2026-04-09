import { createRoot } from 'react-dom/client';
import './main.scss';
import { App } from '@app/app.tsx';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error('Root element error');
}
createRoot(rootElement).render(<App />);
