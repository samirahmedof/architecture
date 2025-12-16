import { Button } from '@shared/ui'; // Bizim shared button
import { AlertTriangle } from 'lucide-react';
import type { FallbackProps } from 'react-error-boundary';
import styles from './main-error.module.scss';

export const MainErrorFallback = ({ error, resetErrorBoundary }: FallbackProps) => {
  return (
    <div className={styles.container}>
      <AlertTriangle size={48} strokeWidth={1.5} style={{ marginBottom: 15 }} />
      <h2 className={styles.title}>Gözlənilməz xəta baş verdi</h2>
      <p className={styles.message}>{error.message || 'Naməlum xəta'}</p>

      <Button variant="danger" onClick={resetErrorBoundary}>
        Yenidən cəhd et
      </Button>
    </div>
  );
};
