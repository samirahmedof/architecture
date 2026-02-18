import { captureException } from '@core/monitoring/sentry.config';
import { logger } from '@shared/utils/logger.ts';
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
    toast.error('Data Xətası: Serverdən gələn məlumat düzgün formatda deyil.');
    return;
  }

  // Axios (Server/Network) errors
  const axiosError = error as AxiosError<ServerError>;

  // 1. İnternet yoxdur və ya Server tamamilə ölüb
  if (!axiosError.response) {
    toast.error('Serverlə əlaqə yoxdur. İnternetinizi yoxlayın.');
    // Network errors are usually not worth reporting unless they're persistent
    return;
  }

  const { status, data } = axiosError.response;
  const serverMessage = data?.message || 'Naməlum xəta baş verdi.';

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
      toast.error(`Səhv sorğu: ${serverMessage}`);
      break;

    case 403:
      toast.error('İcazəniz yoxdur (Forbidden).');
      break;

    case 404:
      toast.error('Axtarılan məlumat tapılmadı.');
      break;

    case 422:
      toast.warning('Zəhmət olmasa daxil etdiyiniz məlumatları yoxlayın.');
      break;

    case 500:
      toast.error('Server daxili xətası. Texniki dəstəklə əlaqə saxlayın.');
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
      retry: false,
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60,
    },
  },
});
