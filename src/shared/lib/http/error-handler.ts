import { NAMESPACES } from '@shared/config/i18n.config.ts';
import i18n from '@shared/lib/i18n/i18n.ts';
import { logger } from '@shared/lib/logger.ts';
import { captureException } from '@shared/lib/monitoring/sentry.ts';
import { isHTTPError, isNetworkError, isTimeoutError, SchemaValidationError } from 'ky';
import { toast } from 'sonner';
import { ValiError } from 'valibot';

type ServerError = {
  message?: string;
  errors?: Record<string, string[]>;
};

export const handleGlobalError = (
  error: unknown,
  context?: { queryKey?: unknown; mutationKey?: unknown },
) => {
  if (error instanceof ValiError) {
    logger.error('Validation Error:', error.issues);
    toast.error(i18n.t('error.validationData', { ns: NAMESPACES.COMMON }));
    return;
  }

  if (error instanceof SchemaValidationError) {
    logger.error('Schema Validation:', error);
    toast.error(i18n.t('error.validationData', { ns: NAMESPACES.COMMON }));
    return;
  }

  if (isTimeoutError(error)) {
    toast.error(i18n.t('error.noConnection', { ns: NAMESPACES.COMMON }));
    return;
  }

  if (isNetworkError(error)) {
    toast.error(i18n.t('error.noConnection', { ns: NAMESPACES.COMMON }));
    return;
  }

  if (!isHTTPError(error)) {
    captureException(error as Error, { queryContext: context });
    toast.error(i18n.t('error.unknown', { ns: NAMESPACES.COMMON }));
    return;
  }

  const status = error.response.status;
  const data = error.data as ServerError | undefined;
  const serverMessage = data?.message || i18n.t('error.unknown', { ns: NAMESPACES.COMMON });

  if (
    status >= 500 ||
    (status >= 400 && status !== 401 && status !== 403 && status !== 404 && status !== 422)
  ) {
    captureException(error, {
      queryContext: context,
      api: {
        status,
        statusText: error.response.statusText,
        data,
      },
    });
  }

  switch (status) {
    case 400:
      toast.error(i18n.t('error.badRequest', { ns: NAMESPACES.COMMON, message: serverMessage }));
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
