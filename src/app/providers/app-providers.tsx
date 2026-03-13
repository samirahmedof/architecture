import { QueryProvider } from '@app/providers/query-provider.tsx';
import { NAMESPACES } from '@shared/config/i18n.config.ts';
import type { QueryClient } from '@tanstack/react-query';
import type { ReactNode } from 'react';
import { StrictMode, Suspense } from 'react';
import { useTranslation } from 'react-i18next';
import { I18nProvider } from './i18n-provider.tsx';
import { AppRouterProvider } from './router-provider.tsx';
import { SentryProvider } from './sentry-provider.tsx';

interface AppProvidersProps {
  queryClient: QueryClient;
  children?: ReactNode;
}

export const AppProviders = ({ queryClient }: AppProvidersProps) => {
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
