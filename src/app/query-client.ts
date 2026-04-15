import { NAMESPACES } from '@shared/config/i18n.config.ts';
import i18n from '@shared/lib/i18n/i18n.ts';
import { logger } from '@shared/lib/logger.ts';
import { captureException } from '@shared/lib/monitoring/sentry.ts';
import { MutationCache, QueryCache, QueryClient } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import { toast } from 'sonner';
import { ValiError } from 'valibot';

type ServerError = {
  message?: string;
  errors?: Record<string, string[]>;
};
const handleGlobalError = (
  error: unknown,
  context?: { queryKey?: unknown; mutationKey?: unknown },
) => {
  // Valibot errors (status 200/201) - usually validation, don't send to Sentry
  if (error instanceof ValiError) {
    logger.error('Validation Error:', error.issues);
    toast.error(i18n.t('error.validationData', { ns: NAMESPACES.COMMON }));
    return;
  }

  // Axios (Server/Network) errors
  const axiosError = error as AxiosError<ServerError>;

  // 1. İnternet yoxdur və ya Server tamamilə ölüb
  if (!axiosError.response) {
    toast.error(i18n.t('error.noConnection', { ns: NAMESPACES.COMMON }));
    // Network errors are usually not worth reporting unless they're persistent
    return;
  }

  const { status, data } = axiosError.response;
  const serverMessage = data?.message || i18n.t('error.unknown', { ns: NAMESPACES.COMMON });

  // Report server errors (5xx) and unexpected client errors to Sentry
  if (
    status >= 500 ||
    (status >= 400 && status !== 401 && status !== 403 && status !== 404 && status !== 422)
  ) {
    captureException(error as Error, {
      queryContext: context,
      api: {
        status,
        statusText: axiosError.response.statusText,
        data: data,
      },
    });
  }

  // 2. Statusa görə xüsusi mesajlar
  switch (status) {
    case 400:
      toast.error(
        i18n.t('error.badRequest', {
          ns: NAMESPACES.COMMON,
          message: serverMessage,
        }),
      );
      break;

    case 403:
      toast.error(i18n.t('error.forbidden', { ns: NAMESPACES.COMMON }));
      break;

    case 404:
      toast.error(i18n.t('error.notFound', { ns: NAMESPACES.COMMON }));
      break;

    case 422:
      toast.warning(i18n.t('error.validationFields', { ns: NAMESPACES.COMMON }));
      break;

    case 500:
      toast.error(i18n.t('error.internal', { ns: NAMESPACES.COMMON }));
      break;

    default:
      toast.error(serverMessage);
  }
};

export const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error, query) => {
      handleGlobalError(error, { queryKey: query.queryKey });
    },
  }),

  mutationCache: new MutationCache({
    onError: (error, _variables, _context, mutation) => {
      if (mutation.options.onError) return;
      handleGlobalError(error, { mutationKey: mutation.options.mutationKey });
    },
  }),

  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60,
    },
  },
});
