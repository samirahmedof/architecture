import { NAMESPACES } from '@core/lang/i18n.config.ts';
import { useTranslation } from 'react-i18next';
import * as v from 'valibot';

export const usePostFormSchema = () => {
  const { t } = useTranslation([NAMESPACES.VALIDATION, NAMESPACES.POST]);

  return v.object({
    title: v.pipe(
      v.string(t('validation:required', { field: t('post:title') })),
      v.minLength(3, t('validation:min_length', { field: t('post:title'), min: 3 })),
    ),
    description: v.pipe(
      v.string(t('validation:required', { field: t('post:description') })),
      v.minLength(3, t('validation:min_length', { field: t('post:description'), min: 3 })),
    ),
  });
};
