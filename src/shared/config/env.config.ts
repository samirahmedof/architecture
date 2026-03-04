const getEnv = (key: string, defaultValue?: string): string => {
  const value = import.meta.env[key] || defaultValue;
  if (value === undefined) {
    throw new Error(`ERROR: can not find "${key}" key! check .env file.`);
  }
  return value;
};

export const ENV = {
  NODE_ENV: import.meta.env.MODE, // 'development' | 'production'
  IS_DEV: import.meta.env.DEV,
  IS_PROD: import.meta.env.PROD,

  BASE_URL: getEnv('VITE_API_URL'),
  SENTRY_DSN: getEnv('VITE_SENTRY_DSN'),
  SENTRY_ENABLE_DEV: getEnv('VITE_SENTRY_ENABLE_DEV') === 'true',
} as const;
