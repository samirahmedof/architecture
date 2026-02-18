import { ENV } from '@core/config/env.config.ts';

export const logger = {
  debug: (message: string, ...args: unknown[]) => {
    if (!ENV.IS_PROD)
      console.debug(`%c[DEBUG] ${message}`, 'color: gray; font-weight: bold', ...args);
  },

  info: (message: string, ...args: unknown[]) => {
    if (!ENV.IS_PROD)
      console.info(`%c[INFO] ${message}`, 'color: blue; font-weight: bold', ...args);
  },

  warn: (message: string, ...args: unknown[]) => {
    console.warn(`%c[WARN] ${message}`, 'color: orange; font-weight: bold', ...args);
  },

  error: (message: string, error?: unknown) => {
    console.error(`%c[ERROR] ${message}`, 'color: red; font-weight: bold', error);
  },
};
