import { DEFAULT_LANGUAGE, LANGUAGES, type Language } from '@core/lang/i18n.config.ts';
import { createFileRoute, redirect } from '@tanstack/react-router';

const SUPPORTED = Object.values(LANGUAGES) as Language[];

export const Route = createFileRoute('/$locale')({
  // Locale parametrini tip-li formata çevir
  params: {
    parse: (raw) => {
      const locale = raw.locale as Language;
      if (!SUPPORTED.includes(locale)) {
        throw redirect({
          to: '/$locale',
          params: { locale: DEFAULT_LANGUAGE },
        });
      }
      return { locale };
    },
    stringify: (parsed) => ({ locale: parsed.locale }),
  },

  beforeLoad: async ({ params, context }) => {
    const { locale } = params;
    if (context.i18n.language !== locale) {
      await context.i18n.changeLanguage(locale);
    }
    return { locale };
  },
});
