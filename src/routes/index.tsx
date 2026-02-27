import { DEFAULT_LANGUAGE } from '@core/lang/i18n.config.ts';
import { createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
  beforeLoad: () => {
    throw redirect({ to: '/$locale', params: { locale: DEFAULT_LANGUAGE } });
  },
});
