import { NAMESPACES } from '@shared/config/i18n.config.ts';
import { AlertTriangle } from 'lucide-react';
import type { FallbackProps } from 'react-error-boundary';
import { useTranslation } from 'react-i18next';
import { Button } from '../button/button.tsx';
import styles from './error-fallback.module.css';

export const ErrorFallback = ({ error, resetErrorBoundary }: FallbackProps) => {
  const { t } = useTranslation(NAMESPACES.COMMON);
  const message = error instanceof Error ? error.message : t('error.unknown');

  return (
    <div className={styles.container}>
      <AlertTriangle size={48} strokeWidth={1.5} className={styles.icon} />
      <h2 className={styles.title}>{t('error.unexpected')}</h2>
      <p className={styles.message}>{message}</p>

      <Button variant='danger' onClick={resetErrorBoundary}>
        {t('actions.retry')}
      </Button>
    </div>
  );
};
