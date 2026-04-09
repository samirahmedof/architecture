import { QueryProvider } from '@app/providers/query-provider.tsx';
import { NAMESPACES } from '@shared/config/i18n.config.ts';
import { queryClient } from '@shared/lib/query-error-handler.ts';
import { StrictMode, Suspense } from 'react';
import { useTranslation } from 'react-i18next';
import { I18nProvider } from './providers/i18n-provider.tsx';
import { AppRouterProvider } from './providers/router-provider.tsx';
import { SentryProvider } from './providers/sentry-provider.tsx';

export const App = () => {
  const { t } = useTranslation(NAMESPACES.COMMON);

  return (
    <StrictMode>
      <SentryProvider>
        <I18nProvider>
          <Suspense fallback={<div>{t('loadingTranslations')}</div>}>
            <QueryProvider>
              <AppRouterProvider queryClient={queryClient} />
            </QueryProvider>
          </Suspense>
        </I18nProvider>
      </SentryProvider>
    </StrictMode>
  );
};
