import 'i18next';
import type auth from '@locales/az/auth.json';
import type common from '@locales/az/common.json';
import type post from '@locales/az/post.json';
import type validation from '@locales/az/validation.json';

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
