import { useAuthStore } from '@app/store/auth.store';
import type { AxiosInstance } from 'axios';
import { refreshTokenLogic } from './refresh-token.ts';

// Request
export const attachTokenInterceptor = (instance: AxiosInstance) => {
  instance.interceptors.request.use((config) => {
    const token = useAuthStore.getState().accessToken;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // // // Add Sentry breadcrumb for API requests
    // addSentryBreadcrumb(`${config.method?.toUpperCase()} ${config.url}`, 'http', 'info', {
    //   url: config.url,
    //   method: config.method,
    //   baseURL: config.baseURL,
    // });

    return config;
  });
};

// Refresh Logic + Sentry Error Tracking
export const attachRefreshInterceptor = (instance: AxiosInstance) => {
  instance.interceptors.response.use(
    (response) => response,
    async (error) => {
      // Handle 401 refresh logic
      if (error.response?.status === 401 && !error.config._retry) {
        return refreshTokenLogic(error.config, instance);
      }
      return Promise.reject(error);
    },
  );
};
