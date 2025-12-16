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
} as const;
