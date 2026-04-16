import { DEFAULT_LANGUAGE, LANGUAGES, NAMESPACES } from '@shared/config/i18n.config.ts';
import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

import azAuth from './locales/az/auth.json';
import azCommon from './locales/az/common.json';
import azPost from './locales/az/post.json';
import azValidation from './locales/az/validation.json';

import enAuth from './locales/en/auth.json';
import enCommon from './locales/en/common.json';
import enPost from './locales/en/post.json';
import enValidation from './locales/en/validation.json';

import ruAuth from './locales/ru/auth.json';
import ruCommon from './locales/ru/common.json';
import ruPost from './locales/ru/post.json';
import ruValidation from './locales/ru/validation.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: DEFAULT_LANGUAGE,
    supportedLngs: Object.values(LANGUAGES),
    defaultNS: NAMESPACES.COMMON,
    ns: Object.values(NAMESPACES),

    resources: {
      az: { common: azCommon, auth: azAuth, post: azPost, validation: azValidation },
      en: { common: enCommon, auth: enAuth, post: enPost, validation: enValidation },
      ru: { common: ruCommon, auth: ruAuth, post: ruPost, validation: ruValidation },
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
