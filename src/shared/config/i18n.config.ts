import 'i18next';
import type auth from '@shared/lib/i18n/locales/az/auth.json';
import type common from '@shared/lib/i18n/locales/az/common.json';
import type post from '@shared/lib/i18n/locales/az/post.json';
import type validation from '@shared/lib/i18n/locales/az/validation.json';

declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: 'common';
    resources: {
      common: typeof common;
      post: typeof post;
      validation: typeof validation;
      auth: typeof auth;
    };
  }
}

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
