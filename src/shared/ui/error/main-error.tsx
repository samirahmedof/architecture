import { NAMESPACES } from '@app/lang/i18n.config.ts';
import { Button } from '@shared/ui';
import { AlertTriangle } from 'lucide-react';
import type { FallbackProps } from 'react-error-boundary';
import { useTranslation } from 'react-i18next';
import styles from './main-error.module.scss';

export const MainErrorFallback = ({ error, resetErrorBoundary }: FallbackProps) => {
  const { t } = useTranslation(NAMESPACES.COMMON);

  return (
    <div className={styles.container}>
      <AlertTriangle size={48} strokeWidth={1.5} style={{ marginBottom: 15 }} />
      <h2 className={styles.title}>{t('error.unexpected')}</h2>
      <p className={styles.message}>{error.message || t('error.unknown')}</p>

      <Button variant="danger" onClick={resetErrorBoundary}>
        {t('actions.retry')}
      </Button>
    </div>
  );
};
