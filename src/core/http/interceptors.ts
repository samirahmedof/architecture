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
    return config;
  });
};

// Refresh Logic
export const attachRefreshInterceptor = (instance: AxiosInstance) => {
  instance.interceptors.response.use(
    (response) => response,
    async (error) => {
      if (error.response?.status === 401 && !error.config._retry) {
        return refreshTokenLogic(error.config, instance);
      }
      return Promise.reject(error);
    },
  );
};
