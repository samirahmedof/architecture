import 'i18next';
import type auth from '../../../public/locales/az/auth.json';
import type common from '../../../public/locales/az/common.json';
import type post from '../../../public/locales/az/post.json';
import type validation from '../../../public/locales/az/validation.json';

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
