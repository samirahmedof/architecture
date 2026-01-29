import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';
import { initReactI18next } from 'react-i18next';

export const LANGUAGES = {
  AZ: 'az',
  EN: 'en',
  RU: 'ru',
} as const;

export type Language = (typeof LANGUAGES)[keyof typeof LANGUAGES];

export const DEFAULT_LANGUAGE: Language = LANGUAGES.AZ;

export const NAMESPACES = {
  COMMON: 'common',
  AUTH: 'auth',
  POST: 'post',
  VALIDATION: 'validation',
} as const;

export type Namespace = (typeof NAMESPACES)[keyof typeof NAMESPACES];

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: DEFAULT_LANGUAGE,
    supportedLngs: Object.values(LANGUAGES),
    defaultNS: NAMESPACES.COMMON,
    ns: Object.values(NAMESPACES),

    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json',
    },

    detection: {
      order: ['querystring', 'localStorage', 'navigator'],
      caches: ['localStorage'],
      lookupQuerystring: 'lang',
      lookupLocalStorage: 'i18n_lang',
    },

    interpolation: {
      escapeValue: false,
    },

    react: {
      useSuspense: true,
    },
  });

export default i18n;
