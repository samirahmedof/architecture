import { NAMESPACES } from '@app/lang/i18n.config.ts';
import { QueryProviderWrapper } from '@app/providers/query-provider-wrapper.tsx';
import type { QueryClient } from '@tanstack/react-query';
import type { AnyRouter } from '@tanstack/react-router';
import type { ReactNode } from 'react';
import { StrictMode, Suspense } from 'react';
import { useTranslation } from 'react-i18next';
import { I18nProvider } from './i18n-provider.tsx';
import { AppRouterProvider } from './router-provider.tsx';
import { SentryProvider } from './sentry-provider.tsx';

interface AppProvidersProps {
  router: AnyRouter;
  queryClient: QueryClient;
  children?: ReactNode;
}

export const AppProviders = ({ router, queryClient }: AppProvidersProps) => {
  const { t } = useTranslation(NAMESPACES.COMMON);

  return (
    <StrictMode>
      <SentryProvider>
        <I18nProvider>
          <Suspense fallback={<div>{t('loadingTranslations')}</div>}>
            <QueryProviderWrapper>
              <AppRouterProvider router={router} queryClient={queryClient} />
            </QueryProviderWrapper>
          </Suspense>
        </I18nProvider>
      </SentryProvider>
    </StrictMode>
  );
};
